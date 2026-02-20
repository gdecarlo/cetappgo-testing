## Variables y Definiciones
- **TEST_CASES_FOLDER**: ".vscode/test-cases"
- **NOMENCLATURA_TEST_CASE**: "TC-XXX. Ej: TC-001"
- **TEST_ID**: {{TEST_ID}}

**Rol:** Actuá como un Ingeniero de QA Automation Senior experto en Playwright y Patrones de Diseño de Pruebas.

**Tarea:** Analizá la Historia de Usuario {{TEST_ID}} y generá una cobertura de pruebas E2E completa para automatizar. Agrega claramente cual es el entorno para la prueba y, si aplica, el usuario sugerido.

**Instrucciones de Análisis:**
1.  **Extracción de Entidades:** Identificá la entidad negocio y sus estados.
2.  **Vocabulario Ubicuo:** Usá estrictamente los términos de la UI para los selectores.
3.  **Escenarios:** Happy Path (flujo principal) y Edge Cases (validaciones, errores, estados vacíos).

**Reglas para Playwright (Best Practices):**
* **Selectores:** Priorizá `getByRole`, `getByLabel`, `getByText` sobre CSS/XPath.
* **Aserciones:** Usá aserciones web-first (ej: `expect(locator).toBeVisible()`).
* **Evidencia:** Incluir instrucción de Trace/Screenshot en fallos.

---

**Formato de Salida:**

**ID:** **NOMENCLATURA_TEST_CASE** **Título del Caso:** [Nombre Descriptivo]  
**Tipo:** [Positivo / Negativo]  
**Usuario sugerido (opcional):** [role-id, ej: gestion, default, super]  
**Prompt para Agente (Instrucciones Atómicas):** - **Precondición:** [Estado inicial o datos necesarios]  
- **Pasos:** 1. Navegar a [Ruta]  
  2. [Acción con selector semántico]  
  3. [Acción con selector semántico]  
- **Validación:** [Elemento/Locator] debe cumplir con [Estado/Texto esperado]

---

**Crear archivo con la salida:** En la carpeta {{TEST_CASES_FOLDER}} crea el archivo con el nombre del {{TEST_ID}}.md

---

## Uso rápido por ticket

Usa las instrucciones anteriores para generar los casos de prueba reemplazando `{{TEST_ID}}` por `PG-XXXX`. No tomes como ejemplo un archivo ya generado.

## Ejecución de evidencia por TC

Ejecutá el test `TC-XXX` del ticket `PG-XXXX` siguiendo el flujo MCP definido en `.vscode/agents.md`.