export default function ProductDetails({ product }) {
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
