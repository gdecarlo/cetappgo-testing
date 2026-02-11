---
name: generate_pdf_report
description: Generar un PDF a partir de un reporte HTML ya creado y guardarlo en la misma carpeta; usar al finalizar el reporte HTML o cuando el usuario pida convertir reportes HTML a PDF.
---

# Skill: Generate PDF Report

## Objetivo
Generar un PDF desde un reporte HTML existente, en la misma carpeta, usando Playwright.

## Pasos
1. Validar que exista el HTML de entrada.
2. Definir la salida en la misma carpeta con el mismo nombre base y extensión `.pdf`.
3. Ejecutar el script `scripts/html_to_pdf.js` con el HTML como entrada.
4. Confirmar que el PDF se generó correctamente.

## Uso rápido
- Comando:
  - `node .github/skills/generate_pdf_report/scripts/html_to_pdf.js --input "evidence/{sourceFile}/{ticketId}/{ticketId}_reporte.html"`

## Notas
- El script imprime la ruta del PDF generado.
- Si el PDF ya existe, se sobrescribe.
