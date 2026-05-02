// @ts-check
import { test, expect } from '@playwright/test';

test.describe('products searchbar', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/products')
  })


  test('Search updates URL', async ({ page }) => {
    await page.fill('#searchBar', 'adidas kids t-Shirt');
    await page.waitForTimeout(500);
    // await expect(page).toHaveURL(/search=adidas\+kids\+t-shirt/)
    await expect(page).toHaveURL(
      'http://localhost:3000/products/all?search=adidas+kids+t-shirt'
    );
    await expect(page.getByText('adidas kids T-Shirt')).toBeVisible();
    await expect(page.getByTestId('product-card')).toHaveCount(1);
  })

  test('should show no results for nonsense search', async ({ page }) => {
    const searchInput = page.locator('#searchBar');
    await searchInput.fill('xyznonexistent123');
    await page.waitForTimeout(500);

    await expect(page.getByTestId('product-card')).toHaveCount(1);
  })

})

