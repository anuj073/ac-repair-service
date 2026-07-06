'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '@/lib/data';
import { getInitials } from '@/lib/utils';

interface ReviewCardProps extends Testimonial {
  index: number;
}

export default function ReviewCard({ name, location, rating, comment, service, index }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl glass border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Quote Icon */}
      <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-muted-foreground/30'
            }`}
          />
        ))}
      </div>

      {/* Comment */}
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-4">
        &ldquo;{comment}&rdquo;
      </p>

      {/* Service Tag */}
      <div className="mb-4">
        <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
          {service}
        </span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold">
          {getInitials(name)}
        </div>
        <div>
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-xs text-muted-foreground">{location}</p>
        </div>
      </div>
    </motion.div>
  );
}