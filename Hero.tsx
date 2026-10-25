/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export default function Hero({
  onExploreClick,
  onContactClick,
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playVideo = () => {
      video.play().catch(() => {});
    };

    playVideo();
    video.addEventListener('canplay', playVideo);
    video.addEventListener('loadeddata', playVideo);

    return () => {
      video.removeEventListener('canplay', playVideo);
      video.removeEventListener('loadeddata', playVideo);
    };
  }, []);

  return (
    <section className="relative h-[90vh] md:h-screen w-full bg-[#050811] overflow-hidden" id="hero-section">
      
      {/* 1. CINEMATIC LOOPING VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {/* Deep luxurious dark blue & obsidian overlays & vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050811]/85 via-[#071026]/30 to-[#050811]/95 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-blue-950/20 z-10 pointer-events-none" />
        
        <video
          ref={videoRef}
          src="/s63-hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center scale-100 bg-black"
          id="hero-background-video"
          style={{ filter: 'brightness(0.72) contrast(1.12) saturate(1.05)' }}
        >
          <source src="/s63-hero-video.mp4" type="video/mp4" />
          <source src="/s63-main-video.mp4" type="video/mp4" />
          <source src="/S63%20MAIN%20VIDEO.mp4" type="video/mp4" />
          <source src="/S63 MAIN VIDEO.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. FLOATING DARK BLUE AMBIENT GLOW ORBS */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden select-none">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-blue-700/20 rounded-full blur-[130px] animate-float-slow" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-800/20 rounded-full blur-[140px] animate-float-slow" />
      </div>

      {/* 3. HERO CONTENT OVERLAY */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between pt-24 pb-14 sm:pb-20 pointer-events-none">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between relative">
          
          {/* Top spacer */}
          <div />

          {/* CENTER PANEL: Hero Typography Header & Action Triggers */}
          <div className="text-center space-y-6 max-w-2xl mx-auto pointer-events-auto">
            
            {/* Styled "WELCOME TO" subtitle pill */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              <span className="inline-flex items-center px-5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/40 backdrop-blur-md text-[10px] sm:text-[11px] font-mono font-bold text-blue-300 tracking-[0.45em] uppercase shadow-[0_0_25px_rgba(29,78,216,0.4)]">
                WELCOME TO
              </span>
            </motion.div>

            {/* Core Titles */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.85, type: 'spring', stiffness: 120 }}
              className="relative select-none"
            >
              {/* Huge bold display title */}
              <h1 className="font-sans text-4xl sm:text-6xl md:text-7xl tracking-[0.06em] font-black text-white uppercase leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.85)]">
                BAKO CARS
              </h1>
              
              {/* Overlayed Signature text "of Nigeria" in Rich Dark Sapphire Blue */}
              <motion.div
                initial={{ opacity: 0, x: -20, rotate: -6 }}
                animate={{ opacity: 1, x: 0, rotate: -3 }}
                transition={{ delay: 0.35, duration: 0.8, type: 'spring' }}
                className="relative -mt-2 sm:-mt-4 mr-4 sm:mr-8"
              >
                <span className="font-signature text-[34px] sm:text-[56px] md:text-[64px] text-blue-500 drop-shadow-[0_0_24px_rgba(29,78,216,0.95)] font-extralight block leading-none italic select-none">
                  of Nigeria
                </span>
              </motion.div>
            </motion.div>

            {/* Curved Action Buttons with Heavy Noticeable Animations */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xl mx-auto"
            >
              {/* Button A: Rich Dark Royal Blue Pill CTA */}
              <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.96 }}
                onClick={onExploreClick}
                className="w-full sm:w-auto btn-dark-blue text-white font-sans font-extrabold text-[11px] sm:text-[12px] tracking-[0.25em] uppercase px-8 py-4 rounded-full flex items-center justify-center space-x-2.5 group cursor-pointer"
              >
                <span>BROWSE INVENTORY</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform text-blue-200" />
              </motion.button>

              {/* Button B: High-contrast White Pill CTA with Dark Blue Liquid Fill */}
              <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.96 }}
                onClick={onContactClick}
                className="w-full sm:w-auto btn-liquid-white font-sans font-extrabold text-[11px] sm:text-[12px] tracking-[0.25em] uppercase px-8 py-4 rounded-full flex items-center justify-center space-x-2.5 group cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
              >
                <span>SELL YOUR VEHICLE</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </motion.button>
            </motion.div>

          </div>

          {/* BOTTOM ROW: Description & Social shortcuts flanking left and right */}
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 pt-10 pointer-events-auto" id="hero-bottom-meta-tray">
            
            {/* Left corner curved glass mission card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md text-left bg-[#071028]/75 backdrop-blur-md border border-blue-500/30 border-l-4 border-l-blue-600 rounded-2xl p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_25px_rgba(29,78,216,0.25)]"
            >
              <p className="font-mono text-[9px] sm:text-[10px] text-white/85 leading-relaxed tracking-wider uppercase">
                BAKO CARS OF NIGERIA OFFERS A CURATED SELECTION OF EXOTIC AND LUXURY VEHICLES, ALONG WITH BESPOKE CUSTOM BUILDS. FROM SUPERCARS TO REIMAGINED G-WAGONS, EVERY VEHICLE IS HAND SELECTED TO IMPRESS.
              </p>
            </motion.div>

            {/* Right corner floating curved social links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.65, duration: 0.8 }}
              className="flex md:flex-col gap-3 relative shrink-0 z-30 mr-28 sm:mr-32 md:mr-0"
            >
              {/* Threads Icon Box */}
              <motion.a
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.94 }}
                href="https://www.threads.com/@bakocars_?xmt=AQG07HJ0ePjlGe-joG58PzkaeklhTkn4ijgP3i3vSmEOy_o"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-[#08122e]/80 backdrop-blur-md border border-blue-500/35 flex items-center justify-center text-white/80 hover:text-white hover:bg-blue-700 hover:border-blue-400 shadow-[0_8px_20px_rgba(29,78,216,0.35)] transition-all duration-300 rounded-2xl group"
                title="Threads"
              >
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M12 12c.5 0 .9-.2 1.2-.5.3-.3.5-.7.5-1.2 0-.5-.2-.9-.5-1.2s-.7-.5-1.2-.5-.9.2-1.2.5s-.5.7-.5 1.2c0 .5.2.9.5 1.2s.7.5 1.2.5z" />
                  <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
                </svg>
              </motion.a>

              {/* Instagram Icon Box */}
              <motion.a
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.94 }}
                href="https://www.instagram.com/bakocars_/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-[#08122e]/80 backdrop-blur-md border border-blue-500/35 flex items-center justify-center text-white/80 hover:text-white hover:bg-blue-700 hover:border-blue-400 shadow-[0_8px_20px_rgba(29,78,216,0.35)] transition-all duration-300 rounded-2xl group"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </motion.a>
            </motion.div>

          </div>

        </div>
      </div>

    </section>
  );
}
