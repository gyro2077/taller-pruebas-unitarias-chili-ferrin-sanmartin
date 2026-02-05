import { Socio, Cuenta } from '../types';

const SOCIOS_API = '/api/socios';
const CUENTAS_API = '/cuentas'; // Direct mapping via proxy

export const ApiService = {
    // Socios
    async getSocios(): Promise<Socio[]> {
        const res = await fetch(SOCIOS_API, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch socios');
        return res.json();
    },

    async createSocio(socio: Socio): Promise<Socio> {
        const res = await fetch(SOCIOS_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(socio),
            cache: 'no-store'
        });
        if (!res.ok) throw new Error('Failed to create socio');
        return res.json();
    },

    async deleteSocio(id: string): Promise<void> {
        const res = await fetch(`${SOCIOS_API}/${id}`, { method: 'DELETE', cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to delete socio');
    },

    // Cuentas
    async getCuentas(): Promise<Cuenta[]> {
        const res = await fetch(CUENTAS_API, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch cuentas');
        return res.json();
    },

    async getCuentasBySocio(socioId: string): Promise<Cuenta[]> {
        const res = await fetch(`${CUENTAS_API}/socio/${socioId}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch user accounts');
        return res.json();
    },

    async createCuenta(cuenta: Cuenta): Promise<Cuenta> {
        const res = await fetch(CUENTAS_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cuenta),
            cache: 'no-store'
        });
        if (!res.ok) throw new Error('Failed to create cuenta');
        return res.json();
    },

    async deleteCuenta(id: string): Promise<void> {
        const res = await fetch(`${CUENTAS_API}/${id}`, { method: 'DELETE', cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to delete cuenta');
    },

    async transaccion(id: string, tipo: 'deposito' | 'retiro', monto: number): Promise<Cuenta> {
        const res = await fetch(`${CUENTAS_API}/${id}/${tipo}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ monto }),
            cache: 'no-store'
        });
        if (!res.ok) throw new Error(`Failed to perform ${tipo}`);
        return res.json();
    }
};
