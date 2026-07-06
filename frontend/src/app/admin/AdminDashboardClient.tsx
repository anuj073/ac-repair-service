'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, CalendarDays, Users, Wrench, IndianRupee,
  Ticket, Settings, BarChart3, Bell, Download, Plus,
  Search, Filter, ChevronDown, TrendingUp, UserCheck, Clock,
  Star, DollarSign,
} from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';

const adminTabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'bookings', label: 'Bookings', icon: CalendarDays },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'technicians', label: 'Technicians', icon: UserCheck },
  { id: 'services', label: 'Services', icon: Wrench },
  { id: 'revenue', label: 'Revenue', icon: IndianRupee },
  { id: 'coupons', label: 'Coupons', icon: Ticket },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function AdminDashboardClient() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen pt-20 pb-16 bg-muted/30">
      <div className="container-wide mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold font-heading">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your AC repair business</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-xl bg-background border hover:bg-muted transition-colors">
              <Download className="w-4 h-4" />
            </button>
            <button className="p-2.5 rounded-xl bg-background border hover:bg-muted transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-white text-sm font-bold shadow-lg">
              A
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-56 flex-shrink-0">
            <nav className="glass rounded-2xl border p-2 sticky top-28 space-y-1">
              {adminTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : 'text-muted-foreground hover:bg-muted/50'
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Overview */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'Total Revenue', value: '₹12,45,000', icon: DollarSign, change: '+12%', color: 'from-primary/20 to-primary/5' },
                      { label: 'Total Bookings', value: '1,234', icon: CalendarDays, change: '+8%', color: 'from-accent/20 to-accent/5' },
                      { label: 'Active Customers', value: '856', icon: Users, change: '+15%', color: 'from-secondary/20 to-secondary/5' },
                      { label: 'Technicians', value: '24', icon: UserCheck, change: '+2', color: 'from-primary/20 to-primary/5' },
                    ].map((stat, i) => (
                      <div key={i} className="glass rounded-2xl border p-5 hover:shadow-lg transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <div className={cn('w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center', stat.color)}>
                            <stat.icon className="w-5 h-5 text-primary" />
                          </div>
                          <span className="text-xs text-accent font-medium bg-accent/10 px-2 py-1 rounded-full">
                            {stat.change}
                          </span>
                        </div>
                        <div className="text-xl font-bold">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Charts placeholder */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="glass rounded-2xl border p-6">
                      <h3 className="font-semibold mb-4">Revenue Overview</h3>
                      <div className="h-48 flex items-end justify-between gap-2">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
                          <div key={month} className="flex-1 flex flex-col items-center gap-1">
                            <div
                              className="w-full gradient-primary rounded-t-lg transition-all hover:opacity-80"
                              style={{ height: `${20 + Math.random() * 80}%` }}
                            />
                            <span className="text-[10px] text-muted-foreground">{month.slice(0, 3)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass rounded-2xl border p-6">
                      <h3 className="font-semibold mb-4">Recent Bookings</h3>
                      <div className="space-y-3">
                        {[
                          { id: 'ACR-10001', customer: 'Rahul S.', service: 'Split AC Repair', status: 'COMPLETED', price: '₹299' },
                          { id: 'ACR-10002', customer: 'Priya M.', service: 'Deep Cleaning', status: 'WORKING', price: '₹799' },
                          { id: 'ACR-10003', customer: 'Amit K.', service: 'Installation', status: 'CONFIRMED', price: '₹999' },
                          { id: 'ACR-10004', customer: 'Neha G.', service: 'Gas Filling', status: 'PENDING', price: '₹1,999' },
                        ].map((booking) => (
                          <div key={booking.id} className="flex items-center justify-between py-2 border-b last:border-0">
                            <div>
                              <p className="text-sm font-medium">{booking.customer}</p>
                              <p className="text-xs text-muted-foreground">{booking.service}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold">{booking.price}</p>
                              <p className={cn(
                                'text-xs',
                                booking.status === 'COMPLETED' ? 'text-accent' :
                                booking.status === 'WORKING' ? 'text-secondary' :
                                booking.status === 'CONFIRMED' ? 'text-primary' : 'text-yellow-500'
                              )}>{booking.status}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="glass rounded-2xl border p-6">
                    <h3 className="font-semibold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: 'Add Service', icon: Plus },
                        { label: 'Add Technician', icon: UserCheck },
                        { label: 'Create Coupon', icon: Ticket },
                        { label: 'Export Report', icon: Download },
                      ].map((action) => (
                        <button
                          key={action.label}
                          className="flex items-center gap-2 px-4 py-3 rounded-xl border hover:bg-muted/50 transition-colors text-sm font-medium"
                        >
                          <action.icon className="w-4 h-4 text-primary" />
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Other tabs placeholder */}
              {activeTab !== 'overview' && (
                <div className="glass rounded-2xl border p-16 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} management coming soon</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}