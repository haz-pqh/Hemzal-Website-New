import React, { useState, useRef, useEffect } from 'react';
import { Flame, Star, Volume2, ShieldCheck, Award, ArrowRight, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { playCrunchSound } from '../utils/sound';

const promoVid = '/hemzal-promo-vid.mp4';
const promoPic = '/hemzal-promo-pic.png';

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
      className="relative min-h-[92vh] pt-32 pb-16 lg:pt-40 lg:pb-24 flex items-center justify-center overflow-hidden"
    >
      {/* Background Ambience Glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#E31E24]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[30rem] h-[30rem] bg-[#FDB913]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full bg-[radial-gradient(ellipse_at_center,rgba(227,30,36,0.08),transparent_70%)] pointer-events-none" />

      {/* Subtle Pattern Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Copy */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Top Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 bg-[#1b1b1f] border border-[#FDB913]/40 rounded-full px-4 py-1.5 shadow-lg"
            >
              <span className="flex h-2 w-2 rounded-full bg-[#E31E24] animate-ping" />
              <Award className="w-4 h-4 text-[#FDB913]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#FDB913]">
                Resepi Eksklusif Chef Mohammad Helmi
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.05] uppercase"
            >
              RANGUP DI <span className="text-[#FDB913] drop-shadow-[0_4px_24px_rgba(253,185,19,0.4)]">LUAR</span>,
              <br />
              JUICY DI <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E31E24] to-[#ff4d52]">DALAM.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-neutral-300 max-w-2xl font-normal leading-relaxed"
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
                    ? 'bg-[#FDB913] text-black border-[#FDB913] scale-105 shadow-xl shadow-[#FDB913]/40'
                    : 'bg-[#18181c] hover:bg-[#222227] text-[#FDB913] border-[#FDB913]/30 hover:border-[#FDB913]'
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#E31E24] via-[#cc141a] to-[#a60d12] hover:from-[#FDB913] hover:to-[#e39600] text-white hover:text-black font-black text-sm uppercase tracking-wider px-8 py-4 rounded-2xl shadow-xl shadow-[#E31E24]/30 hover:shadow-[#FDB913]/30 transition-all transform hover:-translate-y-1 cursor-pointer group"
              >
                <Flame className="w-5 h-5 text-[#FDB913] group-hover:text-black transition-colors" />
                <span>Pesan Menu Online</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-find-branch-btn"
                onClick={onFindBranch}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#17171a] hover:bg-[#202025] text-neutral-200 hover:text-white font-bold text-sm uppercase tracking-wider px-7 py-4 rounded-2xl border border-white/15 hover:border-[#FDB913]/50 transition-all cursor-pointer"
              >
                <span>Cari Cawangan Terdekat</span>
              </button>
            </motion.div>

            {/* Trust Badges Bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 w-full max-w-2xl border-t border-white/10 text-left"
            >
              <div className="flex items-center gap-2.5 bg-white/5 p-2.5 rounded-xl border border-white/5">
                <ShieldCheck className="w-5 h-5 text-[#FDB913] shrink-0" />
                <div className="text-[11px]">
                  <p className="font-bold text-white">100% Halal</p>
                  <p className="text-neutral-400">Diiktiraf JAKIM</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white/5 p-2.5 rounded-xl border border-white/5">
                <Clock className="w-5 h-5 text-[#E31E24] shrink-0" />
                <div className="text-[11px]">
                  <p className="font-bold text-white">24 Jam</p>
                  <p className="text-neutral-400">Perapan Rempah</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white/5 p-2.5 rounded-xl border border-white/5">
                <Sparkles className="w-5 h-5 text-[#FDB913] shrink-0" />
                <div className="text-[11px]">
                  <p className="font-bold text-white">Ayam Segar</p>
                  <p className="text-neutral-400">Bukan Beku</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white/5 p-2.5 rounded-xl border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-[11px]">
                  <p className="font-bold text-white">Saiz Mega</p>
                  <p className="text-neutral-400">Potongan Gergasi</p>
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
            <div className="absolute w-72 h-72 sm:w-96 sm:h-92 rounded-full bg-gradient-to-tr from-[#E31E24]/30 to-[#FDB913]/30 blur-3xl" />

            {/* Glowing Platter Frame */}
            <div className="relative group w-full max-w-md">
              {/* Outer Decorative Ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#E31E24] via-[#FDB913] to-[#E31E24] rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition duration-500 animate-pulse" />

              {/* Main Promo Video (Loop) - EDIT THE 'src' ATTRIBUTE BELOW TO CHANGE VIDEO */}
              <div className="relative rounded-3xl overflow-hidden bg-[#161619] border border-white/15 shadow-2xl">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-black/30 pointer-events-none" />
              
              </div>

              {/* Floating Badge 1: 5-Star Rating */}
              <div className="absolute -top-3 left-2 sm:-top-4 sm:-left-6 bg-[#16161a]/95 backdrop-blur-md border border-[#FDB913]/50 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 sm:gap-3 animate-bounce duration-1000 z-30 pointer-events-none">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FDB913]/20 flex items-center justify-center text-[#FDB913] shrink-0">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FDB913]" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-black text-xs sm:text-sm text-white">4.9 / 5.0</span>
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-neutral-400">12,000+ Review</p>
                </div>
              </div>

              {/* Floating Badge 2: Mega Portion */}
              <div className="absolute -bottom-3 right-2 sm:-bottom-4 sm:-right-6 bg-[#16161a]/95 backdrop-blur-md border border-[#E31E24]/50 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 sm:gap-3 z-30 pointer-events-none">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#E31E24]/20 flex items-center justify-center text-[#E31E24] shrink-0">
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5 fill-[#E31E24]" />
                </div>
                <div>
                  <p className="font-black text-[11px] sm:text-xs text-white uppercase tracking-wider">Potongan Mega</p>
                  <p className="text-[9px] sm:text-[10px] text-[#FDB913]">Extra Rangup & Berjus</p>
                </div>
              </div>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};