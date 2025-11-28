import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Beta password protection middleware - v1.0

export function middleware(request: NextRequest) {
  // Check if user is authenticated
  const isAuthenticated = request.cookies.get('beta-auth')?.value === 'authenticated';
  const isAuthPage = request.nextUrl.pathname === '/auth';
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');

  // Allow auth page and API routes without authentication
  if (isAuthPage || isApiRoute) {
    return NextResponse.next();
  }

  // Redirect to auth page if not authenticated
  if (!isAuthenticated) {
    const authUrl = new URL('/auth', request.url);
    return NextResponse.redirect(authUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
