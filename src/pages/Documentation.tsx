
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Code, Book, Zap, Shield, ArrowRight } from 'lucide-react';

const Documentation = () => {
  const apiEndpoints = [
    {
      method: 'GET',
      endpoint: '/api/tokens',
      description: 'Récupérer la liste de tous les tokens'
    },
    {
      method: 'POST',
      endpoint: '/api/tokens/create',
      description: 'Créer un nouveau token'
    },
    {
      method: 'GET',
      endpoint: '/api/wallet/{address}',
      description: 'Obtenir les informations d\'un wallet'
    },
    {
      method: 'POST',
      endpoint: '/api/trade',
      description: 'Exécuter un trade'
    }
  ];

  const guides = [
    {
      title: 'Créer votre premier Token',
      description: 'Guide complet pour déployer un token ERC-20',
      duration: '10 min',
      level: 'Débutant'
    },
    {
      title: 'Intégrer l\'API TokenX',
      description: 'Documentation pour les développeurs',
      duration: '30 min',
      level: 'Avancé'
    },
    {
      title: 'Trading Automatisé',
      description: 'Configurer des bots de trading',
      duration: '20 min',
      level: 'Intermédiaire'
    },
    {
      title: 'Sécurité Smart Contracts',
      description: 'Meilleures pratiques de sécurité',
      duration: '45 min',
      level: 'Expert'
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-tokenx-purple to-tokenx-blue">
            Documentation
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Documentation TokenX
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tout ce que vous devez savoir pour utiliser TokenX et intégrer nos APIs
          </p>
        </div>

        <Tabs defaultValue="getting-started" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-tokenx-dark-light">
            <TabsTrigger value="getting-started">Commencer</TabsTrigger>
            <TabsTrigger value="api">API Reference</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="sdk">SDK</TabsTrigger>
          </TabsList>

          {/* Getting Started */}
          <TabsContent value="getting-started" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="card-gradient border border-gray-800/50">
                <CardHeader>
                  <Book className="w-8 h-8 text-tokenx-purple mb-2" />
                  <CardTitle className="text-white">Guide de Démarrage</CardTitle>
                  <CardDescription>
                    Apprenez les bases de TokenX en quelques minutes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Connexion de votre wallet</li>
                    <li>• Création de votre premier token</li>
                    <li>• Navigation sur le marketplace</li>
                    <li>• Exécution de votre premier trade</li>
                  </ul>
                  <Button className="w-full mt-4 btn-gradient">
                    Commencer <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="card-gradient border border-gray-800/50">
                <CardHeader>
                  <Code className="w-8 h-8 text-tokenx-blue mb-2" />
                  <CardTitle className="text-white">Pour les Développeurs</CardTitle>
                  <CardDescription>
                    Intégrez TokenX dans vos applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <code className="text-green-400 text-sm">
                      npm install @tokenx/sdk
                    </code>
                  </div>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300">
                    Voir la Documentation API
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* API Reference */}
          <TabsContent value="api" className="space-y-6">
            <Card className="card-gradient border border-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white">Endpoints API</CardTitle>
                <CardDescription>
                  API REST pour interagir avec TokenX
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiEndpoints.map((endpoint, index) => (
                    <div key={index} className="border border-gray-800 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'}>
                          {endpoint.method}
                        </Badge>
                        <code className="text-tokenx-purple font-mono">
                          {endpoint.endpoint}
                        </code>
                      </div>
                      <p className="text-gray-400 text-sm">{endpoint.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guides */}
          <TabsContent value="guides" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {guides.map((guide, index) => (
                <Card key={index} className="card-gradient border border-gray-800/50">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-white">{guide.title}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {guide.level}
                      </Badge>
                    </div>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">{guide.duration}</span>
                      <Button size="sm" className="btn-gradient">
                        Lire le Guide
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* SDK */}
          <TabsContent value="sdk" className="space-y-6">
            <Card className="card-gradient border border-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white">TokenX SDK</CardTitle>
                <CardDescription>
                  SDK JavaScript/TypeScript pour une intégration rapide
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 p-6 rounded-lg mb-6">
                  <pre className="text-green-400 text-sm">
{`import { TokenX } from '@tokenx/sdk';

const tokenx = new TokenX({
  apiKey: 'your-api-key',
  network: 'mainnet'
});

// Créer un token
const token = await tokenx.createToken({
  name: 'MyToken',
  symbol: 'MTK',
  totalSupply: 1000000
});`}
                  </pre>
                </div>
                <Button className="btn-gradient">
                  Télécharger le SDK
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Documentation;
