import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { MenuItem, CartItem, PortionOption } from './types';
import { MENU_ITEMS } from './data/menuData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ChefStory } from './components/ChefStory';
import { MenuSection } from './components/MenuSection';
import { BranchLocator } from './components/BranchLocator';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { CateringFranchiseModal } from './components/CateringFranchiseModal';
import { ShoppingBag, CheckCircle2, ArrowUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCrunchSound } from './utils/sound';

export default function App() {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('hemzal_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('hemzal_cart', JSON.stringify(cart));
    } catch {
      // LocalStorage error fallback
    }
  }, [cart]);

  // Modal states
  const [customizingState, setCustomizingState] = useState<{ item: MenuItem; portion?: PortionOption } | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFranchiseModalOpen, setIsFranchiseModalOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);

    // Global anchor smooth click listener
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, { offset: -60, duration: 1.2 });
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  // Add customized item to cart
  const handleAddToCart = (newCartItem: CartItem) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (ci) =>
          ci.item.id === newCartItem.item.id &&
          ci.selectedPortion?.label === newCartItem.selectedPortion?.label &&
          ci.selectedDip === newCartItem.selectedDip &&
          JSON.stringify(ci.selectedAddons) === JSON.stringify(newCartItem.selectedAddons) &&
          ci.specialInstructions === newCartItem.specialInstructions
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const existing = updated[existingIndex];
        const newQty = existing.quantity + newCartItem.quantity;
        const unitP = existing.totalPrice / existing.quantity;
        updated[existingIndex] = {
          ...existing,
          quantity: newQty,
          totalPrice: unitP * newQty,
        };
        return updated;
      }
      return [...prev, newCartItem];
    });

    const portionLabel = newCartItem.selectedPortion ? ` (${newCartItem.selectedPortion.label})` : '';
    showToast(`✓ "${newCartItem.item.name}${portionLabel}" ditambah ke troli!`);
  };

  // Quick add with defaults
  const handleQuickAdd = (item: MenuItem, initialPortion?: PortionOption) => {
    const selectedPortion = initialPortion || (item.portions && item.portions.length > 0 ? item.portions[0] : undefined);
    const basePrice = selectedPortion ? selectedPortion.price : item.price;

    const newCartItem: CartItem = {
      cartId: `${item.id}-${selectedPortion?.label || 'default'}-${Date.now()}`,
      item,
      quantity: 1,
      selectedPortion,
      selectedDip: item.availableDips?.[0],
      selectedAddons: [],
      totalPrice: basePrice,
    };
    handleAddToCart(newCartItem);
    confetti({ particleCount: 30, spread: 40 });
  };

  // Cart quantity update
  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            const unitP = item.totalPrice / item.quantity;
            return {
              ...item,
              quantity: newQty,
              totalPrice: unitP * newQty,
            };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  // Cart remove
  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen text-neutral-100 selection:bg-[#E31E24] selection:text-white relative w-full max-w-full overflow-x-hidden bg-[#0c0c0e]">
      
      {/* Global Fixed Wallpaper Background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url("/wallpaper.png")`,
        }}
      />

      {/* Dark overlay for contrast and content readability */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#0c0c0e]/75 backdrop-blur-[0.5px]" />

      {/* Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFranchise={() => setIsFranchiseModalOpen(true)}
      />

      {/* Main Sections */}
      <main className="relative z-10 w-full max-w-full overflow-x-hidden">
        {/* 1. Hero Section */}
        <Hero
          onExploreMenu={() => {
            const el = document.getElementById('menu');
            if (lenisRef.current && el) {
              lenisRef.current.scrollTo(el, { offset: -50, duration: 1.2 });
            } else {
              el?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          onFindBranch={() => {
            const el = document.getElementById('cawangan');
            if (lenisRef.current && el) {
              lenisRef.current.scrollTo(el, { offset: -50, duration: 1.2 });
            } else {
              el?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        {/* 2. Chef Story & 4 Pillars of Taste */}
        <ChefStory />

        {/* 3. Full Menu & Price List */}
        <MenuSection
          items={MENU_ITEMS}
          onSelectItem={(item, portion) => setCustomizingState({ item, portion })}
          onQuickAdd={handleQuickAdd}
        />

        {/* 5. Branch Locator & Real-Time Open Check */}
        <BranchLocator />

        {/* 6. Testimonials & Social Proof */}
        <Testimonials />

        {/* 7. Contact & Feedback */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenFranchise={() => setIsFranchiseModalOpen(true)}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Item Customizer Modal */}
      {customizingState && (
        <ItemCustomizerModal
          item={customizingState.item}
          initialPortion={customizingState.portion}
          onClose={() => setCustomizingState(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Catering & Franchise Modal */}
      <CateringFranchiseModal
        isOpen={isFranchiseModalOpen}
        onClose={() => setIsFranchiseModalOpen(false)}
      />

      {/* Floating Bottom Cart Bubble (Mobile & Quick Access) */}
      {totalCartCount > 0 && !isCartOpen && (
        <button
          onClick={() => {
            playCrunchSound();
            setIsCartOpen(true);
          }}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-[#E31E24] via-[#cc141a] to-[#FDB913] text-white p-4 rounded-full shadow-2xl shadow-[#E31E24]/50 flex items-center gap-3 border-2 border-white/20 hover:scale-105 transition-transform cursor-pointer"
          aria-label="Lihat Troli"
        >
          <div className="relative">
            <ShoppingBag className="w-6 h-6 text-white" />
            <span className="absolute -top-2 -right-2 bg-black text-[#FDB913] text-xs font-black w-5 h-5 rounded-full flex items-center justify-center border border-[#FDB913]">
              {totalCartCount}
            </span>
          </div>
          <span className="font-black text-xs uppercase tracking-wider hidden sm:inline pr-1">
            Lihat Troli
          </span>
        </button>
      )}

      {/* Floating Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 ${totalCartCount > 0 ? 'left-6' : 'right-6'} z-30 w-11 h-11 rounded-full bg-[#18181f]/90 hover:bg-[#22222a] border border-white/15 text-white flex items-center justify-center shadow-xl transition-all cursor-pointer hover:border-[#FDB913]`}
          aria-label="Kembali ke atas"
        >
          <ArrowUp className="w-5 h-5 text-[#FDB913]" />
        </button>
      )}

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#16161c] text-white px-5 py-3 rounded-2xl border border-[#FDB913]/60 shadow-2xl flex items-center gap-3 animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}

