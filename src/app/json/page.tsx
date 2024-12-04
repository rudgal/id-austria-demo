import tokenData from '@/__tests__/response/token_ottakringer.json';
import { JwtNavigator } from '@/components/jwt-navigator';
import { Button } from '@/components/ui/button';
import { IoChevronBackOutline } from 'react-icons/io5';
import Link from 'next/link';
import { JWTPayload } from 'jose';
import { verifyToken } from '@/util/jwt-util';

export default async function JsonPage() {
  const payload: JWTPayload = await verifyToken(
    tokenData.id_token,
    // exampleResponseOttakringer.id_token,
    {
      verifyExpiry: false,
    }
  );

  return (
    <div className="container mx-auto p-4">
      <div className="my-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Token Response from ID Austria IdP</h1>
        <Button variant="secondary" asChild>
          <Link href="/">
            <IoChevronBackOutline />
            Start over
          </Link>
        </Button>
      </div>
      <div className="h-[70vh] overflow-x-auto">
        <JwtNavigator idTokenAsString={JSON.stringify(payload)} />
      </div>
    </div>
  );
}
