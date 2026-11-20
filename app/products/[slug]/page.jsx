import { notFound } from 'next/navigation';
import { products, formatPrice } from '../../products';
import AddToCart from '../../components/AddToCart';

export function generateStaticParams() { return products.map(({ id }) => ({ slug: id })); }
export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = products.find((item) => item.id === slug);
  if (!product) notFound();
  return <main id="main" className="inner-page product-page"><div className="breadcrumb"><a href="/">Home</a><span>/</span><span>Our teas</span><span>/</span><span>{product.name}</span></div><div className="product-layout"><div className="product-visual" style={{ '--product-color': product.color }}><span className="visual-label">GOOD TEA.<br />GOOD MOMENTS.</span><img src={`/assets/brand/${product.id}.png`} alt={`Goodshrub ${product.name} sparkling iced tea can`} /></div><div className="product-info"><p className="eyebrow">Single origin · Sparkling iced tea</p><h1>{product.name}</h1><p className="product-subtitle">{product.subtitle}</p><p className="product-description">{product.description}</p><div className="product-meta"><div><span>Origin</span><strong>{product.origin}</strong></div><div><span>Good to know</span><strong>Cold brewed &amp; sparkling</strong></div></div><p className="product-price">{formatPrice(product.price)} <span>per 12-pack</span></p><p className="price-note">Sold in packs of 12 cans. Minimum order: one pack.</p><AddToCart product={product} /><p className="product-footnote">All fizz. No fuss. Just damn good tea.</p></div></div><section className="more-teas"><div><p className="eyebrow">Find your favourite</p><h2>More good tea.</h2></div><div className="more-tea-links">{products.filter((item) => item.id !== product.id).map((item) => <a href={`/products/${item.id}/`} key={item.id}>{item.name} <span aria-hidden="true">↗</span></a>)}</div></section></main>;
}
