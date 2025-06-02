
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TokenCardProps {
  name: string;
  symbol: string;
  price: number;
  change: number;
  volume: string;
  marketCap: string;
  logo?: string;
}

const TokenCard = ({ name, symbol, price, change, volume, marketCap, logo }: TokenCardProps) => {
  const isPositive = change > 0;

  return (
    <div className="group relative card-gradient rounded-xl p-6 hover:bg-tokenx-dark-lighter transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-gray-800/50 hover:border-tokenx-purple/50 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-tokenx-purple/5 to-tokenx-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Header */}
      <div className="relative flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-r from-tokenx-purple to-tokenx-blue flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <span className="text-white font-bold text-sm">{symbol.slice(0, 2)}</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-tokenx-purple to-tokenx-blue blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-tokenx-purple group-hover:to-tokenx-blue group-hover:bg-clip-text transition-all duration-300">
              {name}
            </h3>
            <p className="text-gray-400 text-sm font-medium">{symbol}</p>
          </div>
        </div>
        
        {/* Price Change Indicator */}
        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-bold ${
          isPositive 
            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{isPositive ? '+' : ''}{change.toFixed(2)}%</span>
        </div>
      </div>

      {/* Price */}
      <div className="relative mb-6">
        <div className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-tokenx-purple group-hover:to-tokenx-blue group-hover:bg-clip-text transition-all duration-300">
          ${price.toFixed(4)}
        </div>
        <div className="text-gray-400 text-sm">Prix actuel</div>
      </div>

      {/* Stats */}
      <div className="relative grid grid-cols-2 gap-4 mb-6">
        <div className="bg-tokenx-dark/50 rounded-lg p-3 group-hover:bg-tokenx-dark-light/50 transition-colors duration-300">
          <div className="text-gray-400 text-xs font-medium mb-1">Volume 24h</div>
          <div className="text-white font-bold">{volume}</div>
        </div>
        <div className="bg-tokenx-dark/50 rounded-lg p-3 group-hover:bg-tokenx-dark-light/50 transition-colors duration-300">
          <div className="text-gray-400 text-xs font-medium mb-1">Market Cap</div>
          <div className="text-white font-bold">{marketCap}</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative flex space-x-3">
        <Button 
          size="sm" 
          className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-2 shadow-lg hover:shadow-green-500/25 transition-all duration-300"
        >
          Acheter
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="flex-1 border-red-500/50 text-red-400 hover:bg-red-600 hover:text-white hover:border-red-600 font-bold py-2 transition-all duration-300"
        >
          Vendre
        </Button>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </div>
  );
};

export default TokenCard;
