'use client';

import Link from 'next/link';
import { Wrench } from 'lucide-react';

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-3xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-xl">
          <Wrench className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold font-heading mb-3">Something went wrong!</h1>
        <p className="text-muted-foreground mb-8">
          We encountered an unexpected error. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="gradient-primary text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-8 py-3 rounded-xl border font-semibold hover:bg-muted transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}