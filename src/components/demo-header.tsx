import { ModeToggle } from '@/components/mode-toggle';

export function DemoHeader() {
  return (
    <header className="bg-primary py-2">
      <div className="mx-auto flex items-center justify-between px-4">
        <h1 className="text-lg font-semibold text-primary-foreground">Demo Application</h1>
        <ModeToggle />
      </div>
    </header>
  );
}
