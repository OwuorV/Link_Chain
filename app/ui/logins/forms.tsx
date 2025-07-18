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
    <div className="flex flex-col  gap-1 mb-4 bg-[#fff]/60 rounded-[6px] px-3 py-2 w-full max-w-[400px]">
      <label htmlFor={Name} className="text-sm font-medium mb-1 text-gray-700 ">
        {label}
        <span className="text-red-600 ml-2">*</span>
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
        className="p-2 px-4 text-gray-500 border border-green-300  border-[1px] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-200"
      />
    </div>
  );
};
