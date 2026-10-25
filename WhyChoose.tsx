import React from 'react';
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="border border-white/10 rounded-2xl p-6 sm:p-8 bg-zinc-950" id="why-bako-grid">
        <div className="mb-6 pb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-500 font-bold block">
              THE BAKO ADVANTAGE
            </span>
            <h3 className="font-sans text-lg sm:text-xl font-black uppercase text-white tracking-wider">
              WHY CLIENTS CHOOSE BAKO CARS
            </h3>
          </div>
          <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
            ABUJA PRESTIGE AUTOMOTIVE
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="space-y-3 bg-[#0a0a0a] border border-white/10 hover:border-blue-600/50 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-9 h-9 rounded-lg border border-blue-500/35 flex items-center justify-center text-blue-500 bg-blue-950/30">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[8px] text-blue-500 uppercase tracking-widest font-semibold block">
                    {reason.subtitle}
                  </span>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-white mt-0.5">
                    {reason.title}
                  </h4>
                </div>
                <p className="font-mono text-[11px] text-white/60 uppercase tracking-wider leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
