import { test, expect } from '@playwright/test';

/**
 * Skill: Test Login
 * Implementación de referencia para la prueba de login.
 * El navegador permanece abierto al finalizar para inspección manual.
 */

test.use({
  launchOptions: {
    slowMo: 500, // Pausa de 500ms entre cada acción para visualización
  }
});

test('debe iniciar sesión correctamente con credenciales válidas', async ({ page }) => {
  const baseUrl = 'https://cetappgowebtest.z20.web.core.windows.net/login';
  
  // 1. Navegar
  await page.goto(baseUrl);
  
  // 2. Login
  // Usuario normal (super administrador) según testing-instructions.md
  await page.getByRole('textbox', { name: /Usuario/i }).fill('cmartinez@cetapsa.com');
  await page.locator('input[type="password"]').fill('12345678');
  await page.getByRole('button', { name: /Iniciar sesión/i }).click();
  
  // 3. Verificación
  await expect(page).toHaveURL('https://cetappgowebtest.z20.web.core.windows.net/');
  await expect(page.getByRole('heading', { name: /Bienvenido/i })).toBeVisible();
  
 
});
