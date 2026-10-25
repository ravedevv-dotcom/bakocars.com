/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, MouseEvent } from 'react';
import { Eye, Heart, Scale, Bell, MessageCircle, Camera } from 'lucide-react';
import { Car, getImageUrl, handleImageFallback } from './types';

interface CarCardProps {
  car: Car;
  onViewDetails: (car: Car) => void;
  index: number;
  isCompared?: boolean;
  onToggleCompare?: (carId: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (carId: string) => void;
  onOpenPriceAlert?: (car: Car) => void;
  onUploadPhotos?: (carId: string) => void;
}

const CarCard: React.FC<CarCardProps> = ({
  car,
  onViewDetails,
  isCompared = false,
  onToggleCompare,
  isFavorite = false,
  onToggleFavorite,
  onOpenPriceAlert,
}) => {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const carImages = car.images && car.images.length > 0 ? car.images : [];
  const hasPhotos = carImages.length > 0;
  const maxPreviewSlots = Math.min(carImages.length, 5);

  useEffect(() => {
    setCurrentImgIdx(0);
  }, [car.id, car.images]);

  useEffect(() => {
    if (!isHovered || maxPreviewSlots <= 1) return;
    const interval = setInterval(() => {
      setCurrentImgIdx((prev) => (prev + 1) % maxPreviewSlots);
    }, 1800);
    return () => clearInterval(interval);
  }, [isHovered, maxPreviewSlots]);

  const formatCurrency = (val: number) => {
    if (!val || val <= 0) return 'INQUIRE FOR PRICE';
    return '₦' + new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleToggleFavorite = (e: MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(car.id);
    }
  };

  const handleCompareClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (onToggleCompare) {
      onToggleCompare(car.id);
    }
  };

  const handlePriceAlertClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (onOpenPriceAlert) {
      onOpenPriceAlert(car);
    }
  };

  const isInquireOnly = !car.price || car.price <= 0;

  return (
    <div
      onClick={() => onViewDetails(car)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImgIdx(0);
      }}
      className="group bg-[#090909] rounded-xl overflow-hidden border border-white/10 hover:border-blue-500/60 transition-colors duration-300 flex flex-col justify-between cursor-pointer select-none shadow-lg hover:shadow-xl"
      id={`car-card-${car.id}`}
    >
      <div>
        {/* Image Frame (16:10 ratio) */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
          {hasPhotos ? (
            <img
              src={getImageUrl(carImages[currentImgIdx] || carImages[0], 640)}
              alt={`${car.year ? `${car.year} ` : ''}${car.make} ${car.model}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
              onError={(e) => {
                handleImageFallback(e, carImages[currentImgIdx] || carImages[0]);
              }}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 via-black to-neutral-950 p-6 text-center space-y-2.5 select-none">
              <div className="w-12 h-12 rounded-full border border-white/15 bg-neutral-900 flex items-center justify-center text-blue-500">
                <Camera className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="font-sans font-extrabold text-white text-xs tracking-wider uppercase block">
                  {car.make} {car.model}
                </span>
                <span className="font-mono text-[10px] text-blue-500 tracking-[0.2em] uppercase font-bold block">
                  Official Photos Coming Soon
                </span>
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block">
                  Available for Inspection in Abuja
                </span>
              </div>
            </div>
          )}

          {/* Subtle bottom gradient for badge legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none" />

          {/* Top Left Status Pill */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
            {car.status !== 'Available' && (
              <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider font-bold rounded bg-blue-800 text-white">
                {car.status}
              </span>
            )}
            <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider font-bold rounded bg-black/80 text-white border border-white/15 backdrop-blur-md">
              {hasPhotos ? `${carImages.length} Photos` : 'In Showroom'}
            </span>
          </div>

          {/* Top Right Save Button */}
          <div className="absolute top-3 right-3 z-20">
            <button
              onClick={handleToggleFavorite}
              aria-label="Save to garage"
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                isFavorite
                  ? 'bg-blue-700 border-blue-500 text-white'
                  : 'bg-black/70 border-white/20 text-white hover:bg-black'
              }`}
              id={`fav-btn-${car.id}`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Slide indicator dots */}
          {maxPreviewSlots > 1 && (
            <div className="absolute bottom-2.5 left-3 right-3 flex space-x-1 z-20 pointer-events-none">
              {Array.from({ length: maxPreviewSlots }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${
                    idx === currentImgIdx ? 'bg-blue-500' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content Body */}
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

          {/* Price & Duty Status */}
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

          {/* Key Specs Pill Row */}
          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-mono text-white/70">
            <div className="bg-black border border-white/10 rounded-lg px-2.5 py-1.5 truncate">
              {car.engine || 'V8 Biturbo'}
            </div>
            <div className="bg-black border border-white/10 rounded-lg px-2.5 py-1.5 truncate text-right">
              {car.location || 'Abuja'}
            </div>
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="px-5 pb-5 pt-1 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(car);
            }}
            className="py-2.5 px-3 bg-white hover:bg-neutral-200 text-black font-display font-bold text-[11px] uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Specs</span>
          </button>

          <a
            href={`https://wa.me/message/JCOUM7I4Z2XVB1?text=${encodeURIComponent(
              `Hello Bako Cars, I am inquiring about the ${car.year ? `${car.year} ` : ''}${car.make} ${car.model} (Stock: ${car.stockNumber || car.id}).`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="py-2.5 px-3 bg-blue-800 hover:bg-blue-700 text-white border border-blue-500/40 font-display font-bold text-[11px] uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-white" />
            <span>WhatsApp</span>
          </a>
        </div>

        <div className="flex items-center justify-between pt-1">
          {onToggleCompare && (
            <button
              onClick={handleCompareClick}
              className={`text-[10px] font-mono uppercase tracking-wider flex items-center space-x-1 py-1 transition-colors cursor-pointer ${
                isCompared ? 'text-blue-400 font-bold' : 'text-white/45 hover:text-white'
              }`}
              id={`compare-btn-${car.id}`}
            >
              <Scale className="w-3 h-3" />
              <span>{isCompared ? 'Comparing' : '+ Compare'}</span>
            </button>
          )}

          {isInquireOnly && onOpenPriceAlert && (
            <button
              onClick={handlePriceAlertClick}
              className="text-[10px] font-mono uppercase tracking-wider text-blue-400 hover:text-blue-300 flex items-center space-x-1 py-1 transition-colors cursor-pointer ml-auto"
              id={`price-alert-btn-${car.id}`}
            >
              <Bell className="w-3 h-3" />
              <span>Price Alert</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarCard;
