'use client';

import { motion } from 'framer-motion';
import { Smartphone, CheckCircle2, Truck, Wrench, CreditCard, MessageSquare } from 'lucide-react';

const steps = [
  {
    icon: Smartphone,
    title: 'Book a Service',
    description: 'Select your service, choose a time slot, and book in just 30 seconds.',
    color: 'from-primary/20 to-primary/5',
    iconColor: 'text-primary',
  },
  {
    icon: CheckCircle2,
    title: 'Get Confirmed',
    description: 'Receive instant confirmation via SMS, email, and WhatsApp.',
    color: 'from-accent/20 to-accent/5',
    iconColor: 'text-accent',
  },
  {
    icon: Truck,
    title: 'Technician Arrives',
    description: 'Track your technician in real-time. Arrival within 2 hours.',
    color: 'from-secondary/20 to-secondary/5',
    iconColor: 'text-secondary',
  },
  {
    icon: Wrench,
    title: 'Service Done',
    description: 'Expert repair with original spare parts. Satisfaction guaranteed.',
    color: 'from-primary/20 to-primary/5',
    iconColor: 'text-primary',
  },
  {
    icon: CreditCard,
    title: 'Pay Securely',
    description: 'Pay online via UPI, card, or cash after service completion.',
    color: 'from-accent/20 to-accent/5',
    iconColor: 'text-accent',
  },
  {
    icon: MessageSquare,
    title: 'Rate & Review',
    description: 'Share your experience. Your feedback helps us improve.',
    color: 'from-secondary/20 to-secondary/5',
    iconColor: 'text-secondary',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding relative overflow-hidden">
      <div className="container-wide mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-responsive-h2 font-bold font-heading mb-4">
            How It{' '}
            <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Get your AC repaired in 4 simple steps. No hassle, no waiting.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Timeline line - desktop */}
          <div className="hidden lg:block absolute top-16 left-[calc(16.66%+28px)] right-[calc(16.66%+28px)] h-0.5 bg-gradient-to-r from-primary via-accent to-secondary opacity-30" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Number */}
              <div className="absolute -top-2 left-4 w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-lg z-10">
                {i + 1}
              </div>

              {/* Icon */}
              <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
                <step.icon className={`w-10 h-10 ${step.iconColor}`} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold font-heading mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}