/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle2, Compass, MessageCircle, Instagram } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userMsg, setUserMsg] = useState('');

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !userMsg) return;

    const mailSubject = encodeURIComponent(`Showroom Message from ${name}`);
    const mailBody = encodeURIComponent(`Full Name: ${name}\nEmail: ${email}\nMobile Number: ${phone}\n\nMessage / Intent:\n${userMsg}`);
    
    window.location.href = `mailto:bakocarsltd@yahoo.com?subject=${mailSubject}&body=${mailBody}`;

    setFormSubmitted(true);
  };

  const locations = [
    {
      title: 'BAKO CARS ABUJA SHOWROOM',
      address: '2FWF+FH2, behind Tsukunda House, Abuja 900103, Nigeria',
      coords: '9.0765° N, 7.4983° E',
      tel: '07058099349 | 08167332017',
      email: 'bakocarsltd@yahoo.com'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bako-curved-card rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl glow"
      id="contact-section-container"
    >
      <div className="text-center md:text-left mb-8 border-b border-blue-500/20 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="w-12 h-12 rounded-2xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center mb-3 mx-auto md:mx-0 shadow-[0_0_20px_rgba(29,78,216,0.4)]">
            <MapPin className="w-6 h-6 text-blue-400 animate-bounce" />
          </div>
          <h2 className="font-sans text-xl sm:text-3xl font-black text-white tracking-[0.2em] uppercase">VISIT OUR SHOWROOM</h2>
          <p className="text-xs font-mono text-blue-300/60 mt-1 tracking-widest uppercase">LOCATED BEHIND TSUKUNDA HOUSE, ABUJA, NIGERIA • EST. 2020</p>
        </div>

        {/* Quick Social & Direct Chat Action Pill Buttons */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 shrink-0">
          <a
            href="https://wa.me/message/JCOUM7I4Z2XVB1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 btn-dark-blue rounded-full text-white font-mono text-[10px] font-bold uppercase tracking-wider px-5 py-2.5"
            id="chat-whatsapp-contact-btn"
          >
            <MessageCircle className="w-3.5 h-3.5 text-blue-200" />
            <span>CHAT ON WHATSAPP</span>
          </a>
          <a
            href="https://www.instagram.com/bakocars_/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-600 border border-blue-400/40 rounded-full text-white font-mono text-[10px] font-bold uppercase tracking-wider px-5 py-2.5 transition-all shadow-lg hover:scale-105"
            id="dm-instagram-contact-btn"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>CHAT ON INSTAGRAM</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT PANEL: Details & Map representation */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-4">
            {locations.map((loc, idx) => (
              <div key={idx} className="space-y-3.5 bg-[#050a18]/90 border border-blue-500/25 p-6 rounded-2xl shadow-lg">
                <h3 className="font-sans text-xs font-bold tracking-[0.2em] text-blue-300 uppercase">{loc.title}</h3>
                
                <div className="space-y-2.5 text-xs text-white/80">
                  <p className="flex items-start space-x-2.5">
                    <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>{loc.address}</span>
                  </p>
                  <p className="flex items-center space-x-2.5 pl-6 font-mono text-[9px] text-blue-300/50 tracking-widest uppercase">
                    <span>COORDINATES: {loc.coords}</span>
                  </p>
                  <p className="flex items-center space-x-2.5">
                    <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span className="font-mono text-white">{loc.tel}</span>
                  </p>
                  <p className="flex items-center space-x-2.5">
                    <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <a href={`mailto:${loc.email}`} className="hover:text-white transition-colors text-blue-400 font-mono">{loc.email}</a>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dealership Hours */}
          <div className="bg-[#050a18]/90 border border-blue-500/25 p-6 rounded-2xl space-y-3 shadow-lg">
            <h3 className="font-sans text-xs font-bold tracking-[0.2em] text-white uppercase flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>SHOWROOM SCHEDULE</span>
            </h3>

            <div className="space-y-2 font-mono text-[10px] text-white/70 tracking-wider">
              <div className="flex justify-between border-b border-blue-500/15 pb-1.5 uppercase">
                <span>MON - SAT:</span>
                <span className="text-white font-medium">9:00 AM - 7:00 PM</span>
              </div>
              <div className="flex justify-between text-white uppercase">
                <span>SUNDAY Showroom</span>
                <span className="font-bold text-blue-400">APPOINTMENT ONLY</span>
              </div>
            </div>
          </div>

          {/* Map Mockup representation */}
          <div className="relative h-44 rounded-2xl bg-[#050a18] border border-blue-500/25 overflow-hidden flex flex-col justify-end p-4 group shadow-lg">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="h-7 w-7 rounded-full bg-blue-500/30 border border-blue-400 flex items-center justify-center animate-ping" />
              <div className="h-3.5 w-3.5 bg-blue-500 rounded-full border border-white absolute top-1.5 shadow-[0_0_12px_rgba(59,130,246,0.9)]" />
            </div>
            
            <div className="relative z-10 bg-[#060d24]/90 backdrop-blur-md border border-blue-500/30 p-3.5 rounded-xl flex items-center justify-between">
              <div>
                <span className="block text-[8px] font-mono text-blue-300/60 uppercase tracking-widest">ABUJA HQ</span>
                <span className="block font-sans text-[10px] font-bold text-white tracking-[0.2em] uppercase">BEHIND TSUKUNDA HOUSE</span>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Tsukunda%20House,%20Abuja,%20Nigeria"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 text-[9px] font-mono text-white btn-dark-blue px-3.5 py-2 rounded-full transition-all"
              >
                <Compass className="w-3 h-3 animate-spin duration-[10000ms]" />
                <span>OPEN DIRECTIONS</span>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Universal Contact Intake form */}
        <div className="lg:col-span-7 bg-[#050a18]/90 border border-blue-500/25 rounded-2xl p-6 sm:p-8 shadow-xl">
          {!formSubmitted ? (
            <form onSubmit={handleInquirySubmit} className="space-y-4" id="universal-contact-form">
              <div className="pb-3 border-b border-blue-500/20">
                <h3 className="font-sans text-sm font-bold tracking-[0.2em] uppercase text-white">DIRECT SHOWROOM MESSAGE</h3>
                <p className="text-[10px] font-mono text-blue-300/50 tracking-wider mt-0.5 uppercase">SEND YOUR MESSAGE DIRECTLY TO BAKOCARSLTD@YAHOO.COM</p>
              </div>

              <div>
                <label htmlFor="contact-fullname" className="block text-[9px] font-mono text-blue-200/60 uppercase tracking-[0.2em] mb-1.5">FULL NAME</label>
                <input
                  id="contact-fullname"
                  type="text"
                  required
                  placeholder="Your Full Name"
                  className="block w-full px-4 py-3 bg-[#081129] border border-blue-500/30 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-blue-400 transition-colors"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-email" className="block text-[9px] font-mono text-blue-200/60 uppercase tracking-[0.2em] mb-1.5">YOUR EMAIL ADDRESS</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="yourname@example.com"
                    className="block w-full px-4 py-3 bg-[#081129] border border-blue-500/30 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-blue-400 transition-colors"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-[9px] font-mono text-blue-200/60 uppercase tracking-[0.2em] mb-1.5">MOBILE NUMBER</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    placeholder="e.g. 0816 733 2017"
                    className="block w-full px-4 py-3 bg-[#081129] border border-blue-500/30 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-blue-400 transition-colors"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-user-message" className="block text-[9px] font-mono text-blue-200/60 uppercase tracking-[0.2em] mb-1.5">YOUR MESSAGE / INQUIRY</label>
                <textarea
                  id="contact-user-message"
                  required
                  rows={4}
                  placeholder="Type your vehicle inquiry, trade-in info, or scheduling request here..."
                  className="block w-full px-4 py-3 bg-[#081129] border border-blue-500/30 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-blue-400 transition-colors"
                  value={userMsg}
                  onChange={(e) => setUserMsg(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full btn-dark-blue text-white font-sans text-xs font-extrabold tracking-[0.2em] py-4 rounded-2xl cursor-pointer uppercase flex items-center justify-center space-x-2"
                id="contact-form-submit-btn"
              >
                <Mail className="w-4 h-4 text-blue-200" />
                <span>SEND MESSAGE</span>
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 px-4 space-y-4"
              id="showroom-contact-success"
            >
              <div className="relative inline-flex items-center justify-center w-14 h-14 bg-blue-950/60 border border-blue-500/40 rounded-2xl">
                <CheckCircle2 className="w-6 h-6 text-blue-400 animate-pulse" />
              </div>
              <div>
                <h3 className="font-sans text-sm font-bold tracking-[0.2em] uppercase text-white">MESSAGE DISPATCHED TO BAKO CARS</h3>
                <p className="text-[9px] font-mono text-blue-400 tracking-widest mt-1 uppercase">DESTINATION: BAKOCARSLTD@YAHOO.COM</p>
              </div>
              <p className="text-white/70 text-xs leading-relaxed max-w-md mx-auto">
                Thank you, <span className="font-bold text-white">{name}</span>. Your inquiry message has been compiled and dispatched to <span className="text-white font-bold">bakocarsltd@yahoo.com</span>. Our Abuja concierge team will contact you shortly via email or phone at <span className="text-white font-bold">{phone}</span>.
              </p>
              <div className="pt-4 border-t border-blue-500/20 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setFormSubmitted(false);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setUserMsg('');
                  }}
                  className="px-6 py-3 border border-blue-500/30 bg-[#081129] hover:border-blue-400 text-white text-[9px] font-mono rounded-full tracking-widest transition-colors cursor-pointer uppercase"
                >
                  SEND ANOTHER MESSAGE
                </button>
                <a
                  href="https://wa.me/message/JCOUM7I4Z2XVB1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 btn-dark-blue text-white text-[9px] font-mono font-bold rounded-full tracking-widest cursor-pointer uppercase flex items-center space-x-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-blue-200" />
                  <span>CONTINUE ON WHATSAPP</span>
                </a>
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </motion.div>
  );
}
