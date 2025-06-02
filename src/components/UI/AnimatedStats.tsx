
import { useEffect, useState } from 'react';
import { TrendingUp, Users, Coins, Activity } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  delay?: number;
}

const StatItem = ({ icon, value, label, suffix = '', prefix = '', delay = 0 }: StatItemProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);

      const animate = () => {
        start += increment;
        if (start < value) {
          setDisplayValue(Math.floor(start));
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };
      animate();
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className="text-center group">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-r from-tokenx-purple to-tokenx-blue rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
          {icon}
        </div>
      </div>
      <div className="text-4xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-tokenx-purple group-hover:to-tokenx-blue group-hover:bg-clip-text transition-all duration-300">
        {prefix}{displayValue.toLocaleString()}{suffix}
      </div>
      <div className="text-gray-400 font-medium">{label}</div>
    </div>
  );
};

const AnimatedStats = () => {
  return (
    <section className="py-20 bg-tokenx-dark-light/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Notre Impact en{' '}
            <span className="bg-gradient-to-r from-tokenx-purple to-tokenx-blue bg-clip-text text-transparent">
              Chiffres
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Découvrez les statistiques impressionnantes de notre écosystème TokenX
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatItem
            icon={<Coins className="w-8 h-8 text-white" />}
            value={1247}
            label="Tokens Créés"
            delay={0}
          />
          <StatItem
            icon={<TrendingUp className="w-8 h-8 text-white" />}
            value={2.5}
            suffix="M"
            prefix="$"
            label="Volume Total"
            delay={200}
          />
          <StatItem
            icon={<Users className="w-8 h-8 text-white" />}
            value={52000}
            label="Utilisateurs Actifs"
            delay={400}
          />
          <StatItem
            icon={<Activity className="w-8 h-8 text-white" />}
            value={98.7}
            suffix="%"
            label="Uptime Réseau"
            delay={600}
          />
        </div>
      </div>
    </section>
  );
};

export default AnimatedStats;
