import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken");

  const protectedPaths = [
    "/trainer-dashboard",
    "/manager-dashboard",
    "/client-dashboard",
  ];

  if (protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    if (!authToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}