import { products } from '../products';

export default function ProductDetails({ product }) {
  if (product.assortment) {
    return <section className="product-details" aria-labelledby={`product-details-${product.id}`}>
      <div className="product-details-story">
        <p className="eyebrow">Pack contents</p>
        <h2 id={`product-details-${product.id}`}>Three teas. Two cans each.</h2>
        <p>This mixed 6-pack brings together Green Tea, Ceylon Black, and Da Hong Pao, with two cans of each.</p>
      </div>
      <div className="product-details-card">
        <h3>Inside this 6-pack</h3>
        <dl className="product-details-list">
          {product.assortment.map(({ id, quantity }) => {
            const tea = products.find((item) => item.id === id);
            return tea && <div key={id}>
              <dt><a href={`/products/${tea.id}/`}>{tea.name}</a></dt>
              <dd>{quantity} cans</dd>
            </div>;
          })}
        </dl>
        <p>Visit each tea’s product page for its ingredients and product information.</p>
      </div>
    </section>;
  }

  const { details } = product;

  return <section className="product-details" aria-labelledby={`product-details-${product.id}`}>
    <div className="product-details-story">
      <p className="eyebrow">Origin &amp; craft</p>
      <h2 id={`product-details-${product.id}`}>A tea with a sense of place</h2>
      {details.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </div>
    <div className="product-details-card">
      <h3>Ingredients &amp; product information</h3>
      <dl className="product-details-list">
        <div>
          <dt>Ingredients</dt>
          <dd>{details.ingredients.join(', ')}</dd>
        </div>
        <div>
          <dt>Net contents</dt>
          <dd>{details.netContents}</dd>
        </div>
        <div>
          <dt>Caffeine</dt>
          <dd>{details.caffeine}</dd>
        </div>
      </dl>
      <h3>Cold-brew process</h3>
      {details.brewing.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      <h3>Quality highlights</h3>
      <ul className="product-quality-list">
        {details.qualityHighlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
      </ul>
    </div>
  </section>;
}
