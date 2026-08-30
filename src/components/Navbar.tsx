import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Menu, 
  X, 
  UtensilsCrossed, 
  Award,
  Home,
  Flame,
  Utensils,
  Star,
  MessageSquareText
} from 'lucide-react';
import { playPopSound } from '../utils/sound';
import logo from '/icon.png';

interface NavbarProps {
  onOpenFranchise: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenFranchise,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll); return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Utama', href: '#home', icon: Home },
    { label: 'Resepi', href: '#resepi', icon: Flame },
    { label: 'Menu', href: '#menu', badge: 'Hot', icon: Utensils },
    { label: 'Lokasi', href: '#cawangan', icon: MapPin },
    { label: 'Ulasan', href: '#testimoni', icon: Star },
    { label: 'Hubungi', href: '#hubungi', icon: MessageSquareText },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 select-none">
      {/* Main Navbar stylized in signature #FDB913 */}
      <nav
        id="main-navbar"
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FDB913] py-2.5 shadow-xl border-b border-amber-600/30'
            : 'bg-[#FDB913]/95 backdrop-blur-md py-3.5 border-b border-amber-600/20'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-6">
          
          {/* Brand Logo & Tagline */}
          <a
            href="#home"
            className="flex items-center gap-3 group cursor-pointer focus:outline-none shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E31E24] to-[#990D11] flex items-center justify-center shadow-md border border-white/40 group-hover:scale-105 transition-transform shrink-0 overflow-hidden">
              <img 
                src={logo} 
                alt="Logo" 
                className="w-full h-full object-contain select-none pointer-events-none" 
              />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="font-hemzal italic text-2xl sm:text-3xl text-[#E31E24] tracking-normal drop-shadow-sm group-hover:scale-105 transition-transform origin-left font-black">
                Hemzal
              </span>
              <span className="text-[10px] sm:text-[11px] font-black italic tracking-tight text-neutral-900 uppercase font-['Montserrat',sans-serif] -mt-0.5">
                Crispy Chicken
              </span>
            </div>
          </a>

          {/* Interactive Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 bg-black/5 p-1.5 rounded-2xl border border-black/5">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={playPopSound}
                  className="relative px-3.5 py-2 rounded-xl text-xs xl:text-sm font-extrabold text-neutral-900 hover:text-white hover:bg-neutral-900 transition-all duration-200 flex items-center gap-2 group active:scale-95 shadow-2xs hover:shadow-md"
                >
                  <IconComponent className="w-4 h-4 text-neutral-800 group-hover:text-[#FDB913] transition-colors shrink-0 group-hover:scale-110" />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="bg-[#E31E24] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase leading-none shadow-sm group-hover:bg-[#FDB913] group-hover:text-black transition-colors animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Catering Trigger */}
            <button
              id="catering-btn"
              onClick={onOpenFranchise}
              className="hidden md:inline-flex items-center gap-2 text-xs font-extrabold text-neutral-900 hover:text-black px-4 py-2.5 rounded-xl border border-neutral-900/20 bg-white/40 hover:bg-white/80 transition-all cursor-pointer shadow-sm"
              title="Tempahan Katering & Peluang Francais"
            >
              <Award className="w-4 h-4 text-[#E31E24]" />
              <span>Katering / Francais</span>
            </button>

            {/* Direct Order CTA Button */}
            <a
              href="#menu"
              className="hidden sm:inline-flex items-center justify-center gap-1.5 bg-[#E31E24] hover:bg-[#c1121f] active:scale-95 text-white font-black text-xs tracking-wider uppercase px-5 sm:px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer shrink-0"
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
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white transition-all shadow-md cursor-pointer shrink-0"
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#FDB913]" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>

          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FDB913] border-b border-amber-600/30 px-6 py-5 space-y-4 shadow-2xl animate-in slide-in-from-top-3 duration-200 max-h-[calc(100vh-100px)] overflow-y-auto">
            <div className="flex flex-col space-y-1.5 font-extrabold text-sm">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      playPopSound();
                      setMobileMenuOpen(false);
                    }}
                    className="text-neutral-900 hover:text-white hover:bg-neutral-900 py-3 px-3.5 rounded-xl transition-all flex items-center justify-between active:scale-98"
                  >
                    <span className="flex items-center gap-3">
                      <IconComponent className="w-4 h-4 text-[#E31E24]" />
                      {link.label}
                    </span>
                    {link.badge && (
                      <span className="text-[10px] text-white bg-[#E31E24] px-2 py-0.5 rounded-full font-black">
                        {link.badge}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>

            <div className="pt-3 border-t border-amber-600/30 flex flex-col gap-2.5">
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-[#E31E24] hover:bg-[#c1121f] text-white font-black text-xs uppercase tracking-wider shadow-md"
              >
                🍗 Pesan Menu Sekarang
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenFranchise();
                }}
                className="w-full text-center py-2.5 rounded-xl border border-neutral-900/30 hover:border-neutral-900 text-neutral-900 font-extrabold text-xs bg-white/40"
              >
                🤝 Katering Kenduri & Francais
              </button>
              <a
                href="tel:+60123456789"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-neutral-900 text-white font-bold text-xs shadow-sm"
              >
                <Phone className="w-4 h-4 text-[#FDB913]" /> Hotline Dapur: +60 12-345 6789
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
