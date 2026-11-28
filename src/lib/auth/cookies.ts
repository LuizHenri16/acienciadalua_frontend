// Client-side marker helpers. Never treat these non-secret marker cookies as
// authentication; the BFF reads the HttpOnly credentials from the request.
const CUSTOMER_MARKER = "acl_customer_session";
const ADMIN_MARKER = "acl_admin_session";
export const HTTP_ONLY_SESSION = "__http_only_session__";

function readCookie(name: string): string {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  if (!match) return "";
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return "";
  }
}

export function getCustomerToken(): string {
  return readCookie(CUSTOMER_MARKER) === "1" ? HTTP_ONLY_SESSION : "";
}

export function getAdminToken(): string {
  return readCookie(ADMIN_MARKER) === "1" ? HTTP_ONLY_SESSION : "";
}

export async function clearCustomerToken(): Promise<void> {
  await fetch("/api/session/logout", { method: "POST", cache: "no-store" });
}

export async function clearAdminTokens(): Promise<void> {
  await fetch("/api/session/logout", { method: "POST", cache: "no-store" });
}
