'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Calendar, Clock, ChevronRight, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const blogPosts = [
  {
    id: 1,
    title: '10 Signs Your AC Needs Immediate Repair',
    excerpt: 'Don&apos;t ignore these warning signs from your air conditioner. Learn when to call a professional for AC repair before the problem worsens.',
    category: 'Maintenance Tips',
    author: 'CoolFix Pro Team',
    date: '2026-07-01',
    readTime: '5 min read',
    slug: 'signs-your-ac-needs-repair',
    image: '/blog/ac-repair-signs.jpg',
  },
  {
    id: 2,
    title: 'How Often Should You Service Your AC?',
    excerpt: 'Regular AC maintenance is crucial for efficiency and longevity. Find out the ideal service schedule for your air conditioner.',
    category: 'Maintenance Tips',
    author: 'CoolFix Pro Team',
    date: '2026-06-25',
    readTime: '4 min read',
    slug: 'how-often-service-ac',
    image: '/blog/ac-service.jpg',
  },
  {
    id: 3,
    title: 'Split AC vs Window AC: Which One is Right for You?',
    excerpt: 'Confused between split and window AC? We compare costs, efficiency, installation, and maintenance to help you decide.',
    category: 'Buying Guide',
    author: 'CoolFix Pro Team',
    date: '2026-06-18',
    readTime: '7 min read',
    slug: 'split-ac-vs-window-ac',
    image: '/blog/ac-comparison.jpg',
  },
  {
    id: 4,
    title: 'Top 5 Energy Saving Tips for Your AC This Summer',
    excerpt: 'Reduce your electricity bills this summer with these expert AC energy-saving tips. Save up to 30% on cooling costs!',
    category: 'Energy Saving',
    author: 'CoolFix Pro Team',
    date: '2026-06-10',
    readTime: '3 min read',
    slug: 'energy-saving-ac-tips',
    image: '/blog/energy-saving.jpg',
  },
  {
    id: 5,
    title: 'Understanding AC Gas Refilling: Everything You Need to Know',
    excerpt: 'Is your AC not cooling enough? It might need gas refilling. Learn about refrigerant types, costs, and when to refill.',
    category: 'Technical Guide',
    author: 'CoolFix Pro Team',
    date: '2026-06-05',
    readTime: '6 min read',
    slug: 'ac-gas-refilling-guide',
    image: '/blog/gas-refill.jpg',
  },
  {
    id: 6,
    title: 'AC Installation Guide: Things to Consider Before Buying',
    excerpt: 'Planning to buy a new AC? Read our comprehensive installation guide covering room size, tonnage, star rating, and placement.',
    category: 'Buying Guide',
    author: 'CoolFix Pro Team',
    date: '2026-05-28',
    readTime: '8 min read',
    slug: 'ac-installation-guide',
    image: '/blog/installation.jpg',
  },
];

const categories = ['All', 'Maintenance Tips', 'Buying Guide', 'Technical Guide', 'Energy Saving'];

export default function BlogPageClient() {
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
            AC Repair{' '}
            <span className="gradient-text">Blog & Guides</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Expert tips, maintenance guides, and industry insights from our certified technicians
          </p>
        </motion.div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2.5 rounded-xl border text-sm font-medium hover:bg-primary/5 hover:border-primary/50 transition-all data-[active=true]:bg-primary data-[active=true]:text-white"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Link href={`/blogs/${post.slug}`} className="block">
                <div className="glass rounded-2xl border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Image placeholder */}
                  <div className="h-48 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">❄️</div>
                      <p className="text-sm text-muted-foreground">{post.category}</p>
                    </div>
                  </div>

                  <div className="p-5">
                    {/* Category */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-semibold font-heading mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.date)}
                      </div>
                      <span className="text-xs text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read more <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex gap-2">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={cn(
                  'w-10 h-10 rounded-xl border text-sm font-medium transition-all',
                  page === 1
                    ? 'bg-primary text-white border-primary'
                    : 'hover:bg-muted'
                )}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}