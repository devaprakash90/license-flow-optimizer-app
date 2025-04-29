
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

import PageHeader from '@/components/PageHeader';
import Button from '@/components/Button';
import DataTable from '@/components/DataTable';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getRoleLevelResults, getUserLevelResults } from '@/utils/mockApi';

const ResultsPage = () => {
  const params = useParams<{ type: string; id: string }>();
  const { toast } = useToast();
  
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [downloadFormat, setDownloadFormat] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  
  // Determine if this is a role or user analysis result
  const isRoleAnalysis = params.type === 'role';
  
  // Define columns based on analysis type
  const roleColumns = [
    { key: 'role', label: 'Role' },
    { key: 'roleDescription', label: 'Role Description' },
    { key: 'authorizationObject', label: 'Authorization Object' },
    { key: 'field', label: 'Field' },
    { key: 'value', label: 'Value' },
    { key: 'canOptimize', label: 'License Can Be Optimized' },
    { key: 'insights', label: 'Insights & Recommendation' },
  ];
  
  const userColumns = [
    { key: 'user', label: 'User' },
    { key: 'displayName', label: 'Display Name' },
    { key: 'userGroup', label: 'User Group' },
    { key: 'userType', label: 'User Type' },
    { key: 'role', label: 'Role' },
    { key: 'canOptimize', label: 'License Can Be Optimized' },
    { key: 'insights', label: 'Insights & Recommendation' },
  ];
  
  const columns = isRoleAnalysis ? roleColumns : userColumns;
  
  // Fetch results when component mounts
  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      
      try {
        let data;
        if (isRoleAnalysis) {
          data = await getRoleLevelResults(params.id || '');
        } else {
          data = await getUserLevelResults(params.id || '');
        }
        
        setResults(data);
      } catch (error) {
        console.error('Error fetching results:', error);
        toast({
          title: 'Failed to Load Results',
          description: 'Could not retrieve analysis results. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResults();
  }, [params.id, params.type, toast, isRoleAnalysis]);
  
  const handleDownload = (format: string) => {
    setDownloadFormat(format);
    setIsDownloading(true);
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: 'Download Complete',
        description: `Results downloaded as ${format.toUpperCase()}`,
      });
      
      setIsDownloading(false);
      setDownloadFormat('');
    }, 1500);
  };
  
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader title={isRoleAnalysis ? 'Role Level Analysis Results' : 'User Level Analysis Results'} />
      
      <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-medium text-gray-900">Analysis Results</h2>
          
          <div className="flex flex-wrap gap-2">
            <span className="mr-2 self-center text-sm text-gray-500">Download:</span>
            
            <Button
              onClick={() => handleDownload('csv')}
              variant="outline"
              size="small"
              isLoading={isDownloading && downloadFormat === 'csv'}
              disabled={isDownloading}
            >
              CSV
            </Button>
            
            <Button
              onClick={() => handleDownload('xls')}
              variant="outline"
              size="small"
              isLoading={isDownloading && downloadFormat === 'xls'}
              disabled={isDownloading}
            >
              XLS
            </Button>
            
            <Button
              onClick={() => handleDownload('xlsx')}
              variant="outline"
              size="small"
              isLoading={isDownloading && downloadFormat === 'xlsx'}
              disabled={isDownloading}
            >
              XLSX
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="py-10 text-center">
            <LoadingSpinner size="large" />
            <p className="mt-2 text-gray-500">Loading analysis results...</p>
          </div>
        ) : (
          <DataTable columns={columns} data={results} />
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
