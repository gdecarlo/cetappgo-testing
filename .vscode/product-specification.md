# Product Specification Document: CetApp Go

## 1. Product Overview

**Product Name:** CetApp Go  
**Description:** A comprehensive Enterprise Health, Safety, and Quality (EHSQ) management platform designed to streamline operational processes, risk management, and compliance tracking. The application serves as a centralized hub for managing inspections, incidents, training, and documentation.

## 2. Technical Architecture

### Core Stack

- **Frontend Framework:** Vue 3 (Composition API)
- **Language:** TypeScript
- **Build Tool:** Vite
- **State Management:** Pinia
- **UI Component Library:** PrimeVue
- **Styling:** UnoCSS, SCSS
- **Routing:** Vue Router

### Development Tools

- **Linting & Formatting:** ESLint, Prettier
- **Git Hooks:** Husky (Commitlint, Pre-commit checks)
- **Testing:** Vitest (Unit Tests)
- **API Client:** Axios

## 3. Core Modules & Features

Based on the project structure and routing configuration, the application consists of the following key modules:

### 3.1. Risk & Safety Management

- **Gestion Riesgo (Risk Management):** Identification and assessment of operational risks.
- **Gestion Peligro (Danger Management):** Specific handling of dangerous conditions or agents.
- **MSDS (Material Safety Data Sheets):** Database and management of chemical safety data sheets.
- **EPP (Personal Protective Equipment):** Management and tracking of PPE inventory and assignment.

### 3.2. Incident & Action Tracking

- **Incidente (Incidents):** Reporting and investigation workflows for workplace incidents.
- **Hallazgo (Findings):** Tracking of audit or inspection findings.
- **Gestion Acciones (Action Management):** Assignment and tracking of corrective and preventive actions (CAPA).
- **Observaciones (Observations):** Safety observation reporting.

### 3.3. Inspections & Compliance

- **Inspecciones (Inspections):** Execution and management of safety/quality inspections.
- **Plantillas (Templates):** Dynamic form builder for creating inspection and checklist templates.
- **Permisos Trabajo (Work Permits):** Digital management of work permits (PTW).

### 3.4. Operational Management

- **Gestión Documental:** Centralized document repository and version control.
- **Capacitaciones (Trainings):** Tracking employee training records and certifications.
- **Mediciones (Measurements):** Recording of environmental or operational metrics.
- **Tableros (Dashboards):** Visual analytics and reporting widgets.

### 3.5. Administration

- **Users & Accounts:** User management, role assignment, and hierarchal setup.
- **Configuracion:** System-wide settings and parameter management.
- **Alta Super Admin:** Specialized onboarding/setup flows for administrators.

## 4. Key Functional Capabilities

- **Dynamic Forms:** Ability to generate forms based on defined templates (`AppBasicForm`, `AppAbmFormGroup`).
- **Internationalization (i18n):** Support for multiple languages (English/Spanish detected).
- **File Management:** File upload capabilities with attachment handling (`AppFileUpload`, `AppFormFiles`).
- **Interactive UI:** Rich UI components including data tables (`AppDatatableBuscador`), trees (`AppTreeSelectJerarquias`), and modals.
- **Rich Text Editing:** Integrated TipTap editor for content creation.

## 5. Development Standards

- **Component Structure:** Modular component design with `auto-imports` and `unplugin-vue-components`.
- **Commit Convention:** Conventional Commits enforced via Commitlint.
- **Type Safety:** Strict TypeScript configuration for robust code quality.
