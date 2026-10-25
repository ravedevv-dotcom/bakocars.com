/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  X,
  Send,
  ArrowUpRight,
  Sparkles,
  MessageCircle,
  Car as CarIcon,
  Loader2,
} from 'lucide-react';
import { Car, getImageUrl, handleImageFallback } from './types';

interface BakoConciergeWidgetProps {
  vehicles: Car[];
  onSelectCar: (car: Car) => void;
  onFilterSearch?: (query: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'concierge' | 'user';
  text: string;
  matchedCars?: Car[];
  whatsappQuery: string;
}

const QUICK_PROMPTS = [
  { label: 'G-Wagons', query: 'Show me available Mercedes-AMG G-Wagons and luxury SUVs in Abuja' },
  { label: '40% Import Promo', query: 'How does the 40% off direct importation promo work?' },
  { label: 'Trade-In Appraisal', query: 'I want to trade in my current car for an upgrade at Bako Cars' },
  { label: 'Book Auto Spa', query: 'I want to book the Precision Auto Spa & Detailing Stand behind Tsukunda House' },
];

export default function BakoConciergeWidget({
  vehicles,
  onSelectCar,
}: BakoConciergeWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'concierge',
      text: 'Welcome to Bako Cars Abuja (Behind Tsukunda House). I am your Virtual Chief Concierge. Ask me in English or Pidgin about our duty-paid fleet (e.g., "Find me a Range Rover under ₦70M"), our 40% Off Direct Importation Promo, Trade-In Upgrades, or our Precision Auto Spa.',
      whatsappQuery: 'Hello Bako Cars VIP Desk, I would like to speak with a specialist regarding your Abuja showroom fleet.',
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const formatPrice = (val: number) => {
    if (!val || val <= 0) return 'Inquire for Price';
    return '₦' + val.toLocaleString('en-US');
  };

  // Intelligent local vehicle matcher & Nigerian English / Pidgin response generator
  const analyzeQueryLocally = (rawQuery: string): { reply: string; matchedCars: Car[] } => {
    const q = rawQuery.toLowerCase();
    const activeFleet = vehicles.filter((v) => v.status !== 'Sold');

    // Parse budget constraint like "under 70m", "below ₦30m", "under 25 million"
    let budgetCeiling: number | null = null;
    const budgetMatch = q.match(/(?:under|below|less than|max|around|budget)\s*₦?\s*(\d+(?:\.\d+)?)\s*(m|million)/i) ||
      q.match(/₦?\s*(\d+(?:\.\d+)?)\s*(m|million)/i);
    if (budgetMatch) {
      budgetCeiling = parseFloat(budgetMatch[1]) * 1_000_000;
    }

    // 1. Check if asking about 40% Off Import Promo
    if (q.includes('40%') || q.includes('import') || q.includes('ship') || q.includes('auction')) {
      return {
        reply:
          'Our 40% Off Direct Importation Promo slashes procurement, auction brokerage, and handling fees by 40% when ordering directly from the USA, Canada, Europe, or Dubai to Abuja.\n\n• Full pre-purchase diagnostic & Carfax verification\n• Marine insurance & express Tin Can / Apapa customs clearance\n• White-glove flatbed delivery straight to Behind Tsukunda House, Abuja.',
        matchedCars: activeFleet.slice(0, 2),
      };
    }

    // 2. Check if asking about Trade-In / Sell
    if (q.includes('trade') || q.includes('swap') || q.includes('upgrade') || q.includes('sell my')) {
      return {
        reply:
          'We offer Same-Day Trade-In Appraisals & Vehicle Upgrades at our Abuja showroom (Behind Tsukunda House).\n\n1. Bring your current vehicle or send photos + VIN to our VIP WhatsApp Desk.\n2. Receive an instant market-leading valuation within 30 minutes.\n3. Roll your equity directly into any duty-paid exotic in our showroom today.',
        matchedCars: activeFleet.slice(0, 2),
      };
    }

    // 3. Check if asking about Auto Spa / Car Wash / Detailing
    if (q.includes('spa') || q.includes('wash') || q.includes('detail') || q.includes('ceramic') || q.includes('polish')) {
      return {
        reply:
          'Our Precision Auto Spa & Detailing Stand is open daily (Mon–Sat, 9AM–7PM) right at our showroom behind Tsukunda House, Abuja.\n\n• Executive pH-neutral snow foam hand wash\n• Nappa leather steam rejuvenation & cabin sterilization\n• Multi-stage paint correction & 9H Ceramic Armor protection.',
        matchedCars: [],
      };
    }

    // 4. Vehicle search matching (G-Wagon, Range Rover, GLE, ML350, C300, Corolla, Lexus, Toyota, etc.)
    const matched = activeFleet.filter((car) => {
      if (budgetCeiling && car.price > 0 && car.price > budgetCeiling) {
        return false;
      }
      const hay = `${car.year} ${car.make} ${car.model} ${car.bodyType} ${car.interiorColor} ${car.exteriorColor}`.toLowerCase();
      if (q.includes('g-wagon') || q.includes('g wagon') || q.includes('g63') || q.includes('brabus')) {
        return hay.includes('g63') || hay.includes('g-class') || hay.includes('gle') || hay.includes('glc');
      }
      if (q.includes('range') || q.includes('rover') || q.includes('velar')) {
        return hay.includes('range') || hay.includes('rover') || hay.includes('velar');
      }
      if (q.includes('corolla') || q.includes('toyota') || q.includes('camry') || q.includes('hilux') || q.includes('land cruiser')) {
        return hay.includes('toyota') || hay.includes('corolla') || hay.includes('camry') || hay.includes('hilux') || hay.includes('land cruiser');
      }
      if (q.includes('ml350') || q.includes('ml 350')) {
        return hay.includes('ml350') || hay.includes('ml 350');
      }
      if (q.includes('c300') || q.includes('c 300')) {
        return hay.includes('c300') || hay.includes('c 300');
      }
      if (q.includes('lexus') || q.includes('rx') || q.includes('gx') || q.includes('lx')) {
        return hay.includes('lexus') || hay.includes('rx') || hay.includes('gx') || hay.includes('lx');
      }
      if (q.includes('benz') || q.includes('mercedes') || q.includes('amg') || q.includes('gle') || q.includes('s63') || q.includes('cls')) {
        return hay.includes('mercedes');
      }
      if (budgetCeiling) {
        return car.price > 0 && car.price <= budgetCeiling;
      }
      return false;
    });

    const finalMatches = matched.length > 0 ? matched.slice(0, 3) : activeFleet.slice(0, 3);

    if (matched.length > 0) {
      const listText = finalMatches
        .map(
          (c) =>
            `• ${c.year} ${c.make} ${c.model} — ${formatPrice(c.price)} (${
              c.mileage ? c.mileage.toLocaleString() + ' miles, ' : ''
            }${c.interiorColor || 'Luxury'} interior, Duty Paid)`
        )
        .join('\n');

      return {
        reply: `I found ${matched.length} matching duty-paid ${
          matched.length === 1 ? 'vehicle' : 'vehicles'
        } available right now at our Abuja showroom behind Tsukunda House:\n\n${listText}\n\nClick any vehicle card below to inspect its full gallery, or dispatch your request directly to our VIP WhatsApp Desk.`,
        matchedCars: finalMatches,
      };
    }

    const topText = finalMatches
      .map((c) => `• ${c.year} ${c.make} ${c.model} — ${formatPrice(c.price)} (Duty Paid)`)
      .join('\n');

    return {
      reply: `We currently have ${activeFleet.length} duty-paid luxury & exotic vehicles ready for immediate inspection behind Tsukunda House, Abuja. Here are top highlights from our showroom floor:\n\n${topText}\n\nYou can also tap the button below to forward your exact specification to our VIP WhatsApp Desk on 0705 809 9349.`,
      matchedCars: finalMatches,
    };
  };

  const handleSendQuery = async (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      whatsappQuery: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const localResult = analyzeQueryLocally(trimmed);
    let replyText = localResult.reply;

    // Attempt server-side Gemini API call (/api/concierge) first; fallback gracefully to local concierge engine
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6500);
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: trimmed }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (res.ok) {
        const data = await res.json();
        if (data?.reply && typeof data.reply === 'string' && data.reply.trim().length > 10) {
          replyText = data.reply.trim();
        }
      }
    } catch {
      // Static environment or offline: use instant localResult.reply
    }

    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        id: `concierge-${Date.now()}`,
        sender: 'concierge',
        text: replyText,
        matchedCars: localResult.matchedCars,
        whatsappQuery: `Hello Bako Cars VIP Desk, ${trimmed}`,
      },
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-auto" id="bako-ai-concierge-root">
      {/* Drawer Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-[calc(100vw-2.5rem)] sm:w-[410px] max-h-[78vh] bg-[#080808] border border-[#27272A] rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_35px_rgba(0,240,255,0.12)] flex flex-col overflow-hidden"
            id="bako-concierge-drawer"
          >
            {/* Drawer Header */}
            <div className="px-5 py-4 bg-[#121212] border-b border-[#27272A] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#080808] border border-[#00F0FF]/50 flex items-center justify-center text-[#00F0FF]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display text-xs font-extrabold tracking-[0.14em] text-white uppercase">
                    BAKO VIRTUAL CHIEF CONCIERGE
                  </h3>
                  <span className="font-mono text-[9px] text-[#00F0FF] uppercase tracking-[0.18em] block">
                    ABUJA SHOWROOM AI · LIVE FLEET
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg border border-[#27272A] hover:border-white text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
                aria-label="Close Concierge"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick-Prompt Pills */}
            <div className="px-4 py-2.5 bg-[#080808] border-b border-[#27272A] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {QUICK_PROMPTS.map((pill) => (
                <button
                  key={pill.label}
                  type="button"
                  onClick={() => handleSendQuery(pill.query)}
                  className="px-2.5 py-1 rounded-md bg-[#121212] hover:bg-[#00F0FF] text-[#A1A1AA] hover:text-[#080808] border border-[#27272A] hover:border-[#00F0FF] font-mono text-[10px] font-semibold tracking-wider whitespace-nowrap shrink-0 transition-all cursor-pointer"
                >
                  [{pill.label}]
                </button>
              ))}
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[380px]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  } space-y-2`}
                >
                  <div
                    className={`max-w-[90%] rounded-xl px-4 py-3 text-xs leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-[#00F0FF] text-[#080808] font-medium'
                        : 'bg-[#121212] border border-[#27272A] text-white'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Matched Vehicle Mini-Cards */}
                  {msg.sender === 'concierge' && msg.matchedCars && msg.matchedCars.length > 0 && (
                    <div className="w-full space-y-2 pt-1">
                      {msg.matchedCars.map((car) => (
                        <div
                          key={car.id}
                          onClick={() => onSelectCar(car)}
                          className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[#121212] border border-[#27272A] hover:border-[#00F0FF] transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {car.images && car.images.length > 0 ? (
                              <img
                                src={getImageUrl(car.images[0], 160)}
                                alt={car.model}
                                className="w-14 h-10 object-cover rounded-lg border border-[#27272A] shrink-0"
                                referrerPolicy="no-referrer"
                                onError={(e) => handleImageFallback(e, car.images[0])}
                              />
                            ) : (
                              <div className="w-14 h-10 rounded-lg bg-[#080808] border border-[#27272A] flex items-center justify-center shrink-0">
                                <CarIcon className="w-4 h-4 text-[#A1A1AA]" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className="font-display text-[11px] font-bold text-white group-hover:text-[#00F0FF] truncate uppercase">
                                {car.year} {car.make} {car.model}
                              </div>
                              <div className="font-mono text-[10px] text-[#C5A059] font-semibold">
                                {formatPrice(car.price)}
                              </div>
                            </div>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#00F0FF] shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Automated WhatsApp Routing Button */}
                  {msg.sender === 'concierge' && (
                    <a
                      href={`https://wa.me/2347058099349?text=${encodeURIComponent(msg.whatsappQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121212] hover:bg-[#C5A059] text-[#C5A059] hover:text-[#080808] border border-[#C5A059]/40 font-mono text-[10px] font-bold uppercase tracking-wider transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Send Request to VIP WhatsApp Desk →</span>
                    </a>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] bg-[#121212] border border-[#27272A] rounded-xl px-4 py-3 w-fit">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Scanning Abuja showroom fleet...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendQuery(input);
              }}
              className="p-3 bg-[#121212] border-t border-[#27272A] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask in English or Pidgin (e.g. Range Rover under ₦70M)..."
                className="flex-1 bg-[#080808] border border-[#27272A] focus:border-[#00F0FF] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#A1A1AA]/60 focus:outline-none font-sans"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2.5 rounded-xl bg-[#00F0FF] hover:bg-[#00F0FF]/90 disabled:opacity-40 text-[#080808] transition-all cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom-Right Floating Launcher Bar (AI Chief Concierge + Direct WhatsApp) */}
      <div className="flex items-center gap-2.5">
        <a
          href="https://wa.me/2347058099349?text=Hello%20Bako%20Cars%20VIP%20Desk%2C%20I%20am%20browsing%20your%20Abuja%20showroom%20online."
          target="_blank"
          rel="noopener noreferrer"
          className="h-12 px-4 rounded-full bg-[#121212]/95 hover:bg-[#18181B] border border-[#27272A] hover:border-emerald-400 text-white shadow-2xl backdrop-blur-md flex items-center gap-2 transition-all cursor-pointer"
          title="Direct WhatsApp VIP Desk"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline font-mono text-[10px] font-bold uppercase tracking-wider text-white">
            WHATSAPP VIP
          </span>
        </a>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="h-12 px-5 rounded-full bg-[#080808] hover:bg-[#121212] border border-[#00F0FF] text-white shadow-[0_10px_35px_rgba(0,240,255,0.22)] flex items-center gap-2.5 transition-all cursor-pointer"
          id="bako-concierge-trigger-btn"
        >
          <MessageSquare className="w-4 h-4 text-[#00F0FF]" />
          <span className="font-display text-[11px] font-bold uppercase tracking-[0.14em] text-white whitespace-nowrap">
            {isOpen ? 'CLOSE CONCIERGE' : 'BAKO AI CONCIERGE'}
          </span>
        </button>
      </div>
    </div>
  );
}
