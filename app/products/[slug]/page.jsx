import { notFound } from 'next/navigation';
import { products, formatPrice } from '../../products';
import AddToCart from '../../components/AddToCart';
import ProductGallery from '../../components/ProductGallery';
import ProductDetails from '../../components/ProductDetails';

export function generateStaticParams() { return products.map(({ id }) => ({ slug: id })); }
export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = products.find((item) => item.id === slug);
  if (!product) notFound();
  return <main id="main" className="inner-page product-page"><div className="product-layout"><ProductGallery product={product} /><div className="product-info"><p className="eyebrow">Zero Cal · Sparkling Cold Brew Tea</p><h1>{product.name}</h1><p className="product-subtitle">{product.subtitle}</p><p className="product-description">{product.description}</p><div className="product-meta"><div><span>Origin</span><strong>{product.origin}</strong></div><div><span>Good to know</span><strong>Cold brewed &amp; sparkling</strong></div></div><p className="product-price">{formatPrice(product.price)} <span>per 12-pack</span></p><p className="price-note">Sold in packs of 12 cans. Minimum order: one pack.</p><AddToCart product={product} /><p className="product-footnote">All fizz. No fuss. Just damn good tea.</p></div></div><ProductDetails product={product} /></main>;
}
