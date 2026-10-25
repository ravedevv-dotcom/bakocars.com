/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Instagram, ExternalLink } from 'lucide-react';
import { handleImageFallback } from './types';

export default function InstagramSection() {
  return (
    <section className="w-full bg-black py-12 border-b border-white/5" id="instagram-brand-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT: Cleanly aligned "CURATED BY Bako Cars" + "OUR INSTAGRAM" */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5 text-left space-y-1.5"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-display tracking-[0.22em] text-white/55 text-[10px] sm:text-[11px] uppercase font-bold">
                CURATED BY
              </span>
              <span className="font-signature text-[36px] sm:text-[44px] text-white/95 leading-none transform -rotate-2 select-none inline-block">
                Bako Cars
              </span>
            </div>

            <div className="flex flex-col pt-0.5">
              <h3 className="font-sans font-black tracking-widest text-2xl sm:text-3xl leading-none uppercase">
                <span className="text-blue-500 mr-2">OUR</span>
                <span className="text-white">INSTAGRAM</span>
              </h3>
              {/* Dark Blue Signature bar line */}
              <div className="h-[3px] bg-blue-700 w-28 mt-3 rounded-full" />
            </div>
          </motion.div>

          {/* RIGHT: Clickable Instagram Account Widget Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <a
              href="https://www.instagram.com/bakocars_/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#090909] border border-white/10 hover:border-blue-600/60 p-6 sm:p-7 rounded-2xl hover:bg-neutral-950 transition-all duration-300 w-full group relative shadow-[0_18px_45px_rgba(0,0,0,0.85)] cursor-pointer"
              id="instagram-profile-widget"
            >
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5 w-full text-center sm:text-left">
                {/* 1. Profile Avatar Frame with properly fitted Bako Cars logo */}
                <div className="relative shrink-0 mx-auto sm:mx-0">
                  <div className="p-[2.5px] rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#962fbf] transition-transform duration-300 group-hover:scale-105">
                    <div className="p-[2px] bg-black rounded-full">
                      <div className="w-[74px] h-[74px] rounded-full bg-[#181818] border border-white/10 overflow-hidden flex items-center justify-center p-1">
                        <img
                          src="/bakocars-logo.jpg"
                          alt="Bako Cars Logo"
                          className="w-full h-full object-contain object-center rounded-full"
                          loading="eager"
                          decoding="async"
                          onError={(e) => {
                            handleImageFallback(e, 'bakocars-logo.jpg');
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Username, Sub-text information, Stats and bio details */}
                <div className="flex-grow space-y-2">
                  <div>
                    <div className="flex items-center justify-center sm:justify-start space-x-1.5">
                      <span className="font-sans font-extrabold tracking-wide text-white text-base sm:text-lg group-hover:text-blue-400 transition-colors">
                        bakocars_
                      </span>
                      {/* Verified check mark */}
                      <div className="bg-[#0095f6] text-white rounded-full p-[2px] flex items-center justify-center w-4 h-4 shrink-0">
                        <svg viewBox="0 0 24 24" className="w-[10px] h-[10px] fill-current" stroke="currentColor" strokeWidth="4">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </div>
                    </div>

                    <p className="font-sans text-xs text-white/60 tracking-wider font-medium mt-0.5">
                      Bako Cars Nigeria • Abuja Luxury Showroom
                    </p>
                  </div>

                  {/* Verification Statistics counts */}
                  <div className="flex items-center justify-center sm:justify-start space-x-4 font-mono text-[10px] sm:text-[11px] tracking-wide text-white/45 uppercase">
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

              {/* Action Button */}
              <div className="self-center shrink-0 w-full sm:w-auto pt-2 sm:pt-0">
                <div className="px-5 py-3 rounded-xl bg-blue-800 group-hover:bg-blue-700 border border-blue-500/40 text-white transition-all duration-300 text-[10px] font-mono font-bold uppercase tracking-[0.2em] w-full sm:w-auto text-center flex items-center justify-center space-x-2 shadow-lg shadow-blue-900/30">
                  <Instagram className="w-3.5 h-3.5" />
                  <span>FOLLOW PAGE</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </div>
              </div>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
