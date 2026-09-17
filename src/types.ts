/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SupportedCity = 'malaga' | 'sevilla' | 'barcelona' | 'amsterdam' | 'germany';

export interface CityOption {
  id: SupportedCity;
  name: string;
  country: string;
  flag: string;
  subtitle: string;
  tag?: string;
}

export const SUPPORTED_CITIES: CityOption[] = [
  { id: 'malaga', name: 'Málaga', country: 'Espagne', flag: '🇪🇸', subtitle: 'Costa del Sol Reserve' },
  { id: 'sevilla', name: 'Sevilla', country: 'Espagne', flag: '🇪🇸', subtitle: 'Andalucía Selection' },
  { id: 'barcelona', name: 'Barcelona', country: 'Espagne', flag: '🇪🇸', subtitle: 'Catalonia Club Private' },
  { id: 'amsterdam', name: 'Amsterdam', country: 'Pays-Bas', flag: '🇳🇱', subtitle: 'Dam Connoisseur Menu' },
  { id: 'germany', name: 'Germany', country: 'Deutschland', flag: '🇩🇪', subtitle: 'Federal Top Shelf' },
];

export function isProductInCity(product: VideoItem, cityId?: SupportedCity | string | null): boolean {
  if (!cityId) return true;
  const target = String(cityId).toLowerCase().trim();

  // Check array of cities first
  if (Array.isArray(product.cities) && product.cities.length > 0) {
    return product.cities.some((c) => String(c).toLowerCase().trim() === target);
  }

  // Check single city
  if (product.city && typeof product.city === 'string' && product.city.trim()) {
    return product.city.toLowerCase().trim() === target;
  }

  // Backwards compatibility: if product has neither cities nor city assigned yet,
  // it is visible across all cities until configured by admin
  return true;
}

export type QuantityOption = '50g' | '100g' | '500g' | '1kg';
export const QUANTITY_OPTIONS: QuantityOption[] = ['50g', '100g', '500g', '1kg'];

export interface QuantityPricing {
  '50g'?: number;
  '100g'?: number;
  '500g'?: number;
  '1kg'?: number;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: 'Double Filtré' | 'Frozen Sift' | 'Beldi' | 'Sift Glacé' | string;
  city?: string;
  cities?: string[];
  displayZone?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  imageUrl?: string;
  isPremium: boolean;
  isFeatured?: boolean;
  rating?: number;
  reviewCount?: number;
  author: string;
  views: number;
  duration?: string;
  pricePerGram?: number;
  additionalPhotos?: string[];
  colors?: { name: string; hex: string; imageUrl: string }[];
  badge?: string;
  status?: string;
  stock?: number;
  wholesalePrice?: number;
  pricing?: QuantityPricing;
}

export function getCleanAuthor(author?: string): string {
  if (!author) return 'BISCOTTI BOYS';
  const clean = author.trim();
  if (/shelfterps|shelf\s*terps|tricoma|anassar/i.test(clean)) {
    return 'BISCOTTI BOYS';
  }
  return clean || 'BISCOTTI BOYS';
}

export interface CartItem {
  id: string;
  product: VideoItem;
  selectedSize: string;
  selectedQuantity?: string;
  unitPrice?: number;
  selectedColor: { name: string; hex: string; imageUrl: string };
  quantity: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phoneNumber: string;
  country: string;
  city: string;
  address: string;
  zipCode: string;
  paymentMethod: 'card' | 'apple_pay' | 'paypal' | 'cod';
  items: {
    productId: string;
    productName?: string;
    title: string;
    price: number;
    totalPrice?: number;
    category: string;
    selectedSize: string;
    selectedQuantity?: string;
    selectedColor: string;
    quantity: number | string;
    packCount?: number;
  }[];
  totalAmount: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  appliedPromoCode?: string;
  telegramId?: string;
  telegramUsername?: string;
}

export interface SectionTitle {
  id: string;
  text: string;
  category: string;
  size: 'S' | 'M' | 'L' | 'XL';
  color: string;
  enabled: boolean;
  order: number;
}

export interface MarqueeItem {
  id: string;
  text: string;
  active: boolean;
  order: number;
}

export interface MarqueeConfig {
  enabled: boolean;
  speed: 'slow' | 'medium' | 'fast';
  items: MarqueeItem[];
}

export const DEFAULT_MARQUEE_CONFIG: MarqueeConfig = {
  enabled: true,
  speed: 'medium',
  items: [
    { id: 'm1', text: '💎 BISCOTTI BOYS FARM — RÉSERVE PRIVÉE EUROPÉENNE 💎', active: true, order: 1 },
    { id: 'm2', text: '🇪🇸 MÁLAGA • 🇪🇸 SEVILLA • 🇪🇸 BARCELONA • 🇳🇱 AMSTERDAM • 🇩🇪 GERMANY', active: true, order: 2 },
    { id: 'm3', text: '🚀 EXPÉDITION & RETRAIT 24H/48H DISCRÈTE & SÉCURISÉE', active: true, order: 3 },
    { id: 'm4', text: '✨ EXTRACTIONS D\'EXCEPTION & SÉLECTIONS D\'ÉLITE', active: true, order: 4 },
    { id: 'm5', text: '👑 ESPACE VIP : OFFRES RÉSERVÉES & CATALOGUE EXCLUSIF', active: true, order: 5 },
  ],
};

export interface BrandingSettings {
  appDisabled?: boolean;
  introBgUrl: string;
  mainBgUrl?: string;
  launchScreenUrl: string;
  homepageHeroBgUrl: string;
  logoUrl: string;
  bgLogoUrl?: string;
  introVideoUrl?: string;
  introStatusLine: string;
  sectionTitles?: SectionTitle[];
  marqueeConfig?: MarqueeConfig;
  customAppUrl?: string;
  adminPassword?: string;
  instagramUrl?: string;
  instagramUrl2?: string;
  telegramChannelUrl?: string;
  telegramSupportUrl?: string;
  signalUrl?: string;
  whatsappUrl?: string;
  promoMessageText?: string;
  promoButtonText?: string;
  promoButtonText2?: string;
  promoImageUrl?: string;
}

export interface WhitelistItem {
  id: string;
  value: string;
  type: 'ID' | 'Username';
  notes?: string;
}

export interface PendingApproval {
  id: string;
  telegramId: string;
  username: string;
  firstName?: string;
  lastName?: string;
  date: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export function getSizeOptionsForCategory(category?: string): string[] {
  const cat = (category || '').trim().toLowerCase();
  if (cat.includes('accessoire') || cat.includes('accessories')) {
    return ['1 unité', '2 unités', '3 unités', '5 unités', '10 unités'];
  }
  return ['100G', '500G', '1KG'];
}

export function getDefaultSizeForProduct(product: VideoItem): string {
  const options = getSizeOptionsForCategory(product.category);
  return options[0] || '100G';
}

export function hasConfiguredQuantityPricing(product: VideoItem): boolean {
  if (!product.pricing || typeof product.pricing !== 'object') return false;
  return QUANTITY_OPTIONS.some((qty) => {
    const p = product.pricing?.[qty];
    return typeof p === 'number' && !isNaN(p) && p > 0;
  });
}

export function getAvailableQuantities(product: VideoItem): string[] {
  if (hasConfiguredQuantityPricing(product)) {
    return QUANTITY_OPTIONS.filter((qty) => {
      const p = product.pricing?.[qty];
      return typeof p === 'number' && !isNaN(p) && p > 0;
    });
  }
  return getSizeOptionsForCategory(product.category);
}

export function getProductPriceForQuantity(product: VideoItem, quantity?: string | null): number {
  if (quantity && product.pricing && typeof product.pricing === 'object') {
    const qKey = quantity.trim() as QuantityOption;
    if (product.pricing[qKey] !== undefined && typeof product.pricing[qKey] === 'number') {
      return product.pricing[qKey]!;
    }
    const lower = quantity.toLowerCase().replace(/\s+/g, '');
    for (const [key, val] of Object.entries(product.pricing)) {
      if (key.toLowerCase().replace(/\s+/g, '') === lower && typeof val === 'number') {
        return val;
      }
    }
  }
  // Le prix saisi par l'administrateur est définitif : aucun calcul automatique ni multiplication
  return typeof product.price === 'number' ? product.price : (Number(product.price) || 0);
}

export function getProductDisplayPrice(product: VideoItem): { price: number; label?: string } {
  if (hasConfiguredQuantityPricing(product)) {
    const validEntries = Object.entries(product.pricing!).filter(
      ([_, val]) => typeof val === 'number' && !isNaN(val) && val > 0
    ) as [QuantityOption, number][];
    if (validEntries.length > 0) {
      const minEntry = validEntries.reduce((prev, curr) => (curr[1] < prev[1] ? curr : prev));
      return { price: minEntry[1], label: `dès ${minEntry[0]}` };
    }
  }
  const rawPrice = typeof product.price === 'number' ? product.price : (Number(product.price) || 0);
  return { price: rawPrice };
}

export function getPriceForSize(basePrice: number, _size?: string, _category?: string): number {
  // Aucun calcul automatique : le prix posé est définitif
  return typeof basePrice === 'number' ? basePrice : (Number(basePrice) || 0);
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  minOrders: number;
  isActive: boolean;
  promoCode?: string;
}

export interface PromoCode {
  id: string;
  code: string;
  type: 'fixed' | 'percent';
  value: number;
  maxUses?: number;
  timesUsed?: number;
  expiredAt?: string; // YYYY-MM-DD
  isActive: boolean;
}

export interface VipLevelConfig {
  name: string;
  minOrders: number;
  points: number;
  icon: string;
  badgeClass: string;
}

export const VIP_LEVELS: VipLevelConfig[] = [
  { name: 'Member', minOrders: 0, points: 0, icon: '🥉', badgeClass: 'from-orange-950/40 to-red-950/50 border-amber-700/60 text-amber-500' },
  { name: 'Silver', minOrders: 10, points: 10000, icon: '🥈', badgeClass: 'from-zinc-800/40 to-zinc-950/50 border-zinc-400 text-zinc-300' },
  { name: 'Gold', minOrders: 20, points: 20000, icon: '🥇', badgeClass: 'from-amber-950/40 to-yellow-950/50 border-amber-500 text-amber-200' },
  { name: 'Elite', minOrders: 30, points: 30000, icon: '💎', badgeClass: 'from-purple-900/40 to-indigo-950/50 border-purple-500 text-purple-200' }
];

export interface ReviewItem {
  id: string;
  telegramId: string;
  telegramUsername: string;
  authorName: string;
  rating: number;
  comment: string;
  date: string;
  vipLevel?: string;
  verifiedPurchase: boolean;
  productCategory?: string;
}

export interface UserProfile {
  id: string;
  telegramId: string;
  telegramUsername: string;
  pseudo: string;
  dateJoined: string;
  totalOrders: number;
  totalSpent: number;
  points: number;
  level: string;
  unlockedRewards?: string[];
}
