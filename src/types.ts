export type Region = 'all' | 'sl' | 'kl' | 'kv' | 'ns' | 'perak' | 'johor' | 'penang';

export type SpiceLevel = 'Biasa (Mild)' | 'Pedas Padu (Spicy)' | 'Extra Berapi 🔥🔥' | 'Tanpa Pedas (Zero Spice)';

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

export interface PortionOption {
  label: string; // e.g. "1 PCS", "2 PCS", "6 PCS", "10 PCS", "1 CUP 4 ONZ", "2 CUP 4 ONZ"
  price: number;
  pieces?: number;
  originalPrice?: number;
  isPopular?: boolean;
  isCustom?: boolean;
}

export interface SauceItem {
  id: string;
  name: string;
  price: number; // 0 for free cili, 2 for keju/garlic/korean, 3 for furikake/togarashi
  description?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'signature' | 'combos' | 'sides';
  image: string;
  isBestSeller?: boolean;
  isChefSpecial?: boolean;
  isNew?: boolean;
  spiceLevel: 0 | 1 | 2 | 3;
  calories?: number;
  servings?: string;
  pieces?: number;
  pieceUnitPrice?: number; // RM 4.50 per piece for chicken
  defaultSauce?: string;
  saucePrice?: number;
  availableDips?: string[];
  sauceInfo?: string;
  includedItems?: string[];
  portions?: PortionOption[];
  options?: {
    addons?: CustomizationOption[];
  };
}

export interface CartItem {
  cartId: string;
  item: MenuItem;
  quantity: number;
  selectedPortion?: PortionOption;
  customPieces?: number;
  selectedDip?: string;
  selectedDipPrice?: number;
  selectedAddons: CustomizationOption[];
  specialInstructions?: string;
  totalPrice: number;
}

export interface Branch {
  id: string;
  name: string;
  region: 'sl' | 'kl' | 'kv' | 'ns' | 'perak' | 'johor' | 'penang';
  regionLabel: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  whatsapp: string;
  openingHours: string;
  openHour: number; // 24hr format
  closeHour: number;
  features: ('Dine-in' | 'Takeaway' | 'Drive-thru' | 'Delivery' | 'Surau Available' | 'Parking Luas')[];
  wazeUrl: string;
  googleMapsUrl: string;
  isHQ?: boolean;
}

export interface Review {
  id: string;
  name: string;
  handle: string;
  location: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  favoriteItem: string;
  verified: boolean;
}

export interface PromoVoucher {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  minSpend: number;
  description: string;
}

