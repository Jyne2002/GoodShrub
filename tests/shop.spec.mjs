import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('product navigation and cart persist across pages and reloads', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Our teas', { exact: true }).click();
  await page.getByRole('link', { name: 'Ceylon Black' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Ceylon Black');
  await expect(page.getByText('Sold in packs of 12 cans. Minimum order: one pack.')).toBeVisible();
  await expect(page.getByText('$20.00', { exact: false })).toBeVisible();
  await expect(page.getByLabel('Quantity (12-packs)')).toHaveValue('1');
  await page.getByRole('button', { name: 'Decrease quantity' }).click();
  await expect(page.getByLabel('Quantity (12-packs)')).toHaveValue('1');
  await page.getByRole('button', { name: 'Increase quantity' }).click();
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.getByRole('link', { name: 'View cart' }).click();
  await expect(page.getByText('$40.00')).toBeVisible();
  await page.reload();
  await expect(page.getByLabel('12-packs: 2')).toBeVisible();
  await page.getByRole('button', { name: 'Increase Ceylon Black quantity' }).click();
  await expect(page.getByText('$60.00')).toBeVisible();
  const inquiry = page.getByRole('link', { name: 'Ask about your cart' });
  await expect(inquiry).toHaveAttribute('href', /wa\.me\/94777708448/);
  expect(decodeURIComponent(await inquiry.getAttribute('href'))).toContain('Ceylon Black: 3 12-packs');
  await page.getByRole('button', { name: 'Decrease Ceylon Black quantity' }).click();
  await page.getByRole('button', { name: 'Decrease Ceylon Black quantity' }).click();
  await expect(page.getByLabel('12-packs: 1')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Decrease Ceylon Black quantity' })).toBeDisabled();
  await page.getByRole('button', { name: 'Remove' }).click();
  await expect(page.getByText('Nothing brewing here yet.')).toBeVisible();
});

test('contact form opens a WhatsApp message for the supplied number', async ({ page }) => {
  await page.goto('/contact/');
  await page.getByLabel('Name').fill('Tea Fan');
  await expect(page.getByLabel('Email')).toHaveCount(0);
  await page.getByLabel('Message').fill('Hello Goodshrub');
  const url = await page.evaluate(() => new Promise((resolve) => { window.open = (url) => resolve(url); document.querySelector('form').requestSubmit(); }));
  expect(url).toContain('https://wa.me/94777708448?text=');
  expect(decodeURIComponent(url)).toContain('Tea Fan');
  expect(decodeURIComponent(url)).not.toContain('Email:');
  expect(decodeURIComponent(url)).toContain('Hello Goodshrub');
});

test('shop pages fit mobile and desktop and pass accessibility checks', async ({ page }) => {
  for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
    await page.setViewportSize(viewport);
    for (const path of ['/', '/products/green-tea/', '/products/ceylon-black/', '/products/da-hong-pao/', '/cart/', '/contact/']) {
      await page.goto(path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${path} at ${viewport.width}`).toBe(true);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(results.violations, `${path} at ${viewport.width}`).toEqual([]);
    }
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/products/green-tea/');
  await page.screenshot({ path: 'test-results/product-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/contact/');
  await page.screenshot({ path: 'test-results/contact-mobile.png', fullPage: true });
});
