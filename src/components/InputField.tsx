'use client';

import React, { memo } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

type InputFieldProps = {
  label: string;
  name: string;
  type?: string; // Add any types you need
  value: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
};

const inputStyles = cva(
  'w-full px-4 py-2 rounded-lg bg-white/5 border transition-all duration-300 text-white placeholder:text-gray-400 outline-none backdrop-blur-sm',
  {
    variants: {
      state: {
        default: 'border-white/10 focus:border-orange-300/50 focus:ring-2 focus:ring-orange-300/50',
        error: 'border-red-500/50 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/50',
        disabled: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

const InputField = memo(function InputField({
  label,
  name,
  type = 'text',
  value,
  placeholder,
  required = false,
  disabled = false,
  error,
  onChange,
  className,
  labelClassName,
  inputClassName,
}: InputFieldProps) {
  const id = React.useId();

  return (
    <div className={cn('space-y-2', className)}>
      <label
        htmlFor={id}
        className={cn(
          'block text-sm font-medium text-gray-200',
          labelClassName
        )}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            inputStyles({
              state: error ? 'error' : disabled ? 'disabled' : 'default'
            }),
            inputClassName
          )}
        />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
});

export default InputField;