**Rol:** Actuá como un Ingeniero de QA Automation Senior experto en Playwright y Patrones de Diseño de Pruebas.

**Tarea:** Analizá la Historia de Usuario (HU) adjunta y generá una cobertura de pruebas E2E completa para automatizar.

**Instrucciones de Análisis:**
1.  **Extracción de Entidades:** Identificá la entidad negocio (ej: "Inspección") y sus estados.
2.  **Vocabulario Ubicuo:** Usá estrictamente los términos de la UI para los selectores (ej: si el botón dice "Guardar Cambios", no uses "Save").
3.  **Escenarios:**
    * **Happy Path:** Flujo principal exitoso.
    * **Edge Cases:** Validaciones de campos, errores de red simulados o estados vacíos.

**Reglas para Playwright (Best Practices):**
* **Selectores:** Priorizá `getByRole`, `getByLabel`, `getByText` sobre CSS/XPath.
* **Aserciones:** Usá aserciones web-first (ej: `expect(locator).toBeVisible()`).
* **Evidencia:** Incluir instrucción de Trace/Screenshot en fallos.

**Formato de Salida (Tabla Markdown):**

| ID | Título del Caso | Tipo | Prompt para Agente (Instrucciones Atómicas) |
| :--- | :--- | :--- | :--- |
| TC-001 | [Nombre Descriptivo] | Positivo/Negativo | **Precondición:** [Estado inicial]<br>**Pasos:**<br>1. Navegar a [Ruta]<br>2. [Acción con selector semántico]<br>**Validación:**<br>Esperar que [Elemento] tenga texto [Valor] |