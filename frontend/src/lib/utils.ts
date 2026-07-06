import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatTime(time: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(`2024-01-01T${time}`));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function generateStars(rating: number): string[] {
  const stars: string[] = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) stars.push('full');
    else if (i - rating < 1) stars.push('half');
    else stars.push('empty');
  }
  return stars;
}

export function downloadInvoice(invoiceId: string): void {
  window.open(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/${invoiceId}/download`, '_blank');
}

export function shareOnWhatsApp(phone: string, message: string): void {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
}

export function makePhoneCall(phone: string): void {
  window.open(`tel:${phone}`);
}

export function getBookingStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500',
    CONFIRMED: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500',
    ASSIGNED: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-500',
    ON_THE_WAY: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500',
    WORKING: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-500',
    COMPLETED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500',
    CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}