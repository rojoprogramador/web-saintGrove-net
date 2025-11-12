import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Scroll to contact form
    const contactSection = page.locator('#contacto');
    await contactSection.scrollIntoViewIfNeeded();
  });

  test('should display contact form', async ({ page }) => {
    await expect(page.getByLabel(/nombre/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/teléfono/i)).toBeVisible();
    await expect(page.getByLabel(/mensaje/i)).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /enviar/i });
    await submitButton.click();

    // Form should show validation errors
    await expect(page.getByText(/requerido/i).first()).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    const emailInput = page.getByLabel(/email/i);
    await emailInput.fill('invalid-email');
    await emailInput.blur();

    // Should show email validation error
    await expect(page.getByText(/email.*válido/i)).toBeVisible();
  });

  test('should validate phone format', async ({ page }) => {
    const phoneInput = page.getByLabel(/teléfono/i);
    await phoneInput.fill('abc123');
    await phoneInput.blur();

    // Should show phone validation error
    await expect(page.getByText(/teléfono.*válido/i)).toBeVisible();
  });

  test('should submit valid form', async ({ page }) => {
    // Fill form with valid data
    await page.getByLabel(/nombre/i).fill('John Doe');
    await page.getByLabel(/email/i).fill('john@example.com');
    await page.getByLabel(/teléfono/i).fill('+1234567890');
    await page.getByLabel(/mensaje/i).fill('This is a test message');

    // Submit form
    const submitButton = page.getByRole('button', { name: /enviar/i });
    await submitButton.click();

    // Wait for success message or redirect
    // Note: Update this based on actual form behavior
    await expect(page.getByText(/enviado|éxito|recibido/i)).toBeVisible({ timeout: 10000 });
  });

  test('should clear form after successful submission', async ({ page }) => {
    // Fill and submit form
    await page.getByLabel(/nombre/i).fill('John Doe');
    await page.getByLabel(/email/i).fill('john@example.com');
    await page.getByLabel(/teléfono/i).fill('+1234567890');
    await page.getByLabel(/mensaje/i).fill('Test message');

    await page.getByRole('button', { name: /enviar/i }).click();

    // Wait for success and check form is cleared
    await expect(page.getByText(/enviado|éxito|recibido/i)).toBeVisible({ timeout: 10000 });

    // Form fields should be empty
    await expect(page.getByLabel(/nombre/i)).toHaveValue('');
    await expect(page.getByLabel(/mensaje/i)).toHaveValue('');
  });

  test('should show loading state during submission', async ({ page }) => {
    await page.getByLabel(/nombre/i).fill('John Doe');
    await page.getByLabel(/email/i).fill('john@example.com');
    await page.getByLabel(/teléfono/i).fill('+1234567890');
    await page.getByLabel(/mensaje/i).fill('Test');

    const submitButton = page.getByRole('button', { name: /enviar/i });
    await submitButton.click();

    // Button should show loading state
    await expect(submitButton).toBeDisabled();
    await expect(page.getByText(/enviando|cargando/i)).toBeVisible();
  });
});
