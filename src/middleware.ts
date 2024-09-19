// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  if (!token) {
    const redirectUrl = new URL("/", request?.url);
    redirectUrl?.searchParams?.set(
      "redirect",
      request?.nextUrl?.pathname?.substring(1)
    );
    return NextResponse.redirect(redirectUrl);
  }
  return NextResponse.next();
}

export const config = {
  // matcher: ["/dashboard", "/cruds", "/upload"],
  matcher: [],
};
