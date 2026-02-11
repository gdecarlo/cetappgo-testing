---
name: final_response_formatter
description: Formatear la respuesta final con Status, JSON de evidencias y lista de archivos; usar al cerrar el flujo de prueba.
---

# Skill: Final Response Formatter

## Objetivo
Producir el output final **obligatorio** en el chat.

## Formato
1. **Status:** Pass/Fail
2. **JSON:** bloque con evidencias
3. **Lista de archivos:** rutas en backticks

## JSON recomendado
- `status`
- `ticketId`
- `sourceFile`
- `evidenceDir`
- `screenshots[]`
- `reportHtml`
- `evidenceDurationMs`
- `evidenceDurationHuman`
- `reportGenerationDurationMs`
- `reportGenerationDurationHuman`

## Reglas
- Rutas de imágenes **solo** en JSON o backticks.
- No usar tags de imagen ni base64.
