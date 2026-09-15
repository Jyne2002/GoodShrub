import './globals.css';

export const metadata = {
  title: 'Goodshrub — Coming soon',
  description: 'Goodshrub sparkling iced tea. Our website is coming soon.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    siteName: 'Goodshrub',
    title: 'Goodshrub — Coming soon',
    description: 'Goodshrub sparkling iced tea. Our website is coming soon.',
  },
  twitter: { card: 'summary' },
};

export const viewport = { themeColor: '#49574d' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/assets/poppins-latin-600.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/poppins-latin-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
