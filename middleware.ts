// middleware.ts  (place in project root)
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER;
const BASIC_AUTH_PASS = process.env.BASIC_AUTH_PASS;

// Run on every non-static request
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};

export function middleware(req: NextRequest) {
  // Fail closed if env vars missing
  if (!BASIC_AUTH_USER || !BASIC_AUTH_PASS) {
    return new NextResponse("Auth not configured", { status: 500 });
  }

  const authHeader = req.headers.get("authorization");

  // No Authorization header → ask for credentials
  if (!authHeader) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Sovereign Vault Beta"',
      },
    });
  }

  const [scheme, encoded] = authHeader.split(" ");

  if (scheme !== "Basic" || !encoded) {
    return new NextResponse("Invalid auth", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Sovereign Vault Beta"',
      },
    });
  }

  const decoded = Buffer.from(encoded, "base64").toString("utf8");
  const [user, pass] = decoded.split(":");

  if (user === BASIC_AUTH_USER && pass === BASIC_AUTH_PASS) {
    // OK – let the request through
    return NextResponse.next();
  }

  // Wrong username or password
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Sovereign Vault Beta"',
    },
  });
}
