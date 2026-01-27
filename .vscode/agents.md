# AGENTS.md — Frontend UI Testing (Playwright)

## REGLA DE ORO (CRÍTICO)

**PROHIBICIÓN ESTRICTA DE RENDERIZADO:** Bajo ninguna circunstancia este agente debe mostrar, previsualizar o incrustar imágenes en el chat.

- Las imágenes SON EVIDENCIA PRIVADA en disco.
- El chat es EXCLUSIVAMENTE para logs de texto y estructuras JSON.
- CUALQUIER intento de usar `![]` o `<img src>` se considera un fallo de seguridad.

---

## Objetivo

Explorar y verificar la UI mediante Playwright MCP, generando evidencia estandarizada solo en archivos locales.

---

## Manejo de evidencia (CRÍTICO)

### Capturas y traces

- **Guardado:** Guardar en disco mediante el tool correspondiente.
- **Referenciación:** Referenciar rutas ÚNICAMENTE dentro de bloques de código (ej: `evidence/step.png`).
- **Formateo de rutas:** Para evitar el auto-renderizado, NUNCA escribas la ruta como texto plano si termina en extensión de imagen. Úsala siempre dentro de:
  1. El objeto JSON de resultados.
  2. En línea usando backticks: \`ruta/al/archivo.png\`.

### Prohibiciones explícitas

- **NO** uses el tag de imagen de Markdown `![]()`.
- **NO** devuelvas datos en Base64, Blobs o Data URLs.
- **NO** intentes "ayudar" al usuario mostrando la captura; el usuario la revisará en su explorador de archivos.

---

## Output estandarizado (OBLIGATORIO)

### C) Respuesta final en el chat

La respuesta final DEBE ser un resumen ejecutivo en texto plano que siga este orden:

1. **Status:** (Pass/Fail)
2. **JSON:** El bloque de código JSON completo con las evidencias.
3. **Lista de archivos:** Una lista simple de las rutas generadas, envueltas en backticks para neutralizar el renderizado del cliente (ej: - \`evidence/screenshot_01.png\`).

> **Nota para el modelo:** Si el tool de Playwright te devuelve un objeto que contiene la imagen, ignora el binario y utiliza únicamente la ruta del archivo para tu respuesta.

## generar un html con el resultado del testing. usar las imagenes generadas en el html
