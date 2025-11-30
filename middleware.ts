// TEST MIDDLEWARE – always blocks
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Run on EVERYTHING except internal static assets
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};

export function middleware(req: NextRequest) {
  return new NextResponse("SV TEST MIDDLEWARE BLOCKING", {
    status: 401,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
