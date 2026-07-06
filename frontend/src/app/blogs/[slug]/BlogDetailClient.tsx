'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  Share2,
  Link as LinkIcon,
  ChevronRight,
  MessageCircle,
  Twitter,
  Facebook,
  Copy,
  Check,
  BookOpen,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// ── Types ──────────────────────────────────────────
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  slug: string;
  image: string;
}

interface Props {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

// ── Rich content placeholder per article ────────────
const fullContent: Record<number, { sections: { heading: string; body: string }[] }> = {
  1: {
    sections: [
      {
        heading: 'Introduction',
        body: "Your air conditioner works hard to keep your home cool and comfortable, especially during the scorching summer months. But like any mechanical system, it gives warning signs before a major breakdown. Recognizing these signs early can save you hundreds in repair costs and prevent uncomfortable downtime. At CoolFix Pro, our certified technicians have seen it all. Here are the 10 most common signs that your AC needs immediate professional attention.",
      },
      {
        heading: '1. Warm Air from Vents',
        body: "If your AC is blowing warm air instead of cool, it could indicate a compressor issue, low refrigerant levels, or a faulty thermostat. While a simple thermostat fix might resolve it, compressor problems require immediate professional intervention. Don't wait — running an AC with a failing compressor can damage the entire system.",
      },
      {
        heading: '2. Weak Airflow',
        body: "Weak or restricted airflow from your vents usually points to a clogged air filter, blocked ductwork, or a failing blower motor. Start by checking and replacing your air filter — this simple maintenance step resolves 80% of airflow issues. If the problem persists after a fresh filter, it's time to call a technician.",
      },
      {
        heading: '3. Unusual Noises',
        body: "Your AC should operate quietly in the background. Grinding, squealing, or banging noises indicate loose parts, motor bearing failure, or debris in the fan blades. These issues worsen quickly — a loose part can cause cascading damage to other components. Shut off the unit and call for service immediately.",
      },
      {
        heading: '4. Foul Odors',
        body: "Musty smells suggest mold or mildew buildup in your ductwork or drain pan. A burning smell could indicate electrical problems or an overheating motor. Both require urgent professional inspection. Mold issues compromise indoor air quality, while electrical problems pose a fire risk.",
      },
      {
        heading: '5. Water Leaks',
        body: "A small puddle around your indoor unit might seem harmless, but it often signals a blocked condensate drain line or a refrigerant leak. Water damage can ruin flooring, drywall, and promote mold growth. If you notice refrigerant leaks (often appearing as oily residue), evacuate the area and call a professional — refrigerant is hazardous.",
      },
      {
        heading: '6. Rising Energy Bills',
        body: "A sudden spike in your electricity bill without increased usage is a classic sign of an inefficient AC. When components wear out or refrigerant levels drop, your system works harder and longer to achieve the same cooling. A well-maintained AC should show consistent energy consumption year over year.",
      },
      {
        heading: '7. Frequent Cycling',
        body: "If your AC turns on and off repeatedly (short cycling), it wastes energy and puts enormous stress on the compressor. Common causes include an oversized unit, refrigerant issues, or a faulty thermostat. Short cycling is a serious issue that leads to premature system failure if ignored.",
      },
      {
        heading: '8. High Humidity Levels',
        body: "Your AC should remove humidity from your home as it cools. If your space feels clammy or sticky even with the AC running, it's a sign of improper operation. This could mean your unit is oversized (cools too quickly without dehumidifying), has a refrigerant issue, or the condensate system is blocked.",
      },
      {
        heading: '9. Frozen Evaporator Coils',
        body: "Ice on your AC's refrigerant lines or coils is never normal. It typically indicates restricted airflow, low refrigerant, or a failing blower motor. Turn off the AC immediately — continued operation with frozen coils can damage the compressor, which is the most expensive component to replace.",
      },
      {
        heading: '10. AC Age Exceeding 10–15 Years',
        body: "Even if your old AC seems to be running fine, units over 10-15 years old operate at 30-50% lower efficiency than modern systems. Upgrading to a new energy-efficient model can reduce your cooling costs by 20-40% and provide better comfort with advanced features like variable-speed compressors and smart thermostats.",
      },
      {
        heading: 'When to Call CoolFix Pro',
        body: "If you've noticed any of these warning signs, don't delay. Our certified technicians offer same-day service across all major cities. We diagnose the issue thoroughly, provide transparent pricing, and back our work with a 30-day warranty. Book your service in under 30 seconds — our team will arrive ready with the right tools and parts to get your AC back to peak performance.",
      },
    ],
  },
  2: {
    sections: [
      {
        heading: 'Introduction',
        body: "Regular AC servicing is the single most important factor in extending your air conditioner's lifespan and maintaining its efficiency. But how often should you actually schedule maintenance? The answer depends on several factors including usage, environment, and AC type. In this comprehensive guide, CoolFix Pro breaks down the ideal service schedule for every scenario.",
      },
      {
        heading: 'General Recommendation: Twice a Year',
        body: "HVAC experts recommend professional AC servicing at least twice a year — once before the cooling season (spring) and once after (fall). This bi-annual schedule ensures your system is ready for peak summer demand and allows technicians to address any wear and tear from heavy use before winter storage. Think of it like a car — regular oil changes prevent major engine problems.",
      },
      {
        heading: 'Heavy Usage: Every 3-4 Months',
        body: "If you live in a tropical climate where your AC runs 8+ months a year, or if you have a large family running the AC continuously, increase servicing to every 3-4 months. Commercial spaces and rental properties should also follow this accelerated schedule due to constant operation.",
      },
      {
        heading: 'Light Usage: Once a Year',
        body: "In cooler climates where AC is used sparingly (less than 3 months a year), an annual pre-season service check is usually sufficient. However, you should still perform basic DIY maintenance like filter cleaning every month during the usage period.",
      },
      {
        heading: 'DIY Maintenance Between Services',
        body: "Professional servicing is irreplaceable, but monthly DIY maintenance between visits keeps your AC running efficiently. Clean or replace air filters every 30 days during peak usage. Keep the outdoor unit clear of debris, leaves, and vegetation. Check the condensate drain line for clogs, and ensure vents are unobstructed by furniture or curtains.",
      },
      {
        heading: 'What a Professional Service Includes',
        body: "A thorough AC service goes far beyond just cleaning filters. Our CoolFix Pro technicians perform a comprehensive 20-point check including: refrigerant level inspection and top-up, coil cleaning, blower motor and fan inspection, electrical connection tightening, thermostat calibration, drain line flushing, and overall system performance testing. We also check for unusual noises, vibrations, and potential safety hazards.",
      },
      {
        heading: 'Signs Your AC Needs Service Before Schedule',
        body: "Don't wait for your scheduled service if you notice any of these red flags: unusual noises or smells, weak airflow, water leaks, inconsistent cooling, or a sudden increase in electricity bills. These symptoms indicate problems that will worsen if left unaddressed. Same-day service is available — call CoolFix Pro immediately.",
      },
      {
        heading: "Don't Skip the Off-Season Service",
        body: "Many homeowners skip the post-summer service, thinking it's unnecessary. This is a mistake. Fall servicing prepares your AC for months of inactivity, preventing mold growth in the coils, corrosion of exposed components, and pest infestations in the ductwork. A small investment in off-season maintenance saves thousands in repair costs later.",
      },
    ],
  },
  5: {
    sections: [
      {
        heading: 'Introduction',
        body: "Is your AC blowing warm air but running constantly? You might need a gas refill. Air conditioner refrigerant (commonly called 'gas') is the lifeblood of your cooling system. When levels drop, your AC loses its ability to cool effectively. This guide covers everything you need to know about AC gas refilling — from identifying the signs to understanding costs and the refilling process.",
      },
      {
        heading: 'What is AC Refrigerant Gas?',
        body: "Refrigerant is a chemical compound that circulates through your AC system, absorbing heat from indoor air and releasing it outside. Common types include R-32, R-410A, and the older R-22 (now phased out). Your AC uses a specific type — never mix refrigerants. Modern split ACs primarily use R-32 for its superior efficiency and lower environmental impact.",
      },
      {
        heading: 'Signs Your AC Needs a Gas Refill',
        body: "The most obvious sign is reduced cooling performance — your AC runs for hours but the room never reaches the set temperature. Other indicators include: ice formation on copper pipes or the outdoor unit, hissing or bubbling sounds (indicating a leak), unusually high electricity bills, and the compressor running continuously without cycling off. If you notice these signs, a low refrigerant level is likely the culprit.",
      },
      {
        heading: 'Common Causes of Gas Leaks',
        body: "Refrigerant doesn't get 'used up' during normal operation — it's a sealed system. Low gas levels always indicate a leak somewhere in the system. Common leak points include: loose or damaged flare nuts at connection joints, pinhole leaks in condenser coils (often caused by corrosion or physical damage), cracks in evaporator coils, or issues with the service valve. A professional technician must locate and seal the leak before refilling.",
      },
      {
        heading: 'The Refilling Process',
        body: "AC gas refilling is not a DIY job — it requires specialized equipment and training. Our CoolFix Pro process begins with a complete system inspection to locate any leaks. After sealing all leaks (repairing or replacing affected components as needed), we vacuum the system to remove moisture and air. Finally, we recharge the system with the exact amount of refrigerant specified by the manufacturer, then test for proper cooling performance.",
      },
      {
        heading: 'Cost of AC Gas Refilling',
        body: "Gas refilling costs vary based on refrigerant type, amount needed, and your location. R-32 refills typically range from ₹2,000-₹5,000 for a standard 1.5-ton split AC. R-410A is slightly more expensive. If there's a leak requiring repair, add the cost of fixing the leak point. Always get a transparent quote before work begins — CoolFix Pro provides upfront pricing with no hidden charges.",
      },
      {
        heading: 'Preventing Future Gas Leaks',
        body: "Regular maintenance is the best prevention. Annual professional servicing includes checking all connection points for micro-leaks, cleaning condenser coils to prevent corrosion, and ensuring the system pressure is within specifications. Additionally, protect your outdoor unit from physical damage with a cover during off-season and keep the area clear of debris and vegetation.",
      },
    ],
  },
};

// ── Share button helpers ────────────────────────────
function getShareUrl(slug: string) {
  if (typeof window === 'undefined') return '';
  return `${window.location.origin}/blogs/${slug}`;
}

function shareOnTwitter(url: string, title: string) {
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer');
}

function shareOnFacebook(url: string) {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer');
}

function shareOnWhatsApp(url: string, title: string) {
  window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, '_blank', 'noopener,noreferrer');
}

// ── Category emoji mapping ──────────────────────────
const categoryEmoji: Record<string, string> = {
  'Maintenance Tips': '🛠️',
  'Buying Guide': '📋',
  'Technical Guide': '⚙️',
  'Energy Saving': '💡',
};

// ── Section card component ──────────────────────────
function ContentSection({ section, index }: { section: { heading: string; body: string }; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="mb-8 last:mb-0"
    >
      <h3 className="text-xl font-semibold font-heading mb-3 text-foreground">
        {section.heading}
      </h3>
      <p className="text-muted-foreground leading-relaxed text-[15px]">
        {section.body}
      </p>
    </motion.div>
  );
}

// ── Related Post Card ───────────────────────────────
function RelatedPostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/blogs/${post.slug}`} className="group block">
        <div className="glass rounded-xl border overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          <div className="h-28 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 flex items-center justify-center">
            <span className="text-2xl">{categoryEmoji[post.category] || '❄️'}</span>
          </div>
          <div className="p-3.5">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">
              {post.category}
            </span>
            <h4 className="text-sm font-medium font-heading mt-1 line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h4>
            <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Main Component ──────────────────────────────────
export default function BlogDetailClient({ post, relatedPosts }: Props) {
  const [copied, setCopied] = useState(false);
  const content = fullContent[post.id];

  const handleCopyLink = async () => {
    const url = getShareUrl(post.slug);
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareUrl = getShareUrl(post.slug);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-wide mx-auto px-4 sm:px-6">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to all articles
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
          {/* ── Main Content Column ─────────────────────── */}
          <article>
            {/* Cover Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden glass border mb-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/10">
                {/* Decorative elements */}
                <div className="absolute top-6 left-6 text-5xl sm:text-6xl opacity-50">
                  {categoryEmoji[post.category] || '❄️'}
                </div>
                <div className="absolute bottom-6 right-6">
                  <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-white">
                    {post.category}
                  </span>
                </div>
                {/* Subtle radial gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>

            {/* Category badge + Read Time */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center gap-3 mb-4"
            >
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <BookOpen className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-responsive-h2 font-bold font-heading mb-5 text-foreground leading-tight"
            >
              {post.title}
            </motion.h1>

            {/* Author & Date row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-5 pb-6 mb-8 border-b text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
                  {post.author.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{post.author}</p>
                  <p className="text-xs text-muted-foreground">Certified Technician</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
            </motion.div>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="prose prose-sm sm:prose-base max-w-none mb-10"
            >
              {content ? (
                content.sections.map((section, i) => (
                  <ContentSection key={i} section={section} index={i} />
                ))
              ) : (
                <div className="glass rounded-2xl p-8 text-center border-dashed border">
                  <p className="text-muted-foreground">
                    Full article content coming soon. Stay tuned for tips and insights from our certified technicians.
                  </p>
                </div>
              )}
            </motion.div>

            {/* Share Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl border p-6 mb-8"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-2 shrink-0">
                  <Share2 className="w-5 h-5 text-primary" />
                  <span className="font-medium font-heading text-sm">Share this article</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => shareOnWhatsApp(shareUrl, post.title)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium hover:bg-green-50 dark:hover:bg-green-950/30 hover:border-green-300 dark:hover:border-green-700 transition-all"
                    aria-label="Share on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 text-green-500" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </button>
                  <button
                    onClick={() => shareOnTwitter(shareUrl, post.title)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium hover:bg-sky-50 dark:hover:bg-sky-950/30 hover:border-sky-300 dark:hover:border-sky-700 transition-all"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-4 h-4 text-sky-500" />
                    <span className="hidden sm:inline">Twitter</span>
                  </button>
                  <button
                    onClick={() => shareOnFacebook(shareUrl)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-4 h-4 text-blue-600" />
                    <span className="hidden sm:inline">Facebook</span>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium hover:bg-muted transition-all"
                    aria-label="Copy link"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <LinkIcon className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy link'}</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* CTA to Book Service */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl border overflow-hidden"
            >
              <div className="p-6 sm:p-8 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
                <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold font-heading mb-2">
                      Need AC Service?{' '}
                      <span className="gradient-text">Book Now</span>
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Facing AC issues? Our certified technicians provide same-day service with transparent pricing and 30-day warranty on all repairs.
                    </p>
                    <Link
                      href="/book"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm hover:shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-0.5"
                    >
                      Book Service in 30 Seconds
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="text-5xl shrink-0 opacity-50 hidden sm:block">❄️</div>
                </div>
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4 text-xs text-muted-foreground">
                  <span>✅ Same-day service</span>
                  <span>✅ Certified technicians</span>
                  <span>✅ 30-day warranty</span>
                  <span>✅ Transparent pricing</span>
                </div>
              </div>
            </motion.div>
          </article>

          {/* ── Sidebar ──────────────────────────────────── */}
          <aside className="lg:sticky lg:top-28 self-start">
            {/* Table of Contents */}
            {content && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass rounded-2xl border p-5 mb-6"
              >
                <h3 className="font-semibold font-heading text-sm mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  In this article
                </h3>
                <nav className="space-y-1.5">
                  {content.sections.slice(0, 6).map((section, i) => (
                    <div
                      key={i}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-default py-1 pl-3 border-l-2 border-transparent hover:border-primary/50"
                    >
                      {section.heading}
                    </div>
                  ))}
                  {content.sections.length > 6 && (
                    <p className="text-xs text-muted-foreground/60 pl-3 pt-1">
                      + {content.sections.length - 6} more sections
                    </p>
                  )}
                </nav>
              </motion.div>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                className="glass rounded-2xl border p-5 mb-6"
              >
                <h3 className="font-semibold font-heading text-sm mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Related Articles
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map((rp, i) => (
                    <RelatedPostCard key={rp.id} post={rp} index={i} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Quick CTA in Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl border p-5 text-center"
            >
              <div className="text-3xl mb-2">📞</div>
              <h4 className="font-semibold font-heading text-sm mb-1">Need Help Now?</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Call us for emergency AC repair
              </p>
              <a
                href="tel:+91-1800-123-4567"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/20 transition-all"
              >
                1800-123-4567
              </a>
              <div className="mt-3 pt-3 border-t">
                <Link
                  href="/book"
                  className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                >
                  Or book online <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
}