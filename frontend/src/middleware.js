import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  const protectedRoutes = [
    "/homeowner",
    "/tradesperson",
    "/jobs"
  ];

  const path = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );

  if (isProtectedRoute && !token) {
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