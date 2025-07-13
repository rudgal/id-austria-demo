# ID Austria Login Demo

<div align="center">
  <img src="./public/images/sp-logo.png" alt="Login Demo"/>
  
  <p><em>A Next.js proof-of-concept demonstrating ID Austria authentication integration using OpenID Connect (OIDC)</em></p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38bdf8)](https://tailwindcss.com/)
</div>

## Overview

This application demonstrates how to integrate ID Austria authentication into a web application using the OpenID Connect (OIDC) protocol. ID Austria is Austria's official digital identity solution that allows Austrian citizens to authenticate securely using their digital identity.

### Key Features

- 🔐 **Secure Authentication**: OIDC integration with ID Austria's official endpoints
- 🛡️ **JWT Verification**: Token validation using JWKS from ID Austria
- 🎨 **Modern UI**: Built with Next.js 14, Tailwind CSS, and shadcn/ui components

## Authentication Flow

This demo implements the OpenID Connect (OIDC) authentication flow for ID Austria as described in their [integration guide](https://www.id-austria.gv.at/de/developer/anbinden/anbindung-mit-openid-connect). The flow consists of the following steps:

1. **Initiation**: User clicks "ID Austria" button
2. **Authorization**: Redirect to ID Austria authorization endpoint
3. **Authentication**: User authenticates with test identity credentials
4. **Callback**: ID Austria redirects back to `/cb` with authorization code
5. **Token Exchange**: App exchanges code for access and ID tokens
6. **Verification**: JWT token verified using JWKS from ID Austria
7. **Access**: User can navigate and inspect JWT token claims

For more info on OIDC heckout the [OpenID Connect documentation](https://openid.net/connect/).


## Quick Start

### Prerequisites

- Node.js 18+ and npm
- IDA Service Provider, [register here](https://www.id-austria.gv.at/de/developer/registrieren).

### HowTo Run

```bash
# Install dependencies
npm install

# Set up environment variables (see Configuration section)
cp .env.example .env
# Edit .env with your actual ID Austria credentials

# Start development server (requires sudo on macOS/Linux for port 443)
sudo npm run dev
```

The application will be available at `https://localhost:443`

### Configuration

For **local development** (`npm run dev`), copy `.env.example` to `.env` and configure your ID Austria credentials. 

The `.env.example` file contains all required environment variables with detailed explanations:
- **OIDC Client Configuration**: Your registered service provider credentials
- **Server-side OAuth Settings**: Token exchange and client secret
- **JWT Verification**: Public key endpoints and validation parameters

Dependent on your deployment target you might also need a `.dev.vars`, see [OpenNext.js Cloudflare integration](https://opennext.js.org/cloudflare).

## Testing with Predefined Test Identities

This application uses ID Austria's test environment. For testing, use the [predefined test identities](https://www.id-austria.gv.at/de/developer/testen/vordefinierte-testidentit%C3%A4ten) provided in the official documentation.

## Project Structure

```
id-austria-demo/
├── public/
│   └── images/             # ID Austria logos and branding assets
│       ├── id-austria-logo.svg
│       └── sp-logo.png
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── cb/             # OAuth callback handler
│   │   │   └── page.tsx
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Main demo page
│   ├── components/         # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── demo-page.tsx
│   │   ├── jwt-navigator.tsx
│   │   └── login-form.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── use-toast.ts
│   ├── lib/                # Utility libraries
│   │   └── utils.ts
│   ├── mdx/                # MDX content pages
│   │   └── HowTo.mdx
│   ├── styles/             # Global styles
│   │   └── globals.css
│   ├── types/              # TypeScript definitions
│   │   └── json.d.ts
│   └── util/               # Utility functions
│       ├── jwt-util.ts     # JWT verification logic
│       └── jwt-util.spec.ts
├── .dev.vars.example       # Environment template for local dev
├── next.config.mjs         # Next.js configuration
├── open-next.config.ts     # OpenNext.js Cloudflare config
├── tailwind.config.ts      # Tailwind CSS configuration
└── vitest.config.ts        # Vitest test configuration
```

## ID Austria Integration Resources

### Developer Registration
To integrate with ID Austria in production, you need to register as a service provider:
- **Public/Government Providers**: Register through IDA SP Registration System
- **Private Providers**: Available for commercial service integration
- **Protocols Supported**: OpenID Connect (OIDC) and SAML2

### ID Austria Documentation
- [Registration](https://www.id-austria.gv.at/de/developer/registrieren)
- [Test Identities](https://www.id-austria.gv.at/de/developer/testen/vordefinierte-testidentit%C3%A4ten)
- [Integration Guide](https://www.id-austria.gv.at/de/developer/anbinden)
- [Status Monitor](https://www.id-austria.gv.at/de/developer/betreiben/status-monitor)

#### Legacy Docs
- [OIDC Integration Guide (Legacy)](https://eid.egiz.gv.at/anbindung/direkte-anbindung/anbindung-oidc/)
- [Test System (Legacy)](https://eid.egiz.gv.at/anbindung/testidentitaeten/)
- [Private Service Provider Registration (Legacy)](https://eid.egiz.gv.at/anbindung/registrierung/registrierung-von-privaten-service-providern/)
- [Predefined Test Identities (Legacy)](https://eid.egiz.gv.at/anbindung/testidentitaeten/vordefinierte-testidentitaeten/)

## Disclaimer

This is a proof-of-concept demonstration, no guarantees given and not suitable for use in production.

Please refer to ID Austria's official documentation for production implementation guidelines.

---

<div align="center">
  <p>Built with ❤️ for the Austrian digital identity ecosystem.</p>
</div>
