import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  { path: "/minha-conta", cookie: "customer_token", redirectTo: "/minha-conta/signin" },
  { path: "/painel", cookie: "admin_token", redirectTo: "/painel/signin" },
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  for (const route of protectedRoutes) {
    if (pathname === route.path || pathname.startsWith(`${route.path}/`)) {
      const skipPaths = [`${route.path}/signin`];
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
