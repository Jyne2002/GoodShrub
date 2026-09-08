# Goodshrub — Coming soon

A minimal coming-soon website built with **Next.js App Router and React**, styled to match the supplied product-page prototype: dark green header, cream background, rounded pattern, bold type and an oversized angled tea can.

## Open the website without a terminal

Double-click **Open Website.bat** in this folder.

It starts Next.js in the background, waits for the website to be ready and opens your default browser. Clicking it again reopens the existing preview. It normally uses **http://127.0.0.1:3000**, and selects another free port if necessary.

Double-click **Stop Website.bat** to stop the preview and its child processes. It only stops the specific Node.js process recorded by the launcher, after checking its identity and start time.

Node.js 20.9 or newer must be installed. The dependencies are already installed in this workspace. On another computer, the launcher installs missing dependencies automatically; that first setup requires an internet connection. If startup fails, it shows a message with the log location under `.local/`.

## Project files

- `app/page.jsx` — the coming-soon page, rendered by Next.js.
- `app/layout.jsx` — document layout and page metadata.
- `app/components/tea-picker.jsx` — colour selectors and the two-second automatic can rotation.
- `app/globals.css` — responsive styling and local font definitions.
- `public/assets/brand/` — the original supplied logo, pattern, three can images and pouring photograph.
- `public/assets/` — local fonts and earlier design assets.
- `scripts/launch-preview.ps1` and `scripts/stop-preview.ps1` — helpers used by the batch files.

The only main copy is “Coming soon.” The cans automatically cycle through Green Tea, Da Hong Pao and Ceylon Black every two seconds. The three colour selectors have no surrounding selection ring and still support manual and keyboard selection. Choosing another can restarts the two-second timer. Without JavaScript, the page and manual selection continue to work using native radio controls and CSS.

## Deploying from GitHub to Hostinger

Connect the `prabhasha1115/GoodShrub` repository through Hostinger hPanel: **Websites → Add Website → Deploy Web App → Import Git Repository**. This managed Node.js deployment requires Business or Cloud hosting.

Select the `main` branch and confirm the detected Next.js settings: Node.js **24.x**, npm, repository root (`.`), build command `npm run build`, and build output `.next`. If a start command is requested, use `npm start`. Leave `HOSTINGER_EXPORT` unset for this deployment.

Deploy, check the preview, then use **Connect domain** in the website dashboard to attach the permanent domain. Push future commits to `main` to trigger the connected deployment.

## Optional static ZIP export

Double-click **Build Hostinger ZIP.bat** to generate `hostinger/goodshrub-hostinger.zip`. It shows a message when the build is ready. The ZIP contains a static Next.js export; the two-second can rotation runs in the browser. No Node.js server is required on Hostinger for this version.

In Hostinger hPanel, create a **Custom PHP/HTML website**, select your domain, then open its **File Manager → public_html**. Upload the ZIP and extract it there. `index.html`, `_next/` and `assets/` must sit directly inside `public_html`, without an extra containing folder. Back up an existing website before replacing its files. Connect the domain using the settings shown in hPanel and confirm HTTPS under **Security → SSL**.

The ZIP is a snapshot of the code at build time. Double-click the build file again after future changes and upload the new ZIP. The regular Next.js development launcher continues to work.

## Optional developer commands

```sh
npm ci
npm run dev
```

Production build and server:

```sh
npm run build
npm start
```

Next.js writes the build to `.next/`. Deploy with a Next.js-compatible host or Node.js server. The old `dist/` directory is no longer used.

Browser checks:

```sh
npm run build
npm test
```

Tests run against the production server on port 3100. They use installed Google Chrome by default; set `PLAYWRIGHT_CHANNEL=msedge` to use Microsoft Edge. Checks cover local assets, responsive layout, colour selection, keyboard controls, automated accessibility and operation without JavaScript.

## Brand assets and publishing

The active page uses the original logo, pattern and can artwork supplied on September 8. These files are copied into `public/assets/brand/` without changes, so the page does not depend on the Downloads folder. The supplied pouring photograph is available there for future use.

The generated drink image and temporary logo from the earlier design are no longer displayed. Font licenses are included alongside the local font files.

Once the permanent domain is ready, update the metadata in `app/layout.jsx` with the canonical URL and sharing-image URL, deploy the site, then generate the product-label QR code from that public address. Keep that address when the full website replaces this page.
