export const products = [
  {
    id: 'green-tea', name: 'Green Tea', subtitle: 'A classic Chinese Chunmee Green', origin: 'Jiangxi Province, China',
    description: 'A traditional Chunmee from Jiangxi’s Green Tea Golden Triangle, grown around 500 metres above sea level. Expect a mellow cup with chestnut and soft soybean notes, brisk clarity and a sweet finish.',
    details: {
      story: [
        'Grown in Jiangxi Province’s Green Tea Golden Triangle at approximately 500 metres above sea level, this Chunmee is cultivated from small-leaf tea varieties.',
        'Traditional shaping gives the leaves a slender, tightly rolled form. In the cup, expect chestnut and soft soybean notes, a fresh, mellow palate, brisk clarity and a naturally sweet finish.',
        'The tea has been Rainforest Alliance certified since 2008.',
      ],
      ingredients: ['Purified Water', 'Chinese Green Tea Leaves', 'Ascorbic Acid'],
      netContents: '12 fl oz (355 mL)',
      caffeine: 'Contains naturally occurring caffeine from tea.',
      brewing: ['Cold-brewed for one hour without heat. Enzyme-assisted extraction helps release flavour compounds at low temperatures for a smoother, less bitter cup.', 'Ascorbic acid (Vitamin C) is included to help preserve freshness.'],
      qualityHighlights: ['No sugar detected', 'No fat detected', 'Laboratory tested by SGS Lanka', 'Microbiological testing conducted'],
    },
    price: 14.9, color: '#d9e2c9',
  },
  {
    id: 'ceylon-black', name: 'Ceylon Black', subtitle: 'Grown in a rich tropical rainforest', origin: 'Lumbini Valley, Sri Lanka',
    description: 'Estate Reserve low-grown Ceylon black tea from a single estate bordering Sri Lanka’s Sinharaja Rainforest. Hand-plucked and crafted in limited batches for a deep, elegant cup.',
    details: {
      story: [
        'This Estate Reserve Ceylon black tea comes from a single, low-grown estate bordering Sri Lanka’s Sinharaja Rainforest.',
        'Hand-plucked and crafted in limited quantities, it reflects its rainforest surroundings with depth, elegance and a naturally refined character.',
      ],
      ingredients: ['Purified Water', 'Lumbini Dust Organic Tea Leaves', 'Ascorbic Acid'],
      netContents: '12 fl oz (355 mL)',
      caffeine: 'Contains naturally occurring caffeine from tea.',
      brewing: ['Cold-brewed for one hour without heat. Enzyme-assisted extraction helps release flavour compounds at low temperatures for a smoother, less bitter cup.', 'Ascorbic acid (Vitamin C) is included to help preserve freshness.'],
      qualityHighlights: ['No sugar detected', 'No fat detected', 'Laboratory tested by SGS Lanka', 'Microbiological testing conducted'],
    },
    price: 14.9, color: '#ead8c7',
  },
  {
    id: 'da-hong-pao', name: 'Da Hong Pao', subtitle: 'A remarkable oolong', origin: 'Wuyi Mountains, China',
    description: 'A traditional, heavily oxidized Wuyi rock oolong from the Wuyi Mountains of Fujian, China, with full-bodied depth, layered aroma and a lingering rock-rhyme character.',
    details: {
      story: [
        'Da Hong Pao, or “Big Red Robe,” is a Wuyi rock oolong from Fujian Province’s Wuyi Mountains, a tea-growing region with a history spanning more than 400 years.',
        'Traditionally crafted and heavily oxidized, it offers a full-bodied cup with layered aroma and a lingering “Yan Yun,” or rock-rhyme, character shaped by the rocky mountain terroir.',
        'This artisan-produced tea is made in limited quantities.',
      ],
      ingredients: ['Purified Water', 'Da Hong Pao Tea Leaves', 'Ascorbic Acid'],
      netContents: '12 fl oz (355 mL)',
      caffeine: 'Contains naturally occurring caffeine from tea.',
      brewing: ['Cold-brewed for one hour without heat. Enzyme-assisted extraction helps release flavour compounds at low temperatures for a smoother, less bitter cup.', 'Ascorbic acid (Vitamin C) is included to help preserve freshness.'],
      qualityHighlights: ['No sugar detected', 'No fat detected', 'Laboratory tested by SGS Lanka', 'Microbiological testing conducted'],
    },
    price: 14.9, color: '#e9dfc9',
  },
  {
    id: 'assortment-pack', name: 'Assortment collection', subtitle: 'Two cans each of our three teas', subtitlePrefix: '6 cans -', origin: 'A mix of all three teas',
    description: 'A six-can variety pack with two cans each of Green Tea, Ceylon Black, and Da Hong Pao.',
    assortment: [
      { id: 'green-tea', quantity: 2 },
      { id: 'ceylon-black', quantity: 2 },
      { id: 'da-hong-pao', quantity: 2 },
    ],
    price: 14.9, color: '#e4eadf',
  },
];

export const whatsappNumber = '13648886830';
export const CART_STORAGE_KEY = 'goodshrub-cart-packs';
export const CART_UPDATED_EVENT = 'goodshrub-cart-updated';
export const formatPrice = (price) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
export const whatsappLink = (message = '') => `https://wa.me/${whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
