'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  disabled?: boolean;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function DatePicker({ value, onChange, disabled }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse selected date
  const selectedDate = value ? new Date(value) : null;

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

  // Get days in month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday)
  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days: (number | null)[] = [];

    // Add empty slots for days before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  // Handle date selection
  const handleDateSelect = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const formatted = date.toISOString().split('T')[0];
    onChange(formatted);
    setIsOpen(false);
  };

  // Navigate months
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Format display value
  const formatDisplayValue = () => {
    if (!selectedDate) return 'Select a date...';
    return selectedDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Check if date is today
  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  // Check if date is selected
  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear()
    );
  };

  // Check if date is in past
  const isPast = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const days = generateCalendarDays();

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="w-full rounded-lg border border-white/10 bg-[#1C1C1C] px-4 py-3 text-left text-white transition-all focus:outline-none focus:ring-2 focus:border-[#DC2626] focus:ring-[#DC2626]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between"
      >
        <span className={selectedDate ? 'text-white' : 'text-[#F5F5F5]/40'}>
          {formatDisplayValue()}
        </span>
        <Calendar className="h-5 w-5 text-[#F5F5F5]/40" />
      </button>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full min-w-[300px] overflow-hidden rounded-lg border border-white/10 bg-[#1C1C1C] p-4 shadow-xl shadow-black/30">
          {/* Month/Year Header */}
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={prevMonth}
              className="rounded-lg p-2 text-[#F5F5F5]/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="font-medium text-white">
              {MONTHS[currentMonth]} {currentYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="rounded-lg p-2 text-[#F5F5F5]/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Day Labels */}
          <div className="mb-2 grid grid-cols-7 gap-1">
            {DAYS.map((day) => (
              <div key={day} className="py-2 text-center text-xs font-medium text-[#F5F5F5]/40">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <div key={index} className="aspect-square">
                {day !== null && (
                  <button
                    type="button"
                    onClick={() => !isPast(day) && handleDateSelect(day)}
                    disabled={isPast(day)}
                    className={`h-full w-full rounded-lg text-sm font-medium transition-all ${
                      isSelected(day)
                        ? 'bg-[#DC2626] text-white'
                        : isToday(day)
                          ? 'border border-[#DC2626] text-[#DC2626]'
                          : isPast(day)
                            ? 'text-[#F5F5F5]/20 cursor-not-allowed'
                            : 'text-[#F5F5F5]/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {day}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Quick Actions */}
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
              onClick={() => {
                const today = new Date();
                setCurrentMonth(today.getMonth());
                setCurrentYear(today.getFullYear());
                handleDateSelect(today.getDate());
              }}
              className="text-sm font-medium text-[#DC2626] transition-colors hover:text-[#DC2626]/80"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
