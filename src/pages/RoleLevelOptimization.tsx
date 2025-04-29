
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

import PageHeader from '@/components/PageHeader';
import DropdownSelect from '@/components/DropdownSelect';
import Button from '@/components/Button';
import DataTable from '@/components/DataTable';
import {
  runRoleLevelOptimization,
  getAnalysisHistory,
} from '@/utils/mockApi';

// Sample role options
const roleOptions = [
  { value: 'all', label: 'All Roles' },
  { value: 'ADMIN', label: 'Administrator' },
  { value: 'FINANCE', label: 'Finance User' },
  { value: 'HR_MANAGER', label: 'HR Manager' },
  { value: 'SALES', label: 'Sales Representative' },
  { value: 'IT_SUPPORT', label: 'IT Support' },
];

// Sample ratio options
const ratioOptions = [
  { value: '90', label: '90%' },
  { value: '95', label: '95%' },
  { value: '99', label: '99%' },
];

// Sample license options
const licenseOptions = [
  { value: 'all', label: 'All Licenses' },
  { value: 'ENTERPRISE', label: 'Enterprise License' },
  { value: 'PROFESSIONAL', label: 'Professional License' },
  { value: 'LIMITED', label: 'Limited License' },
];

// Type for analysis history
type AnalysisRecord = {
  id: string;
  requestDate: string;
  status: 'Success' | 'In Progress' | 'Failed';
  type: 'role' | 'user';
};

const RoleLevelOptimization = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form state
  const [selectedRoles, setSelectedRoles] = useState<string[]>(['all']);
  const [selectedRatio, setSelectedRatio] = useState<string>('90');
  const [selectedLicenses, setSelectedLicenses] = useState<string[]>(['all']);
  
  // Analysis history state
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(true);
  
  // Table columns for history
  const historyColumns = [
    { key: 'requestDate', label: 'Request Date' },
    { key: 'status', label: 'Status' },
    { key: 'action', label: 'View Result' },
  ];
  
  // Format the data for display
  const formattedHistory = analysisHistory
    .filter(record => record.type === 'role')
    .map((item) => ({
      id: item.id,
      requestDate: new Date(item.requestDate).toLocaleString(),
      status: item.status,
      action: item.status === 'Success' ? 'View' : '-',
    }));

  // Fetch analysis history on component mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getAnalysisHistory('role');
        setAnalysisHistory(history);
      } catch (error) {
        console.error('Error fetching analysis history:', error);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    fetchHistory();
  }, []);

  const handleRolesChange = (value: string | string[]) => {
    setSelectedRoles(value as string[]);
  };

  const handleRatioChange = (value: string | string[]) => {
    setSelectedRatio(value as string);
  };

  const handleLicensesChange = (value: string | string[]) => {
    setSelectedLicenses(value as string[]);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      const result = await runRoleLevelOptimization({
        roles: selectedRoles,
        ratio: selectedRatio,
        licenses: selectedLicenses,
      });
      
      toast({
        title: 'Analysis Started',
        description: 'Your role level optimization analysis is complete.',
      });
      
      // Add new record to history
      setAnalysisHistory([
        {
          id: result.requestId,
          requestDate: result.timestamp,
          status: 'Success',
          type: 'role',
        },
        ...analysisHistory,
      ]);
      
    } catch (error) {
      toast({
        title: 'Analysis Failed',
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedRoles(['all']);
    setSelectedRatio('90');
    setSelectedLicenses(['all']);
  };

  const handleRowClick = (row: any) => {
    if (row.status === 'Success') {
      navigate(`/results/role/${row.id}`);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader title="Role Level Optimization" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Input Form */}
        <div className="rounded-lg bg-white p-6 shadow-sm lg:col-span-1">
          <h2 className="mb-6 text-xl font-medium text-gray-900">Analysis Parameters</h2>
          
          <div className="space-y-6">
            <DropdownSelect
              label="Role"
              id="role-select"
              options={roleOptions}
              value={selectedRoles}
              onChange={handleRolesChange}
              multiple={true}
            />
            
            <DropdownSelect
              label="Ratio"
              id="ratio-select"
              options={ratioOptions}
              value={selectedRatio}
              onChange={handleRatioChange}
              multiple={false}
            />
            
            <DropdownSelect
              label="License To Be Optimized"
              id="license-select"
              options={licenseOptions}
              value={selectedLicenses}
              onChange={handleLicensesChange}
              multiple={true}
            />
            
            <div className="flex space-x-4">
              <Button
                onClick={handleSubmit}
                isLoading={isLoading}
                disabled={isLoading}
              >
                Submit Request
              </Button>
              
              <Button
                onClick={handleClear}
                variant="secondary"
                disabled={isLoading}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
        
        {/* Analysis History */}
        <div className="rounded-lg bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="mb-6 text-xl font-medium text-gray-900">Analysis History</h2>
          
          {isLoadingHistory ? (
            <div className="py-10 text-center">
              <div className="spinner mx-auto h-8 w-8" />
              <p className="mt-2 text-gray-500">Loading analysis history...</p>
            </div>
          ) : (
            <DataTable
              columns={historyColumns}
              data={formattedHistory}
              onRowClick={handleRowClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleLevelOptimization;
