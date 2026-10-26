/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { Car, getImageUrl, handleImageFallback } from './types';
import { SHOWROOM_VEHICLES } from './data';
import { Bell, MessageCircle, Camera, ChevronLeft, ChevronRight } from 'lucide-react';

interface NewInventoryProps {
  vehicles: Car[];
  onViewDetails: (car: Car) => void;
  onGetApproved: (car: Car) => void;
  onOpenPriceAlert?: (car: Car) => void;
}

interface PopularListingCardProps {
  car: Car;
  idx: number;
  onViewDetails: (car: Car) => void;
  onOpenPriceAlert?: (car: Car) => void;
}

const PopularListingCard: React.FC<PopularListingCardProps> = ({
  car,
  idx,
  onViewDetails,
  onOpenPriceAlert,
}) => {
  const [tilt, setTilt] = useState<{ rotateX: number; rotateY: number; glareX: number; glareY: number } | null>(null);

  const formatCurrency = (val: number) => {
    if (!val || val <= 0) return 'INQUIRE FOR PRICE';
    return '₦' + new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6.5;
    const rotateY = ((x - centerX) / centerX) * 8.5;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, glareX, glareY });
  };

  const handleMouseLeave = () => {
    setTilt(null);
  };

  const hasPhotos = car.images && car.images.length > 0;
  const isInquireOnly = !car.price || car.price <= 0;

  return (
    <div
      className="bako-perspective-wrap shrink-0 w-[295px] sm:w-[335px] snap-start py-2"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        onClick={() => onViewDetails(car)}
        style={
          tilt
            ? {
                transform: `perspective(1200px) rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.015, 1.015, 1.015)`,
                transition: 'transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.28s ease',
              }
            : {
                animationDelay: `${(idx % 6) * -1.4}s`,
              }
        }
        className={`${
          !tilt ? 'bako-card-idle-3d' : ''
        } relative h-full bg-[#090909] rounded-xl overflow-hidden border border-white/10 hover:border-blue-500/75 transition-colors duration-300 flex flex-col justify-between group cursor-pointer shadow-[0_14px_34px_rgba(0,0,0,0.85)] hover:shadow-[0_22px_50px_rgba(30,64,175,0.28)]`}
      >
        {/* Dynamic 3D Specular Glare Overlay */}
        {tilt && (
          <div
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(59, 130, 246, 0.16), transparent 60%)`,
            }}
          />
        )}

        <div>
          {/* Top Image Box */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
            {hasPhotos ? (
              <img
                src={getImageUrl(car.images[0], 640)}
                alt={`${car.year ? `${car.year} ` : ''}${car.make} ${car.model}`}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading={idx < 4 ? 'eager' : 'lazy'}
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  handleImageFallback(e, car.images[0]);
                }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 via-black to-neutral-950 p-6 text-center space-y-2 select-none">
                <div className="w-11 h-11 rounded-full border border-white/15 bg-neutral-900 flex items-center justify-center text-blue-500">
                  <Camera className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] text-blue-500 tracking-[0.2em] uppercase font-bold block">
                  Photos Coming Soon
                </span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none" />

            {/* Top Left Status Pill */}
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider font-bold rounded bg-black/80 text-white border border-white/15 backdrop-blur-md">
                {hasPhotos ? `${car.images.length} Photos` : 'In Showroom'}
              </span>
            </div>
          </div>

          {/* Info Text Area */}
          <div className="p-5 space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-white/50 uppercase tracking-wider mb-1">
                <span>{car.year ? `${car.year} • ` : ''}{car.make}</span>
                <span>{car.bodyType}</span>
              </div>
              <h3 className="font-display text-lg font-bold text-white tracking-tight truncate group-hover:text-blue-400 transition-colors">
                {car.model}
              </h3>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-baseline justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                  Showroom Price
                </span>
                <span
                  className={`font-mono text-lg font-extrabold tracking-tight tabular-nums ${
                    isInquireOnly ? 'text-blue-500 text-sm' : 'text-white'
                  }`}
                >
                  {formatCurrency(car.price)}
                </span>
              </div>

              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                • Duty Paid
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-5 pb-5 pt-1 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(car);
              }}
              className="py-2.5 px-3 bg-white hover:bg-neutral-200 text-black font-display font-bold text-[11px] uppercase tracking-wider rounded-lg transition-colors text-center cursor-pointer"
            >
              View Specs
            </button>
            <a
              href={`https://wa.me/message/JCOUM7I4Z2XVB1?text=${encodeURIComponent(
                `Hello Bako Cars, I am interested in the ${car.year ? `${car.year} ` : ''}${car.make} ${car.model} (Stock #: ${car.stockNumber || car.id}).`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="py-2.5 px-3 bg-blue-800 hover:bg-blue-700 text-white border border-blue-500/40 font-display font-bold text-[11px] uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-white" />
              <span>Inquire</span>
            </a>
          </div>

          {isInquireOnly && onOpenPriceAlert && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenPriceAlert(car);
              }}
              className="w-full py-1.5 text-[10px] font-mono text-blue-400 hover:text-blue-300 uppercase tracking-wider transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Bell className="w-3 h-3" />
              <span>Notify If Price Changes</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Popular Listings - strictly the 5 original showroom vehicles in exact order
const TARGET_INVENTORY_IDS = [
  'mercedes-g63-2020',
  'range-rover-velar-black-2020',
  'mercedes-gle53-2022',
  'mercedes-s63-2015',
  'range-rover-velar-2020',
];

export default function NewInventory({
  vehicles,
  onViewDetails,
  onOpenPriceAlert,
}: NewInventoryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const newCars: Car[] = TARGET_INVENTORY_IDS
    .map((id) => vehicles.find((car) => car.id === id) || SHOWROOM_VEHICLES.find((car) => car.id === id))
    .filter((car): car is Car => car !== undefined);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollOffset = direction === 'left' ? -360 : 360;
      scrollRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-black text-white border-t border-white/10 select-none" id="new-inventory-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading + Horizontal Carousel Navigation Arrows */}
        <div className="flex items-end justify-between mb-10 pb-4 border-b border-white/10 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-blue-500 font-semibold block mb-2">
              Curated Showroom Arrivals
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight uppercase text-white">
              Popular Listings
            </h2>
            <div className="w-20 h-1 bg-blue-700 mt-3 rounded-full" />
          </div>

          {/* Left / Right Horizontal Scroll Controls */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => handleScroll('left')}
              className="p-2.5 border border-white/10 hover:border-blue-500 text-white/70 hover:text-white bg-neutral-900 hover:bg-blue-950/50 transition-all rounded-xl cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-2.5 border border-white/10 hover:border-blue-500 text-white/70 hover:text-white bg-neutral-900 hover:bg-blue-950/50 transition-all rounded-xl cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Side-by-Side Placement with New Style & Slowed Per-Card 3D Motion */}
        <div
          ref={scrollRef}
          className="flex flex-nowrap space-x-6 overflow-x-auto pb-6 pt-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent snap-x snap-mandatory"
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.15) transparent' }}
        >
          {newCars.map((car, idx) => (
            <PopularListingCard
              key={car.id}
              car={car}
              idx={idx}
              onViewDetails={onViewDetails}
              onOpenPriceAlert={onOpenPriceAlert}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
