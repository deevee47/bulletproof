import React from 'react';

type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<InputFieldProps> = ({ label, name, type = 'text', value, onChange }) => {
  return (
    <div className='space-y-2'>
      <label htmlFor={name} className='block text-sm font-medium text-gray-200'>
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={`Enter your ${label.toLowerCase()}`}
          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-orange-300/50 focus:ring-2 focus:ring-orange-300/50 transition-all duration-300 text-white placeholder:text-gray-400 outline-none backdrop-blur-sm"
        />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default InputField;
