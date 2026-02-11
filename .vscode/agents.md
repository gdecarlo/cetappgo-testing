# AGENTS.md — Frontend UI Testing (Playwright)

## REGLA DE ORO #0 (CRÍTICO) - SETUP DE SESIÓN

**ANTES de ejecutar cualquier prueba, el agente DEBE ejecutar el skill `setup_test_session`.**

Este skill:
1. **LEE** `.vscode/config.md` y selecciona la URL y credenciales correctas según el ambiente.
2. **ABRE** el browser y **LIMPIA** `localStorage` y `sessionStorage`.
3. **EJECUTA** el login con los selectores y credenciales del archivo.
4. **RETORNA** `Ready` cuando el entorno está listo.

**Prohibiciones absolutas:**
- **NUNCA** leer la URL o el password manualmente si el skill está disponible.
- **NUNCA** navegar a la URL antes de ejecutar el skill.

---

## Skills auxiliares obligatorios (anti-error)

- `mcp_tools_guard` → Bloquear acciones prohibidas (CLI, `.spec.ts`, `playwright.config.ts`).
- `pre_test_flow_enforcer` → Asegurar setup antes de navegar o interactuar.
- `validate_test_case_source` → Extraer/validar `ticketId` y `sourceFile` del test case.
- `ensure_evidence_folder` → Crear `evidence/{sourceFile}/{ticketId}/`.
- `capture_error_screenshot` → Capturas estandarizadas ante errores.
- `time-metrics-enforcer` → Registrar tiempos y exigir su inclusión en el reporte.
- `generate_html_report` → Reporte HTML final con evidencias.
- `generate_pdf_report` → PDF del reporte HTML en la misma carpeta.
- `final_response_formatter` → Respuesta final con Status/JSON/archivos.
- `evidence_paths_guard` → Evitar renderizado de imágenes en el chat.

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

La limpieza de estado se gestiona **exclusivamente** mediante el skill `setup_test_session`.
No ejecutar limpieza manual de storage ni recargas previas fuera del skill.

---

## Objetivo

Explorar y verificar la UI mediante Playwright MCP, generando evidencia estandarizada solo en archivos locales.

---
## FLUJO OBLIGATORIO DE EJECUCIÓN DE TESTS (CRÍTICO)

Cuando el usuario solicite ejecutar un test case (ej: "ejecuta TC-001", "corre el test TC-XXX"), DEBES seguir estos pasos EN ORDEN:

### Paso 0: Setup de sesión (OBLIGATORIO)
- **REGISTRAR** `evidenceStartTime` al momento de recibir el pedido del usuario.
- **EJECUTAR** el skill `time-metrics-enforcer`.
- **EJECUTAR** el skill `mcp_tools_guard`.
- **EJECUTAR** el skill `pre_test_flow_enforcer`.
- **EJECUTAR** el skill `setup_test_session`.
- **NO** leer URL/credenciales manualmente.
- **NO** navegar a la URL antes del skill.

### Paso 1: Identificar el origen del test
- **EJECUTAR** el skill `validate_test_case_source`.
- Leer el archivo `.md` que contiene el test case (ej: `.vscode/test-cases/pg-3154.md`)
- Extraer el ID del ticket (ej: `TC-001`) y el nombre del archivo origen (ej: `pg-3154`)

### Paso 2: Crear carpeta de evidencia ANTES de ejecutar
- **EJECUTAR** el skill `ensure_evidence_folder`.
- Usar el skill `evidence-generator` para determinar la ruta: `evidence/{nombre-archivo}/{ticket-id}/`
- Ejemplo: `evidence/pg-3154/tc-001/`
- Crear la carpeta si no existe

### Paso 3: Ejecutar el test con Playwright MCP
- Seguir las instrucciones del prompt del test case
- **EJECUTAR** el skill `capture_error_screenshot` ante errores/validaciones críticas
- **CAPTURAR SCREENSHOTS** en cada error encontrado usando:
  ```
  mcp_playwright_browser_screenshot con path: evidence/{nombre-archivo}/{ticket-id}/{ticket-id}_paso_XX.png
  ```

### Paso 4: Generar reporte HTML (OBLIGATORIO)
- **REGISTRAR** `evidenceEndTime` justo **antes** de generar el reporte.
- **REGISTRAR** `reportGenerationStartTime` al iniciar la generación del HTML.
- **EJECUTAR** el skill `generate_html_report` (usa el template `.github/skills/evidence-generator/template-html-base.html`, guarda en `evidence/{nombre-archivo}/{ticket-id}/{ticket-id}_reporte.html` e incluye todas las capturas).
- **REGISTRAR** `reportGenerationEndTime` al finalizar la escritura del HTML.
- **EJECUTAR** el skill `generate_pdf_report` para generar `evidence/{nombre-archivo}/{ticket-id}/{ticket-id}_reporte.pdf` en la misma carpeta.

### Paso 5: Respuesta final
- **EJECUTAR** el skill `final_response_formatter`.
- **EJECUTAR** el skill `evidence_paths_guard`.
- Entregar el resumen con Status, JSON de evidencias y lista de archivos generados

> **Nota:** El reporte HTML debe mostrar el **tiempo de evidencia** (`evidenceEndTime - evidenceStartTime`) y el **tiempo de generación de reporte** (`reportGenerationEndTime - reportGenerationStartTime`).

---
## Manejo de evidencia (CRÍTICO)

### Capturas y traces

  1. El objeto JSON de resultados.
  2. En línea usando backticks: \`ruta/al/archivo.png\`.
  
> **Obligatorio:** aplicar el skill `evidence_paths_guard`.

### Prohibiciones explícitas
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
0. Ejecutar skill `setup_test_session` → retorna `Ready`
1. Navegar al módulo correspondiente
2. Ejecutar los pasos del test case
3. Capturar screenshots en cada paso importante
4. Generar reporte HTML con evidencias
```
