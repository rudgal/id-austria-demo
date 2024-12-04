import tokenData from '@/__tests__/response/token_ottakringer.json';
import { JsonTable } from '@/components/json-value-table';

export default function JsonPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Token Response Example</h1>
      <div className="overflow-x-auto">
        <JsonTable data={tokenData} />
      </div>
    </div>
  );
} 