# AGENTS.md — Frontend UI Testing (Playwright)

## REGLA DE ORO #0 (CRÍTICO) - CONFIGURACIÓN CENTRALIZADA

**ANTES de ejecutar cualquier prueba, el agente DEBE:**
1. **LEER** el archivo `.vscode/config.md` para obtener URLs y credenciales
2. **USAR ÚNICAMENTE** la URL definida en ese archivo
3. **NUNCA inventar URLs** como `test1.cetappgo.com`, `demo.cetappgo.com`, etc.

### Configuración Rápida (desde config.md)
| Parámetro | Valor |
|-----------|-------|
| URL Base | `http://localhost:4173` |
| Usuario | `cmartinez@cetapsa.com` |
| Password | `12345678` |

> ⚠️ **Si la URL cambia, se actualiza SOLO en `.vscode/config.md`**

---

## REGLA DE ORO #1 (CRÍTICO)

**PROHIBICIÓN ESTRICTA DE RENDERIZADO:** Bajo ninguna circunstancia este agente debe mostrar, previsualizar o incrustar imágenes en el chat.

- Las imágenes SON EVIDENCIA PRIVADA en disco.
- El chat es EXCLUSIVAMENTE para logs de texto y estructuras JSON.
- CUALQUIER intento de usar `![]` o `<img src>` se considera un fallo de seguridad.

---

## REGLA DE ORO #2 (CRÍTICO) - EJECUCIÓN DE TESTS

**PROHIBICIÓN ABSOLUTA DE CREAR ARCHIVOS .spec.ts:**

Cuando el usuario solicite ejecutar un test case (ej: "ejecuta TC-001", "corre el test", "testea X"):

### ❌ NUNCA HACER:
- **NO** crear archivos `.spec.ts` ni ningún archivo de test de Playwright tradicional
- **NO** crear ni modificar `playwright.config.ts`
- **NO** ejecutar comandos como `pnpm test`, `npx playwright test`, `npm test`
- **NO** generar código de test para que el usuario lo ejecute manualmente

### ✅ SIEMPRE HACER:
- **USAR** las herramientas MCP de Playwright (`mcp_playwright_browser_*`) para ejecutar tests interactivamente
- **NAVEGAR** directamente al sitio web usando `mcp_playwright_browser_navigate`
- **INTERACTUAR** con la UI usando `mcp_playwright_browser_click`, herramientas de tipeo, etc.
- **CAPTURAR** evidencia con las herramientas de screenshot del MCP
- **SEGUIR** el flujo obligatorio descrito abajo

> **Razón:** Este proyecto usa Playwright MCP para testing interactivo en tiempo real, NO para generar suites de tests automatizados tradicionales.

---

## REGLA DE ORO #3 (CRÍTICO) - LIMPIEZA DE ESTADO

**ANTES de ejecutar un flujo de Login o Inicio:**
1. **DETECTAR** el estado actual (¿Ya estoy logueado?).
2. **LIMPIAR** `localStorage` y `sessionStorage` obligatoriamente antes de tests de autenticación.
   - Snippet JS obligatorio: `await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });`
3. **RECARGAR** la página tras limpiar para forzar la aparición de la pantalla de Login.

> **Razón:** El entorno local suele mantener sesiones activas. Si no se limpia, el test fallará buscando el formulario de login en una página que ya es el Dashboard.

---

## Objetivo

Explorar y verificar la UI mediante Playwright MCP, generando evidencia estandarizada solo en archivos locales.

---
## FLUJO OBLIGATORIO DE EJECUCIÓN DE TESTS (CRÍTICO)

Cuando el usuario solicite ejecutar un test case (ej: "ejecuta TC-001", "corre el test TC-XXX"), DEBES seguir estos pasos EN ORDEN:

### Paso 0: Cargar Configuración (OBLIGATORIO)
- **LEER** el archivo `.vscode/config.md` para obtener:
  - URL base del entorno de pruebas
  - Credenciales de usuario
  - Selectores de login
- **NUNCA** inventar URLs. Usar ÚNICAMENTE la URL definida en config.md

### Paso 1: Identificar el origen del test
- Leer el archivo `.md` que contiene el test case (ej: `.vscode/test-cases/pg-3154.md`)
- Extraer el ID del ticket (ej: `TC-001`) y el nombre del archivo origen (ej: `pg-3154`)

### Paso 2: Crear carpeta de evidencia ANTES de ejecutar
- Usar el skill `evidence-generator` para determinar la ruta: `evidence/{nombre-archivo}/{ticket-id}/`
- Ejemplo: `evidence/pg-3154/tc-001/`
- Crear la carpeta si no existe

### Paso 3: Ejecutar el test con Playwright MCP
- Seguir las instrucciones del prompt del test case
- **CAPTURAR SCREENSHOTS** en cada error encontrado usando:
  ```
  mcp_playwright_browser_screenshot con path: evidence/{nombre-archivo}/{ticket-id}/{ticket-id}_paso_XX.png
  ```

### Paso 4: Generar reporte HTML (OBLIGATORIO)
- Al finalizar el test, SIEMPRE generar el reporte HTML usando el template en `.github/skills/evidence-generator/template-html-base.html`
- Guardar como: `evidence/{nombre-archivo}/{ticket-id}/{ticket-id}_reporte.html`
- Incluir todas las capturas de pantalla tomadas durante el test

### Paso 5: Respuesta final
- Entregar el resumen con Status, JSON de evidencias y lista de archivos generados

---
## Manejo de evidencia (CRÍTICO)

### Capturas y traces

- **Guardado:** Guardar en disco mediante el tool correspondiente.
- **Referenciación:** Referenciar rutas ÚNICAMENTE dentro de bloques de código (ej: `evidence/step.png`).
- **Formateo de rutas:** Para evitar el auto-renderizado, NUNCA escribas la ruta como texto plano si termina en extensión de imagen. Úsala siempre dentro de:
  1. El objeto JSON de resultados.
  2. En línea usando backticks: \`ruta/al/archivo.png\`.

### Prohibiciones explícitas

- **NO** uses el tag de imagen de Markdown `![]()`.
- **NO** devuelvas datos en Base64, Blobs o Data URLs.
- **NO** intentes "ayudar" al usuario mostrando la captura; el usuario la revisará en su explorador de archivos.

---

## Output estandarizado (OBLIGATORIO)

### C) Respuesta final en el chat

La respuesta final DEBE ser un resumen ejecutivo en texto plano que siga este orden:

1. **Status:** (Pass/Fail)
2. **JSON:** El bloque de código JSON completo con las evidencias.
3. **Lista de archivos:** Una lista simple de las rutas generadas, envueltas en backticks para neutralizar el renderizado del cliente (ej: - \`evidence/screenshot_01.png\`).

> **Nota para el modelo:** Si el tool de Playwright te devuelve un objeto que contiene la imagen, ignora el binario y utiliza únicamente la ruta del archivo para tu respuesta.

## generar un html con el resultado del testing. usar las imagenes generadas en el html

---

## HERRAMIENTAS MCP DE PLAYWRIGHT DISPONIBLES

Estas son las herramientas que DEBES usar para ejecutar tests (NO crear archivos .spec.ts):

### Navegación y Control del Browser
- `mcp_playwright_browser_navigate` - Navegar a una URL
- `mcp_playwright_browser_navigate_back` - Volver a la página anterior
- `mcp_playwright_browser_close` - Cerrar el navegador
- `mcp_playwright_browser_tabs` - Gestionar pestañas

### Interacción con Elementos
- `mcp_playwright_browser_click` - Hacer clic en elementos
- `mcp_playwright_browser_select_option` - Seleccionar opciones en dropdowns
- `mcp_playwright_browser_press_key` - Presionar teclas
- `mcp_playwright_browser_drag` - Arrastrar elementos
- `mcp_playwright_browser_handle_dialog` - Manejar diálogos/modales

### Captura de Evidencia
- `activate_page_capture_tools` - Activar herramientas de captura (screenshots, accessibility snapshots)
- `activate_form_and_file_management_tools` - Activar herramientas de formularios

### Esperas y Sincronización
- `mcp_playwright_browser_wait_for` - Esperar por texto o tiempo

### Debugging
- `mcp_playwright_browser_console_messages` - Ver mensajes de consola
- `mcp_playwright_browser_network_requests` - Ver requests de red
- `mcp_playwright_browser_evaluate` - Ejecutar JavaScript en la página

### Ejemplo de Flujo Correcto
```
0. LEER .vscode/config.md → obtener URL y credenciales
1. mcp_playwright_browser_navigate → ir a la URL de config.md (http://localhost:4173)
2. Usar herramientas de interacción para login con credenciales de config.md
3. Navegar al módulo correspondiente
4. Ejecutar los pasos del test case
5. Capturar screenshots en cada paso importante
6. Generar reporte HTML con evidencias
```
