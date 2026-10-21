// Client-side cookie helpers. Never import this module from a Server Component:
// it relies on `document.cookie`.
import {
  ADMIN_REFRESH_TOKEN_COOKIE,
  ADMIN_TOKEN_COOKIE,
  CUSTOMER_TOKEN_COOKIE,
} from "./constants";

function readCookie(name: string): string {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? match[1] : "";
}

export function getCustomerToken(): string {
  return readCookie(CUSTOMER_TOKEN_COOKIE);
}

export function getAdminToken(): string {
  return readCookie(ADMIN_TOKEN_COOKIE);
}

export function setCustomerToken(token: string): void {
  document.cookie = `${CUSTOMER_TOKEN_COOKIE}=${token}; path=/; max-age=3600; SameSite=Strict`;
}

export function setAdminTokens(accessToken: string, refreshToken: string): void {
  document.cookie = `${ADMIN_TOKEN_COOKIE}=${accessToken}; path=/; max-age=3600; SameSite=Strict`;
  document.cookie = `${ADMIN_REFRESH_TOKEN_COOKIE}=${refreshToken}; path=/; max-age=604800; SameSite=Strict`;
}

export function clearCustomerToken(): void {
  document.cookie = `${CUSTOMER_TOKEN_COOKIE}=; path=/; max-age=0`;
}

export function clearAdminTokens(): void {
  document.cookie = `${ADMIN_TOKEN_COOKIE}=; path=/; max-age=0`;
  document.cookie = `${ADMIN_REFRESH_TOKEN_COOKIE}=; path=/; max-age=0`;
}
