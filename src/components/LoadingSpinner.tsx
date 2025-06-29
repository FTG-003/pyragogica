import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
  variant?: 'default' | 'dots' | 'pulse';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Caricamento...', 
  className = '',
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  if (variant === 'dots') {
    return (
      <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
        {text && (
          <p className={`${textSizeClasses[size]} text-slate-600 font-medium`}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
        <div className={`${sizeClasses[size]} bg-indigo-600 rounded-full animate-pulse`}></div>
        {text && (
          <p className={`${textSizeClasses[size]} text-slate-600 font-medium`}>
            {text}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      {/* Modern Loading Spinner */}
      <div className="relative">
        <div 
          className={`${sizeClasses[size]} border-4 border-slate-200 rounded-full animate-spin`}
          style={{
            borderTopColor: '#6366f1',
            borderRightColor: '#8b5cf6'
          }}
        ></div>
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent, rgba(99, 102, 241, 0.1))',
            animation: 'spin 2s linear infinite reverse'
          }}
        ></div>
      </div>
      
      {text && (
        <div className="text-center space-y-1">
          <p className={`${textSizeClasses[size]} text-slate-700 font-medium`}>
            {text}
          </p>
          <div className="flex space-x-1 justify-center">
            <div className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(LoadingSpinner);