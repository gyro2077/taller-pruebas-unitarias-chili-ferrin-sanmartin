import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
    return (
        <div className={`glass-panel p-6 ${className}`}>
            {title && <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>}
            {children}
        </div>
    );
};
