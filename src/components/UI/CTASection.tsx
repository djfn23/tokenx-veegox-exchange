
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Rocket, Star } from 'lucide-react';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-tokenx-purple/20 via-tokenx-dark to-tokenx-blue/20"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-tokenx-purple/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-tokenx-blue/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-tokenx-purple/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-tokenx-purple to-tokenx-blue rounded-full flex items-center justify-center shadow-2xl animate-bounce">
            <Rocket className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Prêt à{' '}
          <span className="bg-gradient-to-r from-tokenx-purple to-tokenx-blue bg-clip-text text-transparent">
            Révolutionner
          </span>
          <br />
          Votre Projet ?
        </h2>

        {/* Description */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Rejoignez des milliers de créateurs qui font confiance à TokenX pour lancer leurs projets crypto.
          <br />
          <span className="text-tokenx-purple font-semibold">Commencez votre aventure DeFi aujourd'hui</span>
        </p>

        {/* Features List */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {[
            'Création instantanée',
            'Sécurité maximale',
            'Trading avancé',
            'Support 24/7'
          ].map((feature, index) => (
            <div key={feature} className="flex items-center space-x-2 bg-tokenx-dark-light/50 backdrop-blur-sm border border-tokenx-purple/30 rounded-full px-4 py-2">
              <Star className="w-4 h-4 text-tokenx-purple" />
              <span className="text-gray-300 font-medium">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button 
            size="lg" 
            className="group btn-gradient glow-effect text-xl px-12 py-6 h-auto shadow-2xl hover:shadow-tokenx-purple/50 transition-all duration-300"
            onClick={() => navigate('/create-token')}
          >
            <span className="relative z-10 flex items-center space-x-3">
              <span>Créer Mon Premier Token</span>
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
            </span>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-xl px-12 py-6 h-auto border-2 border-tokenx-purple/50 text-white hover:bg-tokenx-purple/20 hover:border-tokenx-purple backdrop-blur-sm transition-all duration-300"
            onClick={() => navigate('/market')}
          >
            Explorer le Marché
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
