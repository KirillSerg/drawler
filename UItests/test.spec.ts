import { test, expect } from '@playwright/test';

test.describe('Setup', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle("Drawler");
  });

  test('visible main page elements', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('#canvas')).toBeVisible()
  });
});
