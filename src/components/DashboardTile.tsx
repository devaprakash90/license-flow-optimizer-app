
import React from 'react';
import { useNavigate } from 'react-router-dom';

type DashboardTileProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
};

const DashboardTile = ({ title, description, icon, path }: DashboardTileProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div className="dashboard-tile" onClick={handleClick}>
      <div className="mb-4 text-belizeBlue">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default DashboardTile;
