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
      {/* Interactive Tooltip bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-3 max-w-[260px] bg-neutral-900/95 backdrop-blur-md border border-blue-500/40 text-white p-3.5 rounded-xl shadow-2xl relative"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-neutral-800 hover:bg-neutral-700 text-white/70 hover:text-white rounded-full flex items-center justify-center border border-white/10 text-xs cursor-pointer"
              title="Dismiss"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="flex items-center space-x-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              <span className="font-mono text-[9px] text-blue-400 font-bold uppercase tracking-widest">
                Direct WhatsApp VIP
              </span>
            </div>
            <p className="text-[11px] text-white/85 leading-snug font-sans">
              Need instant pricing, inspection, or delivery info? Chat directly with Bako Cars on WhatsApp!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Action Button in Dark Blue */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat on WhatsApp with Bako Cars"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#172554] via-[#1e40af] to-[#2563eb] text-white shadow-[0_8px_30px_rgba(29,78,216,0.5)] border border-blue-400/40 hover:shadow-[0_8px_35px_rgba(37,99,235,0.75)] transition-all cursor-pointer"
      >
        <span className="absolute -inset-1 rounded-full bg-blue-600/25 animate-pulse pointer-events-none" />
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-md text-white z-10 transition-transform group-hover:scale-110" />
        <span className="absolute bottom-0 right-0 w-4 h-4 bg-blue-400 border-2 border-black rounded-full shadow" />
      </motion.a>
    </div>
  );
}
