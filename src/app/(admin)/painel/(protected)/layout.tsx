import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth/constants";
import { ADMIN_SIGNIN_ROUTE } from "@/lib/auth/routes";

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();

  if (!cookieStore.get(ADMIN_TOKEN_COOKIE)) {
    redirect(ADMIN_SIGNIN_ROUTE);
  }

  return children;
}
