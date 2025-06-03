
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Shield } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-tokenx"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%237c3aed\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-tokenx-purple/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-tokenx-blue/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-20 w-16 h-16 bg-tokenx-purple/30 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-tokenx-dark-light/50 backdrop-blur-sm border border-tokenx-purple/30 rounded-full px-4 py-2 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-tokenx-purple" />
          <span className="text-sm text-gray-300">Nouvelle plateforme de création de tokens</span>
        </div>

        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-white via-tokenx-purple to-tokenx-blue bg-clip-text text-transparent animate-fade-in">
            L'Avenir de la
          </span>
          <br />
          <span className="bg-gradient-to-r from-tokenx-blue via-tokenx-purple to-white bg-clip-text text-transparent animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Création Token
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.6s' }}>
          Créez, déployez et tradez vos tokens personnalisés sur notre plateforme d'échange révolutionnaire.
          <br />
          <span className="text-tokenx-purple font-semibold">Powered by VeegoxChain</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <Button 
            size="lg" 
            className="group btn-gradient glow-effect text-lg px-10 py-4 h-auto relative overflow-hidden"
            onClick={() => navigate('/create-token')}
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>Créer Mon Token</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-10 py-4 h-auto border-2 border-tokenx-purple/50 text-white hover:bg-tokenx-purple/10 hover:border-tokenx-purple backdrop-blur-sm"
            onClick={() => navigate('/explorer')}
          >
            Explorer VeegoxChain
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">1,000+</div>
            <div className="text-gray-400">Tokens Créés</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">$2.5M+</div>
            <div className="text-gray-400">Volume Tradé</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">50K+</div>
            <div className="text-gray-400">Utilisateurs Actifs</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
