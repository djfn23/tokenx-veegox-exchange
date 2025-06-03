
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Wallet } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Marché', path: '/market' },
    { name: 'Créer', path: '/create-token' },
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
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => navigate('/')}
          >
            <div className="relative">
              <div className="text-3xl font-bold font-display text-gradient group-hover:scale-110 transition-transform duration-300">
                TOKENX
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-tokenx-purple/20 to-tokenx-blue/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"></div>
            </div>
            <span className="ml-3 text-sm text-gray-400 font-medium group-hover:text-gray-300 transition-colors duration-300">
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
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group animate-fade-in-fast ${
                    isActivePath(item.path)
                      ? 'text-white bg-tokenx-glass border border-tokenx-glass-border shadow-inner-glow'
                      : 'text-gray-300 hover:text-white hover:bg-tokenx-glass/50'
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
              
              {/* Enhanced Dropdown */}
              <div className="relative group">
                <button className="px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-tokenx-glass/50 transition-all duration-300 flex items-center space-x-1">
                  <span>Plus</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full right-0 mt-2 w-56 card-glass rounded-2xl shadow-glass-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="p-2">
                    {moreItems.map((item, index) => (
                      <button
                        key={item.name}
                        onClick={() => navigate(item.path)}
                        className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-tokenx-glass hover:text-white animate-fade-in-fast ${
                          isActivePath(item.path) 
                            ? 'text-white bg-tokenx-glass' 
                            : 'text-gray-300'
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Connect Wallet Button */}
          <div className="hidden md:block">
            <Button className="btn-gradient hover-glow group text-sm font-semibold px-6 py-3 h-auto">
              <Wallet className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              <span>Connecter Wallet</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-3 text-gray-300 hover:text-white hover:bg-tokenx-glass rounded-xl transition-all duration-300"
            >
              <div className="w-6 h-6 relative">
                <Menu className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                <X className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ${
        isMenuOpen 
          ? 'max-h-screen opacity-100' 
          : 'max-h-0 opacity-0'
      }`}>
        <div className="card-glass border-t border-tokenx-glass-border mx-4 mb-4 rounded-2xl">
          <div className="p-6 space-y-3">
            {[...navItems, ...moreItems].map((item, index) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 animate-fade-in-fast ${
                  isActivePath(item.path)
                    ? 'text-white bg-tokenx-glass shadow-inner-glow'
                    : 'text-gray-300 hover:text-white hover:bg-tokenx-glass/50'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4 border-t border-tokenx-glass-border mt-4">
              <Button className="btn-gradient w-full group text-base font-semibold py-4">
                <Wallet className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                <span>Connecter Wallet</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
