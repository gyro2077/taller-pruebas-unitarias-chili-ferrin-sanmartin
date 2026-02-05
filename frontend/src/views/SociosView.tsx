"use client";

import React, { useEffect, useState } from 'react';
import { ApiService } from '../services/api';
import { Socio } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Toast } from '../components/ui/Toast';
import { Trash2, UserPlus, RefreshCw } from 'lucide-react';

export default function SociosView() {
    const [socios, setSocios] = useState<Socio[]>([]);
    const [loading, setLoading] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [toast, setToast] = useState<{ msg: string, type: 'success' | 'error' } | null>(null);

    const showToast = (msg: string, type: 'success' | 'error') => setToast({ msg, type });

    const [formData, setFormData] = useState<Partial<Socio>>({
        nombres: '',
        apellidos: '',
        identificacion: '',
        email: '',
        telefono: '',
        direccion: '',
        tipoIdentificacion: 'CEDULA',
        activo: true
    });

    const fetchSocios = async () => {
        setLoading(true);
        try {
            const data = await ApiService.getSocios();
            setSocios(data);
        } catch (error) {
            console.error(error);
            showToast('Error cargando lista de socios', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSocios();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);
        try {
            await ApiService.createSocio(formData as Socio);
            await fetchSocios();
            setFormData({
                nombres: '',
                apellidos: '',
                identificacion: '',
                email: '',
                telefono: '',
                direccion: '',
                tipoIdentificacion: 'CEDULA',
                activo: true
            });
            showToast('Socio registrado exitosamente', 'success');
        } catch (error) {
            console.error(error);
            showToast(error instanceof Error ? error.message : 'Error registrando socio', 'error');
        } finally {
            setFormLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Seguro que desea eliminar este socio? Esta acción no se puede deshacer.')) return;
        try {
            await ApiService.deleteSocio(id);
            await fetchSocios();
            showToast('Socio eliminado correctamente', 'success');
        } catch (error) {
            console.error(error);
            const msg = error instanceof Error ? error.message : 'Error eliminando socio';
            // Blocking popup as requested
            alert(`Error: ${msg}`);
            showToast(msg, 'error');
        }
    };

    return (
        <div className="flex flex-col gap-6 animate-fade-in relative">
            {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Formulario */}
                <Card title="Nuevo Socio" className="lg:col-span-1 h-fit">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input
                            id="input-nombres"
                            label="Nombres"
                            value={formData.nombres}
                            onChange={e => setFormData({ ...formData, nombres: e.target.value })}
                            required
                            placeholder="Ej: Juan"
                        />
                        <Input
                            id="input-apellidos"
                            label="Apellidos"
                            value={formData.apellidos}
                            onChange={e => setFormData({ ...formData, apellidos: e.target.value })}
                            required
                            placeholder="Ej: Perez"
                        />
                        <Input
                            id="input-identificacion"
                            label="Identificación (10-13 dígitos)"
                            value={formData.identificacion}
                            onChange={e => setFormData({ ...formData, identificacion: e.target.value })}
                            required
                            pattern="[0-9]{10,13}"
                            title="Debe tener entre 10 y 13 dígitos numéricos"
                            placeholder="Ej: 1712345678"
                        />
                        <Input
                            id="input-email"
                            label="Correo Electrónico"
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            required
                            placeholder="ejemplo@email.com"
                        />
                        <Input
                            id="input-telefono"
                            label="Teléfono (9-10 dígitos)"
                            value={formData.telefono}
                            onChange={e => setFormData({ ...formData, telefono: e.target.value })}
                            required
                            pattern="[0-9]{9,10}"
                            title="Debe tener entre 9 y 10 dígitos numéricos"
                            placeholder="Ej: 0991234567"
                        />
                        <Input
                            id="input-direccion"
                            label="Dirección Domiciliaria"
                            value={formData.direccion}
                            onChange={e => setFormData({ ...formData, direccion: e.target.value })}
                            required
                            placeholder="Ej: Av. Amazonas y Colon"
                        />

                        <Button id="btn-submit-socio" type="submit" isLoading={formLoading} className="mt-2 w-full justify-center">
                            <UserPlus size={18} />
                            Registrar Socio
                        </Button>
                    </form>
                </Card>

                {/* Lista */}
                <Card title={`Listado de Socios (${socios.length})`} className="lg:col-span-2">
                    <div className="flex justify-end mb-4">
                        <Button variant="secondary" onClick={fetchSocios} disabled={loading}>
                            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                            Actualizar Lista
                        </Button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-gray-400 uppercase bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="px-4 py-3">ID / Doc</th>
                                    <th className="px-4 py-3">Nombre Completo</th>
                                    <th className="px-4 py-3">Contacto</th>
                                    <th className="px-4 py-3">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {socios.map((socio) => (
                                    <tr key={socio.id} className="border-b border-white/5 hover:bg-white/5 transition-colors" data-testid={`socio-item-${socio.id}`}>
                                        <td className="px-4 py-3">
                                            <div className="font-mono text-xs opacity-70 mb-1">{socio.id?.slice(0, 8)}...</div>
                                            <div className="font-bold text-white">{socio.identificacion}</div>
                                        </td>
                                        <td className="px-4 py-3 font-medium text-lg">{socio.nombres} {socio.apellidos}</td>
                                        <td className="px-4 py-3 text-sm opacity-80">
                                            <div>{socio.email}</div>
                                            <div className="text-xs text-gray-400">{socio.telefono}</div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                id={`btn-delete-socio-${socio.id}`}
                                                onClick={() => socio.id && handleDelete(socio.id)}
                                                className="py-1 px-2 text-xs"
                                                title="Eliminar Socio"
                                            >
                                                <Trash2 size={14} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {socios.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan={5} className="text-center py-8 opacity-50">No hay socios registrados en el sistema</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}
