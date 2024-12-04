import HowTo from '@/mdx/HowTo.mdx';
import { LoginForm } from '@/components/login-form';

export default function DemoPage() {
  return (
    <>
      <div className="w-1/2 overflow-y-auto bg-slate-100 p-8 dark:bg-slate-800">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <HowTo />
        </div>
      </div>
      <div className="flex w-1/2 items-center justify-center overflow-y-auto bg-white p-8 dark:bg-slate-950">
        <LoginForm />
      </div>
    </>
  );
}
