import { ModeToggle } from '@/components/mode-toggle';

export function DemoHeader() {
  return (
    <header className="bg-slate-900 py-2 text-slate-50 dark:bg-slate-50 dark:text-slate-900">
      <div className="mx-auto flex items-center justify-between px-4">
        <h1 className="text-lg font-semibold">Demo Application</h1>
        <ModeToggle />
      </div>
    </header>
  );
}
