import React from 'react';

export interface ButtonProps {
  label: string;
  extraClass?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, extraClass = '', onClick }) => {
  return (
    <button className={`poc-btn ${extraClass}`} onClick={onClick}>
      {label}
    </button>
  );
};
