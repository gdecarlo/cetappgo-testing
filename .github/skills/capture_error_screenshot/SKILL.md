---
name: capture_error_screenshot
description: Capturar screenshots ante errores o validaciones críticas con naming estándar {ticketId}_paso_XX.png dentro de evidence/{sourceFile}/{ticketId}/. Usar herramientas MCP, NO código.
---

# Skill: Capture Error Screenshot

## Objetivo
Estandarizar capturas cuando hay errores o validaciones críticas.

> ⚠️ **IMPORTANTE:** Usar herramientas MCP para capturas, NO generar código TypeScript.

## Pasos
1. Mantener un contador incremental `stepIndex` (01, 02, 03...).
2. Activar herramientas de captura con `activate_page_capture_tools`.
3. Usar la herramienta de screenshot MCP con filename:
   `evidence/{sourceFile}/{ticketId}/{ticketId}_paso_XX.png`
4. Capturar **solo** en errores/validaciones críticas o pasos obligatorios definidos por el test.

## Reglas
- No usar nombres libres ni rutas fuera de `evidence/`.
- Incrementar `stepIndex` en cada captura.
- **NO escribir código** `page.screenshot()` — usar herramienta MCP.
