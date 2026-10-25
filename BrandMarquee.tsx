/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export default function BrandMarquee() {
  const BRANDS = [
    { name: 'MERCEDES', style: 'font-sans tracking-[0.35em] font-extrabold' },
    { name: 'BMW', style: 'font-mono tracking-[0.4em] font-black text-[13px]' },
    { name: 'TOYOTA', style: 'font-sans tracking-[0.4em] font-black text-[12px]' },
    { name: 'HONDA', style: 'font-serif tracking-[0.3em] font-extrabold' },
    { name: 'LEXUS', style: 'font-sans tracking-[0.45em] font-black italic text-[13px]' },
    { name: 'JEEP', style: 'font-mono tracking-[0.4em] font-black text-[13px]' },
    { name: 'BRABUS', style: 'font-sans tracking-[0.3em] font-black border border-blue-500/50 rounded-full px-4 py-1 text-[10px] bg-blue-950/50 text-blue-200 shadow-[0_0_15px_rgba(29,78,216,0.35)]' },
    { name: 'TESLA', style: 'font-mono tracking-[0.5em] font-bold text-[12px]' },
    { name: 'BYD', style: 'font-sans tracking-[0.35em] font-extrabold italic' },
    { name: 'FORD', style: 'font-serif italic font-black tracking-[0.25em]' },
    { name: 'DODGE', style: 'font-mono tracking-[0.3em] font-black text-[13px]' },
    { name: 'MAYBACH', style: 'font-serif tracking-[0.4em] font-black text-[13px]' },
  ];

  // Double the sequence to prevent empty spaces during infinite linear translation
  const DUPLICATED_BRANDS = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section className="w-full bg-[#060c1f] py-8 border-t border-b border-blue-500/20 my-4 overflow-hidden relative select-none" id="luxury-brand-marquee">
      {/* Luxury fading gradient overlay masks on edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050811] via-[#050811]/80 to-transparent z-15 pointer-events-none" id="marquee-mask-left" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050811] via-[#050811]/80 to-transparent z-15 pointer-events-none" id="marquee-mask-right" />

      {/* Continuous marquee */}
      <div className="relative w-full overflow-hidden whitespace-nowrap">
        <motion.div
          className="inline-flex items-center space-x-16 sm:space-x-24"
          initial={{ x: 0 }}
          animate={{ x: '-33.333%' }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 28,
            ease: 'linear',
          }}
        >
          {DUPLICATED_BRANDS.map((brand, i) => (
            <div
              key={`marquee-brand-${i}`}
              className={`text-white/85 hover:text-blue-400 hover:scale-110 transition-all duration-300 text-sm sm:text-base cursor-default select-none flex-shrink-0 ${brand.style}`}
            >
              {brand.name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
