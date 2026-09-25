import { NextResponse, type NextRequest } from "next/server";

/* Root "/" has no page: every route lives under /[lang]. A permanent redirect
   to the English homepage consolidates link equity on /en (canonical there),
   which is also the x-default target declared in every hreflang set. */
export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL("/en", request.url), 308);
}

export const config = {
  matcher: "/",
};
