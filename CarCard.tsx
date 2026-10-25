/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, MouseEvent } from 'react';
import { motion } from 'motion/react';
import {
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  FolderDown,
  Loader2,
  Car as CarIcon,
  Camera,
} from 'lucide-react';
import { Car, getImageUrl, handleImageFallback } from './types';
import { downloadAllVehicleImages } from './imageDownloader';

interface CarCardProps {
  car: Car;
  index?: number;
  onViewDetails: (car: Car) => void;
  isCompared?: boolean;
  onToggleCompare?: (carId: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (carId: string) => void;
  onOpenPriceAlert?: (car: Car) => void;
  onUploadPhotos?: (carId: string) => void;
}

export default function CarCard({
  car,
  index = 0,
  onViewDetails,
  isCompared = false,
  onToggleCompare,
  isFavorite = false,
  onToggleFavorite,
  onUploadPhotos,
}: CarCardProps) {
  const [copied, setCopied] = useState(false);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const [downloadMsg, setDownloadMsg] = useState('');

  const formatCurrency = (val: number) => {
    if (!val || val <= 0) return 'INQUIRE FOR PRICE';
    return '₦' + new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleDownloadAllPhotos = async (e: MouseEvent) => {
    e.stopPropagation();
    if (!car.images || car.images.length === 0) return;
    setIsDownloadingAll(true);
    setDownloadMsg('Preparing ZIP...');
    try {
      await downloadAllVehicleImages(car, (curr, tot) => {
        setDownloadMsg(`Archiving ${curr}/${tot}`);
      });
      setDownloadMsg('Complete!');
      setTimeout(() => setDownloadMsg(''), 2500);
    } catch (err) {
      console.error('Download failed:', err);
      setDownloadMsg('Failed');
      setTimeout(() => setDownloadMsg(''), 2500);
    } finally {
      setIsDownloadingAll(false);
    }
  };

  const handleShare = async (e: MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}${window.location.pathname}?carId=${car.id}`;
    const shareData = {
      title: `${car.year ? `${car.year} ` : ''}${car.make} ${car.model} | Bako Cars`,
      text: `Check out this ${car.year ? `${car.year} ` : ''}${car.make} ${car.model} at Bako Cars!`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Could not copy link:', err);
      }
    }
  };

  const handlePrevImage = (e: MouseEvent) => {
    e.stopPropagation();
    if (!car.images || car.images.length === 0) return;
    setCurrentImgIdx((prev) => (prev === 0 ? car.images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: MouseEvent) => {
    e.stopPropagation();
    if (!car.images || car.images.length === 0) return;
    setCurrentImgIdx((prev) => (prev + 1) % car.images.length);
  };

  const waUrl = `https://wa.me/message/JCOUM7I4Z2XVB1?text=${encodeURIComponent(
    `Hello Bako Cars, I am interested in the ${car.year ? `${car.year} ` : ''}${car.make} ${car.model} (Stock #: ${car.stockNumber || car.id}). Please send more details.`
  )}`;

  const imagesCount = car.images ? car.images.length : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10, scale: 1.015 }}
      onClick={() => onViewDetails(car)}
      className="group bako-curved-card rounded-3xl overflow-hidden flex flex-col justify-between h-full cursor-pointer text-white relative"
      id={`car-card-${car.id}`}
    >
      <div>
        {/* Top Image Viewport with Carousel Arrows & Watermark */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#060b19] border-b border-blue-500/20">
          {/* Brand Watermark Overlay */}
          <div className="absolute top-3 right-3 z-20 pointer-events-none select-none text-right">
            <span className="font-serif italic font-extrabold text-[12px] text-black tracking-tight drop-shadow-sm block leading-none">
              BAKO CARS
            </span>
            <span className="font-sans text-[7px] text-black font-extrabold uppercase tracking-[0.2em] block mt-0.5">
              ABUJA
            </span>
          </div>

          {imagesCount > 0 ? (
            <>
              {/* Main Car Photo */}
              <img
                src={getImageUrl(car.images[currentImgIdx] || car.images[0], 480)}
                alt={`${car.make} ${car.model}`}
                loading="lazy"
                decoding="async"
                className="relative z-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  handleImageFallback(e, car.images[currentImgIdx] || car.images[0]);
                }}
              />

              {/* Subtle Bottom Gradient Overlay for Depth */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#060b19] via-transparent to-transparent pointer-events-none z-10" />

              {/* Top Left Curved Pill Badge */}
              <div className="absolute top-3 left-3 z-20 flex items-center space-x-1.5">
                <span className="px-3 py-1 bg-[#060d24]/85 backdrop-blur-md text-blue-200 font-mono text-[9px] font-bold uppercase rounded-full border border-blue-400/30 shadow-lg">
                  PHOTO {currentImgIdx + 1}/{imagesCount}
                </span>
              </div>

              {/* Carousel Navigation Arrows */}
              {imagesCount > 1 && (
                <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                  <button
                    onClick={handlePrevImage}
                    className="p-2 bg-[#060d24]/85 hover:bg-blue-700 text-white rounded-full border border-blue-400/40 transition-all pointer-events-auto shadow-lg cursor-pointer hover:scale-110"
                    title="Previous photo"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="p-2 bg-[#060d24]/85 hover:bg-blue-700 text-white rounded-full border border-blue-400/40 transition-all pointer-events-auto shadow-lg cursor-pointer hover:scale-110"
                    title="Next photo"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Bottom Thumbnail Dots */}
              {imagesCount > 1 && (
                <div className="absolute bottom-2.5 inset-x-0 z-20 flex justify-center items-center space-x-1.5">
                  {car.images.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImgIdx(dotIdx);
                      }}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        dotIdx === currentImgIdx
                          ? 'w-6 bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.9)]'
                          : 'w-1.5 bg-white/40 hover:bg-white/80'
                      }`}
                      title={`Photo ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            /* Showroom Placeholder for vehicles awaiting photography */
            <div className="w-full h-full bg-gradient-to-br from-[#0b1636] via-[#070d20] to-[#040711] flex flex-col items-center justify-center p-6 text-center select-none relative group/ph">
              <div className="w-12 h-12 rounded-2xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center mb-2.5 shadow-[0_0_20px_rgba(29,78,216,0.3)]">
                <CarIcon className="w-6 h-6 text-blue-400" />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-blue-200 font-bold mb-0.5">
                Photoshoot In Progress
              </span>
              <span className="text-[10px] text-neutral-400 font-mono mb-2.5">
                Official Bako Showroom Photos Coming Soon
              </span>
              {onUploadPhotos && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUploadPhotos(car.id);
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-blue-700/30 hover:bg-blue-600/50 border border-blue-400/50 text-blue-300 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <Camera className="w-3.5 h-3.5 text-blue-400" />
                  <span>Upload Photos to Cloud</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 pb-3 space-y-3.5">
          {/* Subtitle Header & Main Title */}
          <div>
            <div className="font-mono text-[10px] uppercase font-bold text-blue-400 tracking-[0.18em] mb-1">
              {car.year ? `${car.year} ` : ''}{car.make}
            </div>
            <h3 className="font-sans text-sm sm:text-[16px] font-black uppercase text-white tracking-wide leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-blue-200 transition-colors">
              {car.model}
            </h3>
          </div>

          {/* Showroom Key Spec Stack in a Curved Inner Pod */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-[11px] font-mono p-3.5 rounded-2xl bg-[#050a18]/90 border border-blue-500/20">
            <div>
              <span className="text-neutral-400 mr-1.5">DUTY:</span>
              <span className="font-bold text-emerald-400">PAID & CLEARED</span>
            </div>
            <div>
              <span className="text-neutral-400 mr-1.5">STOCK #:</span>
              <span className="font-bold text-white">{car.stockNumber || '10230'}</span>
            </div>
            <div>
              <span className="text-neutral-400 mr-1.5">TRANS:</span>
              <span className="font-bold text-neutral-200 uppercase truncate inline-block max-w-[85px] align-bottom" title={car.transmission}>
                {car.transmission?.toUpperCase() || 'AUTOMATIC'}
              </span>
            </div>
            <div>
              <span className="text-neutral-400 mr-1.5">DRIVE:</span>
              <span className="font-bold text-neutral-200 uppercase">{car.drivetrain?.toUpperCase() || 'AWD'}</span>
            </div>
            <div>
              <span className="text-neutral-400 mr-1.5">GALLERY:</span>
              <span className="font-bold text-blue-400 uppercase">
                {imagesCount > 0 ? `${imagesCount} PHOTOS` : 'COMING SOON'}
              </span>
            </div>
            <div>
              <span className="text-neutral-400 mr-1.5">LOC:</span>
              <span className="font-bold text-neutral-200 uppercase truncate inline-block max-w-[85px] align-bottom" title={car.location}>
                {car.location ? car.location.split(',')[0].toUpperCase() : 'ABUJA'}
              </span>
            </div>
          </div>

          {/* Actions Bar: Save, Compare, Multi-Download & Share */}
          <div className="flex items-center justify-between pt-1 gap-1.5 text-[10px] font-mono">
            {onToggleFavorite && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(car.id);
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 border rounded-xl transition-all cursor-pointer ${
                  isFavorite
                    ? 'bg-red-600/25 text-red-300 border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                    : 'bg-[#070f24] text-neutral-300 border-blue-500/25 hover:border-blue-400 hover:text-white'
                }`}
                title={isFavorite ? 'Remove Favourite' : 'Add Favourite'}
              >
                <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                <span className="uppercase text-[9px] font-bold">{isFavorite ? 'SAVED' : 'SAVE'}</span>
              </button>
            )}

            {onToggleCompare && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCompare(car.id);
                }}
                className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider border rounded-xl transition-all cursor-pointer ${
                  isCompared
                    ? 'bg-blue-600 text-white border-blue-400 shadow-[0_0_12px_rgba(37,99,235,0.5)]'
                    : 'bg-[#070f24] text-neutral-300 border-blue-500/25 hover:border-blue-400 hover:text-white'
                }`}
              >
                <span>{isCompared ? '✓ COMPARED' : '+ COMPARE'}</span>
              </button>
            )}

            {/* Multi-Image Download (ZIP) Button on Card */}
            {imagesCount > 0 && (
              <button
                type="button"
                onClick={handleDownloadAllPhotos}
                disabled={isDownloadingAll}
                className="p-2 border rounded-xl bg-[#070f24] text-emerald-400 hover:text-white border-blue-500/25 hover:border-emerald-500/50 transition-all cursor-pointer flex items-center space-x-1"
                title={`Download all ${imagesCount} photos in a ZIP archive`}
              >
                {isDownloadingAll ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <FolderDown className="w-3.5 h-3.5" />
                )}
                {downloadMsg && <span className="text-[8px] font-mono">{downloadMsg}</span>}
              </button>
            )}

            <button
              onClick={handleShare}
              className={`p-2 border rounded-xl transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                  : 'bg-[#070f24] text-neutral-300 border-blue-500/25 hover:border-blue-400 hover:text-white'
              }`}
              title="Share Vehicle"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Pricing & CTA Section */}
      <div className="p-5 sm:p-6 pt-0 mt-1 space-y-3.5">
        {/* Price Display */}
        <div>
          <div className={`font-sans text-xl sm:text-2xl font-black tracking-tight ${!car.price || car.price <= 0 ? 'text-blue-400 drop-shadow-[0_0_12px_rgba(37,99,235,0.55)]' : 'text-white'}`}>
            {formatCurrency(car.price)}
          </div>
          <div className="font-mono text-[9px] text-blue-300/60 font-semibold tracking-wider uppercase mt-0.5">
            + DUTY PAID &bull; VERIFIED ABUJA STOCK
          </div>
        </div>

        {/* CTA: INQUIRE ON WHATSAPP */}
        <div className="pt-1">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full btn-dark-blue text-white font-extrabold uppercase py-3.5 px-4 rounded-2xl text-xs tracking-wider flex items-center justify-center space-x-2 cursor-pointer"
            id={`inquire-wa-btn-${car.id}`}
          >
            <MessageCircle className="w-4 h-4 text-blue-200" />
            <span>INQUIRE ON WHATSAPP</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function CarCardSkeleton() {
  return (
    <div className="bako-curved-card rounded-3xl overflow-hidden h-[460px] flex flex-col justify-between animate-pulse">
      <div>
        <div className="relative aspect-[16/10] w-full bg-[#08122b] border-b border-blue-500/20" />
        <div className="p-5 space-y-3">
          <div className="w-1/3 h-2.5 bg-blue-950/70 rounded-full" />
          <div className="w-3/4 h-5 bg-blue-950/70 rounded-full" />
          <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#050a18] border border-blue-500/15">
            <div className="h-3 bg-blue-950/70 rounded-full" />
            <div className="h-3 bg-blue-950/70 rounded-full" />
            <div className="h-3 bg-blue-950/70 rounded-full" />
            <div className="h-3 bg-blue-950/70 rounded-full" />
          </div>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <div className="w-1/2 h-6 bg-blue-950/70 rounded-full" />
        <div className="w-full h-11 bg-blue-900/50 rounded-2xl" />
      </div>
    </div>
  );
}
