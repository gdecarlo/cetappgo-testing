---
name: evidence-generator
version: 1.1.0
description: Define carpeta de evidencia jerárquica (Nombre Archivo / Ticket) en .playwright-mcp\evidence
---

# Skill: Evidence Generator

Este skill define **dónde guardar** capturas y reporte HTML organizados por el nombre del archivo de definición de pruebas y el ID del ticket.

## Regla principal

Si el ticket `tc001` proviene del archivo `agenda.md`, **todos los archivos** deben guardarse en:

```
.playwright-mcp\evidence\agenda\tc001\
```

## Convención de carpetas

1. El primer nivel dentro de `.playwright-mcp\evidence\` debe ser el nombre del archivo `.md` origen (ej. `agenda`, `usuarios`, `epp`) sin extensión.
2. El segundo nivel debe ser el ID del ticket (ej. `tc001`).

## Convención de nombres de archivos

- Screenshots: `tc001_formulario_completo.png`, `tc001_inspeccion_creada.png`, etc.
- Reporte HTML: `tc001_reporte.html`

## Ejemplo de uso (Playwright MCP)

```ts
const ticketId = 'tc001';
const sourceFile = 'agenda'; // Basado en agenda.md
const evidenceDir = `.playwright-mcp\\evidence\\${sourceFile}\\${ticketId}`;

// Asegurar carpeta (si no existe)
// fs.mkdirSync(evidenceDir, { recursive: true });

// Capturas
await page.screenshot({ path: `${evidenceDir}\\${ticketId}_formulario_completo.png`, fullPage: true });

// Reporte HTML
const htmlPath = `${evidenceDir}\\${ticketId}_reporte.html`;
```

## Output requerido

- Todas las rutas de evidencia deben apuntar a la subcarpeta jerárquica: `[MD_NAME]\[TICKET_ID]\`.
- Nunca guardar evidencia directamente en `.playwright-mcp\evidence` o solo en el ticket si existe una agrupación por archivo.

## Estructura del Reporte HTML

El reporte HTML debe seguir el siguiente esquema visual y estructural:

### Secciones obligatorias

1. **Header**: Fondo degradado azul (#1e3c72 → #2a5298), título "Reporte de Prueba Automatizada" y subtítulo con el ID y nombre del test case.
2. **Status Badge**: Badge redondeado verde (#28a745) para PASS o rojo (#dc3545) para FAIL.
3. **Información General**: Grid de 6 items con: Caso de Prueba, Estado, Ambiente, URL Base, Fecha de Ejecución, Usuario de Prueba.
4. **Objetivo**: Párrafo descriptivo del propósito del test.
5. **Pasos Ejecutados**: Lista numerada con círculos morados (#667eea) y descripción de cada paso.
6. **Validaciones Exitosas**: Lista con checkmarks (✓) de todas las validaciones cumplidas.
7. **Resultados JSON**: Bloque de código con fondo oscuro (#282c34) y syntax highlighting.
8. **Evidencias**: Grid de imágenes con título, descripción y thumbnail clickeable.
9. **Footer**: Fondo azul oscuro (#1e3c72) con timestamp de generación.

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
| `{{JSON_RESULTS}}` | Bloque JSON con syntax highlighting |
| `{{EVIDENCE_PATH}}` | Ruta relativa de la imagen |
| `{{EVIDENCE_ALT}}` | Texto alternativo de la imagen |
