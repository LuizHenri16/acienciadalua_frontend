import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CUSTOMER_TOKEN_COOKIE } from "@/lib/auth/constants";
import { CUSTOMER_SIGNIN_ROUTE } from "@/lib/auth/routes";

export default async function ProtectedAccountLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();

  if (!cookieStore.get(CUSTOMER_TOKEN_COOKIE)) {
    redirect(CUSTOMER_SIGNIN_ROUTE);
  }

  return children;
}
