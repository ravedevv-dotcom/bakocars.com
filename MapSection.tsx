/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
    <section className="w-full bg-black py-14 border-t border-white/10" id="location-map-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center sm:text-left mb-8 pb-4 border-b border-white/10 relative">
          <h2 className="font-sans font-black tracking-widest text-xl sm:text-2xl text-white uppercase relative inline-block">
            <span className="text-blue-500 mr-2">OUR</span> SHOWROOM
            <span className="absolute -bottom-4 left-0 h-[3px] bg-blue-700 w-24 block rounded-full" />
          </h2>
          <p className="mt-2 text-white/40 font-mono text-[9.5px] tracking-[0.4em] uppercase">
            VISIT BAKO CARS PRESTIGE GALLERY
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: Showroom coordinates and metadata details */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#090909] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-8">
            <div className="space-y-6">
              
              {/* Brand Watermark / Title */}
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-sans font-extrabold tracking-widest text-white text-base sm:text-lg uppercase">
                    BAKO CARS
                  </h3>
                  <div className="h-[2px] bg-blue-700 w-12" />
                </div>
                <div className="text-right select-none pointer-events-none opacity-45">
                  <span className="font-sans text-[6px] font-black text-white tracking-[0.2em] block uppercase">
                    SHOWROOM
                  </span>
                  <span className="font-signature text-[20px] text-blue-500 leading-none -mt-1 block transform -rotate-2">
                    by Bako
                  </span>
                </div>
              </div>

              {/* Coordinates List details */}
              <div className="space-y-5 pt-2">
                
                {/* 1. Address card */}
                <div className="flex items-start space-x-4">
                  <div className="p-2 border border-white/10 bg-black text-blue-500 rounded-lg shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 flex-grow">
                    <p className="font-mono text-[9px] text-white/40 tracking-widest uppercase font-semibold">ADDRESS</p>
                    <p className="font-sans text-[12px] sm:text-[13px] text-white/90 leading-relaxed max-w-sm">
                      {addressText}
                    </p>
                  </div>
                </div>

                {/* 2. Opening hours */}
                <div className="flex items-start space-x-4">
                  <div className="p-2 border border-white/10 bg-black text-blue-500 rounded-lg shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-[9px] text-white/40 tracking-widest uppercase font-semibold">GALLERY HOURS</p>
                    <div className="font-sans text-[11px] sm:text-[12px] text-white/80 space-y-0.5">
                      <p className="flex justify-between w-48 font-mono">
                        <span className="text-white/40">MON - SAT:</span>
                        <span className="text-white font-medium">9AM – 7PM</span>
                      </p>
                      <p className="flex justify-between w-48 font-mono">
                        <span className="text-white/40">SUNDAYS:</span>
                        <span className="text-blue-500 font-bold tracking-wider">APPOINTMENT</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Direct dealer contacts */}
                <div className="flex items-start space-x-4">
                  <div className="p-2 border border-white/10 bg-black text-blue-500 rounded-lg shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-[9px] text-white/40 tracking-widest uppercase font-semibold">TELEPHONE</p>
                    <p className="font-mono text-[11px] text-white/90 tracking-wider">
                      07058099349 <span className="text-white/25">|</span> 08167332017
                    </p>
                  </div>
                </div>

                {/* 4. On-Stand Car Wash & Detailing Bay */}
                <div className="p-4 border border-emerald-500/30 bg-emerald-500/[0.05] rounded-xl space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <p className="font-sans font-extrabold text-[11px] text-white uppercase tracking-wider">
                      WANNA DETAIL OR WASH YOUR CAR?
                    </p>
                  </div>
                  <p className="font-mono text-[10px] text-white/65 uppercase leading-relaxed">
                    Our on-stand precision car wash & auto detailing bay is active behind Tsukunda House. Walk in for instant foam bath, interior deep clean & ceramic coat!
                  </p>
                </div>

              </div>

            </div>

            {/* Interactive navigation controls */}
            <div className="space-y-3 pt-6 border-t border-white/10">
              <div className="grid grid-cols-2 gap-3">
                
                <button
                  onClick={copyAddress}
                  className="px-4 py-3 border border-white/15 bg-black text-white hover:border-blue-500 transition-all duration-300 text-[9.5px] font-mono font-bold uppercase tracking-[0.18em] flex items-center justify-center space-x-2 rounded-xl cursor-pointer select-none"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span>COPY ADDRESS</span>
                    </>
                  )}
                </button>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 bg-blue-800 hover:bg-blue-700 border border-blue-500/40 text-white transition-all duration-300 text-[9.5px] font-mono font-bold uppercase tracking-[0.18em] flex items-center justify-center space-x-2 rounded-xl text-center"
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
                className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-black/70 hover:border-blue-500/50 transition-all w-full group text-left"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                  <div>
                    <p className="font-sans font-bold text-white text-[11px] group-hover:text-blue-400 transition-colors">WHATSAPP DIGITAL CONCIERGE</p>
                    <p className="font-mono text-[9px] text-white/40 tracking-wide">CONNECT IN REAL-TIME FOR ENQUIRIES</p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-white/30 group-hover:text-blue-400 transition-all shrink-0" />
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: Google Maps interactive iframe */}
          <div className="lg:col-span-7 bg-[#090909] border border-white/10 rounded-2xl p-2 flex flex-col justify-between relative group overflow-hidden">
            <div className="w-full h-[330px] sm:h-full min-h-[330px] relative overflow-hidden rounded-xl bg-black">
              <iframe
                title="Bako Cars Showroom Map"
                src="https://maps.google.com/maps?q=Tsukunda%20House,%20Abuja,%20Nigeria&t=m&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.1) brightness(0.85)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full rounded-xl"
              />
              
              <div className="absolute top-4 left-4 bg-black/85 border border-white/15 rounded-lg px-3.5 py-2 backdrop-blur-md flex items-center space-x-2 select-none pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="font-mono text-[8.5px] tracking-widest text-white uppercase font-black">
                  BAKO CARS ABUJA HQ
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
