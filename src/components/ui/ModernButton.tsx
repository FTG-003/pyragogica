import React from 'react';
import { Loader2 } from 'lucide-react';

interface ModernButtonProps {
  children: React.ReactNode;
  onClick?: () => void | Promise<void>;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

const ModernButton: React.FC<ModernButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  icon,
  iconPosition = 'left',
  type = 'button',
  ariaLabel
}) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-semibold transition-all duration-300 ease-out
    focus:outline-none focus:ring-4 focus:ring-indigo-500/20
    transform hover:scale-[1.02] active:scale-[0.98]
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    relative overflow-hidden
  `;

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg min-h-[36px]',
    md: 'px-6 py-3 text-base rounded-xl min-h-[44px]',
    lg: 'px-8 py-4 text-lg rounded-2xl min-h-[52px]'
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-indigo-600 to-purple-600 text-white
      hover:from-indigo-700 hover:to-purple-700
      shadow-lg hover:shadow-xl
      border-2 border-transparent
    `,
    secondary: `
      bg-white border-2 border-slate-200 text-slate-700
      hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900
      shadow-md hover:shadow-lg
    `,
    ghost: `
      bg-transparent text-slate-600 border-2 border-transparent
      hover:bg-slate-100 hover:text-slate-900
    `,
    outline: `
      bg-transparent border-2 border-indigo-600 text-indigo-600
      hover:bg-indigo-50 hover:border-indigo-700 hover:text-indigo-700
    `
  };

  const handleClick = async () => {
    if (disabled || loading) return;
    if (onClick) {
      await onClick();
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      style={{
        fontFeatureSettings: '"ss01"',
        letterSpacing: '-0.01em'
      }}
    >
      {/* Background Glow Effect */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl scale-150" />
      )}
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-2">
        {/* Left Icon */}
        {icon && iconPosition === 'left' && !loading && (
          <span className="transition-transform duration-300 group-hover:scale-110">
            {icon}
          </span>
        )}
        
        {/* Loading Spinner */}
        {loading && (
          <Loader2 className="w-4 h-4 animate-spin" />
        )}
        
        {/* Text */}
        <span className={loading ? 'opacity-75' : ''}>
          {loading ? 'Caricamento...' : children}
        </span>
        
        {/* Right Icon */}
        {icon && iconPosition === 'right' && !loading && (
          <span className="transition-all duration-300 group-hover:scale-110 group-hover:translate-x-0.5">
            {icon}
          </span>
        )}
      </div>
    </button>
  );
};

export default React.memo(ModernButton);