/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, Trash2, Car as CarIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Car } from './types';
import { SHOWROOM_VEHICLES } from './data';
import CarCard from './CarCard';

interface FavoritesSectionProps {
  favoriteCarIds: string[];
  onToggleFavorite: (carId: string) => void;
  onViewDetails: (car: Car) => void;
  onOpenPriceAlert?: (car: Car) => void;
  onExploreInventory: () => void;
}

export default function FavoritesSection({
  favoriteCarIds,
  onToggleFavorite,
  onViewDetails,
  onOpenPriceAlert,
  onExploreInventory,
}: FavoritesSectionProps) {
  const favoriteCars = SHOWROOM_VEHICLES.filter((car) => favoriteCarIds.includes(car.id));

  const handleClearAll = () => {
    favoriteCarIds.forEach((id) => onToggleFavorite(id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10" id="favorites-section-container">
      {/* Page Title & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-blue-500/20 pb-6">
        <div>
          <span className="font-mono text-[10px] text-blue-400 tracking-[0.28em] uppercase font-bold block mb-2">
            PERSONAL GARAGE · {favoriteCars.length} SAVED
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-[0.06em] uppercase">
            SAVED EXOTIC FLEET
          </h2>
          <p className="text-blue-200/60 text-xs sm:text-sm max-w-xl mt-2 leading-relaxed">
            Access and compare your bookmarked Bako Cars vehicles for private showroom inspection in Abuja.
          </p>
        </div>

        {favoriteCars.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center space-x-2 px-5 py-2.5 bg-[#081129] border border-red-500/40 hover:border-red-400 text-red-400 hover:text-white rounded-full font-mono text-[10px] uppercase tracking-widest transition-all cursor-pointer self-start md:self-auto"
            id="clear-all-favorites-btn"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>CLEAR GARAGE</span>
          </button>
        )}
      </div>

      {/* Grid or Empty State */}
      {favoriteCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7" id="favorites-grid">
          {favoriteCars.map((car, index) => (
            <div key={car.id} className="relative group">
              <CarCard
                car={car}
                index={index}
                onViewDetails={onViewDetails}
                isFavorite={true}
                onToggleFavorite={onToggleFavorite}
                onOpenPriceAlert={onOpenPriceAlert}
              />
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 bako-curved-card rounded-3xl space-y-5 max-w-xl mx-auto p-6"
          id="favorites-empty-state"
        >
          <div className="h-16 w-16 bg-blue-950/60 border border-blue-500/40 rounded-2xl flex items-center justify-center mx-auto text-blue-400 shadow-[0_0_25px_rgba(29,78,216,0.4)]">
            <Heart className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold tracking-[0.16em] text-white uppercase">
              YOUR SAVED GARAGE IS EMPTY
            </h3>
            <p className="text-xs font-sans text-blue-200/60 mt-2 max-w-sm mx-auto leading-relaxed">
              Tap the Save button on any vehicle in our showroom inventory to bookmark it for quick comparison.
            </p>
          </div>
          <button
            onClick={onExploreInventory}
            className="btn-dark-blue px-7 py-4 font-display text-xs font-extrabold tracking-[0.18em] uppercase rounded-full cursor-pointer inline-flex items-center space-x-2"
            id="fav-explore-inventory-btn"
          >
            <CarIcon className="w-4 h-4 text-blue-200" />
            <span>EXPLORE SHOWROOM FLEET</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
