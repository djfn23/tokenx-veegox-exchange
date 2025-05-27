
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TokenCard from '@/components/UI/TokenCard';
import TradingChart from '@/components/UI/TradingChart';

const Market = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const tokens = [
    { name: 'UserToken', symbol: 'USER', price: 4.752, change: 2.8, volume: '$125K', marketCap: '$2.4M' },
    { name: 'VeegoxCoin', symbol: 'VGX', price: 12.45, change: -1.2, volume: '$89K', marketCap: '$5.1M' },
    { name: 'MetaToken', symbol: 'META', price: 0.8764, change: 5.4, volume: '$67K', marketCap: '$890K' },
    { name: 'GameToken', symbol: 'GAME', price: 2.34, change: -0.8, volume: '$45K', marketCap: '$1.2M' },
    { name: 'SocialCoin', symbol: 'SOC', price: 1.567, change: 3.2, volume: '$78K', marketCap: '$980K' },
    { name: 'ArtToken', symbol: 'ART', price: 15.67, change: 7.1, volume: '$156K', marketCap: '$3.4M' },
    { name: 'MusicCoin', symbol: 'MUS', price: 0.432, change: -2.1, volume: '$23K', marketCap: '$567K' },
    { name: 'SportToken', symbol: 'SPT', price: 8.91, change: 1.9, volume: '$92K', marketCap: '$1.8M' },
  ];

  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'defi', name: 'DeFi' },
    { id: 'nft', name: 'NFT' },
    { id: 'social', name: 'Social' },
  ];

  const filteredTokens = tokens.filter(token => 
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Marketplace de Tokens
          </h1>
          <p className="text-xl text-gray-300">
            Découvrez et tradez les tokens créés par la communauté TokenX
          </p>
        </div>

        {/* Featured Chart */}
        <div className="mb-12">
          <TradingChart pair="USER / USDT" price={4.752} change={2.8} />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id 
                    ? "btn-gradient" 
                    : "border-gray-600 text-gray-300 hover:border-tokenx-purple hover:text-tokenx-purple"
                  }
                >
                  {category.name}
                </Button>
              ))}
            </div>
            <div className="w-full md:w-64">
              <Input
                placeholder="Rechercher un token..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-tokenx-dark border-gray-700 text-white"
              />
            </div>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="card-gradient rounded-lg p-6 text-center">
            <h3 className="text-gray-400 text-sm mb-2">Total Market Cap</h3>
            <p className="text-2xl font-bold text-white">$24.8M</p>
            <p className="text-green-400 text-sm">+5.2%</p>
          </div>
          <div className="card-gradient rounded-lg p-6 text-center">
            <h3 className="text-gray-400 text-sm mb-2">Volume 24h</h3>
            <p className="text-2xl font-bold text-white">$3.4M</p>
            <p className="text-red-400 text-sm">-2.1%</p>
          </div>
          <div className="card-gradient rounded-lg p-6 text-center">
            <h3 className="text-gray-400 text-sm mb-2">Tokens Actifs</h3>
            <p className="text-2xl font-bold text-white">1,247</p>
            <p className="text-green-400 text-sm">+12</p>
          </div>
          <div className="card-gradient rounded-lg p-6 text-center">
            <h3 className="text-gray-400 text-sm mb-2">Traders Actifs</h3>
            <p className="text-2xl font-bold text-white">8,932</p>
            <p className="text-green-400 text-sm">+156</p>
          </div>
        </div>

        {/* Token Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTokens.map((token, index) => (
            <TokenCard key={index} {...token} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-tokenx-purple text-tokenx-purple hover:bg-tokenx-purple hover:text-white"
          >
            Charger Plus de Tokens
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Market;
