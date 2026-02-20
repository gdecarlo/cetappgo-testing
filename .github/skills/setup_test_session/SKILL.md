---
name: setup_test_session
description: Configurar sesión de pruebas UI con Playwright MCP. Usar antes de ejecutar cualquier caso de prueba para leer .vscode/config.md, resolver ambiente, abrir el browser, limpiar storage, ejecutar login con credenciales desde .env y selectores del archivo y retornar "Ready". Prohíbe lectura manual de URL/password y navegación previa.
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
4. Determinar el rol de usuario:
   - Si el test case incluye `usuario: <role-id>`, usarlo como sugerencia inicial.
   - Si no hay `usuario`, inferir por permisos/modulos segun reglas de `.vscode/config.md`.
   - Mostrar un prompt interactivo (ask_questions) para que el usuario confirme o haga override del rol.
5. Resolver credenciales desde `.env` usando la convencion `{ENV}_USER_{ROLE}` y `{ENV}_PASS_{ROLE}`.
   - Si faltan credenciales para el rol seleccionado, volver a preguntar y elegir otro rol.
6. Abrir el browser y navegar a la URL seleccionada usando `mcp_playwright_browser_navigate`.
7. Limpiar `localStorage` y `sessionStorage` usando `mcp_playwright_browser_evaluate`.
8. Recargar la página para forzar la pantalla de login.
9. Completar login usando herramientas MCP (click, type) con los selectores de `.vscode/config.md`.
10. Esperar confirmación de login (el formulario desaparece o aparece el dashboard).
11. Retornar "Ready".

## Reglas
- No leer URL ni password fuera de este skill.
- No navegar a la URL antes de ejecutar este skill.
- Usar `.vscode/config.md` para URLs, selectores y reglas de rol.
- Usar `.env` para credenciales (no versionadas).
- **NO generar código TypeScript/JavaScript** — usar herramientas MCP.
