
import React, { useState } from 'react';

type FileInputProps = {
  label: string;
  id: string;
  accept?: string;
  onChange: (file: File | null) => void;
};

const FileUploadInput = ({ label, id, accept, onChange }: FileInputProps) => {
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file ? file.name : '');
    onChange(file);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="flex items-center">
        <input
          type="file"
          id={id}
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor={id}
          className="mr-2 cursor-pointer rounded-md bg-belizeBlue px-4 py-2 text-sm font-medium text-white hover:bg-belizeBlue/90"
        >
          Choose File
        </label>
        <span className="text-sm text-gray-500">
          {fileName || 'No file selected'}
        </span>
      </div>
    </div>
  );
};

export default FileUploadInput;
