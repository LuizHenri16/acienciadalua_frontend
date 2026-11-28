import { NextResponse } from "next/server";
import { API_URL } from "@/lib/config/env";

const MAX_BODY_BYTES = 8 * 1024;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5_000;

type ContactBody = {
  name: string;
  email: string;
  message: string;
};

class InvalidBodyError extends Error {}

async function readBoundedJson(request: Request): Promise<unknown> {
  const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") {
    throw new InvalidBodyError("Unsupported content type");
  }

  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    throw new InvalidBodyError("Request body is too large");
  }

  if (!request.body) throw new InvalidBodyError("Missing request body");

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
        throw new InvalidBodyError("Request body is too large");
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
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch {
    throw new InvalidBodyError("Invalid JSON body");
  }
}

function validateContactBody(value: unknown): ContactBody | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const body = value as Record<string, unknown>;
  if (
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.message !== "string"
  ) {
    return null;
  }

  const name = body.name.trim();
  const email = body.email.trim();
  const message = body.message.trim();
  if (
    !name || name.length > MAX_NAME_LENGTH ||
    !email || email.length > MAX_EMAIL_LENGTH ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !message || message.length > MAX_MESSAGE_LENGTH
  ) {
    return null;
  }

  return { name, email, message };
}

export async function POST(request: Request) {
  let parsed: unknown;
  try {
    parsed = await readBoundedJson(request);
  } catch {
    return NextResponse.json(
      { error: "Envie um formulário de contato válido." },
      { status: 400 },
    );
  }

  const body = validateContactBody(parsed);
  if (!body) {
    return NextResponse.json(
      { error: "Informe nome, e-mail e mensagem válidos." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("O serviço de contato recusou a solicitação:", response.status);
      return NextResponse.json(
        { error: "Não foi possível enviar sua mensagem. Tente novamente mais tarde." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    console.error("O serviço de contato está indisponível.");
    return NextResponse.json(
      { error: "Não foi possível enviar sua mensagem. Tente novamente mais tarde." },
      { status: 502 },
    );
  }
}
