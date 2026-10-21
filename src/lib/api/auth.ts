import { apiUrl } from "./client";
import { HttpError } from "./http-error";

export async function adminSignIn(
  email: string,
  password: string,
): Promise<{ access_token: string; refresh_token: string }> {
  const response = await fetch(apiUrl("/auth/admin/signin"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new HttpError("Credenciais inválidas", response.status);
  }

  return response.json();
}
