# Configuración Central de Pruebas - CetApp Go

Este archivo contiene **TODAS** las configuraciones que los agentes deben usar al ejecutar pruebas.

---
### Entorno activo
```
el que diga el caso de prueba.
```

## 🌐 URLs de Entorno

| Entorno     | URL                              | Uso                        |
|-------------|----------------------------------|----------------------------|
| **local** | `http://localhost:4173`          | ✅ **URL por defecto**     |
| testing 1  | `https://cetappgowebtest.z20.web.core.windows.net/`       | cuando entorno activo sea test 1      |
| testing 2  | `https://cetappgotest2.z20.web.core.windows.net/`       | cuando entorno activo sea test 2      |



> ⚠️ **REGLA CRÍTICA:** Nunca inventar URLs. Siempre usar la URL definida arriba.

---

## 🔐 Credenciales por ambiente (desde .env)

Las credenciales **no se versionan**. Se cargan desde un archivo `.env` local.
Usar `.env.example` como plantilla.

### Roles disponibles (role-id)
- `default` (Usuario de Pruebas)
- `alternate` (Usuario de Pruebas alternativo)
- `gestion` (Permisos de gestion de acciones)
- `super` (Super Usuario)
- `super_admin` (Super Administrador)

### Convencion de variables
Formato: `{ENV}_USER_{ROLE}` y `{ENV}_PASS_{ROLE}`

`ENV` admitidos: `LOCAL`, `TEST1`, `TEST2`

Ejemplos:
- `LOCAL_USER_DEFAULT`, `LOCAL_PASS_DEFAULT`
- `TEST1_USER_GESTION`, `TEST1_PASS_GESTION`
- `TEST2_USER_SUPER_ADMIN`, `TEST2_PASS_SUPER_ADMIN`

> ⚠️ Si falta el usuario solicitado, se debe **re-preguntar** al usuario para elegir otro rol.

---

## 🧭 Seleccion de usuario segun permisos/modulos

Usar siempre el usuario que coincida con los permisos o modulo requeridos por el caso de prueba.
Solo usar el usuario por defecto cuando el caso de prueba no indique permisos/modulos especiales.

### Declaracion opcional en el test case
El test case puede incluir una linea:
`usuario: <role-id>`

Si esta presente, se toma como sugerencia inicial y se permite override interactivo al ejecutar.

### Reglas rapidas
- Si el caso requiere gestionar acciones (ver/crear/editar/eliminar), usar **Usuario con permisos para gestion de acciones**.
- Si el caso requiere permisos elevados o tareas administrativas, usar **Super Usuario**.
- Si el caso no indica permisos especiales, usar **Usuario de Pruebas (por defecto)**.
- Si el caso indica que el usuario por defecto no funciona, usar **Usuario de Pruebas alternativo**.

## 📋 Selectores de Login

| Elemento       | Selector                          |
|----------------|-----------------------------------|
| Campo Usuario  | `#username`                       |
| Campo Password | `#password`                       |
| Botón Login    | `button[type="submit"]`           |

---

## ⚙️ Configuración de Navegador

- **Viewport:** 1280x720
- **Timeout por defecto:** 30000ms
- **Modo:** headful (a menos que se indique lo contrario)
