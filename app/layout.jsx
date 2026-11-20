import './globals.css';
import { Header, Footer } from './components/SiteChrome';

export const metadata = {
  title: 'Goodshrub | Sparkling iced tea',
  description: 'Discover Goodshrub single-origin sparkling iced teas.',
  icons: { icon: '/favicon.svg' },
  openGraph: { type: 'website', siteName: 'Goodshrub', title: 'Goodshrub | Sparkling iced tea', description: 'Discover Goodshrub single-origin sparkling iced teas.' },
  twitter: { card: 'summary' },
};
export const viewport = { themeColor: '#49574d' };
export default function RootLayout({ children }) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><Header />{children}<Footer /></body></html>;
}
