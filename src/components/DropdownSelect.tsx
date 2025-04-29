
import React, { useState } from 'react';

type Option = {
  value: string;
  label: string;
};

type DropdownSelectProps = {
  label: string;
  options: Option[];
  id: string;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  multiple?: boolean;
};

const DropdownSelect = ({
  label,
  options,
  id,
  value,
  onChange,
  placeholder = 'Select an option',
  multiple = false,
}: DropdownSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const values = value as string[];
      const newValue = values.includes(optionValue)
        ? values.filter((v) => v !== optionValue)
        : [...values, optionValue];
      onChange(newValue);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const getDisplayValue = () => {
    if (multiple) {
      const values = value as string[];
      if (values.length === 0) return placeholder;
      
      if (values.length === options.length) return 'All selected';
      
      if (values.length > 2) {
        return `${values.length} selected`;
      }
      
      return options
        .filter((option) => values.includes(option.value))
        .map((option) => option.label)
        .join(', ');
    } else {
      const option = options.find((option) => option.value === value);
      return option ? option.label : placeholder;
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          id={id}
          onClick={toggleOpen}
          className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-left text-sm focus:border-belizeBlue focus:outline-none focus:ring-1 focus:ring-belizeBlue"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={`block truncate ${!value ? 'text-gray-500' : ''}`}>
            {getDisplayValue()}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
        
        {isOpen && (
          <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <ul
              tabIndex={-1}
              role="listbox"
              aria-labelledby={id}
              aria-activedescendant={`${id}-option-${value}`}
              className="max-h-60 divide-y divide-gray-100 overflow-auto"
            >
              {multiple && (
                <li
                  className="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-blue-50"
                  onClick={() => {
                    const allValues = options.map(opt => opt.value);
                    onChange(
                      (value as string[]).length === options.length ? [] : allValues
                    );
                  }}
                >
                  <span className="block truncate font-medium">
                    {(value as string[]).length === options.length
                      ? 'Deselect All'
                      : 'Select All'}
                  </span>
                </li>
              )}
              {options.map((option) => {
                const isSelected = multiple
                  ? (value as string[]).includes(option.value)
                  : value === option.value;

                return (
                  <li
                    key={option.value}
                    className={`relative cursor-pointer select-none py-2 pl-3 pr-9 ${
                      isSelected ? 'bg-blue-50 text-belizeBlue' : 'text-gray-900 hover:bg-gray-50'
                    }`}
                    id={`${id}-option-${option.value}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option.value)}
                  >
                    <span className="block truncate">
                      {option.label}
                    </span>
                    {isSelected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-belizeBlue">
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownSelect;
