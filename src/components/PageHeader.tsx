
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

type PageHeaderProps = {
  title: string;
  showBackButton?: boolean;
  showHomeButton?: boolean;
};

const PageHeader = ({ 
  title, 
  showBackButton = true, 
  showHomeButton = false 
}: PageHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <button
            onClick={handleBack}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        {showHomeButton && (
          <button
            onClick={handleHome}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Go home"
          >
            <Home size={20} />
          </button>
        )}
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>
    </div>
  );
};

export default PageHeader;
