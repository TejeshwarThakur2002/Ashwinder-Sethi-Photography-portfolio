import { NextResponse } from 'next/server';
import { sanityWriteClient } from '@/lib/sanity.server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, service, preferredDate, preferredTime, message } = body;

    // --- Validation ---
    const errors: string[] = [];

    if (!name || typeof name !== 'string' || !name.trim()) {
      errors.push('Name is required.');
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      errors.push('Email is required.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Please provide a valid email address.');
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      errors.push('Message is required.');
    } else if (message.trim().length < 10) {
      errors.push('Message must be at least 10 characters.');
    }

    if (errors.length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // --- Create document in Sanity ---
    await sanityWriteClient.create({
      _type: 'contactSubmission',
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || '',
      service: service || '',
      preferredDate: preferredDate || '',
      preferredTime: preferredTime || '',
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error('Contact form submission error:', err);
    return NextResponse.json(
      { ok: false, errors: ['An unexpected error occurred. Please try again later.'] },
      { status: 500 }
    );
  }
}
