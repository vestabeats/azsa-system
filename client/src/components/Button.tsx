import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  label: string;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, type = 'button', label, className, onClick = () => {} }) => {
  return (
    <button
      type={type}
      className={clsx("px-3 py-2 outline-none rounded-full", className)}
      onClick={onClick}
    >
      <span>{label}</span>
      {icon && icon}
    </button>
  );
}

export default Button;
