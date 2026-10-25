/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { Share2, ChevronLeft, ChevronRight, Check, MessageCircle } from 'lucide-react';
import { Car, getImageUrl, handleImageFallback } from './types';
import { SHOWROOM_VEHICLES } from './data';

interface NewInventoryProps {
  onViewDetails: (car: Car) => void;
  onGetApproved: (car: Car) => void;
  onOpenPriceAlert?: (car: Car) => void;
  vehicles?: Car[];
}

interface PopularCardProps {
  car: Car;
  idx: number;
  copiedId: string | null;
  onViewDetails: (car: Car) => void;
  onShareCar: (car: Car, e: React.MouseEvent) => void;
  getCustomTransmissionDisplay: (car: Car) => string;
  formatCurrency: (val: number) => string;
}

function PopularListingCard({
  car,
  idx,
  copiedId,
  onViewDetails,
  onShareCar,
  getCustomTransmissionDisplay,
  formatCurrency,
}: PopularCardProps) {
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    isHovered: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    // Per-card 3D tilt following cursor position on this specific card
    const rotateY = (relX - 0.5) * 24;
    const rotateX = (0.5 - relY) * 22;

    setTilt({
      rotateX,
      rotateY,
      glareX: relX * 100,
      glareY: relY * 100,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      isHovered: false,
    });
  };

  return (
    <div
      className="shrink-0 w-[295px] sm:w-[330px] snap-start py-4 px-1.5"
      style={{ perspective: '1000px' }}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          tilt.isHovered
            ? {
                transform: `perspective(1000px) rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`,
                transition: 'transform 0.08s ease-out, box-shadow 0.25s ease, border-color 0.25s ease',
                transformStyle: 'preserve-3d',
              }
            : {
                animationDelay: `${idx * 0.75}s`,
                transformStyle: 'preserve-3d',
              }
        }
        className={`relative h-full bg-[#090909] border ${
          tilt.isHovered
            ? 'border-blue-600/70 shadow-[0_28px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(29,78,216,0.28)]'
            : 'border-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.85)] animate-card-idle-3d'
        } rounded-2xl overflow-hidden flex flex-col justify-between group`}
      >
        {/* Dynamic Per-Card Specular Glare Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-2xl"
          style={{
            opacity: tilt.isHovered ? 1 : 0.25,
            background: tilt.isHovered
              ? `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(59, 130, 246, 0.22), rgba(255, 255, 255, 0.06) 35%, transparent 65%)`
              : 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(29,78,216,0.06) 100%)',
          }}
        />

        {/* 1. Image block with Watermark */}
        <div
          onClick={() => onViewDetails(car)}
          className="relative aspect-[4/3] w-full overflow-hidden bg-black border-b border-white/10 cursor-pointer"
        >
          <img
            src={getImageUrl(car.images[0], 540)}
            alt={`${car.make} ${car.model}`}
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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

          {/* Photo Slot Badge */}
          <div className="absolute top-3 left-3 select-none pointer-events-none">
            <span className="px-2.5 py-1 bg-black/85 backdrop-blur-sm text-white font-mono text-[8.5px] font-bold uppercase rounded-md border border-blue-600/40">
              {car.images.length > 0 ? `${car.images.length}/12 PHOTOS` : '12 SLOTS READY'}
            </span>
          </div>
        </div>

        {/* 2. Specs detail presentation area */}
        <div
          onClick={() => onViewDetails(car)}
          className="p-5 flex-grow cursor-pointer relative z-10"
        >
          <h3 className="font-mono text-[10px] tracking-widest text-white/50 uppercase leading-tight font-semibold">
            {car.year} {car.make}
          </h3>
          <h4 className="font-sans text-[13px] sm:text-[14px] font-black text-white group-hover:text-blue-500 transition-colors uppercase tracking-wider mt-1.5 line-clamp-1">
            {car.model}
          </h4>

          {/* Monospaced tabular specifications rows */}
          <div className="mt-4 space-y-1.5 text-[10px] font-mono tracking-widest text-white/45 uppercase">
            <div className="flex justify-between border-b border-white/[0.05] pb-1">
              <span>DUTY</span>
              <span className="text-emerald-400 font-medium">PAID & CLEARED</span>
            </div>
            <div className="flex justify-between border-b border-white/[0.05] pb-1">
              <span>STOCK #</span>
              <span className="text-white font-medium">{car.stockNumber}</span>
            </div>
            <div className="flex justify-between border-b border-white/[0.05] pb-1">
              <span>TRANSMISSION</span>
              <span className="text-white font-medium truncate max-w-[155px]">
                {getCustomTransmissionDisplay(car)}
              </span>
            </div>
            <div className="flex justify-between border-b border-white/[0.05] pb-1">
              <span>DRIVETRAIN</span>
              <span className="text-white font-medium">{car.drivetrain?.toUpperCase() || 'AWD'}</span>
            </div>
            <div className="flex justify-between pb-1">
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
                <span className="text-xs font-mono text-blue-500 font-bold">
                  INQUIRE FOR PRICE
                </span>
              )}
            </div>
            <button
              onClick={(e) => onShareCar(car, e)}
              className="p-2 rounded-lg border border-white/10 hover:border-blue-500 text-white/60 hover:text-white transition-colors cursor-pointer"
              title="Share link"
            >
              {copiedId === car.id ? (
                <Check className="w-3.5 h-3.5 text-blue-500" />
              ) : (
                <Share2 className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* 3. Action Button - INQUIRE ON WHATSAPP in Dark Blue */}
        <div className="p-5 pt-0 relative z-10">
          <a
            href={`https://wa.me/message/JCOUM7I4Z2XVB1?text=${encodeURIComponent(
              `Hello Bako Cars, I am interested in the ${car.year} ${car.make} ${car.model} (Stock #: ${car.stockNumber}). Please send details.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-blue-800 hover:bg-blue-700 border border-blue-500/40 rounded-xl text-white font-sans font-black text-[10px] uppercase tracking-[0.16em] py-3 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer text-center shadow-lg shadow-blue-900/30"
          >
            <MessageCircle className="w-3.5 h-3.5 text-white" />
            <span>INQUIRE ON WHATSAPP</span>
          </a>
        </div>
      </div>
    </div>
  );
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
      const scrollOffset = direction === 'left' ? -360 : 360;
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
    <section className="w-full bg-black py-14" id="new-inventory-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title with Dark Blue Secondary Accent Bar */}
        <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
          <div className="space-y-1.5">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.3em] text-blue-500 font-bold block">
              HANDPICKED ABUJA FLEET
            </span>
            <h2 className="font-sans font-black tracking-widest text-xl sm:text-2xl text-white uppercase relative inline-block">
              POPULAR LISTINGS
              <span className="absolute -bottom-4 left-0 h-[3px] bg-blue-700 w-24 block rounded-full" />
            </h2>
          </div>

          {/* Navigation buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => handleScroll('left')}
              className="p-2.5 border border-white/10 hover:border-blue-500 text-white/70 hover:text-white bg-neutral-900 hover:bg-blue-900/40 transition-all rounded-xl cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-2.5 border border-white/10 hover:border-blue-500 text-white/70 hover:text-white bg-neutral-900 hover:bg-blue-900/40 transition-all rounded-xl cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel container with per-card 3D cursor tracking and idle 3D motion */}
        <div
          ref={scrollRef}
          className="flex space-x-5 overflow-x-auto pb-6 pt-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent snap-x snap-mandatory"
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.15) transparent' }}
        >
          {NEW_ARRIVALS.map((car, idx) => (
            <PopularListingCard
              key={car.id}
              car={car}
              idx={idx}
              copiedId={copiedId}
              onViewDetails={onViewDetails}
              onShareCar={shareCar}
              getCustomTransmissionDisplay={getCustomTransmissionDisplay}
              formatCurrency={formatCurrency}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
