
import TradingChart from '@/components/UI/TradingChart';
import TokenCard from '@/components/UI/TokenCard';
import HeroSection from '@/components/UI/HeroSection';
import FeatureCard from '@/components/UI/FeatureCard';
import AnimatedStats from '@/components/UI/AnimatedStats';
import CTASection from '@/components/UI/CTASection';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Cpu, TrendingUp, Shield, Zap, Users, Globe } from 'lucide-react';
import { useResponsive } from '@/hooks/use-mobile';

const Home = () => {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useResponsive();

  const featuredTokens = [
    { name: 'UserToken', symbol: 'USER', price: 4.752, change: 2.8, volume: '$125K', marketCap: '$2.4M' },
    { name: 'VeegoxCoin', symbol: 'VGX', price: 12.45, change: -1.2, volume: '$89K', marketCap: '$5.1M' },
    { name: 'MetaToken', symbol: 'META', price: 0.8764, change: 5.4, volume: '$67K', marketCap: '$890K' },
  ];

  const features = [
    {
      icon: Cpu,
      title: 'Création de Tokens',
      description: 'Créez et déployez vos tokens ERC-20 personnalisés en quelques clics avec notre interface intuitive',
      gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)'
    },
    {
      icon: TrendingUp,
      title: 'Trading Avancé',
      description: 'Tradez vos tokens avec des outils professionnels et des graphiques en temps réel sur VeegoxChain',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)'
    },
    {
      icon: Shield,
      title: 'Sécurité Maximale',
      description: 'Plateforme sécurisée avec intégration blockchain, audits réguliers et protection avancée',
      gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
    },
    {
      icon: Zap,
      title: 'Performance Ultra-Rapide',
      description: 'Transactions instantanées et frais réduits grâce à notre infrastructure optimisée',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)'
    },
    {
      icon: Users,
      title: 'Communauté Active',
      description: 'Rejoignez une communauté de développeurs et créateurs passionnés de DeFi',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)'
    },
    {
      icon: Globe,
      title: 'Écosystème Global',
      description: 'Accédez à un écosystème décentralisé mondial avec des partenaires de confiance',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <HeroSection />

      {/* Trading Chart Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-tokenx-dark-light/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className={`font-bold text-secondary mb-4 sm:mb-6 text-glow-white ${
              isMobile 
                ? 'text-3xl' 
                : 'text-4xl md:text-5xl'
            }`}>
              Marché en{' '}
              <span className="text-primary">
                Temps Réel
              </span>
            </h2>
            <p className={`text-muted max-w-3xl mx-auto ${
              isMobile ? 'text-lg' : 'text-xl'
            }`}>
              Suivez les performances de vos tokens favoris avec nos graphiques avancés
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <TradingChart pair="USER / USDT" price={4.752} change={2.8} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className={`font-bold text-secondary mb-4 sm:mb-6 text-glow-white ${
              isMobile 
                ? 'text-3xl' 
                : 'text-4xl md:text-5xl'
            }`}>
              Fonctionnalités{' '}
              <span className="text-primary">
                Révolutionnaires
              </span>
            </h2>
            <p className={`text-muted max-w-3xl mx-auto ${
              isMobile ? 'text-lg' : 'text-xl'
            }`}>
              Découvrez les outils avancés qui font de TokenX la plateforme de référence pour la création de tokens
            </p>
          </div>
          <div className={`grid gap-6 sm:gap-8 ${
            isMobile 
              ? 'grid-cols-1' 
              : isTablet 
                ? 'grid-cols-2' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                gradient={feature.gradient}
                delay={`${index * 0.1}s`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Animated Stats */}
      <AnimatedStats />

      {/* Featured Tokens */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-tokenx-dark-light/30">
        <div className="max-w-7xl mx-auto">
          <div className={`justify-between items-center mb-12 sm:mb-16 ${
            isMobile ? 'text-center space-y-6' : 'flex flex-col lg:flex-row text-center lg:text-left space-y-8 lg:space-y-0'
          }`}>
            <div>
              <h2 className={`font-bold text-secondary mb-4 text-glow-white ${
                isMobile 
                  ? 'text-3xl' 
                  : 'text-4xl md:text-5xl'
              }`}>
                Tokens{' '}
                <span className="text-primary">
                  Populaires
                </span>
              </h2>
              <p className={`text-muted max-w-2xl ${
                isMobile ? 'text-lg' : 'text-xl'
              }`}>
                Découvrez les tokens les plus performants de notre plateforme
              </p>
            </div>
            <Button 
              variant="outline" 
              size="lg"
              className={`border-2 border-tokenx-purple/50 text-accent hover:bg-tokenx-purple hover:text-white transition-all duration-300 ${
                isMobile 
                  ? 'text-base px-6 py-3 w-full max-w-xs mx-auto' 
                  : 'text-lg px-8 py-3'
              }`}
              onClick={() => navigate('/market')}
            >
              Voir Tous les Tokens
            </Button>
          </div>
          <div className={`grid gap-6 sm:gap-8 ${
            isMobile 
              ? 'grid-cols-1' 
              : isTablet 
                ? 'grid-cols-2' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {featuredTokens.map((token, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <TokenCard {...token} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default Home;
