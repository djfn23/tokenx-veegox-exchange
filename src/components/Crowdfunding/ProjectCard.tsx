
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Calendar, Target, Users, Clock, Coins, TrendingUp } from 'lucide-react';
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
      case 'active': return 'bg-green-500 text-white';
      case 'funded': return 'bg-blue-500 text-white';
      case 'failed': return 'bg-red-500 text-white';
      case 'cancelled': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
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
      case 'VEX': return 'text-tokenx-purple border-tokenx-purple/30 bg-tokenx-purple/10';
      case 'sVEX': return 'text-tokenx-blue border-tokenx-blue/30 bg-tokenx-blue/10';
      case 'gVEX': return 'text-primary border-tokenx-accent/30 bg-tokenx-accent/10';
      default: return 'text-accent border-accent/30 bg-accent/10';
    }
  };

  return (
    <Card className="card-glass hover-lift h-full group relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-tokenx-purple/10 to-tokenx-blue/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
      
      <CardHeader className="relative z-10 pb-4">
        <div className="flex justify-between items-start mb-3">
          <Badge className={`${getStatusColor(project.status)} shadow-lg`}>
            {getStatusText(project.status)}
          </Badge>
          <Badge variant="outline" className={`${getTokenColor(project.token_type)} font-medium`}>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-current"></div>
              <span>{project.token_type}</span>
            </div>
          </Badge>
        </div>
        
        <CardTitle className="text-secondary text-xl line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </CardTitle>
        
        {project.category && (
          <Badge variant="secondary" className="w-fit bg-tokenx-glass text-muted border-tokenx-glass-border">
            {project.category}
          </Badge>
        )}
      </CardHeader>
      
      <CardContent className="relative z-10 space-y-6">
        <p className="text-muted text-sm line-clamp-3 leading-relaxed">
          {project.description}
        </p>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>Progression</span>
            </span>
            <span className="text-body font-semibold">
              {progressPercentage.toFixed(1)}%
            </span>
          </div>
          
          <Progress value={progressPercentage} className="h-3 bg-tokenx-dark-light">
            <div className="h-full bg-gradient-to-r from-tokenx-purple to-tokenx-blue rounded-full transition-all duration-500"></div>
          </Progress>
          
          <div className="flex justify-between text-sm">
            <span className="text-subtle flex items-center space-x-1">
              <Coins className="w-3 h-3" />
              <span>{project.current_amount.toLocaleString()} {project.token_type}</span>
            </span>
            <span className="text-subtle flex items-center space-x-1">
              <Target className="w-3 h-3" />
              <span>{project.goal_amount.toLocaleString()} {project.token_type}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4 card-glass rounded-xl">
          <div className="flex items-center gap-2 text-sm text-muted">
            <Clock className="w-4 h-4 text-tokenx-purple" />
            <span>{daysLeft > 0 ? `${daysLeft}j restants` : 'Terminé'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <Calendar className="w-4 h-4 text-tokenx-blue" />
            <span>{format(new Date(project.end_date), 'dd/MM/yyyy', { locale: fr })}</span>
          </div>
        </div>

        <Button 
          onClick={() => onViewDetails(project.id)}
          className="w-full btn-gradient hover-lift group"
          disabled={project.status !== 'active'}
        >
          <span className="flex items-center space-x-2">
            <Coins className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            <span>Voir les détails</span>
          </span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
