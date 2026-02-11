---
name: evidence-generator
version: 1.2.0
description: Define carpeta de evidencia jerárquica (Nombre Archivo / Ticket) en evidence. NO genera código; usa herramientas MCP.
---

# Skill: Evidence Generator

Este skill define **dónde guardar** capturas y reporte HTML organizados por el nombre del archivo de definición de pruebas y el ID del ticket.

> ⚠️ **IMPORTANTE:** Este skill define **convenciones de rutas**, NO genera código TypeScript/JavaScript. Las capturas se realizan con herramientas MCP.

## Regla principal

Si el ticket `tc001` proviene del archivo `agenda.md`, **todos los archivos** deben guardarse en:

```
evidence\agenda\tc001\
```

## Convención de carpetas

1. El primer nivel dentro de `evidence\` debe ser el nombre del archivo `.md` origen (ej. `agenda`, `usuarios`, `epp`) sin extensión.
2. El segundo nivel debe ser el ID del ticket (ej. `tc001`).

## Convención de nombres de archivos

- Screenshots: `tc001_paso_01.png`, `tc001_paso_02.png`, etc.
- Reporte HTML: `tc001_reporte.html`
- Reporte PDF: `tc001_reporte.pdf`

## Cómo capturar screenshots (OBLIGATORIO)

### ✅ Método CORRECTO: Usar herramienta MCP

```
Activar herramientas de captura con: activate_page_capture_tools
Luego usar la herramienta de screenshot con:
- filename: evidence/{source-file}/{ticket-id}/{ticket-id}_paso_XX.png
```

### ❌ Método PROHIBIDO: NO escribir código

```ts
// ❌ NUNCA HACER ESTO - No generar código TypeScript
await page.screenshot({ path: '...' });
```

## Output requerido

- Todas las rutas de evidencia deben apuntar a la subcarpeta jerárquica: `[MD_NAME]\[TICKET_ID]\`.
- Nunca guardar evidencia directamente en `evidence` o solo en el ticket si existe una agrupación por archivo.

## Estructura del Reporte HTML

El reporte HTML debe seguir el siguiente esquema visual y estructural:

### Secciones obligatorias

1. **Header**: Fondo degradado azul (#1e3c72 → #2a5298), título "Reporte de Prueba Automatizada" y subtítulo con el ID y nombre del test case.
2. **Status Badge**: Badge redondeado verde (#28a745) para PASS o rojo (#dc3545) para FAIL.
3. **Información General**: Grid de 6 items con: Caso de Prueba, Estado, Ambiente, URL Base, Fecha de Ejecución, Usuario de Prueba.
4. **Objetivo**: Párrafo descriptivo del propósito del test.
5. **Pasos Ejecutados**: Lista numerada con círculos morados (#667eea) y descripción de cada paso.
6. **Validaciones Exitosas**: Lista con checkmarks (✓) de todas las validaciones cumplidas.
7. **Datos de Prueba**: JSON con los datos de entrada usados en el test (formularios, configuraciones, etc.).
8. **Respuesta del Sistema**: JSON con datos del response (IDs creados, mensajes de confirmación, etc.).
9. **Errores de Consola**: JSON con errores de JavaScript capturados durante la ejecución (vacío si no hubo errores).
10. **Evidencias**: Grid de imágenes con título, descripción y thumbnail clickeable.
11. **Footer**: Fondo azul oscuro (#1e3c72) con timestamp de generación.

### Paleta de colores

| Elemento | Color |
|----------|-------|
| Header/Footer | `#1e3c72` → `#2a5298` |
| Accent (números, bordes) | `#667eea` |
| PASS badge | `#28a745` |
| FAIL badge | `#dc3545` |
| Background body | `#667eea` → `#764ba2` |
| JSON background | `#282c34` |

### Template HTML base

📄 **Archivo:** [`template-html-base.html`](./template-html-base.html)

El template está estructurado con:
- **Variables CSS** en `:root` para cambios globales de estilo (colores, espaciado, bordes, tipografía)
- **Bloques de estilo separados** por sección para facilitar modificaciones
- **Comentarios delimitadores** que indican cada sección del documento
- **Marcadores de repetición** (`{{STEPS_START}}`, `{{EVIDENCE_START}}`, etc.) para secciones dinámicas

### Variables de reemplazo

| Variable | Descripción |
|----------|-------------|
| `{{TICKET_ID}}` | ID del caso de prueba (ej. TC-001) |
| `{{TICKET_TITLE}}` | Título descriptivo del test |
| `{{FECHA}}` | Fecha de ejecución en formato "DD de Mes de AAAA" |
| `{{STATUS}}` | PASS o FAIL |
| `{{STATUS_TEXT}}` | Texto del estado con ícono (ej. "✓ PASS") |
| `{{AMBIENTE}}` | Nombre del ambiente (ej. "CetApp GO - Test 1") |
| `{{URL_BASE}}` | URL base del ambiente |
| `{{USUARIO}}` | Usuario de prueba |
| `{{OBJETIVO}}` | Descripción del objetivo del test |
| `{{TEST_DATA_JSON}}` | JSON con datos de entrada usados en la prueba |
| `{{RESPONSE_JSON}}` | JSON con respuesta del sistema (IDs, mensajes, etc.) |
| `{{CONSOLE_ERRORS_JSON}}` | JSON con errores de JavaScript capturados |
| `{{EVIDENCE_PATH}}` | Ruta relativa de la imagen |
| `{{EVIDENCE_ALT}}` | Texto alternativo de la imagen |

---

## Uso con Playwright MCP (OBLIGATORIO)

> ⚠️ **NO GENERAR CÓDIGO:** Las capturas se realizan con herramientas MCP, NO escribiendo código TypeScript.

Para capturar screenshots durante la ejecución de un test:
1. Activar herramientas de captura: `activate_page_capture_tools`
2. Usar la herramienta de screenshot MCP

### Flujo de captura y unificación:

1. **Capturar** con herramienta MCP de screenshot
2. **Copiar** a la carpeta unificada `evidence/{source-file}/{ticket-id}/`
3. **Optimizar** imágenes con script `optimize-images.js`
4. **Generar** reporte HTML en la misma carpeta

### Comando para copiar imágenes (ejecutar antes del reporte):

```powershell
Copy-Item -Path ".playwright-mcp\evidence\{source-file}\{ticket-id}\*.png" -Destination "evidence\{source-file}\{ticket-id}\" -Force
```

### Momentos obligatorios para capturar screenshots:
1. **Inicio:** Estado inicial antes de cualquier acción
2. **Formularios:** Después de completar campos importantes
3. **Acciones críticas:** Antes y después de hacer clic en Guardar/Enviar
4. **Validaciones:** Cuando aparecen mensajes de éxito o error
5. **Final:** Estado final del sistema después de la prueba

### Ejemplo de flujo completo:

```powershell
# 1. Crear carpeta unificada
New-Item -ItemType Directory -Force -Path "evidence/pg-3154/tc-001/"

# 2. Ejecutar test usando herramientas MCP (NO código)
#    Screenshots capturados via MCP tools

# 3. Copiar imágenes a carpeta unificada
Copy-Item -Path ".playwright-mcp\evidence\pg-3154\tc-001\*.png" -Destination "evidence\pg-3154\tc-001\" -Force

# 4. Optimizar imágenes
node .github/skills/optimize-images/optimize-images.js evidence/pg-3154/tc-001

# 5. Generar reporte HTML en la misma carpeta
#    - evidence/pg-3154/tc-001/tc-001_reporte.html
```

### Estructura final unificada:

```
evidence/
└── pg-3154/
    └── tc-001/
        ├── tc-001_paso_01_inicio.png
        ├── tc-001_paso_02_formulario_completo.png
        ├── tc-001_paso_03_guardado_exitoso.png
        └── tc-001_reporte.html
```