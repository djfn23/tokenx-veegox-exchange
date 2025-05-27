
import { Button } from '@/components/ui/button';

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
  return (
    <div className="card-gradient rounded-lg p-6 hover:bg-tokenx-dark-lighter transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-tokenx-purple to-tokenx-blue flex items-center justify-center">
            <span className="text-white font-bold text-sm">{symbol.slice(0, 2)}</span>
          </div>
          <div>
            <h3 className="text-white font-semibold">{name}</h3>
            <p className="text-gray-400 text-sm">{symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-white font-bold">${price.toFixed(4)}</p>
          <p className={`text-sm ${change > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {change > 0 ? '+' : ''}{change.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-400 text-xs">Volume 24h</p>
          <p className="text-white text-sm font-medium">{volume}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">Market Cap</p>
          <p className="text-white text-sm font-medium">{marketCap}</p>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
          Acheter
        </Button>
        <Button size="sm" variant="outline" className="flex-1 border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
          Vendre
        </Button>
      </div>
    </div>
  );
};

export default TokenCard;
