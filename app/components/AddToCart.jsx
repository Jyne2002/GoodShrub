'use client';
import { useState } from 'react';
import { CART_STORAGE_KEY, CART_UPDATED_EVENT } from '../products';

export default function AddToCart({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  function add() {
    let cart = {};
    try { cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '{}') || {}; } catch {}
    cart[product.id] = Math.min(99, (Number(cart[product.id]) || 0) + quantity);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event(CART_UPDATED_EVENT));
    setAdded(true);
  }
  return <div className="purchase"><label className="field-label" htmlFor="quantity">Quantity (12-packs)</label><div className="quantity-control"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">−</button><input id="quantity" type="number" min="1" max="99" step="1" value={quantity} onChange={(event) => setQuantity(Math.max(1, Math.min(99, Math.trunc(Number(event.target.value)) || 1)))} /><button type="button" onClick={() => setQuantity(Math.min(99, quantity + 1))} aria-label="Increase quantity">+</button></div><button className="button button-dark" type="button" onClick={add}>Add to cart</button><div className="added-message" aria-live="polite">{added && <>{quantity} {quantity === 1 ? '12-pack' : '12-packs'} added to your cart. <a href="/cart/">View cart</a></>}</div></div>;
}
