/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { getImageUrl, handleImageFallback } from './types';

export default function InstagramSection() {
  return (
    <section className="w-full bg-[#050811] py-14 relative overflow-hidden" id="instagram-brand-section">
      {/* INSTAGRAM account linking integration and brand visual title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT: Stacked title matching the "OUR INSTAGRAM" handwritten design */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 text-left space-y-2 relative"
          >
            <div className="relative inline-block mt-2">
              <span className="font-display tracking-[0.2em] text-blue-300/60 text-[10px] uppercase font-bold">
                CURATED BY
              </span>
              {/* Handwritten overlapping "Bako Cars" */}
              <span className="absolute -top-[23px] left-[78px] font-signature text-[40px] text-white/95 italic opacity-95 pointer-events-none whitespace-nowrap transform -rotate-2 select-none drop-shadow-[0_0_15px_rgba(37,99,235,0.6)]">
                Bako Cars
              </span>
            </div>

            <div className="flex flex-col">
              <h3 className="font-sans font-black tracking-widest text-2xl sm:text-3xl leading-none uppercase">
                <span className="text-blue-500 drop-shadow-[0_0_16px_rgba(29,78,216,0.75)] mr-2">OUR</span>
                <span className="text-white">INSTAGRAM</span>
              </h3>
              {/* Rich Dark Blue Signature bar line */}
              <div className="h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 w-28 mt-3.5 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.85)]" />
            </div>
          </motion.div>

          {/* RIGHT: Curved Clickable Instagram Account Widget Block */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <motion.a
              whileHover={{ y: -8, scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              href="https://www.instagram.com/bakocars_/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col sm:flex-row items-center justify-between gap-6 bako-curved-card rounded-3xl p-6 sm:p-8 w-full group relative"
              id="instagram-profile-widget"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 w-full text-center sm:text-left">
                {/* 1. Glowing Profile Avatar Frame with Bako Cars brand icon */}
                <div className="relative shrink-0 mx-auto sm:mx-0">
                  <div className="p-[3px] rounded-full bg-gradient-to-tr from-blue-700 via-blue-500 to-blue-300 shadow-[0_0_25px_rgba(37,99,235,0.65)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <div className="p-[2px] bg-[#050811] rounded-full">
                      <div className="w-[74px] h-[74px] rounded-full bg-black border border-blue-500/30 overflow-hidden relative">
                        <img
                          src={getImageUrl('bakocars logo.jpg')}
                          alt="Bako Cars Logo"
                          className="w-full h-full object-cover object-center"
                          loading="eager"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            handleImageFallback(e, 'bakocars logo.jpg');
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Username, Sub-text information, Stats and bio details */}
                <div className="flex-grow space-y-2.5">
                  <div>
                    <div className="flex items-center justify-center sm:justify-start space-x-1.5">
                      <span className="font-sans font-extrabold tracking-wide text-white text-base sm:text-lg group-hover:text-blue-400 transition-colors">
                        bakocars_
                      </span>
                      {/* Verification blue emblem check mark */}
                      <div className="bg-blue-600 text-white rounded-full p-[2px] flex items-center justify-center w-4 h-4 shrink-0 shadow-[0_0_10px_rgba(37,99,235,0.8)]">
                        <svg viewBox="0 0 24 24" className="w-[10px] h-[10px] fill-current" stroke="currentColor" strokeWidth="4">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </div>
                    </div>

                    <p className="font-sans text-xs text-blue-200/70 tracking-wider font-medium mt-0.5">
                      IBakocars
                    </p>
                  </div>

                  {/* Verification Statistics counts */}
                  <div className="flex items-center justify-center sm:justify-start space-x-4 font-mono text-[10px] sm:text-[11px] tracking-wide text-white/50 uppercase">
                    <span>
                      <strong className="text-white font-sans mr-0.5 font-bold">1,271</strong> posts
                    </span>
                    <span>
                      <strong className="text-white font-sans mr-0.5 font-extrabold">14.5K</strong> followers
                    </span>
                    <span>
                      <strong className="text-white font-sans mr-0.5 font-bold">155</strong> following
                    </span>
                  </div>
                </div>
              </div>

              {/* Curved Action Pill CTA */}
              <div className="self-center shrink-0 pt-2 sm:pt-0">
                <div className="btn-dark-blue px-6 py-3.5 rounded-full text-white text-[10px] font-mono font-bold uppercase tracking-[0.2em] w-full sm:w-auto text-center cursor-pointer">
                  FOLLOW PAGE
                </div>
              </div>
            </motion.a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
