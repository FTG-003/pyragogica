import React from 'react';
import { Brain, GraduationCap, Lightbulb, Search } from 'lucide-react';

interface PersonalityAvatarProps {
  personality: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  showGlow?: boolean;
  className?: string;
}

const PersonalityAvatar: React.FC<PersonalityAvatarProps> = ({
  personality,
  size = 'md',
  animated = true,
  showGlow = false,
  className = ''
}) => {
  const getPersonalityConfig = () => {
    switch (personality) {
      case 'academic':
        return {
          icon: GraduationCap,
          emoji: '🎓',
          color: 'from-blue-600 to-indigo-700',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
          name: 'Accademico'
        };
      case 'socratic':
        return {
          icon: Search,
          emoji: '🤔',
          color: 'from-amber-600 to-orange-700',
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-700',
          name: 'Socratico'
        };
      case 'critical':
        return {
          icon: Brain,
          emoji: '🧠',
          color: 'from-red-600 to-rose-700',
          bgColor: 'bg-red-50',
          textColor: 'text-red-700',
          name: 'Critico'
        };
      case 'divulgative':
        return {
          icon: Lightbulb,
          emoji: '💡',
          color: 'from-green-600 to-emerald-700',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          name: 'Divulgatore'
        };
      default:
        return {
          icon: Brain,
          emoji: '🤖',
          color: 'from-gray-600 to-slate-700',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-700',
          name: 'AI'
        };
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'w-8 h-8',
          icon: 'w-4 h-4',
          text: 'text-xs'
        };
      case 'md':
        return {
          container: 'w-12 h-12',
          icon: 'w-6 h-6',
          text: 'text-sm'
        };
      case 'lg':
        return {
          container: 'w-16 h-16',
          icon: 'w-8 h-8',
          text: 'text-base'
        };
      case 'xl':
        return {
          container: 'w-20 h-20',
          icon: 'w-10 h-10',
          text: 'text-lg'
        };
      default:
        return {
          container: 'w-12 h-12',
          icon: 'w-6 h-6',
          text: 'text-sm'
        };
    }
  };

  const config = getPersonalityConfig();
  const sizeClasses = getSizeClasses();
  const Icon = config.icon;

  return (
    <div
      className={`
        relative ${sizeClasses.container} rounded-2xl
        bg-gradient-to-br ${config.color}
        flex items-center justify-center
        shadow-lg border-2 border-white/20
        ${animated ? 'transition-all duration-300 hover:scale-110' : ''}
        ${showGlow ? 'shadow-2xl' : ''}
        ${className}
      `}
      data-personality={personality}
    >
      {/* Background Glow */}
      {showGlow && (
        <div className={`
          absolute inset-0 rounded-2xl
          bg-gradient-to-br ${config.color}
          opacity-20 blur-xl scale-150
          animate-pulse
        `} />
      )}
      
      {/* Icon */}
      <Icon className={`${sizeClasses.icon} text-white relative z-10`} />
      
      {/* Personality Indicator */}
      <div className={`
        absolute -bottom-1 -right-1
        w-6 h-6 rounded-full
        ${config.bgColor} ${config.textColor}
        flex items-center justify-center
        text-xs font-bold
        border-2 border-white
        shadow-md
      `}>
        {config.emoji}
      </div>
      
      {/* Animated Ring for Active State */}
      {animated && (
        <div className={`
          absolute inset-0 rounded-2xl
          border-2 border-white/30
          animate-ping
          ${showGlow ? 'opacity-75' : 'opacity-0 hover:opacity-75'}
        `} />
      )}
    </div>
  );
};

export default PersonalityAvatar;