
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Zap, Shield, Globe } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Tokens Créés', value: '10,000+', icon: Zap },
    { label: 'Utilisateurs Actifs', value: '50,000+', icon: Users },
    { label: 'Volume Échangé', value: '$100M+', icon: Globe },
    { label: 'Transactions Sécurisées', value: '1M+', icon: Shield }
  ];

  const team = [
    {
      name: 'Alex Veegox',
      role: 'CEO & Fondateur',
      description: 'Expert en blockchain avec 8+ ans d\'expérience'
    },
    {
      name: 'Sarah Chen',
      role: 'CTO',
      description: 'Architecte blockchain et développeuse smart contracts'
    },
    {
      name: 'Marc Dubois',
      role: 'Head of Product',
      description: 'Spécialiste UX/UI et produits décentralisés'
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-tokenx-purple to-tokenx-blue">
            À propos de TokenX
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Propulsé par Veegox
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            TokenX by Veegox est la plateforme d'échange décentralisée nouvelle génération, 
            permettant à chacun de créer, déployer et trader ses propres tokens en toute simplicité.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="card-gradient border border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Notre Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Démocratiser l'accès à la création de tokens et rendre les échanges décentralisés 
                accessibles à tous, des débutants aux experts en crypto.
              </p>
            </CardContent>
          </Card>

          <Card className="card-gradient border border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Notre Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Construire l'infrastructure Web3 la plus intuitive et sécurisée pour permettre 
                l'innovation financière décentralisée à grande échelle.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
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

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Notre Équipe</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="card-gradient border border-gray-800/50">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-tokenx-purple to-tokenx-blue mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <CardTitle className="text-white">{member.name}</CardTitle>
                  <CardDescription className="text-tokenx-purple font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="card-gradient border border-gray-800/50 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Rejoignez la Révolution TokenX
            </h2>
            <p className="text-gray-400 mb-6">
              Commencez à créer et trader vos tokens dès maintenant
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="btn-gradient">
                Créer mon Token
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300">
                Découvrir le Marché
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
