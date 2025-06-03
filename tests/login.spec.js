const { test, expect } = require('@playwright/test');

test.describe('Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.getByLabel('User').fill('admin@admin.com');
    await page.getByLabel('Password').fill('2020');
    await page.getByRole('button', { name: 'LOGIN' }).click();
    await expect(page.locator('#content')).toBeVisible();
  });

  test('should not login with invalid credentials', async ({ page }) => {
    await page.fill('#email', 'wrong@admin.com');
    await page.fill('#password', 'wrongpass');
    await page.click('#login');

    // Content should NOT be visible
    await expect(page.locator('#content')).not.toBeVisible();
  });

  test('should logout and return to login screen', async ({ page }) => {
    await page.fill('#email', 'admin@admin.com');
    await page.fill('#password', '2020');
    await page.click('#login');

    await page.click('#user');      // Open logout menu
    await page.click('#logout');    // Click logout

    await expect(page.locator('#login')).toBeVisible();
    await expect(page.locator('#content')).not.toBeVisible();
  });
});
