import React from 'react';
import { Sparkles, Flame } from 'lucide-react';

interface OrderProcessingAnimationProps {
  step: number;
}

export const OrderProcessingAnimation: React.FC<OrderProcessingAnimationProps> = ({ step }) => {
  return (
    <div className="relative w-44 h-44 mx-auto flex items-center justify-center select-none pointer-events-none">
      {/* Background Pulse Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-36 h-36 rounded-full border-2 border-[#FDB913]/30 animate-ping opacity-30 duration-1000" />
        <div className="absolute w-28 h-28 rounded-full border border-[#E31E24]/40 animate-pulse duration-700" />
      </div>

      {/* SVG Animation Canvas */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full relative z-10 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF275" />
            <stop offset="50%" stopColor="#FDB913" />
            <stop offset="100%" stopColor="#E67E22" />
          </linearGradient>

          <linearGradient id="chickenCrisp" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F39C12" />
            <stop offset="60%" stopColor="#D35400" />
            <stop offset="100%" stopColor="#962d00" />
          </linearGradient>

          <linearGradient id="ringGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E31E24" />
            <stop offset="50%" stopColor="#FDB913" />
            <stop offset="100%" stopColor="#25D366" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Rotating Orbital Dash Circle */}
        <circle
          cx="100"
          cy="100"
          r="72"
          stroke="url(#ringGlow)"
          strokeWidth="2.5"
          strokeDasharray="16 12"
          strokeLinecap="round"
          className="origin-center animate-[spin_4s_linear_infinite]"
          opacity="0.85"
        />

        {/* Floating Sparks on Orbit */}
        <g className="origin-center animate-[spin_6s_linear_infinite]">
          <circle cx="100" cy="28" r="4.5" fill="#FDB913" filter="url(#glow)" />
          <circle cx="172" cy="100" r="3.5" fill="#E31E24" filter="url(#glow)" />
          <circle cx="100" cy="172" r="4" fill="#25D366" filter="url(#glow)" />
          <circle cx="28" cy="100" r="3" fill="#FDB913" filter="url(#glow)" />
        </g>

        {/* Inner Badge Background */}
        <circle
          cx="100"
          cy="100"
          r="54"
          fill="#1A1A22"
          stroke="#FDB913"
          strokeWidth="3"
          className="shadow-2xl"
        />

        {/* Sizzling Hot Steam Lines */}
        <g className="origin-center animate-bounce duration-1000 opacity-80">
          <path
            d="M85 70 C83 62, 89 56, 85 48 C82 42, 86 36, 84 30"
            stroke="#FDB913"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M100 66 C98 58, 104 52, 100 44 C97 38, 102 32, 100 26"
            stroke="#FFF275"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M115 70 C113 62, 119 56, 115 48 C112 42, 116 36, 114 30"
            stroke="#FDB913"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            className="animate-pulse"
          />
        </g>

        {/* Crispy Chicken Drumstick */}
        <g className="origin-center transition-transform duration-300">
          {/* Bone Shaft */}
          <path
            d="M112 112 L132 132"
            stroke="#F3F4F6"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Bone Knobs */}
          <circle cx="132" cy="136" r="5" fill="#E5E7EB" />
          <circle cx="137" cy="130" r="5" fill="#E5E7EB" />

          {/* Crispy Drumstick Meat Body */}
          <ellipse
            cx="92"
            cy="95"
            rx="24"
            ry="18"
            transform="rotate(-40 92 95)"
            fill="url(#chickenCrisp)"
          />
          {/* Additional Meat Bulb */}
          <circle
            cx="84"
            cy="86"
            r="16"
            fill="url(#chickenCrisp)"
          />

          {/* Golden Crispy Crunch Texture Flakes */}
          <circle cx="82" cy="82" r="3" fill="#FFF275" opacity="0.9" />
          <circle cx="94" cy="90" r="2.5" fill="#FFF275" opacity="0.8" />
          <circle cx="90" cy="99" r="2" fill="#FFF275" opacity="0.85" />
          <circle cx="77" cy="92" r="2" fill="#FDB913" opacity="0.9" />
          <circle cx="102" cy="104" r="2.5" fill="#FDB913" opacity="0.75" />

          {/* Sauce Glaze Glow */}
          <path
            d="M76 80 Q88 74 98 84"
            stroke="#FFF275"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
        </g>

        {/* Small Floating Seasoning Specks (Furikake / Chili Flakes) */}
        <g className="animate-pulse duration-500">
          <circle cx="68" cy="115" r="2" fill="#E31E24" />
          <circle cx="128" cy="78" r="2" fill="#FDB913" />
          <circle cx="125" cy="118" r="1.5" fill="#25D366" />
          <circle cx="70" cy="72" r="2" fill="#E31E24" />
        </g>
      </svg>

      {/* Floating Mini Badge */}
      <div className="absolute -bottom-1 -right-1 bg-[#E31E24] text-white p-1.5 rounded-full border-2 border-[#16161d] shadow-lg animate-bounce duration-1000">
        <Flame className="w-3.5 h-3.5 fill-current text-white" />
      </div>
    </div>
  );
};
