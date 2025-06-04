
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Rocket } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useResponsive } from '@/hooks/use-mobile';

const HeroSection = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isMobile, isTablet } = useResponsive();

  useEffect(() => {
    if (isMobile) return; // Disable mouse tracking on mobile for performance
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden backdrop-noise px-4 sm:px-6 lg:px-8">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-tokenx"></div>
      
      {/* Interactive Mouse Gradient - Desktop only */}
      {!isMobile && (
        <div 
          className="absolute inset-0 opacity-30 transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(124, 58, 237, 0.2) 0%, transparent 50%)`
          }}
        ></div>
      )}
      
      {/* Animated Pattern Overlay - Reduced on mobile */}
      <div className={`absolute inset-0 ${isMobile ? 'opacity-10' : 'opacity-20'}`}>
        <div className="w-full h-full bg-repeat animate-pulse-glow" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237c3aed' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Enhanced Floating Elements - Responsive */}
      <div className={`absolute top-20 left-4 sm:left-10 ${isMobile ? 'w-20 h-20' : 'w-32 h-32'} bg-gradient-to-r from-tokenx-purple/30 to-tokenx-blue/30 rounded-full blur-3xl animate-float`}></div>
      <div className={`absolute top-40 right-8 sm:right-20 ${isMobile ? 'w-24 h-24' : 'w-40 h-40'} bg-gradient-to-r from-tokenx-blue/25 to-tokenx-purple/25 rounded-full blur-3xl float animate-delay-1000`}></div>
      <div className={`absolute bottom-40 left-8 sm:left-20 ${isMobile ? 'w-16 h-16' : 'w-24 h-24'} bg-gradient-to-r from-tokenx-purple/40 to-transparent rounded-full blur-2xl float animate-delay-500`}></div>
      <div className={`absolute top-1/2 right-1/4 ${isMobile ? 'w-12 h-12' : 'w-16 h-16'} bg-tokenx-accent/20 rounded-full blur-xl float animate-delay-700`}></div>

      {/* Particles - Reduced on mobile */}
      <div className="absolute inset-0">
        {Array.from({ length: isMobile ? 10 : 20 }).map((_, i) => (
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

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Enhanced Badge - Responsive */}
        <div className={`inline-flex items-center space-x-2 sm:space-x-3 card-glass rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-8 sm:mb-12 animate-fade-in hover-lift group ${
          isMobile ? 'text-xs' : 'text-sm'
        }`}>
          <div className="relative">
            <Sparkles className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-accent group-hover:rotate-12 transition-transform duration-300`} />
            <div className="absolute inset-0 bg-tokenx-purple/30 rounded-full blur-md animate-pulse-glow"></div>
          </div>
          <span className="font-medium text-muted group-hover:text-body transition-colors duration-300">
            {isMobile ? 'Nouvelle plateforme' : 'Nouvelle plateforme de création de tokens'}
          </span>
          <Zap className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-accent-blue animate-pulse`} />
        </div>

        {/* Enhanced Main Title - Responsive */}
        <h1 className={`font-bold font-display mb-8 sm:mb-12 leading-tight ${
          isMobile 
            ? 'text-4xl sm:text-5xl' 
            : isTablet 
              ? 'text-6xl md:text-7xl' 
              : 'text-6xl md:text-8xl lg:text-9xl'
        }`}>
          <span className="block text-primary animate-fade-in text-glow">
            L&apos;Avenir de la
          </span>
          <span className="block text-primary animate-fade-in animate-delay-300 text-glow">
            Création Token
          </span>
        </h1>

        {/* Enhanced Subtitle - Responsive */}
        <div className="max-w-5xl mx-auto mb-12 sm:mb-16 animate-fade-in animate-delay-500">
          <p className={`text-body leading-relaxed font-light text-balance ${
            isMobile 
              ? 'text-lg sm:text-xl' 
              : 'text-xl md:text-2xl lg:text-3xl'
          }`}>
            Créez, déployez et tradez vos tokens personnalisés sur notre 
            <span className="text-primary font-semibold"> plateforme d&apos;échange révolutionnaire</span>.
          </p>
          <div className="flex items-center justify-center mt-4 sm:mt-6 space-x-2">
            <div className="w-2 h-2 bg-tokenx-purple rounded-full animate-pulse"></div>
            <span className={`text-accent font-bold font-display tracking-wide ${
              isMobile ? 'text-sm' : 'text-lg'
            }`}>
              Powered by VeegoxChain
            </span>
            <div className="w-2 h-2 bg-tokenx-blue rounded-full animate-pulse animate-delay-300"></div>
          </div>
        </div>

        {/* Enhanced CTA Buttons - Responsive stacking */}
        <div className={`flex gap-4 sm:gap-6 justify-center mb-16 sm:mb-20 animate-fade-in animate-delay-700 ${
          isMobile ? 'flex-col' : 'flex-col sm:flex-row'
        }`}>
          <Button 
            size="lg" 
            className={`group btn-gradient glow-effect font-bold h-auto relative overflow-hidden hover-lift ${
              isMobile 
                ? 'text-base px-8 py-4 w-full' 
                : 'text-lg px-12 py-6'
            }`}
            onClick={() => navigate('/create-token')}
          >
            <span className="relative z-10 flex items-center justify-center space-x-2 sm:space-x-3">
              <Rocket className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} group-hover:rotate-12 transition-transform duration-300`} />
              <span>Créer Mon Token</span>
              <ArrowRight className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} transition-transform group-hover:translate-x-2`} />
            </span>
          </Button>
          <Button 
            size="lg" 
            className={`btn-glass font-semibold h-auto hover-glow group ${
              isMobile 
                ? 'text-base px-8 py-4 w-full' 
                : 'text-lg px-12 py-6'
            }`}
            onClick={() => navigate('/explorer')}
          >
            <span className="flex items-center justify-center space-x-2">
              <span>{isMobile ? 'Explorer' : 'Explorer VeegoxChain'}</span>
              <div className="w-2 h-2 bg-tokenx-blue rounded-full group-hover:scale-150 transition-transform duration-300"></div>
            </span>
          </Button>
        </div>

        {/* Enhanced Stats - Responsive grid */}
        <div className={`grid gap-6 sm:gap-8 lg:gap-12 max-w-5xl mx-auto animate-fade-in animate-delay-1000 ${
          isMobile 
            ? 'grid-cols-1' 
            : 'grid-cols-1 md:grid-cols-3'
        }`}>
          {[
            { value: '1,000+', label: 'Tokens Créés', icon: '🚀' },
            { value: '$2.5M+', label: 'Volume Tradé', icon: '💎' },
            { value: '50K+', label: 'Utilisateurs Actifs', icon: '⚡' }
          ].map((stat, index) => (
            <div key={stat.label} className={`text-center group animate-fade-in animate-delay-${300 + index * 200}`}>
              <div className={`card-glass rounded-2xl hover-lift hover-glow ${
                isMobile ? 'p-6' : 'p-8'
              }`}>
                <div className={`mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 ${
                  isMobile ? 'text-3xl' : 'text-4xl'
                }`}>
                  {stat.icon}
                </div>
                <div className={`font-bold font-display text-primary mb-2 sm:mb-3 text-glow ${
                  isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'
                }`}>
                  {stat.value}
                </div>
                <div className={`text-subtle font-medium group-hover:text-muted transition-colors duration-300 ${
                  isMobile ? 'text-base' : 'text-lg'
                }`}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Scroll Indicator - Hidden on mobile */}
      {!isMobile && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in animate-delay-1000">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm text-subtle font-medium">Découvrir</span>
            <div className="w-8 h-12 border-2 border-tokenx-glass-border rounded-full flex justify-center card-glass hover-glow cursor-pointer">
              <div className="w-1.5 h-4 bg-gradient-to-b from-tokenx-purple to-tokenx-blue rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
