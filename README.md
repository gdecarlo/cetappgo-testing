# Documentación del Repositorio de Pruebas - CetApp Go

Este repositorio contiene la documentación, configuración y herramientas necesarias para ejecutar pruebas E2E/UI de **CetApp Go** con **Playwright MCP** y agentes de IA.

## Inicio rapido (no tecnico)

### 1) Generar casos desde Jira
Genera los casos de prueba para el ticket PG-XXXX

### 2) Ejecutar un caso
Ejecuta el TC-XXX

## Estructura de Archivos

### Configuración e Instrucciones (.vscode/)

- **`agents.md`**
  - **Función:** Define las reglas de comportamiento y directrices para los agentes de IA (como GitHub Copilot o agentes de Playwright).
  - **Detalle:** Incluye reglas críticas como la prohibición de renderizar imágenes en el chat y el enfoque en logs de texto y estructuras JSON.

- **`config.md`**
  - **Función:** Fuente única de URLs, credenciales y selectores de login por ambiente.

- **`mcp.json`**
  - **Función:** Configuración de herramientas MCP para Playwright.

- **`cetappgo-code-summary.md`**
  - **Función:** Resumen técnico de la base de código de "CetApp Go".
  - **Detalle:** Describe la arquitectura de módulos, rutas principales y permisos. Vital para diseñar estrategias de prueba alineadas con la estructura real de la app.

- **`product-specification.md`**
  - **Función:** Documento de especificación del producto.
  - **Detalle:** Visión general de "CetApp Go" como plataforma EHSQ, propósito y stack tecnológico.

- **`testing-instructions.md`**
  - **Función:** Instrucciones para la ejecución de pruebas.
  - **Detalle:** Protocolos de login, URLs de entornos y manejo de credenciales.

- **`test-cases/`**
  - **Función:** Casos de prueba en formato markdown, consumidos por los agentes.

### Habilidades de Agentes (.github/skills/)

Estas "skills" son extensiones funcionales que permiten a los agentes realizar tareas complejas de forma autónoma.

- **`commits`**
  - **Función:** Estandarización de commits.
  - **Detalle:** Estructura la generación de commits siguiendo el formato Conventional Commits.

- **`evidence-generator`**
  - **Función:** Gestión estructurada de evidencia.
  - **Detalle:** Define la estructura jerárquica de evidencia (por Nombre de Archivo / Ticket).

- **`ensure_evidence_folder`**
  - **Función:** Crea la carpeta de evidencia antes de ejecutar tests.

- **`capture_error_screenshot`**
  - **Función:** Capturas estandarizadas ante errores o validaciones críticas.

- **`generate_html_report`**
  - **Función:** Generación de reporte HTML final con evidencias.

- **`generate_pdf_report`**
  - **Función:** Generación de reporte PDF a partir de un HTML existente.
  - **Detalle:** Usa el script oficial y guarda el PDF en la misma carpeta.

- **`final_response_formatter`**
  - **Función:** Respuesta final estándar con Status/JSON/archivos.

- **`mcp_tools_guard`**
  - **Función:** Bloquea acciones prohibidas (CLI, `.spec.ts`, `playwright.config.ts`).

- **`pre_test_flow_enforcer`**
  - **Función:** Enforce de setup antes de navegar o interactuar.

- **`setup_test_session`**
  - **Función:** Setup de sesión (lee `config.md`, limpia storage, login, retorna Ready).

- **`stack_guardrail`**
  - **Función:** Guardrail global del stack tecnológico permitido.
  - **Detalle:** Bloquea herramientas, comandos y dependencias fuera de la lista autorizada.

- **`validate_test_case_source`**
  - **Función:** Valida origen del caso de prueba y extrae `ticketId`/`sourceFile`.

- **`evidence_paths_guard`**
  - **Función:** Evita renderizado de imágenes en chat.

- **`optimize-images`**
  - **Función:** Optimización automática de recursos visuales.
  - **Detalle:** Reduce el tamaño de imágenes PNG/JPG generadas como evidencia sin perder calidad visual. Se utiliza típicamente antes de generar reportes.

- **`test-cases-from-jira`**
  - **Función:** Generación de casos de prueba desde tickets Jira.

- **`time-metrics-enforcer`**
  - **Función:** Registro de tiempos de evidencia y de generacion de reportes.
  - **Detalle:** Exige metricas en HTML/PDF (inicio, fin y duraciones).

- **`readme`**
  - **Función:** Mantenimiento de documentación.
  - **Detalle:** Pautas para mantener este archivo README.md actualizado y sincronizado con la estructura del proyecto.

### Prompts de Ingeniería (prompts/)

Plantillas diseñadas para obtener los mejores resultados de los modelos de IA.

- **`generar-casos-desde-jira.md`**
  - **Función:** Prompt maestro para generar casos desde Jira, con secciones de uso rápido por ticket y ejecución de evidencia por TC.

### Evidencia (.playwright-mcp/ y evidence/)

- **`.playwright-mcp/evidence/`**
  - Área temporal usada por Playwright MCP para capturas.

- **`evidence/`**
  - Carpeta final de evidencias, reportes HTML y resultados consolidados.

## Instalación y Uso

### Requisitos Previos

- Node.js (v16 o superior)
- npm o pnpm

### Instalación

1. Clonar el repositorio.
2. Instalar dependencias:
   ```bash
   pnpm install
   # o
   npm install
   ```

### Ejecución de Pruebas

Las pruebas se ejecutan **exclusivamente** con Playwright MCP y el flujo definido en [./.vscode/agents.md](.vscode/agents.md). No se utilizan comandos CLI de Playwright en este repositorio.

---
*Documentación actualizada para el flujo MCP y skills vigentes.*
