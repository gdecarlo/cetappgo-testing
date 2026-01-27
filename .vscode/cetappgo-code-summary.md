# CetApp Go - Codebase Summary for Playwright

Este documento resume la arquitectura de módulos, rutas, vistas y permisos para facilitar la creación de estrategias de prueba E2E con Playwright.

## 1. Autenticación & Cuenta

- **Ruta Base:** `/` (Login redirige aquí si no hay sesión)
- **Rutas Clave:**
  - `/login` (LoginView)
  - `/forgot-password`
  - `/register`
- **Roles:** Acceso Público.
- **Vistas Principales:** `LoginView.vue` (Inferido), `RegisterView.vue`.
- **Interacciones:** Formulario de credenciales (`#username`, `#password`), recuperación de contraseña.
- **Flujo:** El usuario ingresa credenciales -> `auth.store` valida -> Redirección a Home.

## 2. Dashboard (Home)

- **Ruta Base:** `/`
- **Roles:** Autenticado (`requiresAuth: true`).
- **Vistas Principales:** `src/views/Home/HomeView.vue`, `HomeWidgetsFrame.vue`.
- **Elementos Clave:** Widgets de KPI, Accesos directos (Botones rápidos), Gráficos.
- **Flujo:** Carga dinámica de widgets según permisos del usuario (`Modulo.Inspecciones`, `Modulo.Incidentes`, etc.).

## 3. Inspecciones & Programación

- **Ruta Base:** `/inspecciones`
- **Rutas Clave:**
  - Lista: `/inspecciones`
  - Programación (Agenda): `/inspecciones/programacion`
  - Alta: `/inspecciones/add`
  - Ejecución: `/inspecciones/:id/edit`
- **Roles:** `Modulo.Inspecciones`, `Permisos.ProgramarInspeccion`.
- **Vistas Principales:**
  - `InspeccionesListView.vue`
  - `ProgramacionInspeccionesView.vue` (Agenda)
  - `InspeccionView.vue`
- **Interacciones:**
  - **Agenda:** Navegación fechas (flechas, botón Hoy), Filtros, Drag & Drop (si aplica).
  - **CRUD:** Formulario dinámico basado en plantillas.
- **Flujo:** Programar en calendario -> Realizar inspección (llenar checklist) -> Sincronización.

## 4. Gestión de Incidentes

- **Ruta Base:** `/incidentes`
- **Rutas Clave:** `/incidentes`, `/incidentes/add`, `/incidentes/:id/edit`.
- **Roles:** `Modulo.Incidentes`, `Permissions.IncidenteRealizar`.
- **Vistas Principales:** `IncidentesListView.vue`, `IncidenteView.vue`.
- **Elementos Clave:** Formulario de reporte (Gravedad, Tipo), Adjunto de evidencia.
- **Flujo:** Reporte inicial -> Análisis de causas -> Gestión de acciones correctivas -> Cierre.

## 5. Hallazgos

- **Ruta Base:** `/hallazgos`
- **Roles:** `Modulo.Hallazgos`, `Permissions.HallazgoRealizar`.
- **Vistas Principales:** `HallazgosListView.vue`, `HallazgoView.vue`.
- **Interacciones:** Tablas de listado, modales de alta rápida.
- **Flujo:** Detección de desviación -> Asignación de responsable -> Tratamiento -> Cierre.

## 6. Permisos de Trabajo (PTW)

- **Ruta Base:** `/permisos-trabajo`
- **Roles:** `Modulo.PermisosTrabajo`, `Permissions.EmitirPermisoTrabajo`.
- **Vistas Principales:** `PermisosTrabajoListView.vue`, `PermisoTrabajoView.vue`.
- **Interacciones:** Firmas digitales, Checklists de validación previo al trabajo.
- **Flujo:** Solicitud -> Aprobaciones (Jerárquicas/HSE) -> Emisión -> Cierre.

## 7. Gestión de Acciones

- **Ruta Base:** `/gestion-acciones`
- **Sub-módulos:** Tareas (`/gestion-acciones/tareas`).
- **Roles:** `Modulo.GestionAcciones`.
- **Vistas Principales:** `GestionAccionesListView.vue`, `GestionAccionView.vue`.
- **Flujo:** Centraliza acciones derivadas de Incidentes, Hallazgos o Inspecciones. Seguimiento de vencimientos.

## 8. Plantillas (Checklists)

- **Ruta Base:** `/listas-de-verificacion` (Inspección), `/plantillas-observacion`, etc.
- **Roles:** Administradores y roles de configuración (`Permissions.Plantilla...`).
- **Vistas Principales:** `PlantillasListView.vue`, `PlantillaView.vue`.
- **Elementos Clave:** Builder de formularios (Drag & Drop de Secciones/Preguntas).
- **Flujo:** Creación de estructura de preguntas -> Asignación a procesos (Inspección/Observación).

## 9. Configuración

- **Ruta Base:** `/configuracion`
- **Rutas Clave:**
  - Usuarios: `/configuracion/usuarios` (o `/users` directo según router).
  - Roles: `/configuracion/roles`.
  - Tableros: `/configuracion/tableros`.
- **Roles:** `EsSuperAdministrador`, `EsSuperUsuario`.
- **Vistas Principales:** `ConfiguracionLayout.vue`, `UserView.vue`, `RolesSistemaView.vue`.
- **Interacciones:** Switches de permisos, ABM de tablas maestras (Empresas, Sectores).

## 10. Hoja de Seguridad (MSDS)

- **Ruta Base:** `/mis-solicitudes`
- **Otras Rutas:** `/productos-aprobados`.
- **Roles:** `Modulo.MSDS`.
- **Vistas Principales:** `HojaSeguridadHomologacionView.vue`, `ProductoAprobadoView.vue`.
- **Flujo:** Solicitud de nuevo producto químico -> Homologación por áreas -> Aprobación -> Listado oficial.

## 11. Institucional

- **Ruta Base:** `/institucional`
- **Roles:** Acceso general autenticado.
- **Vistas Principales:** `InstitucionalView.vue`.
- **Contenido:** Información de contacto, versiones de App, Links a stores.
