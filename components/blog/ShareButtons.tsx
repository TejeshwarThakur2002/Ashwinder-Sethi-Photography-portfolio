'use client';

import { useState, useCallback } from 'react';
import { Copy, Check, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

/**
 * ShareButtons Component
 * Social sharing and copy link functionality for blog posts
 */

interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
}

export default function ShareButtons({ url, title, className = '' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  }, [url]);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-sm text-[#F5F5F5]/50">Share:</span>

      {/* Copy link button */}
      <button
        onClick={handleCopyLink}
        className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
          copied
            ? 'border-green-500 bg-green-500/20 text-green-500'
            : 'border-white/10 text-[#F5F5F5]/70 hover:border-[#DC2626]/50 hover:text-white'
        }`}
        aria-label={copied ? 'Link copied!' : 'Copy link'}
        title={copied ? 'Link copied!' : 'Copy link'}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>

      {/* Social share links */}
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#F5F5F5]/70 transition-all hover:border-[#DC2626]/50 hover:text-white"
          aria-label={`Share on ${link.name}`}
          title={`Share on ${link.name}`}
        >
          <link.icon className="h-4 w-4" />
        </a>
      ))}

      {/* Instagram link (can't share directly, so link to profile) */}
      <a
        href="https://instagram.com/ashwinder.sethi"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#F5F5F5]/70 transition-all hover:border-[#DC2626]/50 hover:text-white"
        aria-label="Follow on Instagram"
        title="Follow on Instagram"
      >
        <Instagram className="h-4 w-4" />
      </a>
    </div>
  );
}
