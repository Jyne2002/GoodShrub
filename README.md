# Goodshrub — Coming soon

A responsive Next.js landing page based on the supplied September 15 design: a dark green header, white background, pale rounded pattern, the three tea cans, and a sage green footer.

“Something is brewing” ends with three dots that appear in order every 450 milliseconds, then reset and repeat. The dots reserve their space so the heading stays still. Reduced-motion settings show all three dots without animation. “Inquire Now” opens [@goodshrub on Instagram](https://www.instagram.com/goodshrub/) in a new tab.

## Local development

Requires Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. On Windows PowerShell with restricted script execution, use `npm.cmd` in place of `npm`.

## Production build and checks

```sh
npm run build
npm test
```

The site is configured as a static export. The production website is written to `out/`, which can be uploaded to a static web host. To preview that exact build locally:

```sh
node scripts/serve-export.mjs
```

Open http://127.0.0.1:3100. This server is for local preview and browser checks.

Playwright uses installed Google Chrome by default; set `PLAYWRIGHT_CHANNEL=msedge` to use Microsoft Edge. Checks cover supplied assets, responsive layouts, visible product labels, the Instagram link, keyboard navigation, the dot animation and reduced motion, automated accessibility, and operation without JavaScript.

## Project files

- `app/page.jsx` — header, headline, three product images, and footer.
- `app/globals.css` — responsive layout, local font, and dot animation.
- `app/layout.jsx` — document layout and metadata.
- `public/assets/brand/` — supplied logo, pattern, can renders, and footer artwork.
- `scripts/capture-preview.mjs` — saves desktop, small and large phone, landscape, tablet, and reference-size screenshots to `design/previews/`.
- `scripts/serve-export.mjs` — serves `out/` locally for preview and tests.

## Design assets

The active images are copied unchanged from the supplied files into `public/assets/brand/`; the website does not depend on the original Downloads folder. The new can renders are `green-tea-can.png`, `da-hong-pao-can.png`, and `ceylon-black-can.png`. The new pattern and footer are `brewing-pattern.png` and `footer-artwork.png`.

The headline uses the supplied `brewing-headline.png`, with its printed dots cropped out in CSS and replaced by three animated dots. Navigation and footer text use locally hosted Poppins: regular (400) and semibold (600). The font's SIL Open Font License is included in `public/assets/poppins-LICENSE.txt`.

The header, headline, and all three supplied can renders fit within the first screen, including on shorter displays. The footer sits immediately below and is revealed by scrolling. The page and dot animation work without JavaScript.

Portrait phones and tablets display the supplied headline artwork across two larger lines, with the animated dots beside “brewing.” The cans have space between them, the background pattern keeps a consistent scale, and smaller screens use a larger footer font. Phone footers are centered, and short landscape screens use a compact header. Browser checks include touch-device emulation for phone and tablet profiles in both orientations.
