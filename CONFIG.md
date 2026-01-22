# Configuración y Verificación del Microservicio Socios

## 🎯 Objetivo
Configurar y verificar el correcto funcionamiento del microservicio de socios de la Cooperativa "Futuro Seguro".

## ✅ Tareas Completadas

### 1. Resolución del Problema de Docker (Microservicio Cuentas)
**Problema**: Error al montar volumen Docker para MySQL
```
failed to mount local volume: no such file or directory
```

**Solución**: 
- Creado directorio `mysql-data` en [microservicio-cuentas/](file:///home/gyro/Documents/OCT25-MAR26/SOFT_SEGURO/PARCIAL_TRES/lab3/taller-pruebas-unitarias/microservicio-cuentas)
- Docker Compose ejecutado exitosamente

### 2. Configuración de Java 21 para el Microservicio Socios
**Problema**: Maven requiere Java 21 pero el sistema usa Java 17
```
error: release version 21 not supported
```

**Solución**:
- Creado script [run-with-java21.sh](file:///home/gyro/Documents/OCT25-MAR26/SOFT_SEGURO/PARCIAL_TRES/lab3/taller-pruebas-unitarias/socios/run-with-java21.sh)
- Configura `JAVA_HOME` temporalmente a Java 21 sin afectar sistema
- Ejecuta Maven con la versión correcta de Java

### 3. Creación de Base de Datos PostgreSQL
**Problema**: Base de datos `cooperativa_socios` no existía
```
FATAL: database "cooperativa_socios" does not exist
```

**Solución**:
- Creado script [setup-db.sh](file:///home/gyro/Documents/OCT25-MAR26/SOFT_SEGURO/PARCIAL_TRES/lab3/taller-pruebas-unitarias/socios/setup-db.sh)
- Base de datos creada exitosamente en PostgreSQL local
- Configuración conectada a `localhost:5432`

## 🧪 Verificación del Microservicio

### Estado del Servicio
- ✅ **Servidor**: Tomcat 11.0.15 corriendo en puerto 8080
- ✅ **Base de Datos**: PostgreSQL 17.7 conectada
- ✅ **Tiempo de inicio**: 4.259 segundos
- ✅ **Datos de prueba**: 20 socios cargados automáticamente

### Pruebas de Endpoints

#### 1. Listar Todos los Socios
```bash
GET http://localhost:8080/api/socios
```
- **Estado**: HTTP 200 ✅
- **Registros retornados**: 20 socios
- **Estructura validada**: UUID, nombres, apellidos, identificación, email, teléfono, dirección, estado activo

**Ejemplo de respuesta**:
```json
{
  "id": "4604c0f6-7a39-41fc-b3ab-5ed477a265cd",
  "nombres": "Juan Carlos",
  "apellidos": "Pérez González",
  "identificacion": "1712345678",
  "email": "juan.perez@gmail.com",
  "activo": true
}
```

#### 2. Crear Nuevo Socio
```bash
POST http://localhost:8080/api/socios
```
- **Estado**: Probado ✅
- **Validación**: Acepta JSON con estructura correcta

### Swagger UI
- **URL**: http://localhost:8080/swagger-ui.html
- **API Docs**: http://localhost:8080/api-docs

## 📋 Archivos Creados

| Archivo | Propósito |
|---------|-----------|
| [run-with-java21.sh](file:///home/gyro/Documents/OCT25-MAR26/SOFT_SEGURO/PARCIAL_TRES/lab3/taller-pruebas-unitarias/socios/run-with-java21.sh) | Script para ejecutar la app con Java 21 |
| [setup-db.sh](file:///home/gyro/Documents/OCT25-MAR26/SOFT_SEGURO/PARCIAL_TRES/lab3/taller-pruebas-unitarias/socios/setup-db.sh) | Script para crear la base de datos |
| [setup-database.sql](file:///home/gyro/Documents/OCT25-MAR26/SOFT_SEGURO/PARCIAL_TRES/lab3/taller-pruebas-unitarias/socios/setup-database.sql) | SQL alternativo para creación de BD |

## 🔧 Configuración Técnica

### Base de Datos
- **Motor**: PostgreSQL 17.7
- **Puerto**: 5432
- **Base de datos**: `cooperativa_socios`
- **Usuario**: `postgres`
- **Password**: `postgres`

### Aplicación
- **Framework**: Spring Boot 4.0.1
- **Java**: 21 (OpenJDK)
- **Puerto**: 8080
- **ORM**: Hibernate 7.2.0.Final
- **DDL**: `update` (crea/actualiza tablas automáticamente)

## 🚀 Cómo Usar

### Iniciar el Microservicio
```bash
cd /home/gyro/Documents/OCT25-MAR26/SOFT_SEGURO/PARCIAL_TRES/lab3/taller-pruebas-unitarias/socios
./run-with-java21.sh
```

### Verificar Estado
```bash
# Listar socios
curl http://localhost:8080/api/socios | jq '.'

# Contar registros
curl -s http://localhost:8080/api/socios | jq 'length'

# Ver un socio específico
curl -s http://localhost:8080/api/socios | jq '.[0]'
```

## ✨ Resultados
- ✅ Microservicio funcionando correctamente
- ✅ Base de datos conectada y poblada
- ✅ API REST respondiendo a solicitudes
- ✅ 20 socios de prueba disponibles
- ✅ Swagger UI accesible para documentación interactiva