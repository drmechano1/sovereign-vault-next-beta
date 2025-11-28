import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow auth page and API routes
  if (pathname === '/auth' || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }
  
  // Check authentication cookie
  const authCookie = request.cookies.get('beta-auth');
  
  if (!authCookie || authCookie.value !== 'authenticated') {
    // Redirect to auth page
    return NextResponse.redirect(new URL('/auth', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except static files and images
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
