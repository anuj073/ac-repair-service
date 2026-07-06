import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://coolfixpro.com';

  const staticRoutes = [
    { url: baseUrl, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/book`, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/blogs`, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/login`, changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${baseUrl}/dashboard`, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/admin`, changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/services`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/privacy`, changeFrequency: 'yearly' as const, priority: 0.2 },
    { url: `${baseUrl}/terms`, changeFrequency: 'yearly' as const, priority: 0.2 },
  ];

  const blogSlugs = [
    'signs-your-ac-needs-repair',
    'how-often-service-ac',
    'split-ac-vs-window-ac',
    'energy-saving-ac-tips',
    'ac-gas-refilling-guide',
    'ac-installation-guide',
  ];

  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blogs/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}