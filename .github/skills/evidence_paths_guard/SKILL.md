---
name: evidence_paths_guard
description: Evitar renderizado de imágenes; asegurar que rutas de evidencia se mencionen solo en JSON o backticks.
---

# Skill: Evidence Paths Guard

## Objetivo
Prevenir renderizado de imágenes y fugas de evidencia.

## Reglas
- No usar `![]()` ni `<img>`.
- No incluir base64/Blob/Data URLs.
- Las rutas de imágenes deben aparecer **solo** en:
  1) Bloque JSON de evidencias.
  2) Lista de archivos con backticks.
