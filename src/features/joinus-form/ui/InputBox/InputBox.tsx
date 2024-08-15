import React, { FC, useState } from 'react';
import { CustomInputProps } from '../../types';

export const InputBox: FC<CustomInputProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <div className="flex flex-col m-2">
      <div>
        {label && (
          <label
            className={`block text-sm font-medium mb-1 transition-colors duration-200 ${
              isFocused ? "text-[#CB4D8C]" : "text-white"
            }`}
          >
            {label}
          </label>
        )}
      </div>
      <div>
        <div className="relative">
          {icon && (
            <span className="flex absolute left-3 top-2 text-white">
              {icon}
              <p className="pl-1 text-sm">|</p>
            </span>
          )}
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)} // Set focus state to true
            onBlur={() => setIsFocused(false)} // Set focus state to false
            className={`block w-full pl-10 pr-3 py-1 border rounded-md bg-transparent ${
              error ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </div>
  );
};