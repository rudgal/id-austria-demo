import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IoChevronBackOutline } from 'react-icons/io5';

export default function NotFound() {
  return (
    <div className="flex flex-auto min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-800 dark:text-gray-200">404</h1>
        <h2 className="mb-4 text-2xl font-semibold">Page Not Found</h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button asChild>
          <Link href="/">
            <IoChevronBackOutline className="mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
