import type { Metadata } from 'next';
import AdminDashboardClient from './AdminDashboardClient';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin panel for CoolFix Pro - manage bookings, customers, technicians, and revenue.',
};

export default function AdminPage() {
  return <AdminDashboardClient />;
}