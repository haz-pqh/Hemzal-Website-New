import React, { useState, useMemo } from 'react';
import { MenuItem, PortionOption } from '../types';
import { Flame, Star, Search, Plus, Sparkles, Filter, Check, ShoppingBag, Eye, Award, Layers, ShieldCheck } from 'lucide-react';
import { playPopSound } from '../utils/sound';

interface MenuSectionProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem, initialPortion?: PortionOption) => void;
  onQuickAdd: (item: MenuItem, initialPortion?: PortionOption) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  onSelectItem,
  onQuickAdd,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Track selected portion preview for cards
  const [cardPortions, setCardPortions] = useState<Record<string, PortionOption>>({});

  const categories = [
    { id: 'all', label: 'Semua Menu', count: items.length },
    { id: 'signature', label: 'Set Ayam Crispy (Kustom Ketul)', count: items.filter(i => i.category === 'signature').length },
    { id: 'combos', label: 'Special Bucket Promo', count: items.filter(i => i.category === 'combos').length },
    { id: 'sides', label: 'Coleslaw Istimewa', count: items.filter(i => i.category === 'sides').length },
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, searchQuery]);

  const specialBucketItem = items.find((i) => i.id === 'hemzal-special-bucket');

  const handlePortionSelect = (itemId: string, portion: PortionOption) => {
    playPopSound();
    setCardPortions((prev) => ({ ...prev, [itemId]: portion }));
  };

  return (
    <section id="menu" className="py-20 bg-[#0c0c0e]/75 backdrop-blur-sm relative overflow-hidden">
      {/* Subtle Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_center,rgba(227,30,36,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#1a1a1e] border border-[#E31E24]/40 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest text-[#E31E24]">
            <Flame className="w-3.5 h-3.5 fill-[#E31E24]" />
            <span>Pilihan Gourmet Rasmi Hemzal</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            MENU & <span className="text-[#FDB913]">SENARAI HARGA</span>
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base">
            <span className="text-[#FDB913] font-bold">"Rangup di luar, Juicy di dalam!"</span> — Ayam segar diperap harian dengan resepi eksklusif dan dihidang panas mengikut tempahan anda.
          </p>

          {/* Pricing Structure Highlight Bar */}
          <div className="pt-2 grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-4xl mx-auto text-left">
            <div className="bg-[#181820] border border-white/10 p-3 rounded-2xl">
              <span className="text-[10px] text-neutral-400 uppercase font-black block">Kadar Asas Ayam</span>
              <strong className="text-sm font-black text-[#FDB913] block">RM 4.50 / Ketul</strong>
              <span className="text-[10px] text-neutral-300">Kustom sebarang kuantiti</span>
            </div>
            <div className="bg-emerald-950/30 border border-emerald-500/30 p-3 rounded-2xl">
              <span className="text-[10px] text-emerald-400 uppercase font-black block">Sos Cili</span>
              <strong className="text-sm font-black text-emerald-300 block">PERCUMA (RM 0.00)</strong>
              <span className="text-[10px] text-emerald-200/80">Disertakan setiap set</span>
            </div>
            <div className="bg-[#181820] border border-white/10 p-3 rounded-2xl">
              <span className="text-[10px] text-neutral-400 uppercase font-black block">Sos Keju / Garlic / Korean</span>
              <strong className="text-sm font-black text-[#FDB913] block">RM 2.00 / Cup</strong>
              <span className="text-[10px] text-neutral-300">Sos gourmet signature</span>
            </div>
            <div className="bg-[#181820] border border-white/10 p-3 rounded-2xl">
              <span className="text-[10px] text-neutral-400 uppercase font-black block">Sos Furikake / Togarashi</span>
              <strong className="text-sm font-black text-[#FDB913] block">RM 3.00 / Cup</strong>
              <span className="text-[10px] text-neutral-300">Sos import Jepun eksklusif</span>
            </div>
          </div>
        </div>

        {/* FEATURED PROMO BANNER: HEMZAL SPECIAL BUCKET (Image 2) */}
        {specialBucketItem && (
          <div className="mb-12 bg-gradient-to-r from-[#8a0c10] via-[#c21419] to-[#8a0c10] rounded-3xl p-6 sm:p-8 border border-[#FDB913]/40 shadow-2xl relative overflow-hidden">
            {/* Background badge */}
            <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-[#FDB913]/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Image & Price Ribbon */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-2xl h-64 sm:h-72 bg-neutral-900 border border-white/20 group">
                <img
                  src={specialBucketItem.image}
                  alt={specialBucketItem.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />
                
                {/* Official Slogan Badge */}
                <div className="absolute top-3 left-3 bg-white text-black font-black text-[11px] px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <Flame className="w-3 h-3 text-[#E31E24] fill-[#E31E24]" />
                  <span>Rangup di luar, Juicy di dalam!</span>
                </div>

                {/* Price Tag Box */}
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md border border-[#FDB913]/60 px-3.5 py-1.5 rounded-xl text-right">
                  <span className="text-[10px] text-neutral-400 line-through block leading-none">
                    Harga Asal RM 57.00
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-[#FDB913] leading-tight">
                    RM 53.90
                  </span>
                  <span className="text-[9px] text-emerald-400 font-bold block">Jimat RM 3.10!</span>
                </div>
              </div>

              {/* Offer Details */}
              <div className="lg:col-span-7 space-y-4 text-white">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-[#FDB913] text-black font-black text-xs uppercase px-3 py-1 rounded-full shadow">
                    🔥 Tawaran Istimewa Pembukaan
                  </span>
                  <span className="bg-black/40 text-[#FDB913] font-semibold text-xs px-3 py-1 rounded-full border border-white/10">
                    www.hemzalcrispychicken.com
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                    <span>HEMZAL SPECIAL BUCKET</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-100 mt-1 leading-relaxed">
                    Pakej hidangan pesta lengkap terlaris! Nikmati 10 ketul ayam rangup berjus bersama 10 pek sos cili serta LENGKAP dengan 5 cawan sos gourmet istimewa:
                  </p>
                </div>

                {/* Included 5 gourmet sauce cups breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div className="bg-black/50 border border-white/10 p-2 rounded-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    <span className="font-semibold text-neutral-200">10 pcs Ayam Crispy</span>
                  </div>
                  <div className="bg-black/50 border border-white/10 p-2 rounded-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                    <span className="font-semibold text-neutral-200">10 pcs Chili Sauce</span>
                  </div>
                  <div className="bg-black/50 border border-white/10 p-2 rounded-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FDB913] shrink-0" />
                    <span className="font-semibold text-neutral-200">1 cup Garlic Sauce</span>
                  </div>
                  <div className="bg-black/50 border border-white/10 p-2 rounded-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                    <span className="font-semibold text-neutral-200">1 cup Cheese Sauce</span>
                  </div>
                  <div className="bg-black/50 border border-white/10 p-2 rounded-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                    <span className="font-semibold text-neutral-200">1 cup Korean Habanero</span>
                  </div>
                  <div className="bg-black/50 border border-white/10 p-2 rounded-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0" />
                    <span className="font-semibold text-neutral-200">1 cup Furikake & Togarashi</span>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={() => {
                      playPopSound();
                      onQuickAdd(specialBucketItem);
                    }}
                    className="px-6 py-3 bg-[#FDB913] hover:bg-yellow-400 text-black font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-xl flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Pesan Special Bucket • RM 53.90</span>
                  </button>

                  <button
                    onClick={() => onSelectItem(specialBucketItem)}
                    className="px-4 py-3 bg-black/40 hover:bg-black/60 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/20 transition-colors cursor-pointer"
                  >
                    Kustomisasi
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Filters & Search Toolbar */}
        <div className="space-y-4 mb-10">
          
          {/* Search bar & Quality Assurance Badge */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="menu-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari Original, Cheese, Garlic, Habanero..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#16161a] border border-white/10 rounded-xl text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FDB913] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                >
                  Padam
                </button>
              )}
            </div>

            {/* Original Crispy Recipe Guarantee Pill */}
            <div className="inline-flex items-center gap-2 bg-[#16161c] border border-[#FDB913]/30 px-3.5 py-1.5 rounded-xl text-xs text-neutral-300">
              <ShieldCheck className="w-4 h-4 text-[#FDB913] shrink-0" />
              <span className="text-white font-bold">100% Resepi Original Crispy</span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-400 text-[11px]">Kepedasan & rasa dipilih melalui sos signature</span>
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    playPopSound();
                    setActiveCategory(cat.id);
                  }}
                  className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#E31E24] to-[#C1121F] text-white shadow-lg shadow-[#E31E24]/30 border border-[#FDB913]/30 scale-102'
                      : 'bg-[#151518] text-neutral-300 hover:text-white hover:bg-[#1f1f25] border border-white/5'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-black/30 text-[#FDB913]' : 'bg-white/10 text-neutral-400'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#131317] rounded-3xl border border-white/10">
            <Flame className="w-12 h-12 text-[#E31E24] mx-auto mb-3 opacity-50" />
            <h3 className="text-lg font-bold text-white">Tiada item dijumpai</h3>
            <p className="text-xs text-neutral-400 mt-1">Cuba tukar carian atau pilih kategori lain.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold text-white cursor-pointer"
            >
              Reset Pilihan
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const activePortion = cardPortions[item.id] || (item.portions && item.portions.length > 0 ? item.portions[0] : undefined);
              const displayPrice = activePortion ? activePortion.price : item.price;

              return (
                <div
                  key={item.id}
                  className="group bg-[#141418] hover:bg-[#18181f] rounded-3xl border border-white/10 hover:border-[#FDB913]/40 transition-all duration-300 overflow-hidden flex flex-col shadow-xl hover:shadow-2xl hover:shadow-black/50"
                >
                  {/* Image & Badges */}
                  <div className="relative h-56 w-full overflow-hidden bg-[#1f1f24]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-black/40" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
                      {item.isBestSeller && (
                        <span className="bg-[#E31E24] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                          <Flame className="w-3 h-3 fill-white" /> Best Seller
                        </span>
                      )}
                      {item.isChefSpecial && (
                        <span className="bg-[#FDB913] text-black text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                          <Star className="w-3 h-3 fill-black" /> Pilihan Chef
                        </span>
                      )}
                      {item.isNew && (
                        <span className="bg-amber-500 text-black text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-md">
                          Baharu
                        </span>
                      )}
                    </div>

                    {/* Original Recipe / Flavor Tag */}
                    <div className="absolute top-3.5 right-3.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-black text-[#FDB913] border border-[#FDB913]/30 flex items-center gap-1">
                      <span>✓ Original Crispy</span>
                    </div>

                    {/* Portions / Slogan footer inside photo */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 text-[11px] text-neutral-300 font-medium flex items-center justify-between">
                      <span className="bg-black/70 px-2 py-0.5 rounded text-[#FDB913] font-bold text-[10px]">
                        {item.sauceInfo ? `✓ ${item.sauceInfo}` : 'Rangup di luar, juicy di dalam'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-black text-lg text-white group-hover:text-[#FDB913] transition-colors leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#FDB913]">
                        {item.tagline}
                      </p>
                      <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Portion Tier Selector (2 PCS / 6 PCS / 10 PCS) from the poster */}
                    {item.portions && item.portions.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] text-neutral-400 uppercase font-bold flex items-center gap-1">
                          <Layers className="w-3 h-3 text-[#FDB913]" /> Pilih Saiz / Kuantiti:
                        </span>
                        <div className="grid grid-cols-3 gap-1.5">
                          {item.portions.map((portion) => {
                            const isSelected = activePortion?.label === portion.label;
                            return (
                              <button
                                key={portion.label}
                                type="button"
                                onClick={() => handlePortionSelect(item.id, portion)}
                                className={`py-1.5 px-2 rounded-xl text-center border transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#E31E24] border-[#E31E24] text-white shadow-md font-black'
                                    : 'bg-[#1a1a20] border-white/10 text-neutral-400 hover:text-white hover:border-white/30 font-medium'
                                }`}
                              >
                                <span className="text-[11px] block">{portion.label}</span>
                                <span className="text-[10px] font-bold text-[#FDB913] block">
                                  RM {portion.price.toFixed(2)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Price & Action Buttons */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-neutral-400 block uppercase font-bold">
                          {activePortion ? activePortion.label : 'Harga'}
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-black text-[#FDB913]">
                            RM {displayPrice.toFixed(2)}
                          </span>
                          {item.originalPrice && !activePortion && (
                            <span className="text-xs text-neutral-500 line-through">
                              RM {item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Customize Button */}
                        <button
                          onClick={() => onSelectItem(item, activePortion)}
                          className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                          title="Pilih kepedasan & sos"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Kustom</span>
                        </button>

                        {/* Quick Add Button */}
                        <button
                          onClick={() => {
                            playPopSound();
                            onQuickAdd(item, activePortion);
                          }}
                          className="p-2.5 sm:px-3.5 sm:py-2.5 rounded-xl bg-[#E31E24] hover:bg-[#FDB913] text-white hover:text-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-[#E31E24]/30 cursor-pointer"
                          title="Tambah Cepat ke Troli"
                        >
                          <Plus className="w-4 h-4" />
                          <span className="hidden sm:inline">Pesan</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
