import Link from 'next/link';
import { Wrench, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-3xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-xl">
          <Wrench className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-6xl font-bold font-heading mb-4 gradient-text">404</h1>
        <p className="text-xl font-semibold mb-3">Page Not Found</p>
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 gradient-primary text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}