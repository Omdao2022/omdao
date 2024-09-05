import React, { FC, useState } from 'react';
import { CustomInputProps } from '../../types';

export const InputBox: FC<CustomInputProps> = ({
  label,
  name,
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
            className={`block text-sm font-normal mb-1 transition-colors duration-200 ${
              isFocused ? "text-[#ffffff]" : "text-[#bebebe]"
            }`}
          >
            {label}
          </label>
        )}
      </div>
      <div>
        <div className={`relative ${isFocused ? "text-[#ffffff]" : "text-[#c1c1c1]"}`}>
          {icon && (
            <span className={`flex flex-row justify-start items-center gap-1 absolute left-4 top-3 ${isFocused? "text-white " : "text-[#c1c1c1]"}`} >
              {icon}
              <p className="pl-1 text-sm">|</p>
            </span>
          )}
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)} // Set focus state to true
            onBlur={() => setIsFocused(false)} // Set focus state to false
            className={`block w-full pl-14 pr-3 py-2 border rounded-md bg-transparent ${
              error ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-[#ffffff]`}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </div>
  );
};