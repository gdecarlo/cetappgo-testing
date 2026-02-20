---
name: generate_html_report
description: Generar el reporte HTML final usando el template oficial y la lista de evidencias; usar al finalizar el test.
---

# Skill: Generate HTML Report

## Objetivo
Crear el reporte HTML final en:
`evidence/{sourceFile}/{ticketId}/{ticketId}_reporte.html`

Además, incluir métricas de tiempo:
- **Tiempo de evidencia**: desde que el usuario pide la ejecución hasta justo antes de generar el reporte.
- **Tiempo de generación de reporte**: tiempo total invertido en generar el HTML.

## Pasos
1. Leer el template: `.github/skills/evidence-generator/template-html-optimized.html`.
2. Reemplazar variables requeridas (ticket, status, ambiente, URL, usuario, objetivo, datos, response, errores).
3. Insertar la sección de evidencias con las imágenes generadas.
4. **Insertar las métricas de tiempo** en el reporte (sección de Información General o Nota):
	- `evidenceDurationMs` y `evidenceDurationHuman`
	- `reportGenerationDurationMs` y `reportGenerationDurationHuman`
5. Guardar el HTML en la carpeta de evidencia.
6. Ejecutar el skill `generate_pdf_report` para crear el PDF en la misma carpeta del HTML.
7. Generar el archivo `raw-{TC_ID}-result.md` en `evidence/{ticketId}/{TC_ID}/` con el resultado de la prueba formateado para copiar y pegar en un comentario de Jira, usando la siguiente estructura:

   ```markdown
   Historia de Usuario: [Titulo de la HU]

   Ambiente: test X

   Resultado de Prueba:
   {TC_ID} - [Titulo del TC] - ✅ PASS / ❌ FAIL

   Validaciones:
   ✓ [Validación 1]
   ✓ [Validación 2]
   ...

   Fecha de ejecución: DD de Mes de AAAA
   ```

8. Eliminar evidencias temporales en `.playwright-mcp/evidence/` **solo después** de confirmar que las evidencias finales ya fueron generadas en `evidence/`.

---

## Estrategia de Optimización (~30% reducción tiempo)

### Arquitectura Optimizada

| Componente | Archivo | Descripción |
|------------|---------|-------------|
| CSS Externo | `evidence-generator/report-styles.css` | Estilos compartidos (~260 líneas) |
| Template Ligero | `evidence-generator/template-html-optimized.html` | Solo HTML (~90 líneas) |
| Script Optimizado | `generate_html_report/generate_html_report_optimized.js` | Con caching y single-pass |

### Optimizaciones Implementadas

1. **CSS Externo Compartido** (~50% reducción tamaño HTML)
   - Los estilos se extraen a `evidence/assets/report-styles.css`
   - Se copian automáticamente una sola vez
   - El navegador cachea el CSS entre reportes

2. **Single-Pass Regex Replacement** (~20% más rápido)
   - Antes: 12+ operaciones `split().join()` secuenciales
   - Ahora: Una sola pasada con `replace(/\{\{(\w+)\}\}/g, ...)`

3. **Template Caching en Memoria** (~10% más rápido)
   - El template se carga una sola vez y se reutiliza
   - Evita lecturas de disco repetidas

4. **Pre-building de Secciones HTML**
   - Steps, validations y evidence se construyen antes del reemplazo
   - Reduce operaciones de string dentro del bucle principal

### Estructura de Archivos

```
evidence/
├── assets/
│   └── report-styles.css      # CSS compartido (copiado auto)
├── {sourceFile}/
│   └── {ticketId}/
│       ├── {ticketId}_reporte.html
│       └── raw-{ticketId}-result.md
```

---

## Script CLI

### Versión Optimizada (Recomendada)

```powershell
node .github/skills/generate_html_report/generate_html_report_optimized.js --input "ruta/a/input.json"
```

### Versión Legacy

```powershell
node .github/skills/generate_html_report/generate_html_report.js --input "ruta/a/input.json"
```

Opcionales:
- `--output`: ruta del HTML (por defecto `evidence/{sourceFile}/{ticketId}/{ticketId}_reporte.html`).

El JSON de entrada debe incluir los campos definidos en "Entrada mínima".

## Entrada mínima
- `ticketId`, `ticketTitle`, `status`
- `sourceFile`, `evidenceDir`
- `environment`, `baseUrl`, `user`
- `objective`, `steps`, `validations`
- `testData`, `response`, `consoleErrors`
- `evidenceImages[]`
- `evidenceStartTime`, `evidenceEndTime`
- `reportGenerationStartTime`, `reportGenerationEndTime`
