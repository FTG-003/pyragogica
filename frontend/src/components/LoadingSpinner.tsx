import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Caricamento...', 
  className = '' 
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

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <div className="relative">
        <Loader2 className={`${sizeClasses[size]} text-indigo-600 animate-spin`} />
      </div>
      
      {text && (
        <div className="text-center space-y-1">
          <p className={`${textSizeClasses[size]} text-slate-700 font-medium`}>
            {text}
          </p>
          <div className="flex space-x-1 justify-center">
            <div className="w-1 h-1 bg-indigo-500 rounded-full"></div>
            <div className="w-1 h-1 bg-indigo-500 rounded-full"></div>
            <div className="w-1 h-1 bg-indigo-500 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(LoadingSpinner);