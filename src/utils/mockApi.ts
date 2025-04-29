
// Mock API functions to simulate backend responses

// Simulate API call delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Mock file upload API
export const uploadFiles = async (
  files: {
    licenseRoles?: File;
    rolesAuth?: File;
    userData?: File;
    userRoleMapping?: File;
  },
  metadata: {
    clientName: string;
    systemName: string;
  }
) => {
  // Simulate API delay (2-5 seconds)
  await delay(2000 + Math.random() * 3000);

  // Simulate success/failure (90% success rate)
  const isSuccess = Math.random() < 0.9;

  if (!isSuccess) {
    throw new Error('Failed to upload files. Please try again.');
  }

  const tables = [
    `${metadata.clientName}_ROLE_OBJ_LICE_DATA`,
    `${metadata.clientName}_ROLE_AUTH_OBJ_DATA`,
  ];

  return {
    success: true,
    timestamp: new Date().toISOString(),
    uploadId: generateId(),
    tables,
    message: 'Files uploaded successfully.',
  };
};

// Mock file upload status API
export const getFileUploadStatus = async () => {
  // Simulate API delay
  await delay(1000);

  // Return mock data
  return [
    {
      id: 'up_' + generateId(),
      fileName: 'license_roles_data.xml',
      uploadDate: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      status: 'Success',
    },
    {
      id: 'up_' + generateId(),
      fileName: 'user_role_mapping.csv',
      uploadDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      status: 'Success',
    },
    {
      id: 'up_' + generateId(),
      fileName: 'roles_auth_data.xlsx',
      uploadDate: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
      status: 'Failed',
      errorLog: 'Invalid file format. Please check the file and try again.',
    },
  ];
};

// Mock data download API
export const downloadData = async (dataType: string, format: string) => {
  // Simulate API delay
  await delay(1500);

  // Return mock response
  return {
    success: true,
    fileName: `${dataType.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.${format.toLowerCase()}`,
    url: '#', // In a real app, this would be a downloadable URL
    message: `${dataType} data prepared for download in ${format.toUpperCase()} format.`,
  };
};

// Mock role optimization API
export const runRoleLevelOptimization = async (params: {
  roles: string[];
  ratio: string;
  licenses: string[];
}) => {
  // Simulate API delay (5-10 seconds for analysis)
  await delay(5000 + Math.random() * 5000);

  // Generate a unique request ID
  const requestId = 'role_' + generateId();

  // Return a success response
  return {
    success: true,
    requestId,
    timestamp: new Date().toISOString(),
    status: 'Success',
  };
};

// Mock user optimization API
export const runUserLevelOptimization = async (params: {
  user: string;
  userTypes: string[];
  userGroup: string;
}) => {
  // Simulate API delay (5-10 seconds for analysis)
  await delay(5000 + Math.random() * 5000);

  // Generate a unique request ID
  const requestId = 'user_' + generateId();

  // Return a success response
  return {
    success: true,
    requestId,
    timestamp: new Date().toISOString(),
    status: 'Success',
  };
};

// Mock role optimization results
export const getRoleLevelResults = async (requestId: string) => {
  // Simulate API delay
  await delay(1000);

  const statuses = ['Yes', 'No', 'Maybe'];
  const insights = [
    'License can be optimized by removing unused authorizations',
    'Consider downgrading license type',
    'License is properly assigned and utilized',
    'License has redundant authorizations',
  ];

  // Return mock data
  return [
    {
      role: 'ADMIN',
      roleDescription: 'System Administrator',
      authorizationObject: 'S_TCODE',
      field: 'TCD',
      value: 'SE16',
      canOptimize: statuses[Math.floor(Math.random() * statuses.length)],
      insights: insights[Math.floor(Math.random() * insights.length)],
    },
    {
      role: 'FINANCE',
      roleDescription: 'Finance User',
      authorizationObject: 'F_BKPF_BUK',
      field: 'BUKRS',
      value: '1000',
      canOptimize: statuses[Math.floor(Math.random() * statuses.length)],
      insights: insights[Math.floor(Math.random() * insights.length)],
    },
    {
      role: 'HR_MANAGER',
      roleDescription: 'HR Manager',
      authorizationObject: 'P_ORGIN',
      field: 'ORGIN',
      value: 'USA',
      canOptimize: statuses[Math.floor(Math.random() * statuses.length)],
      insights: insights[Math.floor(Math.random() * insights.length)],
    },
  ];
};

// Mock user optimization results
export const getUserLevelResults = async (requestId: string) => {
  // Simulate API delay
  await delay(1000);

  const statuses = ['Yes', 'No', 'Maybe'];
  const insights = [
    'User has multiple unused licenses',
    'Consider removing access to rarely used applications',
    'License usage is appropriate for role',
    'User license type can be downgraded',
  ];

  // Return mock data
  return [
    {
      user: 'JSMITH',
      displayName: 'John Smith',
      userGroup: 'Finance',
      userType: 'A - Dialog',
      role: 'FINANCE_MANAGER',
      canOptimize: statuses[Math.floor(Math.random() * statuses.length)],
      insights: insights[Math.floor(Math.random() * insights.length)],
    },
    {
      user: 'MJONES',
      displayName: 'Mary Jones',
      userGroup: 'Human Resources',
      userType: 'A - Dialog',
      role: 'HR_SPECIALIST',
      canOptimize: statuses[Math.floor(Math.random() * statuses.length)],
      insights: insights[Math.floor(Math.random() * insights.length)],
    },
    {
      user: 'RDAVIS',
      displayName: 'Robert Davis',
      userGroup: 'IT',
      userType: 'B - System',
      role: 'SYSADMIN',
      canOptimize: statuses[Math.floor(Math.random() * statuses.length)],
      insights: insights[Math.floor(Math.random() * insights.length)],
    },
  ];
};

// Mock historical analysis requests
export const getAnalysisHistory = async (type: 'role' | 'user') => {
  // Simulate API delay
  await delay(1000);

  // Generate between 3-7 historical requests
  const count = 3 + Math.floor(Math.random() * 5);
  const statuses = ['Success', 'In Progress', 'Failed'];
  const history = [];

  for (let i = 0; i < count; i++) {
    const isSuccess = Math.random() > 0.2;
    const status = isSuccess 
      ? Math.random() > 0.3 ? 'Success' : 'In Progress' 
      : 'Failed';
    
    // Generate a timestamp within the last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    history.push({
      id: type === 'role' ? 'role_' + generateId() : 'user_' + generateId(),
      requestDate: date.toISOString(),
      status,
      type
    });
  }

  return history;
};
