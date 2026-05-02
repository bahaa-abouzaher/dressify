import {test, expect } from "@playwright/test";

test.describe('Product Item Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/products/shirts/adidas-kids-tshirt')
  })

  test('should add item to cart', async ({ page }) => {
    const addButton = page.getByRole('button', {name: /Add to Cart/});
    await addButton.click();

    // Verify toast message appears
    await expect(page.getByText('Added Successfully')).toBeVisible();
    
    // Check if added to Cart
    await page.getByRole('button', {name: /open cart preview/i}).click();

    const cartPreview = page.getByTestId('cart-preview')
    await expect(cartPreview.getByText(/adidas kids t-shirt/i)).toBeVisible();
  })
})
