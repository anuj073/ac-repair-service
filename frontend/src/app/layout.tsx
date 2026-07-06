import type { Metadata } from 'next';
import { Inter, Poppins, Manrope } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://coolfixpro.com'),
  title: {
    default: 'CoolFix Pro | Premium AC Repair & Home Appliance Services',
    template: '%s | CoolFix Pro',
  },
  description:
    'India\'s most trusted AC repair and home appliance service. Same-day service, certified technicians, transparent pricing, and 30-day warranty. Book in 30 seconds!',
  keywords: [
    'AC repair',
    'AC service',
    'AC installation',
    'gas filling',
    'AC deep cleaning',
    'appliance repair',
    'split AC repair',
    'window AC repair',
    'same day AC service',
    'CoolFix Pro',
  ],
  authors: [{ name: 'CoolFix Pro' }],
  creator: 'CoolFix Pro',
  publisher: 'CoolFix Pro',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'CoolFix Pro',
    title: 'CoolFix Pro | Premium AC Repair & Home Appliance Services',
    description:
      'India\'s most trusted AC repair and home appliance service. Same-day service, certified technicians, transparent pricing.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CoolFix Pro - AC Repair Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CoolFix Pro | Premium AC Repair Services',
    description: 'India\'s most trusted AC repair service. Book in 30 seconds!',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
  alternates: {
    canonical: 'https://coolfixpro.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'CoolFix Pro',
              image: 'https://coolfixpro.com/logo.png',
              '@id': 'https://coolfixpro.com',
              url: 'https://coolfixpro.com',
              telephone: '+91-1800-123-4567',
              priceRange: '₹299-₹9999',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Your Street Address',
                addressLocality: 'Your City',
                addressRegion: 'Your State',
                postalCode: '110001',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 28.6139,
                longitude: 77.209,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                  opens: '08:00',
                  closes: '20:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Sunday',
                  opens: '09:00',
                  closes: '18:00',
                },
              ],
              sameAs: [
                'https://facebook.com/coolfixpro',
                'https://instagram.com/coolfixpro',
                'https://youtube.com/@coolfixpro',
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${manrope.variable} font-sans`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}