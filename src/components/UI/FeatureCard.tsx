
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  delay?: string;
}

const FeatureCard = ({ icon: Icon, title, description, gradient, delay = '0s' }: FeatureCardProps) => {
  return (
    <div 
      className="group relative card-gradient rounded-xl p-8 hover:bg-tokenx-dark-lighter transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in"
      style={{ animationDelay: delay }}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-500" 
           style={{ background: gradient }}></div>
      
      {/* Icon Container */}
      <div className={cn(
        "relative w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110",
        "bg-gradient-to-r shadow-lg"
      )} style={{ background: gradient }}>
        <Icon className="w-8 h-8 text-white" />
        
        {/* Icon Glow */}
        <div className="absolute inset-0 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"
             style={{ background: gradient }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
            style={{ backgroundImage: gradient }}>
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </div>
  );
};

export default FeatureCard;
