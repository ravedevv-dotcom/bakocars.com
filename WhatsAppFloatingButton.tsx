/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WhatsAppFloatingButtonProps {
  phoneNumber?: string;
  whatsappLink?: string;
}

export default function WhatsAppFloatingButton({
  whatsappLink = 'https://wa.me/message/JCOUM7I4Z2XVB1'
}: WhatsAppFloatingButtonProps) {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Interactive Curved Tooltip / Prompt bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.3, type: 'spring' }}
            className="mb-3.5 max-w-[270px] bg-gradient-to-b from-[#0b193d]/95 to-[#060d24]/95 backdrop-blur-xl border border-blue-500/50 text-white p-4 rounded-2xl shadow-[0_18px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(29,78,216,0.45)] relative"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-[#0a1636] hover:bg-blue-700 text-white/80 hover:text-white rounded-full flex items-center justify-center border border-blue-400/40 text-xs cursor-pointer shadow-lg transition-colors"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center space-x-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              <span className="font-mono text-[9.5px] text-blue-400 font-bold uppercase tracking-widest">
                Direct WhatsApp VIP
              </span>
            </div>
            <p className="text-[11px] text-blue-100/85 leading-snug font-sans">
              Need instant pricing, inspection, or delivery info? Chat directly with Bako Cars on WhatsApp!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Action Button in Rich Dark Royal Blue */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Chat on WhatsApp with Bako Cars"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#172554] via-[#1d4ed8] to-[#2563eb] text-white shadow-[0_10px_35px_rgba(29,78,216,0.65)] border border-blue-400/50 hover:shadow-[0_12px_45px_rgba(37,99,235,0.9)] transition-all cursor-pointer"
      >
        {/* Glow Pulse Ring */}
        <span className="absolute -inset-1.5 rounded-full bg-blue-600/35 animate-pulse pointer-events-none" />

        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-md text-white z-10 transition-transform group-hover:scale-110" />

        {/* Online Status Badge */}
        <span className="absolute bottom-0 right-0 w-4 h-4 bg-blue-400 border-2 border-[#050811] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.9)]" />
      </motion.a>
    </div>
  );
}
