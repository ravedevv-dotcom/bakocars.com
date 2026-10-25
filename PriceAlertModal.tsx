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
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#090909] border border-white/15 w-full max-w-lg p-6 sm:p-8 rounded-2xl shadow-2xl relative"
        id="price-alert-modal-box"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/60 hover:text-white border border-white/10 hover:border-white/30 bg-black rounded-xl transition-all cursor-pointer"
          id="close-price-alert-modal-btn"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
              <div className="p-2.5 bg-blue-950/40 border border-blue-500/35 rounded-xl text-blue-500">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[9px] text-blue-500 uppercase tracking-[0.2em] block font-bold">
                  PRICE NOTIFICATION ALERT
                </span>
                <h3 className="font-sans text-lg font-black text-white uppercase tracking-wider">
                  NOTIFY ME IF PRICE CHANGES
                </h3>
              </div>
            </div>

            <div className="bg-black border border-white/10 p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block">SELECTED VEHICLE</span>
                <span className="font-sans text-xs font-bold text-white uppercase">{car.year} {car.make} {car.model}</span>
                <span className="font-mono text-[9px] text-white/45 block mt-0.5">STOCK NO: {car.stockNumber || 'N/A'}</span>
              </div>
              <span className="bg-blue-800 text-white rounded-md font-mono text-[9px] font-bold px-2.5 py-1 uppercase tracking-widest">
                INQUIRE LISTING
              </span>
            </div>

            <p className="text-white/70 text-xs leading-relaxed uppercase font-mono tracking-wider">
              Enter your details below to receive instant SMS & Email notifications when Bako Cars updates the official market valuation for this vehicle.
            </p>

            <div className="space-y-3.5">
              <div>
                <label htmlFor="alert-name" className="block text-[9px] font-mono text-white/50 uppercase tracking-[0.2em] mb-1">
                  FULL NAME
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-white/35 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    id="alert-name"
                    type="text"
                    required
                    placeholder="Your Full Name"
                    className="block w-full pl-10 pr-4 py-2.5 bg-black border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="alert-email" className="block text-[9px] font-mono text-white/50 uppercase tracking-[0.2em] mb-1">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-white/35 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    id="alert-email"
                    type="email"
                    required
                    placeholder="yourname@example.com"
                    className="block w-full pl-10 pr-4 py-2.5 bg-black border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="alert-phone" className="block text-[9px] font-mono text-white/50 uppercase tracking-[0.2em] mb-1">
                  PHONE NUMBER
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-white/35 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    id="alert-phone"
                    type="tel"
                    required
                    placeholder="e.g. 0816 733 2017"
                    className="block w-full pl-10 pr-4 py-2.5 bg-black border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-800 hover:bg-blue-700 text-white font-sans text-xs font-bold tracking-[0.2em] py-4 rounded-xl transition-all cursor-pointer uppercase flex items-center justify-center space-x-2"
              id="subscribe-price-alert-submit-btn"
            >
              <Bell className="w-4 h-4 text-white" />
              <span>ACTIVATE PRICE ALERT</span>
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 bg-blue-950/40 border border-blue-500/40 rounded-xl flex items-center justify-center mx-auto text-blue-500">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-sans text-sm font-bold tracking-[0.2em] uppercase text-white">PRICE ALERT ACTIVATED!</h3>
              <p className="text-[9px] font-mono text-blue-400 tracking-widest mt-1 uppercase">
                SUBSCRIPTION STORED FOR {car.make} {car.model}
              </p>
            </div>
            <p className="text-white/65 text-xs leading-relaxed max-w-sm mx-auto font-mono">
              Thank you, <span className="font-bold text-white">{name}</span>. We will automatically alert your email (<span className="text-white font-bold">{email}</span>) and phone (<span className="text-white font-bold">{phone}</span>) as soon as Bako Cars updates the pricing for this vehicle.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-blue-800 hover:bg-blue-700 text-white text-[10px] font-mono rounded-xl tracking-widest transition-colors cursor-pointer uppercase"
            >
              DONE / CLOSE
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
