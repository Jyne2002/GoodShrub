import { products, formatPrice } from '../products';

export default function ProductsPage() {
  return <main id="main" className="inner-page products-page">
    <div className="page-intro products-intro">
      <p className="eyebrow">Goodshrub cold brew tea</p>
      <h1>All Products<span className="accent-dot">.</span></h1>
      <p>Explore the three teas and find your next favourite.</p>
    </div>
    <section className="product-grid" aria-label="All Goodshrub teas">
      {products.map((product) => {
        const productHref = `/products/${product.id}/`;
        return <article className="product-card" key={product.id}>
          <a className="product-card-art" href={productHref} style={{ '--product-color': product.color }} aria-label={`View ${product.name} details`}>
            <img src={`/assets/brand/${product.id}.png`} alt={`Goodshrub ${product.name} sparkling cold brew tea`} />
          </a>
          <div className="product-card-copy">
            <p className="eyebrow">Sparkling cold brew tea</p>
            <h2><a href={productHref}>{product.name}</a></h2>
            <p className="product-card-subtitle">{product.subtitle}</p>
            <p className="product-card-description">{product.description}</p>
            <div className="product-card-footer">
              <p>{formatPrice(product.price)} <span>per 6-pack</span></p>
              <a className="button button-dark" href={productHref}>View tea</a>
            </div>
          </div>
        </article>;
      })}
    </section>
  </main>;
}
