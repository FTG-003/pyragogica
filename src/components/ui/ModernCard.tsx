import React from 'react';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  ariaLabel?: string;
}

const ModernCard: React.FC<ModernCardProps> = ({
  children,
  className = '',
  hover = true,
  padding = 'md',
  shadow = 'md',
  onClick,
  ariaLabel
}) => {
  const baseClasses = `
    bg-white rounded-3xl border border-slate-100
    transition-all duration-500 ease-out
    relative overflow-hidden
  `;

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  const hoverClasses = hover ? `
    hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01]
    cursor-pointer
  ` : '';

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        ${baseClasses}
        ${paddingClasses[padding]}
        ${shadowClasses[shadow]}
        ${hoverClasses}
        ${className}
        group
      `}
    >
      {/* Hover Glow Effect */}
      {hover && (
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </Component>
  );
};

export default React.memo(ModernCard);