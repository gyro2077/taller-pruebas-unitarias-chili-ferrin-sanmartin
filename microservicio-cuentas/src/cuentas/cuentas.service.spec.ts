import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { CuentasService } from './cuentas.service';
import { Cuenta } from './entities/cuenta.entity';
import { SociosClient } from '../clients/socios.client';
import { CuentaRequestDto } from './dto/cuenta-request.dto';
import { SocioDto } from '../clients/socios.client';

describe('CuentasService', () => {
    let service: CuentasService;
    let repository: Repository<Cuenta>;
    let sociosClient: SociosClient;

    // Mock data
    const mockSocioDto: SocioDto = {
        id: 'socio-123',
        nombres: 'Juan',
        apellidos: 'Perez',
        identificacion: '1712345678',
        email: 'test@test.com',
        tipoIdentificacion: 'CEDULA',
        activo: true,
        fechaCreacion: new Date(),
    };

    const mockCuenta: Cuenta = {
        id: 'cuenta-123',
        socioId: 'socio-123',
        numeroCuenta: 'CUENTA-001',
        saldo: 100,
        estado: 'ACTIVA',
        tipoCuenta: 'AHORRO',
        activo: true,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
        generateId: () => { },
    };

    const mockCuentaRequest: CuentaRequestDto = {
        socioId: 'socio-123',
        numeroCuenta: 'CUENTA-001',
        saldo: 100,
        tipoCuenta: 'AHORRO',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CuentasService,
                {
                    provide: getRepositoryToken(Cuenta),
                    useValue: {
                        create: jest.fn().mockReturnValue(mockCuenta),
                        save: jest.fn().mockResolvedValue(mockCuenta),
                        findOne: jest.fn(),
                        find: jest.fn(),
                    },
                },
                {
                    provide: SociosClient,
                    useValue: {
                        getSocioActivo: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<CuentasService>(CuentasService);
        repository = module.get<Repository<Cuenta>>(getRepositoryToken(Cuenta));
        sociosClient = module.get<SociosClient>(SociosClient);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('crearCuenta', () => {
        it('should create a account successfully when socio is active', async () => {
            // Arrange
            jest.spyOn(sociosClient, 'getSocioActivo').mockResolvedValue(mockSocioDto);
            jest.spyOn(repository, 'findOne').mockResolvedValue(null); // No existe cuenta con ese número

            // Act
            const result = await service.crearCuenta(mockCuentaRequest);

            // Assert
            expect(result).toBeDefined();
            expect(result.socioId).toBe(mockCuenta.socioId);
            expect(sociosClient.getSocioActivo).toHaveBeenCalledWith(mockCuentaRequest.socioId);
            expect(repository.save).toHaveBeenCalled();
        });

        it('should throw NotFoundException when socio does not exist', async () => {
            // Arrange
            jest.spyOn(sociosClient, 'getSocioActivo').mockRejectedValue(new Error('El socio no existe'));

            // Act & Assert
            await expect(service.crearCuenta(mockCuentaRequest)).rejects.toThrow(NotFoundException);
        });

        it('should throw BadRequestException when socio is inactive', async () => {
            // Arrange
            jest.spyOn(sociosClient, 'getSocioActivo').mockRejectedValue(new Error('está inactivo'));

            // Act & Assert
            await expect(service.crearCuenta(mockCuentaRequest)).rejects.toThrow(BadRequestException);
        });

        it('should throw ConflictException when account number already exists', async () => {
            // Arrange
            jest.spyOn(sociosClient, 'getSocioActivo').mockResolvedValue(mockSocioDto);
            jest.spyOn(repository, 'findOne').mockResolvedValue(mockCuenta);

            // Act & Assert
            await expect(service.crearCuenta(mockCuentaRequest)).rejects.toThrow(ConflictException);
        });
    });

    describe('actualizarCuenta', () => {
        it('should update account successfully', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(Object.assign(new Cuenta(), { ...mockCuenta }));
            jest.spyOn(repository, 'save').mockResolvedValue(Object.assign(new Cuenta(), { ...mockCuenta, saldo: 200 }));

            const result = await service.actualizarCuenta('cuenta-123', { ...mockCuentaRequest, saldo: 200 });

            expect(result.saldo).toBe(200);
        });

        it('should throw NotFoundException when account not found', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);

            await expect(service.actualizarCuenta('cuenta-999', mockCuentaRequest)).rejects.toThrow(NotFoundException);
        });
    });

    describe('eliminarCuenta', () => {
        it('should soft delete account', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(Object.assign(new Cuenta(), { ...mockCuenta }));

            await service.eliminarCuenta('cuenta-123');

            expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({
                activo: false,
                estado: 'CANCELADA'
            }));
        });
    });

    describe('realizarRetiro', () => {
        it('should process withdrawal successfully', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(Object.assign(new Cuenta(), { ...mockCuenta })); // Devolver copia
            jest.spyOn(repository, 'save').mockResolvedValue(Object.assign(new Cuenta(), { ...mockCuenta, saldo: 50 }));

            const result = await service.realizarRetiro('cuenta-123', 50);

            expect(result.saldo).toBe(50);
        });

        it('should fail if insufficient funds', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(Object.assign(new Cuenta(), { ...mockCuenta })); // Devolver copia

            await expect(service.realizarRetiro('cuenta-123', 200)).rejects.toThrow(ConflictException);
        });
    });
    describe('realizarDepositos', () => {
        it('should process deposit successfully', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(Object.assign(new Cuenta(), { ...mockCuenta }));
            jest.spyOn(repository, 'save').mockResolvedValue(Object.assign(new Cuenta(), { ...mockCuenta, saldo: 200 }));

            const result = await service.realizarDeposito('cuenta-123', 100);

            expect(result.saldo).toBe(200);
        });

        it('should throw ConflictException if account not active', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(Object.assign(new Cuenta(), { ...mockCuenta, estado: 'SUSPENDIDA' }));

            await expect(service.realizarDeposito('cuenta-123', 100)).rejects.toThrow(ConflictException);
        });
    });

    describe('lecturas', () => {
        it('should return account by ID', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(Object.assign(new Cuenta(), { ...mockCuenta }));

            const result = await service.obtenerCuenta('cuenta-123');
            expect(result.id).toBe(mockCuenta.id);
        });

        it('should return accounts by socio', async () => {
            jest.spyOn(repository, 'find').mockResolvedValue([Object.assign(new Cuenta(), { ...mockCuenta })]);

            const result = await service.obtenerCuentasPorSocio('socio-123');
            expect(result).toHaveLength(1);
        });

        it('should return all active accounts', async () => {
            jest.spyOn(repository, 'find').mockResolvedValue([Object.assign(new Cuenta(), { ...mockCuenta })]);

            const result = await service.obtenerTodasCuentas();
            expect(result).toHaveLength(1);
        });
    });

    describe('resiliencia', () => {
        it('should handle Socios Service general failure', async () => {
            jest.spyOn(sociosClient, 'getSocioActivo').mockRejectedValue(new Error('Connection refused'));

            await expect(service.crearCuenta(mockCuentaRequest)).rejects.toThrow(BadRequestException);
        });
    });
});
