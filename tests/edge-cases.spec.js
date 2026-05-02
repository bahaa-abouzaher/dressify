// @ts-check
import { test, expect } from '@playwright/test';

test.describe('products searchbar', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/products')
  })

  test('should show no results for nonsense search', async ({ page }) => {
    const searchInput = page.locator('#searchBar');
    await searchInput.fill('xyznonexistent123');
    await page.waitForTimeout(500);

    await expect(page.getByTestId('product-card')).toHaveCount(0);
  })

})

