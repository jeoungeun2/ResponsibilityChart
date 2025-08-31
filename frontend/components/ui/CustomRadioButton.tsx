"use client";

import React from 'react';

interface CustomRadioButtonProps {
  name: string;
  value: string;
  label: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  color?: 'orange' | 'white' | 'green';
}

export default function CustomRadioButton({
  name,
  value,
  label,
  checked = false,
  onChange,
  color = 'orange'
}: CustomRadioButtonProps) {
  const getColorClass = () => {
    switch (color) {
      case 'orange':
        return 'bg-[#ff6600]';
      case 'white':
        return 'bg-white';
      case 'green':
        return 'bg-[#26be00]';
      default:
        return 'bg-[#ff6600]';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onChange?.(value);
    }
  };

  return (
    <label className="flex items-center mb-2.5 cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        className="hidden"
      />
      <div className="w-5 h-5 rounded-full border-2 border-[#aaa] relative mr-2.5">
        <div
          className={`w-3 h-3 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-in-out ${
            checked ? 'scale-100' : 'scale-0'
          } ${getColorClass()}`}
        />
      </div>
      <span className="text-base font-bold text-gray-700">{label}</span>
    </label>
  );
}
