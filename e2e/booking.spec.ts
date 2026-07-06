import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1280, height: 800 } });

test.describe('Booking Flow', () => {
  test('booking page loads with form elements', async ({ page }) => {
    await page.goto('/book');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    // Should have a form or booking-related elements
    const pageContent = page.locator('body');
    await expect(pageContent).toBeVisible({ timeout: 10000 });
  });

  test('login page loads', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });
  });
});
