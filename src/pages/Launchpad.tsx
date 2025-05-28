
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Rocket, TrendingUp, Clock, Star, Users, Target } from 'lucide-react';

const Launchpad = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const projects = [
    {
      id: '1',
      name: 'DeFiMax Protocol',
      symbol: 'DMAX',
      description: 'Protocole de lending décentralisé avec yield farming optimisé',
      status: 'upcoming',
      launchDate: '2024-02-01',
      totalRaise: '$2.5M',
      price: '$0.15',
      participants: 0,
      maxParticipants: 1000,
      progress: 0,
      allocation: '2,500 USDT',
      category: 'DeFi',
      rating: 4.8,
      logo: '🔷'
    },
    {
      id: '2',
      name: 'GameChain Studios',
      symbol: 'GCS',
      description: 'Plateforme de jeux blockchain avec NFT intégrés',
      status: 'active',
      launchDate: '2024-01-28',
      totalRaise: '$1.8M',
      price: '$0.08',
      participants: 847,
      maxParticipants: 1200,
      progress: 71,
      allocation: '1,800 USDT',
      category: 'Gaming',
      rating: 4.6,
      logo: '🎮'
    },
    {
      id: '3',
      name: 'EcoToken Network',
      symbol: 'ECO',
      description: 'Blockchain verte pour les crédits carbone tokenisés',
      status: 'completed',
      launchDate: '2024-01-15',
      totalRaise: '$3.2M',
      price: '$0.25',
      participants: 1500,
      maxParticipants: 1500,
      progress: 100,
      allocation: '3,200 USDT',
      category: 'Green Tech',
      rating: 4.9,
      logo: '🌱'
    },
    {
      id: '4',
      name: 'Metaverse Builder',
      symbol: 'MVB',
      description: 'Outils de création pour mondes virtuels décentralisés',
      status: 'upcoming',
      launchDate: '2024-02-15',
      totalRaise: '$4.1M',
      price: '$0.32',
      participants: 0,
      maxParticipants: 800,
      progress: 0,
      allocation: '4,100 USDT',
      category: 'Metaverse',
      rating: 4.7,
      logo: '🏗️'
    }
  ];

  const stats = [
    { label: 'Projets Lancés', value: '24', icon: Rocket, color: 'text-purple-400' },
    { label: 'Fonds Levés', value: '$12.8M', icon: TrendingUp, color: 'text-green-400' },
    { label: 'Participants', value: '8,547', icon: Users, color: 'text-blue-400' },
    { label: 'ROI Moyen', value: '+284%', icon: Target, color: 'text-yellow-400' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500';
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'À venir';
      case 'active': return 'En cours';
      case 'completed': return 'Terminé';
      default: return status;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'DeFi': return 'bg-purple-500/20 text-purple-400';
      case 'Gaming': return 'bg-green-500/20 text-green-400';
      case 'Green Tech': return 'bg-emerald-500/20 text-emerald-400';
      case 'Metaverse': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-tokenx-purple to-tokenx-blue">
            Launchpad
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            TokenX Launchpad
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Découvrez et investissez dans les projets blockchain les plus prometteurs dès leur lancement
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="card-gradient border border-gray-800/50 text-center">
              <CardContent className="p-6">
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-tokenx-dark-light">
            <TabsTrigger value="projects">Projets</TabsTrigger>
            <TabsTrigger value="my-investments">Mes Investissements</TabsTrigger>
            <TabsTrigger value="apply">Candidater</TabsTrigger>
          </TabsList>

          {/* Projects */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex gap-4 mb-6">
              <Button variant="outline" size="sm" className="border-gray-600">
                Tous
              </Button>
              <Button variant="outline" size="sm" className="border-gray-600">
                En cours
              </Button>
              <Button variant="outline" size="sm" className="border-gray-600">
                À venir
              </Button>
              <Button variant="outline" size="sm" className="border-gray-600">
                Terminés
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="card-gradient border border-gray-800/50 hover:border-gray-700 transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{project.logo}</div>
                        <div>
                          <CardTitle className="text-white">{project.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getCategoryColor(project.category)}>
                              {project.category}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400" />
                              <span className="text-xs text-gray-400">{project.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(project.status)} text-white`}>
                        {getStatusText(project.status)}
                      </Badge>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Progress Bar */}
                    {project.status === 'active' && (
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Progression</span>
                          <span className="text-white">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>{project.participants} participants</span>
                          <span>Max: {project.maxParticipants}</span>
                        </div>
                      </div>
                    )}

                    {/* Project Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400">Prix Token</div>
                        <div className="text-white font-semibold">{project.price}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Levée Totale</div>
                        <div className="text-white font-semibold">{project.totalRaise}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Lancement</div>
                        <div className="text-white font-semibold">
                          {new Date(project.launchDate).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400">Mon Allocation</div>
                        <div className="text-tokenx-purple font-semibold">{project.allocation}</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      {project.status === 'upcoming' && (
                        <>
                          <Button size="sm" className="flex-1 btn-gradient">
                            <Clock className="w-4 h-4 mr-2" />
                            Bientôt
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-600">
                            Détails
                          </Button>
                        </>
                      )}
                      {project.status === 'active' && (
                        <>
                          <Button size="sm" className="flex-1 btn-gradient">
                            Participer
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-600">
                            Détails
                          </Button>
                        </>
                      )}
                      {project.status === 'completed' && (
                        <>
                          <Button size="sm" variant="outline" className="flex-1 border-gray-600">
                            Claim Tokens
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-600">
                            Voir
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Investments */}
          <TabsContent value="my-investments" className="space-y-6">
            <Card className="card-gradient border border-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white">Mes Investissements</CardTitle>
                <CardDescription>
                  Suivez vos participations aux IDO
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-900 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🌱</div>
                      <div>
                        <div className="text-white font-semibold">EcoToken Network</div>
                        <div className="text-sm text-gray-400">Investi: 1,200 USDT</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-semibold">+185%</div>
                      <Button size="sm" className="mt-2 btn-gradient">
                        Claim ECO
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gray-900 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🎮</div>
                      <div>
                        <div className="text-white font-semibold">GameChain Studios</div>
                        <div className="text-sm text-gray-400">Investi: 800 USDT</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-blue-400 font-semibold">En cours</div>
                      <div className="text-xs text-gray-400 mt-1">Tokens disponibles dans 2 jours</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Apply */}
          <TabsContent value="apply" className="space-y-6">
            <Card className="card-gradient border border-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white">Soumettre votre Projet</CardTitle>
                <CardDescription>
                  Candidatez pour lancer votre token sur TokenX Launchpad
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Rocket className="w-16 h-16 mx-auto mb-6 text-tokenx-purple" />
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Lancez votre Projet sur TokenX
                  </h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    Rejoignez l'écosystème TokenX et donnez vie à votre vision blockchain avec notre launchpad.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-tokenx-purple to-tokenx-blue rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <h4 className="text-white font-semibold mb-2">Soumission</h4>
                      <p className="text-sm text-gray-400">Envoyez votre dossier complet</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-tokenx-purple to-tokenx-blue rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <h4 className="text-white font-semibold mb-2">Évaluation</h4>
                      <p className="text-sm text-gray-400">Notre équipe évalue votre projet</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-tokenx-purple to-tokenx-blue rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <h4 className="text-white font-semibold mb-2">Lancement</h4>
                      <p className="text-sm text-gray-400">Déployez votre IDO</p>
                    </div>
                  </div>

                  <Button className="btn-gradient text-lg px-8 py-3">
                    Commencer la Candidature
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Launchpad;
