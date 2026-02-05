import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg animate-fade-in border ${type === 'success'
                ? 'bg-emerald-900/90 border-emerald-500 text-emerald-100'
                : 'bg-red-900/90 border-red-500 text-red-100'
            }`}>
            {type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <p className="text-sm font-medium">{message}</p>
            <button onClick={onClose} className="opacity-70 hover:opacity-100">
                <X size={18} />
            </button>
        </div>
    );
};
