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

export const viewport = { themeColor: '#48564d' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/assets/brand/green-tea.png" as="image" fetchPriority="high" />
      </head>
      <body>{children}</body>
    </html>
  );
}
