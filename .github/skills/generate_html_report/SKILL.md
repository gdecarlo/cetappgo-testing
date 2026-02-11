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
1. Leer el template: `.github/skills/evidence-generator/template-html-base.html`.
2. Reemplazar variables requeridas (ticket, status, ambiente, URL, usuario, objetivo, datos, response, errores).
3. Insertar la sección de evidencias con las imágenes generadas.
4. **Insertar las métricas de tiempo** en el reporte (sección de Información General o Nota):
	- `evidenceDurationMs` y `evidenceDurationHuman`
	- `reportGenerationDurationMs` y `reportGenerationDurationHuman`
5. Guardar el HTML en la carpeta de evidencia.

## Entrada mínima
- `ticketId`, `ticketTitle`, `status`
- `sourceFile`, `evidenceDir`
- `environment`, `baseUrl`, `user`
- `objective`, `steps`, `validations`
- `testData`, `response`, `consoleErrors`
- `evidenceImages[]`
- `evidenceStartTime`, `evidenceEndTime`
- `reportGenerationStartTime`, `reportGenerationEndTime`
