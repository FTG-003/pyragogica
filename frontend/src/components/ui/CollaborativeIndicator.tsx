import React from 'react';
import { Users, Eye, MessageCircle, Heart } from 'lucide-react';

interface CollaborativeIndicatorProps {
  activeUsers?: number;
  currentReaders?: number;
  recentComments?: number;
  likes?: number;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const CollaborativeIndicator: React.FC<CollaborativeIndicatorProps> = ({
  activeUsers = 0,
  currentReaders = 0,
  recentComments = 0,
  likes = 0,
  showLabels = false,
  size = 'md',
  className = ''
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'space-x-2',
          icon: 'w-3 h-3',
          text: 'text-xs',
          dot: 'w-1.5 h-1.5'
        };
      case 'md':
        return {
          container: 'space-x-3',
          icon: 'w-4 h-4',
          text: 'text-sm',
          dot: 'w-2 h-2'
        };
      case 'lg':
        return {
          container: 'space-x-4',
          icon: 'w-5 h-5',
          text: 'text-base',
          dot: 'w-2.5 h-2.5'
        };
      default:
        return {
          container: 'space-x-3',
          icon: 'w-4 h-4',
          text: 'text-sm',
          dot: 'w-2 h-2'
        };
    }
  };

  const sizeClasses = getSizeClasses();

  const indicators = [
    {
      icon: Users,
      value: activeUsers,
      label: 'Utenti attivi',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      show: activeUsers > 0
    },
    {
      icon: Eye,
      value: currentReaders,
      label: 'Stanno leggendo',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      show: currentReaders > 0,
      animated: true
    },
    {
      icon: MessageCircle,
      value: recentComments,
      label: 'Commenti recenti',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      show: recentComments > 0
    },
    {
      icon: Heart,
      value: likes,
      label: 'Mi piace',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      show: likes > 0
    }
  ];

  const visibleIndicators = indicators.filter(indicator => indicator.show);

  if (visibleIndicators.length === 0) {
    return null;
  }

  return (
    <div className={`flex items-center ${sizeClasses.container} ${className}`}>
      {visibleIndicators.map((indicator, index) => {
        const Icon = indicator.icon;
        
        return (
          <div
            key={index}
            className={`
              flex items-center space-x-1 px-2 py-1 rounded-full
              ${indicator.bgColor} ${indicator.color}
              transition-all duration-300 hover:scale-105
              ${indicator.animated ? 'animate-pulse' : ''}
            `}
            title={showLabels ? undefined : indicator.label}
          >
            {/* Activity Dot for Real-time Indicators */}
            {indicator.animated && (
              <div className={`
                ${sizeClasses.dot} bg-current rounded-full 
                animate-ping absolute
              `} />
            )}
            
            <Icon className={`${sizeClasses.icon} relative z-10`} />
            
            <span className={`${sizeClasses.text} font-semibold`}>
              {indicator.value}
            </span>
            
            {showLabels && (
              <span className={`${sizeClasses.text} opacity-75`}>
                {indicator.label}
              </span>
            )}
          </div>
        );
      })}
      
      {/* Collaborative Pulse Effect */}
      {currentReaders > 0 && (
        <div className="relative">
          <div className={`
            ${sizeClasses.dot} bg-green-400 rounded-full 
            animate-ping
          `} />
          <div className={`
            ${sizeClasses.dot} bg-green-500 rounded-full 
            absolute top-0 left-0
          `} />
        </div>
      )}
    </div>
  );
};

export default CollaborativeIndicator;