import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_TOKEN_COOKIE, CUSTOMER_TOKEN_COOKIE } from "@/lib/auth/constants";
import { API_URL } from "@/lib/config/env";

const MAX_REQUEST_BYTES = 32 * 1024 * 1024;

type Role = "admin" | "customer";

function requiredRole(method: string, path: string): Role | null {
  if (path === "/customers/me" && method === "GET") return "customer";
  if (path === "/customers/me/purchases" && method === "GET") return "customer";
  if (/^\/customers\/me\/downloads\/[A-Za-z0-9_-]+$/.test(path) && method === "GET") return "customer";

  if (path === "/products" && ["GET", "POST"].includes(method)) return "admin";
  if (/^\/products\/[A-Za-z0-9_-]+$/.test(path) && ["GET", "PUT", "DELETE"].includes(method)) return "admin";
  if (/^\/products\/[A-Za-z0-9_-]+\/toggle$/.test(path) && method === "PATCH") return "admin";
  if (["/admin/sales", "/admin/customers", "/admin/products/sales-count"].includes(path) && method === "GET") return "admin";
  if (path === "/admin/dashboard" && method === "GET") return "admin";
  if (path === "/admin/settings" && ["GET", "PUT"].includes(method)) return "admin";

  return null;
}

async function readBoundedBody(request: Request): Promise<ArrayBuffer | null> {
  if (!request.body) return null;
  const declaredSize = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredSize) && declaredSize > MAX_REQUEST_BYTES) {
    throw new RangeError("Request body too large");
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_REQUEST_BYTES) {
        await reader.cancel();
        throw new RangeError("Request body too large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new ArrayBuffer(size);
  const bytes = new Uint8Array(body);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return body;
}

async function handle(request: Request, params: Promise<{ path: string[] }>) {
  const { path: segments } = await params;
  const path = `/${segments.join("/")}`;
  const method = request.method.toUpperCase();
  const role = requiredRole(method, path);
  if (!role) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const cookieStore = await cookies();
  const token = cookieStore.get(role === "admin" ? ADMIN_TOKEN_COOKIE : CUSTOMER_TOKEN_COOKIE)?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: ArrayBuffer | null = null;
  if (["POST", "PUT", "PATCH"].includes(method)) {
    try {
      body = await readBoundedBody(request);
    } catch {
      return NextResponse.json({ error: "Request body too large" }, { status: 413 });
    }
  }

  const upstreamUrl = new URL(`${API_URL.replace(/\/$/, "")}${path}`);
  if (path === "/admin/dashboard") {
    const period = new URL(request.url).searchParams.get("period");
    if (period && ["day", "week", "month", "year"].includes(period)) {
      upstreamUrl.searchParams.set("period", period);
    }
  }

  const headers = new Headers({ Authorization: `Bearer ${token}` });
  const contentType = request.headers.get("content-type");
  if (body && contentType) headers.set("Content-Type", contentType);

  try {
    const upstream = await fetch(upstreamUrl, {
      method,
      headers,
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(20_000),
    });
    const responseHeaders = new Headers();
    for (const name of ["content-type", "content-disposition", "cache-control"]) {
      const value = upstream.headers.get(name);
      if (value) responseHeaders.set(name, value);
    }
    responseHeaders.set("Cache-Control", "no-store");
    return new Response(upstream.body, { status: upstream.status, headers: responseHeaders });
  } catch {
    return NextResponse.json({ error: "Service unavailable" }, { status: 502 });
  }
}

export async function GET(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return handle(request, context.params);
}
export async function POST(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return handle(request, context.params);
}
export async function PUT(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return handle(request, context.params);
}
export async function PATCH(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return handle(request, context.params);
}
export async function DELETE(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return handle(request, context.params);
}
