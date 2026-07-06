import type { Metadata } from 'next';
import CustomerDashboardClient from './CustomerDashboardClient';

export const metadata: Metadata = {
  title: 'My Dashboard',
  description: 'Manage your bookings, profile, and invoices.',
};

export default function DashboardPage() {
  return <CustomerDashboardClient />;
}