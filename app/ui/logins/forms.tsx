"use client";
import React from "react";

interface FormProps {
  Name: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  minLength?: number; // Optional, can be set to a default value
  maxLength?: number; // Optional, can be set to a default value
}
export const Form: React.FC<FormProps> = ({
  Name,
  label,
  type,
  value,
  onChange,
  placeholder = "",
  required = true,
  minLength = 0, // Optional, can be set to a default value
  maxLength = 255, // Optional, can be set to a default value
}) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label htmlFor={Name} className="text-sm font-medium mb-1 text-gray-700 ">
        {label}
      </label>
      <input
        id={Name}
        name={Name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        className="p-2 px-4 text-gray-500 border border-gray-300  border-[1px] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-green-200"
      />
    </div>
  );
};
