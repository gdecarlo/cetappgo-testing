# Instrucciones de Testing

> ⚠️ **CONFIGURACIÓN CENTRALIZADA:** Usar [config.md](config.md) como fuente única de URLs y credenciales.

---

## Referencia Rápida

Ver `.vscode/config.md` para:
- ✅ URL del entorno de pruebas
- ✅ Credenciales de usuario
- ✅ Selectores de login

---

## Protocolo de Login (Referencia)

1. **Protocolo de Login:**
   - Navegar a la URL definida en `config.md`
   - Escribir usuario en `#username`
   - Escribir contraseña en `#password`
   - Hacer clic en `button[type="submit"]`
   - Esperar a: `networkidle`

2. **Generación de Casos:**
   - Genera siempre un Caso Positivo (flujo feliz)
   - Genera siempre un Caso Negativo (validación de error)

3. **Formato de Salida:**
   - Devuelve un prompt optimizado para ser ejecutado directamente por el MCP de Playwright
   - Usa selectores de accesibilidad (getByRole, getByPlaceholder) si los IDs no son obvios
   - Incluye aserciones para verificar el éxito/error

4. **Credenciales:** Ver `.vscode/config.md` 