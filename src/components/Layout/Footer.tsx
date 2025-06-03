
import { Github, Twitter, MessageCircle, Mail, ExternalLink, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: MessageCircle, href: '#', label: 'Discord' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Mail, href: '#', label: 'Email' }
  ];

  const footerSections = [
    {
      title: 'Plateforme',
      links: [
        { name: 'Créer un Token', href: '/create-token' },
        { name: 'Marketplace', href: '/market' },
        { name: 'Trading', href: '/market' },
        { name: 'Launchpad', href: '/launchpad' },
        { name: 'Staking', href: '/staking' },
        { name: 'Gouvernance', href: '/governance' }
      ]
    },
    {
      title: 'Ressources',
      links: [
        { name: 'Documentation', href: '/documentation' },
        { name: 'API Reference', href: '/documentation' },
        { name: 'Guides', href: '/documentation' },
        { name: 'Tutorials', href: '/documentation' },
        { name: 'Blog', href: '#' },
        { name: 'Roadmap', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Centre d\'aide', href: '/support' },
        { name: 'Contact', href: '/support' },
        { name: 'Bug Reports', href: '/support' },
        { name: 'Feedback', href: '/support' },
        { name: 'Status', href: '#' },
        { name: 'Security', href: '#' }
      ]
    },
    {
      title: 'Légal',
      links: [
        { name: 'Conditions d\'utilisation', href: '#' },
        { name: 'Politique de confidentialité', href: '#' },
        { name: 'Mentions légales', href: '#' },
        { name: 'Cookies', href: '#' }
      ]
    }
  ];

  return (
    <footer className="relative mt-32 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-tokenx-dark via-tokenx-dark-light to-transparent"></div>
      
      {/* Floating elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-tokenx-purple/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-tokenx-blue/5 rounded-full blur-3xl"></div>

      <div className="relative">
        {/* Main footer content */}
        <div className="card-glass border-t border-tokenx-glass-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Brand section */}
              <div className="lg:col-span-4">
                <div className="space-y-6">
                  <div>
                    <div className="text-4xl font-bold font-display text-gradient mb-2">
                      TOKENX
                    </div>
                    <div className="text-lg text-gray-400 font-medium">
                      by Veegox
                    </div>
                  </div>
                  
                  <p className="text-gray-400 leading-relaxed max-w-md text-lg">
                    La plateforme décentralisée de référence pour créer, déployer et trader 
                    vos tokens personnalisés sur la blockchain Ethereum.
                  </p>

                  {/* Social links */}
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        className="group card-glass rounded-xl p-3 hover-glow transition-all duration-300"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                      </a>
                    ))}
                  </div>

                  {/* Newsletter */}
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold">Newsletter</h4>
                    <div className="flex space-x-2">
                      <input
                        type="email"
                        placeholder="Votre email"
                        className="flex-1 px-4 py-3 bg-tokenx-glass border border-tokenx-glass-border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-tokenx-purple transition-colors duration-300"
                      />
                      <button className="btn-gradient px-6 py-3 rounded-xl font-medium">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Links sections */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {footerSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="text-white font-bold font-display mb-6 text-lg">
                        {section.title}
                      </h3>
                      <ul className="space-y-3">
                        {section.links.map((link) => (
                          <li key={link.name}>
                            <a
                              href={link.href}
                              className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium hover:translate-x-1 transform transition-transform duration-300 inline-block"
                            >
                              {link.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="card-glass border-t border-tokenx-glass-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                <p className="text-gray-400 text-sm">
                  © {currentYear} TokenX by Veegox. Tous droits réservés.
                </p>
                <div className="flex items-center space-x-1 text-gray-400 text-sm">
                  <span>Fait avec</span>
                  <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                  <span>pour la communauté DeFi</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Tous systèmes opérationnels</span>
                </div>
                <div className="text-sm text-gray-400">
                  Version 2.0.1
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
