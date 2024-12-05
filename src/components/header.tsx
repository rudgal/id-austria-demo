import { ModeToggle } from '@/components/mode-toggle';
import Image from 'next/image';

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="relative h-5">
          <Image
            src="/images/id-austria-logo.svg"
            alt="ID Austria"
            fill={true}
            className="hidden min-w-min dark:block"
          />
          <Image
            src="/images/id-austria-logo-weiss.svg"
            alt="ID Austria"
            fill={true}
            className="min-w-min dark:hidden"
          />
        </div>
        <h1 className="text-lg font-semibold">Login Demo</h1>
        <ModeToggle />
      </div>
    </header>
  );
}
