'use client';
// @flow
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useCallback } from 'react';

type Props = {
  //
};

export function StartAuthentication(props: Props) {
  const startAuthentication = useCallback(() => {
    const url = new URL(process.env.NEXT_PUBLIC_OIDC_AUTHORIZATION_URI);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('client_id', process.env.NEXT_PUBLIC_OIDC_CLIENT_ID);
    url.searchParams.append('scope', 'openid profile');
    url.searchParams.append('state', 'somestate');
    url.searchParams.append('redirect_uri', process.env.NEXT_PUBLIC_OIDC_REDIRECT_URI);
    window.location.href = url.toString();
  }, []);
  return (
    <div>
      <Button onClick={startAuthentication}> Login with ID Austria</Button>
    </div>
  );
}
