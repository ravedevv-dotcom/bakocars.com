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
    { name: 'BRABUS', style: 'font-sans tracking-[0.3em] font-black border border-blue-500/40 rounded-full px-3.5 py-0.5 text-[10px] bg-blue-950/40 text-blue-300' },
    { name: 'TESLA', style: 'font-mono tracking-[0.5em] font-bold text-[12px]' },
    { name: 'BYD', style: 'font-sans tracking-[0.35em] font-extrabold italic' },
    { name: 'FORD', style: 'font-serif italic font-black tracking-[0.25em]' },
    { name: 'DODGE', style: 'font-mono tracking-[0.3em] font-black text-[13px]' },
    { name: 'MAYBACH', style: 'font-serif tracking-[0.4em] font-black text-[13px]' },
  ];

  const DUPLICATED_BRANDS = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section className="w-full bg-neutral-950 py-7 border-t border-b border-white/10 my-4 overflow-hidden relative select-none" id="luxury-brand-marquee">
      {/* Luxury fading gradient overlay masks on edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" id="marquee-mask-left" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" id="marquee-mask-right" />

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
              className={`text-white/80 hover:text-blue-500 transition-colors duration-300 text-sm sm:text-base cursor-default select-none flex-shrink-0 ${brand.style}`}
            >
              {brand.name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
