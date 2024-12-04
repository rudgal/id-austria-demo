import { createRemoteJWKSet, JWTPayload, jwtVerify, JWTVerifyOptions } from 'jose';

// Verification-related code (only initialize if environment variables are present)
let jwks: ReturnType<typeof createRemoteJWKSet> | undefined;

if (process.env.JWKS_URI) {
  jwks = createRemoteJWKSet(new URL(process.env.JWKS_URI));
}

async function verifyToken(token: string, options = { verifyExpiry: true }): Promise<JWTPayload> {
  if (!jwks) {
    throw new Error('JWKS_URI environment variable is not configured');
  }

  try {
    const verifyOptions: JWTVerifyOptions = {
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
    };

    if (!options.verifyExpiry) {
      verifyOptions.clockTolerance = Number.MAX_SAFE_INTEGER;
    }

    const { payload } = await jwtVerify(token, jwks, verifyOptions);
    return payload;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw error;
  }
}

// Decoding-related code (doesn't require environment variables)
export function decodeJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(decodeBase64(base64));
  } catch (error) {
    throw new Error('Invalid JWT token');
  }
}

export function isBase64(str: string) {
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
}

export function decodeBase64(str: string) {
  try {
    return atob(str);
  } catch (error) {
    throw new Error('Invalid base64 string');
  }
}

export { verifyToken };
