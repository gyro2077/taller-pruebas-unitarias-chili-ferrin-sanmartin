# Guía de Ejecución y Pruebas - Taller de Integridad

Este documento proporciona las instrucciones detalladas para desplegar los microservicios, ejecutar las pruebas automatizadas y realizar la verificación manual funcional paso a paso.

## 1. Prerrequisitos del Sistema

Asegúrese de tener instalado:
- **Java 21** (OpenJDK)
- **Node.js 20+** y `pnpm` o `npm`
- **Docker** y **Docker Compose** (para PostgreSQL)
- **Python 3** (para Locust)
- `curl` y `jq` (para pruebas manuales)

---

## 2. Despliegue de Servicios

Siga este orden estricto para levantar el entorno:

### 2.1. Base de Datos
Desde la carpeta raíz del workspace:
```bash
cd /ruta/al/proyecto
# Levantar contenedor Postgres
docker run --name postgres-db -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=taller_db -p 5432:5432 -d postgres:15

# Esperar unos segundos y cargar datos iniciales (si aplica)
# O asegurarse que Hibernate/TypeORM creen las tablas automáticamente
```

### 2.2. Microservicio de Cuentas (NestJS - Puerto 3000)
```bash
cd microservicio-cuentas
pnpm install
# Levantar en modo desarrollo
pnpm start:dev
```
*Esperar mensaje: "Nest application successfully started"*

### 2.3. Microservicio de Socios (Spring Boot - Puerto 8080)
```bash
cd socios
# Permisos de ejecución
chmod +x mvnw
# Ejecutar
./mvnw spring-boot:run
```
*Esperar mensaje: "Started SociosApplication in ... seconds"*

---

## 3. Verificación Manual Paso a Paso

Use estos comandos para probar la seguridad del sistema.

### Escenario A: Flujo Correcto (Happy Path)

**1. Crear un Socio válido:**
```bash
curl -s -X POST http://localhost:8080/api/socios \
  -H "Content-Type: application/json" \
  -d '{
    "nombres": "Juan", "apellidos": "Pérez", "identificacion": "1700000001",
    "email": "juan@test.com", "telefono": "0991234567", "direccion": "Quito",
    "tipoIdentificacion": "CEDULA", "activo": true
  }' | jq '.'
```
*Anote el ID generado (ej. `aaaa-bbbb...`)*

**2. Crear Cuenta para ese Socio:**
```bash
# Reemplace SOCIO_ID con el ID obtenido
curl -s -X POST http://localhost:3000/cuentas \
  -H "Content-Type: application/json" \
  -d '{
    "socioId": "REPLACE_ME_SOCIO_ID",
    "numeroCuenta": "CTA001", "saldo": 100.00, "tipoCuenta": "AHORROS"
  }' | jq '.'
```
*Resultado: HTTP 201 Created*

---

### Escenario B: Bloqueo de Inconsistencias (Defensas Activas)

**1. Intentar eliminar el socio con cuenta activa (Debe fallar):**
```bash
curl -i -X DELETE http://localhost:8080/api/socios/REPLACE_ME_SOCIO_ID
```
*Resultado Esperado:* **HTTP 409 o 500** (Error). Mensaje: *"No se puede eliminar el socio porque tiene cuentas activas"*

**2. Intentar crear cuenta para un socio inexistente (Debe fallar):**
```bash
curl -i -X POST http://localhost:3000/cuentas \
  -H "Content-Type: application/json" \
  -d '{
    "socioId": "00000000-0000-0000-0000-000000000000",
    "numeroCuenta": "FRAUDE01", "saldo": 9999, "tipoCuenta": "CORRIENTE"
  }'
```
*Resultado Esperado:* **HTTP 404 Not Found**. Mensaje: *"Socio no existe"*

---

## 4. Ejecución de Pruebas Automatizadas

### 4.1. Pruebas Unitarias Socios (Java)
```bash
cd socios
./mvnw test
# Para reporte de cobertura:
./mvnw test jacoco:report
# Ver reporte en: socios/target/site/jacoco/index.html
```

### 4.2. Pruebas Unitarias Cuentas (NestJS)
```bash
cd microservicio-cuentas
pnpm test
# Para reporte de cobertura:
pnpm test -- --coverage
```

### 4.3. Script Automatizado de Validación
Hemos preparado un script que ejecuta todos los casos de prueba automáticamente:

```bash
cd reportes
chmod +x test_inconsistencias.sh
./test_inconsistencias.sh
```
*Este script imprimirá ✅ PASA o ❌ FALLA para cada escenario.*

---

## 5. Pruebas de Carga (Locust)

Para verificar que las validaciones soportan concurrencia:

1.  Activar entorno Python (si usa venv):
    ```bash
    source venv/bin/activate
    ```
2.  Ejecutar Locust (modo headless):
    ```bash
    locust -f locustfile.py --headless -u 10 -r 2 -t 30s --host http://localhost:8080
    ```
3.  **Interpretación:** Busque "Failures: 0". Si hay 0 fallos, significa que **ninguna** eliminación ilegal tuvo éxito (todas fueron bloqueadas correctamente por el sistema).

---

## 6. Solución de Problemas Comunes

- **Error conexión rechazada:** Asegúrese de que ambos servicios estén levantados en los puertos correctos (8080 y 3000).
- **Base de datos bloqueada:** Reinicie el contenedor de Docker (`docker restart postgres-db`).
- **Conflictos de puertos:** Verifique que no tenga otros servicios corriendo en 3000 u 8080.
