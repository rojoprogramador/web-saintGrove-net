import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('should load successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/SaintGrove/i);
  });

  test('should display the hero section', async ({ page }) => {
    // Just check that a heading exists
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    // Check header/navigation exists
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('should display main content', async ({ page }) => {
    // Check that main element exists
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should have footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
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

  test('should be responsive on mobile', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Check that page loads on mobile
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });
});
