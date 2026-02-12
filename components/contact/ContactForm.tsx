'use client';

import { useState, FormEvent, ChangeEvent, useRef, useEffect } from 'react';
import { Send, CheckCircle, ChevronDown, Check } from 'lucide-react';
import { Button, useToast } from '@/components/ui';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';

/**
 * Contact Form Component
 * Handles form state, validation, and submission via /api/contact → Sanity
 */

// Service options matching the studio services
const SERVICE_OPTIONS = [
  { value: '', label: 'Select a service...' },
  { value: 'fashion', label: 'Fashion Photography' },
  { value: 'portrait', label: 'Portrait Photography' },
  { value: 'food-beverages', label: 'Food & Beverages' },
  { value: 'product', label: 'Product Shoot' },
  { value: 'talk-show', label: 'Talk Show' },
  { value: 'rental', label: 'Rental Studio' },
  { value: 'other', label: 'Other / Not Sure' },
];

// Form data interface
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

// Form errors interface
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// Initial form state
const initialFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  service: '',
  preferredDate: '',
  preferredTime: '',
  message: '',
};

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const toast = useToast();
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServiceDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get selected service label
  const selectedServiceLabel =
    SERVICE_OPTIONS.find((opt) => opt.value === formData.service)?.label || 'Select a service...';

  // Handle service selection
  const handleServiceSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }));
    setIsServiceDropdownOpen(false);
  };

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.status === 201) {
        setSubmitStatus('success');
        setFormData(initialFormData);
        toast.success("Thank you for your message! We'll get back to you within 24-48 hours.");
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 3000);
      } else {
        const data = await res.json().catch(() => null);
        const serverMsg = data?.errors?.join(' ') || 'Something went wrong. Please try again.';
        setSubmitStatus('error');
        toast.error(serverMsg);
      }
    } catch {
      setSubmitStatus('error');
      toast.error('Network error. Please check your connection and try again.');
    }
  };

  // Input base styles
  const inputBaseStyles =
    'w-full rounded-lg border bg-[#1C1C1C] px-4 py-3 text-white placeholder-[#F5F5F5]/40 transition-all focus:outline-none focus:ring-2';
  const inputNormalStyles = 'border-white/10 focus:border-[#DC2626] focus:ring-[#DC2626]/20';
  const inputErrorStyles = 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20';

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Success Message - inline feedback */}
      {submitStatus === 'success' && (
        <div
          className="flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-500/10 p-4"
          role="alert"
          aria-live="polite"
        >
          <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
          <p className="font-medium text-green-400">Message sent successfully!</p>
        </div>
      )}

      {/* Error Message - inline feedback */}
      {submitStatus === 'error' && (
        <div
          className="flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4"
          role="alert"
          aria-live="polite"
        >
          <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-red-500 text-xs font-bold text-red-500">
            !
          </span>
          <p className="font-medium text-red-400">Something went wrong. Please try again.</p>
        </div>
      )}

      {/* Name & Email Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#F5F5F5]/80">
            Name <span className="text-[#DC2626]">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={`${inputBaseStyles} ${errors.name ? inputErrorStyles : inputNormalStyles}`}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            disabled={submitStatus === 'submitting'}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#F5F5F5]/80">
            Email <span className="text-[#DC2626]">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={`${inputBaseStyles} ${errors.email ? inputErrorStyles : inputNormalStyles}`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            disabled={submitStatus === 'submitting'}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-400">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Phone & Service Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Phone */}
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[#F5F5F5]/80">
            Phone <span className="text-[#F5F5F5]/40">(optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className={`${inputBaseStyles} ${inputNormalStyles}`}
            disabled={submitStatus === 'submitting'}
          />
        </div>

        {/* Service - Custom Dropdown */}
        <div ref={dropdownRef} className="relative">
          <label id="service-label" className="mb-2 block text-sm font-medium text-[#F5F5F5]/80">
            Preferred Service <span className="text-[#F5F5F5]/40">(optional)</span>
          </label>
          <button
            type="button"
            onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
            disabled={submitStatus === 'submitting'}
            aria-haspopup="listbox"
            aria-expanded={isServiceDropdownOpen}
            aria-labelledby="service-label"
            className={`${inputBaseStyles} ${inputNormalStyles} flex cursor-pointer items-center justify-between text-left`}
          >
            <span className={formData.service ? 'text-white' : 'text-[#F5F5F5]/40'}>
              {selectedServiceLabel}
            </span>
            <ChevronDown
              className={`h-5 w-5 text-[#F5F5F5]/40 transition-transform duration-200 ${
                isServiceDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isServiceDropdownOpen && (
            <ul
              role="listbox"
              aria-labelledby="service-label"
              className="absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-white/10 bg-[#1C1C1C] shadow-xl shadow-black/30"
            >
              {SERVICE_OPTIONS.map((option, index) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={formData.service === option.value}
                  onClick={() => handleServiceSelect(option.value)}
                  className={`flex cursor-pointer items-center justify-between px-4 py-3 transition-colors ${
                    index === 0 ? 'border-b border-white/5' : ''
                  } ${
                    formData.service === option.value
                      ? 'bg-[#DC2626]/10 text-[#DC2626]'
                      : 'text-[#F5F5F5]/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{option.label}</span>
                  {formData.service === option.value && (
                    <Check className="h-4 w-4 text-[#DC2626]" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Date & Time Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Preferred Date */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#F5F5F5]/80">
            Preferred Date <span className="text-[#F5F5F5]/40">(optional)</span>
          </label>
          <DatePicker
            value={formData.preferredDate}
            onChange={(date) => setFormData((prev) => ({ ...prev, preferredDate: date }))}
            disabled={submitStatus === 'submitting'}
          />
        </div>

        {/* Preferred Time */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#F5F5F5]/80">
            Preferred Time <span className="text-[#F5F5F5]/40">(optional)</span>
          </label>
          <TimePicker
            value={formData.preferredTime}
            onChange={(time) => setFormData((prev) => ({ ...prev, preferredTime: time }))}
            disabled={submitStatus === 'submitting'}
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-[#F5F5F5]/80">
          Message <span className="text-[#DC2626]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project, vision, or any questions you have..."
          rows={5}
          className={`${inputBaseStyles} ${errors.message ? inputErrorStyles : inputNormalStyles} resize-none`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          disabled={submitStatus === 'submitting'}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={submitStatus === 'submitting'}
        disabled={submitStatus === 'success'}
        leftIcon={
          submitStatus === 'success' ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <Send className="h-5 w-5" />
          )
        }
        className="rounded-lg"
      >
        {submitStatus === 'success' ? 'Message Sent' : 'Send Message'}
      </Button>
    </form>
  );
}
