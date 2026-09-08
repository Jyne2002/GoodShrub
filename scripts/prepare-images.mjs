import sharp from 'sharp';

await sharp('design/goodshrub-moment-original.png')
  .webp({ quality: 83, effort: 6 })
  .toFile('public/assets/goodshrub-moment.webp');

await sharp('public/social-card.svg')
  .png()
  .toFile('public/assets/social-card.png');

console.log('Web image and social preview exported.');
