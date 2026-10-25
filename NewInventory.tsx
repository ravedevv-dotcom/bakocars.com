/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Share2, ChevronLeft, ChevronRight, Check, MessageCircle } from 'lucide-react';
import { Car, getImageUrl, handleImageFallback } from './types';
import { SHOWROOM_VEHICLES } from './data';

interface NewInventoryProps {
  onViewDetails: (car: Car) => void;
  onGetApproved: (car: Car) => void;
  onOpenPriceAlert?: (car: Car) => void;
  vehicles?: Car[];
}

export default function NewInventory({ onViewDetails, vehicles = SHOWROOM_VEHICLES }: NewInventoryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Popular Listings - strictly the 5 requested vehicles in exact order
  const TARGET_INVENTORY_IDS = [
    'mercedes-g63-2020',
    'range-rover-velar-black-2020',
    'mercedes-gle53-2022',
    'mercedes-s63-2015',
    'range-rover-velar-2020',
  ];

  const NEW_ARRIVALS: Car[] = TARGET_INVENTORY_IDS
    .map((id) => vehicles.find((car) => car.id === id) || SHOWROOM_VEHICLES.find((car) => car.id === id))
    .filter((car): car is Car => car !== undefined);

  const getCustomTransmissionDisplay = (car: Car) => {
    if (car.id === 'mercedes-e63s-2020') return '9-SPEED SHIFTABLE AU';
    if (car.id === 'honda-s2000-2001') return '6 SPEED MANUAL';
    if (car.id === 'rolls-royce-wraith-2018') return '8-SPEED SHIFTABLE AU';
    return car.transmission.toUpperCase();
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollOffset = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  const shareCar = (car: Car, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/?car=${car.id}`);
    setCopiedId(car.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatCurrency = (val: number) => {
    return '₦' + new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section className="w-full bg-[#050811] py-16 relative overflow-hidden" id="new-inventory-section">
      {/* Subtle dark blue ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-blue-700/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title with Glowing Dark Blue Accent Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-10 border-b border-blue-500/20 pb-5"
        >
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue-400 font-bold block">
              HANDPICKED ABUJA FLEET
            </span>
            <h2 className="font-sans font-black tracking-widest text-xl sm:text-3xl text-white uppercase relative inline-block">
              POPULAR LISTINGS
              <span className="absolute -bottom-5 left-0 h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 w-28 block rounded-full shadow-[0_0_15px_rgba(37,99,235,0.85)]" />
            </h2>
          </div>

          {/* Curved Navigation buttons */}
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleScroll('left')}
              className="p-3 border border-blue-500/35 hover:border-blue-400 text-white/80 hover:text-white bg-[#08122b] hover:bg-blue-700 transition-all rounded-full cursor-pointer shadow-[0_0_20px_rgba(29,78,216,0.3)]"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleScroll('right')}
              className="p-3 border border-blue-500/35 hover:border-blue-400 text-white/80 hover:text-white bg-[#08122b] hover:bg-blue-700 transition-all rounded-full cursor-pointer shadow-[0_0_20px_rgba(29,78,216,0.3)]"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Carousel container */}
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto pb-6 pt-2 scrollbar-thin scrollbar-thumb-blue-600/30 scrollbar-track-transparent snap-x snap-mandatory"
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(37,99,235,0.35) transparent' }}
        >
          {NEW_ARRIVALS.map((car, idx) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
              whileHover={{ y: -10, scale: 1.015 }}
              className="shrink-0 w-[300px] sm:w-[335px] snap-start bako-curved-card rounded-3xl overflow-hidden flex flex-col justify-between group"
            >
              {/* 1. Image block with Watermark */}
              <div 
                onClick={() => onViewDetails(car)}
                className="relative aspect-[4/3] w-full overflow-hidden bg-[#060b19] border-b border-blue-500/20 cursor-pointer"
              >
                <img
                  src={getImageUrl(car.images[0], 540)}
                  alt={`${car.make} ${car.model}`}
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    handleImageFallback(e, car.images[0]);
                  }}
                />

                {/* Watermark overlay "Bako Cars" */}
                <div className="absolute top-3 right-3 select-none pointer-events-none text-right">
                  <span className="font-serif italic font-extrabold text-[13px] text-black tracking-tight drop-shadow-sm block leading-none">
                    BAKO CARS
                  </span>
                  <span className="font-sans text-[7.5px] text-black font-extrabold uppercase tracking-[0.2em] block mt-0.5">
                    ABUJA
                  </span>
                </div>

                {/* Curved Photo Slot Pill */}
                <div className="absolute top-3 left-3 select-none pointer-events-none">
                  <span className="px-3 py-1 bg-[#060d24]/85 backdrop-blur-md text-blue-200 font-mono text-[8.5px] font-bold uppercase rounded-full border border-blue-400/30 shadow-md">
                    {car.images.length > 0 ? `${car.images.length}/12 PHOTOS` : '12 SLOTS READY'}
                  </span>
                </div>
              </div>

              {/* 2. Specs detail presentation area */}
              <div 
                onClick={() => onViewDetails(car)}
                className="p-5 sm:p-6 flex-grow cursor-pointer"
              >
                <h3 className="font-mono text-[10px] tracking-widest text-blue-400 uppercase leading-tight font-bold">
                  {car.year} {car.make}
                </h3>
                <h4 className="font-sans text-[13px] sm:text-[14px] font-black text-white group-hover:text-blue-300 transition-colors uppercase tracking-wider mt-1.5 line-clamp-1">
                  {car.model}
                </h4>

                {/* Monospaced tabular specifications rows in curved pod */}
                <div className="mt-4 p-3.5 rounded-2xl bg-[#050a18]/90 border border-blue-500/20 space-y-1.5 text-[10px] font-mono tracking-widest text-white/45 uppercase">
                  <div className="flex justify-between border-b border-blue-500/10 pb-1">
                    <span>DUTY</span>
                    <span className="text-emerald-400 font-bold">PAID & CLEARED</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-500/10 pb-1">
                    <span>STOCK #</span>
                    <span className="text-white font-medium">{car.stockNumber}</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-500/10 pb-1">
                    <span>TRANSMISSION</span>
                    <span className="text-white font-medium truncate max-w-[150px]">{getCustomTransmissionDisplay(car)}</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-500/10 pb-1">
                    <span>DRIVETRAIN</span>
                    <span className="text-white font-medium">{car.drivetrain?.toUpperCase() || 'AWD'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>FUEL TYPE</span>
                    <span className="text-white font-medium">{car.fuelType.toUpperCase()}</span>
                  </div>
                </div>

                {/* Investment Price Display */}
                <div className="mt-5 font-sans font-black text-lg sm:text-xl text-white tracking-wider flex items-center justify-between">
                  <div>
                    {car.price && car.price > 0 ? (
                      formatCurrency(car.price)
                    ) : (
                      <span className="text-xs font-mono text-blue-400 drop-shadow-[0_0_10px_rgba(37,99,235,0.6)]">
                        INQUIRE FOR PRICE
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => shareCar(car, e)}
                    className="p-2 rounded-xl border border-blue-500/30 bg-[#070f24] hover:border-blue-400 text-white/70 hover:text-white transition-all cursor-pointer"
                    title="Share link"
                  >
                    {copiedId === car.id ? <Check className="w-3.5 h-3.5 text-blue-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* 3. Action Button - INQUIRE ON WHATSAPP */}
              <div className="p-5 sm:p-6 pt-0">
                <a
                  href={`https://wa.me/message/JCOUM7I4Z2XVB1?text=${encodeURIComponent(
                    `Hello Bako Cars, I am interested in the ${car.year} ${car.make} ${car.model} (Stock #: ${car.stockNumber}). Please send details.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-full btn-dark-blue rounded-2xl text-white font-sans font-black text-[10px] uppercase tracking-[0.18em] py-3.5 flex items-center justify-center space-x-2 cursor-pointer text-center"
                >
                  <MessageCircle className="w-4 h-4 text-blue-200" />
                  <span>INQUIRE ON WHATSAPP</span>
                </a>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
