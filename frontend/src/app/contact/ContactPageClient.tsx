'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    details: ['Toll Free: 1800-123-4567', 'Emergency: +91 98765 43210'],
    action: { label: 'Call Now', href: 'tel:+9118001234567' },
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['General: hello@coolfixpro.com', 'Support: support@coolfixpro.com'],
    action: { label: 'Send Email', href: 'mailto:hello@coolfixpro.com' },
  },
  {
    icon: MapPin,
    title: 'Office',
    details: ['123, Tech Park, Sector 18', 'Gurugram, Haryana - 122001'],
    action: { label: 'Get Directions', href: '#' },
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: ['Mon-Sat: 8:00 AM - 8:00 PM', 'Sunday: 9:00 AM - 6:00 PM'],
    action: { label: 'Book Now', href: '/book' },
  },
];

export default function ContactPageClient() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-wide mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-responsive-h2 font-bold font-heading mb-4">
            Get In{' '}
            <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            We&apos;re here to help. Reach out to us anytime.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl border p-5 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    {item.details.map((d, j) => (
                      <p key={j} className="text-sm text-muted-foreground">{d}</p>
                    ))}
                    <Link
                      href={item.action.href}
                      className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-2 hover:gap-2 transition-all"
                    >
                      {item.action.label}
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social */}
            <div className="glass rounded-2xl border p-5">
              <h3 className="font-semibold mb-3">Follow Us</h3>
              <div className="flex gap-3">
                {['Facebook', 'Instagram', 'YouTube', 'Twitter'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all"
                  >
                    <span className="text-xs font-bold">{social.charAt(0)}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-3xl border p-8 shadow-xl">
              <h2 className="text-2xl font-bold font-heading mb-2">Send us a Message</h2>
              <p className="text-muted-foreground mb-8">We&apos;ll get back to you within 2 hours</p>

              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Enter your phone"
                      className="w-full px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <select className="w-full px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                    <option>Select a subject</option>
                    <option>Booking Inquiry</option>
                    <option>Service Issue</option>
                    <option>Feedback</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className="w-full px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-[120px]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full gradient-primary text-white py-3.5 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}