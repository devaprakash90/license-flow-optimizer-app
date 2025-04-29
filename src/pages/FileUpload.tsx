
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

import PageHeader from '@/components/PageHeader';
import FileUploadInput from '@/components/FileUploadInput';
import TextInput from '@/components/TextInput';
import Button from '@/components/Button';
import { uploadFiles } from '@/utils/mockApi';

const FileUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for file inputs
  const [licenseRoles, setLicenseRoles] = useState<File | null>(null);
  const [rolesAuth, setRolesAuth] = useState<File | null>(null);
  const [userData, setUserData] = useState<File | null>(null);
  const [userRoleMapping, setUserRoleMapping] = useState<File | null>(null);
  
  // State for metadata inputs
  const [clientName, setClientName] = useState('');
  const [systemName, setSystemName] = useState('');
  
  // Loading state
  const [isUploading, setIsUploading] = useState(false);
  
  const handleUpload = async () => {
    // Validate inputs
    if (!licenseRoles || !rolesAuth || !userData || !userRoleMapping) {
      toast({
        title: 'Missing Files',
        description: 'Please select all required files before uploading.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!clientName || !systemName) {
      toast({
        title: 'Missing Information',
        description: 'Please provide both Client Name and System Name.',
        variant: 'destructive',
      });
      return;
    }
    
    // Set loading state
    setIsUploading(true);
    
    try {
      // Call the mock API to simulate file upload
      const result = await uploadFiles(
        {
          licenseRoles,
          rolesAuth,
          userData,
          userRoleMapping,
        },
        {
          clientName,
          systemName,
        }
      );
      
      // Show success message
      toast({
        title: 'Upload Successful',
        description: `Files uploaded to tables: ${result.tables.join(', ')}`,
      });
      
      // Navigate back to dashboard or status page
      navigate('/status');
    } catch (error) {
      // Show error message
      toast({
        title: 'Upload Failed',
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      // Reset loading state
      setIsUploading(false);
    }
  };
  
  const handleClear = () => {
    // Reset all form fields
    setLicenseRoles(null);
    setRolesAuth(null);
    setUserData(null);
    setUserRoleMapping(null);
    setClientName('');
    setSystemName('');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader title="Upload Files" />
      
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="space-y-6">
          <h2 className="text-xl font-medium text-gray-900">File Uploads</h2>
          
          <FileUploadInput
            label="FUE License Roles & Objects"
            id="license-roles"
            accept=".xml"
            onChange={setLicenseRoles}
          />
          
          <FileUploadInput
            label="Roles Authorization Data"
            id="roles-auth"
            accept=".csv,.xlsx"
            onChange={setRolesAuth}
          />
          
          <FileUploadInput
            label="User Data"
            id="user-data"
            accept=".csv,.xlsx"
            onChange={setUserData}
          />
          
          <FileUploadInput
            label="User Role Mapping"
            id="user-role"
            accept=".csv,.xlsx"
            onChange={setUserRoleMapping}
          />
          
          <h2 className="text-xl font-medium text-gray-900">Additional Information</h2>
          
          <TextInput
            label="Client Name"
            id="client-name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Enter client name"
            required
          />
          
          <TextInput
            label="System Name"
            id="system-name"
            value={systemName}
            onChange={(e) => setSystemName(e.target.value)}
            placeholder="Enter system name"
            maxLength={10}
            required
          />
          
          <div className="flex space-x-4">
            <Button
              onClick={handleUpload}
              isLoading={isUploading}
              disabled={isUploading}
            >
              Upload
            </Button>
            
            <Button
              onClick={handleClear}
              variant="secondary"
              disabled={isUploading}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
