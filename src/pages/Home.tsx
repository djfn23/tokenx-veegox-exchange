
import { Button } from '@/components/ui/button';
import TradingChart from '@/components/UI/TradingChart';
import TokenCard from '@/components/UI/TokenCard';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const featuredTokens = [
    { name: 'UserToken', symbol: 'USER', price: 4.752, change: 2.8, volume: '$125K', marketCap: '$2.4M' },
    { name: 'VeegoxCoin', symbol: 'VGX', price: 12.45, change: -1.2, volume: '$89K', marketCap: '$5.1M' },
    { name: 'MetaToken', symbol: 'META', price: 0.8764, change: 5.4, volume: '$67K', marketCap: '$890K' },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-tokenx-purple to-tokenx-blue bg-clip-text text-transparent animate-fade-in">
              Créez Votre Propre
              <br />
              Crypto Token
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in">
              Lancez et tradez des tokens personnalisés sur notre plateforme d'échange sécurisée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button 
                size="lg" 
                className="btn-gradient glow-effect text-lg px-8 py-3"
                onClick={() => navigate('/create-token')}
              >
                Créer mon Token
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-3 border-tokenx-purple text-tokenx-purple hover:bg-tokenx-purple hover:text-white"
                onClick={() => navigate('/market')}
              >
                Explorer le Marché
              </Button>
            </div>
          </div>

          {/* Featured Chart */}
          <div className="max-w-4xl mx-auto mb-20">
            <TradingChart pair="USER / USDT" price={4.752} change={2.8} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Fonctionnalités Clés
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-gradient rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-tokenx-purple to-tokenx-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Création de Tokens</h3>
              <p className="text-gray-400">Créez et déployez vos tokens ERC-20 personnalisés en quelques clics</p>
            </div>

            <div className="card-gradient rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-tokenx-blue to-tokenx-purple rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Trading Avancé</h3>
              <p className="text-gray-400">Tradez vos tokens avec des outils professionnels et des graphiques en temps réel</p>
            </div>

            <div className="card-gradient rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-tokenx-purple to-tokenx-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Sécurité Maximale</h3>
              <p className="text-gray-400">Plateforme sécurisée avec intégration blockchain et audits réguliers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tokens */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-tokenx-dark-light">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-white">Tokens Populaires</h2>
            <Button 
              variant="outline" 
              className="border-tokenx-purple text-tokenx-purple hover:bg-tokenx-purple hover:text-white"
              onClick={() => navigate('/market')}
            >
              Voir Tout
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTokens.map((token, index) => (
              <TokenCard key={index} {...token} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à Créer Votre Token ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Rejoignez des milliers de créateurs qui font confiance à TokenX pour lancer leurs projets crypto.
          </p>
          <Button 
            size="lg" 
            className="btn-gradient glow-effect text-lg px-12 py-4"
            onClick={() => navigate('/create-token')}
          >
            Commencer Maintenant
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
