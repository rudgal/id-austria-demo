import tokenData from '@/__tests__/response/token_ottakringer.json';
import { JwtNavigator } from '@/components/jwt-navigator';

export default function JsonPage() {
  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4">JWT Token Explorer</h1>
      <div className="overflow-x-auto h-full">
        <JwtNavigator jwt={tokenData.id_token} />
      </div>
    </div>
  );
} 