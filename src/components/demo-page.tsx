import HowTo from '@/mdx/HowTo.mdx';
import { LoginForm } from '@/components/login-form';

export default function DemoPage() {
  return (
    <div className="flex w-full flex-col sm:h-full sm:flex-row">
      <div className="order-2 w-full bg-slate-100 p-8 dark:bg-slate-800 sm:order-1 sm:h-full sm:w-1/2 sm:overflow-y-auto">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <HowTo />
        </div>
      </div>
      <div className="order-1 flex w-full items-center justify-center bg-white p-8 py-16 dark:bg-slate-950 sm:order-2 sm:w-1/2 sm:overflow-y-auto sm:py-8">
        <LoginForm />
      </div>
    </div>
  );
}
