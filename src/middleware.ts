import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Edge Runtime compatible
export const config = {
  runtime: 'edge',
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};

export function middleware(request: NextRequest) {
  const basicAuthPassword = process.env.BETA_PASSWORD;
  
  // Skip auth if no password is configured
  if (!basicAuthPassword) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get('authorization');

  // Request authentication if not provided
  if (!authHeader) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Sovereign Vault Beta"',
      },
    });
  }

  // Parse Basic Auth
  const auth = authHeader.split(' ')[1];
  const [user, pass] = atob(auth).split(':');

  // Verify password
  if (pass !== basicAuthPassword) {
    return new NextResponse('Invalid credentials', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Sovereign Vault Beta"',
      },
    });
  }

  return NextResponse.next();
}
