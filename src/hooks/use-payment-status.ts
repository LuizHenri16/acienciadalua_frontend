"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getPaymentStatus, PaymentApiError } from "@/lib/api/payments";
import { readPaymentSession } from "@/lib/payment/session";
import type { PaymentStatusResponse } from "@/types/payment";

export type PaymentStatusView =
  | { state: "checking" }
  | { state: "result"; status: PaymentStatusResponse }
  | { state: "unauthorized" }
  | { state: "not_found" }
  | { state: "unavailable"; message: string };

interface UsePaymentStatusOptions {
  paymentId?: string | null;
  /** Explicit token (right after creating the PIX). Falls back to sessionStorage. */
  token?: string | null;
  poll?: boolean;
  /** Stop automatic polling after this long; the user can still check manually. */
  maxWaitMs?: number;
  onApproved?: (status: PaymentStatusResponse) => void;
}

interface UsePaymentStatusResult {
  view: PaymentStatusView;
  checking: boolean;
  refresh: () => void;
}

const POLL_INTERVAL_MS = 4_000;
const SLOW_POLL_INTERVAL_MS = 8_000;
const DEFAULT_MAX_WAIT_MS = 120_000;

/**
 * Polls POST /payment/status. The hook fails closed: network/authorization
 * errors never become "approved", and approved is only reported when the
 * backend also sets accessGranted.
 */
export function usePaymentStatus({
  paymentId,
  token,
  poll = true,
  maxWaitMs = DEFAULT_MAX_WAIT_MS,
  onApproved,
}: UsePaymentStatusOptions): UsePaymentStatusResult {
  const [view, setView] = useState<PaymentStatusView>(() =>
    paymentId ? { state: "checking" } : { state: "unauthorized" },
  );
  const [checking, setChecking] = useState(false);

  const approvedRef = useRef(false);
  const startedAtRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);
  const onApprovedRef = useRef(onApproved);

  useEffect(() => {
    onApprovedRef.current = onApproved;
  }, [onApproved]);

  const check = useCallback(async () => {
    if (!paymentId) {
      setChecking(false);
      setView({ state: "unauthorized" });
      return;
    }
    if (approvedRef.current || controllerRef.current) return;

    const stored = readPaymentSession(paymentId);
    const statusToken = token || stored?.token;
    if (!statusToken) {
      setChecking(false);
      setView({ state: "unauthorized" });
      return;
    }

    setView({ state: "checking" });
    const controller = new AbortController();
    controllerRef.current = controller;
    setChecking(true);

    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 12_000);

    try {
      const status = await getPaymentStatus(
        { paymentId, token: statusToken },
        controller.signal,
      );
      if (!mountedRef.current || controller.signal.aborted) return;

      setView({ state: "result", status });
      if (status.status === "approved" && status.accessGranted) {
        approvedRef.current = true;
        onApprovedRef.current?.(status);
      }
    } catch (error) {
      if (!mountedRef.current) return;
      if (timedOut) {
        setView({
          state: "unavailable",
          message: "A verificação demorou mais que o esperado. Tente novamente.",
        });
        return;
      }
      if (controller.signal.aborted) return;

      if (error instanceof PaymentApiError) {
        if (error.status === 401 || error.status === 403) {
          setView({ state: "unauthorized" });
        } else if (error.status === 404) {
          setView({ state: "not_found" });
        } else {
          setView({
            state: "unavailable",
            message: error.message || "Não foi possível verificar o pagamento.",
          });
        }
      } else {
        setView({
          state: "unavailable",
          message: "Não foi possível verificar o pagamento. Tente novamente.",
        });
      }
    } finally {
      clearTimeout(timeout);
      if (controllerRef.current === controller) {
        controllerRef.current = null;
        if (mountedRef.current) setChecking(false);
      }
    }
  }, [paymentId, token]);

  // Initial check whenever the payment changes. Aborts on unmount.
  useEffect(() => {
    mountedRef.current = true;
    startedAtRef.current = Date.now();
    approvedRef.current = false;

    // Deferred so the effect only starts the request; React can render the
    // initial "checking" state without a cascading synchronous update.
    const initialCheck = setTimeout(() => {
      void check();
    }, 0);

    return () => {
      clearTimeout(initialCheck);
      mountedRef.current = false;
      controllerRef.current?.abort();
      controllerRef.current = null;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [check]);

  // Poll while the payment is pending, pausing when the tab is hidden.
  useEffect(() => {
    if (!poll) return;
    if (view.state !== "result") return;
    if (view.status.status !== "pending") return;

    const elapsed = Date.now() - startedAtRef.current;
    if (elapsed >= maxWaitMs) return;

    const delay = elapsed < 60_000 ? POLL_INTERVAL_MS : SLOW_POLL_INTERVAL_MS;
    timerRef.current = setTimeout(() => {
      if (typeof document !== "undefined" && document.visibilityState === "hidden") {
        return;
      }
      void check();
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [view, poll, maxWaitMs, check]);

  // Check immediately when the user returns to the tab.
  useEffect(() => {
    if (!poll) return;

    function handleVisibility() {
      if (document.visibilityState !== "visible") return;
      if (view.state !== "result" || view.status.status !== "pending") return;
      void check();
    }

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [poll, view, check]);

  const refresh = useCallback(() => {
    startedAtRef.current = Date.now();
    void check();
  }, [check]);

  return { view, checking, refresh };
}
