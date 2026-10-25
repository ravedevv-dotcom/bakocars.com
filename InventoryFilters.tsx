/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, RotateCcw, ArrowRight } from 'lucide-react';
import { FilterState } from './types';

interface InventoryFiltersProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  minInventoryPrice: number;
  maxInventoryPrice: number;
  resultsCount: number;
}

const MAX_BUDGET_CEILING = 500000000;

const QUICK_TAGS = [
  'All',
  'Mercedes',
  'Range Rover',
  'Lexus',
  'Toyota',
  'AMG',
  'G63',
  'GLE',
  'C300',
  'ML350',
  'Corolla',
];

export default function InventoryFilters({
  filters,
  setFilters,
  minInventoryPrice,
  resultsCount,
}: InventoryFiltersProps) {
  const [, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bako_recent_searches');
      return saved ? JSON.parse(saved) : ['Mercedes', 'GLE 450', 'AMG'];
    } catch {
      return ['Mercedes', 'GLE 450', 'AMG'];
    }
  });

  const scrollToResults = () => {
    setTimeout(() => {
      const target =
        document.getElementById('inventory-grid') ||
        document.getElementById('inventory-filters-container');
      if (target) {
        const yOffset = -100;
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 80);
  };

  const addRecentSearchAndTrigger = (query: string) => {
    const trimmed = query.trim();
    if (trimmed) {
      setRecentSearches((prev) => {
        const filtered = prev.filter((q) => q.toLowerCase() !== trimmed.toLowerCase());
        const updated = [trimmed, ...filtered].slice(0, 4);
        try {
          localStorage.setItem('bako_recent_searches', JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
        return updated;
      });
    }
    scrollToResults();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRecentSearchAndTrigger(filters.search);
  };

  const handleReset = () => {
    setFilters({
      search: '',
      make: 'All',
      bodyType: 'All',
      transmission: 'All',
      minPrice: minInventoryPrice,
      maxPrice: MAX_BUDGET_CEILING,
      minYear: 2010,
      sortBy: 'price-desc',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bako-curved-card rounded-3xl p-6 sm:p-8 mb-10 shadow-2xl"
      id="inventory-filters-container"
    >
      <form onSubmit={handleSearchSubmit} className="space-y-5">
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <div className="relative flex-1">
            <label htmlFor="inventory-search-input" className="sr-only">
              Search Showroom Fleet
            </label>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-blue-400" />
            </div>
            <input
              id="inventory-search-input"
              type="text"
              className="block w-full pl-12 pr-4 py-4 bg-[#050a18] border border-blue-500/30 rounded-2xl text-sm sm:text-base text-white placeholder-blue-200/40 transition-all focus:border-blue-400 focus:shadow-[0_0_20px_rgba(37,99,235,0.3)] focus:outline-none font-sans"
              placeholder="Search model, make, trim or spec (e.g., G63, Range Rover, ML350, C300, Corolla)..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addRecentSearchAndTrigger(filters.search);
                }
              }}
            />
          </div>

          <button
            type="submit"
            className="btn-dark-blue px-8 py-4 font-display text-xs font-extrabold tracking-[0.2em] uppercase rounded-2xl cursor-pointer flex items-center justify-center space-x-2 shrink-0"
            id="search-action-btn"
          >
            <span>SEARCH FLEET</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Curved Pill Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div className="flex flex-wrap items-center gap-2" id="quick-search-tags">
            {QUICK_TAGS.map((tag) => {
              const isAll = tag === 'All';
              const isSelected = isAll
                ? filters.search === ''
                : filters.search.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    const nextQuery = isAll ? '' : tag;
                    setFilters({ ...filters, search: nextQuery });
                    if (nextQuery) addRecentSearchAndTrigger(nextQuery);
                  }}
                  className={`px-4 py-1.5 text-[10px] font-mono font-bold transition-all cursor-pointer rounded-full uppercase tracking-wider border whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 text-white border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.6)] scale-105'
                      : 'bg-[#050a18] hover:border-blue-400/60 border-blue-500/25 text-blue-200/70 hover:text-white'
                  }`}
                  id={`quick-tag-${tag}`}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-[10px] font-mono uppercase text-blue-300/60 tracking-wider">
              SORT:
            </span>
            <select
              id="inventory-sort-select"
              className="bg-[#050a18] border border-blue-500/30 rounded-xl px-3.5 py-2 text-[10px] font-mono text-white uppercase tracking-wider cursor-pointer focus:border-blue-400 focus:outline-none"
              value={filters.sortBy}
              onChange={(e) => {
                setFilters({ ...filters, sortBy: e.target.value as FilterState['sortBy'] });
              }}
            >
              <option value="price-desc">PRICE: HIGH TO LOW</option>
              <option value="price-asc">PRICE: LOW TO HIGH</option>
              <option value="year-desc">YEAR: NEWEST FIRST</option>
            </select>
          </div>
        </div>
      </form>

      {/* Results Bar & Clear Control */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 mt-4 border-t border-blue-500/20 gap-3">
        <div className="font-mono text-xs text-blue-200/70 tracking-wider uppercase">
          SHOWING <span className="text-blue-400 font-bold tabular-nums">{resultsCount}</span> DUTY-PAID VEHICLES IN ABUJA SHOWROOM
        </div>

        {filters.search && (
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center space-x-1.5 text-xs font-mono text-blue-400 hover:text-white transition-colors cursor-pointer tracking-wider uppercase"
            id="filters-reset-btn"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>CLEAR FILTER ({filters.search})</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}
