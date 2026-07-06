import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1280, height: 800 } });

test.describe('Admin Panel', () => {
  test('admin page loads', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });
  });

  test('dashboard page loads', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });
  });
});
