import { HttpError } from "./http-error";

export async function adminSignIn(
  email: string,
  password: string,
): Promise<void> {
  const response = await fetch("/api/session/admin/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new HttpError("Credenciais inválidas", response.status);
  }

  await response.json();
}
