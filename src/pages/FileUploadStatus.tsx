
import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getFileUploadStatus } from '@/utils/mockApi';

// Define the structure of file upload status data
type FileUploadStatus = {
  id: string;
  fileName: string;
  uploadDate: string;
  status: string;
  errorLog?: string;
};

const FileUploadStatus = () => {
  const [statusData, setStatusData] = useState<FileUploadStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<FileUploadStatus | null>(null);

  // Define table columns
  const columns = [
    { key: 'fileName', label: 'File Name' },
    { key: 'uploadDate', label: 'Upload Date/Time' },
    { key: 'status', label: 'Status' },
    { key: 'errorLog', label: 'Error Log' },
  ];

  // Format the data for display
  const formattedData = statusData.map((item) => ({
    ...item,
    uploadDate: new Date(item.uploadDate).toLocaleString(),
    errorLog: item.errorLog ? 'View' : '-',
  }));

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFileUploadStatus();
        setStatusData(data);
      } catch (error) {
        console.error('Error fetching upload status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (row: any) => {
    // Find the original data item
    const selectedItem = statusData.find((item) => item.id === row.id);
    if (selectedItem && selectedItem.errorLog) {
      setSelectedStatus(selectedItem);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader title="File Upload Status" />

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-medium text-gray-900">Upload History</h2>

        {isLoading ? (
          <div className="py-10 text-center">
            <LoadingSpinner size="large" />
            <p className="mt-2 text-gray-500">Loading upload history...</p>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={formattedData}
            onRowClick={handleRowClick}
          />
        )}
      </div>

      {/* Error log modal */}
      {selectedStatus && selectedStatus.errorLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold">
              Error Log: {selectedStatus.fileName}
            </h3>
            <div className="max-h-64 overflow-auto rounded bg-gray-100 p-4">
              <pre className="text-sm text-red-600">{selectedStatus.errorLog}</pre>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSelectedStatus(null)}
                className="rounded-md bg-belizeBlue px-4 py-2 text-sm font-medium text-white hover:bg-belizeBlue/90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadStatus;
