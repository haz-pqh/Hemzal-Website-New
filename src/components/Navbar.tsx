import React, { useState, useEffect } from 'react';
import { ShoppingBag, MapPin, Phone, Menu, X, Flame, UtensilsCrossed, Award } from 'lucide-react';
import { playPopSound } from '../utils/sound';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenFranchise: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenFranchise,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Utama', href: '#home' },
    { label: 'Rahsia Chef', href: '#resepi' },
    { label: 'Menu & Harga', href: '#menu', badge: 'Hot' },
    { label: 'Cawangan', href: '#cawangan' },
    { label: 'Ulasan', href: '#testimoni' },
    { label: 'Hubungi', href: '#hubungi' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 select-none">
      {/* Main Desktop & Mobile Navbar */}
      <nav
        id="main-navbar"
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0c0c0e]/95 backdrop-blur-md py-2.5 shadow-2xl border-b border-white/10'
            : 'bg-[#0c0c0e]/85 backdrop-blur-md py-3.5 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Tagline */}
          <a
            href="#home"
            className="flex items-center gap-3 group cursor-pointer focus:outline-none shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E31E24] to-[#990D11] flex items-center justify-center shadow-lg shadow-[#E31E24]/30 border border-[#FDB913]/40 group-hover:scale-105 transition-transform shrink-0">
              <Flame className="w-5 h-5 text-[#FDB913] fill-[#FDB913]" />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="font-hemzal italic text-2xl sm:text-3xl text-[#E31E24] tracking-normal drop-shadow-[0_2px_8px_rgba(227,30,36,0.3)] group-hover:scale-105 transition-transform origin-left">
                Hemzal
              </span>
              <span className="text-[10px] sm:text-[11px] font-extrabold italic tracking-tight text-neutral-200 uppercase font-['Montserrat',sans-serif] -mt-0.5">
                Crispy Chicken
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (User-friendly spacing, readable typography, subtle active hover states) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-3.5 py-2 rounded-xl text-sm font-semibold text-neutral-300 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5 group"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="bg-[#E31E24] text-white text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase leading-none shadow-sm group-hover:scale-105 transition-transform">
                    {link.badge}
                  </span>
                )}
                {/* Subtle bottom indicator dot on hover */}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FDB913] opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>

          {/* Action Buttons (Catering, Cart, Order CTA) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Catering / Franchise Partner Trigger */}
            <button
              id="catering-btn"
              onClick={onOpenFranchise}
              className="hidden md:inline-flex items-center gap-2 text-xs font-semibold text-neutral-300 hover:text-white px-3.5 py-2.5 rounded-xl border border-white/10 hover:border-[#FDB913]/40 bg-white/5 hover:bg-white/10 transition-all cursor-pointer shadow-sm"
              title="Tempahan Katering & Peluang Francais"
            >
              <Award className="w-4 h-4 text-[#FDB913]" />
              <span>Katering / Francais</span>
            </button>

            {/* Shopping Cart Trigger Button */}
            <button
              id="cart-trigger-btn"
              onClick={() => {
                playPopSound();
                onOpenCart();
              }}
              className="relative flex items-center justify-center gap-2 bg-[#1b1b1e] hover:bg-[#25252a] text-white px-3.5 py-2.5 rounded-xl border border-white/15 hover:border-[#FDB913]/50 transition-all shadow-md cursor-pointer group shrink-0"
              aria-label="Buka Troli Pesanan"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#FDB913] group-hover:scale-110 transition-transform shrink-0" />
              <span className="text-xs font-bold hidden sm:inline">Troli</span>
              
              {cartCount > 0 ? (
                <span className="bg-[#E31E24] text-white text-[11px] font-black min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center shadow-lg shadow-[#E31E24]/60 animate-bounce">
                  {cartCount}
                </span>
              ) : (
                <span className="hidden xl:inline text-[11px] text-neutral-400 font-medium">(0)</span>
              )}
            </button>

            {/* Direct Order CTA Button */}
            <a
              href="#menu"
              className="hidden sm:inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#E31E24] to-[#C1121F] hover:from-[#f52b32] hover:to-[#e31e24] active:scale-95 text-white font-bold text-xs tracking-wider uppercase px-4 sm:px-5 py-2.5 rounded-xl shadow-lg shadow-[#E31E24]/30 hover:shadow-[#E31E24]/50 transition-all cursor-pointer shrink-0"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-[#FDB913]" />
              <span>Pesan Sekarang</span>
            </a>

            {/* Mobile / Tablet Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => {
                playPopSound();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-[#1b1b1e] hover:bg-[#25252a] active:bg-[#2e2e35] text-white border border-white/15 hover:border-[#FDB913]/50 transition-all shadow-md cursor-pointer shrink-0"
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#FDB913]" />
              ) : (
                <Menu className="w-5 h-5 text-neutral-200" />
              )}
            </button>

          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#121215]/98 backdrop-blur-xl border-b border-white/10 px-5 py-5 space-y-4 shadow-2xl animate-in slide-in-from-top-3 duration-200 max-h-[calc(100vh-100px)] overflow-y-auto">
            <div className="flex flex-col space-y-1 font-semibold text-sm">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-200 hover:text-[#FDB913] py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>Laman Utama</span>
              </a>
              <a
                href="#resepi"
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-200 hover:text-[#FDB913] py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>Rahsia & Resepi Chef</span>
              </a>
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-200 hover:text-[#FDB913] py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>Menu & Senarai Harga</span>
                <span className="text-[10px] text-white bg-[#E31E24] px-2 py-0.5 rounded-full font-black">Panas!</span>
              </a>
              <a
                href="#cawangan"
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-200 hover:text-[#FDB913] py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#FDB913]" /> Cawangan Outlet
                </span>
                <span className="text-[11px] text-[#FDB913] bg-[#FDB913]/10 px-2 py-0.5 rounded-md font-bold">4 Outlet</span>
              </a>
              <a
                href="#testimoni"
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-200 hover:text-[#FDB913] py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>Review & Testimoni</span>
              </a>
              <a
                href="#hubungi"
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-200 hover:text-[#FDB913] py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>Hubungi Kami</span>
              </a>
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-[#E31E24] to-[#C1121F] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-[#E31E24]/30"
              >
                🍗 Pesan Menu Sekarang
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenFranchise();
                }}
                className="w-full text-center py-2.5 rounded-xl border border-white/20 hover:border-[#FDB913]/50 text-neutral-200 font-bold text-xs bg-white/5"
              >
                🤝 Katering Kenduri & Francais
              </button>
              <a
                href="tel:+60123456789"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-xs"
              >
                <Phone className="w-4 h-4 text-emerald-400" /> Hotline Dapur: +60 12-345 6789
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
