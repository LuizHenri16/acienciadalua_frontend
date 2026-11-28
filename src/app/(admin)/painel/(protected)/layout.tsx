import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth/constants";
import { ADMIN_SIGNIN_ROUTE } from "@/lib/auth/routes";
import { AdminShell } from "@/components/admin/layout/admin-shell";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();

  if (!cookieStore.get(ADMIN_TOKEN_COOKIE)?.value) {
    redirect(ADMIN_SIGNIN_ROUTE);
  }

  return <AdminShell>{children}</AdminShell>;
}
