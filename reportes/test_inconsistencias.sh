#!/bin/bash

# Script para probar inconsistencias en el estado ANTES de implementar validaciones
# Ejecutar después de levantar ambos microservicios

echo "================================================================"
echo "  PRUEBA DE INCONSISTENCIAS - ESTADO ANTES"
echo "  Fecha: $(date)"
echo "================================================================"
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Variables
SOCIOS_URL="http://localhost:8080/api/socios"
CUENTAS_URL="http://localhost:3000/cuentas"

echo "🔍 Verificando que los servicios estén activos..."
if ! curl -s -o /dev/null -w "%{http_code}" $SOCIOS_URL | grep -q "200"; then
    echo -e "${RED}❌ Error: Microservicio de Socios no está respondiendo${NC}"
    exit 1
fi

if ! curl -s -o /dev/null -w "%{http_code}" $CUENTAS_URL | grep -q "200"; then
    echo -e "${RED}❌ Error: Microservicio de Cuentas no está respondiendo${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Ambos microservicios están activos${NC}\n"

# ===================================================================
# TEST 1: Eliminar socio con cuentas activas
# ===================================================================
echo "================================================================"
echo "  TEST 1: Eliminación de Socio con Cuentas Activas"
echo "================================================================"

# 1. Crear socio de prueba
echo "📝 Paso 1: Creando socio de prueba..."
TIMESTAMP=$(date +%s)
# TIMESTAMP es de 10 dígitos. Prefix 11 + 10 dígitos = 12 dígitos (Válido entre 10 y 13)
RANDOM_ID="11$TIMESTAMP"
RANDOM_EMAIL="test.$TIMESTAMP@cooperativa.com"

SOCIO_RESPONSE=$(curl -s -X POST $SOCIOS_URL \
  -H "Content-Type: application/json" \
  -d "{
    \"nombres\": \"Test Inconsistencia\",
    \"apellidos\": \"Usuario Prueba ANTES\",
    \"tipoIdentificacion\": \"CEDULA\",
    \"identificacion\": \"$RANDOM_ID\",
    \"email\": \"$RANDOM_EMAIL\",
    \"telefono\": \"0999999991\",
    \"direccion\": \"Calle Prueba 123\",
    \"activo\": true
  }")

SOCIO_ID=$(echo $SOCIO_RESPONSE | jq -r '.id')

if [ "$SOCIO_ID" = "null" ] || [ -z "$SOCIO_ID" ]; then
    echo -e "${RED}❌ Error al crear socio${NC}"
    echo "Response: $SOCIO_RESPONSE"
    exit 1
fi

echo -e "${GREEN}✅ Socio creado con ID: $SOCIO_ID${NC}"

# 2. Crear cuenta con saldo para ese socio
echo "📝 Paso 2: Creando cuenta con saldo \$15,000..."
CUENTA_RESPONSE=$(curl -s -X POST $CUENTAS_URL \
  -H "Content-Type: application/json" \
  -d "{
    \"socioId\": \"$SOCIO_ID\",
    \"numeroCuenta\": \"TEST$(date +%s)\",
    \"tipoCuenta\": \"AHORRO\",
    \"saldo\": 15000
  }")

CUENTA_ID=$(echo $CUENTA_RESPONSE | jq -r '.id')
echo -e "${GREEN}✅ Cuenta creada con ID: $CUENTA_ID${NC}"
echo "   Saldo: \$15,000"

# 3. Intentar eliminar el socio
echo "📝 Paso 3: Intentando eliminar socio (DEBERÍA FALLAR)..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
  -X DELETE $SOCIOS_URL/$SOCIO_ID)

if [ "$HTTP_CODE" -eq "204" ]; then
    echo -e "${RED}❌ INCONSISTENCIA DETECTADA!${NC}"
    echo -e "${RED}   Socio eliminado exitosamente a pesar de tener cuenta activa${NC}"
    echo -e "${RED}   HTTP Status: $HTTP_CODE (debería ser 400 o 409)${NC}"
    
    # Verificar cuenta huérfana
    echo "📝 Paso 4: Verificando cuenta huérfana..."
    CUENTA_HUERFANA=$(curl -s "$CUENTAS_URL" | jq ".[] | select(.id == \"$CUENTA_ID\")")
    
    if [ ! -z "$CUENTA_HUERFANA" ]; then
        echo -e "${YELLOW}⚠️  Cuenta huérfana confirmada:${NC}"
        echo "$CUENTA_HUERFANA" | jq '.'
    fi
    
    INCONSISTENCIAS_TEST1=1
else
    echo -e "${GREEN}✅ Eliminación bloqueada correctamente (HTTP $HTTP_CODE)${NC}"
    INCONSISTENCIAS_TEST1=0
fi

echo ""

# ===================================================================
# TEST 2: Crear cuenta para socio inexistente
# ===================================================================
echo "================================================================"
echo "  TEST 2: Creación de Cuenta para Socio Inexistente"
echo "================================================================"

echo "📝 Intentando crear cuenta con socioId falso..."
FAKE_SOCIO_ID="00000000-0000-0000-0000-000000000000"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST $CUENTAS_URL \
  -H "Content-Type: application/json" \
  -d "{
    \"socioId\": \"$FAKE_SOCIO_ID\",
    \"numeroCuenta\": \"FAKE$(date +%s)\",
    \"tipoCuenta\": \"CORRIENTE\",
    \"saldo\": 10000
  }")

if [ "$HTTP_CODE" -eq "201" ]; then
    echo -e "${RED}❌ INCONSISTENCIA DETECTADA!${NC}"
    echo -e "${RED}   Cuenta creada para socio inexistente${NC}"
    echo -e "${RED}   HTTP Status: $HTTP_CODE (debería ser 400 o 404)${NC}"
    INCONSISTENCIAS_TEST2=1
else
    echo -e "${GREEN}✅ Creación bloqueada correctamente (HTTP $HTTP_CODE)${NC}"
    INCONSISTENCIAS_TEST2=0
fi

echo ""

# ===================================================================
# TEST 3: Crear cuenta para socio inactivo
# ===================================================================
echo "================================================================"
echo "  TEST 3: Creación de Cuenta para Socio Inactivo"
echo "================================================================"

echo "📝 Paso 1: Creando socio inactivo..."
TIMESTAMP_INAC=$(date +%s)
# TIMESTAMP es de 10 dígitos. Prefix 88 + 10 dígitos = 12 dígitos (Válido)
RANDOM_ID_INAC="88$TIMESTAMP_INAC"
RANDOM_EMAIL_INAC="inactivo.$TIMESTAMP_INAC@cooperativa.com"

SOCIO_INACTIVO=$(curl -s -X POST $SOCIOS_URL \
  -H "Content-Type: application/json" \
  -d "{
    \"nombres\": \"Socio Inactivo\",
    \"apellidos\": \"Test ANTES\",
    \"tipoIdentificacion\": \"CEDULA\",
    \"identificacion\": \"$RANDOM_ID_INAC\",
    \"email\": \"$RANDOM_EMAIL_INAC\",
    \"telefono\": \"0988888888\",
    \"activo\": false
  }")

SOCIO_INACTIVO_ID=$(echo $SOCIO_INACTIVO | jq -r '.id')
echo -e "${GREEN}✅ Socio inactivo creado: $SOCIO_INACTIVO_ID${NC}"

echo "📝 Paso 2: Intentando crear cuenta para socio inactivo..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST $CUENTAS_URL \
  -H "Content-Type: application/json" \
  -d "{
    \"socioId\": \"$SOCIO_INACTIVO_ID\",
    \"numeroCuenta\": \"INACT$(date +%s)\",
    \"tipoCuenta\": \"AHORRO\",
    \"saldo\": 5000
  }")

if [ "$HTTP_CODE" -eq "201" ]; then
    echo -e "${RED}❌ INCONSISTENCIA DETECTADA!${NC}"
    echo -e "${RED}   Cuenta creada para socio INACTIVO${NC}"
    echo -e "${RED}   HTTP Status: $HTTP_CODE (debería ser 400)${NC}"
    INCONSISTENCIAS_TEST3=1
else
    echo -e "${GREEN}✅ Creación bloqueada correctamente (HTTP $HTTP_CODE)${NC}"
    INCONSISTENCIAS_TEST3=0
fi

echo ""

# ===================================================================
# RESUMEN
# ===================================================================
echo "================================================================"
echo "  RESUMEN DE RESULTADOS"
echo "================================================================"

TOTAL_INCONSISTENCIAS=$((INCONSISTENCIAS_TEST1 + INCONSISTENCIAS_TEST2 + INCONSISTENCIAS_TEST3))

echo "Test 1 - Eliminar socio con cuentas: $([ $INCONSISTENCIAS_TEST1 -eq 1 ] && echo -e "${RED}FALLA${NC}" || echo -e "${GREEN}PASA${NC}")"
echo "Test 2 - Cuenta para socio inexistente: $([ $INCONSISTENCIAS_TEST2 -eq 1 ] && echo -e "${RED}FALLA${NC}" || echo -e "${GREEN}PASA${NC}")"
echo "Test 3 - Cuenta para socio inactivo: $([ $INCONSISTENCIAS_TEST3 -eq 1 ] && echo -e "${RED}FALLA${NC}" || echo -e "${GREEN}PASA${NC}")"

echo ""
echo "Total de inconsistencias detectadas: $TOTAL_INCONSISTENCIAS/3"

if [ $TOTAL_INCONSISTENCIAS -gt 0 ]; then
    echo -e "${RED}❌ SISTEMA VULNERABLE - Se requieren validaciones cross-service${NC}"
    exit 1
else
    echo -e "${GREEN}✅ SISTEMA SEGURO - Todas las validaciones están funcionando${NC}"
    exit 0
fi
