import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            {label && <label className="text-sm font-medium text-gray-300">{label}</label>}
            <input
                className={`glass-input w-full ${className}`}
                {...props}
            />
        </div>
    );
};
