
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Wallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress] = useState('0x742d35...9d63');

  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', balance: '2.4567', value: '$4,123.45', change: '+2.3%' },
    { symbol: 'USER', name: 'UserToken', balance: '1,250.00', value: '$5,940.00', change: '+2.8%' },
    { symbol: 'VGX', name: 'VeegoxCoin', balance: '45.67', value: '$568.59', change: '-1.2%' },
    { symbol: 'META', name: 'MetaToken', balance: '890.12', value: '$779.96', change: '+5.4%' },
  ];

  const transactions = [
    {
      type: 'receive',
      token: 'USER',
      amount: '+125.00',
      value: '$594.00',
      time: '2 min ago',
      hash: '0xabc123...'
    },
    {
      type: 'send',
      token: 'ETH',
      amount: '-0.1234',
      value: '$245.67',
      time: '1 hour ago',
      hash: '0xdef456...'
    },
    {
      type: 'trade',
      token: 'VGX',
      amount: '+15.50',
      value: '$192.95',
      time: '3 hours ago',
      hash: '0xghi789...'
    },
  ];

  const connectWallet = () => {
    setIsConnected(true);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <Card className="card-gradient border-gray-800 w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-2xl mb-2">Connecter votre Wallet</CardTitle>
            <CardDescription className="text-gray-400">
              Connectez votre wallet pour accéder à vos tokens et commencer à trader
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={connectWallet}
              className="w-full btn-gradient glow-effect py-3"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169-.225-.488-.225-.657 0l-2.07 2.07-2.07-2.07c-.169-.225-.488-.225-.657 0-.225.169-.225.488 0 .657L14.184 11l-2.07 2.07c-.225.169-.225.488 0 .657.084.084.197.127.328.127s.244-.043.328-.127L14.84 11.66l2.07 2.07c.084.084.197.127.328.127s.244-.043.328-.127c.225-.169.225-.488 0-.657L15.496 11l2.07-2.07c.226-.226.226-.488.002-.77z"/>
              </svg>
              MetaMask
            </Button>
            <Button 
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:border-tokenx-purple hover:text-tokenx-purple"
            >
              WalletConnect
            </Button>
            <Button 
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:border-tokenx-purple hover:text-tokenx-purple"
            >
              Coinbase Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Mon Wallet</h1>
            <p className="text-gray-400">Adresse: {walletAddress}</p>
          </div>
          <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
            Déconnecter
          </Button>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="card-gradient border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-lg">Valeur Totale</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">$11,412.00</p>
              <p className="text-green-400 text-sm">+$234.56 (+2.1%)</p>
            </CardContent>
          </Card>

          <Card className="card-gradient border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-lg">Profit/Perte 24h</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-400">+$456.78</p>
              <p className="text-green-400 text-sm">+4.17%</p>
            </CardContent>
          </Card>

          <Card className="card-gradient border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-lg">Tokens Détenus</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">4</p>
              <p className="text-gray-400 text-sm">Différents tokens</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="bg-tokenx-dark-light border border-gray-800">
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-tokenx-purple">
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-tokenx-purple">
              Transactions
            </TabsTrigger>
            <TabsTrigger value="send" className="data-[state=active]:bg-tokenx-purple">
              Envoyer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tokens.map((token, index) => (
                <Card key={index} className="card-gradient border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-tokenx-purple to-tokenx-blue flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{token.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{token.name}</h3>
                          <p className="text-gray-400 text-sm">{token.symbol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">{token.balance}</p>
                        <p className="text-gray-400 text-sm">{token.value}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className={`text-sm ${token.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                        {token.change}
                      </p>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Acheter
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                          Vendre
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <Card className="card-gradient border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Historique des Transactions</CardTitle>
                <CardDescription className="text-gray-400">
                  Vos dernières transactions sur TokenX
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((tx, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-tokenx-dark border border-gray-800">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === 'receive' ? 'bg-green-600' :
                          tx.type === 'send' ? 'bg-red-600' : 'bg-blue-600'
                        }`}>
                          {tx.type === 'receive' ? '↓' : tx.type === 'send' ? '↑' : '⇄'}
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {tx.type === 'receive' ? 'Reçu' : tx.type === 'send' ? 'Envoyé' : 'Échangé'} {tx.token}
                          </p>
                          <p className="text-gray-400 text-sm">{tx.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${tx.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {tx.amount}
                        </p>
                        <p className="text-gray-400 text-sm">{tx.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="send">
            <Card className="card-gradient border-gray-800 max-w-2xl">
              <CardHeader>
                <CardTitle className="text-white">Envoyer des Tokens</CardTitle>
                <CardDescription className="text-gray-400">
                  Transférer vos tokens vers une autre adresse
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="recipient" className="text-white">Adresse du destinataire</Label>
                  <Input
                    id="recipient"
                    placeholder="0x..."
                    className="bg-tokenx-dark border-gray-700 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-white">Montant</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      className="bg-tokenx-dark border-gray-700 text-white flex-1"
                    />
                    <select className="bg-tokenx-dark border border-gray-700 text-white rounded-md px-3 py-2">
                      <option>ETH</option>
                      <option>USER</option>
                      <option>VGX</option>
                      <option>META</option>
                    </select>
                  </div>
                </div>

                <div className="bg-tokenx-dark border border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Frais de transaction</span>
                    <span className="text-white">~0.002 ETH</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Temps estimé</span>
                    <span className="text-white">~2-5 minutes</span>
                  </div>
                </div>

                <Button className="w-full btn-gradient glow-effect">
                  Envoyer la Transaction
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Wallet;
