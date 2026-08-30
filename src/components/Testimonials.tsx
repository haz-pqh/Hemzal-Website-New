import React from 'react';
import { REVIEWS } from '../data/reviewData';
import { Star, CheckCircle2, Quote, Flame, Heart } from 'lucide-react';
import avatar from '/icon.png';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimoni" className="py-20 bg-neutral-50 border-b border-neutral-200/80 relative overflow-hidden">
      {/* Subtle Ambient Red Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_center,rgba(227,30,36,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest text-[#B45309]">
            <Heart className="w-3.5 h-3.5 fill-[#E31E24] text-[#E31E24]" />
            <span>Komen & Maklum Balas Peminat Ayam</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 uppercase tracking-tight">
            APA KATA <span className="text-[#D97706] drop-shadow-[0_2px_10px_rgba(217,119,6,0.15)]">FOODIE MALAYSIA</span>?
          </h2>

          <p className="text-neutral-700 text-sm sm:text-base font-medium">
            Lebih 250,000 rakyat Malaysia telah menikmati keenakan ayam goreng Hemzal Crispy Chicken.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white hover:bg-neutral-50/50 rounded-3xl border border-neutral-200/80 hover:border-[#D97706]/40 p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="space-y-3">
                {/* Rating stars & Quote icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D97706] text-[#D97706]" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-neutral-300 group-hover:text-[#E31E24] transition-colors" />
                </div>

                {/* Comment */}
                <p className="text-xs text-neutral-600 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* User info & Favorite item */}
              <div className="pt-3 border-t border-neutral-200/80 space-y-2">
                <div className="flex items-center gap-3">
                  <img
                    src={avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover border border-neutral-200 shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <h4 className="font-bold text-xs text-neutral-900">{review.name}</h4>
                      {review.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                    </div>
                    <p className="text-[10px] text-neutral-500">{review.handle} • {review.location}</p>
                  </div>
                </div>

                <div className="text-[10px] bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg text-[#B45309] font-semibold truncate">
                  ❤️ Kegemaran: {review.favoriteItem}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Social Feed Hash Tag Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E31E24]/10 flex items-center justify-center text-[#E31E24] shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-sm text-neutral-900 uppercase">Kongsikan Detik Kerangupan Anda!</h4>
              <p className="text-xs text-neutral-600">Tag kami di TikTok & Instagram dengan hashtag <strong className="text-[#B45309]">#HemzalCrispyChicken</strong> untuk peluang menang baucar RM50 mingguan.</p>
            </div>
          </div>
          <a
            href="https://www.instagram.com/hemzalcrispychickenhq/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold whitespace-nowrap transition-colors shadow-sm"
          >
            Ikuti Instagram @Hemzal
          </a>
        </div>

      </div>
    </section>
  );
};
