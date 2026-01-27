# Estado Inicial del Sistema (BASELINE ANTES)

> **Fecha de Análisis**: 22 de Enero de 2026
> **Objetivo**: Documentar las vulnerabilidades de inconsistencia detectadas en el sistema antes de la implementación de defensas.

## 1. Resumen de Hallazgos Críticos

El sistema original operaba como dos islas independientes. El microservicio de Cuentas (NestJS) y el de Socios (Spring Boot) no compartían información, permitiendo operaciones financieramente peligrosas.

| Vulnerabilidad ID | Severidad | Descripción Breve | Impacto |
|-------------------|-----------|-------------------|---------|
| **VULN-001** | 🔴 CRÍTICA | **Eliminación de socios con cuentas activas** | Pérdida de integridad referencial, fondos sin titular identificable (cuentas huérfanas). |
| **VULN-002** | 🔴 CRÍTICA | **Creación de cuentas a socios inexistentes** | Posible fraude interno, creación de cuentas fantasma. |
| **VULN-003** | 🟠 ALTA | **Operaciones con socios inactivos** | Violación de reglas de negocio, uso de identidades suspendidas. |

---

## 2. Análisis Detallado de Vulnerabilidades

### VULN-001: Cuentas Huérfanas por Eliminación de Socio

**Componente Afectado:** Microservicio Socios (Spring Boot)
**Clase:** `SocioServiceImpl.java`
**Método:** `eliminarSocio(UUID id)`

#### Código Vulnerable (Estado Anterior)
```java
@Override
public void eliminarSocio(UUID id) {
    // 1. Busca si el socio existe localmente
    Socio socio = socioRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Socio no encontrado"));

    // 2. Elimina DIRECTAMENTE sin consultar productos externos
    socioRepository.deleteById(id); 
    
    // Problema: Si este UUID tenía cuentas en el otro microservicio,
    // esas cuentas ahora apuntan a un ID que ya no existe en la base de Socios.
}
```

#### Cómo Reproducir (Prueba de Concepto - Manual)
Para verificar esta vulnerabilidad, siga estos pasos:

1.  **Crear un socio temporal:**
    ```bash
    curl -X POST http://localhost:8080/api/socios \
      -H "Content-Type: application/json" \
      -d '{"nombres":"Víctima","apellidos":"Huérfana","identificacion":"1100110011","email":"victima@test.com","active":true,"tipoIdentificacion":"CEDULA"}'
    # Guardar el ID devuelto, ej: aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee
    ```

2.  **Crear una cuenta con saldo asociándola a ese ID:**
    ```bash
    curl -X POST http://localhost:3000/cuentas \
      -H "Content-Type: application/json" \
      -d '{"socioId":"aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee","numeroCuenta":"999999","saldo":5000,"tipoCuenta":"AHORROS"}'
    ```

3.  **Ejecutar la eliminación prohibida:**
    ```bash
    curl -X DELETE http://localhost:8080/api/socios/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee
    ```

**Resultado Observado (ANTES):** HTTP 204 No Content (Éxito).
**Resultado Esperado (CORRECTO):** HTTP 400/409 Error indicando que tiene cuentas pendientes.

---

### VULN-002: Cuentas Fantasma (Socio Inexistente)

**Componente Afectado:** Microservicio Cuentas (NestJS)
**Archivo:** `cuentas.service.ts`

#### Código Vulnerable (Estado Anterior)
```typescript
async crearCuenta(request: CuentaRequestDto) {
    // Solo validaba si el número de cuenta estaba repetido
    const cuentaExistente = await this.cuentaRepository.findOne({
      where: { numeroCuenta: request.numeroCuenta } 
    });
    if (cuentaExistente) throw new ConflictException(...);

    // ❌ ERROR: Confiaba ciegamente en el socioId proporcionado
    const cuenta = this.cuentaRepository.create({
      socioId: request.socioId, // Podía ser cualquier UUID inventado
      ...
    });
    return this.cuentaRepository.save(cuenta);
}
```

#### Cómo Reproducir (Manual)
1.  **Generar un UUID falso:** `00000000-0000-0000-0000-000000000000`
2.  **Enviar petición de creación:**
    ```bash
    curl -X POST http://localhost:3000/cuentas \
      -H "Content-Type: application/json" \
      -d '{
        "socioId": "00000000-0000-0000-0000-000000000000",
        "numeroCuenta": "FANTASMA01",
        "saldo": 1000000,
        "tipoCuenta": "CORRIENTE"
      }'
    ```

**Resultado Observado (ANTES):** HTTP 201 Created.
**Resultado Esperado (CORRECTO):** HTTP 404 Not Found (Socio no existe).

---

## 3. Métricas de Base (Antes de Correcciones)

- **Validaciones Cross-Service:** 0 de 3 implementadas.
- **Cobertura de Tests Unitarios:** 0%.
- **Resiliencia:** Nula. Si un servicio caía, no había manejo controlado de errores.
- **Integridad de Datos:** Comprometida por diseño.

Esta línea base justifica la necesidad urgente de las correcciones implementadas en la Fase de Desarrollo.
