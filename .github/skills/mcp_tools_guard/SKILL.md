---
name: mcp_tools_guard
description: Enforce uso exclusivo de Playwright MCP y bloquear acciones prohibidas (no .spec.ts, no playwright.config.ts, no CLI tests).
---

# Skill: MCP Tools Guard

## Objetivo
Evitar acciones prohibidas antes y durante la ejecución de pruebas.

## Reglas obligatorias
- No crear archivos `.spec.ts`.
- No crear ni modificar `playwright.config.ts`.
- No ejecutar comandos de testing por CLI (`pnpm test`, `npx playwright test`, etc.).
- Usar exclusivamente herramientas MCP de Playwright para interacción UI.

## Uso
Ejecutar este guard **antes** de iniciar cualquier flujo de test.
