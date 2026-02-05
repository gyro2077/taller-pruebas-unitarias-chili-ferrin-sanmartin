import React from 'react';
import { LayoutDashboard, Users, CreditCard } from 'lucide-react';

interface NavbarProps {
    activeTab: 'socios' | 'cuentas';
    onTabChange: (tab: 'socios' | 'cuentas') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
    return (
        <nav className="glass-panel mb-8 p-4 flex gap-4 items-center">
            <div className="flex items-center gap-2 mr-8">
                <LayoutDashboard className="text-primary" />
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    Core Bancario
                </h1>
            </div>

            <button
                onClick={() => onTabChange('socios')}
                className={`btn ${activeTab === 'socios' ? 'btn-primary' : 'hover:bg-white/10'}`}
            >
                <Users size={18} />
                Socios
            </button>

            <button
                onClick={() => onTabChange('cuentas')}
                className={`btn ${activeTab === 'cuentas' ? 'btn-primary' : 'hover:bg-white/10'}`}
            >
                <CreditCard size={18} />
                Cuentas
            </button>
        </nav>
    );
};
