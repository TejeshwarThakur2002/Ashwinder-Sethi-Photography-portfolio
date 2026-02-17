'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/**
 * SplashScreen Component
 * Displays a smooth animated splash screen with logo on every page load
 */

export default function SplashScreen() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  // Show splash on initial mount and route changes
  useEffect(() => {
    setIsVisible(true);
    
    // Prevent body scroll when splash is visible
    document.body.style.overflow = 'hidden';
    
    // Auto-hide splash screen after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'auto';
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          onClick={() => setIsVisible(false)}
        >
          {/* Logo animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              ease: [0.43, 0.13, 0.23, 0.96],
              delay: 0.2,
            }}
            className="relative"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={200}
                height={200}
                priority
                className="object-contain"
              />
            </motion.div>

            {/* Subtle glow effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 -z-10 blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, transparent 70%)',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
