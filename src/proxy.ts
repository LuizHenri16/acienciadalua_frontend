import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PROTECTED_ROUTES } from "@/lib/auth/constants";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  for (const route of PROTECTED_ROUTES) {
    if (pathname === route.path || pathname.startsWith(`${route.path}/`)) {
      const skipPaths = [`${route.path}/signin`, `${route.path}/esqueci-senha`, `${route.path}/redefinir-senha`];
      if (skipPaths.some((sp) => pathname === sp || pathname.startsWith(sp))) {
        continue;
      }

      const token = request.cookies.get(route.cookie)?.value;
      if (!token) {
        return NextResponse.redirect(new URL(route.redirectTo, request.url));
      }
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/minha-conta/:path*", "/painel/:path*"],
};
