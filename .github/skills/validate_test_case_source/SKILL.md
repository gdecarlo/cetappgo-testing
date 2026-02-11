---
name: validate_test_case_source
description: Validar y extraer el origen del test case (.md), el ticket-id y el nombre del archivo origen antes de ejecutar pruebas; usar cuando se lea un test case para determinar ticket y archivo fuente.
---

# Skill: Validate Test Case Source

## Objetivo
Asegurar que el test case tiene **origen y ticket-id claros** antes de ejecutar cualquier prueba.

## Pasos
1. Leer el archivo `.md` del test case indicado por el usuario.
2. Extraer:
   - `ticketId`: identificador del caso (ej: `TC-001`, `tc-001`, `tc001`).
   - `sourceFile`: nombre del archivo origen sin extensión (ej: `pg-3154`).
3. Validar unicidad:
   - Si hay **más de un** `ticketId` o `sourceFile`, detener y pedir confirmación.
   - Si **no** hay valores válidos, detener y pedir aclaración.

## Criterios de validación
- `ticketId` debe ser alfanumérico y contener al menos un número.
- `sourceFile` no debe incluir extensión ni rutas.

## Salida esperada
Un objeto con:
- `ticketId`
- `sourceFile`
- `testCasePath`
