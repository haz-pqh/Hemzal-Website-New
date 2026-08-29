import React, { useState, useMemo } from 'react';
import { BRANCHES } from '../data/branchData';
import { Branch, Region } from '../types';
import { MapPin, Phone, Clock, Navigation, ExternalLink, Search, CheckCircle, Car, Utensils, ShoppingBag, Sparkles } from 'lucide-react';
import { playPopSound } from '../utils/sound';

export const BranchLocator: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region>('all');
  const [branchSearch, setBranchSearch] = useState<string>('');
  const [onlyOpen, setOnlyOpen] = useState<boolean>(false);

  // Current Malaysia time hour helper
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;

  const isBranchOpen = (branch: Branch) => {
    return currentHour >= branch.openHour && currentHour < branch.closeHour;
  };

  const regionTabs: { id: Region; label: string }[] = [
    { id: 'all', label: 'Semua Cawangan' },
    { id: 'sl', label: 'Selangor' },
    { id: 'kl', label: 'WP Kuala Lumpur' },
  ];

  const filteredBranches = useMemo(() => {
    return BRANCHES.filter((branch) => {
      const matchesRegion = selectedRegion === 'all' || branch.region === selectedRegion;
      const matchesSearch =
        branch.name.toLowerCase().includes(branchSearch.toLowerCase()) ||
        branch.address.toLowerCase().includes(branchSearch.toLowerCase()) ||
        branch.city.toLowerCase().includes(branchSearch.toLowerCase()) ||
        branch.state.toLowerCase().includes(branchSearch.toLowerCase());
      const matchesOpen = !onlyOpen || isBranchOpen(branch);
      return matchesRegion && matchesSearch && matchesOpen;
    });
  }, [selectedRegion, branchSearch, onlyOpen, currentHour]);

  return (
    <section id="cawangan" className="py-20 bg-[#0e0e11]/80 backdrop-blur-sm relative overflow-hidden border-t border-b border-white/5">
      {/* Background Glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#FDB913]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#E31E24]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#1b1b20] border border-[#FDB913]/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest text-[#FDB913]">
            <MapPin className="w-3.5 h-3.5 text-[#FDB913]" />
            <span>Rangkaian Outlet Hemzal</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            SENARAI <span className="text-[#FDB913]">CAWANGAN KAMI</span>
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base">
            Cari restoran Hemzal Crispy Chicken berdekatan anda untuk dine-in santai, pandu lalu, atau tempahan bawa pulang.
          </p>
        </div>

        {/* Toolbar & Filter Tabs */}
        <div className="space-y-4 mb-10">
          
          {/* Search bar & Open Now toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="branch-search-input"
                type="text"
                value={branchSearch}
                onChange={(e) => setBranchSearch(e.target.value)}
                placeholder="Cari bandar, kawasan atau negeri..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#17171c] border border-white/10 rounded-xl text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FDB913]"
              />
              {branchSearch && (
                <button
                  onClick={() => setBranchSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                >
                  Padam
                </button>
              )}
            </div>

            {/* Toggle Open Now */}
            <button
              onClick={() => setOnlyOpen(!onlyOpen)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                onlyOpen
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                  : 'bg-[#17171c] border-white/10 text-neutral-300 hover:border-white/20'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${onlyOpen ? 'bg-emerald-400 animate-ping' : 'bg-neutral-500'}`} />
              <span>Tapis: Buka Sekarang Sahaja</span>
            </button>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {regionTabs.map((tab) => {
              const isActive = selectedRegion === tab.id;
              const count = tab.id === 'all' ? BRANCHES.length : BRANCHES.filter(b => b.region === tab.id).length;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    playPopSound();
                    setSelectedRegion(tab.id);
                  }}
                  className={`px-5 py-3 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#E31E24] text-white shadow-lg shadow-[#E31E24]/30 border border-[#FDB913]/40'
                      : 'bg-[#18181d] text-neutral-300 hover:text-white hover:bg-[#202026] border border-white/5'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${isActive ? 'bg-black/40 text-[#FDB913]' : 'bg-white/10 text-neutral-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Branch Cards Grid */}
        {filteredBranches.length === 0 ? (
          <div className="text-center py-16 bg-[#141418] rounded-3xl border border-white/10">
            <MapPin className="w-12 h-12 text-[#FDB913] mx-auto mb-3 opacity-50" />
            <h3 className="text-lg font-bold text-white">Tiada cawangan dijumpai</h3>
            <p className="text-xs text-neutral-400 mt-1">Sila pilih kawasan lain atau semak ejaan carian anda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBranches.map((branch) => {
              const open = isBranchOpen(branch);
              return (
                <div
                  key={branch.id}
                  className="bg-[#141418] hover:bg-[#18181f] rounded-3xl border border-white/10 hover:border-[#FDB913]/40 transition-all duration-300 p-6 flex flex-col justify-between shadow-xl space-y-5 group"
                >
                  {/* Top Bar: Name & Badges */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FDB913] shrink-0 group-hover:bg-[#E31E24] group-hover:text-white transition-colors">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#FDB913] tracking-wider">
                            {branch.regionLabel}
                          </span>
                          <h3 className="font-black text-lg text-white leading-snug">
                            {branch.name}
                          </h3>
                        </div>
                      </div>

                      {branch.isHQ && (
                        <span className="bg-[#E31E24] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shrink-0 shadow-md">
                          HQ Flagship
                        </span>
                      )}
                    </div>

                    {/* Status badge & Hours */}
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                          open
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${open ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                        {open ? 'Buka Sekarang' : 'Tutup Buat Masa Ini'}
                      </span>
                      <span className="text-neutral-400 flex items-center gap-1 text-[11px]">
                        <Clock className="w-3 h-3 text-neutral-500" /> {branch.openingHours}
                      </span>
                    </div>

                    {/* Full Address */}
                    <p className="text-xs text-neutral-300 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                      {branch.address}
                    </p>

                    {/* Features Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {branch.features.map((feat) => (
                        <span
                          key={feat}
                          className="text-[10px] font-medium bg-[#1d1d24] text-neutral-300 px-2 py-0.5 rounded-md border border-white/5"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons: Maps & Waze & WhatsApp */}
                  <div className="space-y-2 pt-3 border-t border-white/10">
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={branch.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-2.5 rounded-xl transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5 text-[#FDB913]" />
                        <span>Google Maps</span>
                      </a>
                      <a
                        href={branch.wazeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-2.5 rounded-xl transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5 text-[#33ccff]" />
                        <span>Waze Nav</span>
                      </a>
                    </div>

                    {/* WhatsApp Branch Order */}
                    <a
                      href={`https://wa.me/${branch.whatsapp}?text=Hai%20Hemzal%20${encodeURIComponent(branch.name)},%20saya%20ingin%20membuat%20pesanan%20ayam%20goreng.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-black font-black text-xs uppercase tracking-wider py-2.5 rounded-xl border border-[#25D366]/40 transition-all cursor-pointer shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>WhatsApp Outlet Ini ({branch.phone})</span>
                    </a>
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