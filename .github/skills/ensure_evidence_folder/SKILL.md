---
name: ensure_evidence_folder
description: Crear la carpeta de evidencia con estructura evidence/{sourceFile}/{ticketId}/ usando la convención del proyecto; usar antes de capturar screenshots o generar reportes.
---

# Skill: Ensure Evidence Folder

## Objetivo
Crear la carpeta de evidencia **antes** de ejecutar el test.

## Pasos
1. Usar la convención del skill `evidence-generator` para construir la ruta:
   `evidence/{sourceFile}/{ticketId}/`
2. Crear la carpeta si no existe.

## Salida esperada
- `evidenceDir` con la ruta final creada.
