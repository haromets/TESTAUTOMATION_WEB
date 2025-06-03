// tests/loginFlow.spec.js

import { test, expect } from '@playwright/test';
import { login, logout } from '../utils/helpers.js';
import validUsers from '../testData/validUsers.json';
import notValidUsers from '../testData/notValidUsers.json';

/**
 * Test suite for validating login flows.
 * Includes positive tests with multiple valid users,
 * UI verification after login,
 * logout tests,
 * and negative tests with invalid credentials.
 */

test.describe('Login Flow - Modular Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  for (const user of validUsers) {
    test(`should login successfully with valid user: ${user.email}`, async ({ page }) => {
      await login(page, user.email, user.password);
      await expect(page.locator('#content p')).toHaveCount(3);
    });
  }

  test('should show 3 content paragraphs after login', async ({ page }) => {
    const user = validUsers[0];
    await login(page, user.email, user.password);

    const paragraphs = page.locator('#content p');
    await expect(paragraphs).toHaveCount(3);
    for (let i = 0; i < 3; i++) {
      await expect(paragraphs.nth(i)).toBeVisible();
    }
  });

  test('should display navigation buttons after login', async ({ page }) => {
    const user = validUsers[0];
    await login(page, user.email, user.password);

    await expect(page.locator('.menu .home')).toBeVisible();
    await expect(page.locator('.menu .products')).toBeVisible();
    await expect(page.locator('.menu .contact')).toBeVisible();
  });

  test('should have correct background image after login', async ({ page }) => {
    const user = validUsers[0];
    await login(page, user.email, user.password);

    const bgImage = await page.locator('#content').evaluate((el) =>
      window.getComputedStyle(el).backgroundImage
    );
    expect(bgImage).toContain('bg2.jpg');
  });

  test('should logout successfully and return to login screen', async ({ page }) => {
    const user = validUsers[0];
    await login(page, user.email, user.password);

    await logout(page);

    await expect(
      page.getByText("Automation doesn't stop at testing, it's just a beginning!")
    ).toBeVisible();
  });

  // Negative tests: verify invalid credentials do not allow login
  test.describe('Negative Login Tests', () => {
    for (const user of notValidUsers) {
      test(`should not allow login with invalid user: ${user.email}`, async ({ page }) => {
        await login(page, user.email, user.password);
        await expect(
          page.getByText("Automation doesn't stop at testing, it's just a beginning!")
        ).toBeVisible();
      });
    }
  });
});
