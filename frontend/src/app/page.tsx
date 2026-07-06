'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight, Phone, Shield, Clock, Star, MapPin, Wrench, CheckCircle,
  ChevronRight, Users, Award, Building2, Truck,
} from 'lucide-react';
import ServiceCard from '@/components/home/ServiceCard';
import StatsCounter from '@/components/home/StatsCounter';
import BrandMarquee from '@/components/home/BrandMarquee';
import ReviewCard from '@/components/home/ReviewCard';
import FAQSection from '@/components/home/FAQSection';
import HowItWorks from '@/components/home/HowItWorks';
import { services, testimonials } from '@/lib/data';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1, delayChildren: 0.2 },
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }} />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />

          {/* Floating Icons */}
          {[
            { icon: Wrench, x: '15%', y: '25%', delay: 0 },
            { icon: Shield, x: '85%', y: '30%', delay: 1.5 },
            { icon: Clock, x: '10%', y: '70%', delay: 3 },
            { icon: Star, x: '90%', y: '75%', delay: 2 },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="absolute hidden lg:block"
              style={{ left: item.x, top: item.y }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 4,
                delay: item.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="w-14 h-14 rounded-2xl bg-white/80 dark:bg-white/10 backdrop-blur-sm shadow-xl flex items-center justify-center border border-white/20">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="container-wide mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                <span>Trusted by 10,000+ Happy Customers</span>
              </div>

              <h1 className="text-responsive-hero font-bold font-heading text-balance mb-6 leading-tight">
                Professional{' '}
                <span className="gradient-text">AC Repair</span>
                {' '}Service at Your Doorstep
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed text-balance">
                Same-day service, certified technicians, transparent pricing.
                Your comfort is our priority. Book in just 30 seconds!
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  href="/book"
                  className="group inline-flex items-center gap-2 gradient-primary text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 hover:scale-105"
                >
                  Book Now
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <a
                  href="tel:+9118001234567"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-primary/20 text-foreground font-semibold hover:bg-primary/5 transition-all duration-300 glass"
                >
                  <Phone className="w-5 h-5 text-accent" />
                  Call Now
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6">
                {[
                  { icon: Clock, text: 'Same Day Service' },
                  { icon: Users, text: 'Certified Pros' },
                  { icon: Award, text: '30-Day Warranty' },
                ].map((badge, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <badge.icon className="w-4 h-4 text-accent" />
                    {badge.text}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Hero Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                {/* Main Card */}
                <div className="w-[450px] h-[500px] rounded-3xl glass shadow-2xl border relative overflow-hidden">
                  <div className="p-8">
                    <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-xl">
                      <Wrench className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold font-heading mb-3">Quick Service</h3>
                    <p className="text-muted-foreground mb-6">Same-day AC repair with certified technicians</p>

                    <div className="space-y-4">
                      {[
                        { label: 'Response Time', value: '< 2 Hours', color: 'bg-accent' },
                        { label: 'Satisfaction', value: '4.9/5', color: 'bg-primary' },
                        { label: 'Warranty', value: '30 Days', color: 'bg-secondary' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                          <span className="text-sm text-muted-foreground">{item.label}</span>
                          <span className="text-sm font-semibold">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-accent/10 backdrop-blur-sm border border-accent/20 flex items-center justify-center shadow-xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">4.9</div>
                      <div className="flex gap-0.5 justify-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8 p-4 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-white/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center text-white font-bold text-sm">
                        AK
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Verified Technician</p>
                        <p className="text-xs text-muted-foreground">5+ years experience</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-accent ml-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Search / Pincode Check */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <div className="glass rounded-2xl shadow-xl p-4 border">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Enter your pincode to check availability..."
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    maxLength={6}
                  />
                </div>
                <button className="gradient-primary text-white px-8 py-3.5 rounded-xl font-semibold text-sm whitespace-nowrap hover:shadow-lg transition-all">
                  Check Availability
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container-wide mx-auto relative">
          <motion.div className="text-center max-w-3xl mx-auto mb-16" {...fadeInUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Wrench className="w-4 h-4" />
              <span>Our Services</span>
            </div>
            <h2 className="text-responsive-h2 font-bold font-heading mb-4">
              Professional AC & Appliance{' '}
              <span className="gradient-text">Repair Services</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              From split AC repair to complete installation – we handle all your cooling needs
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            {...staggerContainer}
          >
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} index={index} />
            ))}
          </motion.div>

          <motion.div className="text-center mt-12" {...fadeInUp}>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 group text-primary font-semibold hover:gap-3 transition-all"
            >
              View All Services
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container-wide mx-auto relative">
          <motion.div className="text-center max-w-3xl mx-auto mb-16" {...fadeInUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <Shield className="w-4 h-4" />
              <span>Why Choose Us</span>
            </div>
            <h2 className="text-responsive-h2 font-bold font-heading mb-4">
              Why Customers{' '}
              <span className="gradient-text">Trust Us</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: 'Verified Engineers',
                desc: 'All our technicians are background-verified and highly trained',
                color: 'from-primary/20 to-primary/5',
                iconColor: 'text-primary',
              },
              {
                icon: Shield,
                title: 'Original Spare Parts',
                desc: 'We use only genuine OEM parts for all repairs',
                color: 'from-accent/20 to-accent/5',
                iconColor: 'text-accent',
              },
              {
                icon: Award,
                title: '30-Day Warranty',
                desc: 'Every service comes with a 30-day service warranty guarantee',
                color: 'from-secondary/20 to-secondary/5',
                iconColor: 'text-secondary',
              },
              {
                icon: Clock,
                title: 'Same Day Service',
                desc: 'Book before 2 PM and get same-day doorstep service',
                color: 'from-primary/20 to-primary/5',
                iconColor: 'text-primary',
              },
              {
                icon: Truck,
                title: 'Quick Arrival',
                desc: 'Technician arrives within 2 hours of booking confirmation',
                color: 'from-accent/20 to-accent/5',
                iconColor: 'text-accent',
              },
              {
                icon: Star,
                title: 'Transparent Pricing',
                desc: 'No hidden charges. Pay only what you see on the bill',
                color: 'from-secondary/20 to-secondary/5',
                iconColor: 'text-secondary',
              },
              {
                icon: Building2,
                title: 'Pan-India Service',
                desc: 'Available in 12+ major cities across India',
                color: 'from-primary/20 to-primary/5',
                iconColor: 'text-primary',
              },
              {
                icon: Phone,
                title: '24/7 Support',
                desc: 'Round-the-clock customer support for emergencies',
                color: 'from-accent/20 to-accent/5',
                iconColor: 'text-accent',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-6 rounded-2xl glass border hover:shadow-xl card-hover"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                  <item.icon className={`w-7 h-7 ${item.iconColor}`} />
                </div>
                <h3 className="font-semibold font-heading mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 glass rounded-3xl p-8 md:p-12 border shadow-xl"
          >
            <StatsCounter value={5000} suffix="+" label="Repairs Done" />
            <StatsCounter value={4.9} decimals={1} suffix="/5" label="Avg Rating" />
            <StatsCounter value={20} suffix="+" label="Expert Technicians" />
            <StatsCounter value={12} suffix="+" label="Cities Covered" />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Brands We Repair */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container-wide mx-auto relative">
          <motion.div className="text-center max-w-3xl mx-auto mb-12" {...fadeInUp}>
            <h2 className="text-responsive-h2 font-bold font-heading mb-4">
              Brands We{' '}
              <span className="gradient-text">Repair</span>
            </h2>
            <p className="text-muted-foreground">
              We service all major AC brands with certified expertise
            </p>
          </motion.div>
          <BrandMarquee />
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <motion.div className="text-center max-w-3xl mx-auto mb-16" {...fadeInUp}>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <h2 className="text-responsive-h2 font-bold font-heading mb-4">
              What Our{' '}
              <span className="gradient-text">Customers Say</span>
            </h2>
            <p className="text-muted-foreground">
              Real reviews from real customers across India
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((review, i) => (
              <ReviewCard key={i} {...review} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-5" />
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
        </div>
        <div className="container-wide mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div {...fadeInUp}>
            <h2 className="text-responsive-h2 font-bold font-heading mb-4">
              Ready to Get Your AC{' '}
              <span className="gradient-text">Fixed?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Book now and get same-day service. Our certified technicians are ready to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/book"
                className="group inline-flex items-center gap-2 gradient-primary text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                Book a Service
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="tel:+9118001234567"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-primary/20 text-foreground font-semibold hover:bg-primary/5 transition-all duration-300 glass"
              >
                <Phone className="w-5 h-5 text-accent" />
                Call for Emergency
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}