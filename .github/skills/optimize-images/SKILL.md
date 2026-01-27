---
name: optimize-images
version: 1.1.0
description: Optimiza imágenes PNG/JPG de evidencia reduciendo tamaño sin perder calidad visual (ejecución automática pre-reporte)
---

# Skill: Optimize Images

Este skill **optimiza automáticamente las capturas de pantalla** generadas durante la ejecución de tests, reduciendo su peso significativamente mientras mantiene la calidad visual necesaria para reportes.

## Cuándo usar

Este skill se ejecuta **AUTOMÁTICAMENTE** como paso previo a la generación del reporte HTML cuando se ejecuta un test con el comando `ejecuta el test TC-XXX`. 

**Flujo de ejecución de tests:**
1. Ejecutar test case y capturar screenshots
2. **→ OPTIMIZAR IMÁGENES** (este skill)
3. Generar reporte HTML con imágenes optimizadas

## Ejecución automática

**El agente ejecuta este skill automáticamente** como parte del flujo de testing, inmediatamente después de capturar todas las evidencias y **antes de generar el reporte HTML**.

### Comando ejecutado internamente

```powershell
node .github/skills/optimize-images/optimize-images.js .playwright-mcp/evidence/{mdFileName}/{ticketId}
```

### Ejemplos de ejecución automática

Cuando el usuario ejecuta:
```
ejecuta el test TC-001
```

El agente ejecuta automáticamente:
```powershell
# 1. Capturar evidencias → tc001_*.png
# 2. OPTIMIZAR (este skill):
node .github/skills/optimize-images/optimize-images.js .playwright-mcp/evidence/agenda/tc001
# 3. Generar reporte HTML → tc001_reporte.html
```

### Ejecución manual (opcional)

También puede ejecutarse manualmente si es necesario:
```powershell
node .github/skills/optimize-images/optimize-images.js .playwright-mcp/evidence/agenda/tc005
```

## Comportamiento

1. **Busca recursivamente** archivos `.png`, `.jpg`, `.jpeg` en la carpeta especificada.
2. **Omite archivos ya optimizados** (aquellos que contengan `_opt` en el nombre).
3. **Reemplaza los archivos originales** con versiones optimizadas (mantiene el mismo nombre).
4. **Reporta** el porcentaje de reducción logrado por cada imagen.

## Configuración de calidad

| Formato | Calidad | Nivel compresión |
|---------|---------|------------------|
| JPEG    | 80%     | mozjpeg enabled  |
| PNG     | 80%     | Level 9, palette |

> **Nota:** Calidad 80 es el punto óptimo entre peso y calidad visual para capturas de interfaz.

## Dependencias

```json
{se integra automáticamente con `evidence-generator` en el flujo de testing:

**Secuencia de ejecución (AUTOMÁTICA):**
```
┌─────────────────────────────────────────────┐
│ Usuario: "ejecuta el test TC-005"          │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│ 1. Crear carpeta evidencia:                │
│    .playwright-mcp/evidence/agenda/tc005   │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│ 2. Ejecutar test y capturar screenshots    │
│    - tc005_paso1.png                       │
│    - tc005_paso2.png                       │
│    - tc005_resultado.png                   │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│ 3. OPTIMIZAR IMÁGENES (optimize-images)    │
│    node .github/skills/.../optimize.js ... │
│    → Reducir peso 60-70%                   │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│ 4. Generar reporte HTML                    │
│    - tc005_reporte.html                    │
│    - Referencias: tc005_*.png (optimizadas)│
└─────────────────────────────────────────────┘
```

**Ventajas de la optimización pre-reporte:**
- ✅ Reportes HTML más livianos
- ✅ Carga más rápida en navegador
- ✅ Menor consumo de disco
- ✅ Sin pérdida visual perceptible
Este skill complementa al skill `evidence-generator`. El flujo recomendado es:

1. Ejecutar test case y generar capturas
2. Generar reporte HTML
3. **Ejecutar optimize-images** sobre la carpeta del ticket
4. Verificar que las imágenes en el HTML se vean correctamente

### Ejemplo de flujo completo

```powershell
# Después de completar TC-005 y generar su reporte:
node .github/skills/optimize-images/optimize-images.js .playwright-mcp/evidence/agenda/tc005
```

## Salida esperada

```
📁 Optimizando imágenes en: .playwright-mcp/evidence/agenda/tc005
🔍 Encontradas 4 imágenes. Procesando...

✅ tc005_programacion_previa_creada.png: 245 KB → 89 KB (-63.7%)
✅ tc005_formulario_conflicto_horario.png: 312 KB → 102 KB (-67.3%)
✅ tc005_mensaje_error_inspector_ocupado.png: 156 KB → 51 KB (-67.3%)
✅ tc005_calendario_sin_duplicado.png: 287 KB → 94 KB (-67.2%)

📊 Total: 4 imágenes optimizadas. Ahorro total: 664 KB
```

## Notas

- Los archivos originales son **reemplazados** (no se mantiene backup).
- Si una imagen no puede reducirse más, se mantiene el original.
- El script es idempotente: ejecutarlo múltiples veces no degrada la calidad adicional.
