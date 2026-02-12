'use client';

import { useState, useRef, useEffect } from 'react';
import { Clock, ChevronUp, ChevronDown } from 'lucide-react';

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  disabled?: boolean;
}

// Generate hours (1-12)
const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));

// Generate minutes (00, 15, 30, 45)
const MINUTES = ['00', '15', '30', '45'];

export default function TimePicker({ value, onChange, disabled }: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse current value
  const parseTime = (timeStr: string) => {
    if (!timeStr) return { hour: '10', minute: '00', period: 'AM' };
    const [hours, minutes] = timeStr.split(':');
    const hourNum = parseInt(hours, 10);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;
    return {
      hour: String(hour12).padStart(2, '0'),
      minute: minutes || '00',
      period,
    };
  };

  const { hour, minute, period } = parseTime(value);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update time value
  const updateTime = (newHour: string, newMinute: string, newPeriod: string) => {
    let hour24 = parseInt(newHour, 10);
    if (newPeriod === 'PM' && hour24 !== 12) hour24 += 12;
    if (newPeriod === 'AM' && hour24 === 12) hour24 = 0;
    const formatted = `${String(hour24).padStart(2, '0')}:${newMinute}`;
    onChange(formatted);
  };

  // Format display value
  const formatDisplayValue = () => {
    if (!value) return 'Select a time...';
    return `${hour}:${minute} ${period}`;
  };

  // Scroll handlers for hour/minute
  const scrollHour = (direction: 'up' | 'down') => {
    const currentIndex = HOURS.indexOf(hour);
    let newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0) newIndex = HOURS.length - 1;
    if (newIndex >= HOURS.length) newIndex = 0;
    updateTime(HOURS[newIndex], minute, period);
  };

  const scrollMinute = (direction: 'up' | 'down') => {
    const currentIndex = MINUTES.indexOf(minute);
    let newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0) newIndex = MINUTES.length - 1;
    if (newIndex >= MINUTES.length) newIndex = 0;
    updateTime(hour, MINUTES[newIndex], period);
  };

  const togglePeriod = () => {
    const newPeriod = period === 'AM' ? 'PM' : 'AM';
    updateTime(hour, minute, newPeriod);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="w-full rounded-lg border border-white/10 bg-[#1C1C1C] px-4 py-3 text-left text-white transition-all focus:outline-none focus:ring-2 focus:border-[#DC2626] focus:ring-[#DC2626]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between"
      >
        <span className={value ? 'text-white' : 'text-[#F5F5F5]/40'}>{formatDisplayValue()}</span>
        <Clock className="h-5 w-5 text-[#F5F5F5]/40" />
      </button>

      {/* Time Picker Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-white/10 bg-[#1C1C1C] p-4 shadow-xl shadow-black/30">
          <div className="flex items-center justify-center gap-2">
            {/* Hour Column */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => scrollHour('up')}
                className="rounded-lg p-2 text-[#F5F5F5]/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <ChevronUp className="h-5 w-5" />
              </button>
              <div className="my-2 flex h-12 w-14 items-center justify-center rounded-lg bg-[#DC2626]/10 text-xl font-semibold text-[#DC2626]">
                {hour}
              </div>
              <button
                type="button"
                onClick={() => scrollHour('down')}
                className="rounded-lg p-2 text-[#F5F5F5]/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>

            {/* Separator */}
            <span className="text-2xl font-bold text-[#F5F5F5]/40">:</span>

            {/* Minute Column */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => scrollMinute('up')}
                className="rounded-lg p-2 text-[#F5F5F5]/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <ChevronUp className="h-5 w-5" />
              </button>
              <div className="my-2 flex h-12 w-14 items-center justify-center rounded-lg bg-[#DC2626]/10 text-xl font-semibold text-[#DC2626]">
                {minute}
              </div>
              <button
                type="button"
                onClick={() => scrollMinute('down')}
                className="rounded-lg p-2 text-[#F5F5F5]/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>

            {/* AM/PM Toggle */}
            <div className="ml-2 flex flex-col items-center">
              <button
                type="button"
                onClick={() => scrollHour('up')}
                className="invisible rounded-lg p-2"
              >
                <ChevronUp className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={togglePeriod}
                className="my-2 flex h-12 w-14 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-lg font-semibold text-white transition-colors hover:bg-white/10"
              >
                {period}
              </button>
              <button
                type="button"
                onClick={() => scrollHour('down')}
                className="invisible rounded-lg p-2"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Select */}
          <div className="mt-4 grid grid-cols-4 gap-2 border-t border-white/10 pt-4">
            {[
              { label: '9 AM', value: '09:00' },
              { label: '12 PM', value: '12:00' },
              { label: '3 PM', value: '15:00' },
              { label: '6 PM', value: '18:00' },
            ].map((time) => (
              <button
                key={time.value}
                type="button"
                onClick={() => {
                  onChange(time.value);
                  setIsOpen(false);
                }}
                className="rounded-lg bg-white/5 px-3 py-2 text-sm text-[#F5F5F5]/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {time.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={() => {
                onChange('');
                setIsOpen(false);
              }}
              className="text-sm text-[#F5F5F5]/60 transition-colors hover:text-white"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-[#DC2626] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#B91C1C]"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
