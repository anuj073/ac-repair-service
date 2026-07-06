import type { Metadata } from 'next';
import BookingPageClient from './BookingPageClient';

export const metadata: Metadata = {
  title: 'Book AC Service',
  description: 'Book professional AC repair service online. Same-day service, certified technicians, transparent pricing.',
};

export default function BookPage() {
  return <BookingPageClient />;
}