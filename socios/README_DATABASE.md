# Configuración de Base de Datos - Microservicio Socios

## 📋 Requisitos
- Docker y Docker Compose instalados
- Puerto 5432 (PostgreSQL) disponible
- Puerto 5050 (pgAdmin) disponible

## 🚀 Inicio Rápido

### 1. Levantar PostgreSQL con Docker

Desde el directorio del proyecto `socios`:

```bash
docker compose up -d
```

Esto iniciará:
- **PostgreSQL 13** en el puerto `5432`
  - Base de datos: `cooperativa_socios`
  - Usuario: `postgres`
  - Contraseña: `postgres`
  
- **pgAdmin 4** en el puerto `5050`
  - URL: http://localhost:5050
  - Email: `admin@cooperativa.com`
  - Contraseña: `admin`

### 2. Verificar que PostgreSQL esté corriendo

```bash
docker compose ps
```

Deberías ver los contenedores en estado `Up`.

### 3. Ejecutar la aplicación con Java 21

```bash
./run-with-java21.sh
```

## 🛠️ Gestión de la Base de Datos

### Detener los servicios
```bash
docker compose stop
```

### Reiniciar los servicios
```bash
docker compose restart
```

### Ver logs de PostgreSQL
```bash
docker compose logs -f postgres
```

### Eliminar completamente (incluye datos)
```bash
docker compose down -v
```

## 🔍 Acceso a pgAdmin

1. Abrir navegador en http://localhost:5050
2. Iniciar sesión con:
   - Email: `admin@cooperativa.com`
   - Contraseña: `admin`
3. Agregar servidor:
   - Host: `postgres` (nombre del servicio Docker)
   - Puerto: `5432`
   - Username: `postgres`
   - Password: `postgres`

## ⚙️ Configuración de la Aplicación

La aplicación Spring Boot está configurada en `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/cooperativa_socios
spring.datasource.username=postgres
spring.datasource.password=postgres
```

## 📝 Notas

- La base de datos se crea automáticamente al iniciar el contenedor
- Los datos se persisten en un volumen Docker (`postgres_data`)
- Spring Boot creará las tablas automáticamente con `ddl-auto=update`
