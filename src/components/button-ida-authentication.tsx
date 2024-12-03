'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useCallback } from 'react';
import Image from 'next/image';
import type { ButtonProps } from '@/components/ui/button';

export function ButtonIdaAuthentication(props: ButtonProps) {
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
    <Button {...props} onClick={startAuthentication}>
      <div className="relative h-full min-w-full">
        <Image src="/images/id-austria-logo.svg" alt="ID Austria" fill={true} objectFit="contain" />
      </div>
    </Button>
  );
}
