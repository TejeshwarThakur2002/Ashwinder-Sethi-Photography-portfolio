'use client';

import Link from 'next/link';
import Image from 'next/image';
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
  hasSubmenu?: boolean;
}

interface GalleryCategory {
  id: string;
  label: string;
  slug: string;
  count: number;
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery', hasSubmenu: true },
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

// Submenu animation variants
const submenuVariants = {
  hidden: { opacity: 0, height: 0, transition: { duration: 0.3, ease: 'easeInOut' as const } },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: 'easeInOut' as const } },
};

const submenuItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeOut' as const } },
};

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isGallerySubmenuOpen, setIsGallerySubmenuOpen] = useState(false);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
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
    setIsGallerySubmenuOpen(false);
  }, [pathname]);

  // Fetch gallery categories when menu opens
  useEffect(() => {
    if (isMenuOpen && categories.length === 0) {
      console.log('Fetching gallery categories...');
      fetch('/api/categories')
        .then((res) => res.json())
        .then((cats: GalleryCategory[]) => {
          console.log('Categories fetched:', cats);
          setCategories(cats);
        })
        .catch((error: Error) => {
          console.error('Error fetching categories:', error);
        });
    }
  }, [isMenuOpen, categories.length]);

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

      {/* Logo (Top-Right) */}
      <div
        className={`fixed top-6 right-6 z-50 flex h-11 items-center transition-transform duration-300 ${isHidden && !isMenuOpen ? '-translate-y-24' : 'translate-y-0'}`}
      >
        <Link href="/" className="block">
          <Image
            src="/logo-black.svg"
            alt="Logo"
            width={156}
            height={156}
            priority
            className="h-21 w-auto sm:h-26 md:h-32 object-contain brightness-0 invert"
          />
        </Link>
      </div>

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
                  <motion.li key={link.href} variants={menuItemVariants} role="none" className="flex flex-col items-center">
                    {link.hasSubmenu ? (
                      <>
                        <button
                          onClick={() => setIsGallerySubmenuOpen(!isGallerySubmenuOpen)}
                          className={`block min-h-[44px] min-w-[44px] text-center text-2xl font-light lowercase tracking-wide transition-colors duration-200 hover:text-[#DC2626] md:text-3xl ${
                            isActive(link.href) ? 'text-[#DC2626]' : 'text-[#6B7280]'
                          }`}
                          role="menuitem"
                          aria-expanded={isGallerySubmenuOpen}
                        >
                          {link.label.toLowerCase()}
                        </button>
                        <AnimatePresence>
                          {isGallerySubmenuOpen && (
                            <motion.ul
                              variants={submenuVariants}
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              className="mt-4 flex flex-col items-center space-y-3 overflow-hidden"
                            >
                              <motion.li variants={submenuItemVariants}>
                                <Link
                                  href="/gallery"
                                  onClick={() => setIsMenuOpen(false)}
                                  className={`block text-base font-light lowercase tracking-wide transition-colors duration-200 hover:text-[#DC2626] md:text-lg ${
                                    pathname === '/gallery' && !pathname.includes('?') ? 'text-[#DC2626]' : 'text-[#6B7280]/80'
                                  }`}
                                >
                                  all
                                </Link>
                              </motion.li>
                              {categories.map((category) => (
                                <motion.li key={category.id} variants={submenuItemVariants}>
                                  <Link
                                    href={`/gallery?category=${category.slug}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block text-base font-light lowercase tracking-wide text-[#6B7280]/80 transition-colors duration-200 hover:text-[#DC2626] md:text-lg"
                                  >
                                    {category.label.toLowerCase()}
                                  </Link>
                                </motion.li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
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
                    )}
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
