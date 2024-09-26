import {
  createRemoteJWKSet,
  JWTPayload,
  jwtVerify,
  JWTVerifyOptions,
} from 'jose';

const JWKS_URI = process.env.JWKS_URI;
const ISSUER = process.env.JWT_ISSUER;
const AUDIENCE = process.env.JWT_AUDIENCE;

const jwks = createRemoteJWKSet(new URL(JWKS_URI));

async function verifyToken(
  token: string,
  options = { verifyExpiry: true }
): Promise<JWTPayload> {
  try {
    const verifyOptions: JWTVerifyOptions = {
      issuer: ISSUER,
      audience: AUDIENCE,
    };
    if (!options.verifyExpiry) {
      verifyOptions.clockTolerance = Number.MAX_SAFE_INTEGER;
    }
    const { payload } = await jwtVerify(token, jwks, verifyOptions);

    // The token is valid. You can now use the payload.
    // console.log('Decoded JWT payload:', payload);
    return payload;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw error;
  }
}

export { verifyToken };
