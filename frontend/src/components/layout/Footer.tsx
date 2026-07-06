'use client';

import Link from 'next/link';
import { Wrench, Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

const serviceLinks = [
  { href: '/services/split-ac', label: 'Split AC Repair' },
  { href: '/services/window-ac', label: 'Window AC Repair' },
  { href: '/services/installation', label: 'AC Installation' },
  { href: '/services/gas-filling', label: 'Gas Filling' },
  { href: '/services/deep-cleaning', label: 'Deep Cleaning' },
  { href: '/services/amc', label: 'Annual Maintenance' },
];

const quickLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/blogs', label: 'Blog' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
];

const cities = [
  'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad',
  'Chennai', 'Kolkata', 'Pune', 'Ahmedabad',
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 border-t">
      {/* Newsletter */}
      <div className="border-b">
        <div className="container-wide mx-auto px-4 sm:px-6 py-10">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-lg font-semibold font-heading mb-2">
              Stay Updated
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Get exclusive offers, maintenance tips, and service updates
            </p>
            <form className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              <button
                type="submit"
                className="gradient-primary text-white px-6 py-3 rounded-xl font-semibold text-sm hover:shadow-lg transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-wide mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold font-heading gradient-text">CoolFix</span>
                <span className="text-xl font-bold font-heading">Pro</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-sm">
              India&apos;s most trusted AC repair and home appliance service platform.
              Certified technicians, transparent pricing, and same-day service.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+9118001234567"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-accent" />
                </span>
                1800-123-4567 (Toll Free)
              </a>
              <a
                href="mailto:hello@coolfixpro.com"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </span>
                hello@coolfixpro.com
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-secondary" />
                </span>
                Available across 12+ cities in India
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold font-heading mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold font-heading mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-semibold font-heading mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              Service Areas
            </h4>
            <ul className="space-y-2.5">
              {cities.map((city) => (
                <li key={city}>
                  <Link
                    href={`/service-area/${city.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="container-wide mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CoolFix Pro. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Youtube, href: '#', label: 'YouTube' },
                { icon: Twitter, href: '#', label: 'Twitter' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}