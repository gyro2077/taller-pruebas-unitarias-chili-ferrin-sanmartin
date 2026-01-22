#!/bin/bash

# Script para crear la base de datos cooperativa_socios en PostgreSQL local

echo "=== Creando base de datos cooperativa_socios ==="
echo ""
echo "Por favor, ingresa la contraseña de sudo cuando se solicite."
echo ""

# Ejecutar como usuario postgres
sudo -u postgres psql -c "CREATE DATABASE cooperativa_socios;" 2>/dev/null

# Verificar si se creó exitosamente
if [ $? -eq 0 ]; then
    echo "✅ Base de datos 'cooperativa_socios' creada exitosamente!"
else
    echo "⚠️  La base de datos podría ya existir o hubo un error."
    echo "Verificando si la base de datos existe..."
    sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw cooperativa_socios
    if [ $? -eq 0 ]; then
        echo "✅ La base de datos 'cooperativa_socios' ya existe."
    else
        echo "❌ Error al crear la base de datos. Por favor, créala manualmente:"
        echo "   sudo -u postgres psql -c \"CREATE DATABASE cooperativa_socios;\""
    fi
fi

echo ""
echo "=== Listando bases de datos disponibles ==="
sudo -u postgres psql -l
