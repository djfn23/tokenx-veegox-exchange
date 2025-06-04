
import React, { useState } from 'react';
import { useProjects } from '@/hooks/useCrowdfunding';
import ProjectCard from '@/components/Crowdfunding/ProjectCard';
import CreateProjectModal from '@/components/Crowdfunding/CreateProjectModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Coins, TrendingUp, Target, Users, Plus, Sparkles } from 'lucide-react';

const Crowdfunding = () => {
  const navigate = useNavigate();
  const { data: projects, isLoading, error } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tokenFilter, setTokenFilter] = useState<string>('all');

  const filteredProjects = projects?.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesToken = tokenFilter === 'all' || project.token_type === tokenFilter;
    
    return matchesSearch && matchesStatus && matchesToken;
  });

  const activeProjects = projects?.filter(p => p.status === 'active').length || 0;
  const fundedProjects = projects?.filter(p => p.status === 'funded').length || 0;
  const totalRaised = projects?.reduce((sum, p) => sum + p.current_amount, 0) || 0;

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-4 border-tokenx-purple/30 border-t-tokenx-purple rounded-full animate-spin"></div>
              <span className="text-body text-lg">Chargement des projets...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-red-400">Erreur lors du chargement des projets</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-tokenx">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Logo TX */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-tokenx-purple to-tokenx-blue rounded-2xl flex items-center justify-center shadow-glow">
                <span className="text-2xl font-bold text-white">TX</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-tokenx-accent rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-5xl font-bold text-primary text-glow mb-2">
                Crowdfunding
              </h1>
              <p className="text-xl text-muted">Financez l'innovation avec des tokens</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Sparkles className="w-5 h-5 text-tokenx-accent animate-pulse" />
            <span className="text-subtle">Powered by TokenX Ecosystem</span>
            <Sparkles className="w-5 h-5 text-tokenx-accent animate-pulse" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="card-glass p-6 hover-lift">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-400 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{activeProjects}</p>
                <p className="text-muted text-sm">Projets Actifs</p>
              </div>
            </div>
          </div>
          
          <div className="card-glass p-6 hover-lift">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{fundedProjects}</p>
                <p className="text-muted text-sm">Projets Financés</p>
              </div>
            </div>
          </div>
          
          <div className="card-glass p-6 hover-lift">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-tokenx-purple to-tokenx-blue rounded-xl flex items-center justify-center">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{totalRaised.toLocaleString()}</p>
                <p className="text-muted text-sm">Tokens Levés</p>
              </div>
            </div>
          </div>
          
          <div className="card-glass p-6 hover-lift">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-tokenx-accent to-pink-400 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{projects?.length || 0}</p>
                <p className="text-muted text-sm">Total Projets</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="card-glass p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
                <Input
                  placeholder="Rechercher un projet..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-tokenx-dark-light/50 border-tokenx-glass-border focus:border-tokenx-purple"
                />
              </div>
              
              <div className="flex gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 bg-tokenx-dark-light/50 border-tokenx-glass-border">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent className="card-glass border-tokenx-glass-border">
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="funded">Financé</SelectItem>
                    <SelectItem value="failed">Échoué</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={tokenFilter} onValueChange={setTokenFilter}>
                  <SelectTrigger className="w-40 bg-tokenx-dark-light/50 border-tokenx-glass-border">
                    <Coins className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Token" />
                  </SelectTrigger>
                  <SelectContent className="card-glass border-tokenx-glass-border">
                    <SelectItem value="all">Tous les tokens</SelectItem>
                    <SelectItem value="VEX">VEX</SelectItem>
                    <SelectItem value="sVEX">sVEX</SelectItem>
                    <SelectItem value="gVEX">gVEX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <CreateProjectModal />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects && filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={(id) => navigate(`/crowdfunding/${id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="card-glass p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-tokenx-purple to-tokenx-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <Coins className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">Aucun projet trouvé</h3>
              <p className="text-muted mb-6">
                {searchTerm ? 'Aucun projet ne correspond à votre recherche.' : 'Soyez le premier à créer un projet de crowdfunding !'}
              </p>
              <CreateProjectModal 
                trigger={
                  <Button className="btn-gradient">
                    <Plus className="w-4 h-4 mr-2" />
                    Créer le premier projet
                  </Button>
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Crowdfunding;
