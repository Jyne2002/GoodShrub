import { products, whatsappLink } from '../products';

function Icon({ name }) {
  if (name === 'instagram') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
  if (name === 'whatsapp') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.4-4.7A8.5 8.5 0 1 1 20.5 11.7Z"/><path d="M8.4 7.8c.3-.5.6-.5.9-.5h.4c.2 0 .4.1.5.4l.7 1.7c.1.3 0 .5-.1.7l-.6.7c.4.9 1.7 2.2 2.7 2.7l.7-.7c.2-.2.4-.2.7-.1l1.7.8c.3.1.4.3.4.5 0 .3-.1.8-.5 1.2-.5.5-1.2.7-1.9.5-3.5-1-6-3.5-6.9-6.5-.2-.6 0-1.1.3-1.4Z"/></svg>;
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 8h14l1 12H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>;
}

export function Header() {
  return <header className="site-header">
    <a className="brand" href="/" aria-label="Goodshrub home"><img src="/assets/brand/goodshrub-logo.png" width="403" height="48" alt="Goodshrub" /></a>
    <nav className="header-actions" aria-label="Main navigation">
      <details className="product-menu"><summary>Our teas <span className="chevron" aria-hidden="true" /></summary><div className="product-dropdown">{products.map((product) => <a key={product.id} href={`/products/${product.id}/`}>{product.name}</a>)}</div></details>
      <a className="nav-link" href="/contact/">Contact us</a>
      <span className="nav-divider" aria-hidden="true" />
      <a className="icon-link" href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><Icon name="whatsapp" /></a>
      <a className="icon-link" href="https://www.instagram.com/goodshrub/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Icon name="instagram" /></a>
      <a className="icon-link" href="/cart/" aria-label="Shopping cart"><Icon name="cart" /></a>
    </nav>
  </header>;
}

export function Footer() {
  return <footer className="site-footer"><div className="footer-content"><div className="footer-copy"><p>A Product of Akbar Brothers (Pvt) Ltd</p><p>No. 334, T.B Jayah Mawatha, <br />Colombo 10, Sri Lanka</p><p>This product is sustainably grown <br />and responsibly made</p></div><span className="certification-badge"><img src="/assets/brand/footer-artwork.png" width="1861" height="74" alt="Rainforest Alliance Certified" /></span></div></footer>;
}
