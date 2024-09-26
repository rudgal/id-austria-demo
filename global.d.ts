declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    JWKS_URI: string;
    JWT_ISSUER: string;
    JWT_AUDIENCE: string;
    OIDC_TOKEN_ENDPOINT: string;
    OIDC_CLIENT_SECRET: string;
    NEXT_PUBLIC_OIDC_CLIENT_ID: string;
    NEXT_PUBLIC_OIDC_REDIRECT_URI: string;
    NEXT_PUBLIC_OIDC_AUTHORIZATION_URI: string;
  }
}
