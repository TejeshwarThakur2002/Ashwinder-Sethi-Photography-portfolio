import { Instagram, Mail } from 'lucide-react';
import { staticSiteConfig } from '@/lib/staticSiteConfig';

/**
 * Studio Info Panel Component
 * Displays contact details and business information
 */

const STUDIO_INFO = {
  instagram: staticSiteConfig.instagramHandle,
  instagramLink: staticSiteConfig.instagramUrl,
  email: staticSiteConfig.email,
  emailLink: staticSiteConfig.emailLink,
};

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  isExternal?: boolean;
}

function InfoItem({ icon, label, value, href, isExternal }: InfoItemProps) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#DC2626]/10 text-[#DC2626]">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-[#F5F5F5]/60">{label}</p>
        <p className="mt-0.5 text-base font-medium text-white">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="block rounded-lg p-3 transition-colors hover:bg-white/5"
      >
        {content}
      </a>
    );
  }

  return <div className="p-3">{content}</div>;
}

export default function StudioInfoPanel() {
  return (
    <div className="space-y-2">
      <h2 className="mb-6 font-playfair text-2xl font-semibold text-white">Get in Touch</h2>

      {/* Email */}
      <InfoItem
        icon={<Mail className="h-5 w-5" />}
        label="Email"
        value={STUDIO_INFO.email}
        href={STUDIO_INFO.emailLink}
      />

      {/* Instagram */}
      <InfoItem
        icon={<Instagram className="h-5 w-5" />}
        label="Instagram"
        value={STUDIO_INFO.instagram}
        href={STUDIO_INFO.instagramLink}
        isExternal
      />

      {/* Quick Response Note */}
      <div className="mt-6 rounded-lg border border-[#DC2626]/20 bg-[#DC2626]/5 p-4">
        <p className="text-sm text-[#F5F5F5]/70">
          <span className="font-medium text-[#DC2626]">Quick Response:</span> We typically respond
          to inquiries within 24-48 hours.
        </p>
      </div>
    </div>
  );
}
