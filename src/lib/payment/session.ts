const STORAGE_PREFIX = "acl:payment:";

export interface StoredPayment {
  token: string;
  email?: string;
  productId?: string;
  savedAt: number;
}

function storageKey(paymentId: string): string {
  return `${STORAGE_PREFIX}${paymentId}`;
}

/**
 * Stores the signed status token for a payment in sessionStorage.
 *
 * The token never goes into the URL: it authorizes reading that single
 * payment and is scoped to the browser tab that generated the PIX.
 */
export function savePaymentSession(
  paymentId: string,
  data: Omit<StoredPayment, "savedAt">,
): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(
      storageKey(paymentId),
      JSON.stringify({ ...data, savedAt: Date.now() }),
    );
  } catch {
    // Private mode/storage full: the success page will fail closed.
  }
}

export function readPaymentSession(paymentId: string): StoredPayment | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(storageKey(paymentId));
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<StoredPayment>;
    if (typeof parsed.token !== "string" || !parsed.token) return null;

    return {
      token: parsed.token,
      email: typeof parsed.email === "string" ? parsed.email : undefined,
      productId: typeof parsed.productId === "string" ? parsed.productId : undefined,
      savedAt: typeof parsed.savedAt === "number" ? parsed.savedAt : 0,
    };
  } catch {
    return null;
  }
}

export function clearPaymentSession(paymentId: string): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(storageKey(paymentId));
  } catch {
    // Ignore storage errors: the backend remains the source of truth.
  }
}
