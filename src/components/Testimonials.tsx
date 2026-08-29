import React from 'react';
import { REVIEWS } from '../data/reviewData';
import { Star, CheckCircle2, Quote, Flame, Heart } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimoni" className="py-20 bg-[#0c0c0e]/75 backdrop-blur-sm relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#1a1a1f] border border-[#FDB913]/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest text-[#FDB913]">
            <Heart className="w-3.5 h-3.5 fill-[#E31E24] text-[#E31E24]" />
            <span>Komen & Maklum Balas Peminat Ayam</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            APA KATA <span className="text-[#FDB913]">FOODIE MALAYSIA</span>?
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base">
            Lebih 250,000 rakyat Malaysia telah menikmati keenakan ayam goreng Hemzal Crispy Chicken.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-[#141418] hover:bg-[#181820] rounded-3xl border border-white/10 hover:border-[#FDB913]/40 p-6 flex flex-col justify-between space-y-4 shadow-xl transition-all duration-300 group"
            >
              <div className="space-y-3">
                {/* Rating stars & Quote icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FDB913] text-[#FDB913]" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-white/20 group-hover:text-[#E31E24] transition-colors" />
                </div>

                {/* Comment */}
                <p className="text-xs text-neutral-300 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* User info & Favorite item */}
              <div className="pt-3 border-t border-white/5 space-y-2">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <h4 className="font-bold text-xs text-white">{review.name}</h4>
                      {review.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </div>
                    <p className="text-[10px] text-neutral-400">{review.handle} • {review.location}</p>
                  </div>
                </div>

                <div className="text-[10px] bg-white/5 px-2.5 py-1 rounded-lg text-[#FDB913] font-medium truncate">
                  ❤️ Kegemaran: {review.favoriteItem}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Social Feed Hash Tag Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#17171e] via-[#1b1b24] to-[#17171e] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E31E24]/20 flex items-center justify-center text-[#E31E24] shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-sm text-white uppercase">Kongsikan Detik Kerangupan Anda!</h4>
              <p className="text-xs text-neutral-400">Tag kami di TikTok & Instagram dengan hashtag <strong className="text-[#FDB913]">#HemzalCrispyChicken</strong> untuk peluang menang baucar RM50 mingguan.</p>
            </div>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold whitespace-nowrap transition-colors"
          >
            Ikuti Instagram @Hemzal
          </a>
        </div>

      </div>
    </section>
  );
};
