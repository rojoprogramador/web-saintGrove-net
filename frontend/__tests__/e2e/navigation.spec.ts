import { test, expect } from '@playwright/test';

// TODO: Enable these tests when navigation links are implemented
test.describe.skip('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to services section', async ({ page }) => {
    const servicesLink = page.getByRole('link', { name: /servicios/i });
    await servicesLink.click();

    // Should scroll to services section
    const servicesSection = page.locator('#servicios');
    await expect(servicesSection).toBeInViewport();
  });

  test('should navigate to process section', async ({ page }) => {
    const processLink = page.getByRole('link', { name: /proceso/i });
    await processLink.click();

    // Should scroll to process section
    const processSection = page.locator('#proceso');
    await expect(processSection).toBeInViewport();
  });

  test('should navigate to contact section', async ({ page }) => {
    const contactLink = page.getByRole('link', { name: /contacto/i });
    await contactLink.click();

    // Should scroll to contact section
    const contactSection = page.locator('#contacto');
    await expect(contactSection).toBeInViewport();
  });

  test('should have smooth scroll behavior', async ({ page }) => {
    const servicesLink = page.getByRole('link', { name: /servicios/i });

    // Click and wait for scroll animation
    await servicesLink.click();
    await page.waitForTimeout(1000); // Wait for smooth scroll

    const servicesSection = page.locator('#servicios');
    await expect(servicesSection).toBeInViewport();
  });

  test('should update URL hash when navigating', async ({ page }) => {
    const servicesLink = page.getByRole('link', { name: /servicios/i });
    await servicesLink.click();

    // URL should have hash
    await expect(page).toHaveURL(/#servicios$/);
  });

  test('should load page with hash correctly', async ({ page }) => {
    await page.goto('/#contacto');

    // Contact section should be in view
    const contactSection = page.locator('#contacto');
    await expect(contactSection).toBeInViewport();
  });

  test('should have accessible navigation', async ({ page }) => {
    // Check that navigation is keyboard accessible
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const focusedElement = await page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });
});

test.describe('Header Behavior', () => {
  test('should have header', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('should show logo in header', async ({ page }) => {
    await page.goto('/');

    const logo = page.getByText(/SaintGrove/i);
    await expect(logo).toBeVisible();
  });
});
