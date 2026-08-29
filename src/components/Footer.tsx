import React, { useState } from 'react';
import { Flame, ShieldCheck, Heart, Send, CheckCircle2, Instagram, Facebook, Video, MapPin, Phone, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPopSound } from '../utils/sound';

interface FooterProps {
  onOpenFranchise: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenFranchise }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    playPopSound();
    confetti({ particleCount: 50, spread: 50 });
    setNewsletterSubscribed(true);
  };

  return (
    <footer className="bg-[#08080a]/90 backdrop-blur-md text-white pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Background Decor */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E31E24] to-[#990D11] flex items-center justify-center shadow-lg shadow-[#E31E24]/30 border border-[#FDB913]/40">
                <Flame className="w-6 h-6 text-[#FDB913] fill-[#FDB913]" />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="font-hemzal italic text-3xl text-[#E31E24] tracking-normal drop-shadow-[0_2px_8px_rgba(227,30,36,0.3)]">
                  Hemzal
                </span>
                <span className="text-[11px] font-extrabold italic tracking-tight text-neutral-200 uppercase font-['Montserrat',sans-serif] -mt-0.5">
                  Crispy Chicken
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Pengalaman ayam goreng gourmet premium Malaysia. Dihasilkan dengan resepi eksklusif 18 rempah ratus Chef Mohammad Helmi, menjanjikan isi berjus dan kulit keemasan super rangup dalam setiap suapan.
            </p>

            {/* Halal Badge */}
            <div className="flex items-center gap-2.5 bg-[#141418] p-3 rounded-2xl border border-white/10 w-fit">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div className="text-[11px]">
                <p className="font-bold text-white">100% Halal Diiktiraf JAKIM</p>
                <p className="text-neutral-400 text-[10px]">100% Milikan Bumiputera & Suci</p>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="font-black text-sm text-[#FDB913] uppercase tracking-wider">
              Pautan Pantas
            </h4>
            <ul className="space-y-2 text-neutral-300">
              <li>
                <a href="#home" className="hover:text-[#FDB913] transition-colors">
                  Laman Utama
                </a>
              </li>
              <li>
                <a href="#resepi" className="hover:text-[#FDB913] transition-colors">
                  Rahsia & Resepi Chef
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#FDB913] transition-colors">
                  Menu & Senarai Harga
                </a>
              </li>
              <li>
                <a href="#cawangan" className="hover:text-[#FDB913] transition-colors">
                  Senarai 15 Cawangan
                </a>
              </li>
              <li>
                <a href="#testimoni" className="hover:text-[#FDB913] transition-colors">
                  Ulasan & Review Foodie
                </a>
              </li>
              <li>
                <a href="#hubungi" className="hover:text-[#FDB913] transition-colors">
                  Hubungi Khidmat Pelanggan
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Business & Events */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-black text-sm text-[#FDB913] uppercase tracking-wider">
              Perniagaan & Acara
            </h4>
            <ul className="space-y-2 text-neutral-300">
              <li>
                <button
                  onClick={onOpenFranchise}
                  className="hover:text-[#FDB913] transition-colors cursor-pointer text-left"
                >
                  Katering Kenduri & Jamuan Pejabat
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFranchise}
                  className="hover:text-[#FDB913] transition-colors cursor-pointer text-left"
                >
                  Peluang Francais & Rakan Niaga
                </button>
              </li>
              <li>
                <a
                  href="#hubungi"
                  className="hover:text-[#FDB913] transition-colors"
                >
                  Pesanan Pukal Korporat
                </a>
              </li>
            </ul>

            <div className="pt-2 text-[11px] text-neutral-400 space-y-1">
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#FDB913]" /> Hotline & WhatsApp: +60 16-417 5976
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#FDB913]" /> hello@hemzalcrispychicken.com
              </p>
            </div>
          </div>

          {/* Col 4: Newsletter Voucher */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-black text-sm text-[#FDB913] uppercase tracking-wider">
              Dapatkan Baucar RM10 Percuma
            </h4>
            <p className="text-xs text-neutral-400">
              Langgan buletin kami untuk menerima diskaun mingguan dan menu rahsia bermusim.
            </p>

            {newsletterSubscribed ? (
              <div className="bg-emerald-500/15 border border-emerald-500/30 p-3 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Terima kasih! Baucar RM10 telah dihantar ke emel anda.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Emel anda..."
                    className="flex-1 px-3 py-2 bg-[#141418] border border-white/10 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FDB913]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#E31E24] hover:bg-[#FDB913] text-white hover:text-black font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#E31E24] flex items-center justify-center text-white transition-colors"
                aria-label="TikTok"
              >
                <Video className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#E31E24] flex items-center justify-center text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#E31E24] flex items-center justify-center text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} Hemzal Crispy Chicken. Hak cipta terpelihara.
          </p>
          <div className="flex items-center gap-4 text-neutral-400">
            <span>Dasar Privasi</span>
            <span>•</span>
            <span>Terma & Syarat</span>
            <span>•</span>
            <span className="text-[#FDB913] font-bold">www.hemzalcrispychicken.com</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
