'use client';

import { motion } from 'framer-motion';
import { Clock, Star } from 'lucide-react';
import Link from 'next/link';
import type { Service } from '@/lib/data';
import { cn } from '@/lib/utils';

interface ServiceCardProps extends Service {
  index: number;
}

export default function ServiceCard({ icon: Icon, title, description, price, duration, popular, emergency, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group relative"
    >
      <div className={cn(
        'relative p-6 rounded-2xl border bg-card hover:shadow-xl transition-all duration-300',
        'hover:-translate-y-1',
        popular && 'ring-2 ring-primary shadow-lg shadow-primary/10'
      )}>
        {/* Popular Badge */}
        {popular && (
          <div className="absolute -top-3 left-4 px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold flex items-center gap-1 shadow-lg">
            <Star className="w-3 h-3 fill-white" />
            Most Popular
          </div>
        )}

        {/* Emergency Badge */}
        {emergency && (
          <div className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold flex items-center gap-1 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Emergency
          </div>
        )}

        {/* Icon */}
        <div className={cn(
          'w-14 h-14 rounded-2xl flex items-center justify-center mb-4',
          'bg-gradient-to-br from-primary/20 to-primary/5',
          'transition-transform duration-300 group-hover:scale-110',
          'group-hover:shadow-lg group-hover:shadow-primary/10'
        )}>
          <Icon className="w-7 h-7 text-primary" />
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold font-heading mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Price & Duration */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold gradient-text">{price}</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {duration}
          </div>
        </div>

        {/* Book Button */}
        <Link
          href={`/book?service=${title.toLowerCase().replace(/\s+/g, '-')}`}
          className={cn(
            'block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all duration-300',
            popular
              ? 'gradient-primary text-white hover:shadow-lg'
              : 'bg-muted hover:bg-primary/10 hover:text-primary'
          )}
        >
          Book Now
        </Link>
      </div>
    </motion.div>
  );
}