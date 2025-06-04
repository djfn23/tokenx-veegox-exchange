import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Wallet, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsMoreOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Marché', path: '/market' },
    { name: 'Créer', path: '/create-token' },
    { name: 'Crowdfunding', path: '/crowdfunding' },
    { name: 'Launchpad', path: '/launchpad' },
    { name: 'Staking', path: '/staking' },
    { name: 'Gouvernance', path: '/governance' }
  ];

  const moreItems = [
    { name: 'Wallet', path: '/wallet' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'À Propos', path: '/about' },
    { name: 'Documentation', path: '/documentation' },
    { name: 'Support', path: '/support' }
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-tokenx-dark/95 backdrop-blur-xl border-b border-tokenx-glass-border shadow-glass' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Enhanced Logo with TX */}
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => navigate('/')}
          >
            <div className="relative">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-tokenx-purple to-tokenx-blue rounded-xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <span className="text-sm font-bold text-white">TX</span>
                </div>
                <div className="text-2xl md:text-3xl font-bold font-display text-primary group-hover:scale-110 transition-transform duration-300">
                  TOKENX
                </div>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-tokenx-purple/20 to-tokenx-blue/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"></div>
            </div>
            <span className="ml-2 md:ml-3 text-xs md:text-sm text-subtle font-medium group-hover:text-muted transition-colors duration-300">
              by Veegox
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`relative px-3 xl:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group animate-fade-in-fast ${
                    isActivePath(item.path)
                      ? 'text-secondary bg-tokenx-glass border border-tokenx-glass-border shadow-inner-glow'
                      : 'text-muted hover:text-secondary hover:bg-tokenx-glass/50'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.name}
                  {isActivePath(item.path) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-tokenx-purple/20 to-tokenx-blue/20 rounded-xl blur-sm -z-10"></div>
                  )}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-tokenx-purple to-tokenx-blue group-hover:w-full transition-all duration-300"></div>
                </button>
              ))}
              
              {/* Desktop Dropdown */}
              <div className="relative">
                <button 
                  className="px-3 xl:px-4 py-2 rounded-xl text-sm font-medium text-muted hover:text-secondary hover:bg-tokenx-glass/50 transition-all duration-300 flex items-center space-x-1"
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                >
                  <span>Plus</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMoreOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 card-glass rounded-2xl shadow-glass-lg">
                    <div className="p-2">
                      {moreItems.map((item, index) => (
                        <button
                          key={item.name}
                          onClick={() => {
                            navigate(item.path);
                            setIsMoreOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-tokenx-glass hover:text-secondary animate-fade-in-fast ${
                            isActivePath(item.path) 
                              ? 'text-secondary bg-tokenx-glass' 
                              : 'text-muted'
                          }`}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Connect Wallet Button - Hidden on small mobile */}
          <div className="hidden sm:block lg:block">
            <Button className={`btn-gradient hover-glow group font-semibold h-auto ${
              isMobile ? 'text-xs px-3 py-2' : 'text-sm px-6 py-3'
            }`}>
              <Wallet className={`${isMobile ? 'w-3 h-3 mr-1' : 'w-4 h-4 mr-2'} group-hover:rotate-12 transition-transform duration-300`} />
              <span className={isMobile ? 'hidden' : 'block'}>Connecter</span>
              <span className={isMobile ? 'block' : 'hidden'}>Wallet</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 md:p-3 text-muted hover:text-secondary hover:bg-tokenx-glass rounded-xl transition-all duration-300"
            >
              <div className="w-5 h-5 md:w-6 md:h-6 relative">
                <Menu className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                <X className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile menu with slide animation */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
        isMenuOpen 
          ? 'max-h-[80vh] opacity-100' 
          : 'max-h-0 opacity-0'
      }`}>
        <div className="card-glass border-t border-tokenx-glass-border mx-2 sm:mx-4 mb-4 rounded-2xl">
          <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
            {/* Mobile Navigation Items */}
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 sm:py-4 rounded-xl text-base font-medium transition-all duration-300 animate-fade-in-fast ${
                    isActivePath(item.path)
                      ? 'text-secondary bg-tokenx-glass shadow-inner-glow'
                      : 'text-muted hover:text-secondary hover:bg-tokenx-glass/50'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* More Items Separator */}
            <div className="border-t border-tokenx-glass-border my-4"></div>
            
            {/* More Items */}
            <div className="space-y-2">
              {moreItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 animate-fade-in-fast ${
                    isActivePath(item.path)
                      ? 'text-secondary bg-tokenx-glass shadow-inner-glow'
                      : 'text-muted hover:text-secondary hover:bg-tokenx-glass/50'
                  }`}
                  style={{ animationDelay: `${(navItems.length + index) * 50}ms` }}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Mobile Wallet Button */}
            <div className="pt-4 border-t border-tokenx-glass-border mt-4">
              <Button className="btn-gradient w-full group text-base font-semibold py-4">
                <Wallet className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                <span>Connecter Wallet</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm -z-10 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
