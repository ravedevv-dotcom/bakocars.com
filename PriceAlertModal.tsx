/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FormEvent } from 'react';
import { X, Bell, CheckCircle2, Mail, Phone, User } from 'lucide-react';
import { motion } from 'motion/react';
import { Car } from './types';

interface PriceAlertModalProps {
  car: Car | null;
  onClose: () => void;
}

export default function PriceAlertModal({ car, onClose }: PriceAlertModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!car) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
      id="price-alert-modal-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bako-curved-card w-full max-w-lg p-6 sm:p-8 rounded-3xl shadow-2xl relative glow"
        id="price-alert-modal-box"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 text-white/60 hover:text-white border border-blue-500/30 hover:border-blue-400 bg-[#060d24] rounded-xl transition-all cursor-pointer"
          id="close-price-alert-modal-btn"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center space-x-3 pb-4 border-b border-blue-500/20">
              <div className="p-3 bg-blue-950/60 border border-blue-500/40 rounded-2xl text-blue-400">
                <Bell className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <span className="font-mono text-[9px] text-blue-400 uppercase tracking-[0.2em] block font-bold">
                  PRICE NOTIFICATION ALERT
                </span>
                <h3 className="font-sans text-lg font-black text-white uppercase tracking-wider">
                  NOTIFY ME IF PRICE CHANGES
                </h3>
              </div>
            </div>

            {/* Vehicle Summary box */}
            <div className="bg-[#050a18] border border-blue-500/25 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-mono text-[9px] text-blue-300/50 uppercase tracking-widest block">SELECTED VEHICLE</span>
                <span className="font-sans text-xs font-bold text-white uppercase">{car.year} {car.make} {car.model}</span>
                <span className="font-mono text-[9px] text-white/50 block mt-0.5">STOCK NO: {car.stockNumber || 'N/A'}</span>
              </div>
              <span className="bg-blue-700 text-white rounded-full font-mono text-[9px] font-bold px-3 py-1 uppercase tracking-widest shadow">
                INQUIRE LISTING
              </span>
            </div>

            <p className="text-white/75 text-xs leading-relaxed uppercase font-mono tracking-wider">
              Enter your details below to receive instant SMS & Email notifications when Bako Cars updates the official market valuation for this vehicle.
            </p>

            <div className="space-y-3.5">
              <div>
                <label htmlFor="alert-name" className="block text-[9px] font-mono text-blue-200/60 uppercase tracking-[0.2em] mb-1">
                  FULL NAME
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-blue-400/60 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    id="alert-name"
                    type="text"
                    required
                    placeholder="Your Full Name"
                    className="block w-full pl-10 pr-4 py-2.5 bg-[#081129] border border-blue-500/30 rounded-xl text-xs text-white focus:outline-none focus:border-blue-400"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="alert-email" className="block text-[9px] font-mono text-blue-200/60 uppercase tracking-[0.2em] mb-1">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-blue-400/60 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    id="alert-email"
                    type="email"
                    required
                    placeholder="yourname@example.com"
                    className="block w-full pl-10 pr-4 py-2.5 bg-[#081129] border border-blue-500/30 rounded-xl text-xs text-white focus:outline-none focus:border-blue-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="alert-phone" className="block text-[9px] font-mono text-blue-200/60 uppercase tracking-[0.2em] mb-1">
                  PHONE NUMBER
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-blue-400/60 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    id="alert-phone"
                    type="tel"
                    required
                    placeholder="e.g. 0816 733 2017"
                    className="block w-full pl-10 pr-4 py-2.5 bg-[#081129] border border-blue-500/30 rounded-xl text-xs text-white focus:outline-none focus:border-blue-400"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-dark-blue text-white font-sans text-xs font-bold tracking-[0.2em] py-4 rounded-2xl cursor-pointer uppercase flex items-center justify-center space-x-2"
              id="subscribe-price-alert-submit-btn"
            >
              <Bell className="w-4 h-4 text-blue-200" />
              <span>ACTIVATE PRICE ALERT</span>
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-blue-950/60 border border-blue-500/40 rounded-2xl flex items-center justify-center mx-auto text-blue-400">
              <CheckCircle2 className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h3 className="font-sans text-sm font-bold tracking-[0.2em] uppercase text-white">PRICE ALERT ACTIVATED!</h3>
              <p className="text-[9px] font-mono text-blue-400 tracking-widest mt-1 uppercase">
                SUBSCRIPTION STORED FOR {car.make} {car.model}
              </p>
            </div>
            <p className="text-white/70 text-xs leading-relaxed max-w-sm mx-auto font-mono">
              Thank you, <span className="font-bold text-white">{name}</span>. We will automatically alert your email (<span className="text-white font-bold">{email}</span>) and phone (<span className="text-white font-bold">{phone}</span>) as soon as Bako Cars updates the pricing for this vehicle.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 btn-dark-blue text-white text-[10px] font-mono rounded-full tracking-widest cursor-pointer uppercase"
            >
              DONE / CLOSE
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
