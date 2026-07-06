import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1280, height: 800 } });

test.describe('Contact & Content Pages', () => {
  test('contact page loads', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });
  });

  test('blogs page loads', async ({ page }) => {
    await page.goto('/blogs');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });
  });
});
