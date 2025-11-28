import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the Basic Auth credentials from environment
  const basicAuthPassword = process.env.BETA_PASSWORD;
  
  if (!basicAuthPassword) {
    // If no password is set, allow access (for development)
    return NextResponse.next();
  }

  // Check for authorization header
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    // No auth provided, request it
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Sovereign Vault Beta Access"',
      },
    });
  }

  // Decode and verify credentials
  try {
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    // Check password (username can be anything)
    if (password === basicAuthPassword) {
      return NextResponse.next();
    }
  } catch (error) {
    // Invalid auth format
  }

  // Invalid credentials
  return new NextResponse('Invalid credentials', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Sovereign Vault Beta Access"',
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all paths except static files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
