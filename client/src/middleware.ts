import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    try {
        const requestURL = new URL(request.url);
        const referrerURL = new URL(request.headers.get("referer") || "");

        if (requestURL.origin != referrerURL.origin) {
            throw new Error("origin mismatch");
        }

        return NextResponse.next();
    } catch {
        return NextResponse.redirect("http://localhost:3000/");
    }
}

export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|$).*)',
    ],
  };