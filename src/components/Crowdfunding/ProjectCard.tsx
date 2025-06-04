
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Calendar, Target, Users, Clock } from 'lucide-react';
import { CrowdfundingProject } from '@/hooks/useCrowdfunding';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ProjectCardProps {
  project: CrowdfundingProject;
  onViewDetails: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewDetails }) => {
  const progressPercentage = (project.current_amount / project.goal_amount) * 100;
  const daysLeft = Math.ceil((new Date(project.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'funded': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      case 'cancelled': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'funded': return 'Financé';
      case 'failed': return 'Échoué';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  const getTokenColor = (tokenType: string) => {
    switch (tokenType) {
      case 'VEX': return 'text-tokenx-purple';
      case 'sVEX': return 'text-tokenx-blue';
      case 'gVEX': return 'text-primary';
      default: return 'text-accent';
    }
  };

  return (
    <Card className="card-glass hover-lift h-full">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <Badge className={`${getStatusColor(project.status)} text-white`}>
            {getStatusText(project.status)}
          </Badge>
          <Badge variant="outline" className={getTokenColor(project.token_type)}>
            {project.token_type}
          </Badge>
        </div>
        <CardTitle className="text-secondary text-xl line-clamp-2">
          {project.title}
        </CardTitle>
        {project.category && (
          <Badge variant="secondary" className="w-fit">
            {project.category}
          </Badge>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted text-sm line-clamp-3">
          {project.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted">Progression</span>
            <span className="text-body font-medium">
              {progressPercentage.toFixed(1)}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-sm">
            <span className="text-subtle">
              {project.current_amount.toLocaleString()} {project.token_type}
            </span>
            <span className="text-subtle">
              {project.goal_amount.toLocaleString()} {project.token_type}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted">
            <Clock className="w-4 h-4" />
            <span>{daysLeft > 0 ? `${daysLeft}j restants` : 'Terminé'}</span>
          </div>
          <div className="flex items-center gap-2 text-muted">
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(project.end_date), 'dd/MM/yyyy', { locale: fr })}</span>
          </div>
        </div>

        <Button 
          onClick={() => onViewDetails(project.id)}
          className="w-full btn-gradient"
          disabled={project.status !== 'active'}
        >
          Voir les détails
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
