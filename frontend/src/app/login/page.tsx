import type { Metadata } from 'next';
import LoginPageClient from './LoginPageClient';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to CoolFix Pro to manage your bookings and profile.',
};

export default function LoginPage() {
  return <LoginPageClient />;
}