import { ModeToggle } from '@/components/mode-toggle';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Header({ className }: { className?: string }) {
  return (
    <header className={cn('bg-primary text-primary-foreground', className)}>
      <div className="relative flex items-center justify-between px-4 py-2">
        <div className="relative h-5 w-24 sm:w-32">
          <Image
            src="/images/id-austria-logo.svg"
            alt="ID Austria"
            fill={true}
            className="hidden object-contain object-left dark:block"
          />
          <Image
            src="/images/id-austria-logo-weiss.svg"
            alt="ID Austria"
            fill={true}
            className="object-contain object-left dark:hidden"
          />
        </div>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold">Login Demo</h1>
        <ModeToggle />
      </div>
    </header>
  );
}
