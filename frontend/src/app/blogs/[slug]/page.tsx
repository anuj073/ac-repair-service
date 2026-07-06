import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogDetailClient from './BlogDetailClient';

// Reuse the same blog data from the listing page
const blogPosts = [
  {
    id: 1,
    title: '10 Signs Your AC Needs Immediate Repair',
    excerpt: "Don't ignore these warning signs from your air conditioner. Learn when to call a professional for AC repair before the problem worsens.",
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

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | CoolFix Pro`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: [post.category],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  return <BlogDetailClient post={post} relatedPosts={relatedPosts} />;
}