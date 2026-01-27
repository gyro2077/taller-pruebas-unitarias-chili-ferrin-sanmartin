import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CuentasController } from './cuentas.controller';
import { CuentasService } from './cuentas.service';
import { Cuenta } from './entities/cuenta.entity';
import { SociosClient } from '../clients/socios.client';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cuenta]),
    HttpModule,
    ConfigModule,
  ],
  controllers: [CuentasController],
  providers: [CuentasService, SociosClient],
  exports: [CuentasService],
})
export class CuentasModule { }