export const products = [
  { id: 'green-tea', name: 'Green Tea', subtitle: 'A classic Chinese Chunmee Green', origin: 'Jiangxi Province, China', description: 'A bright green brew with a smooth chestnut character and a brisk, sweet finish. Grown in China’s Green Tea Golden Triangle and made for a refreshing moment.', price: 20, color: '#d9e2c9' },
  { id: 'ceylon-black', name: 'Ceylon Black', subtitle: 'Grown in a rich tropical rainforest', origin: 'Lumbini Valley, Sri Lanka', description: 'Bold, smooth and naturally rich in flavour. This single-origin tea from Sri Lanka’s Lumbini Valley brings layered complexity and a refreshing sparkle to every sip.', price: 20, color: '#ead8c7' },
  { id: 'da-hong-pao', name: 'Da Hong Pao', subtitle: 'A remarkable oolong', origin: 'Wuyi Mountains, China', description: 'Roasted and rich, this oolong from China’s Wuyi Mountains is cold brewed and gently sparkling for a distinctive tea experience on the go.', price: 20, color: '#e9dfc9' },
];

export const whatsappNumber = '94777708448';
export const CART_STORAGE_KEY = 'goodshrub-cart-packs';
export const CART_UPDATED_EVENT = 'goodshrub-cart-updated';
export const formatPrice = (price) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
export const whatsappLink = (message = '') => `https://wa.me/${whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
