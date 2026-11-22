'use client';
import { useEffect, useState } from 'react';
import { CART_STORAGE_KEY, CART_UPDATED_EVENT, products } from '../products';

function readCartCount() {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '{}');
    if (!cart || typeof cart !== 'object' || Array.isArray(cart)) return 0;
    return products.reduce((count, product) => {
      const packs = Number(cart[product.id]);
      return count + (Number.isFinite(packs) ? Math.max(0, Math.trunc(packs)) : 0);
    }, 0);
  } catch (error) {
    console.error('Unable to read the saved cart count.', error);
    return 0;
  }
}

export default function CartIconLink() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => setCount(readCartCount());
    const handleStorage = (event) => {
      if (event.key === CART_STORAGE_KEY || event.key === null) updateCount();
    };

    updateCount();
    window.addEventListener(CART_UPDATED_EVENT, updateCount);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, updateCount);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const label = count > 0 ? `Shopping cart, ${count} ${count === 1 ? 'item' : 'items'}` : 'Shopping cart';
  return <a className="icon-link" href="/cart/" aria-label={label}>
    <img src="/assets/brand/shopping-cart.png" alt="" />
    {count > 0 && <span className="cart-count" key={count} aria-hidden="true">{count > 99 ? '99+' : count}</span>}
  </a>;
}
