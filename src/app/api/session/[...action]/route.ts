import { NextResponse } from "next/server";
import {
  ADMIN_REFRESH_TOKEN_COOKIE,
  ADMIN_TOKEN_COOKIE,
  CUSTOMER_TOKEN_COOKIE,
} from "@/lib/auth/constants";
import { API_URL } from "@/lib/config/env";

const ADMIN_MARKER = "acl_admin_session";
const CUSTOMER_MARKER = "acl_customer_session";
const MAX_BODY_BYTES = 8 * 1024;

type SessionAction = {
  endpoint: string;
  role: "admin" | "customer";
  payload: (body: Record<string, unknown>) => Record<string, unknown>;
};

const ACTIONS: Record<string, SessionAction> = {
  "admin/signin": {
    endpoint: "/auth/admin/signin",
    role: "admin",
    payload: ({ email, password }) => ({ email, password }),
  },
  "customer/signin": {
    endpoint: "/auth/user/signin",
    role: "customer",
    payload: ({ email, password }) => ({ email, password }),
  },
  "customer/password": {
    endpoint: "/auth/user/password",
    role: "customer",
    payload: ({ email, password }) => ({ email, password }),
  },
  "customer/reset-password": {
    endpoint: "/auth/user/reset-password",
    role: "customer",
    payload: ({ token, password }) => ({ token, password }),
  },
};

function secureCookie(request: Request) {
  return process.env.NODE_ENV === "production" || new URL(request.url).protocol === "https:";
}

async function readBody(request: Request): Promise<Record<string, unknown> | null> {
  const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") return null;
  const declaredSize = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredSize) && declaredSize > MAX_BODY_BYTES) return null;
  if (!request.body) return null;

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    const value: unknown = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    return value as Record<string, unknown>;
  } catch {
    return null;
  }
}

function validActionBody(action: string, body: Record<string, unknown>) {
  const required = action.endsWith("reset-password")
    ? ["token", "password"]
    : ["email", "password"];
  return required.every((key) => typeof body[key] === "string" && (body[key] as string).length <= 512);
}

export async function POST(request: Request, context: { params: Promise<{ action: string[] }> }) {
  const { action: segments } = await context.params;
  const actionName = segments.join("/");

  if (actionName === "logout") {
    const response = NextResponse.json({ success: true });
    for (const name of [ADMIN_TOKEN_COOKIE, ADMIN_REFRESH_TOKEN_COOKIE, CUSTOMER_TOKEN_COOKIE]) {
      response.cookies.set(name, "", {
        httpOnly: true,
        secure: secureCookie(request),
        sameSite: "strict",
        path: "/",
        maxAge: 0,
      });
    }
    response.cookies.set(ADMIN_MARKER, "", { path: "/", maxAge: 0, sameSite: "strict" });
    response.cookies.set(CUSTOMER_MARKER, "", { path: "/", maxAge: 0, sameSite: "strict" });
    return response;
  }

  const action = ACTIONS[actionName];
  if (!action) return NextResponse.json({ message: "Not found" }, { status: 404 });

  const body = await readBody(request);
  if (!body || !validActionBody(actionName, body)) {
    return NextResponse.json({ message: "Informe credenciais válidas." }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${API_URL.replace(/\/$/, "")}${action.endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(action.payload(body)),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return NextResponse.json({ message: "Não foi possível autenticar agora." }, { status: 502 });
  }

  if (!upstream.ok) {
    let publicMessage = "Credenciais inválidas.";
    if (actionName === "customer/signin" && upstream.status === 401) {
      const upstreamBody = await upstream.json().catch(() => null);
      if (upstreamBody?.message === "NO_PASSWORD_SET") publicMessage = "NO_PASSWORD_SET";
    }
    return NextResponse.json({ message: publicMessage }, { status: upstream.status });
  }

  const result: unknown = await upstream.json().catch(() => null);
  const tokens = result && typeof result === "object" ? result as Record<string, unknown> : {};
  const accessToken = tokens.access_token;
  const refreshToken = tokens.refresh_token;
  if (typeof accessToken !== "string" || !accessToken || (action.role === "admin" && typeof refreshToken !== "string")) {
    return NextResponse.json({ message: "Resposta de autenticação inválida." }, { status: 502 });
  }

  const response = NextResponse.json({ success: true });
  const common = { httpOnly: true, secure: secureCookie(request), sameSite: "strict" as const, path: "/" };
  if (action.role === "admin") {
    response.cookies.set(ADMIN_TOKEN_COOKIE, accessToken, { ...common, maxAge: 60 * 60 });
    response.cookies.set(ADMIN_REFRESH_TOKEN_COOKIE, refreshToken as string, { ...common, maxAge: 7 * 24 * 60 * 60 });
    response.cookies.set(ADMIN_MARKER, "1", { httpOnly: false, secure: secureCookie(request), sameSite: "strict", path: "/", maxAge: 7 * 24 * 60 * 60 });
  } else {
    response.cookies.set(CUSTOMER_TOKEN_COOKIE, accessToken, { ...common, maxAge: 60 * 60 });
    response.cookies.set(CUSTOMER_MARKER, "1", { httpOnly: false, secure: secureCookie(request), sameSite: "strict", path: "/", maxAge: 60 * 60 });
  }
  return response;
}
