import React, { useState, useMemo } from 'react';
import { MenuItem, CustomizationOption, CartItem, PortionOption } from '../types';
import { X, Plus, Minus, Check, Sparkles, MessageSquare, ShoppingBag, Layers, Flame, Info } from 'lucide-react';
import { playPopSound, playCrunchSound } from '../utils/sound';
import { GOURMET_SAUCES, calculateSauceCups, calculateChickenPrice } from '../data/menuData';

interface ItemCustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
  initialPortion?: PortionOption;
}

export const ItemCustomizerModal: React.FC<ItemCustomizerModalProps> = ({
  item,
  onClose,
  onAddToCart,
  initialPortion,
}) => {
  const isChickenItem = item ? (item.category === 'signature' || item.pieceUnitPrice !== undefined) : false;
  const unitPiecePrice = item?.pieceUnitPrice || 4.50;
  const unitSaucePrice = item?.saucePrice || 0;
  const isSauceSet = unitSaucePrice > 0;

  // Initial piece count
  const initialPieces = initialPortion?.pieces || item?.pieces || 2;
  const [customPieces, setCustomPieces] = useState<number>(initialPieces);

  // Selected portion state
  const defaultPortion = initialPortion || (item?.portions && item.portions.length > 0 ? item.portions[0] : undefined);
  const [selectedPortion, setSelectedPortion] = useState<PortionOption | undefined>(defaultPortion);

  // Default Dip / Sauce
  const [selectedDip, setSelectedDip] = useState<string>(item?.defaultSauce || 'Sos Cili (Percuma)');
  const [selectedAddons, setSelectedAddons] = useState<CustomizationOption[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [orderQuantity, setOrderQuantity] = useState<number>(1);

  // Calculate included sauce cups dynamically: 2-3 pcs=1 cup, 4-5 pcs=2 cups, 6-7 pcs=3 cups, 8-9 pcs=4 cups, 10-11 pcs=5 cups
  const includedSauceCups = useMemo(() => {
    return isSauceSet ? calculateSauceCups(customPieces, true) : 0;
  }, [isSauceSet, customPieces]);

  // Base price computation
  const currentBasePrice = useMemo(() => {
    if (!item) return 0;
    if (isChickenItem) {
      return calculateChickenPrice(customPieces, unitPiecePrice, unitSaucePrice);
    }
    return selectedPortion ? selectedPortion.price : item.price;
  }, [item, isChickenItem, customPieces, unitPiecePrice, unitSaucePrice, selectedPortion]);

  const unitTotal = useMemo(() => {
    const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    return currentBasePrice + addonsTotal;
  }, [currentBasePrice, selectedAddons]);

  const finalTotalPrice = useMemo(() => {
    return unitTotal * orderQuantity;
  }, [unitTotal, orderQuantity]);

  if (!item) return null;

  // Handler for custom piece counter
  const handlePieceChange = (newPieces: number) => {
    if (newPieces < 1) return;
    playPopSound();
    setCustomPieces(newPieces);
    
    // Calculate exact price: (pieces * RM 4.50) + (cups * saucePrice)
    const calculatedPrice = calculateChickenPrice(newPieces, unitPiecePrice, unitSaucePrice);
    
    const matchingPredefined = item.portions?.find((p) => p.pieces === newPieces);
    if (matchingPredefined) {
      setSelectedPortion(matchingPredefined);
    } else {
      setSelectedPortion({
        label: `${newPieces} PCS`,
        price: calculatedPrice,
        pieces: newPieces,
        isCustom: true,
      });
    }
  };

  const handleSelectPresetPortion = (portion: PortionOption) => {
    playPopSound();
    setSelectedPortion(portion);
    if (portion.pieces) {
      setCustomPieces(portion.pieces);
    }
  };

  const toggleAddon = (addon: CustomizationOption) => {
    playPopSound();
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playCrunchSound();
    
    const portionToSave: PortionOption = isChickenItem
      ? {
          label: `${customPieces} PCS`,
          price: currentBasePrice,
          pieces: customPieces,
          isCustom: !item.portions?.some(p => p.pieces === customPieces),
        }
      : selectedPortion || { label: 'Standard', price: item.price };

    const newCartItem: CartItem = {
      cartId: `${item.id}-${portionToSave.label}-${Date.now()}`,
      item,
      quantity: orderQuantity,
      selectedPortion: portionToSave,
      customPieces: isChickenItem ? customPieces : undefined,
      selectedDip,
      selectedAddons,
      specialInstructions: specialInstructions.trim() || undefined,
      totalPrice: finalTotalPrice,
    };
    onAddToCart(newCartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-[#141418] border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-white my-6 flex flex-col max-h-[92vh]">
        
        {/* Header with Image */}
        <div className="relative h-44 sm:h-48 w-full bg-[#1c1c22] shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-[#141418]/30 to-black/60" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/65 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-lg"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on bottom of image */}
          <div className="absolute bottom-3 left-4 right-4">
            <span className="text-[10px] text-[#FDB913] font-black uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Pilihan Kustomisasi & Pakej
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white leading-tight drop-shadow">{item.name}</h3>
            <p className="text-xs text-neutral-300 font-medium mt-0.5">
              Kadar: <span className="text-[#FDB913] font-bold">RM {currentBasePrice.toFixed(2)}</span>
              {isChickenItem ? (
                <span className="ml-1.5 text-white/90 bg-black/50 px-2 py-0.5 rounded text-[11px] font-bold">
                  ({customPieces} Ketul Ayam)
                </span>
              ) : (
                selectedPortion && <span className="ml-1 text-white/80">({selectedPortion.label})</span>
              )}
            </p>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} data-lenis-prevent className="p-4 sm:p-5 overflow-y-auto space-y-5 flex-1 text-sm custom-scrollbar">
          
          {/* Item Description & Included details */}
          <div className="bg-white/5 p-3 rounded-2xl border border-white/5 space-y-1">
            <p className="text-xs text-neutral-300 leading-relaxed">
              {item.description}
            </p>
            {item.sauceInfo && (
              <p className="text-[11px] text-[#FDB913] font-semibold flex items-center gap-1.5 pt-0.5">
                <Sparkles className="w-3.5 h-3.5 shrink-0" /> Termasuk: {item.sauceInfo}
              </p>
            )}
          </div>

          {/* Special Bucket Included Items Checklist (if applicable) */}
          {item.includedItems && item.includedItems.length > 0 && (
            <div className="bg-[#1c1c24] p-3.5 rounded-2xl border border-[#FDB913]/30 space-y-2">
              <span className="text-xs font-black uppercase text-[#FDB913] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Kandungan Pakej Lengkap:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-neutral-200">
                {item.includedItems.map((inc, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1.5 rounded-lg">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-[11px]">{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 1. CUSTOMIZE NUMBER OF PIECES (CHICKEN) */}
          {isChickenItem && (
            <div className="space-y-3 bg-[#181820] p-4 rounded-2xl border border-[#E31E24]/30 shadow-inner">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#FDB913]" /> 1. Pilih Kuantiti Ketul (PCS)
                </label>
                <span className="text-[11px] bg-[#E31E24] text-white px-2 py-0.5 rounded-full font-bold">
                  1 Ketul = RM 4.50
                </span>
              </div>

              {/* Official Flyer Preset Buttons (2 PCS, 6 PCS, 10 PCS) */}
              <div className="grid grid-cols-3 gap-2.5">
                {[2, 6, 10].map((pcs) => {
                  const isSelected = customPieces === pcs;
                  const matchedPortion = item.portions?.find(p => p.pieces === pcs);
                  const presetPrice = matchedPortion ? matchedPortion.price : calculateChickenPrice(pcs, unitPiecePrice, unitSaucePrice);
                  return (
                    <button
                      type="button"
                      key={pcs}
                      onClick={() => handlePieceChange(pcs)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-gradient-to-b from-[#E31E24] to-[#B31217] border-[#FDB913] text-white shadow-xl scale-[1.02]'
                          : 'bg-[#121216] border-white/10 text-neutral-300 hover:border-white/30 hover:bg-[#1a1a22]'
                      }`}
                    >
                      {pcs === 6 && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#FDB913] text-black text-[9px] font-black px-2 py-0.5 rounded-full uppercase leading-none shadow-sm">
                          Popular
                        </span>
                      )}
                      <span className="text-sm font-black tracking-wide block">{pcs} PCS</span>
                      <span className="text-xs font-black text-[#FDB913] mt-1">RM {presetPrice.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>

              {/* Interactive Custom Piece Stepper */}
              <div className="bg-[#121216] p-3.5 rounded-xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-white block">
                    Kustom Sebarang Bilangan Ketul ({customPieces} PCS)
                  </span>
                  <div className="text-[11px] text-neutral-300 font-mono">
                    ({customPieces} pcs × RM 4.50)
                    {isSauceSet && (
                      <span className="text-[#FDB913]"> + ({includedSauceCups} cup sos × RM {unitSaucePrice.toFixed(2)})</span>
                    )}
                    {' '}= <strong className="text-[#FDB913] font-sans text-xs">RM {currentBasePrice.toFixed(2)}</strong>
                  </div>
                  {isSauceSet && (
                    <span className="text-[10px] text-emerald-400 block font-sans">
                      ✓ Termasuk {includedSauceCups} cup sos gourmet ({item.defaultSauce || 'Sos'}) + Sos Cili Percuma
                    </span>
                  )}
                </div>

                <div className="flex items-center bg-[#1c1c24] rounded-xl border border-white/15 p-1 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => handlePieceChange(Math.max(1, customPieces - 1))}
                    disabled={customPieces <= 1}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white cursor-pointer transition-colors"
                    aria-label="Kurangkan ketul"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  
                  <div className="px-3 min-w-[56px] text-center">
                    <span className="font-black text-sm text-[#FDB913]">{customPieces}</span>
                    <span className="text-[9px] text-neutral-400 block uppercase font-bold">Ketul</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePieceChange(customPieces + 1)}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-white cursor-pointer transition-colors"
                    aria-label="Tambah ketul"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Portion Selector for non-chicken items (like Coleslaw) */}
          {!isChickenItem && item.portions && item.portions.length > 0 && (
            <div className="space-y-2.5">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#FDB913]" /> 1. Pilih Saiz Bahagian
                </span>
                <span className="text-[11px] text-[#FDB913] font-normal">Wajib</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {item.portions.map((portion) => {
                  const isSelected = selectedPortion?.label === portion.label;
                  return (
                    <button
                      type="button"
                      key={portion.label}
                      onClick={() => handleSelectPresetPortion(portion)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-gradient-to-b from-[#E31E24]/30 to-[#E31E24]/10 border-[#E31E24] text-white shadow-md'
                          : 'bg-[#1a1a20] border-white/10 text-neutral-300 hover:border-white/30'
                      }`}
                    >
                      {portion.isPopular && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#FDB913] text-black text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase leading-none">
                          Popular
                        </span>
                      )}
                      <span className="text-sm font-black tracking-wide block">{portion.label}</span>
                      <span className="text-xs font-bold text-[#FDB913] mt-1">RM {portion.price.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* FREE CHILI SAUCE NOTICE BANNER */}
          {isChickenItem && (
            <div className="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-xl flex items-start gap-2.5 text-xs text-emerald-200">
              <Flame className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-300 font-black block">
                  Sos Cili Sentiasa PERCUMA (RM 0.00)!
                </strong>
                <p className="text-[11px] text-emerald-200/90 leading-tight">
                  Setiap pesanan ayam goreng Hemzal akan dibekalkan dengan Sos Cili secara percuma.
                </p>
              </div>
            </div>
          )}

          {/* 2. PILIHAN SOS GOURMET / SIGNATURE */}
          {isChickenItem && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-neutral-200 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#FDB913]" /> 2. Pilihan Sos Utama
                </label>
                <span className="text-[11px] text-neutral-400">Pilih 1 Sos</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {GOURMET_SAUCES.map((sauce) => {
                  const isSelected = selectedDip.includes(sauce.name) || (sauce.id === 'sos-cili' && selectedDip.toLowerCase().includes('cili'));
                  return (
                    <button
                      type="button"
                      key={sauce.id}
                      onClick={() => {
                        playPopSound();
                        setSelectedDip(`${sauce.name}${sauce.price > 0 ? ` (+RM${sauce.price.toFixed(2)})` : ' (Percuma)'}`);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                        isSelected
                          ? 'bg-[#FDB913]/15 border-[#FDB913] text-white shadow-sm'
                          : 'bg-[#181820] border-white/10 text-neutral-300 hover:border-white/25'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-bold text-xs flex items-center gap-1.5">
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#FDB913] stroke-[3]" />}
                          <span>{sauce.name}</span>
                        </span>
                        <span className={`text-[11px] font-black px-2 py-0.5 rounded-md ${
                          sauce.price === 0
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-white/10 text-[#FDB913]'
                        }`}>
                          {sauce.price === 0 ? 'PERCUMA' : `RM ${sauce.price.toFixed(2)}/cup`}
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-400 line-clamp-1">
                        {sauce.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Tambahan Pilihan (Add-ons seperti Coleslaw Hemzal Special & Extra Sos) */}
          {item.options?.addons && item.options.addons.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-[#FDB913]" /> 3. Tambahan Add-On (Coleslaw / Sos)
                </label>
                <span className="text-[11px] text-neutral-400">Pilihan Tambahan</span>
              </div>
              
              <div className="space-y-2">
                {item.options.addons.map((addon) => {
                  const isChecked = selectedAddons.some((a) => a.id === addon.id);
                  return (
                    <button
                      type="button"
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      className={`w-full p-2.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'bg-white/10 border-[#FDB913] text-white shadow-sm'
                          : 'bg-[#1a1a20] border-white/5 text-neutral-400 hover:border-white/20'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked ? 'bg-[#FDB913] border-[#FDB913] text-black' : 'border-neutral-600'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>{addon.name}</span>
                      </span>
                      <span className="text-[#FDB913] font-bold">+RM {addon.price.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. Nota Khas / Arahan */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-400 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" /> 4. Nota Khas untuk Dapur (Pilihan)
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Cth: Nak bahagian drumstick, sos asingkan, dsb."
              className="w-full px-3.5 py-2.5 bg-[#1a1a20] border border-white/10 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FDB913]"
            />
          </div>

          {/* Order Quantity & Submit Area */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            
            {/* Set Quantity Selector */}
            <div className="flex items-center bg-[#1a1a20] rounded-xl border border-white/10 p-1">
              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  setOrderQuantity(Math.max(1, orderQuantity - 1));
                }}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-white cursor-pointer"
                disabled={orderQuantity <= 1}
                aria-label="Kurangkan bilangan set"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <div className="w-9 text-center font-black text-sm text-white">
                {orderQuantity}x
              </div>
              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  setOrderQuantity(orderQuantity + 1);
                }}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-white cursor-pointer"
                aria-label="Tambah bilangan set"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Cart Submit */}
            <button
              type="submit"
              className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#E31E24] to-[#C1121F] hover:from-[#FDB913] hover:to-[#e39600] text-white hover:text-black font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#E31E24]/30 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Tambah • RM {finalTotalPrice.toFixed(2)}</span>
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};
