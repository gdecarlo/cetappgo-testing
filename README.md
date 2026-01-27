# Documentación del Repositorio de Pruebas - CetApp Go

Este repositorio contiene la documentación, configuración y herramientas necesarias para realizar pruebas E2E y de UI para la aplicación **CetApp Go** utilizando Playwright y Agentes de IA.

## Estructura de Archivos

### Configuración e Instrucciones (.vscode/)

- **`agents.md`**
  - **Función:** Define las reglas de comportamiento y directrices para los agentes de IA (como GitHub Copilot o agentes de Playwright).
  - **Detalle:** Incluye reglas críticas como la prohibición de renderizar imágenes en el chat y el enfoque en logs de texto y estructuras JSON.

- **`cetappgo-code-summary.md`**
  - **Función:** Resumen técnico de la base de código de "CetApp Go".
  - **Detalle:** Describe la arquitectura de módulos, rutas principales y permisos. Vital para diseñar estrategias de prueba alineadas con la estructura real de la app.

- **`product-specification.md`**
  - **Función:** Documento de especificación del producto.
  - **Detalle:** Visión general de "CetApp Go" como plataforma EHSQ, propósito y stack tecnológico.

- **`testing-instructions.md`**
  - **Función:** Instrucciones para la ejecución de pruebas.
  - **Detalle:** Protocolos de login, URLs de entornos y manejo de credenciales.

### Habilidades de Agentes (.github/skills/)

Estas "skills" son extensiones funcionales que permiten a los agentes realizar tareas complejas de forma autónoma.

- **`optimize-images`**
  - **Función:** Optimización automática de recursos visuales.
  - **Detalle:** Reduce el tamaño de imágenes PNG/JPG generadas como evidencia sin perder calidad visual. Se utiliza típicamente antes de generar reportes.

- **`evidence-generator`**
  - **Función:** Gestión estructurada de evidencia.
  - **Detalle:** Define y organiza la carpeta de evidencia jerárquica (por Nombre de Archivo / Ticket) dentro de `.playwright-mcp/evidence`.

- **`test-login`**
  - **Función:** Flujo de autenticación reutilizable.
  - **Detalle:** Contiene la lógica automatizada para realizar el login en CetApp Go, sirviendo como pre-condición para otros tests.

### Prompts de Ingeniería (prompts/)

Plantillas diseñadas para obtener los mejores resultados de los modelos de IA.

- **`generar-casos-con-rovo.md`**
  - **Función:** Prompt maestro para generación de tests.
  - **Detalle:** Guía al agente para actuar como un QA Automation Senior, analizando Historias de Usuario y generando tablas de casos de prueba formateadas correctamente con enfoque en Playwright.

### Configuración MCP (.playwright-mcp/)

- **`evidence/`**
  - Directorio destino donde se almacenan capturas, videos y trazas de las pruebas ejecutadas, estructuradas por el skill `evidence-generator`.

---
*Documentación actualizada automáticamente.*
