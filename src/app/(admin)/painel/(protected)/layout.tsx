import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/layout/admin-shell";

// TEMPORARY: Auth redirect disabled for /painel access without login (revert on request)
export default async function ProtectedAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
