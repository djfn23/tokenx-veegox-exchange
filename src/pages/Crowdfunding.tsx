
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCrowdfundingProjects } from '@/hooks/useCrowdfunding';
import ProjectCard from '@/components/Crowdfunding/ProjectCard';
import CreateProjectModal from '@/components/Crowdfunding/CreateProjectModal';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useResponsive } from '@/hooks/use-mobile';

const Crowdfunding = () => {
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const { data: projects = [], isLoading, error } = useCrowdfundingProjects();

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(projects.map(p => p.category).filter(Boolean))];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="w-4 h-4" />;
      case 'funded': return <CheckCircle className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Projets Actifs';
      case 'funded': return 'Projets Financés';
      case 'failed': return 'Projets Échoués';
      case 'cancelled': return 'Projets Annulés';
      default: return 'Tous les Projets';
    }
  };

  const projectsByStatus = {
    all: filteredProjects,
    active: filteredProjects.filter(p => p.status === 'active'),
    funded: filteredProjects.filter(p => p.status === 'funded'),
    failed: filteredProjects.filter(p => p.status === 'failed'),
    cancelled: filteredProjects.filter(p => p.status === 'cancelled')
  };

  if (error) {
    return (
      <div className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-12">
          <div className="text-center">
            <p className="text-destructive">Erreur lors du chargement des projets</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className={`font-bold text-secondary mb-6 text-glow-white ${
            isMobile ? 'text-4xl' : 'text-5xl md:text-6xl'
          }`}>
            Crowdfunding{' '}
            <span className="text-primary">
              TokenX
            </span>
          </h1>
          <p className={`text-muted max-w-3xl mx-auto mb-8 ${
            isMobile ? 'text-lg' : 'text-xl'
          }`}>
            Financez vos projets innovants avec les tokens de la communauté TokenX. 
            Créez, contribuez et participez à l'écosystème décentralisé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <CreateProjectModal />
            <Button 
              variant="outline"
              className="border-2 border-tokenx-purple/50 text-accent hover:bg-tokenx-purple hover:text-white transition-all duration-300"
              onClick={() => document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Explorer les Projets
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects-section" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-tokenx-dark-light/30">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                  <Input
                    placeholder="Rechercher des projets..."
                    className="pl-10 bg-tokenx-dark-light border-tokenx-glass-border text-body"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px] bg-tokenx-dark-light border-tokenx-glass-border text-body">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent className="bg-tokenx-dark-card border-tokenx-glass-border">
                    <SelectItem value="all" className="text-body">Toutes</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category} className="text-body">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Tabs for different status */}
          <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-tokenx-dark-light border border-tokenx-glass-border">
              <TabsTrigger value="all" className="data-[state=active]:bg-tokenx-purple data-[state=active]:text-white">
                Tous ({projectsByStatus.all.length})
              </TabsTrigger>
              <TabsTrigger value="active" className="data-[state=active]:bg-tokenx-purple data-[state=active]:text-white">
                <div className="flex items-center gap-2">
                  {getStatusIcon('active')}
                  <span className={isMobile ? 'hidden' : ''}>Actifs</span>
                  <span>({projectsByStatus.active.length})</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="funded" className="data-[state=active]:bg-tokenx-purple data-[state=active]:text-white">
                <div className="flex items-center gap-2">
                  {getStatusIcon('funded')}
                  <span className={isMobile ? 'hidden' : ''}>Financés</span>
                  <span>({projectsByStatus.funded.length})</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="failed" className="data-[state=active]:bg-tokenx-purple data-[state=active]:text-white">
                <div className="flex items-center gap-2">
                  {getStatusIcon('failed')}
                  <span className={isMobile ? 'hidden' : ''}>Échoués</span>
                  <span>({projectsByStatus.failed.length})</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="data-[state=active]:bg-tokenx-purple data-[state=active]:text-white">
                <div className="flex items-center gap-2">
                  {getStatusIcon('cancelled')}
                  <span className={isMobile ? 'hidden' : ''}>Annulés</span>
                  <span>({projectsByStatus.cancelled.length})</span>
                </div>
              </TabsTrigger>
            </TabsList>

            {Object.entries(projectsByStatus).map(([status, statusProjects]) => (
              <TabsContent key={status} value={status} className="mt-8">
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-80 bg-tokenx-dark-light animate-pulse rounded-lg"></div>
                    ))}
                  </div>
                ) : statusProjects.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted text-lg">
                      {searchTerm || selectedCategory !== 'all' 
                        ? 'Aucun projet ne correspond à vos critères' 
                        : `Aucun projet ${getStatusText(status).toLowerCase()}`}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {statusProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onViewDetails={(projectId) => navigate(`/crowdfunding/${projectId}`)}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Crowdfunding;
