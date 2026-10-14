// Names and covers come from the live app (clients/mobile/constants/aesthetics.ts and the
// hero images it serves), so the site shows what Explore actually shows.
const HERO = 'https://assets.trendbag.in/wardrobe-aesthetics/heroes';

export const AESTHETICS = [
  { slug: 'desi-streetwear', name: 'Desi Streetwear', line: 'Oversized fits carrying desi identity' },
  { slug: 'old-money', name: 'Old Money', line: 'Tailored neutrals, no visible logos' },
  { slug: 'chikankari', name: 'Chikankari', line: 'Lucknawi white-on-white shadow work' },
  { slug: 'y2k', name: 'Y2K', line: 'Low-rise, baby tees, glossy futurism' },
  { slug: 'modern-saree', name: 'Modern Saree', line: 'Pre-stitched drapes and belted pallus' },
  { slug: 'indo-western', name: 'Indo-Western', line: 'A kurta over jeans, done deliberately' },
  { slug: 'college-casual', name: 'College Casual', line: 'Tees, jeans and easy layering' },
  { slug: 'kanjeevaram', name: 'Kanjeevaram', line: 'Silk, contrast borders, gold zari' },
  { slug: 'streetwear', name: 'Streetwear', line: 'Graphic, roomy and sneaker-led' },
  { slug: 'bollywood-glam', name: 'Bollywood Glam', line: 'Sequins and sparkle, camera-ready' },
  { slug: 'punjabi-street', name: 'Punjabi Street', line: 'Statement sneakers and swagger' },
  { slug: 'wedding-couture', name: 'Wedding Couture', line: 'Zardozi, pearls and heavy work' }
].map((a) => ({
  ...a,
  img: `${HERO}/${a.slug}.jpg`,
  href: `https://app.trendbag.in/public/aesthetic/${a.slug}?slug=${a.slug}`
}));
