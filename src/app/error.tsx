'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-auto min-h-[60vh] items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="rounded-lg border border-red-200 bg-red-50 p-8 dark:border-red-800 dark:bg-red-950">
          <h1 className="mb-4 text-3xl font-bold text-red-800 dark:text-red-200">
            Oops! Something went wrong
          </h1>
          <p className="mb-6 text-lg text-red-700 dark:text-red-300">
            An unexpected error occurred. The error details are shown below.
          </p>
          <pre className="mb-6 max-h-[400px] overflow-auto rounded bg-red-100 p-6 text-sm text-red-900 dark:bg-red-900 dark:text-red-100">
{error.message || 'An unknown error occurred'}
{error.stack && '\n\nStack trace:\n' + error.stack}
          </pre>
          <div className="flex gap-4">
            <Button onClick={reset} variant="outline" size="lg">
              Try again
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/">
                <IoChevronBackOutline className="mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
