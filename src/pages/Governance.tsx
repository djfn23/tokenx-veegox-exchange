
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Vote, TrendingUp, Users, Clock, CheckCircle, XCircle } from 'lucide-react';

const Governance = () => {
  const [selectedVote, setSelectedVote] = useState<string | null>(null);

  const proposals = [
    {
      id: '1',
      title: 'Réduction des frais de trading à 0.25%',
      description: 'Proposition de réduire les frais de trading de 0.3% à 0.25% pour encourager plus de volume.',
      status: 'active',
      timeLeft: '5 jours',
      votesFor: 75,
      votesAgainst: 25,
      totalVotes: 12547,
      quorum: 10000,
      proposer: '0x742d...5a2f'
    },
    {
      id: '2',
      title: 'Ajout du support pour Polygon',
      description: 'Déployer TokenX sur le réseau Polygon pour des frais réduits et des transactions plus rapides.',
      status: 'active',
      timeLeft: '12 jours',
      votesFor: 82,
      votesAgainst: 18,
      totalVotes: 8934,
      quorum: 10000,
      proposer: '0x893b...7c9e'
    },
    {
      id: '3',
      title: 'Programme de récompenses pour les créateurs',
      description: 'Lancer un programme d\'incitation pour récompenser les créateurs de tokens populaires.',
      status: 'passed',
      timeLeft: 'Terminé',
      votesFor: 89,
      votesAgainst: 11,
      totalVotes: 15623,
      quorum: 10000,
      proposer: '0x1a2b...4d5e'
    },
    {
      id: '4',
      title: 'Mise à jour du protocole de sécurité',
      description: 'Améliorer les mesures de sécurité avec l\'ajout de vérifications multi-signatures.',
      status: 'failed',
      timeLeft: 'Terminé',
      votesFor: 35,
      votesAgainst: 65,
      totalVotes: 9876,
      quorum: 10000,
      proposer: '0x456f...8g9h'
    }
  ];

  const stats = [
    { label: 'Propositions Totales', value: '47', icon: Vote },
    { label: 'Participants Actifs', value: '15,234', icon: Users },
    { label: 'Tokens Stakés', value: '2.4M TKX', icon: TrendingUp },
    { label: 'Taux de Participation', value: '78%', icon: CheckCircle }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500';
      case 'passed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return Clock;
      case 'passed': return CheckCircle;
      case 'failed': return XCircle;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-tokenx-purple to-tokenx-blue">
            Gouvernance
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Gouvernance TokenX
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Participez aux décisions importantes de la plateforme et façonnez l'avenir de TokenX
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="card-gradient border border-gray-800/50 text-center">
              <CardContent className="p-6">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-tokenx-purple" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="proposals" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-tokenx-dark-light">
            <TabsTrigger value="proposals">Propositions</TabsTrigger>
            <TabsTrigger value="voting-power">Mon Pouvoir de Vote</TabsTrigger>
            <TabsTrigger value="create">Créer une Proposition</TabsTrigger>
          </TabsList>

          <TabsContent value="proposals" className="space-y-6">
            <div className="space-y-6">
              {proposals.map((proposal) => {
                const StatusIcon = getStatusIcon(proposal.status);
                const quorumReached = proposal.totalVotes >= proposal.quorum;
                
                return (
                  <Card key={proposal.id} className="card-gradient border border-gray-800/50">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className={`${getStatusColor(proposal.status)} text-white`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {proposal.status === 'active' ? 'En cours' : 
                               proposal.status === 'passed' ? 'Adoptée' : 'Rejetée'}
                            </Badge>
                            <span className="text-sm text-gray-400">par {proposal.proposer}</span>
                          </div>
                          <CardTitle className="text-white mb-2">{proposal.title}</CardTitle>
                          <CardDescription>{proposal.description}</CardDescription>
                        </div>
                        <div className="text-right text-sm text-gray-400">
                          <div>{proposal.timeLeft}</div>
                          <div>{proposal.totalVotes.toLocaleString()} votes</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Vote Progress */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-green-400">Pour: {proposal.votesFor}%</span>
                            <span className="text-red-400">Contre: {proposal.votesAgainst}%</span>
                          </div>
                          <div className="relative">
                            <Progress value={proposal.votesFor} className="h-3" />
                          </div>
                        </div>

                        {/* Quorum */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Quorum</span>
                            <span className={quorumReached ? 'text-green-400' : 'text-yellow-400'}>
                              {proposal.totalVotes.toLocaleString()} / {proposal.quorum.toLocaleString()}
                            </span>
                          </div>
                          <Progress 
                            value={(proposal.totalVotes / proposal.quorum) * 100} 
                            className="h-2" 
                          />
                        </div>

                        {/* Vote Buttons */}
                        {proposal.status === 'active' && (
                          <div className="flex gap-3">
                            <Button 
                              className="flex-1 bg-green-600 hover:bg-green-700"
                              onClick={() => setSelectedVote(`${proposal.id}-for`)}
                            >
                              Voter Pour
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex-1 border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                              onClick={() => setSelectedVote(`${proposal.id}-against`)}
                            >
                              Voter Contre
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="voting-power" className="space-y-6">
            <Card className="card-gradient border border-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white">Mon Pouvoir de Vote</CardTitle>
                <CardDescription>
                  Votre influence dans les décisions de gouvernance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">1,250 TKX</div>
                    <div className="text-gray-400">Tokens Stakés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-tokenx-purple mb-2">0.08%</div>
                    <div className="text-gray-400">Pouvoir de Vote</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">12</div>
                    <div className="text-gray-400">Votes Participés</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button className="w-full btn-gradient">
                    Staker plus de TKX
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300">
                    Déléguer mon Vote
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card className="card-gradient border border-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white">Créer une Proposition</CardTitle>
                <CardDescription>
                  Soumettez une nouvelle proposition à la communauté (Minimum: 1000 TKX stakés)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Vote className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Fonctionnalité à venir
                  </h3>
                  <p className="text-gray-400 mb-6">
                    L'interface de création de propositions sera bientôt disponible.
                  </p>
                  <Button className="btn-gradient">
                    Rejoindre la Liste d'Attente
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

export default Governance;
