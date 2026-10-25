/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, Car as CarIcon, Heart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onNavClick: (section: string) => void;
  activeSection: string;
  totalInventoryCount: number;
  favoritesCount?: number;
}

export default function Header({
  onNavClick,
  activeSection,
  totalInventoryCount,
  favoritesCount = 0,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'favourites', label: 'Favourites', count: favoritesCount },
    { id: 'concierge', label: 'Why Bako' },
    { id: 'contact', label: 'Visit Showroom' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 h-20 flex items-center ${
          scrolled
            ? 'glass border-b border-blue-500/25 shadow-[0_10px_40px_rgba(10,25,65,0.75)] backdrop-blur-xl bg-[#050a18]/85'
            : 'bg-gradient-to-b from-black/80 to-transparent border-b border-white/5'
        }`}
        id="app-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between w-full">
            {/* Logo with interactive hover scale */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                onNavClick('hero');
                setMobileMenuOpen(false);
              }}
              className="group flex items-baseline gap-1.5 text-left cursor-pointer"
              id="header-logo-btn"
            >
              <span className="text-2xl sm:text-3xl font-black tracking-tighter text-white group-hover:text-blue-400 transition-colors">
                BAKO
              </span>
              <span className="text-xl sm:text-2xl font-light text-blue-400/90 tracking-[0.25em] uppercase drop-shadow-[0_0_12px_rgba(37,99,235,0.5)]">
                CARS
              </span>
            </motion.button>

            {/* Desktop Navigation Pill Bar */}
            <nav
              className="hidden md:flex items-center space-x-2 lg:space-x-3 text-[11px] uppercase tracking-[0.2em] font-semibold ml-auto mr-6 lg:mr-10 bg-[#070e22]/80 border border-blue-500/25 px-3 py-1.5 rounded-full backdrop-blur-md shadow-[0_0_25px_rgba(29,78,216,0.2)]"
              id="desktop-nav"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => onNavClick(item.id)}
                    className={`relative transition-all duration-300 px-4 py-2 rounded-full cursor-pointer flex items-center space-x-1.5 ${
                      isActive
                        ? 'text-white font-extrabold bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.6)] border border-blue-400/50'
                        : 'text-white/65 hover:text-white hover:bg-blue-950/50'
                    }`}
                    id={`nav-link-${item.id}`}
                  >
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Desktop Actions Panel */}
            <div className="hidden md:flex items-center space-x-3" id="header-desktop-actions">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onNavClick('favourites')}
                className={`px-4 py-2.5 rounded-full border text-[10px] tracking-[0.2em] uppercase font-bold cursor-pointer transition-all duration-300 flex items-center space-x-1.5 ${
                  activeSection === 'favourites'
                    ? 'bg-red-600 border-red-400 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)]'
                    : 'border-blue-500/30 hover:border-blue-400 text-white/90 hover:text-white bg-[#081129]/80 shadow-md'
                }`}
                id="header-favourites-btn"
                title="View Saved Favourites"
              >
                <Heart className={`w-3.5 h-3.5 ${favoritesCount > 0 ? 'fill-current text-red-500 animate-pulse' : 'text-blue-400'}`} />
                <span>FAVOURITES {favoritesCount > 0 ? `(${favoritesCount})` : ''}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onNavClick('contact')}
                className="btn-dark-blue px-6 py-2.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-extrabold cursor-pointer text-white flex items-center space-x-1.5"
                id="header-inquiry-btn"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                <span>Inquiry</span>
              </motion.button>
            </div>

            {/* Hamburger Button for Mobile */}
            <div className="flex md:hidden items-center" id="mobile-nav-toggle-container">
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 border border-blue-500/40 rounded-2xl bg-[#08122b] text-white hover:border-blue-400 shadow-[0_0_15px_rgba(29,78,216,0.35)] focus:outline-none transition-all"
                id="mobile-menu-btn"
                aria-label="Open Menu"
              >
                <Menu className="w-5 h-5 text-blue-400" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Slide-out Hamburger Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 md:hidden"
              id="mobile-menu-backdrop"
            />

            {/* Sidebar Drawer Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 24, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-[290px] sm:w-[330px] bg-gradient-to-b from-[#08122c] via-[#060c1d] to-[#040711] border-l border-blue-500/30 rounded-l-3xl z-50 p-6 flex flex-col justify-between shadow-[0_0_50px_rgba(29,78,216,0.4)] md:hidden"
              id="mobile-menu-drawer"
            >
              <div className="space-y-8">
                {/* Drawer Header logo & close */}
                <div className="flex items-center justify-between pb-5 border-b border-blue-500/20">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black tracking-tighter text-white">BAKO</span>
                    <span className="text-base font-light text-blue-400 tracking-wider">CARS</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl border border-blue-500/30 bg-blue-950/40 hover:border-blue-400 text-white/70 hover:text-white transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Drawer Links */}
                <nav className="flex flex-col space-y-3">
                  {navItems.map((item, idx) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      onClick={() => {
                        onNavClick(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`text-left font-sans text-xs sm:text-sm tracking-[0.22em] uppercase py-3 px-4 rounded-2xl cursor-pointer transition-all ${
                        activeSection === item.id
                          ? 'text-white font-extrabold bg-gradient-to-r from-blue-800 to-blue-600 border border-blue-400/50 shadow-[0_0_20px_rgba(29,78,216,0.5)]'
                          : 'text-white/65 hover:text-white hover:bg-blue-950/40'
                      }`}
                      id={`mobile-nav-link-${item.id}`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>
              </div>

              {/* Drawer Footer Actions */}
              <div className="space-y-3 pt-6 border-t border-blue-500/20">
                <button
                  onClick={() => {
                    onNavClick('inventory');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between bg-blue-950/40 hover:bg-blue-900/50 border border-blue-500/30 rounded-2xl px-4 py-3.5 text-[9px] font-mono text-white transition-all uppercase tracking-[0.16em]"
                >
                  <div className="flex items-center space-x-2">
                    <CarIcon className="w-4 h-4 text-blue-400" />
                    <span>SHOWROOM INVENTORY</span>
                  </div>
                  <span className="bg-blue-600 text-white rounded-full text-[8px] px-2.5 py-0.5 font-bold shadow">
                    {totalInventoryCount} LIVE
                  </span>
                </button>

                <button
                  onClick={() => {
                    onNavClick('contact');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full btn-dark-blue rounded-2xl font-sans font-extrabold text-[10px] tracking-[0.2em] uppercase py-3.5 text-center"
                >
                  INQUIRE / CALL NOW
                </button>

                <div className="text-center font-mono text-[8px] text-blue-300/40 tracking-widest pt-2 uppercase">
                  ABUJA, NIGERIA • SINCE 2020
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
