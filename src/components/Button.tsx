
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  isLoading?: boolean;
};

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  type = 'button',
  className = '',
  isLoading = false,
}: ButtonProps) => {
  const variantClasses = {
    primary: 'bg-belizeBlue text-white hover:bg-belizeBlue/90',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'bg-white text-belizeBlue border border-belizeBlue hover:bg-belizeBlue/10',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-belizeBlue focus:ring-offset-2 ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <span className="spinner mr-2" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
