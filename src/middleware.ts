import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Edge Runtime compatible
export const config = {
  runtime: 'edge',
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};

export function middleware(request: NextRequest) {
  // CRITICAL: Edge Runtime requires environment variables to be accessed this way
  const basicAuthPassword = process.env.BETA_PASSWORD;
  
  console.log('[Middleware] BETA_PASSWORD exists:', !!basicAuthPassword);
  
  // ALWAYS require auth - don't skip even if password not configured
  // This ensures the site is protected by default
  if (!basicAuthPassword) {
    console.error('[Middleware] BETA_PASSWORD not configured!');
    return new NextResponse('Site is password protected but password not configured', {
      status: 503,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
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

  try {
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
  } catch (error) {
    return new NextResponse('Invalid authentication format', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Sovereign Vault Beta"',
      },
    });
  }
}
