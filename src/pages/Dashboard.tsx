
import React from 'react';
import {
  Upload,
  FileText,
  Database,
  Settings,
  User,
} from 'lucide-react';

import DashboardTile from '@/components/DashboardTile';

const Dashboard = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-belizeBlue">
          FUE License Optimizer
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Optimize your license usage and reduce costs
        </p>
      </header>

      {/* Master Data Section */}
      <section className="mb-8 section-bg-primary rounded-xl p-6">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">Master Data</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <DashboardTile
            title="Upload File"
            description="Upload license roles, authorization data, and user information"
            icon={<Upload size={24} />}
            path="/upload"
          />
          <DashboardTile
            title="File Upload Status"
            description="View the status of your previously uploaded files"
            icon={<FileText size={24} />}
            path="/status"
          />
          <DashboardTile
            title="Manage Data"
            description="View and download your uploaded data"
            icon={<Database size={24} />}
            path="/manage"
          />
        </div>
      </section>

      {/* License Optimizer Section */}
      <section className="section-bg-secondary rounded-xl p-6">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">License Optimizer</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <DashboardTile
            title="Role Level Optimization"
            description="Optimize licenses based on role assignments and access"
            icon={<Settings size={24} />}
            path="/role-optimization"
          />
          <DashboardTile
            title="User Level Optimization"
            description="Optimize licenses based on user behavior and access patterns"
            icon={<User size={24} />}
            path="/user-optimization"
          />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
