
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useBlockchainData } from '@/hooks/useBlockchainData';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Wallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();

  const { balances, transactions, isLoading, error, syncWalletData } = useBlockchainData(
    walletAddress, 
    userId
  );

  // Vérifier l'état de l'authentification
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserId(session.user.id);
        // Récupérer l'adresse wallet de l'utilisateur
        fetchUserWallet(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        fetchUserWallet(session.user.id);
      } else {
        setUserId(null);
        setWalletAddress(null);
        setIsConnected(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserWallet = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_wallets')
      .select('wallet_address')
      .eq('user_id', userId)
      .eq('is_primary', true)
      .single();

    if (data && !error) {
      setWalletAddress(data.wallet_address);
      setIsConnected(true);
    }
  };

  const connectWallet = async () => {
    // Simulation de connexion de wallet - en production, intégrer MetaMask
    const mockWalletAddress = '0x742d35Cc6Bf8fE7e9d63';
    
    if (userId) {
      // Sauvegarder l'adresse wallet dans Supabase
      const { error } = await supabase
        .from('user_wallets')
        .upsert({
          user_id: userId,
          wallet_address: mockWalletAddress,
          is_primary: true
        });

      if (!error) {
        setWalletAddress(mockWalletAddress);
        setIsConnected(true);
        
        // Synchroniser les données avec Alchemy
        await syncWalletData();
        
        toast({
          title: "Wallet connecté",
          description: "Votre wallet a été connecté avec succès",
        });
      }
    } else {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour lier un wallet",
        variant: "destructive"
      });
    }
  };

  // Calculer la valeur totale du portfolio
  const totalValue = Object.entries(balances).reduce((total, [token, balance]) => {
    const prices = { VEX: 4.752, sVEX: 5.234, gVEX: 6.123 }; // Prix mockés
    return total + (balance * (prices[token as keyof typeof prices] || 0));
  }, 0);

  if (!userId) {
    return (
      <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <Card className="card-gradient border-gray-800 w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-2xl mb-2">Connectez-vous</CardTitle>
            <CardDescription className="text-gray-400">
              Vous devez être connecté pour accéder à votre wallet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => window.location.href = '/auth'}
              className="w-full btn-gradient glow-effect py-3"
            >
              Se connecter
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <Card className="card-gradient border-gray-800 w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-2xl mb-2">Connecter votre Wallet</CardTitle>
            <CardDescription className="text-gray-400">
              Connectez votre wallet pour accéder à vos tokens Veegox
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={connectWallet}
              className="w-full btn-gradient glow-effect py-3"
              disabled={isLoading}
            >
              {isLoading ? 'Connexion...' : 'Connecter MetaMask'}
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
            <h1 className="text-4xl font-bold text-white mb-2">Mon Wallet Veegox</h1>
            <p className="text-gray-400">Adresse: {walletAddress}</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={syncWalletData}
              disabled={isLoading}
              className="btn-gradient"
            >
              {isLoading ? 'Synchronisation...' : 'Synchroniser'}
            </Button>
            <Button 
              variant="outline" 
              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
              onClick={() => setIsConnected(false)}
            >
              Déconnecter
            </Button>
          </div>
        </div>

        {error && (
          <Card className="card-gradient border-red-600 mb-6">
            <CardContent className="p-4">
              <p className="text-red-400">Erreur: {error}</p>
            </CardContent>
          </Card>
        )}

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="card-gradient border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-lg">Valeur Totale</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">${totalValue.toFixed(2)}</p>
              <p className="text-green-400 text-sm">Portfolio Veegox</p>
            </CardContent>
          </Card>

          <Card className="card-gradient border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-lg">VEX Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{(balances.VEX || 0).toFixed(2)}</p>
              <p className="text-blue-400 text-sm">Token principal</p>
            </CardContent>
          </Card>

          <Card className="card-gradient border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-lg">Tokens Stakés</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{(balances.sVEX || 0).toFixed(2)}</p>
              <p className="text-purple-400 text-sm">sVEX</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="bg-tokenx-dark-light border border-gray-800">
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-tokenx-purple">
              Portfolio Veegox
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
              {Object.entries(balances).map(([token, balance]) => (
                <Card key={token} className="card-gradient border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-tokenx-purple to-tokenx-blue flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{token}</span>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">
                            {token === 'VEX' ? 'Veegox Token' : 
                             token === 'sVEX' ? 'Staked VEX' : 'Governance VEX'}
                          </h3>
                          <p className="text-gray-400 text-sm">{token}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">{balance.toFixed(4)}</p>
                        <p className="text-gray-400 text-sm">
                          ${(balance * (token === 'VEX' ? 4.752 : token === 'sVEX' ? 5.234 : 6.123)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                        Acheter
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                        Vendre
                      </Button>
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
                  Vos dernières transactions Veegox
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.length > 0 ? transactions.slice(0, 10).map((tx, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-tokenx-dark border border-gray-800">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                          ⇄
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {tx.transaction_type === 'transfer' ? 'Transfert' : tx.transaction_type}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {new Date(tx.created_at).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">
                          {tx.amount.toFixed(4)} {tx.token_type}
                        </p>
                        <p className="text-gray-400 text-sm">{tx.status}</p>
                      </div>
                    </div>
                  )) : (
                    <p className="text-gray-400 text-center py-8">
                      Aucune transaction trouvée. Connectez votre wallet et synchronisez pour voir vos transactions.
                    </p>
                  )}
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
