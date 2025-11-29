// deploy test after fixing paths
// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Tell TypeScript / ESLint that atob exists in this environment
// so the build doesn't fail with "Cannot find name 'atob'" or no-undef.
declare const atob: (data: string) => string;

const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER;
const BASIC_AUTH_PASS = process.env.BASIC_AUTH_PASS;

export const config = {
  // Protect everything except static assets and common public files
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};

export function middleware(req: NextRequest) {
  // Fail closed if env vars are missing
  if (!BASIC_AUTH_USER || !BASIC_AUTH_PASS) {
    return new NextResponse("Auth env vars missing", { status: 500 });
  }

  const auth = req.headers.get("authorization");

  // No Authorization header → ask for credentials
  if (!auth) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Sovereign Vault Beta"',
      },
    });
  }

  const [scheme, encoded] = auth.split(" ");

  // Must be Basic <base64>
  if (scheme !== "Basic" || !encoded) {
    return new NextResponse("Invalid auth", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Sovereign Vault Beta"',
      },
    });
  }

  // Edge runtime–friendly base64 decode (no Node Buffer)
  const decoded = atob(encoded);
  const [user, pass] = decoded.split(":");

  if (user === BASIC_AUTH_USER && pass === BASIC_AUTH_PASS) {
    return NextResponse.next();
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Sovereign Vault Beta"',
    },
  });
}
