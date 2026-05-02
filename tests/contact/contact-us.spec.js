import {test, expect } from "@playwright/test";

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('should expand FAQ answer', async ({ page }) => {
    const faqQuestion = page.getByRole('button', {name: /where is my refund/i})
    
    await expect(faqQuestion).toContainText('+');
    await faqQuestion.click();
    await expect(faqQuestion).toContainText('-');

    await expect(page.getByText(/you will be refunded to the same payment/i)).toBeVisible();
  })

  test('should submit contact form successfully', async ({ page }) => {

    // filling form and submitting
    await page.getByLabel(/full name/i).fill("TEST NAME");
    await page.getByLabel(/email/i).fill("testing@test.com");
    await page.getByLabel(/message/i).fill("TEST MESSAGE");

    await page.getByRole('button', { name: /send/i }).click();

    // Verify message sent by checking text
    await expect(page.getByText(/We’ll get back to you soon/i)).toBeVisible();

    await expect(page).toHaveURL(/contact/);
  })

  test('should show validation for invalid email', async ({ page }) => {
    await page.goto('/contact');

    await page.getByLabel(/full name/i).fill('Test User');
    await page.getByLabel(/email/i).fill('wrongemail');
    await page.getByLabel(/message/i).fill('Hello');

    await page.getByRole('button', { name: /send/i }).click();

    // focuses on field with wrong input (email)
    await expect(
      page.getByLabel(/email/i)
    ).toBeFocused();
  });
})

