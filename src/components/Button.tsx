import React from 'react';

type ButtonProps = {
  type?: 'submit' | 'button';
  variant: 'primary' | 'secondary';
  onClick?: () => void;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ type = 'button', variant, onClick, children }) => {
  const primaryStyles = 'bg-gradient-to-r from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-500 text-gray-800';
  const secondaryStyles = 'bg-gray-700 hover:bg-gray-800 text-white';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`relative w-full font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-orange-300/50 shadow-lg hover:shadow-xl overflow-hidden group ${
        variant === 'primary' ? primaryStyles : secondaryStyles
      }`}
    >
      <div className="absolute inset-0 bg-white/30 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
      <span className="relative">{children}</span>
    </button>
  );
};

export default Button;
