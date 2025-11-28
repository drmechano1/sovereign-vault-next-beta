// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Protect every route
export const config = {
  matcher: '/:path*',
};

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  // No auth header at all → ask for credentials
  if (!authHeader) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Sovereign Vault Beta"',
      },
    });
  }

  // Expect "Basic base64(user:pass)"
  const [scheme, encoded] = authHeader.split(' ');

  if (scheme !== 'Basic' || !encoded) {
    return new NextResponse('Invalid auth', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Sovereign Vault Beta"',
      },
    });
  }

  const decoded = Buffer.from(encoded, 'base64').toString('utf8');
  const [user, pass] = decoded.split(':');

  const expectedUser = process.env.BASIC_AUTH_USER;
  const expectedPass = process.env.BASIC_AUTH_PASS;

  if (!expectedUser || !expectedPass) {
    console.warn('BASIC_AUTH_USER or BASIC_AUTH_PASS is not set');
    return NextResponse.next(); // fail open if env vars missing
  }

  if (user === expectedUser && pass === expectedPass) {
    return NextResponse.next();
  }

  // Wrong credentials
  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Sovereign Vault Beta"',
    },
  });
}
