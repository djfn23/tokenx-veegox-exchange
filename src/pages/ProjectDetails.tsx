
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCrowdfundingProject, useProjectContributions } from '@/hooks/useCrowdfunding';
import ContributeModal from '@/components/Crowdfunding/ContributeModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Calendar, Target, Users, Clock, Coins } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useResponsive } from '@/hooks/use-mobile';

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  
  const { data: project, isLoading: projectLoading, error: projectError } = useCrowdfundingProject(projectId!);
  const { data: contributions = [], isLoading: contributionsLoading } = useProjectContributions(projectId!);

  if (projectLoading) {
    return (
      <div className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-tokenx-dark-light rounded w-1/4"></div>
            <div className="h-64 bg-tokenx-dark-light rounded"></div>
            <div className="h-32 bg-tokenx-dark-light rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (projectError || !project) {
    return (
      <div className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto py-12">
          <div className="text-center">
            <p className="text-destructive">Projet non trouvé</p>
            <Button onClick={() => navigate('/crowdfunding')} className="mt-4">
              Retour aux projets
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const progressPercentage = (project.current_amount / project.goal_amount) * 100;
  const daysLeft = Math.ceil((new Date(project.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const contributorsCount = [...new Set(contributions.map(c => c.contributor_id))].length;

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
    <div className="min-h-screen pt-16">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/crowdfunding')}
            className="mb-6 text-muted hover:text-body"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux projets
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project Header */}
              <Card className="card-glass">
                <CardHeader>
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div className="flex gap-2">
                      <Badge className={`${getStatusColor(project.status)} text-white`}>
                        {getStatusText(project.status)}
                      </Badge>
                      {project.category && (
                        <Badge variant="secondary">
                          {project.category}
                        </Badge>
                      )}
                    </div>
                    <Badge variant="outline" className={getTokenColor(project.token_type)}>
                      {project.token_type}
                    </Badge>
                  </div>
                  <CardTitle className={`text-secondary ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {project.image_url && (
                    <img 
                      src={project.image_url} 
                      alt={project.title}
                      className="w-full h-64 object-cover rounded-lg mb-6"
                    />
                  )}
                  <p className="text-body leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>
              </Card>

              {/* Contributions */}
              <Card className="card-glass">
                <CardHeader>
                  <CardTitle className="text-secondary text-xl">
                    Contributions ({contributions.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {contributionsLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-16 bg-tokenx-dark-light animate-pulse rounded"></div>
                      ))}
                    </div>
                  ) : contributions.length === 0 ? (
                    <p className="text-muted">Aucune contribution pour le moment</p>
                  ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {contributions.map((contribution) => (
                        <div 
                          key={contribution.id} 
                          className="flex justify-between items-center p-4 bg-tokenx-dark-light rounded-lg"
                        >
                          <div>
                            <p className="text-body font-medium">
                              {contribution.amount.toLocaleString()} {contribution.token_type}
                            </p>
                            <p className="text-subtle text-sm">
                              {format(new Date(contribution.created_at), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                            </p>
                          </div>
                          <Badge variant="outline" className={getTokenColor(contribution.token_type)}>
                            {contribution.token_type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progress Card */}
              <Card className="card-glass">
                <CardHeader>
                  <CardTitle className="text-secondary text-xl">Progression</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Objectif</span>
                      <span className="text-body font-medium">
                        {progressPercentage.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted">Collecté</span>
                      <span className={`font-bold ${getTokenColor(project.token_type)}`}>
                        {project.current_amount.toLocaleString()} {project.token_type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Objectif</span>
                      <span className="text-body font-medium">
                        {project.goal_amount.toLocaleString()} {project.token_type}
                      </span>
                    </div>
                  </div>

                  {project.status === 'active' && (
                    <ContributeModal 
                      projectId={project.id} 
                      projectTitle={project.title}
                      trigger={
                        <Button className="w-full btn-gradient">
                          <Coins className="w-4 h-4 mr-2" />
                          Contribuer au Projet
                        </Button>
                      }
                    />
                  )}
                </CardContent>
              </Card>

              {/* Stats Card */}
              <Card className="card-glass">
                <CardHeader>
                  <CardTitle className="text-secondary text-xl">Statistiques</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted">
                      <Users className="w-4 h-4" />
                      <span>Contributeurs</span>
                    </div>
                    <span className="text-body font-medium">{contributorsCount}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted">
                      <Clock className="w-4 h-4" />
                      <span>Temps restant</span>
                    </div>
                    <span className="text-body font-medium">
                      {daysLeft > 0 ? `${daysLeft} jours` : 'Terminé'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted">
                      <Calendar className="w-4 h-4" />
                      <span>Date de fin</span>
                    </div>
                    <span className="text-body font-medium">
                      {format(new Date(project.end_date), 'dd/MM/yyyy', { locale: fr })}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted">
                      <Target className="w-4 h-4" />
                      <span>Contributions</span>
                    </div>
                    <span className="text-body font-medium">{contributions.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
