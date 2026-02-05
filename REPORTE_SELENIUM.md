# 🤖 Reporte de Automatización de Pruebas (Selenium)

Este documento detalla el flujo de pruebas End-to-End (E2E) implementado para validar la integridad de los microservicios bancarios.

## 🎯 Objetivo
Automatizar el "Camino Crítico" del usuario para garantizar que las funciones principales (Gestión de Socios, Cuentas y Transacciones) funcionen correctamente en conjunto, asegurando la calidad del software antes de cada despliegue.

## 🛠️ Tecnologías Empleadas
- **Python**: Lenguaje de scripting para la prueba.
- **Selenium WebDriver**: Herramienta para controlar el navegador web.
- **Pytest**: Framework para ejecución y reporte de aserciones.
- **Chromium**: Navegador utilizado para la ejecución.

---

## 🔄 Flujo Automatizado (El Script)

El script `selenium/test_e2e.py` simula a un usuario real realizando las siguientes acciones en secuencia:

### 1. Creación de Socio (Alta de Cliente)
- **Acción**: El robot navega al formulario de Socios y completa los campos con datos dinámicos (usando *timestamp* para generar Cédulas y Nombres únicos en cada ejecución).
- **Validación**:
  - Espera a que aparezca la notificación (Toast) de **"Socio registrado exitosamente"**.
  - No avanza hasta confirmar que el sistema backend respondió correctamente.

### 2. Apertura de Cuenta
- **Acción**: Cambia a la pestaña de Cuentas, busca al socio recién creado en el selector y le asigna una cuenta de Ahorros con un saldo inicial de **$500.00**.
- **Validación**:
  - Confirma que el socio existe en el desplegable.
  - Verifica el mensaje **"Cuenta creada exitosamente"**.

### 3. Transacción Monetaria (Prueba de Lógica de Negocio)
- **Acción**: Localiza la cuenta creada en la tabla, hace scroll hasta ella y pulsa el botón de **Depósito**. Ingresa un monto de **$100.00**.
- **Validación Crítica**:
  - Espera la confirmación de la transacción.
  - **Verificación de Saldo**: Lee la celda de saldo en la tabla y espera hasta que el valor cambie de `$500.00` a **`$600.00`**.
  - Esto valida no solo el Frontend, sino que el Backend haya sumado correctamente (`500 + 100`) y no concatenado (`500100`), un error que fue detectado y corregido gracias a esta prueba.

---

## 🛡️ Estrategias de Robustez
Para evitar falsos negativos (flaky tests), se implementaron las siguientes mejoras técnicas:

1.  **Esperas Explícitas (WebDriverWait)**: En lugar de "pausar" el script por X segundos, el robot espera inteligentemente a que ocurran eventos (aparición de un Toast, cambio de texto en una celda).
2.  **Selectores Resilientes**: Se buscan elementos por su contenido de texto (`contains`) en lugar de rutas rígidas, permitiendo cambios leves en el diseño sin romper la prueba.
3.  **Manejo de Caché**: Se configuró el Frontend para no guardar caché (`no-store`), asegurando que la prueba siempre vea los datos más recientes de la base de datos.
