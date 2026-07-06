'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase, IndianRupee, User, Users, MapPin, Phone, Clock,
  ChevronRight, Camera, CheckCircle, Circle, ArrowRight,
  Star, CalendarDays, TrendingUp, DollarSign, Wrench,
  Home, Navigation, Settings, LogOut, AlertCircle,
} from 'lucide-react';
import { cn, formatDate, formatPrice, getInitials } from '@/lib/utils';

/* ─── Types ─────────────────────────────────────────── */
type JobStatus = 'ASSIGNED' | 'ON_THE_WAY' | 'WORKING' | 'COMPLETED';
type TabId = 'jobs' | 'earnings' | 'profile';

interface AssignedJob {
  id: string;
  customer: string;
  phone: string;
  address: string;
  service: string;
  date: string;
  time: string;
  status: JobStatus;
  notes: string;
  rating?: number;
}

/* ─── Status flow ───────────────────────────────────── */
const STATUS_FLOW: JobStatus[] = ['ASSIGNED', 'ON_THE_WAY', 'WORKING', 'COMPLETED'];
const STATUS_LABELS: Record<JobStatus, string> = {
  ASSIGNED: 'Assigned',
  ON_THE_WAY: 'On My Way',
  WORKING: 'Working',
  COMPLETED: 'Completed',
};

const NEXT_STATUS: Record<JobStatus, JobStatus | null> = {
  ASSIGNED: 'ON_THE_WAY',
  ON_THE_WAY: 'WORKING',
  WORKING: 'COMPLETED',
  COMPLETED: null,
};

const STATUS_BADGE: Record<JobStatus, string> = {
  ASSIGNED: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
  ON_THE_WAY: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  WORKING: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  COMPLETED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
};

const STATUS_ICON: Record<JobStatus, typeof Circle> = {
  ASSIGNED: Circle,
  ON_THE_WAY: Navigation,
  WORKING: Wrench,
  COMPLETED: CheckCircle,
};

/* ─── Tabs ──────────────────────────────────────────── */
const tabs = [
  { id: 'jobs' as TabId, label: "Today's Jobs", icon: Briefcase },
  { id: 'earnings' as TabId, label: 'My Earnings', icon: IndianRupee },
  { id: 'profile' as TabId, label: 'My Profile', icon: User },
];

/* ─── Sample data ───────────────────────────────────── */
const sampleJobs: AssignedJob[] = [
  {
    id: 'ACR-10105',
    customer: 'Rahul Sharma',
    phone: '+91 98765 43210',
    address: 'B-204, Green Valley Apts, Sector 18, Noida',
    service: 'Split AC Compressor Repair',
    date: '2026-07-08',
    time: '09:00-11:00',
    status: 'ASSIGNED',
    notes: 'Customer reports loud noise from outdoor unit. Possible compressor issue.',
  },
  {
    id: 'ACR-10106',
    customer: 'Priya Mehta',
    phone: '+91 87654 32109',
    address: '55, Sunshine Apartments, Indirapuram, Ghaziabad',
    service: 'AC Deep Cleaning (2 Units)',
    date: '2026-07-08',
    time: '11:30-13:30',
    status: 'ON_THE_WAY',
    notes: 'Both units need thorough cleaning. Customer has pets — expect extra dust.',
  },
  {
    id: 'ACR-10107',
    customer: 'Amit Kapoor',
    phone: '+91 76543 21098',
    address: '1212, Sector 44, Near Huda City Centre, Gurgaon',
    service: 'Gas Filling & Leak Check',
    date: '2026-07-08',
    time: '14:00-15:30',
    status: 'WORKING',
    notes: 'Low cooling reported. Leak suspected at condenser coil.',
  },
  {
    id: 'ACR-10108',
    customer: 'Sneha Patel',
    phone: '+91 65432 10987',
    address: '3rd Floor, C-89, Lajpat Nagar II, Delhi',
    service: 'Window AC Installation',
    date: '2026-07-08',
    time: '16:00-18:00',
    status: 'ASSIGNED',
    notes: 'New 1.5 ton window unit. Customer has provided mounting bracket.',
  },
  {
    id: 'ACR-10109',
    customer: 'Vikram Singh',
    phone: '+91 54321 09876',
    address: '78, Sunrise Villa, Raj Nagar, Ghaziabad',
    service: 'Annual Maintenance Service',
    date: '2026-07-07',
    time: '10:00-11:00',
    status: 'COMPLETED',
    notes: 'Routine AMC. Filter cleaning, gas pressure check, coil cleaning done.',
    rating: 5,
  },
  {
    id: 'ACR-10110',
    customer: 'Neha Gupta',
    phone: '+91 43210 98765',
    address: 'D-12, Pushpanjali Farms, Sector 10, Dwarka',
    service: 'Inverter AC PCB Repair',
    date: '2026-07-07',
    time: '15:00-16:30',
    status: 'COMPLETED',
    notes: 'PCB board replacement done. System working normally.',
    rating: 4,
  },
];

const earningsData = {
  today: '₹4,200',
  week: '₹18,500',
  month: '₹72,300',
  totalJobs: 42,
  avgRating: 4.7,
  pendingPayout: '₹12,500',
};

/* ─── Helpers ────────────────────────────────────────── */
function getProgressPercent(status: JobStatus): number {
  const idx = STATUS_FLOW.indexOf(status);
  return ((idx + 1) / STATUS_FLOW.length) * 100;
}

/* ─── Component ──────────────────────────────────────── */
export default function TechnicianDashboardClient() {
  const [activeTab, setActiveTab] = useState<TabId>('jobs');
  const [jobs, setJobs] = useState(sampleJobs);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const advanceStatus = (jobId: string) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id !== jobId) return j;
        const next = NEXT_STATUS[j.status];
        return next ? { ...j, status: next } : j;
      })
    );
  };

  const activeJobs = jobs.filter((j) => j.status !== 'COMPLETED');
  const completedJobs = jobs.filter((j) => j.status === 'COMPLETED');
  const selected = jobs.find((j) => j.id === selectedJob);

  return (
    <div className="min-h-screen pt-20 pb-16 bg-muted/30">
      <div className="container-wide mx-auto px-4 sm:px-6">
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold font-heading">Technician Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, Vikram — you have {activeJobs.length} job{activeJobs.length !== 1 ? 's' : ''} today</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-xl bg-background border hover:bg-muted transition-colors" title="Notifications">
              <Clock className="w-4 h-4" />
            </button>
            <button className="p-2.5 rounded-xl bg-background border hover:bg-muted transition-colors" title="Settings">
              <Settings className="w-4 h-4" />
            </button>
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-white text-sm font-bold shadow-lg">
              V
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Sidebar ── */}
          <div className="lg:w-56 flex-shrink-0">
            <nav className="glass rounded-2xl border p-2 sticky top-28 space-y-1">
              {/* Tech info card */}
              <div className="text-center p-3 border-b mb-2">
                <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-2 text-white text-lg font-bold shadow-lg">
                  VK
                </div>
                <h3 className="font-semibold text-sm">Vikram Kumar</h3>
                <p className="text-[10px] text-muted-foreground">Senior Technician</p>
                <div className="flex items-center justify-center gap-1 mt-1.5 text-yellow-500">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-xs font-medium text-muted-foreground">4.7</span>
                </div>
              </div>

              {tabs.map((tab) => (
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
                  {tab.id === 'jobs' && activeJobs.length > 0 && (
                    <span className="ml-auto text-[10px] bg-white/20 text-white rounded-full px-1.5 py-0.5 font-bold">
                      {activeJobs.length}
                    </span>
                  )}
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

          {/* ── Main Content ── */}
          <div className="flex-1 min-w-0">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* ════════════════════════════════════════════
                  TODAY'S JOBS
              ════════════════════════════════════════════ */}
              {activeTab === 'jobs' && (
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Job list */}
                  <div className="flex-1 min-w-0 space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold font-heading">Today's Jobs</h2>
                      <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        {formatDate(new Date().toISOString())}
                      </span>
                    </div>

                    {/* Active jobs */}
                    {activeJobs.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          Active — {activeJobs.length}
                        </p>
                        {activeJobs.map((job) => {
                          const StatusIcon = STATUS_ICON[job.status];
                          const isSelected = selectedJob === job.id;
                          return (
                            <motion.div
                              key={job.id}
                              layout
                              onClick={() => setSelectedJob(isSelected ? null : job.id)}
                              className={cn(
                                'glass rounded-2xl border p-4 cursor-pointer transition-all hover:shadow-md',
                                isSelected && 'ring-2 ring-primary shadow-lg'
                              )}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3 flex-1 min-w-0">
                                  <div className={cn(
                                    'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                                    job.status === 'COMPLETED' ? 'bg-green-100 dark:bg-green-900/20' :
                                    job.status === 'WORKING' ? 'bg-orange-100 dark:bg-orange-900/20' :
                                    job.status === 'ON_THE_WAY' ? 'bg-purple-100 dark:bg-purple-900/20' :
                                    'bg-indigo-100 dark:bg-indigo-900/20'
                                  )}>
                                    <StatusIcon className={cn(
                                      'w-5 h-5',
                                      job.status === 'COMPLETED' ? 'text-green-600' :
                                      job.status === 'WORKING' ? 'text-orange-600' :
                                      job.status === 'ON_THE_WAY' ? 'text-purple-600' :
                                      'text-indigo-600'
                                    )} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h3 className="font-medium text-sm truncate">{job.customer}</h3>
                                      <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-medium', STATUS_BADGE[job.status])}>
                                        {STATUS_LABELS[job.status]}
                                      </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-0.5">{job.service}</p>
                                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted-foreground">
                                      <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {job.time}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {job.address.split(',')[0]}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <ChevronRight className={cn(
                                  'w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform mt-2',
                                  isSelected && 'rotate-90'
                                )} />
                              </div>

                              {/* Progress bar */}
                              {job.status !== 'COMPLETED' && (
                                <div className="mt-3">
                                  <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                                    <span>Progress</span>
                                    <span>{STATUS_FLOW.indexOf(job.status) + 1}/{STATUS_FLOW.length}</span>
                                  </div>
                                  <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                                    <div
                                      className={cn(
                                        'h-full rounded-full transition-all duration-500',
                                        job.status === 'ASSIGNED' && 'bg-indigo-500',
                                        job.status === 'ON_THE_WAY' && 'bg-purple-500',
                                        job.status === 'WORKING' && 'bg-orange-500',
                                      )}
                                      style={{ width: `${getProgressPercent(job.status)}%` }}
                                    />
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    )}

                    {/* Completed jobs summary */}
                    {completedJobs.length > 0 && (
                      <div className="mt-6">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Completed Today</p>
                        <div className="space-y-2">
                          {completedJobs.map((job) => (
                            <div key={job.id} className="glass rounded-2xl border p-3 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{job.customer}</p>
                                  <p className="text-xs text-muted-foreground">{job.service}</p>
                                </div>
                              </div>
                              {job.rating && (
                                <div className="flex items-center gap-1 text-yellow-500">
                                  <Star className="w-3.5 h-3.5 fill-current" />
                                  <span className="text-xs font-medium">{job.rating}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeJobs.length === 0 && completedJobs.length === 0 && (
                      <div className="glass rounded-2xl border p-16 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                          <Briefcase className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground">No jobs assigned today</p>
                      </div>
                    )}
                  </div>

                  {/* Job detail panel */}
                  {selected && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="lg:w-96 flex-shrink-0"
                    >
                      <div className="glass rounded-2xl border p-5 sticky top-28 space-y-5">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Job Details</h3>
                          <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-medium', STATUS_BADGE[selected.status])}>
                            {STATUS_LABELS[selected.status]}
                          </span>
                        </div>

                        {/* Customer info */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                              <User className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{selected.customer}</p>
                              <p className="text-xs text-muted-foreground">Job ID: {selected.id}</p>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                              <a href={`tel:${selected.phone}`} className="hover:text-primary transition-colors">
                                {selected.phone}
                              </a>
                            </div>
                            <div className="flex items-start gap-2 text-muted-foreground">
                              <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                              <span className="text-xs">{selected.address}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                              <span className="text-xs">{selected.time}</span>
                            </div>
                          </div>
                        </div>

                        {/* Service info */}
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Service</p>
                          <p className="text-sm font-medium">{selected.service}</p>
                        </div>

                        {/* Notes */}
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Notes</p>
                          <div className="bg-muted/50 rounded-xl p-3">
                            <p className="text-xs">{selected.notes}</p>
                          </div>
                        </div>

                        {/* Status stepper */}
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">Status Flow</p>
                          <div className="space-y-2">
                            {STATUS_FLOW.map((s, i) => {
                              const currentIdx = STATUS_FLOW.indexOf(selected.status);
                              const isDone = i <= currentIdx;
                              const isCurrent = s === selected.status;
                              return (
                                <div key={s} className="flex items-center gap-3">
                                  <div className={cn(
                                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                                    isDone && !isCurrent && 'bg-green-500 text-white',
                                    isCurrent && 'ring-2 ring-offset-2 ring-primary',
                                    isCurrent && s === 'ASSIGNED' && 'bg-indigo-500 text-white',
                                    isCurrent && s === 'ON_THE_WAY' && 'bg-purple-500 text-white',
                                    isCurrent && s === 'WORKING' && 'bg-orange-500 text-white',
                                    isCurrent && s === 'COMPLETED' && 'bg-green-500 text-white',
                                    !isDone && 'bg-muted text-muted-foreground'
                                  )}>
                                    {isDone && !isCurrent ? <CheckCircle className="w-3 h-3" /> : i + 1}
                                  </div>
                                  <span className={cn(
                                    'text-xs',
                                    isCurrent && 'font-semibold',
                                    !isDone && 'text-muted-foreground'
                                  )}>
                                    {STATUS_LABELS[s]}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Status transition button */}
                        {NEXT_STATUS[selected.status] && (
                          <button
                            onClick={() => advanceStatus(selected.id)}
                            className={cn(
                              'w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all hover:shadow-lg',
                              selected.status === 'ASSIGNED' && 'gradient-primary text-white',
                              selected.status === 'ON_THE_WAY' && 'bg-purple-600 text-white',
                              selected.status === 'WORKING' && 'bg-green-600 text-white',
                            )}
                          >
                            <ArrowRight className="w-4 h-4" />
                            Mark as {STATUS_LABELS[NEXT_STATUS[selected.status]!]}
                          </button>
                        )}

                        {/* Image upload placeholders */}
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">Photos</p>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="aspect-square rounded-xl border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
                              <Camera className="w-5 h-5 text-muted-foreground" />
                              <span className="text-[10px] text-muted-foreground">Before</span>
                            </div>
                            <div className="aspect-square rounded-xl border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
                              <Camera className="w-5 h-5 text-muted-foreground" />
                              <span className="text-[10px] text-muted-foreground">After</span>
                            </div>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-2 pt-1">
                          <a
                            href={`tel:${selected.phone}`}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border bg-background text-sm font-medium hover:bg-muted transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            Call
                          </a>
                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(selected.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border bg-background text-sm font-medium hover:bg-muted transition-colors"
                          >
                            <Navigation className="w-4 h-4" />
                            Navigate
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ════════════════════════════════════════════
                  MY EARNINGS
              ════════════════════════════════════════════ */}
              {activeTab === 'earnings' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold font-heading">My Earnings</h2>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Today's Earnings", value: earningsData.today, icon: DollarSign, color: 'from-primary/20 to-primary/5', change: '+₹1,200 vs yesterday' },
                      { label: 'This Week', value: earningsData.week, icon: TrendingUp, color: 'from-accent/20 to-accent/5', change: '+15% vs last week' },
                      { label: 'This Month', value: earningsData.month, icon: IndianRupee, color: 'from-secondary/20 to-secondary/5', change: '+8% vs last month' },
                      { label: 'Pending Payout', value: earningsData.pendingPayout, icon: Clock, color: 'from-amber-200/20 to-amber-100/5', change: 'Next payout: Fri' },
                    ].map((stat, i) => (
                      <div key={i} className="glass rounded-2xl border p-5 hover:shadow-lg transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <div className={cn('w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center', stat.color)}>
                            <stat.icon className="w-5 h-5 text-primary" />
                          </div>
                          <span className="text-[10px] text-accent font-medium bg-accent/10 px-2 py-1 rounded-full">
                            {stat.change}
                          </span>
                        </div>
                        <div className="text-xl font-bold">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Chart placeholder + summary */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Chart */}
                    <div className="glass rounded-2xl border p-6">
                      <h3 className="font-semibold mb-1">Weekly Earnings</h3>
                      <p className="text-xs text-muted-foreground mb-6">Last 7 days</p>
                      <div className="h-44 flex items-end justify-between gap-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                          const heights = [45, 62, 38, 75, 55, 80, 40];
                          return (
                            <div key={day} className="flex-1 flex flex-col items-center gap-1.5">
                              <div
                                className="w-full rounded-t-lg bg-gradient-to-t from-primary to-primary/60 transition-all hover:from-primary/80"
                                style={{ height: `${heights[i]}%` }}
                              />
                              <span className="text-[10px] text-muted-foreground">{day}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Performance summary */}
                    <div className="glass rounded-2xl border p-6">
                      <h3 className="font-semibold mb-4">Performance Summary</h3>
                      <div className="space-y-4">
                        {[
                          { label: 'Total Jobs Completed', value: earningsData.totalJobs, icon: Briefcase },
                          { label: 'Average Rating', value: earningsData.avgRating, icon: Star, suffix: '/5' },
                          { label: 'On-Time Arrival', value: '94%', icon: Clock },
                          { label: 'Repeat Customers', value: '68%', icon: Users },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center justify-between py-2 border-b last:border-0">
                            <div className="flex items-center gap-2">
                              <item.icon className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{item.label}</span>
                            </div>
                            <span className="text-sm font-semibold">{item.value}{'suffix' in item ? (item as any).suffix : ''}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recent payouts table */}
                  <div className="glass rounded-2xl border p-6">
                    <h3 className="font-semibold mb-4">Recent Payouts</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b text-xs text-muted-foreground uppercase tracking-wider">
                            <th className="text-left py-3 pr-4 font-medium">Job ID</th>
                            <th className="text-left py-3 pr-4 font-medium">Customer</th>
                            <th className="text-left py-3 pr-4 font-medium">Service</th>
                            <th className="text-right py-3 font-medium">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {completedJobs.map((job, i) => (
                            <tr key={job.id} className="border-b last:border-0">
                              <td className="py-3 pr-4 text-muted-foreground">{job.id}</td>
                              <td className="py-3 pr-4 font-medium">{job.customer}</td>
                              <td className="py-3 pr-4 text-muted-foreground">{job.service}</td>
                              <td className="py-3 text-right font-semibold text-accent">
                                {['₹399', '₹799', '₹1,299', '₹599', '₹2,199', '₹899'][i] || '₹499'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {completedJobs.length === 0 && (
                      <p className="text-center text-muted-foreground py-6">No payouts yet</p>
                    )}
                  </div>
                </div>
              )}

              {/* ════════════════════════════════════════════
                  MY PROFILE
              ════════════════════════════════════════════ */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold font-heading">My Profile</h2>

                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Profile card */}
                    <div className="lg:col-span-1">
                      <div className="glass rounded-2xl border p-6 text-center sticky top-28">
                        <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold shadow-lg">
                          VK
                        </div>
                        <h3 className="font-semibold text-lg">Vikram Kumar</h3>
                        <p className="text-sm text-muted-foreground mb-2">Senior Technician</p>
                        <div className="flex items-center justify-center gap-1 text-yellow-500 mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={cn('w-4 h-4', i < 4 ? 'fill-current' : 'fill-none opacity-30')} />
                          ))}
                          <span className="text-sm text-muted-foreground ml-1">4.7</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5" />
                            Delhi NCR
                          </div>
                          <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <Briefcase className="w-3.5 h-3.5" />
                            3 years experience
                          </div>
                          <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <CheckCircle className="w-3.5 h-3.5" />
                            42 jobs completed
                          </div>
                        </div>
                        <div className="mt-5 pt-4 border-t">
                          <div className="flex justify-center gap-2 flex-wrap">
                            {['Split AC', 'Window AC', 'Inverter AC', 'Gas Filling'].map((skill) => (
                              <span key={skill} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-medium">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Edit form */}
                    <div className="lg:col-span-2">
                      <div className="glass rounded-2xl border p-6">
                        <h3 className="font-semibold mb-5">Personal Information</h3>
                        <div className="space-y-4">
                          {[
                            { label: 'Full Name', value: 'Vikram Kumar', editable: true },
                            { label: 'Phone', value: '+91 98765 43210', editable: false },
                            { label: 'Email', value: 'vikram.kumar@coolfixpro.com', editable: true },
                            { label: 'Service Area', value: 'Delhi NCR (Noida, Gurgaon, Ghaziabad)', editable: true },
                            { label: 'UPI ID', value: 'vikram@paytm', editable: true },
                            { label: 'Bank Account', value: 'XXXXXX1234 (ICICI Bank)', editable: true },
                          ].map((field) => (
                            <div key={field.label}>
                              <label className="block text-xs text-muted-foreground mb-1">{field.label}</label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  defaultValue={field.value}
                                  disabled={!field.editable}
                                  className="flex-1 px-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 disabled:cursor-not-allowed"
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

                      {/* Availability toggle */}
                      <div className="glass rounded-2xl border p-6 mt-6">
                        <h3 className="font-semibold mb-4">Availability</h3>
                        <div className="space-y-4">
                          {[
                            { day: 'Monday', active: true, hours: '9:00 AM - 6:00 PM' },
                            { day: 'Tuesday', active: true, hours: '9:00 AM - 6:00 PM' },
                            { day: 'Wednesday', active: true, hours: '9:00 AM - 6:00 PM' },
                            { day: 'Thursday', active: true, hours: '9:00 AM - 6:00 PM' },
                            { day: 'Friday', active: true, hours: '9:00 AM - 6:00 PM' },
                            { day: 'Saturday', active: true, hours: '10:00 AM - 4:00 PM' },
                            { day: 'Sunday', active: false, hours: 'Off' },
                          ].map((d) => (
                            <div key={d.day} className="flex items-center justify-between py-2 border-b last:border-0">
                              <div className="flex items-center gap-3">
                                <div className={cn(
                                  'w-2 h-2 rounded-full',
                                  d.active ? 'bg-green-500' : 'bg-muted-foreground/30'
                                )} />
                                <span className="text-sm font-medium">{d.day}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">{d.hours}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
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