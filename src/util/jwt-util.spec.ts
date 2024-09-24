import { expect, test } from 'vitest';
import { verifyToken } from '@/util/jwt-util';
import * as exampleResponseOttakringer from '@/__tests__/response/token_ottakringer.json';

test('verifyToken', async () => {
  const decodedJWT = await verifyToken(exampleResponseOttakringer.id_token, {
    verifyExpiry: false,
  });
  // console.log('Decoded JWT payload:', decodedJWT);
  // console.log('keys in JWT payload:', Object.keys(decodedJWT).sort());

  expect(decodedJWT).toBeDefined();
});
