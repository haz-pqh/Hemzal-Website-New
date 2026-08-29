import { MenuItem, PromoVoucher } from '../types';

export interface SauceOption {
  id: string;
  name: string;
  price: number;
  badge?: string;
  description: string;
}

/**
 * Calculates number of included gourmet sauce cups based on piece count:
 * 1 pc = 1 cup (if sauce item)
 * 2-3 pcs = 1 cup
 * 4-5 pcs = 2 cups
 * 6-7 pcs = 3 cups
 * 8-9 pcs = 4 cups
 * 10-11 pcs = 5 cups
 * Formula: Math.max(1, Math.floor(pieces / 2))
 */
export function calculateSauceCups(pieces: number, isSauceSet: boolean = true): number {
  if (!isSauceSet || pieces <= 0) return 0;
  return Math.max(1, Math.floor(pieces / 2));
}

/**
 * Calculates total chicken set price:
 * Total = (pieces * RM 4.50) + (sauceCups * unitSaucePrice)
 */
export function calculateChickenPrice(pieces: number, unitPiecePrice: number = 4.50, unitSaucePrice: number = 0): number {
  if (pieces <= 0) return 0;
  const sauceCups = unitSaucePrice > 0 ? calculateSauceCups(pieces, true) : 0;
  return (pieces * unitPiecePrice) + (sauceCups * unitSaucePrice);
}

export const GOURMET_SAUCES: SauceOption[] = [
  {
    id: 'sos-cili',
    name: 'Sos Cili Istimewa',
    price: 0.00,
    badge: 'Percuma',
    description: 'Sos cili manis pedas signature yang sentiasa PERCUMA dengan setiap hidangan ayam!',
  },
  {
    id: 'sos-keju',
    name: 'Sos Keju (Cheese)',
    price: 2.00,
    description: 'Campuran keju berkrim premium, lemak masin yang menyelerakan (RM2.00 / cup).',
  },
  {
    id: 'sos-garlic',
    name: 'Sos Garlic (5-Bintang)',
    price: 2.00,
    description: 'Resepi Chef Hotel 5-Bintang beraroma bawang putih panggang berkrim (RM2.00 / cup).',
  },
  {
    id: 'sos-korean',
    name: 'Sos Korean Habanero',
    price: 2.00,
    description: 'Cili Habanero segar Cameron Highlands pedas manis menyengat (RM2.00 / cup).',
  },
  {
    id: 'sos-furikake',
    name: 'Sos Japanese Furikake',
    price: 3.00,
    description: 'Rumpai laut, bijan bakar dan umami tradisi Kumamoto Jepun (RM3.00 / cup).',
  },
  {
    id: 'sos-togarashi',
    name: 'Sos Japanese Togarashi',
    price: 3.00,
    description: 'Campuran 7 rempah tradisi Tokyo dengan lada Shichimi (RM3.00 / cup).',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // 1. HEMZAL ORIGINAL SET
  {
    id: 'hemzal-original',
    name: 'Hemzal ORIGINAL SET',
    tagline: 'Ayam Segar Diperap Rempah-Ratus Istimewa (RM4.50/Pcs)',
    description: 'Ayam segar yang diperap dengan rempah-ratus istimewa! Rangup di luar, juicy di dalam. Dihidang bersama pek sos cili percuma sentiasa.',
    price: 9.00,
    category: 'signature',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=80',
    isBestSeller: true,
    spiceLevel: 1,
    calories: 420,
    servings: 'Kustom sebarang ketul (RM4.50 / Ketul)',
    pieces: 2,
    pieceUnitPrice: 4.50,
    defaultSauce: 'Sos Cili Istimewa',
    saucePrice: 0.00,
    sauceInfo: 'Sos Cili Sentiasa PERCUMA',
    availableDips: [
      'Sos Cili (Percuma)',
      'Sos Keju (+RM2.00)',
      'Sos Garlic (+RM2.00)',
      'Sos Korean Habanero (+RM2.00)',
      'Sos Japanese Furikake (+RM3.00)',
      'Sos Japanese Togarashi (+RM3.00)',
    ],
    portions: [
      { label: '2 PCS', price: 9.00, pieces: 2 },
      { label: '6 PCS', price: 27.00, pieces: 6, isPopular: true },
      { label: '10 PCS', price: 45.00, pieces: 10 },
    ],
    options: {
      addons: [
        { id: 'add-coleslaw-1', name: 'Add-On Coleslaw (1 Cup 4oz)', price: 3.50 },
        { id: 'add-coleslaw-2', name: 'Add-On Coleslaw (2 Cup 4oz)', price: 6.50 },
        { id: 'add-extra-keju', name: 'Extra 1 Cup Sos Keju', price: 2.00 },
        { id: 'add-extra-garlic', name: 'Extra 1 Cup Sos Garlic', price: 2.00 },
        { id: 'add-extra-korean', name: 'Extra 1 Cup Sos Korean Habanero', price: 2.00 },
        { id: 'add-extra-furikake', name: 'Extra 1 Cup Sos Japanese Furikake', price: 3.00 },
        { id: 'add-extra-togarashi', name: 'Extra 1 Cup Sos Japanese Togarashi', price: 3.00 },
      ]
    }
  },

  // 2. HEMZAL CHEESE SET
  {
    id: 'hemzal-cheese',
    name: 'Hemzal CHEESE SET',
    tagline: 'Campuran Beberapa Jenis Keju Kualiti Premium (2/6/10 Pcs)',
    description: 'Campuran beberapa jenis keju kualiti premium yang terpilih! Tekstur berkrim kaya dengan rasa keju lemak masin yang menyelerakan. Dihidang bersama sos keju & sos cili percuma.',
    price: 11.00,
    category: 'signature',
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=80',
    isBestSeller: true,
    spiceLevel: 1,
    calories: 520,
    servings: '2 / 6 / 10 Ketul Ayam Goreng',
    pieces: 2,
    pieceUnitPrice: 4.50,
    defaultSauce: 'Sos Keju',
    saucePrice: 2.00,
    sauceInfo: 'Sos Keju Premium + Sos Cili Percuma',
    availableDips: [
      'Sos Keju (+RM2.00)',
      'Sos Cili (Percuma)',
      'Sos Garlic (+RM2.00)',
      'Sos Korean Habanero (+RM2.00)',
      'Sos Japanese Furikake (+RM3.00)',
      'Sos Japanese Togarashi (+RM3.00)',
    ],
    portions: [
      { label: '2 PCS', price: 11.00, pieces: 2 },
      { label: '6 PCS', price: 33.00, pieces: 6, isPopular: true },
      { label: '10 PCS', price: 55.00, pieces: 10 },
    ],
    options: {
      addons: [
        { id: 'add-coleslaw-1', name: 'Add-On Coleslaw (1 Cup 4oz)', price: 3.50 },
        { id: 'add-coleslaw-2', name: 'Add-On Coleslaw (2 Cup 4oz)', price: 6.50 },
        { id: 'add-extra-keju', name: 'Extra 1 Cup Sos Keju', price: 2.00 },
        { id: 'add-extra-garlic', name: 'Extra 1 Cup Sos Garlic', price: 2.00 },
        { id: 'add-extra-korean', name: 'Extra 1 Cup Sos Korean Habanero', price: 2.00 },
        { id: 'add-extra-furikake', name: 'Extra 1 Cup Sos Japanese Furikake', price: 3.00 },
        { id: 'add-extra-togarashi', name: 'Extra 1 Cup Sos Japanese Togarashi', price: 3.00 },
      ]
    }
  },

  // 3. HEMZAL GARLIC SET
  {
    id: 'hemzal-garlic',
    name: 'Hemzal GARLIC SET',
    tagline: 'Sos Garlic Istimewa Ciptaan Chef Hotel 5 Bintang (2/6/10 Pcs)',
    description: 'Sos Garlic istimewa yang dicipta oleh Chef Hotel 5 Bintang! Harum bawang putih panggang diadun lembut berkrim yang menyalut sempurna. Dihidang bersama sos garlic & sos cili percuma.',
    price: 11.00,
    category: 'signature',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80',
    isChefSpecial: true,
    spiceLevel: 0,
    calories: 480,
    servings: '2 / 6 / 10 Ketul Ayam Goreng',
    pieces: 2,
    pieceUnitPrice: 4.50,
    defaultSauce: 'Sos Garlic',
    saucePrice: 2.00,
    sauceInfo: 'Sos Garlic Chef 5-Bintang + Sos Cili Percuma',
    availableDips: [
      'Sos Garlic (+RM2.00)',
      'Sos Cili (Percuma)',
      'Sos Keju (+RM2.00)',
      'Sos Korean Habanero (+RM2.00)',
      'Sos Japanese Furikake (+RM3.00)',
      'Sos Japanese Togarashi (+RM3.00)',
    ],
    portions: [
      { label: '2 PCS', price: 11.00, pieces: 2 },
      { label: '6 PCS', price: 33.00, pieces: 6, isPopular: true },
      { label: '10 PCS', price: 55.00, pieces: 10 },
    ],
    options: {
      addons: [
        { id: 'add-coleslaw-1', name: 'Add-On Coleslaw (1 Cup 4oz)', price: 3.50 },
        { id: 'add-coleslaw-2', name: 'Add-On Coleslaw (2 Cup 4oz)', price: 6.50 },
        { id: 'add-extra-garlic', name: 'Extra 1 Cup Sos Garlic', price: 2.00 },
        { id: 'add-extra-keju', name: 'Extra 1 Cup Sos Keju', price: 2.00 },
        { id: 'add-extra-korean', name: 'Extra 1 Cup Sos Korean Habanero', price: 2.00 },
        { id: 'add-extra-furikake', name: 'Extra 1 Cup Sos Japanese Furikake', price: 3.00 },
        { id: 'add-extra-togarashi', name: 'Extra 1 Cup Sos Japanese Togarashi', price: 3.00 },
      ]
    }
  },

  // 4. HEMZAL KOREAN HABANERO SET
  {
    id: 'hemzal-habanero',
    name: 'Hemzal HABANERO SET',
    tagline: 'Cili Habanero Segar Cameron Highland (2/6/10 Pcs)',
    description: 'Dihasilkan dari cili Habanero yang dipetik segar dari Cameron Highland! Pedas menyengat berapi dengan sentuhan manis dan masam membangkitkan selera. Dihidang bersama sos habanero & sos cili percuma.',
    price: 11.00,
    category: 'signature',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=900&q=80',
    isBestSeller: true,
    spiceLevel: 3,
    calories: 490,
    servings: '2 / 6 / 10 Ketul Ayam Goreng',
    pieces: 2,
    pieceUnitPrice: 4.50,
    defaultSauce: 'Sos Korean Habanero',
    saucePrice: 2.00,
    sauceInfo: 'Sos Habanero Cameron Highland + Sos Cili Percuma',
    availableDips: [
      'Sos Korean Habanero (+RM2.00)',
      'Sos Cili (Percuma)',
      'Sos Keju (+RM2.00)',
      'Sos Garlic (+RM2.00)',
      'Sos Japanese Furikake (+RM3.00)',
      'Sos Japanese Togarashi (+RM3.00)',
    ],
    portions: [
      { label: '2 PCS', price: 11.00, pieces: 2 },
      { label: '6 PCS', price: 33.00, pieces: 6, isPopular: true },
      { label: '10 PCS', price: 55.00, pieces: 10 },
    ],
    options: {
      addons: [
        { id: 'add-coleslaw-1', name: 'Add-On Coleslaw (Pereda Pedas)', price: 3.50 },
        { id: 'add-coleslaw-2', name: 'Add-On Coleslaw (2 Cup 4oz)', price: 6.50 },
        { id: 'add-extra-korean', name: 'Extra 1 Cup Sos Korean Habanero', price: 2.00 },
        { id: 'add-extra-keju', name: 'Extra 1 Cup Sos Keju (Pereda Pedas)', price: 2.00 },
        { id: 'add-extra-garlic', name: 'Extra 1 Cup Sos Garlic', price: 2.00 },
        { id: 'add-extra-furikake', name: 'Extra 1 Cup Sos Japanese Furikake', price: 3.00 },
        { id: 'add-extra-togarashi', name: 'Extra 1 Cup Sos Japanese Togarashi', price: 3.00 },
      ]
    }
  },

  // 5. HEMZAL JAPANESE FURIKAKE SET
  {
    id: 'hemzal-furikake',
    name: 'Hemzal FURIKAKE SET',
    tagline: 'Umami Sebenar Asal Dari Kumamoto Jepun (2/6/10 Pcs)',
    description: 'Gabungan rasa umami sebenar yang berasal dari Kumamoto, Jepun! Keseimbangan rasa rumpai laut, bijan bakar dan perencah tradisi Jepun yang memikat. Dihidang bersama sos furikake & sos cili percuma.',
    price: 12.00,
    category: 'signature',
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=900&q=80',
    isChefSpecial: true,
    spiceLevel: 0,
    calories: 470,
    servings: '2 / 6 / 10 Ketul Ayam Goreng',
    pieces: 2,
    pieceUnitPrice: 4.50,
    defaultSauce: 'Sos Japanese Furikake',
    saucePrice: 3.00,
    sauceInfo: 'Sos Furikake Kumamoto Jepun + Sos Cili Percuma',
    availableDips: [
      'Sos Japanese Furikake (+RM3.00)',
      'Sos Cili (Percuma)',
      'Sos Keju (+RM2.00)',
      'Sos Garlic (+RM2.00)',
      'Sos Korean Habanero (+RM2.00)',
      'Sos Japanese Togarashi (+RM3.00)',
    ],
    portions: [
      { label: '2 PCS', price: 12.00, pieces: 2 },
      { label: '6 PCS', price: 36.00, pieces: 6, isPopular: true },
      { label: '10 PCS', price: 60.00, pieces: 10 },
    ],
    options: {
      addons: [
        { id: 'add-coleslaw-1', name: 'Add-On Coleslaw (1 Cup 4oz)', price: 3.50 },
        { id: 'add-coleslaw-2', name: 'Add-On Coleslaw (2 Cup 4oz)', price: 6.50 },
        { id: 'add-extra-furikake', name: 'Extra 1 Cup Sos Japanese Furikake', price: 3.00 },
        { id: 'add-extra-keju', name: 'Extra 1 Cup Sos Keju', price: 2.00 },
        { id: 'add-extra-garlic', name: 'Extra 1 Cup Sos Garlic', price: 2.00 },
        { id: 'add-extra-korean', name: 'Extra 1 Cup Sos Korean Habanero', price: 2.00 },
        { id: 'add-extra-togarashi', name: 'Extra 1 Cup Sos Japanese Togarashi', price: 3.00 },
      ]
    }
  },

  // 6. HEMZAL JAPANESE TOGARASHI SET
  {
    id: 'hemzal-togarashi',
    name: 'Hemzal TOGARASHI SET',
    tagline: '7 Rempah-Ratus Tradisi Masyarakat Tokyo (2/6/10 Pcs)',
    description: 'Campuran 7 jenis rempah-ratus tradisi masyarakat Tokyo! Menggabungkan lada cili Shichimi, kulit oren kering, bijan dan halia untuk aroma herba pedas unik. Dihidang bersama sos togarashi & sos cili percuma.',
    price: 12.00,
    category: 'signature',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=900&q=80',
    isNew: true,
    spiceLevel: 2,
    calories: 475,
    servings: '2 / 6 / 10 Ketul Ayam Goreng',
    pieces: 2,
    pieceUnitPrice: 4.50,
    defaultSauce: 'Sos Japanese Togarashi',
    saucePrice: 3.00,
    sauceInfo: 'Sos Togarashi Tokyo + Sos Cili Percuma',
    availableDips: [
      'Sos Japanese Togarashi (+RM3.00)',
      'Sos Cili (Percuma)',
      'Sos Keju (+RM2.00)',
      'Sos Garlic (+RM2.00)',
      'Sos Korean Habanero (+RM2.00)',
      'Sos Japanese Furikake (+RM3.00)',
    ],
    portions: [
      { label: '2 PCS', price: 12.00, pieces: 2 },
      { label: '6 PCS', price: 36.00, pieces: 6, isPopular: true },
      { label: '10 PCS', price: 60.00, pieces: 10 },
    ],
    options: {
      addons: [
        { id: 'add-coleslaw-1', name: 'Add-On Coleslaw (1 Cup 4oz)', price: 3.50 },
        { id: 'add-coleslaw-2', name: 'Add-On Coleslaw (2 Cup 4oz)', price: 6.50 },
        { id: 'add-extra-togarashi', name: 'Extra 1 Cup Sos Japanese Togarashi', price: 3.00 },
        { id: 'add-extra-keju', name: 'Extra 1 Cup Sos Keju', price: 2.00 },
        { id: 'add-extra-garlic', name: 'Extra 1 Cup Sos Garlic', price: 2.00 },
        { id: 'add-extra-korean', name: 'Extra 1 Cup Sos Korean Habanero', price: 2.00 },
        { id: 'add-extra-furikake', name: 'Extra 1 Cup Sos Japanese Furikake', price: 3.00 },
      ]
    }
  },

  // 7. HEMZAL SPECIAL BUCKET (FEAST COMBO)
  {
    id: 'hemzal-special-bucket',
    name: 'Hemzal Special Bucket (10-Pcs & 5 Sos)',
    tagline: '10 Pcs Ayam (RM4.50/Pcs) + 10 Sos Cili Percuma + 5 Sos Gourmet Lengkap!',
    description: 'Pakej terlaris seisi keluarga! Nikmati 10 ketul ayam goreng rangup & berjus (RM45 nilai ayam), 10 pek sos cili PERCUMA, serta LENGKAP dengan SEMUA 5 cawan sos signature (Garlic RM2, Cheese RM2, Korean RM2, Furikake RM3, Togarashi RM3).',
    price: 53.90,
    originalPrice: 57.00,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?auto=format&fit=crop&w=900&q=80',
    isBestSeller: true,
    isChefSpecial: true,
    spiceLevel: 2,
    calories: 2950,
    servings: '3-5 Orang (Pakej Lengkap 10 Pcs)',
    pieces: 10,
    pieceUnitPrice: 4.50,
    sauceInfo: '10x Sos Cili Percuma + 5x Cup Sos Gourmet Lengkap',
    includedItems: [
      '10 pcs x Ayam Goreng Crispy (Nilai RM45)',
      '10 pcs x Sos Cili Istimewa (PERCUMA)',
      '1 cup x Sos Garlic (5-Bintang)',
      '1 cup x Sos Keju (Cheese)',
      '1 cup x Sos Korean Habanero (Cameron)',
      '1 cup x Sos Japanese Furikake (Kumamoto)',
      '1 cup x Sos Japanese Togarashi (Tokyo)',
    ],
    availableDips: ['Semua 5 Cawan Sos Gourmet Termasuk Lengkap + Sos Cili'],
    options: {
      addons: [
        { id: 'add-coleslaw-1', name: 'Tambah 1 Cup Coleslaw 4oz', price: 3.50 },
        { id: 'add-coleslaw-2', name: 'Tambah 2 Cup Coleslaw 4oz (Jimat)', price: 6.50 },
        { id: 'add-extra-keju', name: 'Extra 1 Cup Sos Keju', price: 2.00 },
        { id: 'add-extra-garlic', name: 'Extra 1 Cup Sos Garlic', price: 2.00 },
        { id: 'add-extra-korean', name: 'Extra 1 Cup Sos Korean Habanero', price: 2.00 },
        { id: 'add-extra-furikake', name: 'Extra 1 Cup Sos Japanese Furikake', price: 3.00 },
        { id: 'add-extra-togarashi', name: 'Extra 1 Cup Sos Japanese Togarashi', price: 3.00 },
      ]
    }
  },

  // 8. ADD-ON / SIDES: HEMZAL SPECIAL COLESLAW
  {
    id: 'hemzal-special-coleslaw',
    name: 'Hemzal Special Coleslaw',
    tagline: 'Coleslaw Istimewa Hemzal Segar Harian',
    description: 'Coleslaw istimewa hemzal dibuat segar setiap hari dengan kubis rangup, lobak merah halus dan dressing mayonis rahsia chef yang masam manis menyegarkan.',
    price: 3.50,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?auto=format&fit=crop&w=900&q=80',
    isBestSeller: true,
    spiceLevel: 0,
    calories: 140,
    servings: '1-2 Orang',
    portions: [
      { label: '1 CUP 4 ONZ', price: 3.50 },
      { label: '2 CUP 4 ONZ', price: 6.50, isPopular: true },
    ],
  }
];

export const VOUCHERS: PromoVoucher[] = [
  {
    code: 'HEMZALFIRST',
    discountPercent: 15,
    minSpend: 25.00,
    description: 'Diskaun 15% untuk tempahan pertama anda! (Min belian RM25)'
  },
  {
    code: 'PADU5',
    discountAmount: 5.00,
    minSpend: 30.00,
    description: 'Potongan RM5 tunai untuk mana-mana set hidangan ayam Hemzal!'
  },
  {
    code: 'FAMILYFEAST',
    discountAmount: 10.00,
    minSpend: 60.00,
    description: 'Diskaun RM10 untuk pesanan 2x Hemzal Special Bucket / pembelian melebihi RM60!'
  }
];
