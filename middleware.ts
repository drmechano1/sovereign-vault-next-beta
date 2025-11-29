import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER;
const BASIC_AUTH_PASS = process.env.BASIC_AUTH_PASS;

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};

export function middleware(req: NextRequest) {
  if (!BASIC_AUTH_USER || !BASIC_AUTH_PASS) {
    return new NextResponse("Auth env vars missing", { status: 500 });
  }

  const auth = req.headers.get("authorization");
  
  if (!auth) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Sovereign Vault Beta"',
      },
    });
  }

  const encoded = auth.split(" ")[1];
  const decoded = Buffer.from(encoded, "base64").toString();
  const [user, pass] = decoded.split(":");

  if (user === BASIC_AUTH_USER && pass === BASIC_AUTH_PASS) {
    return NextResponse.next();
  }

  return new NextResponse("Not authorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Sovereign Vault Beta"',
    },
  });
}
