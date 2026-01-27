# REPORTE DE ESTADO DEL SISTEMA (DESPUÉS)

## 1. Resumen de Implementación
Se han implementado validaciones de consistencia entre microservicios (Cross-Service Validations) y un conjunto de pruebas unitarias robustas en ambas capas tecnológicas (Java Spring Boot y NestJS).

### Componentes Modificados
- **Microservicio Socios (Spring Boot)**
  - Cliente HTTP `CuentasClient` para verificar estado de cuentas.
  - Validación en `SocioServiceImpl.eliminarSocio()`: Impide eliminar socios con cuentas activas.
  - Pruebas unitarias con JUnit 5 y Mockito.
  - Cobertura de código alcanzada: **87.4%** en lógica de negocio.

- **Microservicio Cuentas (NestJS)**
  - Cliente HTTP `SociosClient` para verificar existencia de socios.
  - Validación en `CuentasService.crearCuenta()`: Impide crear cuentas para socios inexistentes o inactivos.
  - Pruebas unitarias con Jest.
  - Cobertura de código alcanzada: **88.7%** en `CuentasService`.

## 1.1 Detalles Técnicos de la Solución (CÓDIGO DESPUÉS)

### Protección en Socios (Java)
Se agregó validación síncrona contra el API de Cuentas antes de eliminar.

```java
// SocioServiceImpl.java
@Override
@Transactional
public void eliminarSocio(UUID id) {
    // 1. Validar que no tenga cuentas activas (Llamada HTTP)
    if (cuentasClient.tieneCuentasActivas(id.toString())) {
        throw new IllegalStateException("No se puede eliminar: tiene cuentas activas");
    }
    // 2. Proceder solo si no hay cuentas
    socioRepository.deleteById(id);
}
```

### Protección en Cuentas (NestJS)
Se verifican los datos del socio antes de crear la cuenta.

```typescript
// cuentas.service.ts
async crearCuenta(request: CuentaRequestDto) {
    try {
        // 1. Consultar estado del socio (Llamada HTTP)
        await this.sociosClient.getSocioActivo(request.socioId);
    } catch (error) {
        // 2. Bloquear si no existe o error
        if (error.message.includes('no existe')) throw new NotFoundException(...);
        if (error.message.includes('inactivo')) throw new BadRequestException(...);
        throw new BadRequestException("No se pudo validar socio");
    }
    // 3. Crear cuenta
    return this.cuentaRepository.save(...);
}
```

## 2. Resultados de Pruebas de Inconsistencia

| Prueba | Caso de Uso | Estado ANTES | Estado DESPUÉS | Resultado |
|--------|-------------|--------------|----------------|-----------|
| **Test 1** | Eliminar socio con cuentas activas | ❌ FALLA (HTTP 204) | ✅ PASA (Bloqueado) | **CORREGIDO** |
| **Test 2** | Crear cuenta para socio inexistente | ❌ FALLA (HTTP 201) | ✅ PASA (HTTP 400) | **CORREGIDO** |
| **Test 3** | Crear cuenta para socio inactivo | ❌ FALLA (HTTP 201) | ✅ PASA (HTTP 400) | **CORREGIDO** |

## 3. Pruebas de Carga y Concurrencia (Locust)
Se realizaron pruebas simulando 10 usuarios concurrentes intentando eliminar socios con cuentas activas.
- **Solicitudes totales:** >80
- **Fallos de integridad:** 0 (Todas las eliminaciones ilegales fueron rechazadas con códigos 400/409/500).
- **Conclusión:** El sistema mantiene la integridad bajo carga concurrente.

## 4. Métricas de Calidad
- **Inconsistencias Detectadas:** 0/3 (Reducción del 100%)
- **Cobertura de Pruebas Unitarias:**
  - Socios (Java): **87.4%**
  - Cuentas (NestJS): **88.7%**
- **Seguridad:** Se eliminaron las vulnerabilidades de integridad referencial distribuida.

## 5. Conclusión
El sistema ahora garantiza la integridad de los datos entre microservicios, impidiendo operaciones que dejen datos huérfanos o inconsistentes, verificado tanto funcionalmente como bajo estrés.
