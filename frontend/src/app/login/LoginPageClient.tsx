'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, Shield, Wrench } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function LoginPageClient() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    toast.success('OTP sent successfully!');
    setStep('otp');
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    toast.success('Login successful!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Wrench className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold font-heading">Welcome to CoolFix Pro</h1>
          <p className="text-muted-foreground mt-1">
            {step === 'phone' ? 'Enter your phone number to get started' : 'Enter the OTP sent to your phone'}
          </p>
        </div>

        {/* Form */}
        <div className="glass rounded-3xl border p-8 shadow-xl">
          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <div className="absolute left-12 top-1/2 -translate-y-1/2 text-sm text-muted-foreground border-r pr-3">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Enter your phone"
                    className="w-full pl-20 pr-4 py-3.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    maxLength={10}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full gradient-primary text-white py-3.5 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                Send OTP
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-4 py-3.5 rounded-xl border bg-background text-sm text-center text-2xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-primary"
                  maxLength={6}
                />
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  OTP sent to +91 {phone}
                </p>
              </div>
              <button
                type="submit"
                className="w-full gradient-primary text-white py-3.5 rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
              >
                Verify & Login
              </button>
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Change phone number
              </button>
            </form>
          )}

          {/* Trust Badge */}
          <div className="mt-6 pt-6 border-t text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-3 h-3 text-accent" />
              Your data is secure and never shared
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="text-primary hover:underline">Terms</Link>
          {' '}&{' '}
          <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
        </p>
      </motion.div>
    </div>
  );
}