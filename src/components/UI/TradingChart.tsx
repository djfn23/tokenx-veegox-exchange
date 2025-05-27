
import { useEffect, useRef } from 'react';

interface TradingChartProps {
  pair: string;
  price: number;
  change: number;
}

const TradingChart = ({ pair, price, change }: TradingChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const canvas = chartRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Simple chart simulation
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.clearRect(0, 0, width, height);
      
      // Generate mock data points
      const points = [];
      for (let i = 0; i < 50; i++) {
        const x = (i / 49) * width;
        const noise = (Math.random() - 0.5) * 20;
        const trend = change > 0 ? i * 0.5 : -i * 0.3;
        const y = height / 2 + noise + trend;
        points.push({ x, y: Math.max(10, Math.min(height - 10, y)) });
      }

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      if (change > 0) {
        gradient.addColorStop(0, 'rgba(34, 197, 94, 0.3)');
        gradient.addColorStop(1, 'rgba(34, 197, 94, 0.05)');
      } else {
        gradient.addColorStop(0, 'rgba(239, 68, 68, 0.3)');
        gradient.addColorStop(1, 'rgba(239, 68, 68, 0.05)');
      }

      // Draw area
      ctx.beginPath();
      ctx.moveTo(0, height);
      points.forEach((point, index) => {
        if (index === 0) {
          ctx.lineTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw line
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      points.forEach(point => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.strokeStyle = change > 0 ? '#22c55e' : '#ef4444';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [change]);

  return (
    <div className="card-gradient rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-sm text-gray-400">Trading Pair</h3>
          <p className="text-xl font-bold text-white">{pair}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{price.toFixed(4)}</p>
          <p className={`text-sm ${change > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {change > 0 ? '+' : ''}{change.toFixed(2)}%
          </p>
        </div>
      </div>
      <canvas
        ref={chartRef}
        width={400}
        height={200}
        className="w-full h-32"
      />
    </div>
  );
};

export default TradingChart;
