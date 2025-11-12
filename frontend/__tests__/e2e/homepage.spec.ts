import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/SaintGrove/i);
  });

  test('should display the hero section', async ({ page }) => {
    const heading = page.getByRole('heading', {
      name: /transformamos/i
    });
    await expect(heading).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    // Check navigation links exist
    await expect(page.getByRole('link', { name: /servicios/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /proceso/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /contacto/i })).toBeVisible();
  });

  test('should display services section', async ({ page }) => {
    const servicesSection = page.locator('#servicios');
    await servicesSection.scrollIntoViewIfNeeded();
    await expect(servicesSection).toBeVisible();
  });

  test('should display contact section', async ({ page }) => {
    const contactSection = page.locator('#contacto');
    await contactSection.scrollIntoViewIfNeeded();
    await expect(contactSection).toBeVisible();
  });

  test('should have visible CTA buttons', async ({ page }) => {
    const ctaButtons = page.getByRole('button', { name: /comencemos/i });
    await expect(ctaButtons.first()).toBeVisible();
  });

  test('should display WhatsApp float button', async ({ page }) => {
    const whatsappButton = page.getByRole('link', { name: /whatsapp/i });
    await expect(whatsappButton).toBeVisible();
  });

  test('should have responsive header', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Check header remains visible after scroll
    await page.evaluate(() => window.scrollTo(0, 500));
    await expect(header).toBeVisible();
  });
});

test.describe('Homepage - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should display mobile menu', async ({ page }) => {
    await page.goto('/');

    // Mobile menu button should be visible
    const menuButton = page.getByRole('button', { name: /menu/i });
    await expect(menuButton).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.goto('/');

    // Check that hero section is visible and properly sized
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
  });
});
