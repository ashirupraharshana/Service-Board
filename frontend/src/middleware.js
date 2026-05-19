import { NextResponse } from "next/server";

export function middleware(request) {

  const token = request.cookies.get("token") ||
    request.headers.get("authorization");

  const isLoggedIn =
    request.cookies.get("token");

  const protectedRoutes = [
    "/homeowner",
    "/tradesperson",
    "/jobs"
  ];

  const path = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some(
    (route) => path.startsWith(route)
  );

  if (isProtected && !isLoggedIn) {

    return NextResponse.redirect(
      new URL("/auth-required", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {

  matcher: [
    "/homeowner/:path*",
    "/tradesperson/:path*",
    "/jobs/:path*"
  ]
};