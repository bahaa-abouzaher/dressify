import {test, expect } from "@playwright/test";

async function checkInputsHaveLabels(page) {
  const inputs = page.locator('input:not([type="hidden"]):not([type="submit"])');
  const count = await inputs.count();

  for (let i = 0; i < count; i++) {
    const input = inputs.nth(i);
    const id = await input.getAttribute('id');
    const ariaLabel = await input.getAttribute('aria-label');
    const placeholder = await input.getAttribute('placeholder');

    if (id) {
      const label = page.locator(`label[for="${id}"]`);
      const hasLabel = await label.count() > 0;
      const hasAriaLabel = !!ariaLabel;
      const hasPlaceholder = !!placeholder;

      expect(
        hasLabel || hasAriaLabel || hasPlaceholder,
        `Input #${id} has no label, aria-label, or placeholder`
      ).toBeTruthy();
    }
  }
}

async function checkImagesHaveAlt(page) {
  const images = page.locator('img');
  const count = await images.count();

  for (let i=0; i < count; i++) {
    const img = images.nth(i);
    const alt = await img.getAttribute('alt');
    const src = await img.getAttribute('src');

    // expect(value_you_are_testing, `Custom message if it fails (this is optional)`).toBeTruthy();
    if(alt === null)
      expect(alt, `Image ${src} is missing alt text`).toBeTruthy();
  }
}

test.describe('Accessibility', ()=> {

  test.describe('images have alt', () => {
    test('home images have alt', async ({ page }) => {
      await page.goto('/');
      await checkImagesHaveAlt(page);
    })
    
    test('products page images have alt', async ({ page }) => {
      await page.goto('/products/all');
      await checkImagesHaveAlt(page);
    })
    
    test('product description page images have alt', async ({ page }) => {
      await page.goto('/products/jackets/work-idea-thermal-jacket');
      await checkImagesHaveAlt(page);
    })

    test('about page images have alt', async ({ page }) => {
      await page.goto('/about');
      await checkImagesHaveAlt(page);
    })
  })

  test.describe('inputs have labels', () => {
    test('login inputs have labels', async ({ page }) => {
      await page.goto('/account/login');
      await checkInputsHaveLabels(page);
    })
    
    test('register inputs have labels', async ({ page }) => {
      await page.goto('/account/register');
      await checkInputsHaveLabels(page);
    })

    test('contact form inputs have labels', async ({ page }) => {
      await page.goto('/contact');
      await checkInputsHaveLabels(page);
    })
  })
})