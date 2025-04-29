
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import PageHeader from '@/components/PageHeader';
import Button from '@/components/Button';
import { downloadData } from '@/utils/mockApi';

const ManageData = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({
    roles: false,
    auth: false,
  });

  const handleDownload = async (dataType: string, format: string) => {
    const key = dataType === 'FUE License Roles & Objects' ? 'roles' : 'auth';
    
    setIsLoading({ ...isLoading, [key]: true });
    
    try {
      const result = await downloadData(dataType, format);
      
      toast({
        title: 'Download Ready',
        description: result.message,
      });
      
      // In a real app, this would trigger a file download
      console.log('Download file:', result.fileName);
    } catch (error) {
      toast({
        title: 'Download Failed',
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading({ ...isLoading, [key]: false });
    }
  };

  // Format options for the download
  const downloadFormats = [
    { value: 'csv', label: 'CSV' },
    { value: 'xls', label: 'XLS' },
    { value: 'xlsx', label: 'XLSX' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader title="Manage Data" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* FUE License Roles & Objects Section */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-medium text-gray-900">
            FUE License Roles & Objects
          </h2>
          
          <p className="mb-4 text-gray-600">
            Download the license roles and objects data in your preferred format.
          </p>
          
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium text-gray-700">Select Format</h3>
            <div className="flex flex-wrap gap-2">
              {downloadFormats.map((format) => (
                <Button
                  key={format.value}
                  onClick={() => handleDownload('FUE License Roles & Objects', format.value)}
                  variant="outline"
                  size="small"
                  isLoading={isLoading.roles && format.value === 'csv'}
                  disabled={isLoading.roles}
                >
                  {format.label}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  About this data
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    This file contains information about license roles, objects, and
                    their relationships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Roles Authorization Data Section */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-medium text-gray-900">
            Roles Authorization Data
          </h2>
          
          <p className="mb-4 text-gray-600">
            Download the roles authorization data in your preferred format.
          </p>
          
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium text-gray-700">Select Format</h3>
            <div className="flex flex-wrap gap-2">
              {downloadFormats.map((format) => (
                <Button
                  key={format.value}
                  onClick={() => handleDownload('Roles Authorization Data', format.value)}
                  variant="outline"
                  size="small"
                  isLoading={isLoading.auth && format.value === 'csv'}
                  disabled={isLoading.auth}
                >
                  {format.label}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  About this data
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    This file contains detailed information about role authorizations,
                    permissions, and access controls.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageData;
