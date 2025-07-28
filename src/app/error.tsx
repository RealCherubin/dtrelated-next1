'use client';

import Link from 'next/link';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">500</h1>
        <p className="text-xl mb-8">Something went wrong!</p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Try again
          </button>
          <Link 
            href="/" 
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
} 