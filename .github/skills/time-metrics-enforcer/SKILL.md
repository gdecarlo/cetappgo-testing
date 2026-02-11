---
name: time-metrics-enforcer
description: Asegurar el registro de tiempos (evidenceStartTime/evidenceEndTime/reportGenerationStartTime/reportGenerationEndTime) y su inclusión en el reporte HTML/PDF al ejecutar casos de prueba.
---

# Time Metrics Enforcer

## Cuándo usar
Usar **siempre** que el usuario solicite ejecutar un test case (ej: "ejecuta TC-001", "corre el test").

## Objetivo
Garantizar que los tiempos de evidencia y de generación de reporte se registren y se incluyan en el HTML.

## Flujo obligatorio
1. **Al recibir el pedido del usuario**, registrar `evidenceStartTime` (timestamp ISO o epoch ms) **antes de cualquier acción**.
2. **Justo antes de generar el HTML**, registrar `evidenceEndTime`.
3. **Al iniciar la generación del HTML**, registrar `reportGenerationStartTime`.
4. **Al finalizar la escritura del HTML**, registrar `reportGenerationEndTime`.
5. Calcular:
   - `evidenceDurationMs = evidenceEndTime - evidenceStartTime`
   - `reportGenerationDurationMs = reportGenerationEndTime - reportGenerationStartTime`
6. Convertir a formato humano:
   - `evidenceDurationHuman`
   - `reportGenerationDurationHuman`
7. Incluir estas métricas en el reporte HTML:
   - `{{EVIDENCE_DURATION_MS}}`, `{{EVIDENCE_DURATION_HUMAN}}`
   - `{{REPORT_GENERATION_DURATION_MS}}`, `{{REPORT_GENERATION_DURATION_HUMAN}}`
8. Verificar que el HTML generado contiene los cuatro valores anteriores.

## Reglas
- No omitir el registro de tiempos aunque el test falle.
- Si un paso falla, registrar el tiempo hasta el punto de fallo y reflejarlo en el reporte.
- Mantener consistencia de formato entre ejecuciones.

## Validación mínima
- El HTML final debe mostrar **tiempo de evidencia** y **tiempo de generación de reporte** con valor numérico y humano.
