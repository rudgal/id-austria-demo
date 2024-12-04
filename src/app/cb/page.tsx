import { ServerSideComponentProp } from '@/types';
import * as xss from 'xss';
import { verifyToken } from '@/util/jwt-util';
import { JWTPayload } from 'jose';
import * as React from 'react';
import { JwtNavigator } from '@/components/jwt-navigator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IoChevronBackOutline } from 'react-icons/io5';

type ExpectedSearchParams = {
  code: string;
  state?: string;
};

type TokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  id_token: string;
};

export default async function CallbackPage({ searchParams }: ServerSideComponentProp<unknown, ExpectedSearchParams>) {
  const code = xss.filterXSS(searchParams.code || '');
  // const state = xss.filterXSS(searchParams.state || '');

  const tokenResponse = await obtainAuthToken(code);

  const payload: JWTPayload = await verifyToken(
    tokenResponse.id_token,
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
      <div className="h-[72vh]">
        <JwtNavigator idTokenAsString={JSON.stringify(payload)} />
      </div>
    </div>
  );
}

async function obtainAuthToken(code: string): Promise<TokenResponse> {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  const urlencoded = new URLSearchParams();
  urlencoded.append('code', code);
  urlencoded.append('grant_type', 'authorization_code');
  urlencoded.append('client_secret', process.env.OIDC_CLIENT_SECRET);
  urlencoded.append('redirect_uri', process.env.NEXT_PUBLIC_OIDC_REDIRECT_URI);
  urlencoded.append('client_id', process.env.NEXT_PUBLIC_OIDC_CLIENT_ID);

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };

  const response = await fetch(process.env.OIDC_TOKEN_ENDPOINT, requestOptions);
  const responseBody: TokenResponse = await response.json();
  return responseBody;
}
