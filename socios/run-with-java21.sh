#!/bin/bash

# Script para ejecutar el proyecto con Java 21 sin afectar la configuración global

# Configurar Java 21 solo para esta sesión
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH

# Verificar la versión de Java
echo "=== Usando Java 21 ===" 
java -version
echo ""

# Ejecutar Maven con Spring Boot
echo "=== Iniciando aplicación con Spring Boot ==="
mvn spring-boot:run
