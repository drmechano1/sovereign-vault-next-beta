// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/:path*"], // match EVERYTHING for the test
};

export function middleware(req: NextRequest) {
  return new NextResponse("Auth Test — middleware is ACTIVE", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Sovereign Vault Test"',
    },
  });
}
