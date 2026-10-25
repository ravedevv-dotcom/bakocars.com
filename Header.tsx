/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, Car as CarIcon, Heart } from 'lucide-react';
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
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 h-20 flex items-center ${
          scrolled
            ? 'glass border-b border-white/10 shadow-2xl bg-black/90'
            : 'bg-gradient-to-b from-black/85 to-transparent border-b border-white/5'
        }`}
        id="app-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <button
              onClick={() => {
                onNavClick('hero');
                setMobileMenuOpen(false);
              }}
              className="group flex items-baseline gap-1.5 text-left cursor-pointer"
              id="header-logo-btn"
            >
              <span className="text-2xl sm:text-3xl font-black tracking-tighter text-white group-hover:text-blue-500 transition-colors">
                BAKO
              </span>
              <span className="text-xl sm:text-2xl font-light text-white/75 tracking-[0.25em] uppercase">
                CARS
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center space-x-7 lg:space-x-9 text-[11px] uppercase tracking-[0.22em] font-semibold ml-auto mr-8 lg:mr-12"
              id="desktop-nav"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavClick(item.id)}
                    className={`relative transition-colors duration-200 py-1 cursor-pointer flex items-center space-x-1.5 ${
                      isActive ? 'text-white font-extrabold' : 'text-white/55 hover:text-white'
                    }`}
                    id={`nav-link-${item.id}`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="header-active-tab"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-blue-600 rounded-full"
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Desktop Actions Panel */}
            <div className="hidden md:flex items-center space-x-3" id="header-desktop-actions">
              <button
                onClick={() => onNavClick('favourites')}
                className={`px-4 py-2.5 rounded-xl border text-[10px] tracking-[0.2em] uppercase font-bold cursor-pointer transition-all duration-300 flex items-center space-x-1.5 ${
                  activeSection === 'favourites'
                    ? 'bg-red-600 border-red-500 text-white'
                    : 'border-white/15 hover:border-white/40 text-white/90 hover:text-white bg-neutral-950'
                }`}
                id="header-favourites-btn"
                title="View Saved Favourites"
              >
                <Heart className={`w-3.5 h-3.5 ${favoritesCount > 0 ? 'fill-current text-red-500' : ''}`} />
                <span>FAVOURITES {favoritesCount > 0 ? `(${favoritesCount})` : ''}</span>
              </button>

              <button
                onClick={() => onNavClick('contact')}
                className="px-6 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-700 border border-blue-500/40 text-[10px] tracking-[0.2em] uppercase font-extrabold cursor-pointer transition-all duration-300 text-white shadow-lg shadow-blue-900/30"
                id="header-inquiry-btn"
              >
                Inquiry
              </button>
            </div>

            {/* Hamburger Button for Mobile */}
            <div className="flex md:hidden items-center" id="mobile-nav-toggle-container">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 border border-white/15 rounded-xl bg-neutral-950 text-white hover:border-blue-500 focus:outline-none transition-colors"
                id="mobile-menu-btn"
                aria-label="Open Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

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
              transition={{ type: 'tween', duration: 0.28 }}
              className="fixed right-0 top-0 bottom-0 w-[290px] sm:w-[330px] bg-[#0a0a0a] border-l border-white/10 z-50 p-6 flex flex-col justify-between shadow-2xl md:hidden"
              id="mobile-menu-drawer"
            >
              <div className="space-y-8">
                {/* Drawer Header logo & close */}
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black tracking-tighter text-white">BAKO</span>
                    <span className="text-base font-light text-blue-500 tracking-wider">CARS</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl border border-white/10 hover:border-white/30 text-white/60 hover:text-white transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Drawer Links */}
                <nav className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavClick(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`text-left font-sans text-xs sm:text-sm tracking-[0.22em] uppercase py-3 px-4 rounded-xl cursor-pointer transition-colors ${
                        activeSection === item.id
                          ? 'text-white font-extrabold bg-blue-900/40 border border-blue-500/40'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                      id={`mobile-nav-link-${item.id}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Drawer Footer Actions */}
              <div className="space-y-3 pt-6 border-t border-white/10">
                <button
                  onClick={() => {
                    onNavClick('inventory');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between bg-neutral-900 hover:bg-neutral-800 border border-white/10 rounded-xl px-4 py-3.5 text-[9px] font-mono text-white transition-all uppercase tracking-[0.16em]"
                >
                  <div className="flex items-center space-x-2">
                    <CarIcon className="w-4 h-4 text-blue-500" />
                    <span>SHOWROOM INVENTORY</span>
                  </div>
                  <span className="bg-blue-700 text-white rounded-full text-[8px] px-2.5 py-0.5 font-bold">
                    {totalInventoryCount} LIVE
                  </span>
                </button>

                <button
                  onClick={() => {
                    onNavClick('contact');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-blue-800 hover:bg-blue-700 text-white rounded-xl font-sans font-extrabold text-[10px] tracking-[0.2em] uppercase py-3.5 transition-colors text-center"
                >
                  INQUIRE / CALL NOW
                </button>

                <div className="text-center font-mono text-[8px] text-white/30 tracking-widest pt-2 uppercase">
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
