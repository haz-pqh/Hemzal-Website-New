import React, { useState } from 'react';
import { X, Users, Utensils, Award, Calculator, MessageSquare, Check, Sparkles, Building2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPopSound } from '../utils/sound';

interface CateringFranchiseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CateringFranchiseModal: React.FC<CateringFranchiseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'catering' | 'franchise'>('catering');
  const [paxCount, setPaxCount] = useState<number>(50);
  const [packageType, setPackageType] = useState<'standard' | 'premium' | 'royale'>('premium');

  if (!isOpen) return null;

  // Catering price calculations strictly based on Hemzal Menu (Ayam RM4.50/pc, Coleslaw RM3.50, Sos Gourmet RM2/RM3, Sos Cili Percuma)
  const packages = {
    standard: {
      name: 'Pakej 2 Ketul Crispy',
      price: 9.00,
      description: '2x Ketul Ayam Goreng Crispy + Sos Cili Percuma',
      items: ['2x Ketul Ayam Crispy (RM4.50/ketul)', 'Sos Cili Istimewa (Percuma)', 'Pek Kotak Bersih & Tisu'],
    },
    premium: {
      name: 'Pakej Combo 2 Ketul + Coleslaw + Sos',
      price: 14.50,
      description: '2x Ayam + 1x Coleslaw 4oz + 1x Sos Gourmet + Sos Cili Percuma',
      items: ['2x Ketul Ayam Crispy', '1x Hemzal Coleslaw Segar (4oz)', '1x Sos Gourmet (Keju/Garlic/Korean)', 'Sos Cili Istimewa (Percuma)'],
    },
    royale: {
      name: 'Pakej Feast 3 Ketul + Coleslaw + 2 Sos',
      price: 20.00,
      description: '3x Ayam + 1x Coleslaw 4oz + 2x Sos Gourmet + Sos Cili Percuma',
      items: ['3x Ketul Ayam Crispy', '1x Hemzal Coleslaw Segar (4oz)', '2x Sos Gourmet Pilihan (Keju/Garlic/Korean/Furikake/Togarashi)', 'Sos Cili Istimewa (Percuma)'],
    },
  };

  const currentPackage = packages[packageType];
  const estimatedTotal = paxCount * currentPackage.price;

  const handleSendWhatsApp = () => {
    playPopSound();
    confetti({ particleCount: 70, spread: 50 });
    const text = activeTab === 'catering'
      ? `Hai Hemzal Catering! Saya ingin tempah katering untuk ${paxCount} Pax (${currentPackage.name}). Anggaran RM ${estimatedTotal.toFixed(2)}. Kandungan: ${currentPackage.description}. Boleh bantu saya?`
      : `Hai Hemzal HQ! Saya berminat untuk memohon peluang perkongsian Francais Cawangan Hemzal Crispy Chicken. Mohon maklumat lanjut.`;
    
    window.open(`https://wa.me/60164175976?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#141419] border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-white my-8 max-h-[90vh] flex flex-col">
        
        {/* Header with Tabs */}
        <div className="p-6 border-b border-white/10 bg-[#191922] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('catering')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'catering'
                  ? 'bg-[#E31E24] text-white shadow-md'
                  : 'bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Tempahan Katering & Acara</span>
            </button>
            <button
              onClick={() => setActiveTab('franchise')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'franchise'
                  ? 'bg-[#FDB913] text-black shadow-md'
                  : 'bg-white/5 text-neutral-400 hover:text-black'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Peluang Francais</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div data-lenis-prevent className="p-6 overflow-y-auto space-y-6 flex-1 text-sm custom-scrollbar">
          
          {activeTab === 'catering' ? (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-white">Kalkulator Katering & Majlis Korporat</h3>
                <p className="text-xs text-neutral-400">
                  Sesuai untuk Jamuan Pejabat, Sambutan Hari Lahir, Kenduri Kahwin & Sukan Sekolah.
                </p>
              </div>

              {/* Pax Slider */}
              <div className="bg-[#1b1b24] p-5 rounded-2xl border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-neutral-300 uppercase flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#FDB913]" /> Jumlah Tetamu (Pax)
                  </label>
                  <span className="text-xl font-black text-[#FDB913]">{paxCount} Orang</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={paxCount}
                  onChange={(e) => setPaxCount(Number(e.target.value))}
                  className="w-full accent-[#E31E24] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 font-bold">
                  <span>Min: 20 Pax</span>
                  <span>100 Pax</span>
                  <span>250 Pax</span>
                  <span>Maks: 500 Pax</span>
                </div>
              </div>

              {/* Package Selector */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-neutral-300 uppercase">Pilih Pakej Katering (Menu Hemzal)</label>
                  <span className="text-[10px] text-[#FDB913] font-semibold">100% Mengikut Menu Rasmi</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  <button
                    type="button"
                    onClick={() => setPackageType('standard')}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      packageType === 'standard'
                        ? 'bg-gradient-to-b from-[#E31E24]/25 to-[#E31E24]/10 border-[#E31E24] text-white shadow-lg'
                        : 'bg-[#1a1a22] border-white/5 text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-black block text-white">2 Ketul Crispy Set</span>
                      <span className="text-xs text-[#FDB913] font-bold">RM 9.00 / pax</span>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-1.5 leading-snug">
                      2x Ayam Crispy + Sos Cili Percuma
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPackageType('premium')}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                      packageType === 'premium'
                        ? 'bg-gradient-to-b from-[#FDB913]/25 to-[#FDB913]/10 border-[#FDB913] text-white shadow-lg'
                        : 'bg-[#1a1a22] border-white/5 text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    <span className="absolute -top-2 right-3 bg-[#FDB913] text-black text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase">
                      Popular
                    </span>
                    <div>
                      <span className="text-xs font-black block text-white">Combo Crispy + Coleslaw</span>
                      <span className="text-xs text-[#FDB913] font-bold">RM 14.50 / pax</span>
                    </div>
                    <p className="text-[10px] text-neutral-300 mt-1.5 leading-snug">
                      2x Ayam + 1x Coleslaw 4oz + 1x Sos Gourmet + Sos Cili Percuma
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPackageType('royale')}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      packageType === 'royale'
                        ? 'bg-gradient-to-b from-purple-600/25 to-purple-600/10 border-purple-500 text-white shadow-lg'
                        : 'bg-[#1a1a22] border-white/5 text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-black block text-white">Feast 3 Ketul + 2 Sos</span>
                      <span className="text-xs text-[#FDB913] font-bold">RM 20.00 / pax</span>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-1.5 leading-snug">
                      3x Ayam + 1x Coleslaw 4oz + 2x Sos Gourmet + Sos Cili Percuma
                    </p>
                  </button>

                </div>

                {/* Package Breakdown Card */}
                <div className="bg-[#181822] p-3 rounded-xl border border-white/10 space-y-1.5">
                  <span className="text-[11px] font-black uppercase text-[#FDB913] flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" /> Kandungan Setiap Pax ({currentPackage.name}):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-neutral-200">
                    {currentPackage.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Estimate Summary */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1f1f2a] to-[#171720] border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase font-bold">Anggaran Kos Pakej</span>
                  <p className="text-2xl font-black text-[#FDB913]">RM {estimatedTotal.toFixed(2)}</p>
                  <p className="text-[10px] text-neutral-400">Termasuk pek kotak bungkusan panas</p>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-bold">
                    Diskaun Korporat Termasuk
                  </span>
                </div>
              </div>

            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-white">Peluang Rakan Niaga & Francais Hemzal</h3>
                <p className="text-xs text-neutral-400">
                  Sertai jenama ayam goreng paling pantas berkembang di Malaysia dengan margin keuntungan tinggi dan sistem dapur berpusat (Central Kitchen).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-[#1b1b24] border border-white/5 space-y-1">
                  <span className="text-[10px] text-[#FDB913] font-bold uppercase">Format Kiosk & Lot Kedai</span>
                  <h4 className="font-bold text-sm text-white">Pelaburan Fleksibel</h4>
                  <p className="text-xs text-neutral-400">Pilihan model Kiosk Mall, Shoplot Standard, atau Drive-Thru Hub.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#1b1b24] border border-white/5 space-y-1">
                  <span className="text-[10px] text-[#FDB913] font-bold uppercase">Bekalan Dapur Pusat</span>
                  <h4 className="font-bold text-sm text-white">SOP Mudah & Standard</h4>
                  <p className="text-xs text-neutral-400">Ayam diperap siap dari Central Kitchen, tidak perlu chef berpengalaman.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Bimbingan pemasaran media sosial dan papan tanda cawangan.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Latihan intensif operasi dapur dan sistem POS bersepadu.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>ROI anggaran dalam masa 12 - 18 bulan operasi.</span>
                </div>
              </div>

            </div>
          )}

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={handleSendWhatsApp}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#2bf376] hover:to-[#16a594] text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#25D366]/20 transition-all cursor-pointer"
            >
              <MessageSquare className="w-5 h-5" />
              <span>
                {activeTab === 'catering'
                  ? `Dapatkan Sebut Harga WhatsApp (${paxCount} Pax)`
                  : 'Mohon Info Francais Melalui WhatsApp'}
              </span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
