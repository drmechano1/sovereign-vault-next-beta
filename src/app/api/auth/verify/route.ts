import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const betaPassword = process.env.BETA_PASSWORD;

    if (!betaPassword) {
      return NextResponse.json(
        { success: false, error: 'Beta password not configured' },
        { status: 500 }
      );
    }

    if (password === betaPassword) {
      // Set authentication cookie
      const cookieStore = await cookies();
      cookieStore.set('beta-auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid password' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
