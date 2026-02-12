import Link from 'next/link';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';

/**
 * Site Footer Component
 * Contains navigation links, contact info, and social media links
 * TODO: Connect to Sanity Site Settings for dynamic content (footer text, social links, contact info)
 */

const footerNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { href: 'https://instagram.com/ashwinder.sethi', label: 'Instagram', icon: Instagram },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#DC2626]/10 bg-[#0F0F0F]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="font-playfair text-2xl font-semibold tracking-tight text-white"
            >
              Shoot Studio
            </Link>
            <p className="text-sm text-[#F5F5F5]/50">by Ashwinder Sethi</p>
            <p className="mt-4 text-sm leading-relaxed text-[#F5F5F5]/60">
              Premium photography studio in Ludhiana offering professional shoots, studio rentals,
              podcast production, and one-on-one coaching.
            </p>
            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[#F5F5F5]/80 backdrop-blur-xl transition-all hover:bg-white/20 hover:border-white/30"
                  aria-label={`Follow on ${social.label}`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-sm font-semibold uppercase tracking-wider text-[#DC2626]">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#F5F5F5]/60 transition-colors hover:text-[#DC2626]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-playfair text-sm font-semibold uppercase tracking-wider text-[#DC2626]">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="tel:+919915200824"
                  className="inline-flex items-center gap-2 text-sm text-[#F5F5F5]/60 transition-colors hover:text-[#DC2626]"
                >
                  <Phone className="h-4 w-4" />
                  +91 9915200824
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/ashwinder.sethi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#F5F5F5]/60 transition-colors hover:text-[#DC2626]"
                >
                  <Instagram className="h-4 w-4" />
                  @ashwinder.sethi
                </a>
              </li>
              <li>
                <a
                  href="mailto:ashwindersethis@gmail.com"
                  className="inline-flex items-center gap-2 text-sm text-[#F5F5F5]/60 transition-colors hover:text-[#DC2626]"
                >
                  <Mail className="h-4 w-4" />
                  ashwindersethis@gmail.com
                </a>
              </li>
              <li>
                <span className="inline-flex items-start gap-2 text-sm text-[#F5F5F5]/60">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    Shoot Studio, F-9 Oasis Complex,
                    <br />
                    Guru Nanak Bhawan, Ludhiana,
                    <br />
                    Punjab, 141001
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-[#1C1C1C] pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-[#F5F5F5]/40">
              © {currentYear} Shoot Studio by Ashwinder Sethi. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-[#F5F5F5]/40 transition-colors hover:text-[#DC2626]"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-[#F5F5F5]/40 transition-colors hover:text-[#DC2626]"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
