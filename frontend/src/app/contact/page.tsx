import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with CoolFix Pro. Call, email, or visit us for AC repair and service inquiries.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}