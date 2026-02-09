# Product Specification Document: CetApp Go

## 1. Product Overview

**Product Name:** CetApp Go  
**Description:** A comprehensive Enterprise Health, Safety, and Quality (EHSQ) management platform designed to streamline operational processes, risk management, and compliance tracking. The application serves as a centralized hub for managing inspections, incidents, training, and documentation to ensure organizational safety and regulatory compliance.

## 2. Technical Architecture

### Core Stack

- **Frontend Framework:** Vue 3 (Composition API)
- **Language:** TypeScript
- **Build Tool:** Vite
- **State Management:** Pinia (with persistence plug-in)
- **UI Component Library:** PrimeVue
- **Styling:** UnoCSS, SCSS
- **Routing:** Vue Router
- **Maps:** Vue Google Map

### Development Tools

- **Linting & Formatting:** ESLint, Prettier
- **Git Hooks:** Husky (Commitlint, Pre-commit checks)
- **Testing:** Vitest (Unit Tests)
- **API Client:** Axios
- **CI/CD:** Azure Pipelines

## 3. Core Modules & Features

Based on the project structure and routing configuration, the application consists of the following key modules:

### 3.1. Risk & Safety Management

- **Gestion Riesgo (Risk Management):** Identification and assessment of operational risks using Matrix methodologies.
- **Gestion Peligro (Danger Management):** Specific handling and classification of workplace hazards.
- **MSDS (Material Safety Data Sheets):** Digital management of chemical safety data sheets and product approval workflows.
- **EPP (Personal Protective Equipment):** Management of PPE inventory, assignment, and delivery tracking.

### 3.2. Incident & Action Tracking

- **Incidente (Incidents):** End-to-end reporting and investigation workflows for workplace incidents (including root cause analysis).
- **Hallazgo (Findings):** Tracking of deviations found during audits or inspections.
- **Gestion Acciones (Action Management):** Centralized system for Corrective and Preventive Actions (CAPA) and task tracking.
- **Observaciones (Observations):** Reporting mechanism for unsafe acts or conditions.

### 3.3. Inspections & Compliance

- **Inspecciones (Inspections):** Planning and execution of safety and quality inspections.
- **Plantillas (Templates):** Dynamic form builder for creating custom checklists for inspections, incidents, and observations.
- **Permisos Trabajo (Work Permits):** Digital issuance and approval flow for high-risk work permits (PTW).

### 3.4. Operational Management

- **Gestión Documental:** Repository for controlling internal documents and procedures.
- **Capacitaciones (Trainings):** Management of training plans and attendance records.
- **Mediciones (Measurements):** Recording of industrial hygiene and environmental metrics.
- **Tableros (Dashboards):** Visual analytics tools with KPI widgets using Chart.js.
- **Inventario:** Inventory control systems.

### 3.5. Administration

- **Users & Accounts:** Comprehensive user management including roles and permissions.
- **Configuracion:** Global system settings and master data management (Companies, Hierarchies, Brands).
- **Institucional:** Corporate information display.

## 4. Key Functional Capabilities

- **Dynamic Forms:** Robust capability to generate complex forms from JSON templates using components like `AppBasicForm`.
- **Internationalization (i18n):** Multi-language support (English/Spanish) enabled via Vue I18n.
- **File Management:** Integrated file upload and handling for attachments and evidence.
- **Interactive UI:** Advanced user interface elements including complex data tables, modal dialogs, and tree selectors.
- **Rich Text Editing:** Content creation supported by TipTap editor.
- **Data Visualization:** Interactive charts and calendars for data analysis and scheduling.
- **PDF Generation:** Client-side PDF creation and manipulation.

## 5. Development Standards

- **Component Structure:** Modular architecture leveraging `auto-imports` and `unplugin-vue-components` for efficiency.
- **Commit Convention:** Strict adherence to Conventional Commits enforced by Commitlint.
- **Type Safety:** High-standard TypeScript configuration to ensure code reliability.
- **Code Quality:** Automated linting and formatting pipelines to maintain code consistency.
