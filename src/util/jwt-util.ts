import { importJWK, JWTPayload, jwtVerify, JWTVerifyOptions, KeyLike, JSONWebKeySet } from 'jose';

// Cache for JWKS keys
let jwksCache: { keys: KeyLike[]; lastFetch: number } | null = null;
const JWKS_CACHE_DURATION = 3600000; // 1 hour

async function fetchJWKS(): Promise<KeyLike[]> {
  if (!process.env.JWKS_URI) {
    throw new Error('JWKS_URI environment variable is not configured');
  }

  // Check cache
  if (jwksCache && Date.now() - jwksCache.lastFetch < JWKS_CACHE_DURATION) {
    return jwksCache.keys;
  }

  try {
    const response = await fetch(process.env.JWKS_URI);
    if (!response.ok) {
      throw new Error(`Failed to fetch JWKS: ${response.statusText}`);
    }

    const jwksData: JSONWebKeySet = await response.json();
    const keys = await Promise.all(jwksData.keys.map((key) => importJWK(key, key.alg))) as KeyLike[];

    jwksCache = { keys, lastFetch: Date.now() };
    return keys;
  } catch (error) {
    console.error('Error fetching JWKS:', error);
    throw error;
  }
}

async function verifyToken(token: string, options = { verifyExpiry: true }): Promise<JWTPayload> {
  try {
    const keys = await fetchJWKS();

    const verifyOptions: JWTVerifyOptions = {
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
    };

    if (!options.verifyExpiry) {
      verifyOptions.clockTolerance = Number.MAX_SAFE_INTEGER;
    }

    // Try each key until one works
    for (const key of keys) {
      try {
        const { payload } = await jwtVerify(token, key, verifyOptions);
        return payload;
      } catch (err) {
        // Continue to next key
      }
    }

    throw new Error('Token could not be verified with any key');
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
