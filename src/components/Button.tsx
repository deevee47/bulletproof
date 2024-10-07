'use client';

import React, { memo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'relative w-full font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-orange-300/50 shadow-lg hover:shadow-xl overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-500 text-gray-800',
        secondary: 'bg-gray-700 hover:bg-gray-800 text-white',
      },
      size: {
        default: 'py-3 px-4',
        sm: 'py-2 px-3 text-sm',
        lg: 'py-4 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
  };

const Button = memo(function Button({
  className,
  variant,
  size,
  isLoading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      ) : (
        <>
          <div className="absolute inset-0 bg-white/30 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          <span className="relative">{children}</span>
        </>
      )}
    </button>
  );
});

export default Button;