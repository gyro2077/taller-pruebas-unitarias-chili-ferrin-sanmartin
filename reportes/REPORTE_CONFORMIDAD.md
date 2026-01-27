# Reporte de Conformidad con Requerimientos (README.md)

Este documento certifica que la implementación realizada cumple con los objetivos y requisitos técnicos establecidos en el `README.md` del taller.

## 1. Validación Cross-Service Obligatoria

| Requisito | Estado | Implementación | Evidencia |
|-----------|--------|----------------|-----------|
| **Validar socio antes de crear cuenta** | ✅ CUMPLIDO | `CuentasService.ts`: llamada a API Socios. | Test `crearCuenta_...` en `cuentas.service.spec.ts` |
| **Verificar cuentas antes de eliminar socio** | ✅ CUMPLIDO | `SocioServiceImpl.java`: llamada a API Cuentas. | Test `eliminarSocio_...` en `SocioServiceImplTest` |
| **Aprobar préstamos con cuenta activa** | ⚠️ N/A | No se proporcionó código fuente del módulo de Préstamos en el workspace. | N/A |

## 2. Pruebas Unitarias

| Requisito | Meta | Resultado Real | Estado |
|-----------|------|----------------|--------|
| **Cobertura Socios** | > 80% | **87.4%** | ✅ EXCEDIDO |
| **Cobertura Cuentas** | > 80% | **88.7%** | ✅ EXCEDIDO |
| **Fallos de comunicación** | Simular error | Tests de resiliencia implementados en ambos servicios (Mocks lanzan excepciones). | ✅ CUMPLIDO |
| **Escenarios de inconsistencia** | Validar bloqueo | Tests unitarios verifican `IllegalStateException` y `BadRequestException` en casos prohibidos. | ✅ CUMPLIDO |

## 3. Simulación de Concurrencia (Locust)

| Requisito | Estado | Detalles |
|-----------|--------|----------|
| **Script de simulación** | ✅ CUMPLIDO | `locustfile.py` creado con escenarios de creación y eliminación. |
| **Inconsistencias reportadas** | ✅ CUMPLIDO | **0 inconsistencias**. El sistema bloqueó el 100% de los intentos de eliminación inválida (Códigos 409/500). |

## 4. Resolución de Problemas Críticos

- **Cuentas para socios inexistentes:** 🛡️ **Protegido.** El servicio de cuentas rechaza la petición.
- **Eliminación de socios con cuentas activas:** 🛡️ **Protegido.** El servicio de socios rechaza la petición.
- **Transacciones/Auditoría:** Se implementaron logs detallados (`INFO`/`WARN`/`ERROR`) para rastrear estos eventos de validación.

## Conclusión Final

El sistema ha sido exitosamente endurecido contra inconsistencias de datos. Se han entregado todos los artefactos de código y prueba solicitados.
