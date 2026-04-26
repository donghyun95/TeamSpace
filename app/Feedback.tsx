'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MessageSquare, X } from 'lucide-react';
import FeedbackCard from './FeedbackCard';
import type { Transition } from 'motion/react';

const spring: Transition = {
  type: 'spring',
  stiffness: 380,
  damping: 28,
};

export default function FloatingFeedback() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, scale: 0.6, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.92 }}
        transition={spring}
        className="fixed bottom-12 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#191919] text-white shadow-2xl shadow-black/25"
      >
        <MessageSquare size={22} />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={spring}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="relative w-full md:max-w-5xl h-[90dvh] md:h-auto">
                {/* Close button */}
                <motion.button
                  onClick={() => setOpen(false)}
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow backdrop-blur"
                >
                  <X size={18} />
                </motion.button>

                <FeedbackCard />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
