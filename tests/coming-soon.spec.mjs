import { test, expect, devices } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('the page loads its supplied assets locally without errors', async ({ page }) => {
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
  await expect(page).toHaveTitle('Goodshrub — Coming soon');
  await expect(page.getByRole('heading', { level: 1, name: 'Something is brewing', exact: true })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Something is brewing', exact: true })).toHaveAttribute('src', '/assets/brand/brewing-headline.png');
  await expect(page.getByRole('img', { name: 'Goodshrub', exact: true })).toHaveAttribute('src', '/assets/brand/goodshrub-logo.png');
  await expect(page.getByRole('img', { name: /sparkling cold brew tea can/ })).toHaveCount(3);
  expect(await page.locator('img').evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0))).toBe(true);
  expect(errors).toEqual([]);
  expect(externalRequests).toEqual([]);
});

test('the headline and three cans fit the first screen, with only the footer below it', async ({ page }) => {
  for (const [width, height] of [[320, 480], [320, 568], [360, 640], [375, 667], [390, 844], [430, 932], [600, 600], [700, 320], [700, 900], [757, 426], [768, 1024], [820, 1180], [1024, 768], [1024, 1366], [1084, 609], [1440, 900], [1536, 694], [1920, 600], [1920, 868], [1920, 1080]]) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);

    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `No horizontal scrolling at ${width}px`).toBe(true);
    const heading = await page.getByRole('heading', { level: 1 }).boundingBox();
    const header = await page.locator('.site-header').boundingBox();
    const footer = await page.locator('.site-footer').boundingBox();
    expect(heading.x).toBeGreaterThanOrEqual(0);
    expect(heading.x + heading.width).toBeLessThanOrEqual(width);
    expect(heading.y).toBeGreaterThanOrEqual(header.height);
    expect(footer.y, `Only the footer requires scrolling at ${width} by ${height}`).toBeCloseTo(height, 0);

    // The supplied PNGs have transparent margins: check the visible can artwork.
    const cans = await page.locator('.product-can').evaluateAll((images) => images.map((image) => {
      const box = image.getBoundingClientRect();
      const scale = box.width / image.naturalWidth;
      return { left: box.x + 237 * scale, right: box.x + 611 * scale, top: box.y + 66 * scale, labelBottom: box.y + 397 * scale, bottom: box.bottom };
    }));
    for (const can of cans) {
      expect(can.left, `Can stays in view at ${width}px`).toBeGreaterThanOrEqual(-1);
      expect(can.right).toBeLessThanOrEqual(width + 1);
      expect(can.top, `Heading does not overlap the cans at ${width}px`).toBeGreaterThanOrEqual(heading.y + heading.height);
      expect(can.labelBottom, `Product labels fit the first screen at ${width}px`).toBeLessThanOrEqual(height);
      expect(can.bottom, `The complete can artwork fits the first screen at ${width}px`).toBeLessThanOrEqual(height + 1);
      expect(can.bottom, `Cans meet the footer at ${width}px`).toBeGreaterThanOrEqual(footer.y - 2);
    }
    expect(cans[0].right).toBeLessThanOrEqual(cans[1].left + 2);
    expect(cans[1].right).toBeLessThanOrEqual(cans[2].left + 2);
    const inquiry = await page.getByRole('link', { name: 'Inquire Now' }).boundingBox();
    const brand = await page.getByRole('link', { name: 'Goodshrub home' }).boundingBox();
    expect(brand.x + brand.width).toBeLessThan(inquiry.x);
    await page.locator('.site-footer').scrollIntoViewIfNeeded();
    const revealedFooter = await page.locator('.site-footer').boundingBox();
    expect(revealedFooter.y + revealedFooter.height).toBeLessThanOrEqual(height + 1);
  }
});

test('touch devices have readable portrait and landscape layouts', async ({ browser }) => {
  for (const name of ['iPhone SE', 'iPhone 13', 'iPhone 13 landscape', 'Pixel 7', 'iPad (gen 7)', 'iPad (gen 7) landscape']) {
    const context = await browser.newContext({ ...devices[name], reducedMotion: 'reduce' });
    try {
      const page = await context.newPage();
      await page.goto('http://127.0.0.1:3100/');
      await page.evaluate(() => document.fonts.ready);
      const viewport = page.viewportSize();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${name} has no horizontal scrolling`).toBe(true);
      const footer = await page.locator('.site-footer').boundingBox();
      expect(footer.y, `${name} fits the main content on its first screen`).toBeCloseTo(viewport.height, 0);
      expect((await page.getByRole('link', { name: 'Inquire Now' }).boundingBox()).height).toBeGreaterThanOrEqual(44);
      expect(await page.locator('.footer-copy').evaluate((element) => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(12);

      if (viewport.width <= 1024 && viewport.height >= viewport.width) {
        const firstLine = await page.locator('.headline-start').boundingBox();
        const secondLine = await page.locator('.headline-end').boundingBox();
        const dots = await page.locator('.brewing-dots').boundingBox();
        expect(firstLine.height, `${name} headline remains readable`).toBeGreaterThanOrEqual(32);
        expect(secondLine.y).toBeGreaterThan(firstLine.y + firstLine.height);
        expect(dots.y).toBeGreaterThan(secondLine.y);
        expect(dots.y + dots.height).toBeLessThan(secondLine.y + secondLine.height);
      }
    } finally {
      await context.close();
    }
  }
});

test('Inquire Now links to the requested Instagram page and supports the keyboard', async ({ page }) => {
  await page.goto('/');
  const inquiry = page.getByRole('link', { name: 'Inquire Now' });
  await expect(inquiry).toHaveAttribute('href', 'https://www.instagram.com/goodshrub/');
  await expect(inquiry).toHaveAttribute('target', '_blank');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Goodshrub home' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(inquiry).toBeFocused();
});

test('dots appear one at a time, reset together, and never move the headline', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const dots = page.locator('.brewing-dots span');
  const originalBounds = await page.getByRole('heading', { level: 1 }).boundingBox();
  for (const [time, expected] of [[0, ['0', '0', '0']], [500, ['1', '0', '0']], [1000, ['1', '1', '0']], [1500, ['1', '1', '1']], [1850, ['0', '0', '0']], [2300, ['1', '0', '0']]]) {
    const visible = await dots.evaluateAll((elements, currentTime) => elements.map((element) => {
      for (const animation of element.getAnimations()) {
        animation.pause();
        animation.currentTime = currentTime;
      }
      return getComputedStyle(element).opacity;
    }), time);
    expect(visible).toEqual(expected);
    expect(await page.getByRole('heading', { level: 1 }).boundingBox()).toEqual(originalBounds);
  }
});

test('reduced motion keeps all three dots visible without animation', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('.brewing-dots span').evaluateAll((dots) => dots.map((dot) => ({ opacity: getComputedStyle(dot).opacity, animations: dot.getAnimations().length })))).toEqual([
    { opacity: '1', animations: 0 }, { opacity: '1', animations: 0 }, { opacity: '1', animations: 0 },
  ]);
});

test('desktop and mobile pass automated accessibility checks', async ({ page }) => {
  for (const viewport of [{ width: 1084, height: 609 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations).toEqual([]);
  }
});

test('the page, all three cans and inquiry link work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:3100/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    for (const tea of ['Green Tea', 'Da Hong Pao', 'Ceylon Black']) {
      await expect(page.getByRole('img', { name: `Goodshrub ${tea} sparkling cold brew tea can` })).toBeVisible();
    }
    await expect(page.getByRole('link', { name: 'Inquire Now' })).toHaveAttribute('href', 'https://www.instagram.com/goodshrub/');
  } finally {
    await context.close();
  }
});
