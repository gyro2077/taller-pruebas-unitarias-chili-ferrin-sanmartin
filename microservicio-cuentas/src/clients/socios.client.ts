import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

export interface SocioDto {
    id: string;
    nombres: string;
    apellidos: string;
    tipoIdentificacion: string;
    identificacion: string;
    email: string;
    telefono?: string;
    direccion?: string;
    activo: boolean;
    fechaCreacion: Date;
    fechaActualizacion?: Date;
}

/**
 * Cliente HTTP para comunicación con el microservicio de Socios
 */
@Injectable()
export class SociosClient {
    private readonly logger = new Logger(SociosClient.name);
    private readonly sociosServiceUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.sociosServiceUrl = this.configService.get<string>(
            'SOCIOS_SERVICE_URL',
            'http://localhost:8080',
        );
    }

    /**
     * Obtiene un socio por su ID y verifica si está activo
     * @param socioId UUID del socio
     * @returns Socio si existe y está activo
     * @throws Error si el socio no existe, está inactivo o el servicio no responde
     */
    async getSocioActivo(socioId: string): Promise<SocioDto> {
        const url = `${this.sociosServiceUrl}/api/socios/${socioId}`;

        try {
            this.logger.log(`Consultando socio activo: ${socioId}`);

            const response = await firstValueFrom(
                this.httpService.get<SocioDto>(url, {
                    timeout: 5000,
                }),
            );

            const socio = response.data;

            if (!socio.activo) {
                this.logger.warn(`Socio ${socioId} existe pero está INACTIVO`);
                throw new Error(`El socio ${socioId} está inactivo`);
            }

            this.logger.log(`Socio ${socioId} encontrado y activo`);
            return socio;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) {
                    this.logger.warn(`Socio ${socioId} no encontrado`);
                    throw new Error(`El socio ${socioId} no existe`);
                }

                if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
                    this.logger.error(
                        `Error de conexión con microservicio de Socios: ${error.message}`,
                    );
                    throw new Error(
                        'El microservicio de Socios no está disponible. No se puede validar la existencia del socio.',
                    );
                }
            }

            // Re-lanzar errores de negocio
            if (error.message.includes('inactivo') || error.message.includes('no existe')) {
                throw error;
            }

            this.logger.error(
                `Error inesperado al consultar socio ${socioId}: ${error.message}`,
            );
            throw new Error(
                `Error al comunicarse con el microservicio de Socios: ${error.message}`,
            );
        }
    }

    /**
     * Verifica si un socio existe y está activo
     * @param socioId UUID del socio
     * @returns true si el socio existe y está activo, false en caso contrario
     */
    async verificarSocioExisteYActivo(socioId: string): Promise<boolean> {
        try {
            await this.getSocioActivo(socioId);
            return true;
        } catch (error) {
            return false;
        }
    }
}
