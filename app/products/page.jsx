import { products, formatPrice } from '../products';

export default function ProductsPage() {
  return <main id="main" className="inner-page products-page">
    <div className="page-intro products-intro">
      <h1>All Products<span className="accent-dot">.</span></h1>
    </div>
    <section className="product-grid" aria-label="All Goodshrub products">
      {products.map((product) => {
        const productHref = `/products/${product.id}/`;
        return <article className="product-card" key={product.id}>
          <a className={`product-card-art${product.assortment ? ' product-card-art-text' : ''}`} href={productHref} style={{ '--product-color': product.color }} aria-label={`View ${product.name} details`}>
            {product.assortment ? <span className="product-card-coming-soon">Coming Soon</span> : <img src={`/assets/brand/${product.id}.png`} alt={`Goodshrub ${product.name} sparkling cold brew tea`} />}
          </a>
          <div className="product-card-copy">
            <p className="eyebrow">Sparkling cold brew tea</p>
            <h2><a href={productHref}>{product.name}</a></h2>
            <p className="product-card-subtitle">{product.subtitlePrefix ? <><span className="subtitle-prefix">{product.subtitlePrefix} </span><strong>{product.subtitle}</strong></> : product.subtitle}</p>
            <p className="product-card-description">{product.description}</p>
            <div className="product-card-footer">
              <p>{formatPrice(product.price)} <span>per 6-pack</span></p>
              <a className="button button-dark" href={productHref}>{product.assortment ? 'View pack' : 'View tea'}</a>
            </div>
          </div>
        </article>;
      })}
    </section>
  </main>;
}
