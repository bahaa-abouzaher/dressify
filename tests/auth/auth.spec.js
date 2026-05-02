import {test, expect } from "@playwright/test";

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/account/login')
  })

  test('should display login form', async ({ page }) => {
    await expect(page.locator('h2')).toHaveText('Sign in to Dressify');
    await expect(page.locator('#account')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  })

  test('should show error for invalid credentials', async ({ page }) => {
    // Fill in invalid credentials
    await page.locator('#account').fill('wrong@email.com');
    await page.locator('#password').fill('wrongpassword');

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Verify error message
    const errorMessage = page.locator('#signin-form').getByRole('alert');
    await expect(errorMessage).toHaveText(/Email or password is incorrect/i);
  })

  test('should login successfully with valid credentials routing back to page before login', async ({ page }) => {
    await page.goto('/contact')
    await page.getByRole('link', {name: /login/i}).click();

    await expect(page).toHaveURL("http://localhost:3000/account/login?next=%2Fcontact");

    // Fill in valid credentials
    await page.locator('#account').fill('demo@demo.com');
    await page.locator('#password').fill('Ww123456');

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Verify toast message
    await expect(page.getByText('Login Successful')).toBeVisible();

    await expect(page).toHaveURL('/contact');
  })

})