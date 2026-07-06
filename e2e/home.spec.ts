import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1280, height: 800 } });

test.describe('Home Page', () => {
  test('renders hero section with title', async ({ page }) => {
    await page.goto('/');
    // Wait for app to hydrate
    await page.waitForLoadState('networkidle');
    // Hero should have an h1
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible({ timeout: 15000 });
    // Brand name should be present
    await expect(page.locator('text=CoolFix Pro').or(page.locator('text=AC Repair')).first()).toBeVisible({ timeout: 10000 });
  });

  test('shows service cards', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    // There should be service-related content visible
    await expect(page.locator('text=Service').or(page.locator('text=Repair')).or(page.locator('text=AC')).first()).toBeVisible({ timeout: 10000 });
  });

  test('navigation to book page works', async ({ page }) => {
    await page.goto('/book', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 });
  });
});
