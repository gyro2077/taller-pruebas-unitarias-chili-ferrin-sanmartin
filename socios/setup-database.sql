-- Script para crear la base de datos cooperativa_socios
-- Ejecutar como usuario postgres

-- Crear la base de datos si no existe
CREATE DATABASE cooperativa_socios
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Comentario descriptivo
COMMENT ON DATABASE cooperativa_socios 
    IS 'Base de datos para el microservicio de socios de la Cooperativa Futuro Seguro';
