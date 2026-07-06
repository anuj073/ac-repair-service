'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import {
  Menu, X, Phone, Sun, Moon, ChevronDown, Wrench,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  {
    href: '#services',
    label: 'Services',
    dropdown: [
      { href: '/services/split-ac', label: 'Split AC Repair' },
      { href: '/services/window-ac', label: 'Window AC Repair' },
      { href: '/services/installation', label: 'AC Installation' },
      { href: '/services/deep-cleaning', label: 'Deep Cleaning' },
      { href: '/services/gas-filling', label: 'Gas Filling' },
    ],
  },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '/blogs', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass shadow-lg'
          : 'bg-transparent'
      )}
    >
      <nav className="container-wide mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold font-heading gradient-text">
                CoolFix
              </span>
              <span className="text-xl font-bold font-heading text-foreground">
                Pro
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    'hover:text-primary hover:bg-primary/5',
                    'flex items-center gap-1'
                  )}
                >
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown className={cn(
                      'w-3.5 h-3.5 transition-transform duration-200',
                      activeDropdown === link.label && 'rotate-180'
                    )} />
                  )}
                </Link>

                {/* Dropdown */}
                {link.dropdown && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 w-56 glass rounded-xl shadow-xl border p-2">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2.5 rounded-lg text-sm hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Phone - Desktop */}
            <a
              href="tel:+9118001234567"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 text-accent hover:bg-accent/20 transition-colors text-sm font-medium"
            >
              <Phone className="w-4 h-4" />
              <span>1800-123-4567</span>
            </a>

            {/* Book Now - Desktop */}
            <Link
              href="/book"
              className="hidden md:inline-flex gradient-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105"
            >
              Book Now
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-xl hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-xl text-sm font-medium hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <div className="ml-4 space-y-1 pb-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 space-y-3">
                <a
                  href="tel:+9118001234567"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-accent/10 text-accent font-medium text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Call 1800-123-4567
                </a>
                <Link
                  href="/book"
                  onClick={() => setIsOpen(false)}
                  className="block text-center w-full gradient-primary text-white px-4 py-3 rounded-xl font-semibold"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}