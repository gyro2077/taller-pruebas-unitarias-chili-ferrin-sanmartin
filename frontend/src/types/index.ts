export interface Socio {
    id?: string;
    nombres: string;
    apellidos: string;
    identificacion: string;
    email: string;
    telefono: string;
    direccion: string;
    tipoIdentificacion: 'CEDULA' | 'RUC' | 'PASAPORTE';
    activo: boolean;
}

export interface Cuenta {
    id?: string;
    numeroCuenta: string;
    saldo: number;
    tipoCuenta: 'AHORRO' | 'CORRIENTE';
    socioId: string;
    estado?: string;
}
