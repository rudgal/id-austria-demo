import { ServerSideComponentProp } from '@/types';
import * as xss from 'xss';

type ExpectedSearchParams = {
  code: string;
  state?: string;
};

export default async function CallbackPage({
  searchParams,
}: ServerSideComponentProp<unknown, ExpectedSearchParams>) {
  const code = xss.filterXSS(searchParams.code || '');
  const state = xss.filterXSS(searchParams.state || '');

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <div>CALLBACK PAGE</div>
      <div>
        <div>Code:</div>
        <pre>{code}</pre>
      </div>
      <div>
        <div>State:</div>
        <pre>{state}</pre>
      </div>
    </div>
  );
}
