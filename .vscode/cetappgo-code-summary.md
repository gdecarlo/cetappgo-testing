# CetApp Go - Codebase Summary for Playwright

Este documento resume la arquitectura de módulos, rutas, vistas y permisos para facilitar la creación de estrategias de prueba E2E con Playwright.

## 1. Autenticación & Cuenta

- **Ruta Base:** `/` (Login redirige aquí si no hay sesión)
- **Rutas Clave:**
  - `/login` (LoginView)
  - `/register`
  - `/invite` (Registro por invitación)
  - `/forgot-password`
  - `/actualizar-datos` (Requiere Auth)
- **Roles:** Acceso Público (excepto `actualizar-datos`).
- **Vistas Principales:** 
  - `LoginView.vue`
  - `RegisterView.vue`
  - `ForgotPassword.vue`
  - `ActualizarDatosView.vue`
- **Flujo:** 
  - Login: Usuario ingresa credenciales -> Autenticación -> Redirección a Home.
  - Registro: Formulario de alta -> Validación de correo -> Creación de cuenta.

## 2. Dashboard (Home)

- **Ruta Base:** `/`
- **Roles:** Autenticado (`requiresAuth: true`).
- **Vistas Principales:** 
  - `HomeView.vue`
- **Elementos Clave:** Widgets, accesos rápidos.
- **Flujo:** Página de aterrizaje principal tras el login.

## 3. Inspecciones & Programación

- **Ruta Base:** `/inspecciones`
- **Rutas Clave:**
  - Lista: `/inspecciones`
  - Programación: `/inspecciones/programacion`
  - Alta: `/inspecciones/add`
  - Ejecución/Edición: `/inspecciones/:id/edit`
  - Vista: `/inspecciones/:id/view`
- **Roles:** Autenticado, permisos de módulo Inspecciones.
- **Vistas Principales:**
  - `InspeccionesListView.vue`
  - `ProgramacionInspeccionesView.vue`
  - `InspeccionView.vue`
- **Flujo:** 
  - **Programación:** Agendar inspecciones futuras.
  - **Ejecución:** Completar checklist de inspección y adjuntar evidencias.

## 4. Gestión de Incidentes

- **Ruta Base:** `/incidentes`
- **Rutas Clave:**
  - Lista: `/incidentes`
  - Alta: `/incidentes/add`
  - Edición: `/incidentes/:id/edit`
  - Vista: `/incidentes/:id/view`
- **Roles:** `Modulo.Incidentes`, `Permissions.IncidenteRealizar`.
- **Vistas Principales:**
  - `IncidentesListView.vue`
  - `IncidenteView.vue`
- **Flujo:** Reporte de incidente -> Análisis de causas (5 porqués, Ishikawa) -> Definición de acciones.

## 5. Hallazgos

- **Ruta Base:** `/hallazgos`
- **Rutas Clave:**
  - Lista: `/hallazgos`
  - Alta: `/hallazgos/add`
  - Edición: `/hallazgos/:id/edit`
  - Vista: `/hallazgos/:id/view`
- **Roles:** `Modulo.Hallazgos`, `Permissions.HallazgoRealizar`.
- **Vistas Principales:**
  - `HallazgosListView.vue`
  - `HallazgoView.vue`
- **Flujo:** Registro de hallazgo -> Evaluación -> Asignación de acciones correctivas.

## 6. Permisos de Trabajo (PTW)

- **Ruta Base:** `/permisos-trabajo`
- **Rutas Clave:**
  - Lista: `/permisos-trabajo`
  - Alta: `/permisos-trabajo/add`
  - Edición: `/permisos-trabajo/:id/edit`
  - Vista: `/permisos-trabajo/:id/view`
- **Roles:** `Modulo.PermisosTrabajo`, `Permissions.EmitirPermisoTrabajo`.
- **Vistas Principales:**
  - `PermisosTrabajoListView.vue`
  - `PermisoTrabajoView.vue`
- **Flujo:** Solicitud de permiso -> Aprobación (Firmas) -> Ejecución -> Cierre.

## 7. Gestión de Acciones

- **Ruta Base:** `/gestion-acciones`
- **Sub-módulos:** 
  - Acciones: `/gestion-acciones`
  - Tareas: `/gestion-acciones/tareas`
- **Rutas Clave:** Add, Edit, View.
- **Roles:** `Modulo.GestionAcciones`.
- **Vistas Principales:**
  - `GestionAccionesListView.vue`
  - `GestionAccionView.vue`
  - `GestionAccionesTareasListView.vue`
- **Flujo:** Gestión centralizada de planes de acción derivados de otras fuentes (Incidentes, Hallazgos).

## 8. Plantillas (Listas de Verificación)

- **Ruta Base:** `/listas-de-verificacion` (y variantes para otros módulos)
- **Rutas Clave:**
  - Inspección: `/listas-de-verificacion`
  - Observación: `/plantillas-observacion`
  - Incidente: `/plantillas-incidente`
  - Hallazgo: `/plantillas-hallazgo`
  - Biblioteca: `/plantillas-biblioteca`
- **Roles:** Administradores.
- **Vistas Principales:** `PlantillasListView`, `PlantillasView`.
- **Flujo:** Creación y edición de estructuras de formularios dinámicos.

## 9. Configuración y Usuarios

- **Ruta Base:** `/configuracion` y `/users`
- **Rutas Clave:**
  - Usuarios: `/users` (Lista), `/users/add` (Alta), `/users/:username/:empresaId/edit` (Edición).
  - Jerarquías: `/configuracion/jerarquia-nivel-1`, etc.
  - Empresa: `/configuracion/empresa`
  - Tablas Maestras: `/configuracion/marca`, `/configuracion/tipo-personal`, etc.
- **Roles:** Administradores.
- **Vistas Principales:**
  - `UsersList.vue`
  - `UserView.vue`
  - `ConfiguracionLayout.vue`
- **Flujo:** Administración del sistema, ABM de usuarios y configuración de catálogos.

## 10. Hoja de Seguridad (MSDS)

- **Ruta Base:** `/mis-solicitudes`
- **Otras Rutas:** 
  - `/productos-aprobados`
  - `/revision-solicitud`
- **Rutas Clave:**
  - Solicitudes: `/mis-solicitudes`, `/mis-solicitudes/add`
  - Productos Aprobados: `/productos-aprobados`
- **Roles:** `Modulo.MSDS`.
- **Vistas Principales:**
  - `MisSolicitudesListView.vue`
  - `SolicitudView.vue`
  - `ProductosAprobadosListView.vue`
- **Flujo:** Solicitud de homologación de producto -> Revisión -> Aprobación -> Catálogo de productos aprobados.

## 11. Institucional

- **Ruta Base:** `/institucional`
- **Roles:** Autenticado.
- **Vistas Principales:** 
  - `InstitucionalView.vue`
- **Contenido:** Información general de la aplicación.
