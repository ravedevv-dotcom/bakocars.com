/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const FAQS: FaqItem[] = [
    {
      question: 'WHERE DO YOUR VEHICLES COME FROM',
      answer: 'Our vehicles are hand-selected from trusted networks, premium collectors, and authorized high-end luxury auctions worldwide. Each automobile undergoes a rigorous pedigree authentication and aesthetic verification process before entering our inventory.',
    },
    {
      question: 'DO YOU OFFER FINANCING OPTIONS',
      answer: 'Yes. Bako Cars collaborates with premier luxury automobile financial groups and major tier-1 lenders to deliver personalized competitive rates, flexible terms, and discreet financing options tailored to your profile.',
    },
    {
      question: 'CAN I TRADE IN MY CURRENT VEHICLE',
      answer: 'Absolutely. We provide professional premium valuations on premium exotics and luxury trade-ins. Our appraisal specialists calculate market value swiftly to apply directly to your next acquisition.',
    },
    {
      question: 'DO YOU SHIP VEHICLES NATIONWIDE',
      answer: 'Yes, we provide fully insured, premium enclosed logistics and white-glove flatbed delivery nationwide. Your vehicle arrives in pristine, showroom condition directly to your garage or preferred address.',
    },
    {
      question: 'CAN I REQUEST A CUSTOM BUILD OR MODIFICATION',
      answer: 'Indeed. We specialize in high-end bespoke enhancements through authorized partners—including custom forged carbon body structures, aerodynamic packages, high-fidelity custom interiors, and premium performance exhaust layouts.',
    },
    {
      question: 'ARE YOUR VEHICLES INSPECTED BEFORE SALE',
      answer: 'Every specimen in our showroom passes through our multi-point rigorous technical verification. We audit drivetrain diagnostics, structural health, electrical modules, and premium interior elements to guarantee impeccable quality standards.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#050811] py-16 relative overflow-hidden" id="faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Core FAQ Stacked Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-sans font-black tracking-widest text-2xl sm:text-3xl uppercase leading-tight">
            <span className="text-blue-500 drop-shadow-[0_0_16px_rgba(29,78,216,0.75)] mr-2">FREQUENTLY</span>
            <span className="text-white">ASKED</span>
            <span className="block text-white mt-1">QUESTIONS</span>
          </h2>
          <div className="h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 w-28 mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.8)]" />
        </motion.div>

        {/* CURVED ACCORDION CONTAINER */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={`faq-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                whileHover={{ scale: 1.01 }}
                className={`rounded-2xl overflow-hidden transition-all duration-300 border ${
                  isOpen
                    ? 'bg-gradient-to-r from-[#0b183a] via-[#081129] to-[#060c1d] border-blue-500/70 shadow-[0_12px_35px_rgba(29,78,216,0.35)]'
                    : 'bg-[#081024]/90 border-blue-500/20 hover:border-blue-400/50 shadow-lg'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between text-left focus:outline-none group select-none cursor-pointer"
                >
                  <span className={`font-sans font-extrabold tracking-widest text-[11px] sm:text-[13px] transition-colors uppercase ${
                    isOpen ? 'text-blue-300' : 'text-white/90 group-hover:text-blue-400'
                  }`}>
                    {faq.question}
                  </span>
                  
                  {/* Curved icon trigger */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 ml-4 border ${
                    isOpen
                      ? 'bg-blue-600 border-blue-400 text-white rotate-180 shadow-[0_0_15px_rgba(37,99,235,0.7)]'
                      : 'bg-blue-950/60 border-blue-500/30 text-blue-400 group-hover:bg-blue-700 group-hover:text-white'
                  }`}>
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Animated collapse content block */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 sm:px-8 pb-6 border-t border-blue-500/20 pt-4">
                        <p className="font-mono text-[10px] sm:text-[11px] text-white/75 leading-relaxed tracking-wider uppercase">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
