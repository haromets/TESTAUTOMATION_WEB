// tests/e2e.spec.js

import { test, expect } from '@playwright/test';
import { login, logout } from '../utils/helpers.js';
import validUsers from '../testData/validUsers.json';

/**
 * End-to-End Test: Login → Validate UI → Logout
 *
 * Currently, all users share the same role and UI after login,
 * so running this full flow for a single valid user is sufficient.
 *
 * If role-based behavior or conditional UI is introduced in the future,
 * consider looping this test for all valid users to ensure proper coverage.
 */

test.describe('End-to-End Flow: Login → Validate UI → Logout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  const user = validUsers[0];

  test(`should perform full login → UI validation → logout flow for user: ${user.email}`, async ({ page }) => {
    // Step 1: Login
    await login(page, user.email, user.password);

    // Step 2: Validate content
    const paragraphs = page.locator('#content p');
    await expect(paragraphs).toHaveCount(3);
    for (let i = 0; i < 3; i++) {
      await expect(paragraphs.nth(i)).toBeVisible();
    }

    // Step 3: Validate navigation buttons
    await expect(page.locator('.menu .home')).toBeVisible();
    await expect(page.locator('.menu .products')).toBeVisible();
    await expect(page.locator('.menu .contact')).toBeVisible();

    // Step 4: Validate background image
    const bgImage = await page.locator('#content').evaluate((el) =>
      window.getComputedStyle(el).backgroundImage
    );
    expect(bgImage).toContain('bg2.jpg');

    // Step 5: Logout
    await logout(page);

    // Step 6: Verify return to login screen
    await expect(
      page.getByText("Automation doesn't stop at testing, it's just a beginning!")
    ).toBeVisible();
  });
});
