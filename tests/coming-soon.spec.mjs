import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('the coming-soon page loads its brand assets locally without errors', async ({ page }) => {
  const errors = [];
  const externalRequests = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });
  page.on('request', (request) => {
    if (!request.url().startsWith('http://127.0.0.1:3100/')) externalRequests.push(request.url());
  });

  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveTitle('Goodshrub — Coming soon');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Something good is brewing.');
  await expect(page.getByRole('img', { name: 'Goodshrub', exact: true })).toHaveAttribute('src', '/assets/brand/goodshrub-logo.png');
  expect(await page.locator('img').evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0))).toBe(true);
  expect(errors).toEqual([]);
  expect(externalRequests).toEqual([]);
});

test('heading and tea controls fit phone, tablet and prototype dimensions', async ({ page }) => {
  for (const [width, height] of [[320, 568], [375, 667], [390, 844], [757, 426], [768, 1024], [1024, 768], [1440, 900], [1536, 694], [1920, 868], [1920, 1080]]) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);

    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `No horizontal scrolling at ${width}px`).toBe(true);
    for (const element of [page.getByRole('heading', { level: 1 }), page.getByRole('group', { name: 'Choose a tea' }), page.locator('.tea-details')]) {
      const bounds = await element.boundingBox();
      expect(bounds.x, `Content stays in view at ${width}px`).toBeGreaterThanOrEqual(0);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
      const documentHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      expect(bounds.y + bounds.height).toBeLessThanOrEqual(documentHeight);
    }

    const heading = await page.getByRole('heading', { level: 1 }).boundingBox();
    const header = await page.locator('.site-header').boundingBox();
    const stage = await page.locator('.product-stage').boundingBox();
    const details = await page.locator('.tea-details').boundingBox();
    expect(heading.y).toBeGreaterThanOrEqual(header.y + header.height);
    expect(heading.y + heading.height).toBeLessThanOrEqual(stage.y);
    expect(heading.y + heading.height).toBeLessThanOrEqual(details.y);

    const artworkWidthRatio = await page.locator('.details-green-tea').evaluate((image) => {
      const bounds = image.getBoundingClientRect();
      const renderedWidth = Math.min(bounds.width, bounds.height * image.naturalWidth / image.naturalHeight);
      return renderedWidth / bounds.width;
    });
    expect(artworkWidthRatio, `Artwork fills its column at ${width} by ${height}`).toBeGreaterThanOrEqual(.98);
  }
});

test('each colour selector displays the corresponding product image', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  for (const name of ['Da Hong Pao', 'Ceylon Black', 'Green Tea']) {
    await page.getByRole('radio', { name, exact: true }).check();
    await expect(page.getByRole('radio', { name, exact: true })).toBeChecked();
    await expect(page.getByRole('img', { name: `Goodshrub ${name} sparkling iced tea can` })).toBeVisible();
    await expect(page.getByRole('img', { name: /sparkling iced tea can/ })).toHaveCount(1);
    await expect(page.getByRole('img', { name: `${name} tasting notes and origin.`, exact: false })).toBeVisible();
    await expect(page.getByRole('img', { name: /tasting notes and origin/ })).toHaveCount(1);
  }
});

test('tea selection supports the keyboard', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.getByRole('radio', { name: 'Green Tea', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('radio', { name: 'Da Hong Pao', exact: true })).toBeChecked();
  await expect(page.getByRole('radio', { name: 'Da Hong Pao', exact: true })).toBeFocused();
  await expect(page.getByRole('img', { name: 'Goodshrub Da Hong Pao sparkling iced tea can' })).toBeVisible();
});

test('cans automatically advance every two seconds and loop through all three teas', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-09-08T12:00:00Z') });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.clock.pauseAt(new Date('2026-09-08T12:01:00Z'));

  // Start from a manually selected can to verify that selection resets the timer.
  await page.getByRole('radio', { name: 'Ceylon Black', exact: true }).check();
  await page.clock.runFor(1999);
  await expect(page.getByRole('img', { name: 'Goodshrub Ceylon Black sparkling iced tea can' })).toBeVisible();
  await expect(page.getByRole('img', { name: /^Ceylon Black tasting notes/ })).toBeVisible();
  await page.clock.runFor(1);
  await expect(page.getByRole('img', { name: 'Goodshrub Green Tea sparkling iced tea can' })).toBeVisible();
  await expect(page.getByRole('img', { name: /^Green Tea tasting notes/ })).toBeVisible();
  await page.clock.runFor(2000);
  await expect(page.getByRole('img', { name: 'Goodshrub Da Hong Pao sparkling iced tea can' })).toBeVisible();
  await expect(page.getByRole('img', { name: /^Da Hong Pao tasting notes/ })).toBeVisible();
  await page.clock.runFor(2000);
  await expect(page.getByRole('img', { name: 'Goodshrub Ceylon Black sparkling iced tea can' })).toBeVisible();
  await expect(page.getByRole('img', { name: /^Ceylon Black tasting notes/ })).toBeVisible();
});

test('the page passes automated accessibility checks', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(results.violations).toEqual([]);
});

test('the page and tea selection work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:3100/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.getByRole('radio', { name: 'Ceylon Black', exact: true }).check();
    await expect(page.getByRole('img', { name: 'Goodshrub Ceylon Black sparkling iced tea can' })).toBeVisible();
    await expect(page.getByRole('img', { name: /^Ceylon Black tasting notes/ })).toBeVisible();
  } finally {
    await context.close();
  }
});
