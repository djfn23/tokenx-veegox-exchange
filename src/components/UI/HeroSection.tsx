
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Rocket } from 'lucide-react';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden backdrop-noise">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-tokenx"></div>
      
      {/* Interactive Mouse Gradient */}
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(124, 58, 237, 0.2) 0%, transparent 50%)`
        }}
      ></div>
      
      {/* Animated Pattern Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-repeat animate-pulse-glow" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237c3aed' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Enhanced Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-tokenx-purple/30 to-tokenx-blue/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-r from-tokenx-blue/25 to-tokenx-purple/25 rounded-full blur-3xl float animate-delay-1000"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-tokenx-purple/40 to-transparent rounded-full blur-2xl float animate-delay-500"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-tokenx-accent/20 rounded-full blur-xl float animate-delay-700"></div>

      {/* Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Enhanced Badge */}
        <div className="inline-flex items-center space-x-3 card-glass rounded-full px-6 py-3 mb-12 animate-fade-in hover-lift group">
          <div className="relative">
            <Sparkles className="w-5 h-5 text-tokenx-purple group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute inset-0 bg-tokenx-purple/30 rounded-full blur-md animate-pulse-glow"></div>
          </div>
          <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
            Nouvelle plateforme de création de tokens
          </span>
          <Zap className="w-4 h-4 text-tokenx-blue animate-pulse" />
        </div>

        {/* Enhanced Main Title */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-display mb-12 leading-tight">
          <span className="block text-gradient animate-fade-in text-glow">
            L&apos;Avenir de la
          </span>
          <span className="block text-gradient animate-fade-in animate-delay-300 text-glow">
            Création Token
          </span>
        </h1>

        {/* Enhanced Subtitle */}
        <div className="max-w-5xl mx-auto mb-16 animate-fade-in animate-delay-500">
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 leading-relaxed font-light text-balance">
            Créez, déployez et tradez vos tokens personnalisés sur notre 
            <span className="text-gradient font-semibold"> plateforme d&apos;échange révolutionnaire</span>.
          </p>
          <div className="flex items-center justify-center mt-6 space-x-2">
            <div className="w-2 h-2 bg-tokenx-purple rounded-full animate-pulse"></div>
            <span className="text-lg text-tokenx-purple font-bold font-display tracking-wide">
              Powered by VeegoxChain
            </span>
            <div className="w-2 h-2 bg-tokenx-blue rounded-full animate-pulse animate-delay-300"></div>
          </div>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20 animate-fade-in animate-delay-700">
          <Button 
            size="lg" 
            className="group btn-gradient glow-effect text-lg font-bold px-12 py-6 h-auto relative overflow-hidden hover-lift"
            onClick={() => navigate('/create-token')}
          >
            <span className="relative z-10 flex items-center space-x-3">
              <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span>Créer Mon Token</span>
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
            </span>
          </Button>
          <Button 
            size="lg" 
            className="btn-glass text-lg font-semibold px-12 py-6 h-auto hover-glow group"
            onClick={() => navigate('/explorer')}
          >
            <span className="flex items-center space-x-2">
              <span>Explorer VeegoxChain</span>
              <div className="w-2 h-2 bg-tokenx-blue rounded-full group-hover:scale-150 transition-transform duration-300"></div>
            </span>
          </Button>
        </div>

        {/* Enhanced Stats with better animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto animate-fade-in animate-delay-1000">
          {[
            { value: '1,000+', label: 'Tokens Créés', icon: '🚀' },
            { value: '$2.5M+', label: 'Volume Tradé', icon: '💎' },
            { value: '50K+', label: 'Utilisateurs Actifs', icon: '⚡' }
          ].map((stat, index) => (
            <div key={stat.label} className={`text-center group animate-fade-in animate-delay-${300 + index * 200}`}>
              <div className="card-glass rounded-2xl p-8 hover-lift hover-glow">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold font-display text-gradient mb-3 text-glow">
                  {stat.value}
                </div>
                <div className="text-gray-400 font-medium text-lg group-hover:text-gray-300 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in animate-delay-1000">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-gray-400 font-medium">Découvrir</span>
          <div className="w-8 h-12 border-2 border-tokenx-glass-border rounded-full flex justify-center card-glass hover-glow cursor-pointer">
            <div className="w-1.5 h-4 bg-gradient-to-b from-tokenx-purple to-tokenx-blue rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
