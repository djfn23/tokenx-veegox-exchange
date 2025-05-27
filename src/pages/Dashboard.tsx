
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const stats = [
    { title: 'Tokens Créés', value: '12', change: '+3 ce mois', color: 'text-blue-400' },
    { title: 'Volume de Trading', value: '$45,678', change: '+12.5%', color: 'text-green-400' },
    { title: 'Utilisateurs Actifs', value: '1,234', change: '+8.2%', color: 'text-purple-400' },
    { title: 'Revenus Générés', value: '$8,901', change: '+15.3%', color: 'text-yellow-400' },
  ];

  const myTokens = [
    {
      name: 'GameToken',
      symbol: 'GAME',
      supply: '1,000,000',
      holders: 145,
      volume24h: '$12,345',
      status: 'Active'
    },
    {
      name: 'SocialCoin',
      symbol: 'SOC',
      supply: '500,000',
      holders: 89,
      volume24h: '$8,901',
      status: 'Active'
    },
    {
      name: 'ArtToken',
      symbol: 'ART',
      supply: '100,000',
      holders: 234,
      volume24h: '$23,456',
      status: 'Active'
    },
  ];

  const recentActivity = [
    {
      action: 'Token créé',
      details: 'GameToken (GAME) déployé avec succès',
      time: '2 heures',
      status: 'success'
    },
    {
      action: 'Trading',
      details: '125 GAME vendus pour 0.5 ETH',
      time: '4 heures',
      status: 'info'
    },
    {
      action: 'Nouveau holder',
      details: '10 nouveaux holders pour SocialCoin',
      time: '6 heures',
      status: 'success'
    },
    {
      action: 'Liquidité ajoutée',
      details: '2 ETH ajoutés au pool ART/ETH',
      time: '1 jour',
      status: 'info'
    },
  ];

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard Administratif</h1>
          <p className="text-gray-400">Vue d'ensemble de votre activité sur TokenX</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="card-gradient border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-tokenx-purple to-tokenx-blue flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="tokens" className="space-y-6">
          <TabsList className="bg-tokenx-dark-light border border-gray-800">
            <TabsTrigger value="tokens" className="data-[state=active]:bg-tokenx-purple">
              Mes Tokens
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-tokenx-purple">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-tokenx-purple">
              Activité
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tokens">
            <Card className="card-gradient border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Mes Tokens Créés</CardTitle>
                <CardDescription className="text-gray-400">
                  Gérez et surveillez vos tokens déployés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left text-gray-400 py-3">Token</th>
                        <th className="text-left text-gray-400 py-3">Supply</th>
                        <th className="text-left text-gray-400 py-3">Holders</th>
                        <th className="text-left text-gray-400 py-3">Volume 24h</th>
                        <th className="text-left text-gray-400 py-3">Status</th>
                        <th className="text-left text-gray-400 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myTokens.map((token, index) => (
                        <tr key={index} className="border-b border-gray-800/50">
                          <td className="py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-tokenx-purple to-tokenx-blue flex items-center justify-center">
                                <span className="text-white font-bold text-xs">{token.symbol.slice(0, 2)}</span>
                              </div>
                              <div>
                                <p className="text-white font-medium">{token.name}</p>
                                <p className="text-gray-400 text-sm">{token.symbol}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 text-white">{token.supply}</td>
                          <td className="py-4 text-white">{token.holders}</td>
                          <td className="py-4 text-white">{token.volume24h}</td>
                          <td className="py-4">
                            <span className="px-2 py-1 rounded-full text-xs bg-green-600/20 text-green-400">
                              {token.status}
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:border-tokenx-purple hover:text-tokenx-purple">
                                Gérer
                              </Button>
                              <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:border-tokenx-blue hover:text-tokenx-blue">
                                Analytics
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-gradient border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Volume de Trading</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Graphique de volume (Chart.js à intégrer)
                  </div>
                </CardContent>
              </Card>

              <Card className="card-gradient border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Répartition des Holders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Graphique circulaire (Chart.js à intégrer)
                  </div>
                </CardContent>
              </Card>

              <Card className="card-gradient border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Performance des Tokens</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myTokens.map((token, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-tokenx-dark border border-gray-800">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-tokenx-purple to-tokenx-blue flex items-center justify-center">
                            <span className="text-white font-bold text-xs">{token.symbol.slice(0, 2)}</span>
                          </div>
                          <span className="text-white">{token.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">{token.volume24h}</p>
                          <p className="text-green-400 text-sm">+12.5%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="card-gradient border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Revenus Mensuels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Graphique de revenus (Chart.js à intégrer)
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="card-gradient border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Activité Récente</CardTitle>
                <CardDescription className="text-gray-400">
                  Historique de vos actions sur la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-tokenx-dark border border-gray-800">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.status === 'success' ? 'bg-green-600' : 'bg-blue-600'
                      }`}>
                        {activity.status === 'success' ? '✓' : 'i'}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{activity.action}</p>
                        <p className="text-gray-400 text-sm">{activity.details}</p>
                      </div>
                      <div className="text-gray-400 text-sm">
                        Il y a {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
