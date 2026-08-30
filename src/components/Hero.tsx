import React, { useState, useRef, useEffect } from 'react';
import { Flame, Star, Volume2, ShieldCheck, Award, ArrowRight, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { playCrunchSound } from '../utils/sound';
import promoVid from '/hemzal-promo-vid.mp4';
import promoPic from '/hemzal-promo-pic.png';

interface HeroProps {
  onExploreMenu: () => void;
  onFindBranch: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onFindBranch }) => {
  const [crunchActive, setCrunchActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log('Autoplay prevented or waiting for interaction:', err);
        });
      }
    }
  }, []);

  const handleCrunchClick = () => {
    playCrunchSound();
    setCrunchActive(true);
    setTimeout(() => setCrunchActive(false), 800);
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-25 pb-16 lg:pt-40 lg:pb-24 flex items-center justify-center overflow-hidden bg-neutral-50"
    >
      {/* Background Ambience Glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#E31E24]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[30rem] h-[30rem] bg-[#FDB913]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full bg-[radial-gradient(ellipse_at_center,rgba(227,30,36,0.04),transparent_70%)] pointer-events-none" />

      {/* Subtle Light Pattern Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Copy */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Top Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 shadow-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-[#E31E24] animate-ping" />
              <Award className="w-4 h-4 text-[#D97706]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#B45309]">
                Resepi Eksklusif Chef Mohammad Helmi
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-neutral-900 leading-[1.05] uppercase"
            >
              RANGUP DI <span className="text-[#D97706] drop-shadow-[0_2px_12px_rgba(217,119,6,0.2)]">LUAR</span>,
              <br />
              JUICY DI <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E31E24] to-[#C1121F]">DALAM.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-neutral-600 max-w-2xl font-normal leading-relaxed"
            >
              Nikmati ayam goreng gourmet Malaysia bertaraf hotel 5-bintang. Diperap 24 jam dengan 18 rempah rahsia, disalut tepung keemasan rangup dan dihidang panas bersama sos istimewa.
            </motion.p>

            {/* Interactive Crunch Audio Button */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="pt-1"
            >
              <button
                id="hero-crunch-test-btn"
                onClick={handleCrunchClick}
                className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-black tracking-wider uppercase transition-all cursor-pointer border ${
                  crunchActive
                    ? 'bg-[#FDB913] text-neutral-950 border-[#FDB913] scale-105 shadow-md shadow-[#FDB913]/30'
                    : 'bg-white hover:bg-neutral-100 text-[#B45309] border-[#FDB913]/60 hover:border-[#D97706] shadow-sm'
                }`}
              >
                <Volume2 className={`w-4 h-4 ${crunchActive ? 'animate-bounce' : ''}`} />
                <span>{crunchActive ? '💥 KRUP KRAP! RANGUP PADU!' : '🔊 Dengar Bunyi Kerangupan'}</span>
              </button>
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto"
            >
              <button
                id="hero-order-btn"
                onClick={onExploreMenu}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#E31E24] via-[#cc141a] to-[#a60d12] hover:from-[#FDB913] hover:to-[#e39600] text-white hover:text-neutral-950 font-black text-sm uppercase tracking-wider px-8 py-4 rounded-2xl shadow-lg shadow-[#E31E24]/25 hover:shadow-[#FDB913]/30 transition-all transform hover:-translate-y-1 cursor-pointer group"
              >
                <Flame className="w-5 h-5 text-[#FDB913] group-hover:text-neutral-950 transition-colors" />
                <span>Pesan Menu Online</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-find-branch-btn"
                onClick={onFindBranch}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-100 text-neutral-800 hover:text-neutral-900 font-bold text-sm uppercase tracking-wider px-7 py-4 rounded-2xl border border-neutral-300 hover:border-neutral-400 transition-all cursor-pointer shadow-sm"
              >
                <span>Cari Cawangan Terdekat</span>
              </button>
            </motion.div>

            {/* Trust Badges Bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 w-full max-w-2xl border-t border-neutral-200 text-left"
            >
              <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-neutral-200/80 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-[#D97706] shrink-0" />
                <div className="text-[11px]">
                  <p className="font-bold text-neutral-900">100% Halal</p>
                  <p className="text-neutral-500">Diiktiraf JAKIM</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-neutral-200/80 shadow-sm">
                <Clock className="w-5 h-5 text-[#E31E24] shrink-0" />
                <div className="text-[11px]">
                  <p className="font-bold text-neutral-900">24 Jam</p>
                  <p className="text-neutral-500">Perapan Rempah</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-neutral-200/80 shadow-sm">
                <Sparkles className="w-5 h-5 text-[#D97706] shrink-0" />
                <div className="text-[11px]">
                  <p className="font-bold text-neutral-900">Ayam Segar</p>
                  <p className="text-neutral-500">Bukan Beku</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-neutral-200/80 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-[11px]">
                  <p className="font-bold text-neutral-900">Saiz Mega</p>
                  <p className="text-neutral-500">Potongan Gergasi</p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Visual Showpiece & Floating Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            
            {/* Ambient Background Circle */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-92 rounded-full bg-gradient-to-tr from-[#E31E24]/20 to-[#FDB913]/25 blur-3xl" />

            {/* Glowing Platter Frame */}
            <div className="relative group w-full max-w-md">
              {/* Outer Decorative Ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#E31E24] via-[#FDB913] to-[#E31E24] rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition duration-500 animate-pulse" />

              {/* Main Promo Video (Loop) */}
              <div className="relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-200 shadow-2xl">
                <video
                  ref={videoRef}
                  src={promoVid}
                  poster={promoPic}    
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-96 sm:h-[30rem] lg:h-[34rem] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
              </div>

              {/* Floating Badge 1: 5-Star Rating */}
              <div className="absolute -top-3 left-2 sm:-top-4 sm:-left-6 bg-white/95 backdrop-blur-md border border-neutral-200/90 text-neutral-900 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 sm:gap-3 animate-bounce duration-1000 z-30 pointer-events-none">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-[#D97706]" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-black text-xs sm:text-sm text-neutral-900">4.9 / 5.0</span>
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-neutral-500">12,000+ Review</p>
                </div>
              </div>

              {/* Floating Badge 2: Mega Portion */}
              <div className="absolute -bottom-3 right-2 sm:-bottom-4 sm:-right-6 bg-white/95 backdrop-blur-md border border-neutral-200/90 text-neutral-900 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 sm:gap-3 z-30 pointer-events-none">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#E31E24]/10 flex items-center justify-center text-[#E31E24] shrink-0">
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5 fill-[#E31E24]" />
                </div>
                <div>
                  <p className="font-black text-[11px] sm:text-xs text-neutral-900 uppercase tracking-wider">Potongan Mega</p>
                  <p className="text-[9px] sm:text-[10px] text-[#B45309]">Extra Rangup & Berjus</p>
                </div>
              </div>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
