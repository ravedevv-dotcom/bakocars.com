/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
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
    <div className="py-12 bg-gradient-to-b from-[#08132e] via-[#060c1f] to-[#050811] border border-blue-500/25 rounded-3xl p-6 sm:p-10 shadow-2xl">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <span className="font-mono text-[10px] text-blue-400 uppercase tracking-[0.28em] font-bold block">
          UNCOMPROMISED PEDIGREE
        </span>
        <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-[0.06em] text-white uppercase">
          THE BAKO INTEGRITY GUARANTEE
        </h3>
        <p className="text-blue-200/60 text-xs sm:text-sm font-sans">
          Every key handover at our Abuja showroom is backed by verified documentation and mechanical excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trustPillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bako-curved-card rounded-2xl p-6 space-y-3.5 group"
            >
              <div className="w-11 h-11 rounded-2xl border border-blue-500/40 flex items-center justify-center bg-blue-950/60 text-blue-400 shadow-[0_0_20px_rgba(29,78,216,0.35)] group-hover:bg-blue-700 group-hover:text-white transition-all">
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="font-display text-sm font-bold tracking-wide text-white uppercase group-hover:text-blue-200 transition-colors">
                {pillar.title}
              </h4>
              <p className="text-xs text-blue-100/65 font-sans leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
