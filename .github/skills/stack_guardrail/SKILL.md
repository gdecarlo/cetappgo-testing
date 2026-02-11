---
name: stack_guardrail
description: Guardrail global que define el stack tecnológico cerrado del proyecto. Ejecutar ANTES de cualquier acción que involucre herramientas o dependencias.
---

# Skill: Stack Guardrail

## Objetivo
Prevenir la instalación o uso de herramientas fuera del stack definido.

## Stack Tecnológico CERRADO

### Dependencias autorizadas (package.json)

| Dependencia | Versión | Propósito autorizado |
|-------------|---------|----------------------|
| `playwright` | ^1.58.0 | Solo para script `html_to_pdf.js` |
| `@playwright/test` | ^1.58.0 | Referencia — NO ejecutar CLI |
| `sharp` | ^0.34.5 | Optimización de imágenes |
| `glob` | ^13.0.0 | Búsqueda de archivos |

### Herramientas MCP autorizadas

| Prefijo | Propósito |
|---------|-----------|
| `mcp_playwright_browser_*` | Interacción con browser |
| `activate_page_capture_tools` | Capturas de pantalla |
| `activate_form_and_file_management_tools` | Formularios |

### Scripts Node.js autorizados

| Script | Ruta |
|--------|------|
| `html_to_pdf.js` | `.github/skills/generate_pdf_report/scripts/html_to_pdf.js` |
| `optimize-images.js` | `.github/skills/optimize-images/optimize-images.js` |

## Herramientas PROHIBIDAS

### Automatización de browser (PROHIBIDO)
- ❌ Puppeteer
- ❌ Selenium / WebDriver
- ❌ Cypress
- ❌ TestCafe
- ❌ WebDriverIO
- ❌ Nightmare.js
- ❌ PhantomJS

### Frameworks de testing CLI (PROHIBIDO)
- ❌ Jest
- ❌ Mocha
- ❌ Jasmine
- ❌ Vitest
- ❌ AVA

### Comandos de instalación (PROHIBIDO)
- ❌ `pnpm add <cualquier-herramienta-de-testing>`
- ❌ `npm install <cualquier-herramienta-de-testing>`
- ❌ `yarn add <cualquier-herramienta-de-testing>`

### Comandos CLI de testing (PROHIBIDO)
- ❌ `pnpm test`
- ❌ `npm test`
- ❌ `npx playwright test`
- ❌ `npx cypress run`
- ❌ `npx jest`

## Reglas de ejecución

### Antes de cualquier acción, verificar:
1. ¿La herramienta está en la lista de autorizadas? → Si NO, **DETENER**
2. ¿El comando instala una dependencia nueva? → Si SÍ, **DETENER**
3. ¿Se está generando código `.spec.ts`? → Si SÍ, **DETENER**

### Ante errores o limitaciones:
1. **REPORTAR** el problema específico
2. **SOLICITAR** instrucciones al usuario
3. **NUNCA** proponer herramientas alternativas
4. **NUNCA** ejecutar instalaciones de dependencias

## Ejemplo de flujo correcto

```
Usuario: "Ejecuta TC-001"

✅ CORRECTO:
1. Ejecutar skill setup_test_session
2. Usar mcp_playwright_browser_navigate
3. Usar mcp_playwright_browser_click
4. Usar activate_page_capture_tools
5. Ejecutar node optimize-images.js
6. Generar HTML
7. Ejecutar node html_to_pdf.js

❌ INCORRECTO:
1. "Voy a instalar Puppeteer para tomar screenshots"
2. "Necesito Selenium para interactuar con el browser"
3. "Creo un archivo test.spec.ts para ejecutar las pruebas"
```

## Validación final

Al terminar cualquier tarea, verificar:
- [ ] ¿Se usaron solo herramientas MCP autorizadas?
- [ ] ¿Se ejecutaron solo scripts autorizados?
- [ ] ¿No se instalaron dependencias nuevas?
- [ ] ¿No se crearon archivos `.spec.ts`?

Si alguna respuesta es NO, la ejecución fue **incorrecta**.
