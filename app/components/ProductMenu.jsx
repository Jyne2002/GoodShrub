'use client';

function openForPointer(event) {
  if (event.pointerType !== 'touch') event.currentTarget.open = true;
}

function closeForPointer(event) {
  if (event.pointerType !== 'touch' && !event.currentTarget.contains(document.activeElement)) {
    event.currentTarget.open = false;
  }
}

function openForFocus(event) {
  event.currentTarget.open = true;
}

function closeAfterFocus(event) {
  if (!event.currentTarget.contains(event.relatedTarget) && !event.currentTarget.matches(':hover')) {
    event.currentTarget.open = false;
  }
}

export default function ProductMenu({ products }) {
  return <details className="product-menu" onPointerEnter={openForPointer} onPointerLeave={closeForPointer} onFocus={openForFocus} onBlur={closeAfterFocus}>
    <summary>Our teas <span className="chevron" aria-hidden="true" /></summary>
    <div className="product-dropdown">
      {products.map((product) => <a key={product.id} href={`/products/${product.id}/`}>{product.name}</a>)}
    </div>
  </details>;
}
