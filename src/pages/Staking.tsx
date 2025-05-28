
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Coins, TrendingUp, Clock, Zap, Shield, Gift } from 'lucide-react';

const Staking = () => {
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');

  const stakingPools = [
    {
      name: 'TKX Principal',
      apy: '12.5%',
      duration: 'Flexible',
      tvl: '$2.4M',
      myStake: '1,250 TKX',
      rewards: '45.2 TKX',
      status: 'active',
      minStake: '10 TKX'
    },
    {
      name: 'TKX-ETH LP',
      apy: '18.7%',
      duration: '30 jours',
      tvl: '$1.8M',
      myStake: '0 TKX',
      rewards: '0 TKX',
      status: 'available',
      minStake: '50 TKX'
    },
    {
      name: 'TKX Gouvernance',
      apy: '8.3%',
      duration: '90 jours',
      tvl: '$950K',
      myStake: '500 TKX',
      rewards: '12.8 TKX',
      status: 'locked',
      minStake: '100 TKX'
    }
  ];

  const stats = [
    { label: 'Total Staké', value: '1,750 TKX', icon: Coins, color: 'text-purple-400' },
    { label: 'Récompenses Totales', value: '58.0 TKX', icon: Gift, color: 'text-green-400' },
    { label: 'APY Moyen', value: '11.2%', icon: TrendingUp, color: 'text-blue-400' },
    { label: 'Prochaine Récompense', value: '6h 32m', icon: Clock, color: 'text-yellow-400' }
  ];

  const transactions = [
    { type: 'Stake', amount: '500 TKX', pool: 'TKX Principal', date: '2024-01-15', status: 'Confirmé' },
    { type: 'Reward', amount: '12.3 TKX', pool: 'TKX Principal', date: '2024-01-14', status: 'Confirmé' },
    { type: 'Stake', amount: '750 TKX', pool: 'TKX Principal', date: '2024-01-10', status: 'Confirmé' },
    { type: 'Unstake', amount: '200 TKX', pool: 'TKX-ETH LP', date: '2024-01-08', status: 'En cours' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'available': return 'bg-blue-500';
      case 'locked': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'available': return 'Disponible';
      case 'locked': return 'Verrouillé';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-tokenx-purple to-tokenx-blue">
            Staking
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Staking TokenX
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Stakez vos tokens TKX et gagnez des récompenses passives tout en sécurisant le réseau
          </p>
        </div>

        {/* Stats Overview */}
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

        <Tabs defaultValue="pools" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-tokenx-dark-light">
            <TabsTrigger value="pools">Pools de Staking</TabsTrigger>
            <TabsTrigger value="my-stakes">Mes Stakes</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
          </TabsList>

          {/* Staking Pools */}
          <TabsContent value="pools" className="space-y-6">
            <div className="grid gap-6">
              {stakingPools.map((pool, index) => (
                <Card key={index} className="card-gradient border border-gray-800/50">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-white">{pool.name}</CardTitle>
                          <Badge className={`${getStatusColor(pool.status)} text-white`}>
                            {getStatusText(pool.status)}
                          </Badge>
                        </div>
                        <CardDescription>
                          Minimum: {pool.minStake} • Durée: {pool.duration}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">{pool.apy}</div>
                        <div className="text-sm text-gray-400">APY</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-6">
                      <div>
                        <div className="text-sm text-gray-400">TVL</div>
                        <div className="text-white font-semibold">{pool.tvl}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Mon Stake</div>
                        <div className="text-white font-semibold">{pool.myStake}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Récompenses</div>
                        <div className="text-green-400 font-semibold">{pool.rewards}</div>
                      </div>
                      <div className="flex items-end">
                        {pool.status === 'active' && (
                          <Button size="sm" className="btn-gradient w-full">
                            Réclamer
                          </Button>
                        )}
                        {pool.status === 'available' && (
                          <Button size="sm" className="btn-gradient w-full">
                            Staker
                          </Button>
                        )}
                        {pool.status === 'locked' && (
                          <Button size="sm" variant="outline" className="w-full border-gray-600" disabled>
                            Verrouillé
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Stakes */}
          <TabsContent value="my-stakes" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Stake */}
              <Card className="card-gradient border border-gray-800/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-green-400" />
                    Staker des Tokens
                  </CardTitle>
                  <CardDescription>
                    Stakez vos TKX pour gagner des récompenses
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Montant à staker</label>
                    <Input
                      placeholder="0.00"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      className="bg-gray-900 border-gray-700 text-white"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Balance: 2,847 TKX</span>
                      <button className="text-tokenx-purple hover:underline">Max</button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 p-3 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Récompenses estimées/an</span>
                      <span className="text-green-400">~{stakeAmount ? (parseFloat(stakeAmount) * 0.125).toFixed(1) : '0'} TKX</span>
                    </div>
                  </div>

                  <Button className="w-full btn-gradient">
                    Staker TKX
                  </Button>
                </CardContent>
              </Card>

              {/* Unstake */}
              <Card className="card-gradient border border-gray-800/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-400" />
                    Unstaker des Tokens
                  </CardTitle>
                  <CardDescription>
                    Retirez vos tokens stakés (période de déblocage de 7 jours)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Montant à unstaker</label>
                    <Input
                      placeholder="0.00"
                      value={unstakeAmount}
                      onChange={(e) => setUnstakeAmount(e.target.value)}
                      className="bg-gray-900 border-gray-700 text-white"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Staké: 1,750 TKX</span>
                      <button className="text-tokenx-purple hover:underline">Max</button>
                    </div>
                  </div>

                  <div className="bg-gray-900 p-3 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Période de déblocage</span>
                      <span className="text-yellow-400">7 jours</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                    Unstaker TKX
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Active Stakes Progress */}
            <Card className="card-gradient border border-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white">Stakes en Cours de Déblocage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-900 rounded-lg">
                    <div>
                      <div className="text-white font-semibold">200 TKX</div>
                      <div className="text-sm text-gray-400">Disponible dans 3 jours</div>
                    </div>
                    <div className="text-right">
                      <Progress value={60} className="w-24 mb-2" />
                      <div className="text-xs text-gray-400">60%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History */}
          <TabsContent value="history" className="space-y-6">
            <Card className="card-gradient border border-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white">Historique des Transactions</CardTitle>
                <CardDescription>
                  Toutes vos activités de staking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.map((tx, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-gray-900 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          tx.type === 'Stake' ? 'bg-green-400' :
                          tx.type === 'Unstake' ? 'bg-red-400' : 'bg-blue-400'
                        }`} />
                        <div>
                          <div className="text-white font-medium">
                            {tx.type} - {tx.amount}
                          </div>
                          <div className="text-sm text-gray-400">{tx.pool}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">{tx.date}</div>
                        <Badge variant={tx.status === 'Confirmé' ? 'default' : 'secondary'}>
                          {tx.status}
                        </Badge>
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

export default Staking;
