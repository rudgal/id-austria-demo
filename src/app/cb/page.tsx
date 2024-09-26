import { ServerSideComponentProp } from '@/types';
import * as xss from 'xss';
import { verifyToken } from '@/util/jwt-util';
import { Base64Img } from '@/components/base64-img';
import { JWTPayload } from 'jose';
import { JsonTable } from '@/components/json-value-table';
import { decodeFromBase64 } from 'next/dist/build/webpack/loaders/utils';
import * as React from 'react';

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
  const state = xss.filterXSS(searchParams.state || '');

  const tokenResponse = await obtainAuthToken(code);

  const payload: JWTPayload = await verifyToken(
    tokenResponse.id_token,
    // exampleResponseOttakringer.id_token,
    {
      verifyExpiry: false,
    }
  );

  return (
    <div className="flex w-screen flex-col items-center justify-items-center align-middle">
      <div>CALLBACK PAGE</div>
      <div>
        <strong>state</strong>: {state}
      </div>
      <JsonTable data={payload} decodeMap={decodeMap} />
    </div>
  );
}

const decodeMap: { [key: string]: (value: never) => React.ReactNode | object } = {
  'org.iso.18013.5.1:portrait': (value) => <Base64Img base64={value} />,
  'org.iso.18013.5.1:signature_usual_mark': (value) => <Base64Img base64={value} />,
  lichtbild: (value) => <Base64Img base64={value} />,
  unterschrift: (value) => <Base64Img base64={value} />,
  'urn:eidgvat:attributes.furtherResidences': (value) => decodeFromBase64(value),
  'urn:eidgvat:attributes.idCardData': (value) => decodeFromBase64(value),
  'urn:eidgvat:attributes.gda': (value) => decodeFromBase64(value),
  'urn:eidgvat:attributes.identificationDocumentData': (value) => decodeFromBase64(value),
  'urn:eidgvat:attributes.mainAddress': (value) => decodeFromBase64(value),
  'urn:eidgvat:attributes.nationality': (value) => decodeFromBase64(value),
  'urn:eidgvat:attributes.passportData': (value) => decodeFromBase64(value),
  'urn:eidgvat:attributes.vehicleRegistrations': (value) => decodeFromBase64(value),
};

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
