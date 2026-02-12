'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Site Header/Navigation Component
 * Provides main navigation for the site with responsive mobile menu
 * TODO: Connect to Sanity Site Settings for dynamic nav items
 */

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

// Overlay animation
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' as const } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

// Menu items stagger
const menuContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const menuItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Check if link is active
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const updateHeader = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Hide header when scrolling down, show when scrolling up
    if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }

    lastScrollY.current = currentScrollY;
    ticking.current = false;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        // Use requestAnimationFrame for smooth, optimized scroll handling
        requestAnimationFrame(updateHeader);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateHeader]);

  // Body scroll lock when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // Close menu on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    // We intentionally sync menu state with route changes here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Hamburger Button (Top-Left) */}
      <header
        className={`fixed top-6 left-6 z-50 transition-transform duration-300 ${isHidden && !isMenuOpen ? '-translate-y-24' : 'translate-y-0'}`}
        role="banner"
      >
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative flex h-11 w-11 items-center justify-center rounded-full transition-all hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#DC2626] focus-visible:outline-none"
          aria-expanded={isMenuOpen}
          aria-controls="fullscreen-menu"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <div className="relative w-6 h-[18px]">
            <span
              className="absolute left-0 block h-[2px] w-6 rounded-full bg-[#DC2626] transition-all duration-[250ms] ease-in-out"
              style={{
                top: isMenuOpen ? '8px' : '0px',
                transform: isMenuOpen ? 'rotate(45deg)' : 'rotate(0)',
              }}
              aria-hidden="true"
            />
            <span
              className="absolute left-0 top-[8px] block h-[2px] w-6 rounded-full bg-[#DC2626] transition-all duration-[250ms] ease-in-out"
              style={{
                opacity: isMenuOpen ? 0 : 1,
              }}
              aria-hidden="true"
            />
            <span
              className="absolute left-0 block h-[2px] w-6 rounded-full bg-[#DC2626] transition-all duration-[250ms] ease-in-out"
              style={{
                top: isMenuOpen ? '8px' : '16px',
                transform: isMenuOpen ? 'rotate(-45deg)' : 'rotate(0)',
              }}
              aria-hidden="true"
            />
          </div>
        </button>
      </header>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="fullscreen-menu"
            className="fixed inset-0 z-40 bg-[#F5F5F5]/98 backdrop-blur-2xl"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsMenuOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <motion.nav
              className="flex h-full w-full items-center justify-center"
              variants={menuContainerVariants}
              initial="hidden"
              animate="visible"
              onClick={(e) => e.stopPropagation()}
              aria-label="Main navigation"
            >
              <ul className="flex flex-col items-center space-y-12 md:space-y-16" role="menu">
                {navLinks.map((link) => (
                  <motion.li key={link.href} variants={menuItemVariants} role="none">
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block min-h-[44px] min-w-[44px] text-center text-2xl font-light lowercase tracking-wide transition-colors duration-200 hover:text-[#DC2626] md:text-3xl ${
                        isActive(link.href) ? 'text-[#DC2626]' : 'text-[#6B7280]'
                      }`}
                      role="menuitem"
                    >
                      {link.label.toLowerCase()}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
