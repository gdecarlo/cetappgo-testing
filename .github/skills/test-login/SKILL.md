---
name: test-login
version: 1.0.0
description: Prueba automatizada de autenticación en CetApp Go
---

# Skill: Test Login

Prueba automatizada para verificar el proceso de autenticación en la plataforma CetApp Go.

## Requisitos Previos

- Variables de entorno `VITE_USER` y `VITE_PASS` configuradas.
- Entorno de pruebas disponible según `credenciales.md`.

## Instrucciones para el Agente

El agente debe usar el MCP de Playwright para ejecutar el test de login y generar evidencia según el estándar definido en `agents.md`.

### Flujo de Ejecución

1. **Navegación**: Dirigirse a la URL base definida en las instrucciones de testing.
2. **Autenticación**:
   - Localizar los campos de usuario y contraseña usando selectores de accesibilidad.
   - Completar con las credenciales desde `testing-instructions.md`.
   - Accionar el botón de inicio de sesión.
3. **Verificación**:
   - Confirmar que la URL cambia al dashboard.
   - Validar que aparece el mensaje de bienvenida.
   - Verificar que los elementos del menú principal sean visibles.
4. **Generación de Evidencia**:
   - Capturar screenshot del estado final en `evidence/login_success.png`.
   - Guardar trace si es necesario para debugging.

### Formato de Salida Requerido

El agente DEBE reportar el resultado en el formato estandarizado de `agents.md`:

1. **Status:** Pass/Fail
2. **JSON:** Bloque de código JSON con:
   ```json
   {
     "test_case": "test-login",
     "status": "pass",
     "steps": [
       "Navegación a URL de login",
       "Autenticación con credenciales válidas",
       "Verificación de redirección al dashboard",
       "Validación de elementos del menú principal"
     ],
     "evidence": [
       { "step": "Estado final autenticado", "path": "evidence/login_success.png" }
     ]
   }
   ```
3. **Lista de archivos:** Rutas de evidencia generadas en backticks.

## Ejemplo de Uso (Playwright)

```typescript
await page.goto(baseUrl);
await page.fill('#username', process.env.VITE_USER);
await page.fill('#password', process.env.VITE_PASS);
await page.click('button[type="submit"]');
await expect(page).toHaveURL(/.*dashboard/);
```