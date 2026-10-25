/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Car, RefreshCw, Globe, Sparkles, MessageCircle, ArrowUpRight } from 'lucide-react';

interface AboutServicesMiniSectionProps {
  onExploreInventory?: () => void;
  onTradeInClick?: () => void;
  onContactClick?: () => void;
}

export default function AboutServicesMiniSection({
  onExploreInventory,
  onTradeInClick,
  onContactClick,
}: AboutServicesMiniSectionProps) {
  const waUrl = "https://wa.me/message/JCOUM7I4Z2XVB1?text=" + encodeURIComponent("Hello Bako Cars, I want to inquire about your vehicle sales, trade-in, 40% discount vehicle importation, or on-stand car wash & detailing services.");

  const services = [
    {
      id: 'sales',
      number: '01',
      title: 'WE SELL PRESTIGE CARS',
      subtitle: 'VERIFIED SHOWROOM FLEET',
      description: 'Handpicked exotic Mercedes-Benz, performance Toyotas, Range Rovers, and luxury sports cars with full paid customs duties and verified titles.',
      icon: Car,
      accent: 'border-blue-500/25 hover:border-blue-400',
      badge: 'DUTY PAID',
      actionText: 'BROWSE INVENTORY',
      onClick: onExploreInventory,
    },
    {
      id: 'trade',
      number: '02',
      title: 'TRADE & VEHICLE UPGRADE',
      subtitle: 'INSTANT FAIR APPRAISALS',
      description: 'Upgrade your current machine with zero hassle. We offer market-leading valuations, transparent vehicle exchanges, and rapid ownership transfer.',
      icon: RefreshCw,
      accent: 'border-blue-500/25 hover:border-blue-400',
      badge: 'SAME-DAY DEAL',
      actionText: 'TRADE-IN INQUIRY',
      onClick: onTradeInClick,
    },
    {
      id: 'import',
      number: '03',
      title: 'DIRECT VEHICLE IMPORTATION',
      subtitle: 'USA • EUROPE • DUBAI • CANADA',
      description: 'Custom vehicle procurement from global auctions and verified premier dealers straight to Abuja with express customs clearance and door-to-door delivery.',
      icon: Globe,
      accent: 'border-blue-500/70 hover:border-blue-400 ring-1 ring-blue-500/30 animate-pulse-blue',
      badge: '🔥 40% OFF IMPORT PROMO',
      badgeClass: 'bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 text-white font-black shadow-[0_0_15px_rgba(37,99,235,0.6)]',
      actionText: 'CLAIM 40% IMPORT DEAL',
      isPromo: true,
      onClick: onContactClick,
    },
    {
      id: 'carwash',
      number: '04',
      title: 'ON-STAND CAR WASH & DETAILING',
      subtitle: 'PRECISION AUTO SPA AT THE GALLERY',
      description: 'Visit our stand behind Tsukunda House for executive hand wash, interior leather rejuvenation, ceramic protection, and showroom mirror-finish detailing.',
      icon: Sparkles,
      accent: 'border-blue-500/25 hover:border-emerald-400',
      badge: 'ON-SITE STAND',
      badgeClass: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      actionText: 'BOOK AUTO DETAILING',
      onClick: onContactClick,
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-[#050811] via-[#071026] to-[#050811] py-16 border-t border-b border-blue-500/20 relative overflow-hidden" id="about-bako-services-mini">
      {/* Background floating dark-blue ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[380px] bg-blue-700/15 blur-[140px] rounded-full pointer-events-none animate-float-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Header Title with Signature Accent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-blue-500/20 pb-6"
        >
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase font-bold text-blue-400 tracking-[0.3em]">
                THE COMPLETE AUTOMOTIVE ECOSYSTEM
              </span>
              <span className="w-10 h-[2px] bg-blue-500 rounded-full" />
            </div>

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mt-1.5">
              <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-wider uppercase">
                WHAT WE DO AT BAKO CARS
              </h2>
              <span className="font-signature text-2xl sm:text-3xl text-blue-400 drop-shadow-[0_0_16px_rgba(37,99,235,0.8)] italic transform -rotate-2 select-none">
                Abuja Premier Hub
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 btn-dark-blue rounded-full text-white font-sans text-[11px] font-bold tracking-widest uppercase px-6 py-3"
            >
              <MessageCircle className="w-4 h-4 text-blue-200" />
              <span>DIRECT DESK CHAT</span>
            </motion.a>
          </div>
        </motion.div>

        {/* 4 Core Pillars Grid with Curved Geometry & Spring Hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -12, scale: 1.02 }}
                className={`relative rounded-3xl border ${service.accent} p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group shadow-[0_18px_40px_rgba(0,0,0,0.75)] ${
                  service.isPromo
                    ? 'bg-gradient-to-b from-[#0f2356] via-[#091534] to-[#060b19]'
                    : 'bg-gradient-to-b from-[#0a1430] via-[#070d20] to-[#050811]'
                }`}
                id={`service-card-${service.id}`}
              >
                <div className="space-y-4">
                  {/* Top Bar: Curved Icon + Number / Promo Pill Badge */}
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-2xl bg-[#050a18] border ${service.isPromo ? 'border-blue-400 text-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.45)]' : 'border-blue-500/30 text-blue-400'} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="text-right">
                      <span className={`font-mono text-[9px] uppercase px-3 py-1 rounded-full tracking-wider inline-block ${
                        service.badgeClass || 'bg-blue-950/70 text-blue-200 border border-blue-500/30'
                      }`}>
                        {service.badge}
                      </span>
                    </div>
                  </div>

                  {/* Main Title and Subtitle */}
                  <div>
                    <span className="font-mono text-[8.5px] text-blue-300/60 tracking-[0.25em] block uppercase">
                      {service.subtitle}
                    </span>
                    <h3 className="font-sans font-black text-base text-white uppercase tracking-wide mt-1 group-hover:text-blue-300 transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="font-mono text-[11px] text-white/65 uppercase tracking-wide leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-5 border-t border-blue-500/20 mt-6">
                  <button
                    onClick={() => {
                      if (service.onClick) {
                        service.onClick();
                      } else {
                        window.open(waUrl, '_blank');
                      }
                    }}
                    className="w-full flex items-center justify-between font-sans text-[10px] font-extrabold tracking-widest text-blue-200/80 group-hover:text-white uppercase transition-colors text-left cursor-pointer"
                  >
                    <span>{service.actionText}</span>
                    <div className="w-7 h-7 rounded-full bg-blue-950/80 border border-blue-500/40 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-400 transition-all">
                      <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-blue-300 group-hover:text-white" />
                    </div>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
