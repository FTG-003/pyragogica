import React, { forwardRef } from 'react';
import { Search, Eye, EyeOff } from 'lucide-react';

interface ModernInputProps {
  type?: 'text' | 'email' | 'password' | 'search' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  ariaLabel?: string;
  required?: boolean;
}

const ModernInput = forwardRef<HTMLInputElement, ModernInputProps>(({
  type = 'text',
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  error = false,
  errorMessage,
  icon,
  iconPosition = 'left',
  size = 'md',
  className = '',
  ariaLabel,
  required = false
}, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const baseClasses = `
    w-full border-2 bg-white
    transition-all duration-300 ease-out
    focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
    placeholder:text-slate-400
  `;

  const stateClasses = error 
    ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/20'
    : isFocused
    ? 'border-indigo-500 ring-4 ring-indigo-500/20'
    : 'border-slate-200 hover:border-slate-300';

  const paddingClasses = icon 
    ? iconPosition === 'left' 
      ? size === 'sm' ? 'pl-10' : size === 'md' ? 'pl-12' : 'pl-14'
      : size === 'sm' ? 'pr-10' : size === 'md' ? 'pr-12' : 'pr-14'
    : '';

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="relative">
      {/* Input Field */}
      <input
        ref={ref}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        required={required}
        aria-label={ariaLabel}
        aria-invalid={error}
        aria-describedby={error && errorMessage ? 'error-message' : undefined}
        className={`
          ${baseClasses}
          ${sizeClasses[size]}
          ${stateClasses}
          ${paddingClasses}
          ${className}
        `}
        style={{
          fontFeatureSettings: '"ss01"',
          letterSpacing: '-0.01em'
        }}
      />

      {/* Left Icon */}
      {icon && iconPosition === 'left' && (
        <div className={`
          absolute left-4 top-1/2 transform -translate-y-1/2
          text-slate-400 transition-colors duration-300
          ${isFocused ? 'text-indigo-500' : ''}
        `}>
          <span className={iconSizeClasses[size]}>
            {icon}
          </span>
        </div>
      )}

      {/* Right Icon or Password Toggle */}
      {(icon && iconPosition === 'right') || type === 'password' ? (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          {type === 'password' ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`
                text-slate-400 hover:text-slate-600 transition-colors duration-300
                focus:outline-none focus:text-indigo-500
                ${iconSizeClasses[size]}
              `}
              aria-label={showPassword ? 'Nascondi password' : 'Mostra password'}
            >
              {showPassword ? <EyeOff className={iconSizeClasses[size]} /> : <Eye className={iconSizeClasses[size]} />}
            </button>
          ) : (
            <span className={`
              text-slate-400 transition-colors duration-300
              ${isFocused ? 'text-indigo-500' : ''}
              ${iconSizeClasses[size]}
            `}>
              {icon}
            </span>
          )}
        </div>
      ) : null}

      {/* Error Message */}
      {error && errorMessage && (
        <p id="error-message" className="mt-2 text-sm text-red-600 font-medium">
          {errorMessage}
        </p>
      )}

      {/* Focus Ring Enhancement */}
      {isFocused && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none" />
      )}
    </div>
  );
});

ModernInput.displayName = 'ModernInput';

export default React.memo(ModernInput);