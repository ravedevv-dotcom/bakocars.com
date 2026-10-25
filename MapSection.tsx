/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Phone, Navigation, Copy, Check, ExternalLink } from 'lucide-react';

export default function MapSection() {
  const [copied, setCopied] = useState(false);
  const addressText = "2FWF+FH2, behind Tsukunda House, Abuja 900103, Nigeria";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Tsukunda House, Abuja, Nigeria")}`;

  const copyAddress = () => {
    navigator.clipboard.writeText(addressText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full bg-[#050811] py-16 border-t border-blue-500/20 relative overflow-hidden" id="location-map-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center sm:text-left mb-10 pb-5 border-b border-blue-500/20 relative"
        >
          <h2 className="font-sans font-black tracking-widest text-xl sm:text-3xl text-white uppercase relative inline-block">
            <span className="text-blue-500 drop-shadow-[0_0_16px_rgba(29,78,216,0.75)] mr-2">OUR</span> SHOWROOM
            <span className="absolute -bottom-5 left-0 h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 w-24 block rounded-full shadow-[0_0_15px_rgba(37,99,235,0.85)]" />
          </h2>
          <p className="mt-2 text-blue-300/50 font-mono text-[9.5px] tracking-[0.4em] uppercase">
            VISIT BAKO CARS PRESTIGE GALLERY
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: Curved Showroom coordinates and metadata details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-5 flex flex-col justify-between bako-curved-card rounded-3xl p-6 sm:p-8 space-y-8"
          >
            <div className="space-y-6">
              
              {/* Brand Watermark / Title */}
              <div className="flex justify-between items-start">
                <div className="space-y-1.5">
                  <h3 className="font-sans font-extrabold tracking-widest text-white text-base sm:text-lg uppercase">
                    BAKO CARS
                  </h3>
                  <div className="h-1 bg-blue-600 w-14 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
                </div>
                {/* Visual signature watermark */}
                <div className="text-right select-none pointer-events-none opacity-60">
                  <span className="font-sans text-[6px] font-black text-blue-300 tracking-[0.2em] block uppercase">
                    SHOWROOM
                  </span>
                  <span className="font-signature text-[20px] text-blue-400 italic leading-none -mt-1 block transform -rotate-2">
                    by Bako
                  </span>
                </div>
              </div>

              {/* Coordinates List details */}
              <div className="space-y-5 pt-2">
                
                {/* 1. Address card */}
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 border border-blue-500/35 bg-blue-950/60 text-blue-400 rounded-2xl shrink-0 mt-0.5 shadow-[0_0_15px_rgba(29,78,216,0.3)]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 flex-grow">
                    <p className="font-mono text-[9px] text-blue-300/50 tracking-widest uppercase font-semibold">ADDRESS</p>
                    <p className="font-sans text-[12px] sm:text-[13px] text-white/90 leading-relaxed max-w-sm">
                      {addressText}
                    </p>
                  </div>
                </div>

                {/* 2. Opening hours */}
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 border border-blue-500/35 bg-blue-950/60 text-blue-400 rounded-2xl shrink-0 mt-0.5 shadow-[0_0_15px_rgba(29,78,216,0.3)]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-[9px] text-blue-300/50 tracking-widest uppercase font-semibold">GALLERY HOURS</p>
                    <div className="font-sans text-[11px] sm:text-[12px] text-white/80 space-y-0.5">
                      <p className="flex justify-between w-48 font-mono">
                        <span className="text-white/50">MON - SAT:</span>
                        <span className="text-white font-medium">9AM – 7PM</span>
                      </p>
                      <p className="flex justify-between w-48 font-mono">
                        <span className="text-white/50">SUNDAYS:</span>
                        <span className="text-blue-400 font-bold tracking-wider">APPOINTMENT</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Direct dealer contacts */}
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 border border-blue-500/35 bg-blue-950/60 text-blue-400 rounded-2xl shrink-0 mt-0.5 shadow-[0_0_15px_rgba(29,78,216,0.3)]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-[9px] text-blue-300/50 tracking-widest uppercase font-semibold">TELEPHONE</p>
                    <p className="font-mono text-[11px] text-white/95 tracking-wider">
                      07058099349 <span className="text-blue-400/50">|</span> 08167332017
                    </p>
                  </div>
                </div>

                {/* 4. On-Stand Car Wash & Detailing Bay */}
                <div className="p-4 border border-emerald-500/30 bg-emerald-950/25 rounded-2xl space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <p className="font-sans font-extrabold text-[11px] text-white uppercase tracking-wider">
                      WANNA DETAIL OR WASH YOUR CAR?
                    </p>
                  </div>
                  <p className="font-mono text-[10px] text-emerald-200/75 uppercase leading-relaxed">
                    Our on-stand precision car wash & auto detailing bay is active behind Tsukunda House. Walk in for instant foam bath, interior deep clean & ceramic coat!
                  </p>
                </div>

              </div>

            </div>

            {/* Interactive Curved navigation controls */}
            <div className="space-y-3 pt-6 border-t border-blue-500/20">
              <div className="grid grid-cols-2 gap-3">
                
                {/* Copy address button */}
                <button
                  onClick={copyAddress}
                  className="px-4 py-3.5 border border-blue-500/30 bg-[#050a18] text-white hover:bg-blue-900/50 hover:border-blue-400 transition-all duration-300 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center justify-center space-x-2 rounded-2xl cursor-pointer select-none"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>COPY ADDRESS</span>
                    </>
                  )}
                </button>

                {/* Open external directions trigger */}
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-dark-blue px-4 py-3.5 text-white text-[10px] font-mono font-bold uppercase tracking-wider flex items-center justify-center space-x-2 rounded-2xl text-center"
                >
                  <Navigation className="w-3.5 h-3.5 shrink-0" />
                  <span>DIRECTIONS</span>
                </a>

              </div>

              {/* Direct WhatsApp channel connection info box */}
              <a
                href="https://wa.me/message/JCOUM7I4Z2XVB1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl border border-blue-500/35 bg-gradient-to-r from-[#0b193d] to-[#060d20] hover:border-blue-400 transition-all w-full group text-left shadow-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
                  <div>
                    <p className="font-sans font-bold text-white text-[11px] group-hover:text-blue-300 transition-colors">WHATSAPP DIGITAL CONCIERGE</p>
                    <p className="font-mono text-[9px] text-blue-200/50 tracking-wide">CONNECT IN REAL-TIME FOR ENQUIRIES</p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-0.5 transition-all shrink-0" />
              </a>
            </div>

          </motion.div>

          {/* RIGHT COLUMN: Curved Google Maps interactive iframe */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-7 bako-curved-card rounded-3xl p-3 flex flex-col justify-between relative group overflow-hidden"
          >
            <div className="w-full h-[340px] sm:h-full min-h-[340px] relative overflow-hidden rounded-2xl bg-[#050811]">
              <iframe
                title="Bako Cars Showroom Map"
                src="https://maps.google.com/maps?q=Tsukunda%20House,%20Abuja,%20Nigeria&t=m&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.1) brightness(0.85)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full rounded-2xl"
              />
              
              {/* Curved Glassmorphic badge */}
              <div className="absolute top-4 left-4 bg-[#060d24]/85 border border-blue-500/40 rounded-full px-4 py-2 backdrop-blur-md flex items-center space-x-2 select-none pointer-events-none shadow-lg">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                <span className="font-mono text-[8.5px] tracking-widest text-white uppercase font-black">
                  BAKO CARS ABUJA HQ
                </span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
