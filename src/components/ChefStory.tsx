import React, { useState } from 'react';
import { Award, Flame, Sparkles, Shield, HeartHandshake, CheckCircle2, ChevronRight, Volume2 } from 'lucide-react';
import { playCrunchSound } from '../utils/sound';

export const ChefStory: React.FC = () => {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      title: 'Perapan 24-Jam 18 Rempah Botani',
      tag: 'Kekayaan Rasa Menusuk Tulang',
      desc: 'Setiap potongan ayam diperap selama 24 jam penuh dalam adunan rahsia 18 rempah semula jadi tanpa MSG tiruan melampau, menjadikan isi ayam berperisa dari kulit sampai ke tulang.',
      icon: Flame,
      color: 'from-[#E31E24] to-[#ff4a50]',
      highlight: '24H Secret Spice Infusion',
    },
    {
      title: 'Teknik Double-Dredge Golden Crust',
      tag: 'Kerangupan Berlapis Bertaraf Dunia',
      desc: 'Dihasilkan menggunakan teknik salutan tepung dua peringkat dengan kawalan suhu minyak tepat 175°C untuk menghasilkan kerak emas bersisik yang kekal rangup lebih 45 minit.',
      icon: Sparkles,
      color: 'from-[#FDB913] to-[#e69800]',
      highlight: 'Ultra-Crispy 45 Min Retention',
    },
    {
      title: '100% Ayam Segar Gred-A Tempatan',
      tag: 'Bukan Daging Ayam Import Beku',
      desc: 'Kami hanya menggunakan ayam segar tempatan yang dibekalkan setiap pagi dari ladang berstatus Halal JAKIM. Tekstur daging lembut, berserat halus dan tidak berbau hamis.',
      icon: Shield,
      color: 'from-emerald-500 to-emerald-700',
      highlight: 'Fresh Daily Farm Delivery',
    },
    {
      title: 'Sos Gourmet Ciptaan Chef Eksekutif',
      tag: 'Artisan Molten Cheese & Habanero',
      desc: 'Dicipta khas oleh Chef Mohammad Helmi, sos kami dimasak segar setiap hari dengan keju import New Zealand dan cili Habanero segar untuk ledakan rasa yang tiada tandingan.',
      icon: Award,
      color: 'from-purple-500 to-pink-600',
      highlight: 'Artisan Crafted Sauces',
    },
  ];

  return (
    <section id="resepi" className="py-20 bg-[#0f0f12]/80 backdrop-blur-sm relative overflow-hidden border-t border-b border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E31E24]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FDB913]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#1d1d22] border border-[#FDB913]/30 px-4 py-1.5 rounded-full">
            <Award className="w-4 h-4 text-[#FDB913]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#FDB913]">
              Sentuhan Pakar Kulinari Antarabangsa
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            RAHSIA DI SEBALIK KEHEBATAN <span className="text-[#FDB913]">HEMZAL</span>
          </h2>
          
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Dicipta oleh <strong className="text-white">Chef Mohammad Helmi</strong>, bekas Chef Eksekutif rangkaian hotel 5-bintang dengan pengalaman kulinari lebih 15 tahun. Misi kami: membawakan ayam goreng kualiti tertinggi pada harga yang berpatutan untuk semua.
          </p>
        </div>

        {/* 4 Pillars Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Pillar Selection List */}
          <div className="lg:col-span-6 space-y-3">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isSelected = activePillar === idx;
              return (
                <button
                  key={pillar.title}
                  onClick={() => {
                    playCrunchSound();
                    setActivePillar(idx);
                  }}
                  className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isSelected
                      ? 'bg-[#1a1a20] border-[#FDB913] shadow-lg shadow-black/40 translate-x-2'
                      : 'bg-[#141418]/60 hover:bg-[#18181e] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#E31E24] to-[#FDB913] text-white'
                        : 'bg-white/5 text-neutral-400'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#FDB913]">
                        Pillar 0{idx + 1}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] bg-[#E31E24] text-white font-black px-2 py-0.5 rounded-full">
                          AKTIF
                        </span>
                      )}
                    </div>
                    <h3 className={`font-black text-base sm:text-lg mt-0.5 ${isSelected ? 'text-white' : 'text-neutral-200'}`}>
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                      {pillar.desc}
                    </p>
                  </div>

                  <ChevronRight className={`w-5 h-5 shrink-0 self-center transition-transform ${isSelected ? 'text-[#FDB913] translate-x-1' : 'text-neutral-500'}`} />
                </button>
              );
            })}
          </div>

          {/* Right: Active Pillar Showcase Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#18181f] via-[#141418] to-[#101014] border border-[#FDB913]/30 shadow-2xl overflow-hidden">
              {/* Decorative Watermark */}
              <div className="absolute -bottom-10 -right-10 text-white/5 font-black text-9xl select-none pointer-events-none">
                0{activePillar + 1}
              </div>

              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#FDB913]/10 text-[#FDB913] border border-[#FDB913]/30 px-3.5 py-1 rounded-full text-xs font-black tracking-wider uppercase">
                  {pillars[activePillar].highlight}
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {pillars[activePillar].title}
                </h3>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                  {pillars[activePillar].desc}
                </p>

                {/* Proof Points List */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3 text-sm text-neutral-200">
                    <CheckCircle2 className="w-5 h-5 text-[#FDB913] shrink-0" />
                    <span>Disediakan segar mengikut piawaian sanitasi gred hotel.</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-200">
                    <CheckCircle2 className="w-5 h-5 text-[#FDB913] shrink-0" />
                    <span>Minyak masak sentiasa dipantau nilai TPM untuk kerangupan selamat.</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-200">
                    <CheckCircle2 className="w-5 h-5 text-[#FDB913] shrink-0" />
                    <span>Dijamin 100% Halal dan suci oleh pembekal tempatan bertauliah.</span>
                  </div>
                </div>

                {/* Interactive Crunch Tryout */}
                <div className="pt-2">
                  <button
                    onClick={playCrunchSound}
                    className="inline-flex items-center gap-2 bg-[#E31E24] hover:bg-[#FDB913] text-white hover:text-black font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all cursor-pointer shadow-lg shadow-[#E31E24]/20"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Uji Bunyi Kerangupan Pillar Ini</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
