---
name: capture_error_screenshot
description: Capturar screenshots ante errores o validaciones críticas con naming estándar {ticketId}_paso_XX.png dentro de evidence/{sourceFile}/{ticketId}/.
---

# Skill: Capture Error Screenshot

## Objetivo
Estandarizar capturas cuando hay errores o validaciones críticas.

## Pasos
1. Mantener un contador incremental `stepIndex` (01, 02, 03...).
2. Guardar con el formato:
   `evidence/{sourceFile}/{ticketId}/{ticketId}_paso_XX.png`
3. Capturar **solo** en errores/validaciones críticas o pasos obligatorios definidos por el test.

## Reglas
- No usar nombres libres ni rutas fuera de `evidence/`.
- Incrementar `stepIndex` en cada captura.
