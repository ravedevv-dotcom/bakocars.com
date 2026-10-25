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
    <section className="w-full bg-black py-14" id="faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Core FAQ Stacked Heading */}
        <div className="text-center mb-10">
          <h2 className="font-sans font-black tracking-widest text-2xl sm:text-3xl uppercase leading-tight">
            <span className="text-blue-500 mr-2">FREQUENTLY</span>
            <span className="text-white">ASKED</span>
            <span className="block text-white mt-1">QUESTIONS</span>
          </h2>
          <div className="h-[3px] bg-blue-700 w-24 mx-auto mt-3.5 rounded-full" />
        </div>

        {/* ACCORDION CONTAINER */}
        <div className="border-t border-white/10">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={`faq-${idx}`}
                className="border-b border-white/10 overflow-hidden transition-colors hover:bg-neutral-950/70"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-5 px-4 flex items-center justify-between text-left focus:outline-none group select-none cursor-pointer"
                >
                  <span className={`font-sans font-extrabold tracking-widest text-[11px] sm:text-[13px] transition-colors uppercase ${
                    isOpen ? 'text-blue-400' : 'text-white/90 group-hover:text-blue-400'
                  }`}>
                    {faq.question}
                  </span>
                  
                  <div className="text-white/40 group-hover:text-blue-400 transition-colors shrink-0 ml-4">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-blue-500" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-4 pb-6 border-t border-white/[0.04] pt-4 bg-[#070707]">
                        <p className="font-mono text-[10px] sm:text-[11px] text-white/70 leading-relaxed tracking-wider uppercase">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
