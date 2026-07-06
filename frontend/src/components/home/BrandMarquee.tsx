'use client';

import { motion } from 'framer-motion';
import { brands } from '@/lib/data';

export default function BrandMarquee() {
  return (
    <div className="relative overflow-hidden py-4">
      <div className="flex gap-12 animate-marquee" style={{
        animation: 'marquee 30s linear infinite',
      }}>
        {[...brands, ...brands].map((brand, i) => (
          <div
            key={i}
            className="flex-shrink-0 px-6 py-3 rounded-2xl glass border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <span className="text-lg font-semibold font-heading text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
              {brand}
            </span>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}