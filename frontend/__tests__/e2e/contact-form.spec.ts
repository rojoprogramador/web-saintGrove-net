import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contacto');
    await page.waitForLoadState('networkidle');
  });

  test('should display contact form', async ({ page }) => {
    await expect(page.getByLabel('Nombre Completo *')).toBeVisible();
    await expect(page.getByLabel('Email *')).toBeVisible();
    await expect(page.getByLabel('Teléfono (Opcional)')).toBeVisible();
    await expect(page.getByLabel('Mensaje *')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /enviar mensaje/i });
    await submitButton.click();

    // Form should show validation errors
    await expect(page.getByText(/debe tener al menos/i).first()).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    const emailInput = page.getByLabel('Email *');
    await emailInput.fill('invalid-email');

    // Submit to trigger validation
    const submitButton = page.getByRole('button', { name: /enviar mensaje/i });
    await submitButton.click();

    // Should show email validation error
    await expect(page.getByText(/email inválido/i)).toBeVisible();
  });

  test('should validate phone format', async ({ page }) => {
    const phoneInput = page.getByLabel('Teléfono (Opcional)');
    await phoneInput.fill('abc');

    // Submit to trigger validation
    const submitButton = page.getByRole('button', { name: /enviar mensaje/i });
    await submitButton.click();

    // Should show phone validation error
    await expect(page.getByText(/teléfono inválido/i)).toBeVisible();
  });

  test('should submit valid form', async ({ page }) => {
    // Fill form with valid data
    await page.getByLabel('Nombre Completo *').fill('John Doe');
    await page.getByLabel('Email *').fill('john@example.com');
    await page.getByLabel('Teléfono (Opcional)').fill('+1234567890');
    await page.getByLabel('Servicio de Interés *').selectOption('desarrollo-web');
    await page.getByLabel('Mensaje *').fill('This is a test message');

    // Submit form
    const submitButton = page.getByRole('button', { name: /enviar mensaje/i });
    await submitButton.click();

    // Wait for success message
    await expect(page.getByText(/mensaje enviado exitosamente/i)).toBeVisible({ timeout: 10000 });
  });

  test('should clear form after successful submission', async ({ page }) => {
    // Fill and submit form
    await page.getByLabel('Nombre Completo *').fill('John Doe');
    await page.getByLabel('Email *').fill('john@example.com');
    await page.getByLabel('Teléfono (Opcional)').fill('+1234567890');
    await page.getByLabel('Servicio de Interés *').selectOption('desarrollo-web');
    await page.getByLabel('Mensaje *').fill('Test message');

    await page.getByRole('button', { name: /enviar mensaje/i }).click();

    // Wait for success and check form is cleared
    await expect(page.getByText(/mensaje enviado exitosamente/i)).toBeVisible({ timeout: 10000 });

    // Form fields should be empty
    await expect(page.getByLabel('Nombre Completo *')).toHaveValue('');
    await expect(page.getByLabel('Mensaje *')).toHaveValue('');
  });

  test('should show loading state during submission', async ({ page }) => {
    await page.getByLabel('Nombre Completo *').fill('John Doe');
    await page.getByLabel('Email *').fill('john@example.com');
    await page.getByLabel('Teléfono (Opcional)').fill('+1234567890');
    await page.getByLabel('Servicio de Interés *').selectOption('desarrollo-web');
    await page.getByLabel('Mensaje *').fill('Test message');

    const submitButton = page.getByRole('button', { name: /enviar mensaje/i });
    await submitButton.click();

    // Button should show loading state
    await expect(submitButton).toBeDisabled();
    await expect(page.getByText(/enviando/i)).toBeVisible();
  });
});
