'use client';
import { useState } from 'react';

const extraImages = {
  'ceylon-black': [
    { src: '/assets/brand/ceylon-black-lifestyle-1.png', alt: 'Ceylon Black can with loose tea and a wooden scoop' },
  ],
  'da-hong-pao': [
    { src: '/assets/brand/da-hong-pao-lifestyle.png', alt: 'Da Hong Pao can with loose tea and a wooden scoop' },
  ],
};

export default function ProductGallery({ product }) {
  const images = [
    { src: `/assets/brand/${product.id}.png`, alt: `Goodshrub ${product.name} sparkling iced tea can` },
    ...(extraImages[product.id] || []),
  ];
  const [selected, setSelected] = useState(0);
  return <div className="product-gallery">
    <div className={`product-visual${selected ? ' product-visual-photo' : ''}`} style={{ '--product-color': product.color }}>
      {selected === 0 && <span className="visual-label">GOOD TEA.<br />GOOD MOMENTS.</span>}
      <img src={images[selected].src} alt={images[selected].alt} />
    </div>
    {images.length > 1 && <div className="gallery-thumbnails" aria-label={`${product.name} product images`}>
      {images.map((image, index) => <button key={image.src} type="button" className={index === 0 ? 'gallery-thumbnail gallery-thumbnail-can' : 'gallery-thumbnail'} style={{ '--product-color': product.color }} onClick={() => setSelected(index)} aria-label={index === 0 ? `View ${product.name} can` : `View ${product.name} image ${index + 1}`} aria-pressed={selected === index}><img src={image.src} alt="" /></button>)}
    </div>}
  </div>;
}
