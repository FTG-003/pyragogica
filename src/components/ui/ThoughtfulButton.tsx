import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface ThoughtfulButtonProps {
  children: React.ReactNode;
  onClick?: () => void | Promise<void>;
  variant?: 'primary' | 'secondary' | 'ghost' | 'personality';
  size?: 'sm' | 'md' | 'lg';
  personality?: 'academic' | 'socratic' | 'critical' | 'divulgative';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const ThoughtfulButton: React.FC<ThoughtfulButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  personality,
  disabled = false,
  loading = false,
  className = '',
  icon,
  iconPosition = 'left'
}) => {
  const [isThinking, setIsThinking] = useState(false);

  const handleClick = async () => {
    if (disabled || loading || isThinking) return;
    
    if (onClick) {
      setIsThinking(true);
      try {
        await onClick();
      } finally {
        setIsThinking(false);
      }
    }
  };

  const getVariantClasses = () => {
    if (variant === 'personality' && personality) {
      switch (personality) {
        case 'academic':
          return `
            bg-gradient-to-r from-blue-600 to-indigo-700
            hover:from-blue-700 hover:to-indigo-800
            text-white border-2 border-blue-200
            shadow-lg hover:shadow-xl
          `;
        case 'socratic':
          return `
            bg-gradient-to-r from-amber-600 to-orange-700
            hover:from-amber-700 hover:to-orange-800
            text-white border-2 border-amber-200
            shadow-lg hover:shadow-xl
          `;
        case 'critical':
          return `
            bg-gradient-to-r from-red-600 to-rose-700
            hover:from-red-700 hover:to-rose-800
            text-white border-2 border-red-200
            shadow-lg hover:shadow-xl
          `;
        case 'divulgative':
          return `
            bg-gradient-to-r from-green-600 to-emerald-700
            hover:from-green-700 hover:to-emerald-800
            text-white border-2 border-green-200
            shadow-lg hover:shadow-xl
          `;
        default:
          return getVariantClasses();
      }
    }

    switch (variant) {
      case 'primary':
        return `
          bg-gradient-to-r from-indigo-600 to-purple-600
          hover:from-indigo-700 hover:to-purple-700
          text-white border-2 border-transparent
          shadow-lg hover:shadow-xl
        `;
      case 'secondary':
        return `
          bg-white border-2 border-gray-300
          hover:bg-gray-50 hover:border-gray-400
          text-gray-700 hover:text-gray-900
          shadow-md hover:shadow-lg
        `;
      case 'ghost':
        return `
          bg-transparent border-2 border-transparent
          hover:bg-gray-100 hover:border-gray-200
          text-gray-600 hover:text-gray-900
        `;
      default:
        return `
          bg-gradient-to-r from-indigo-600 to-purple-600
          hover:from-indigo-700 hover:to-purple-700
          text-white border-2 border-transparent
          shadow-lg hover:shadow-xl
        `;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm rounded-lg';
      case 'md':
        return 'px-6 py-3 text-base rounded-xl';
      case 'lg':
        return 'px-8 py-4 text-lg rounded-2xl';
      default:
        return 'px-6 py-3 text-base rounded-xl';
    }
  };

  const getPersonalityAnimation = () => {
    if (!personality) return '';
    
    switch (personality) {
      case 'academic':
        return 'hover:animate-pulse';
      case 'socratic':
        return 'hover:animate-bounce';
      case 'critical':
        return 'hover:animate-pulse';
      case 'divulgative':
        return 'hover:animate-bounce';
      default:
        return '';
    }
  };

  const isProcessing = loading || isThinking;

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isProcessing}
      className={`
        group relative inline-flex items-center justify-center
        font-semibold transition-all duration-300
        transform hover:scale-105 active:scale-95
        focus:outline-none focus:ring-4 focus:ring-indigo-500/20
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${getPersonalityAnimation()}
        ${isProcessing ? 'ai-thinking' : ''}
        ${className}
      `}
      data-personality={personality}
    >
      {/* Background Glow Effect */}
      <div className="
        absolute inset-0 rounded-inherit
        bg-gradient-to-r from-indigo-600/20 to-purple-600/20
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        blur-xl scale-150
      " />
      
      {/* Content */}
      <div className="relative z-10 flex items-center space-x-2">
        {/* Left Icon */}
        {icon && iconPosition === 'left' && !isProcessing && (
          <span className="group-hover:scale-110 transition-transform duration-300">
            {icon}
          </span>
        )}
        
        {/* Loading Spinner */}
        {isProcessing && (
          <Loader2 className="w-4 h-4 animate-spin" />
        )}
        
        {/* Text */}
        <span className={isProcessing ? 'opacity-75' : ''}>
          {isProcessing ? 'Elaborando...' : children}
        </span>
        
        {/* Right Icon */}
        {icon && iconPosition === 'right' && !isProcessing && (
          <span className="group-hover:scale-110 group-hover:translate-x-1 transition-all duration-300">
            {icon}
          </span>
        )}
      </div>
      
      {/* Thinking Indicator */}
      {isThinking && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
      )}
    </button>
  );
};

export default ThoughtfulButton;