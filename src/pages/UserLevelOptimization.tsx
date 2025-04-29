
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

import PageHeader from '@/components/PageHeader';
import DropdownSelect from '@/components/DropdownSelect';
import Button from '@/components/Button';
import DataTable from '@/components/DataTable';
import {
  runUserLevelOptimization,
  getAnalysisHistory,
} from '@/utils/mockApi';

// Sample user options
const userOptions = [
  { value: 'JSMITH', label: 'John Smith (JSMITH)' },
  { value: 'MJONES', label: 'Mary Jones (MJONES)' },
  { value: 'RDAVIS', label: 'Robert Davis (RDAVIS)' },
  { value: 'ALEE', label: 'Alice Lee (ALEE)' },
  { value: 'BWILSON', label: 'Bob Wilson (BWILSON)' },
];

// Sample user type options
const userTypeOptions = [
  { value: 'A', label: 'A - Dialog' },
  { value: 'B', label: 'B - System' },
  { value: 'C', label: 'C - Communication' },
  { value: 'L', label: 'L - Reference' },
  { value: 'S', label: 'S - Service' },
];

// Sample user group options
const userGroupOptions = [
  { value: 'FINANCE', label: 'Finance' },
  { value: 'HR', label: 'Human Resources' },
  { value: 'IT', label: 'IT' },
  { value: 'SALES', label: 'Sales' },
  { value: 'OPERATIONS', label: 'Operations' },
];

// Type for analysis history
type AnalysisRecord = {
  id: string;
  requestDate: string;
  status: 'Success' | 'In Progress' | 'Failed';
  type: 'role' | 'user';
};

const UserLevelOptimization = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form state
  const [selectedUser, setSelectedUser] = useState<string>('JSMITH');
  const [selectedUserTypes, setSelectedUserTypes] = useState<string[]>(['A']);
  const [selectedUserGroup, setSelectedUserGroup] = useState<string>('FINANCE');
  
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
    .filter(record => record.type === 'user')
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
        const history = await getAnalysisHistory('user');
        setAnalysisHistory(history);
      } catch (error) {
        console.error('Error fetching analysis history:', error);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    fetchHistory();
  }, []);

  const handleUserChange = (value: string | string[]) => {
    setSelectedUser(value as string);
  };

  const handleUserTypesChange = (value: string | string[]) => {
    setSelectedUserTypes(value as string[]);
  };

  const handleUserGroupChange = (value: string | string[]) => {
    setSelectedUserGroup(value as string);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      const result = await runUserLevelOptimization({
        user: selectedUser,
        userTypes: selectedUserTypes,
        userGroup: selectedUserGroup,
      });
      
      toast({
        title: 'Analysis Started',
        description: 'Your user level optimization analysis is complete.',
      });
      
      // Add new record to history
      setAnalysisHistory([
        {
          id: result.requestId,
          requestDate: result.timestamp,
          status: 'Success',
          type: 'user',
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
    setSelectedUser('JSMITH');
    setSelectedUserTypes(['A']);
    setSelectedUserGroup('FINANCE');
  };

  const handleRowClick = (row: any) => {
    if (row.status === 'Success') {
      navigate(`/results/user/${row.id}`);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader title="User Level Optimization" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Input Form */}
        <div className="rounded-lg bg-white p-6 shadow-sm lg:col-span-1">
          <h2 className="mb-6 text-xl font-medium text-gray-900">Analysis Parameters</h2>
          
          <div className="space-y-6">
            <DropdownSelect
              label="User"
              id="user-select"
              options={userOptions}
              value={selectedUser}
              onChange={handleUserChange}
              multiple={false}
            />
            
            <DropdownSelect
              label="User Type"
              id="user-type-select"
              options={userTypeOptions}
              value={selectedUserTypes}
              onChange={handleUserTypesChange}
              multiple={true}
            />
            
            <DropdownSelect
              label="User Group"
              id="user-group-select"
              options={userGroupOptions}
              value={selectedUserGroup}
              onChange={handleUserGroupChange}
              multiple={false}
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

export default UserLevelOptimization;
