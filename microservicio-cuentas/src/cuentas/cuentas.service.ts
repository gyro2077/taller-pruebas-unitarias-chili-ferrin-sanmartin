import { Injectable, NotFoundException, ConflictException, Inject, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cuenta } from './entities/cuenta.entity';
import { CuentaRequestDto } from './dto/cuenta-request.dto';
import { CuentaResponseDto } from './dto/cuenta-response.dto';
import { SociosClient } from '../clients/socios.client';

@Injectable()
export class CuentasService {
  private readonly logger = new Logger(CuentasService.name);

  constructor(
    @InjectRepository(Cuenta)
    private readonly cuentaRepository: Repository<Cuenta>,
    private readonly sociosClient: SociosClient,
  ) { }

  async crearCuenta(request: CuentaRequestDto): Promise<CuentaResponseDto> {
    // ✅ VALIDACIÓN CROSS-SERVICE: Verificar que el socio existe y está activo
    this.logger.log(`Validando socio ${request.socioId} antes de crear cuenta...`);

    try {
      await this.sociosClient.getSocioActivo(request.socioId);
      this.logger.log(`Socio ${request.socioId} validado exitosamente`);
    } catch (error) {
      this.logger.warn(`Error al validar socio ${request.socioId}: ${error.message}`);

      if (error.message.includes('no existe')) {
        throw new NotFoundException(
          `No se puede crear la cuenta porque el socio ${request.socioId} no existe`
        );
      }

      if (error.message.includes('inactivo')) {
        throw new BadRequestException(
          `No se puede crear la cuenta porque el socio ${request.socioId} está inactivo`
        );
      }

      // Si el servicio de Socios no está disponible, no permitir la creación por seguridad
      throw new BadRequestException(
        'No se puede crear la cuenta en este momento porque no se pudo validar ' +
        'la existencia del socio. Por favor, intente nuevamente más tarde.'
      );
    }

    // Verificar número de cuenta único
    const cuentaExistente = await this.cuentaRepository.findOne({
      where: { numeroCuenta: request.numeroCuenta, activo: true }
    });

    if (cuentaExistente) {
      throw new ConflictException('El número de cuenta ya existe');
    }

    const cuenta = this.cuentaRepository.create({
      socioId: request.socioId,
      numeroCuenta: request.numeroCuenta,
      saldo: request.saldo,
      tipoCuenta: request.tipoCuenta,
      estado: 'ACTIVA',
      activo: true,
    });

    const cuentaGuardada = await this.cuentaRepository.save(cuenta);
    this.logger.log(`Cuenta ${cuentaGuardada.id} creada exitosamente para socio ${request.socioId}`);
    return this.mapToResponse(cuentaGuardada);
  }

  async actualizarCuenta(id: string, request: CuentaRequestDto): Promise<CuentaResponseDto> {
    const cuenta = await this.cuentaRepository.findOne({
      where: { id, activo: true }
    });

    if (!cuenta) {
      throw new NotFoundException('Cuenta no encontrada');
    }

    // Verificar si el nuevo número de cuenta ya existe (excluyendo la actual)
    if (request.numeroCuenta !== cuenta.numeroCuenta) {
      const cuentaConMismoNumero = await this.cuentaRepository.findOne({
        where: { numeroCuenta: request.numeroCuenta, activo: true }
      });

      if (cuentaConMismoNumero) {
        throw new ConflictException('El número de cuenta ya está en uso');
      }
    }

    cuenta.socioId = request.socioId;
    cuenta.numeroCuenta = request.numeroCuenta;
    cuenta.tipoCuenta = request.tipoCuenta;

    const cuentaActualizada = await this.cuentaRepository.save(cuenta);
    return this.mapToResponse(cuentaActualizada);
  }

  async obtenerCuenta(id: string): Promise<CuentaResponseDto> {
    const cuenta = await this.cuentaRepository.findOne({
      where: { id, activo: true }
    });

    if (!cuenta) {
      throw new NotFoundException('Cuenta no encontrada');
    }

    return this.mapToResponse(cuenta);
  }

  async obtenerCuentasPorSocio(socioId: string): Promise<CuentaResponseDto[]> {
    const cuentas = await this.cuentaRepository.find({
      where: { socioId, activo: true },
      order: { fechaCreacion: 'DESC' }
    });

    return cuentas.map(cuenta => this.mapToResponse(cuenta));
  }

  async obtenerTodasCuentas(): Promise<CuentaResponseDto[]> {
    const cuentas = await this.cuentaRepository.find({
      where: { activo: true, estado: 'ACTIVA' }
    });

    return cuentas.map(cuenta => this.mapToResponse(cuenta));
  }

  async eliminarCuenta(id: string): Promise<void> {
    const cuenta = await this.cuentaRepository.findOne({
      where: { id, activo: true }
    });

    if (!cuenta) {
      throw new NotFoundException('Cuenta no encontrada');
    }

    // Eliminación lógica
    cuenta.activo = false;
    cuenta.estado = 'CANCELADA';
    await this.cuentaRepository.save(cuenta);
  }

  async realizarRetiro(id: string, monto: number): Promise<CuentaResponseDto> {
    const cuenta = await this.cuentaRepository.findOne({
      where: { id, activo: true }
    });

    if (!cuenta) {
      throw new NotFoundException('Cuenta no encontrada');
    }

    if (cuenta.estado !== 'ACTIVA') {
      throw new ConflictException('La cuenta no está activa');
    }

    if (cuenta.saldo < monto) {
      throw new ConflictException('Saldo insuficiente');
    }

    cuenta.saldo -= monto;
    const cuentaActualizada = await this.cuentaRepository.save(cuenta);
    return this.mapToResponse(cuentaActualizada);
  }

  async realizarDeposito(id: string, monto: number): Promise<CuentaResponseDto> {
    const cuenta = await this.cuentaRepository.findOne({
      where: { id, activo: true }
    });

    if (!cuenta) {
      throw new NotFoundException('Cuenta no encontrada');
    }

    if (cuenta.estado !== 'ACTIVA') {
      throw new ConflictException('La cuenta no está activa');
    }

    cuenta.saldo += monto;
    const cuentaActualizada = await this.cuentaRepository.save(cuenta);
    return this.mapToResponse(cuentaActualizada);
  }

  private mapToResponse(cuenta: Cuenta): CuentaResponseDto {
    return {
      id: cuenta.id,
      socioId: cuenta.socioId,
      numeroCuenta: cuenta.numeroCuenta,
      saldo: parseFloat(cuenta.saldo.toString()),
      estado: cuenta.estado,
      tipoCuenta: cuenta.tipoCuenta,
      fechaCreacion: cuenta.fechaCreacion,
      fechaActualizacion: cuenta.fechaActualizacion,
    };
  }
}