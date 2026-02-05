import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'danger' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading,
    className = '',
    disabled,
    ...props
}) => {
    const baseClass = 'btn';
    const variantClass = variant === 'danger' ? 'btn-danger' : variant === 'secondary' ? 'glass-panel' : 'btn-primary';
    const sizeClass = size === 'sm' ? 'py-1 px-3 text-xs' : size === 'lg' ? 'py-4 px-8 text-lg' : ''; // Default handled by .btn class

    return (
        <button
            className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading && <Loader2 className="animate-spin" size={size === 'sm' ? 14 : 18} />}
            {children}
        </button>
    );
};
