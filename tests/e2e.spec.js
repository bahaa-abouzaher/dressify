import { test, expect } from "@playwright/test";

test.describe('E2E User Flow', () => {

  test('user can search, add to cart, login, and complete checkout', async ({ page }) => {
    // 1) Home → navigate to Kids category and verify correct page
    await page.goto('/')
    await expect(page).toHaveURL('/')
    
    await page.getByRole('link', {name: /go to women products/i }).click();
    await expect(page).toHaveURL('/products/women?category=all')
    
    // 2) Products -> search bar -> verify search -> go to searched product page
    const count = await page.getByTestId('product-card').count();
    expect(count).toBeGreaterThanOrEqual(10);
    
    await page.fill('#searchBar', 'tory burch');
    
    await expect(page.getByTestId('product-card')).toHaveCount(1);
    
    await page.getByRole('link', { name: /tory burch/i }).click();

    await expect(page).toHaveURL(/tory-burch-women's-perry-tote/i);

    // 3) Add item to cart → open preview → verify item → navigate to cart page
    const addButton = page.getByRole('button', { name: /add to cart/i });
    await addButton.click();

    await expect(page.getByText(/added successfully/i)).toBeVisible();

    await page.getByRole('button', {name: /open cart preview/i}).click();

    const cartPreview = page.getByTestId('cart-preview');
    await expect(cartPreview.getByText(/tory burch/i)).toBeVisible();

    await page.getByText(/go to cart page/i).click();
    await expect(page).toHaveURL(/cart/i);

    // 4) Attempt checkout → redirected to login → login → return to checkout
    await page.getByText(/proceed to checkout/i).click();
    await expect(page).toHaveURL(/account\/login\?next=%2Fcheckout/i);

    await page.getByLabel(/email/i).fill('demo@demo.com');
    await page.getByLabel(/password/i).fill('Ww123456');
    await page.locator('button[type="submit"]').click();
    await expect(page.getByText('Login Successful')).toBeVisible();
    
    // 5) Fill required inputs, submit purchase, check
    
    // await page.getByRole('button', {name: /open cart preview/i}).click();
    // await page.getByText(/go to cart page/i).click();
    // await page.getByText(/proceed to checkout/i).click();
    if (!(await page.locator('#checkout-form').isVisible())) {
      await page.goto('/cart');
      await page.getByText(/proceed to checkout/i).click();
    }
    await expect(page).toHaveURL('/checkout');

    await page.getByLabel(/first name/i).fill('demo');
    await page.getByLabel(/last name/i).fill('buyer');
    await page.getByLabel(/street/i).fill('demo street');
    await page.getByLabel(/postcode/i).fill('12345');
    await page.getByLabel(/city/i).fill('demo city');
    
    await page.getByText(/buy now/i).click();
    await expect(page.getByText('purchase successful')).toBeVisible();

    await expect(page).toHaveURL(/order-success/i);
    await expect(page.getByText(/thank you for your purchase/i)).toBeVisible();

  })
})