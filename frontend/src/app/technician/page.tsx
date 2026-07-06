import type { Metadata } from 'next';
import TechnicianDashboardClient from './TechnicianDashboardClient';

export const metadata: Metadata = {
  title: 'Technician Dashboard',
  description: 'Manage your assigned jobs, track earnings, and update your profile.',
};

export default function TechnicianPage() {
  return <TechnicianDashboardClient />;
}