
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useVeegoxChain } from '@/hooks/useVeegoxChain';
import { Activity, Blocks, Users, TrendingUp } from 'lucide-react';

const ChainExplorer = () => {
  const { chainConfig, latestBlocks, latestTransactions, validators, networkStats, isLoading } = useVeegoxChain();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-tokenx-purple mx-auto"></div>
            <p className="text-white mt-4">Chargement des données VeegoxChain...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            {chainConfig?.name || 'VeegoxChain'} Explorer
          </h1>
          <p className="text-gray-400">
            Explorer officiel de la blockchain Veegox
          </p>
        </div>

        {/* Statistiques réseau */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-gradient border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Dernier Bloc</CardTitle>
              <Blocks className="h-4 w-4 text-tokenx-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">#{networkStats.latestBlock}</div>
            </CardContent>
          </Card>

          <Card className="card-gradient border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Validateurs Actifs</CardTitle>
              <Users className="h-4 w-4 text-tokenx-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{networkStats.totalValidators}</div>
            </CardContent>
          </Card>

          <Card className="card-gradient border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Transactions Aujourd'hui</CardTitle>
              <Activity className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{networkStats.transactionsToday}</div>
            </CardContent>
          </Card>

          <Card className="card-gradient border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Transactions</CardTitle>
              <TrendingUp className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{networkStats.totalTransactions}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs pour explorer les données */}
        <Tabs defaultValue="blocks" className="space-y-6">
          <TabsList className="bg-tokenx-dark-light border border-gray-800">
            <TabsTrigger value="blocks" className="data-[state=active]:bg-tokenx-purple">
              Derniers Blocs
            </TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-tokenx-purple">
              Transactions
            </TabsTrigger>
            <TabsTrigger value="validators" className="data-[state=active]:bg-tokenx-purple">
              Validateurs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="blocks">
            <Card className="card-gradient border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Derniers Blocs</CardTitle>
                <CardDescription className="text-gray-400">
                  Les 10 derniers blocs minés sur VeegoxChain
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {latestBlocks.map((block) => (
                    <div key={block.block_hash} className="flex items-center justify-between p-4 rounded-lg bg-tokenx-dark border border-gray-800">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-tokenx-purple flex items-center justify-center">
                          <Blocks className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Bloc #{block.block_number}</p>
                          <p className="text-gray-400 text-sm">
                            {new Date(block.timestamp * 1000).toLocaleString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white">{block.transaction_count} transactions</p>
                        <p className="text-gray-400 text-sm">
                          Validateur: {block.validator.slice(0, 10)}...
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <Card className="card-gradient border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Dernières Transactions</CardTitle>
                <CardDescription className="text-gray-400">
                  Les 20 dernières transactions sur VeegoxChain
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {latestTransactions.map((tx) => (
                    <div key={tx.transaction_hash} className="flex items-center justify-between p-4 rounded-lg bg-tokenx-dark border border-gray-800">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                          <Activity className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {tx.transaction_hash.slice(0, 20)}...
                          </p>
                          <p className="text-gray-400 text-sm">
                            De: {tx.from_address.slice(0, 15)}...
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white">{parseFloat(tx.value).toFixed(4)} VEX</p>
                        <p className={`text-sm ${tx.status === 'confirmed' ? 'text-green-400' : 'text-yellow-400'}`}>
                          {tx.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="validators">
            <Card className="card-gradient border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Validateurs Actifs</CardTitle>
                <CardDescription className="text-gray-400">
                  Liste des validateurs sécurisant le réseau VeegoxChain
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {validators.map((validator) => (
                    <div key={validator.id} className="flex items-center justify-between p-4 rounded-lg bg-tokenx-dark border border-gray-800">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {validator.validator_address.slice(0, 20)}...
                          </p>
                          <p className="text-gray-400 text-sm">
                            {validator.delegators} délégateurs
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white">{parseFloat(validator.stake).toFixed(2)} VEX</p>
                        <p className="text-gray-400 text-sm">
                          Commission: {validator.commission_rate}%
                        </p>
                        <p className="text-green-400 text-sm">
                          Uptime: {validator.uptime}%
                        </p>
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

export default ChainExplorer;
