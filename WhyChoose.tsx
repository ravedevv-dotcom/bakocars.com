import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, RefreshCw, Globe, Car } from 'lucide-react';

export default function WhyChoose() {
  const reasons = [
    {
      icon: Car,
      title: '1. Verified Prestige Vehicle Sales',
      subtitle: 'DUTY PAID & AUTHENTICATED',
      description: 'We curate ultra-clean, low-mileage luxury SUVs, sports sedans, and trucks with 100% verified customs papers and clean titles.'
    },
    {
      icon: RefreshCw,
      title: '2. Transparent Trade-In & Upgrades',
      subtitle: 'INSTANT DEAL APPRAISALS',
      description: 'Trade your current vehicle with seamless equity rollover, rapid valuation checks, and same-day documentation.'
    },
    {
      icon: Globe,
      title: '3. Global Importation (40% Off Promo)',
      subtitle: 'USA • DUBAI • EUROPE DIRECT',
      description: 'Direct vehicle imports from international auctions and premier dealers now available with an exclusive 40% discount promo.'
    },
    {
      icon: Sparkles,
      title: '4. Showroom Car Wash & Detailing Stand',
      subtitle: 'PRECISION AUTO SPA IN ABUJA',
      description: 'Full-service car wash, leather conditioning, ceramic coating, and paint restoration right at our showroom stand behind Tsukunda House.'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        className="border border-blue-500/25 rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#08132e] via-[#060c1f] to-[#050811] shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(29,78,216,0.2)]"
        id="why-bako-grid"
      >
        <div className="mb-8 pb-5 border-b border-blue-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.3em] text-blue-400 font-bold block mb-1">
              THE BAKO ADVANTAGE
            </span>
            <h3 className="font-sans text-xl sm:text-2xl font-black uppercase text-white tracking-wider">
              WHY CLIENTS CHOOSE BAKO CARS
            </h3>
          </div>
          <div className="font-mono text-[10px] text-blue-300/50 uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-blue-950/50 border border-blue-500/25 self-start sm:self-auto">
            ABUJA PRESTIGE AUTOMOTIVE
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="space-y-3.5 bako-curved-card rounded-2xl p-6 group"
              >
                <div className="w-11 h-11 rounded-2xl border border-blue-500/40 flex items-center justify-center text-blue-400 bg-blue-950/60 shadow-[0_0_20px_rgba(29,78,216,0.35)] group-hover:bg-blue-700 group-hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[8.5px] text-blue-400 uppercase tracking-widest font-bold block">
                    {reason.subtitle}
                  </span>
                  <h4 className="font-sans text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white mt-1 group-hover:text-blue-200 transition-colors">
                    {reason.title}
                  </h4>
                </div>
                <p className="font-mono text-[11px] text-white/60 uppercase tracking-wider leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
