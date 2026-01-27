1. **Protocolo de Login:**
   - Navegar a http://localhost:4173/

Escribir el usuario desde la variable de entorno del mcp llamada VITE_USER en #username.

Escribir la contraseña desde la variable de entorno del mcp llamada VITE_PASS en #password.

Hacer clic en el botón button[type="submit"].

- Esperar a: `networkidle`

2. **Generación de Casos:**

   - Genera siempre un Caso Positivo (flujo feliz).
   - Genera siempre un Caso Negativo (validación de error).

3. **Formato de Salida:**
   - Devuelve un prompt optimizado para ser ejecutado directamente por el MCP de Playwright.
   - Usa selectores de accesibilidad (getByRole, getByPlaceholder) si los IDs no son obvios.
   - Incluye aserciones para verificar el éxito/error.

4. **Credenciales:**
  -- usuario para todas las pruebas que requieran una autenticacion de usuario super administrador.
    usuario: fpandullo@cetapsa.com 
    password: Cetap!2017 
    -- superusuario
    usuario: superusuario@cetapsa.com 

    password:Cetap!2017 