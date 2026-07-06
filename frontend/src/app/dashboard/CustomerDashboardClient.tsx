'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, CalendarDays, User, FileText, Bell,
  Star, Settings, LogOut, Clock, MapPin, Phone,
  ChevronRight, Wrench, Download, MessageSquare,
  ThumbsUp, CheckCircle2, AlertCircle, Info,
  SendHorizonal,
} from 'lucide-react';
import Link from 'next/link';
import { cn, formatDate, getBookingStatusColor } from '@/lib/utils';

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'bookings', label: 'My Bookings', icon: CalendarDays },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'invoices', label: 'Invoices', icon: FileText },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

const sampleBookings = [
  {
    id: 'ACR-10001',
    service: 'Split AC Repair',
    date: '2026-07-08',
    time: '10:00-11:00',
    status: 'CONFIRMED',
    price: '₹299',
    technician: 'Rahul Kumar',
  },
  {
    id: 'ACR-10002',
    service: 'AC Deep Cleaning',
    date: '2026-07-05',
    time: '14:00-15:00',
    status: 'COMPLETED',
    price: '₹799',
    technician: 'Amit Singh',
  },
  {
    id: 'ACR-10003',
    service: 'Gas Filling',
    date: '2026-06-28',
    time: '11:00-12:00',
    status: 'COMPLETED',
    price: '₹1,999',
    technician: 'Suresh Patel',
  },
];

const sampleInvoices = [
  {
    id: 'INV-10042',
    service: 'Split AC Repair',
    date: '2026-07-08',
    amount: '₹299',
    status: 'PAID',
    items: ['Diagnostic fee', 'Compressor repair', 'Gas top-up'],
  },
  {
    id: 'INV-10041',
    service: 'AC Deep Cleaning',
    date: '2026-07-05',
    amount: '₹799',
    status: 'PAID',
    items: ['Full disassembly cleaning', 'Coil treatment', 'Sanitisation'],
  },
  {
    id: 'INV-10040',
    service: 'Gas Filling',
    date: '2026-06-28',
    amount: '₹1,999',
    status: 'PAID',
    items: ['R32 gas refill', 'Leak test', 'Pressure check'],
  },
  {
    id: 'INV-10039',
    service: 'Annual Maintenance Contract',
    date: '2026-06-15',
    amount: '₹4,999',
    status: 'UNPAID',
    items: ['AMC Gold plan (1 year)', '2 free services', 'Priority support'],
  },
  {
    id: 'INV-10038',
    service: 'Window AC Installation',
    date: '2026-05-20',
    amount: '₹1,499',
    status: 'PENDING',
    items: ['Installation labour', 'Brackets & fittings', 'Wiring'],
  },
];

const sampleReviews = [
  {
    id: 1,
    service: 'Split AC Repair',
    technician: 'Rahul Kumar',
    rating: 5,
    date: '2026-07-08',
    comment: 'Excellent service! The technician arrived on time and fixed the AC quickly. Very professional.',
  },
  {
    id: 2,
    service: 'AC Deep Cleaning',
    technician: 'Amit Singh',
    rating: 4,
    date: '2026-07-05',
    comment: 'Good cleaning service. The AC feels much cooler now. Only minor delay in arrival.',
  },
  {
    id: 3,
    service: 'Gas Filling',
    technician: 'Suresh Patel',
    rating: 5,
    date: '2026-06-28',
    comment: 'Outstanding work! Identified the leak, fixed it, and refilled the gas. AC is working perfectly now.',
  },
  {
    id: 4,
    service: 'Window AC Installation',
    technician: 'Rahul Kumar',
    rating: 3,
    date: '2026-06-10',
    comment: 'Installation was okay but took longer than expected. The bracket could have been positioned better.',
  },
];

const sampleNotifications: { id: number; title: string; message: string; date: string; read: boolean; type: NotificationType }[] = [
  {
    id: 1,
    title: 'Booking Confirmed',
    message: 'Your Split AC Repair booking (ACR-10001) has been confirmed for July 8, 2026 at 10:00 AM.',
    date: '2026-07-06T09:30:00',
    read: false,
    type: 'booking',
  },
  {
    id: 2,
    title: 'Payment Received',
    message: 'Payment of ₹299 for Split AC Repair (INV-10042) has been successfully processed.',
    date: '2026-07-08T15:00:00',
    read: false,
    type: 'payment',
  },
  {
    id: 3,
    title: 'Service Completed',
    message: 'Your AC Deep Cleaning service has been completed. Please leave a review for Amit Singh.',
    date: '2026-07-05T16:00:00',
    read: true,
    type: 'booking',
  },
  {
    id: 4,
    title: 'AMC Renewal Reminder',
    message: 'Your Annual Maintenance Contract is due for renewal in 30 days. Renew now to continue uninterrupted service.',
    date: '2026-07-01T10:00:00',
    read: false,
    type: 'alert',
  },
  {
    id: 5,
    title: 'Special Offer',
    message: 'Get 20% off on AC Deep Cleaning this monsoon season. Book now to avail the discount!',
    date: '2026-06-25T08:00:00',
    read: true,
    type: 'promo',
  },
  {
    id: 6,
    title: 'Technician En Route',
    message: 'Amit Singh is on the way for your AC Deep Cleaning appointment. Estimated arrival: 2:00 PM.',
    date: '2026-07-05T13:30:00',
    read: true,
    type: 'booking',
  },
  {
    id: 7,
    title: 'Invoice Generated',
    message: 'Your invoice INV-10040 of ₹1,999 for Gas Filling is now available for download.',
    date: '2026-06-28T12:00:00',
    read: true,
    type: 'payment',
  },
];

type NotificationType = 'booking' | 'payment' | 'alert' | 'promo';

const notificationIcons: Record<NotificationType, typeof Bell> = {
  booking: Bell,
  payment: CheckCircle2,
  alert: AlertCircle,
  promo: Info,
};

const notificationColors: Record<NotificationType, string> = {
  booking: 'text-primary bg-primary/10',
  payment: 'text-green-500 bg-green-500/10',
  alert: 'text-amber-500 bg-amber-500/10',
  promo: 'text-purple-500 bg-purple-500/10',
};

const getInvoiceStatusColor = (status: string) => {
  switch (status) {
    case 'PAID': return 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-950/40';
    case 'UNPAID': return 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-950/40';
    case 'PENDING': return 'text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-950/40';
    default: return 'text-muted-foreground bg-muted';
  }
};

const formatNotificationDate = (dateStr: string) => {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours === 0) return 'Just now';
    return `${hours}h ago`;
  }
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

export default function CustomerDashboardClient() {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [reviews, setReviews] = useState(sampleReviews);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container-wide mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="glass rounded-2xl border p-4 sticky top-28">
              {/* User Info */}
              <div className="text-center p-4 border-b mb-4">
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-3 text-white text-2xl font-bold shadow-lg">
                  R
                </div>
                <h3 className="font-semibold">Rahul Sharma</h3>
                <p className="text-xs text-muted-foreground">+91 98765 43210</p>
              </div>

              {/* Nav */}
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                      activeTab === tab.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted/50'
                    )}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
                <div className="border-t pt-2 mt-2">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Overview */}
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold font-heading mb-6">Dashboard Overview</h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: 'Total Bookings', value: '12', icon: CalendarDays, color: 'text-primary' },
                      { label: 'Completed', value: '8', icon: Star, color: 'text-accent' },
                      { label: 'Upcoming', value: '2', icon: Clock, color: 'text-secondary' },
                      { label: 'Reviews', value: '5', icon: Star, color: 'text-yellow-500' },
                    ].map((stat, i) => (
                      <div key={i} className="glass rounded-2xl border p-5">
                        <div className="flex items-center justify-between mb-3">
                          <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Recent Bookings */}
                  <h3 className="font-semibold mb-4">Recent Bookings</h3>
                  <div className="space-y-3">
                    {sampleBookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="glass rounded-2xl border p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Wrench className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{booking.service}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {formatDate(booking.date)} at {booking.time}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium', getBookingStatusColor(booking.status))}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bookings */}
              {activeTab === 'bookings' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold font-heading">My Bookings</h2>
                    <Link
                      href="/book"
                      className="gradient-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg transition-all"
                    >
                      Book New Service
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {sampleBookings.map((booking) => (
                      <div key={booking.id} className="glass rounded-2xl border p-5 hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-semibold">{booking.service}</span>
                              <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', getBookingStatusColor(booking.status))}>
                                {booking.status}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">Booking ID: {booking.id}</p>
                          </div>
                          <span className="text-lg font-bold text-accent">{booking.price}</span>
                        </div>

                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {formatDate(booking.date)} {booking.time}
                          </span>
                          {booking.technician && (
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" /> {booking.technician}
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2 mt-4 pt-3 border-t">
                          <button className="px-4 py-2 rounded-xl bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                            Track
                          </button>
                          <button className="px-4 py-2 rounded-xl bg-muted text-xs font-medium hover:bg-muted/80 transition-colors">
                            Invoice
                          </button>
                          <button className="px-4 py-2 rounded-xl bg-muted text-xs font-medium hover:bg-muted/80 transition-colors">
                            Support
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Profile */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold font-heading mb-6">My Profile</h2>
                  <div className="glass rounded-2xl border p-6 max-w-2xl">
                    <div className="space-y-5">
                      {[
                        { label: 'Full Name', value: 'Rahul Sharma', editable: true },
                        { label: 'Phone', value: '+91 98765 43210' },
                        { label: 'Email', value: 'rahul@example.com', editable: true },
                        { label: 'Address', value: '123, Sector 14, Rohini, Delhi - 110085', editable: true },
                      ].map((field) => (
                        <div key={field.label}>
                          <label className="block text-sm text-muted-foreground mb-1">{field.label}</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              defaultValue={field.value}
                              disabled={!field.editable}
                              className="flex-1 px-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed"
                            />
                            {field.editable && (
                              <button className="px-4 py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                                Edit
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      <button className="w-full gradient-primary text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all mt-4">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Invoices Tab */}
              {activeTab === 'invoices' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold font-heading">Invoices</h2>
                    <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg">
                      {sampleInvoices.filter(i => i.status === 'UNPAID' || i.status === 'PENDING').length} pending
                    </div>
                  </div>

                  <div className="space-y-4">
                    {sampleInvoices.map((invoice) => (
                      <div key={invoice.id} className="glass rounded-2xl border p-5 hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-semibold">{invoice.service}</span>
                                <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', getInvoiceStatusColor(invoice.status))}>
                                  {invoice.status}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground">Invoice #{invoice.id}</p>
                            </div>
                          </div>
                          <span className="text-lg font-bold text-accent">{invoice.amount}</span>
                        </div>

                        <div className="mb-3">
                          <p className="text-xs text-muted-foreground mb-1.5">Service Items</p>
                          <div className="flex flex-wrap gap-1.5">
                            {invoice.items.map((item, i) => (
                              <span key={i} className="px-2.5 py-1 rounded-lg bg-muted/50 text-xs text-muted-foreground">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDate(invoice.date)}
                          </span>
                          <div className="flex gap-2">
                            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                              <Download className="w-3.5 h-3.5" />
                              Download
                            </button>
                            {invoice.status !== 'PAID' && (
                              <button className="px-4 py-2 rounded-xl gradient-primary text-white text-xs font-medium hover:shadow-lg transition-all">
                                Pay Now
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold font-heading">Reviews</h2>
                    <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg">
                      {reviews.length} reviews
                    </div>
                  </div>

                  {/* Write a Review */}
                  <div className="glass rounded-2xl border p-5 mb-6">
                    <h3 className="font-semibold text-sm mb-3">Write a Review</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              className={cn(
                                'w-5 h-5',
                                star <= newReview.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-muted-foreground'
                              )}
                            />
                          </button>
                        ))}
                        <span className="text-xs text-muted-foreground ml-2">
                          {newReview.rating === 5 ? 'Excellent' :
                           newReview.rating === 4 ? 'Good' :
                           newReview.rating === 3 ? 'Average' :
                           newReview.rating === 2 ? 'Poor' : 'Terrible'}
                        </span>
                      </div>
                      <textarea
                        placeholder="Share your experience with the service..."
                        value={newReview.comment}
                        onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                      <div className="flex justify-end">
                        <button
                          onClick={() => {
                            if (newReview.comment.trim()) {
                              setReviews(prev => [{
                                id: Date.now(),
                                service: 'New Service',
                                technician: 'You',
                                rating: newReview.rating,
                                date: new Date().toISOString().split('T')[0],
                                comment: newReview.comment.trim(),
                              }, ...prev]);
                              setNewReview({ rating: 5, comment: '' });
                            }
                          }}
                          disabled={!newReview.comment.trim()}
                          className="flex items-center gap-2 gradient-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <SendHorizonal className="w-4 h-4" />
                          Submit Review
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Past Reviews */}
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="glass rounded-2xl border p-5 hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                              <MessageSquare className="w-5 h-5 text-yellow-500" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold">{review.service}</p>
                              <p className="text-xs text-muted-foreground">by {review.technician}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={cn(
                                  'w-3.5 h-3.5',
                                  star <= review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-muted-foreground/30'
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {formatDate(review.date)}
                          <span className="flex items-center gap-1 ml-2">
                            <ThumbsUp className="w-3 h-3" />
                            Helpful
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold font-heading">Notifications</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg">
                        {notifications.filter(n => !n.read).length} unread
                      </span>
                      {notifications.some(n => !n.read) && (
                        <button
                          onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                          className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {notifications.map((notif) => {
                      const Icon = notificationIcons[notif.type];
                      const colorClass = notificationColors[notif.type];
                      return (
                        <div
                          key={notif.id}
                          onClick={() => setNotifications(prev =>
                            prev.map(n => n.id === notif.id ? { ...n, read: true } : n)
                          )}
                          className={cn(
                            'glass rounded-2xl border p-4 flex items-start gap-3 cursor-pointer transition-all hover:shadow-lg',
                            !notif.read && 'border-primary/20 bg-primary/[0.02]'
                          )}
                        >
                          <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', colorClass)}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-0.5">
                              <div className="flex items-center gap-2">
                                <p className={cn('text-sm', !notif.read ? 'font-semibold' : 'font-medium')}>
                                  {notif.title}
                                </p>
                                {!notif.read && (
                                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {formatNotificationDate(notif.date)}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground/80 mt-0.5">{notif.message}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}