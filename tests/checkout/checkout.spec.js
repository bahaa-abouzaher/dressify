import {test, expect } from "@playwright/test";

test.describe('checkout page', () => {
  test('should redirect from checkout when not logged in', async ({ page }) => {
    await page.goto('/checkout')

    await expect(page).toHaveURL(/login/);
  })

})

