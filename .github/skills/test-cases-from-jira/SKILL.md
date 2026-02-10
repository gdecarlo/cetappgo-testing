---
name: test-cases-from-jira
description: Generar casos de prueba E2E desde tickets Jira con formato Playwright. Usar cuando el prompt pida “genera los casos de prueba para el ticket PG-XXXX”, “generá casos para PG-XXXX” o variantes equivalentes.
---

# test-cases-from-jira

## Flujo

1. Leer el archivo de instrucciones en [prompts/generar-casos-desde-jira.md](prompts/generar-casos-desde-jira.md) y seguirlo.
2. Analizar el ticket solicitado (PG-XXXX) y extraer el campo **Ambiente de Test**.
3. Normalizar el ambiente:
   - Si el campo contiene “test 1”, “test1” o “t1”, usar **test 1**.
   - Si el campo contiene “test 2”, “test2” o “t2”, usar **test 2**.
   - Si no se puede inferir, pedir aclaración al usuario antes de generar la salida.
4. Generar los casos de prueba con el formato indicado en el archivo de instrucciones.
5. Crear el archivo en `.vscode/test-cases` con el nombre `PG-XXXX.md`.
6. Incluir en el archivo generado una línea explícita: **ambiente de pruebas: test X** (usar el número detectado).

## Reglas

- Reemplazar `{{TEST_ID}}` por el ticket solicitado (PG-XXXX).
- No usar ejemplos previos; seguir únicamente el formato indicado por las instrucciones.
- Mantener el vocabulario de la UI y las mejores prácticas de Playwright indicadas en el archivo de instrucciones.
