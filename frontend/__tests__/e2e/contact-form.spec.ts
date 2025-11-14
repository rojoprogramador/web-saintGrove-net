import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contacto', { waitUntil: 'load' });
    // Wait for client-side hydration to complete
    await page.waitForLoadState('networkidle');
    // Wait for React to hydrate the form
    await page.waitForSelector('input#name', { state: 'visible', timeout: 30000 });
  });

  test('should display contact form', async ({ page }) => {
    await expect(page.locator('input#name')).toBeVisible();
    await expect(page.locator('input#email')).toBeVisible();
    await expect(page.locator('input#phone')).toBeVisible();
    await expect(page.locator('textarea#message')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Form should show validation errors
    await expect(page.locator('text=/debe tener al menos/i').first()).toBeVisible({ timeout: 5000 });
  });

  test('should validate email format', async ({ page }) => {
    const emailInput = page.locator('input#email');
    await emailInput.fill('invalid-email');

    // Submit to trigger validation
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Should show email validation error
    await expect(page.locator('text=/email inválido/i')).toBeVisible({ timeout: 5000 });
  });

  test('should validate phone format', async ({ page }) => {
    const phoneInput = page.locator('input#phone');
    await phoneInput.fill('abc');

    // Submit to trigger validation
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Should show phone validation error
    await expect(page.locator('text=/teléfono inválido/i')).toBeVisible({ timeout: 5000 });
  });

  test('should submit valid form', async ({ page }) => {
    // Fill form with valid data
    await page.locator('input#name').fill('John Doe');
    await page.locator('input#email').fill('john@example.com');
    await page.locator('input#phone').fill('+1234567890');
    await page.locator('select#service').selectOption('desarrollo-web');
    await page.locator('textarea#message').fill('This is a test message for E2E testing');

    // Submit form
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Wait for success message
    await expect(page.locator('text=/mensaje enviado exitosamente/i')).toBeVisible({ timeout: 15000 });
  });

  test('should clear form after successful submission', async ({ page }) => {
    // Fill and submit form
    await page.locator('input#name').fill('John Doe');
    await page.locator('input#email').fill('john@example.com');
    await page.locator('input#phone').fill('+1234567890');
    await page.locator('select#service').selectOption('desarrollo-web');
    await page.locator('textarea#message').fill('Test message for form clear');

    await page.locator('button[type="submit"]').click();

    // Wait for success and check form is cleared
    await expect(page.locator('text=/mensaje enviado exitosamente/i')).toBeVisible({ timeout: 15000 });

    // Form fields should be empty
    await expect(page.locator('input#name')).toHaveValue('');
    await expect(page.locator('textarea#message')).toHaveValue('');
  });

  test('should show loading state during submission', async ({ page }) => {
    await page.locator('input#name').fill('John Doe');
    await page.locator('input#email').fill('john@example.com');
    await page.locator('input#phone').fill('+1234567890');
    await page.locator('select#service').selectOption('desarrollo-web');
    await page.locator('textarea#message').fill('Test message for loading state');

    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Button should show loading state
    await expect(submitButton).toBeDisabled();
    await expect(page.locator('text=/enviando/i')).toBeVisible({ timeout: 2000 });
  });
});
