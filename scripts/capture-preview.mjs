import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const previewUrl = process.env.PREVIEW_URL || 'http://127.0.0.1:3000';
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome' });
await mkdir('design/previews', { recursive: true });

try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  for (const [name, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844], ['mobile-small', 320, 568], ['mobile-landscape', 844, 390], ['tablet', 820, 1180], ['reference-size', 1084, 609]]) {
    await page.setViewportSize({ width, height });
    await page.goto(previewUrl);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `design/previews/${name}.png`, fullPage: true });
  }
  console.log('Saved desktop, phone, landscape, tablet and reference-size screenshots in design/previews/.');
} finally {
  await browser.close();
}
