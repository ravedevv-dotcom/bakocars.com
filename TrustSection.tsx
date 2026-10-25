/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Award, FileCheck, Truck, Headphones, Lock } from 'lucide-react';

export default function TrustSection() {
  const trustPillars = [
    {
      icon: ShieldCheck,
      title: '01. 150-Point Technical Audit',
      description:
        'Every vehicle undergoes rigorous mechanical, electronic, and structural verification by certified luxury automotive specialists.',
    },
    {
      icon: FileCheck,
      title: '02. Full Customs Duty Paid',
      description:
        'Authenticated Nigeria Customs duty certificates, mileage verification, and original title documentation provided with every acquisition.',
    },
    {
      icon: Award,
      title: '03. 40% Off Direct Import Promo',
      description:
        'Source bespoke specs directly from global auctions in the USA, Europe, Canada, and Dubai with 40% off procurement & handling.',
    },
    {
      icon: Truck,
      title: '04. Nationwide Enclosed Delivery',
      description:
        'White-glove flatbed transport directly from our Abuja showroom behind Tsukunda House to any state in Nigeria.',
    },
    {
      icon: Headphones,
      title: '05. Precision Auto Spa Stand',
      description:
        'On-site executive car wash, ceramic protection, and interior leather restoration located right at our Abuja showroom.',
    },
    {
      icon: Lock,
      title: '06. Same-Day Trade-In Equity',
      description:
        'Transparent market appraisals allowing you to roll your current vehicle equity seamlessly into your next luxury machine.',
    },
  ];

  return (
    <div className="py-12 bg-[#090909] border border-white/10 rounded-2xl p-6 sm:p-10">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <span className="font-mono text-[10px] text-blue-500 uppercase tracking-[0.28em] font-bold block">
          UNCOMPROMISED PEDIGREE
        </span>
        <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-[0.06em] text-white uppercase">
          THE BAKO INTEGRITY GUARANTEE
        </h3>
        <p className="text-white/55 text-xs sm:text-sm font-sans">
          Every key handover at our Abuja showroom is backed by verified documentation and mechanical excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trustPillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="bg-black border border-white/10 hover:border-blue-600/50 rounded-xl p-6 space-y-3 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-lg border border-blue-500/35 flex items-center justify-center bg-blue-950/30 text-blue-500">
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="font-display text-sm font-bold tracking-wide text-white uppercase">
                {pillar.title}
              </h4>
              <p className="text-xs text-white/60 font-sans leading-relaxed">
                {pillar.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
