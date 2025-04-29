
import React from 'react';

type LoadingSpinnerProps = {
  size?: 'small' | 'medium' | 'large';
};

const LoadingSpinner = ({ size = 'medium' }: LoadingSpinnerProps) => {
  const sizeClass = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`spinner ${sizeClass[size]}`} />
    </div>
  );
};

export default LoadingSpinner;
