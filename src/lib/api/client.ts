import { API_URL } from "@/lib/config/env";

export function apiUrl(path: string): string {
  return `${API_URL}${path}`;
}

export function uploadUrl(file?: string | null): string | null {
  return file ? `${API_URL}/uploads/${file}` : null;
}
