
import React from 'react';

type TextInputProps = {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
};

const TextInput = ({
  label,
  id,
  value,
  onChange,
  placeholder = '',
  maxLength,
  required = false,
}: TextInputProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:border-belizeBlue focus:outline-none focus:ring-1 focus:ring-belizeBlue"
      />
      {maxLength && (
        <p className="mt-1 text-xs text-gray-500">
          {value.length}/{maxLength} characters
        </p>
      )}
    </div>
  );
};

export default TextInput;
