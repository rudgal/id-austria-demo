import { ServerSideComponentProp } from '@/types';
import * as xss from 'xss';
import { verifyToken } from '@/util/jwt-util';
import { JwtPayloadTable } from '@/components/jwt-payload-table';

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

export default async function CallbackPage({
  searchParams,
}: ServerSideComponentProp<unknown, ExpectedSearchParams>) {
  const code = xss.filterXSS(searchParams.code || '');
  const state = xss.filterXSS(searchParams.state || '');

  const tokenResponse = await obtainAuthToken(code);

  const payload = await verifyToken(tokenResponse.id_token);

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <div>CALLBACK PAGE</div>
      <div>
        <strong>state</strong>: {state}
      </div>
      <JwtPayloadTable payload={payload} />
    </div>
  );
}

async function obtainAuthToken(code: string): Promise<TokenResponse> {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  const urlencoded = new URLSearchParams();
  urlencoded.append('code', code);
  urlencoded.append('grant_type', 'authorization_code');
  urlencoded.append('client_secret', process.env.OIDC_CLIENT_SECRET || '');
  urlencoded.append('redirect_uri', process.env.OIDC_REDIRECT_URI || '');
  urlencoded.append('client_id', process.env.OIDC_CLIENT_ID || '');

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };

  const response = await fetch(
    process.env.OIDC_TOKEN_ENDPOINT || '',
    requestOptions
  );
  const responseBody: TokenResponse = await response.json();
  return responseBody;
}
