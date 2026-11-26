import { products, whatsappLink } from '../products';
import CartIconLink from './CartIconLink';
import ProductMenu from './ProductMenu';

export function Header() {
  return <header className="site-header">
    <a className="brand" href="/" aria-label="Goodshrub home"><img src="/assets/brand/goodshrub-logo.png" width="403" height="48" alt="Goodshrub" /></a>
    <nav className="header-actions" aria-label="Main navigation">
      <a className="nav-link" href="/products/">All Products</a>
      <ProductMenu products={products.map(({ id, name }) => ({ id, name }))} />
      <a className="nav-link" href="/contact/">Contact us</a>
      <span className="nav-divider" aria-hidden="true" />
      <CartIconLink />
      <a className="icon-link" href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><img src="/assets/brand/whatsapp.png" alt="" /></a>
      <a className="icon-link" href="https://www.instagram.com/goodshrub/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src="/assets/brand/instagram.png" alt="" /></a>
    </nav>
  </header>;
}

export function Footer() {
  return <footer className="site-footer"><div className="footer-content"><div className="footer-copy"><p>A Product of Akbar Brothers (Pvt) Ltd</p><p>No. 334, T.B Jayah Mawatha, <br />Colombo 10, Sri Lanka</p><p>This product is sustainably grown <br />and responsibly made</p></div><span className="certification-badge"><img src="/assets/brand/footer-artwork.png" width="1861" height="74" alt="Rainforest Alliance Certified" /></span></div></footer>;
}
