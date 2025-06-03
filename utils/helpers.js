/**
 * Logs in using the provided credentials.
 * @param {import('@playwright/test').Page} page 
 * @param {string} email 
 * @param {string} password 
 */
export async function login(page, email, password) {
    await page.getByLabel('User').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'LOGIN' }).click();
  }
  
  /**
   * Logs the user out by clicking the profile icon and logout button.
   * @param {import('@playwright/test').Page} page 
   */
  export async function logout(page) {
    await page.locator('.fas.fa-user-circle').click();
    await page.locator('#logout').click();
  }