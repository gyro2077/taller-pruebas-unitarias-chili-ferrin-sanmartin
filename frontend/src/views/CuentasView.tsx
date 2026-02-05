"use client";

import React, { useEffect, useState } from 'react';
import { ApiService } from '../services/api';
import { Cuenta, Socio } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Toast } from '../components/ui/Toast';
import { Trash2, PlusCircle, RefreshCw, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export default function CuentasView() {
    const [cuentas, setCuentas] = useState<Cuenta[]>([]);
    const [socios, setSocios] = useState<Socio[]>([]);
    const [loading, setLoading] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [toast, setToast] = useState<{ msg: string, type: 'success' | 'error' } | null>(null);

    const showToast = (msg: string, type: 'success' | 'error') => setToast({ msg, type });

    // Create Form
    const [numeroCuenta, setNumeroCuenta] = useState('');
    const [socioId, setSocioId] = useState('');
    const [tipoCuenta, setTipoCuenta] = useState<'AHORRO' | 'CORRIENTE'>('AHORRO');
    const [saldo, setSaldo] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            const [cuentasData, sociosData] = await Promise.all([
                ApiService.getCuentas(),
                ApiService.getSocios()
            ]);
            setCuentas(cuentasData);
            setSocios(sociosData);
        } catch (error) {
            console.error(error);
            showToast('Error conectando con el servidor', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);
        try {
            if (!socioId) {
                showToast('Debes seleccionar un socio', 'error');
                return;
            }

            const payload: Cuenta = {
                numeroCuenta,
                socioId,
                tipoCuenta,
                saldo: parseFloat(saldo) || 0
            };

            await ApiService.createCuenta(payload);
            await fetchData();
            setNumeroCuenta('');
            setSaldo('');
            setSocioId('');
            showToast('Cuenta creada exitosamente', 'success');
        } catch (error) {
            console.error(error);
            const msg = error instanceof Error ? error.message : 'Error desconocido';
            showToast(msg, 'error');
        } finally {
            setFormLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Está seguro de eliminar esta cuenta?')) return;
        try {
            await ApiService.deleteCuenta(id);
            fetchData();
            showToast('Cuenta eliminada', 'success');
        } catch (e) {
            showToast(e instanceof Error ? e.message : 'Error eliminando', 'error');
        }
    };

    const handleTransaccion = async (id: string, tipo: 'deposito' | 'retiro') => {
        const montoStr = prompt(`Ingrese monto para ${tipo}:`);
        if (!montoStr) return;
        const monto = parseFloat(montoStr);
        if (isNaN(monto) || monto <= 0) {
            showToast('Monto inválido. Debe ser mayor a 0.', 'error');
            return;
        }

        try {
            await ApiService.transaccion(id, tipo, monto);
            await fetchData(); // Fix: Wait for data refresh
            showToast(`Transacción (${tipo}) exitosa`, 'success');
        } catch (e) {
            showToast(e instanceof Error ? e.message : 'Error en transacción', 'error');
        }
    };

    const getSocioName = (id: string) => {
        const s = socios.find(s => s.id === id);
        return s ? `${s.nombres} ${s.apellidos}` : id;
    };

    return (
        <div className="flex flex-col gap-6 animate-fade-in relative">
            {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card title="Nueva Cuenta" className="lg:col-span-1 h-fit">
                    <form onSubmit={handleCreate} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-300">Socio Propietario</label>
                            <select
                                className="glass-input"
                                id="select-socio"
                                value={socioId}
                                onChange={(e) => setSocioId(e.target.value)}
                                required
                            >
                                <option value="" className="text-black">Seleccione un Socio...</option>
                                {socios.map(s => (
                                    <option key={s.id} value={s.id} className="text-black">
                                        {s.nombres} {s.apellidos} - {s.identificacion}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Input
                            id="input-numero-cuenta"
                            label="Número de Cuenta (Único)"
                            value={numeroCuenta}
                            onChange={(e) => setNumeroCuenta(e.target.value)}
                            required
                            placeholder="Ej: CTA-1001"
                        />

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-300">Tipo de Cuenta</label>
                            <select
                                className="glass-input"
                                id="select-tipo-cuenta"
                                value={tipoCuenta}
                                onChange={(e) => setTipoCuenta(e.target.value as any)}
                            >
                                <option value="AHORRO" className="text-black">Ahorro</option>
                                <option value="CORRIENTE" className="text-black">Corriente</option>
                            </select>
                        </div>

                        <Input
                            id="input-saldo-inicial"
                            label="Saldo Inicial ($)"
                            type="number"
                            value={saldo}
                            onChange={(e) => setSaldo(e.target.value)}
                            min="0"
                            step="0.01"
                            required
                            placeholder="0.00"
                        />

                        <Button id="btn-create-cuenta" type="submit" isLoading={formLoading} className="mt-2 w-full justify-center">
                            <PlusCircle size={18} /> Crear Cuenta
                        </Button>
                    </form>
                </Card>

                <Card title={`Listado de Cuentas (${cuentas.length})`} className="lg:col-span-2">
                    <div className="flex justify-end mb-4">
                        <Button variant="secondary" onClick={fetchData} disabled={loading}>
                            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Actualizar Datos
                        </Button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-gray-400 uppercase bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="px-4 py-3">Número</th>
                                    <th className="px-4 py-3">Socio</th>
                                    <th className="px-4 py-3 text-right">Saldo</th>
                                    <th className="px-4 py-3 text-center">Tipo</th>
                                    <th className="px-4 py-3 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cuentas.map(c => (
                                    <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 transition-colors" data-testid={`cuenta-item-${c.id}`}>
                                        <td className="px-4 py-3 font-mono font-bold text-primary">{c.numeroCuenta}</td>
                                        <td className="px-4 py-3">{getSocioName(c.socioId)}</td>
                                        <td className="px-4 py-3 text-right font-mono text-emerald-400">${c.saldo.toFixed(2)}</td>
                                        <td className="px-4 py-3 text-center">
                                            <span className={`px-2 py-1 rounded text-xs ${c.tipoCuenta === 'AHORRO' ? 'bg-blue-500/20 text-blue-300' : 'bg-orange-500/20 text-orange-300'}`}>
                                                {c.tipoCuenta}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 flex justify-center gap-2">
                                            <Button
                                                size="sm"
                                                className="bg-green-600 hover:bg-green-700"
                                                onClick={() => c.id && handleTransaccion(c.id, 'deposito')}
                                                title="Depositar Fondos"
                                                id={`btn-deposito-${c.id}`}
                                            >
                                                <ArrowUpCircle size={14} />
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="bg-amber-600 hover:bg-amber-700"
                                                onClick={() => c.id && handleTransaccion(c.id, 'retiro')}
                                                title="Retirar Fondos"
                                                id={`btn-retiro-${c.id}`}
                                            >
                                                <ArrowDownCircle size={14} />
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => c.id && handleDelete(c.id)}
                                                title="Eliminar Cuenta"
                                                id={`btn-delete-cuenta-${c.id}`}
                                            >
                                                <Trash2 size={14} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {cuentas.length === 0 && !loading && (
                                    <tr><td colSpan={5} className="text-center py-8 opacity-50">No hay cuentas registradas</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}
