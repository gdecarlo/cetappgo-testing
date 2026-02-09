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

## 🔐 Credenciales entorno local

### Usuario de Pruebas (por defecto)
- **Usuario:** `fpandullo@cetapsa.com`
- **Password:** `Cetap!2017`

### Super Usuario (solo si se requiere explícitamente)
- **Usuario:** `superusuario@cetapsa.com`
- **Password:** `Cetap!2017`

## 🔐 Credenciales entorno testing 1 y 2

### Usuario de Pruebas (por defecto)
- **Usuario:** `cmartinez@cetapsa.com`
- **Password:** `12345678`

### Usuario de Pruebas alternativo(por si no funciona el por defecto)
- **Usuario:** `nurkazambrano@gmail.com`
- **Password:** `1234567890`

### Super Usuario (solo si se requiere explícitamente)
- **Usuario:** `superusuario@cetapsa.com`
- **Password:** `Cetap!2017`

---

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
