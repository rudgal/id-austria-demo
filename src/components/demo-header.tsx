import { ModeToggle } from '@/components/mode-toggle';
import Image from 'next/image';
import * as React from 'react';

export function DemoHeader() {
  return (
    <header className="bg-primary py-2">
      <div className="mx-auto flex items-center justify-between px-4">
        <div className="relative h-5">
          <Image src="/images/id-austria-logo-weiss.svg" alt="ID Austria" fill={true} className="min-w-min" />
        </div>
        <h1 className="text-lg font-semibold text-primary-foreground">Demo Application</h1>
        <ModeToggle />
      </div>
    </header>
  );
}
