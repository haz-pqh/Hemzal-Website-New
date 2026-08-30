import React, { useState, useEffect } from 'react';
import { CartItem, PromoVoucher } from '../types';
import { BRANCHES } from '../data/branchData';
import { VOUCHERS } from '../data/menuData';
import { X, Trash2, Plus, Minus, ShoppingBag, Tag, Check, Sparkles, MapPin, Truck, Store, MessageSquare, ExternalLink, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { OrderProcessingAnimation } from './OrderProcessingAnimation';
import { playPopSound, playCrunchSound } from '../utils/sound';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedBranchId, setSelectedBranchId] = useState<string>(BRANCHES[0].id);
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [voucherCodeInput, setVoucherCodeInput] = useState<string>('');
  const [appliedVoucher, setAppliedVoucher] = useState<PromoVoucher | null>(null);
  const [voucherError, setVoucherError] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  // Lottie checkout loading state
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<number>(1);
  const [checkoutProgress, setCheckoutProgress] = useState<number>(0);
  const [generatedWaUrl, setGeneratedWaUrl] = useState<string>('');

  // Financial calculations
  const rawSubtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  let discount = 0;
  if (appliedVoucher) {
    if (rawSubtotal >= appliedVoucher.minSpend) {
      if (appliedVoucher.discountPercent) {
        discount = (rawSubtotal * appliedVoucher.discountPercent) / 100;
      } else if (appliedVoucher.discountAmount) {
        discount = Math.min(appliedVoucher.discountAmount, rawSubtotal);
      }
    }
  }

  const foodTotal = Math.max(0, rawSubtotal - discount);

  const handleApplyVoucher = () => {
    setVoucherError('');
    const code = voucherCodeInput.trim().toUpperCase();
    const found = VOUCHERS.find((v) => v.code === code);
    if (!found) {
      setVoucherError('Kod baucar tidak sah.');
      return;
    }
    if (rawSubtotal < found.minSpend) {
      setVoucherError(`Minimum perbelanjaan untuk ${code} adalah RM ${found.minSpend.toFixed(2)}.`);
      return;
    }
    setAppliedVoucher(found);
    playPopSound();
    confetti({ particleCount: 50, spread: 45 });
  };

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;
    setFormError('');

    // Validation rules for direct checkout info
    if (!customerName.trim()) {
      setFormError('Sila isi Nama Penuh anda.');
      return;
    }

    if (!customerPhone.trim()) {
      setFormError('Sila isi Nombor Telefon anda.');
      return;
    }

    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      setFormError('Sila isi Alamat Penghantaran lengkap.');
      return;
    }

    playCrunchSound();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

    const selectedBranch = BRANCHES.find((b) => b.id === selectedBranchId) || BRANCHES[0];

    let msg = `🍗 *PESANAN HEMZAL CRISPY CHICKEN*\n`;
    msg += `----------------------------------------\n`;
    msg += `👤 *Nama Pelanggan:* ${customerName.trim()}\n`;
    msg += `📞 *Telefon:* ${customerPhone.trim()}\n`;
    msg += `📌 *Jenis Pesanan:* ${orderType === 'delivery' ? 'Penghantaran (Grab / Lalamove Delivery)' : `Ambil Sendiri di Outlet (${selectedBranch.name})`}\n`;
    
    if (orderType === 'delivery') {
      msg += `🏠 *Alamat Hantar:* ${deliveryAddress.trim()}\n`;
      msg += `🛵 *Kaedah Penghantaran:* Grab Express / Lalamove (Kadar Semasa)\n`;
    }

    msg += `----------------------------------------\n`;
    msg += `🛒 *SENARAI ITEM DIPESAN:*\n`;

    cart.forEach((item, index) => {
      const portionText = item.selectedPortion ? ` (${item.selectedPortion.label})` : '';
      msg += `\n*${index + 1}. ${item.item.name}${portionText}* (x${item.quantity})\n`;
      if (item.selectedDip) msg += `   • Sos Celup: ${item.selectedDip}\n`;
      if (item.selectedAddons.length > 0) {
        msg += `   • Tambahan: ${item.selectedAddons.map(a => `${a.name} (+RM${a.price.toFixed(2)})`).join(', ')}\n`;
      }
      if (item.specialInstructions) {
        msg += `   • Nota: "${item.specialInstructions}"\n`;
      }
      msg += `   • Subtotal Item: RM ${item.totalPrice.toFixed(2)}\n`;
    });

    msg += `\n----------------------------------------\n`;
    msg += `💵 *Subtotal Makanan:* RM ${rawSubtotal.toFixed(2)}\n`;
    if (discount > 0) {
      msg += `🏷️ *Diskaun Baucar (${appliedVoucher?.code}):* -RM ${discount.toFixed(2)}\n`;
    }
    if (orderType === 'delivery') {
      msg += `🛵 *Caj Penghantaran:* Mengikut caj sebenar Grab / Lalamove (disemak mengikut jarak)\n`;
      msg += `🔥 *JUMLAH MAKANAN:* *RM ${foodTotal.toFixed(2)}* (+ Caj Grab/Lalamove)\n`;
    } else {
      msg += `🔥 *JUMLAH KESELURUHAN:* *RM ${foodTotal.toFixed(2)}*\n`;
    }
    msg += `----------------------------------------\n`;
    msg += `Mohon sahkan pesanan dan sediakan hidangan panas. Terima kasih! 🙏`;

    const targetPhone = '601121992135';
    const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
    setGeneratedWaUrl(waUrl);

    setIsCheckingOut(true);
    setCheckoutStep(1);
    setCheckoutProgress(15);
  };

  useEffect(() => {
    if (!isCheckingOut) return;

    const timer1 = setTimeout(() => {
      setCheckoutStep(2);
      setCheckoutProgress(55);
    }, 600);

    const timer2 = setTimeout(() => {
      setCheckoutStep(3);
      setCheckoutProgress(90);
    }, 1200);

    const timer3 = setTimeout(() => {
      setCheckoutProgress(100);
      if (generatedWaUrl) {
        window.open(generatedWaUrl, '_blank');
      }
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isCheckingOut, generatedWaUrl]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Light Theme Drawer Panel */}
      <div className="relative w-full max-w-md sm:max-w-lg bg-white border-l border-neutral-200 h-full flex flex-col shadow-2xl text-neutral-900">
        
        {/* Header in #FDB913 Light Theme */}
        <div className="p-5 border-b border-amber-500/20 bg-[#FDB913] text-neutral-900 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 text-[#FDB913] flex items-center justify-center shadow-sm">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-lg text-neutral-900 leading-tight">Troli Pesanan</h3>
              <p className="text-[11px] font-bold text-neutral-800">{cart.length} item dipilih</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-neutral-900 hover:text-[#E31E24] font-black px-2.5 py-1 bg-black/10 hover:bg-black/20 rounded-lg transition-colors cursor-pointer"
                title="Kosongkan Troli"
              >
                Kosongkan
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-neutral-900 font-black cursor-pointer transition-colors"
              aria-label="Tutup troli"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Light Theme Body Content */}
        <div data-lenis-prevent className="p-5 overflow-y-auto flex-1 space-y-5 text-sm custom-scrollbar bg-neutral-50/50">
          
          {/* Order Type Switcher */}
          <div className="bg-neutral-100 p-1.5 rounded-2xl border border-neutral-200 grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => {
                playPopSound();
                setOrderType('delivery');
                if (formError) setFormError('');
              }}
              className={`py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                orderType === 'delivery'
                  ? 'bg-[#FDB913] text-neutral-900 shadow-sm border border-amber-500/30'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Penghantaran</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playPopSound();
                setOrderType('pickup');
                if (formError) setFormError('');
              }}
              className={`py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                orderType === 'pickup'
                  ? 'bg-[#FDB913] text-neutral-900 shadow-sm border border-amber-500/30'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Ambil Sendiri</span>
            </button>
          </div>

          {/* Delivery or Outlet details */}
          {orderType === 'pickup' ? (
            <div className="space-y-1.5 bg-white p-3.5 rounded-2xl border border-neutral-200/80 shadow-xs">
              <label className="text-xs font-black text-[#B45309] uppercase flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Pilih Outlet Pengambilan:
              </label>
              <select
                value={selectedBranchId}
                onChange={(e) => setSelectedBranchId(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-[#D97706] focus:bg-white transition-colors"
              >
                {BRANCHES.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.city})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="space-y-2 bg-white p-3.5 rounded-2xl border border-neutral-200/80 shadow-xs">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-[#B45309] uppercase flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B45309]" /> Alamat Penghantaran <span className="text-[#E31E24]">*</span>
                </label>
                <span className="text-[10px] text-[#B45309] bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold">
                  Kadar Grab / Lalamove
                </span>
              </div>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => {
                  setDeliveryAddress(e.target.value);
                  if (formError) setFormError('');
                }}
                placeholder="No rumah, jalan, taman, poskod bandar..."
                className={`w-full px-3 py-2 bg-neutral-50 border rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#D97706] focus:bg-white transition-colors ${
                  formError && orderType === 'delivery' && !deliveryAddress.trim()
                    ? 'border-[#E31E24] ring-1 ring-[#E31E24] bg-red-50/20'
                    : 'border-neutral-300'
                }`}
              />
              <div className="flex items-center gap-1.5 text-[10px] text-neutral-600 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                <Truck className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
                <span>Caj penghantaran bergantung kepada jarak & kadar sebenar <strong>Grab Express / Lalamove</strong>.</span>
              </div>
            </div>
          )}

          {/* Customer Name & Phone */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-extrabold text-neutral-700 uppercase mb-1 block">
                Nama Penuh <span className="text-[#E31E24]">*</span>
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  if (formError) setFormError('');
                }}
                placeholder="Nama anda..."
                className={`w-full px-3 py-2 bg-white border rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#D97706] shadow-xs ${
                  formError && !customerName.trim()
                    ? 'border-[#E31E24] ring-1 ring-[#E31E24] bg-red-50/20'
                    : 'border-neutral-300'
                }`}
              />
            </div>
            <div>
              <label className="text-[10px] font-extrabold text-neutral-700 uppercase mb-1 block">
                No Telefon <span className="text-[#E31E24]">*</span>
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => {
                  setCustomerPhone(e.target.value);
                  if (formError) setFormError('');
                }}
                placeholder="No telefon (cth: 012...)"
                className={`w-full px-3 py-2 bg-white border rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#D97706] shadow-xs ${
                  formError && !customerPhone.trim()
                    ? 'border-[#E31E24] ring-1 ring-[#E31E24] bg-red-50/20'
                    : 'border-neutral-300'
                }`}
              />
            </div>
          </div>

          {/* Cart Item List */}
          {cart.length === 0 ? (
            <div className="text-center py-12 space-y-3 bg-white rounded-3xl border border-neutral-200/80 shadow-xs">
              <ShoppingBag className="w-12 h-12 text-[#D97706]/50 mx-auto" />
              <h4 className="font-bold text-neutral-900 text-base">Troli Anda Masih Kosong</h4>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Pilih mana-mana hidangan kegemaran anda dari menu untuk mula memesan.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Senarai Makanan ({cart.length})
              </h4>

              {cart.map((cartItem) => (
                <div
                  key={cartItem.cartId}
                  className="bg-white p-3.5 rounded-2xl border border-neutral-200/80 flex gap-3 items-start shadow-xs"
                >
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-neutral-200"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-1">
                      <h5 className="font-black text-xs text-neutral-900 leading-tight truncate">
                        {cartItem.item.name}
                        {cartItem.selectedPortion && (
                          <span className="text-[#B45309] font-bold ml-1">
                            ({cartItem.selectedPortion.label})
                          </span>
                        )}
                      </h5>
                      <button
                        onClick={() => onRemoveItem(cartItem.cartId)}
                        className="text-neutral-400 hover:text-[#E31E24] p-0.5 cursor-pointer transition-colors"
                        title="Padam item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {cartItem.selectedDip && (
                      <p className="text-[11px] text-[#B45309] font-medium truncate">
                        Sos: {cartItem.selectedDip}
                      </p>
                    )}

                    {cartItem.selectedAddons.length > 0 && (
                      <p className="text-[10px] text-neutral-500 truncate">
                        + {cartItem.selectedAddons.map((a) => a.name).join(', ')}
                      </p>
                    )}

                    {cartItem.specialInstructions && (
                      <p className="text-[10px] text-neutral-500 italic">
                        "{cartItem.specialInstructions}"
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <span className="font-black text-sm text-[#B45309]">
                        RM {cartItem.totalPrice.toFixed(2)}
                      </span>

                      {/* Quantity buttons */}
                      <div className="flex items-center gap-1 bg-neutral-100 rounded-lg border border-neutral-300 p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(cartItem.cartId, -1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-neutral-700 hover:bg-neutral-200 hover:text-black cursor-pointer transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-neutral-900">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.cartId, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-neutral-700 hover:bg-neutral-200 hover:text-black cursor-pointer transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Voucher Promo Input */}
          {cart.length > 0 && (
            <div className="bg-white p-3.5 rounded-2xl border border-neutral-200/80 space-y-2 shadow-xs">
              <label className="text-xs font-bold text-neutral-700 uppercase flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#D97706]" /> Kod Baucar Diskaun
              </label>

              {appliedVoucher ? (
                <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-xl text-xs text-[#B45309]">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309]" />
                    <span>
                      Kod <strong>{appliedVoucher.code}</strong> digunakan!
                    </span>
                  </div>
                  <button
                    onClick={() => setAppliedVoucher(null)}
                    className="text-neutral-500 hover:text-neutral-900 font-bold text-[11px]"
                  >
                    Padam
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={voucherCodeInput}
                    onChange={(e) => setVoucherCodeInput(e.target.value)}
                    placeholder="Masukkan kod (cth: HEMZALFIRST)"
                    className="flex-1 px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-xs text-neutral-900 uppercase placeholder:normal-case placeholder:text-neutral-400 focus:outline-none focus:border-[#D97706] focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleApplyVoucher}
                    className="px-4 py-2 bg-[#FDB913] hover:bg-[#e0a410] text-neutral-900 font-black text-xs uppercase rounded-xl transition-all cursor-pointer shadow-xs"
                  >
                    Tebus
                  </button>
                </div>
              )}

              {voucherError && (
                <p className="text-[11px] text-[#E31E24] font-semibold">{voucherError}</p>
              )}
            </div>
          )}

        </div>

        {/* Footer Checkout Summary - Light Theme */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-neutral-200 bg-white space-y-3 shadow-lg">
            
            {/* Breakdown */}
            <div className="space-y-1.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal Makanan</span>
                <span className="font-bold text-neutral-900">RM {rawSubtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-[#B45309] font-bold">
                  <span>Diskaun Baucar ({appliedVoucher?.code})</span>
                  <span>- RM {discount.toFixed(2)}</span>
                </div>
              )}

              {orderType === 'delivery' && (
                <div className="flex justify-between items-center text-xs">
                  <span>Caj Penghantaran (Grab / Lalamove)</span>
                  <span className="text-[#B45309] font-bold text-[11px]">
                    Mengikut kadar semasa
                  </span>
                </div>
              )}

              <div className="flex justify-between text-sm font-black text-neutral-900 pt-2 border-t border-neutral-200">
                <span>Jumlah Makanan</span>
                <span className="text-2xl font-black text-[#B45309]">RM {foodTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Validation Error Message */}
            {formError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-[#E31E24]/30 text-[#E31E24] rounded-xl text-xs font-black animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* WhatsApp Checkout Button in #FDB913 */}
            <button
              onClick={handleCheckoutWhatsApp}
              disabled={isCheckingOut}
              className="w-full py-4 rounded-2xl bg-[#FDB913] hover:bg-[#e0a410] disabled:opacity-75 disabled:cursor-not-allowed text-neutral-900 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#FDB913]/30 transition-all cursor-pointer group"
            >
              <MessageSquare className="w-5 h-5 fill-neutral-900 group-hover:scale-110 transition-transform" />
              <span>Hantar Pesanan ke WhatsApp • RM {foodTotal.toFixed(2)}</span>
            </button>

            <p className="text-[10px] text-center text-neutral-500">
              {orderType === 'delivery'
                ? 'Caj rider Grab Express / Lalamove akan disemak dan dimaklumkan melalui WhatsApp mengikut alamat anda.'
                : 'Pesanan anda akan dihantar terus kepada staf dapur outlet untuk persediaan pantas.'}
            </p>

          </div>
        )}

      </div>

      {/* Light Theme Lottie-Based Checkout Loading Overlay */}
      {isCheckingOut && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-full max-w-sm bg-white border border-neutral-200 rounded-3xl p-6 sm:p-7 text-center shadow-2xl space-y-4 relative overflow-hidden text-neutral-900">
            
            {/* Top & bottom gradient glows */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-32 bg-[#FDB913]/25 blur-3xl pointer-events-none rounded-full" />
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-48 h-32 bg-[#FDB913]/25 blur-3xl pointer-events-none rounded-full" />

            {/* Animated Order Preparation Graphics */}
            <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
              <OrderProcessingAnimation step={checkoutStep} />
            </div>

            {/* Status Headings & Dynamic Steps */}
            <div className="space-y-1 relative z-10">
              <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-[#B45309] border border-amber-500/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#D97706]" /> Memproses Pesanan Hemzal
              </span>
              
              <h3 className="text-xl font-black text-neutral-900 pt-1">
                {checkoutStep === 1 && "🍗 Menyusun Pesanan Dapur..."}
                {checkoutStep === 2 && "🛵 Menyemak Kaedah Penghantaran..."}
                {checkoutStep === 3 && "💬 Menghubungkan ke WhatsApp..."}
              </h3>

              <p className="text-xs text-neutral-600 min-h-[32px] flex items-center justify-center">
                {checkoutStep === 1 && "Mengira jumlah potongan harga & sos celup istimewa..."}
                {checkoutStep === 2 && "Menyediakan butiran pesanan untuk dapur & rider Grab/Lalamove..."}
                {checkoutStep === 3 && "Membuka WhatsApp Admin rasmi (+60 16-417 5976)..."}
              </p>
            </div>

            {/* Animated Progress Bar */}
            <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden border border-neutral-200 p-0.5">
              <div
                className="h-full bg-[#FDB913] rounded-full transition-all duration-300 ease-out"
                style={{ width: `${checkoutProgress}%` }}
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <a
                href={generatedWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setIsCheckingOut(false);
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#FDB913] hover:bg-[#e0a410] text-neutral-900 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Buka WhatsApp Sekarang</span>
              </a>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsCheckingOut(false);
                    onClearCart();
                    onClose();
                  }}
                  className="flex-1 py-2 text-[11px] font-bold text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
                >
                  Selesai & Kosongkan
                </button>
                <button
                  onClick={() => setIsCheckingOut(false)}
                  className="flex-1 py-2 text-[11px] font-bold text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
                >
                  Tutup Status
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
