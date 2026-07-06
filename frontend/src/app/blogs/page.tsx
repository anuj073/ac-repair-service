import type { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Blog - AC Repair Tips & Guides',
  description: 'Expert AC maintenance tips, repair guides, and industry insights from CoolFix Pro technicians.',
  openGraph: {
    title: 'Blog - CoolFix Pro',
    description: 'Expert AC maintenance tips, repair guides, and industry insights.',
  },
};

export default function BlogsPage() {
  return <BlogPageClient />;
}