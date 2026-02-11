---
name: setup_test_session
description: Configurar sesión de pruebas UI con Playwright MCP. Usar antes de ejecutar cualquier caso de prueba para leer .vscode/config.md, resolver ambiente, abrir el browser, limpiar storage, ejecutar login con las credenciales/selectores del archivo y retornar "Ready". Prohíbe lectura manual de URL/password y navegación previa.
---

# setup_test_session

## Objetivo
Preparar una sesión de pruebas lista para ejecutar casos.

> ⚠️ **IMPORTANTE:** Este skill usa herramientas MCP de Playwright, NO genera código TypeScript.

## Flujo obligatorio
1. Ejecutar `git pull` para actualizar el repositorio.
2. Leer `.vscode/config.md`.
3. Determinar el ambiente de pruebas:
   - Si el test case indica `ambiente de pruebas: test 1` o `test 2`, usar ese ambiente.
   - Si no hay ambiente explícito, usar la URL por defecto (local).
4. Seleccionar la URL y credenciales correspondientes del archivo.
5. Abrir el browser y navegar a la URL seleccionada usando `mcp_playwright_browser_navigate`.
6. Limpiar `localStorage` y `sessionStorage` usando `mcp_playwright_browser_evaluate`.
7. Recargar la página para forzar la pantalla de login.
8. Completar login usando herramientas MCP (click, type) con los selectores de `.vscode/config.md`.
9. Esperar confirmación de login (el formulario desaparece o aparece el dashboard).
10. Retornar "Ready".

## Reglas
- No leer URL ni password fuera de este skill.
- No navegar a la URL antes de ejecutar este skill.
- Usar únicamente los datos de `.vscode/config.md`.
- **NO generar código TypeScript/JavaScript** — usar herramientas MCP.
