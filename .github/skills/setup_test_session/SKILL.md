---
name: setup_test_session
description: Configurar sesión de pruebas UI con Playwright MCP. Usar antes de ejecutar cualquier caso de prueba para leer .vscode/config.md, resolver ambiente, abrir el browser, limpiar storage, ejecutar login con las credenciales/selectores del archivo y retornar "Ready". Prohíbe lectura manual de URL/password y navegación previa.
---

# setup_test_session

## Objetivo
Preparar una sesión de pruebas lista para ejecutar casos.

## Flujo obligatorio
1. Leer `.vscode/config.md`.
2. Determinar el ambiente de pruebas:
   - Si el test case indica `ambiente de pruebas: test 1` o `test 2`, usar ese ambiente.
   - Si no hay ambiente explícito, usar la URL por defecto (local).
3. Seleccionar la URL y credenciales correspondientes del archivo.
4. Abrir el browser y navegar a la URL seleccionada.
5. Limpiar `localStorage` y `sessionStorage` con `page.evaluate`.
6. Recargar la página para forzar la pantalla de login.
7. Completar login usando los selectores de `.vscode/config.md`.
8. Esperar confirmación de login (el formulario desaparece o aparece el dashboard).
9. Retornar "Ready".

## Reglas
- No leer URL ni password fuera de este skill.
- No navegar a la URL antes de ejecutar este skill.
- Usar únicamente los datos de `.vscode/config.md`.
