import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has("auth");
  const isAuthPage = request.nextUrl.pathname === "/signUp";

  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL("/signUp", request.url));
  }

  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - icons (your icons directory)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|icons).*)",
  ],
};
