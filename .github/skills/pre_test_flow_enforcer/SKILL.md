---
name: pre_test_flow_enforcer
description: Enforce ejecución de setup_test_session antes de navegar o interactuar; prohíbe leer URL/password manualmente.
---

# Skill: Pre-Test Flow Enforcer

## Objetivo
Garantizar el orden de ejecución correcto antes de cualquier interacción UI.

## Reglas
- Ejecutar `setup_test_session` y esperar `Ready`.
- No leer URL o credenciales manualmente.
- No navegar antes del setup.

## Uso
Invocar **al inicio** de cualquier ejecución de test.
