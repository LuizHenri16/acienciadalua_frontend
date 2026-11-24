import type { Material } from "@/types/material";
import type {
  AdminCustomer,
  AdminDashboardPayload,
  AdminSale,
  AdminSettings,
  DashboardPeriod,
} from "@/types/admin";
import { apiUrl } from "./client";
import { adminGetProducts } from "./admin-products";
import {
  buildDemoDashboard,
  DEFAULT_ADMIN_SETTINGS,
  DEMO_CUSTOMERS,
  DEMO_PRODUCTS,
  DEMO_PRODUCT_SALES_MAP,
  DEMO_SALES,
} from "@/lib/admin/demo-data";

export interface AdminResult<T> {
  data: T;
  isDemo: boolean;
}

async function fetchJsonWithAuth<T>(path: string, token: string): Promise<T | null> {
  if (!token) return null;
  try {
    const response = await fetch(apiUrl(path), {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getAdminProductsWithFallback(
  token: string
): Promise<AdminResult<{ products: Material[]; salesByProduct: Record<string, number> }>> {
  try {
    const products = await adminGetProducts(token);
    const salesMap = await fetchJsonWithAuth<Record<string, number>>(
      "/admin/products/sales-count",
      token
    );
    return {
      data: {
        products,
        salesByProduct: salesMap ?? {},
      },
      isDemo: false,
    };
  } catch {
    return {
      data: {
        products: DEMO_PRODUCTS,
        salesByProduct: DEMO_PRODUCT_SALES_MAP,
      },
      isDemo: true,
    };
  }
}

export async function getAdminDashboardData(
  token: string,
  period: DashboardPeriod
): Promise<AdminDashboardPayload> {
  const [liveDashboard, liveProducts] = await Promise.all([
    fetchJsonWithAuth<Omit<AdminDashboardPayload, "isDemo" | "productsLive">>(
      `/admin/dashboard?period=${encodeURIComponent(period)}`,
      token
    ),
    adminGetProducts(token).catch(() => null),
  ]);

  if (liveDashboard) {
    return {
      ...liveDashboard,
      isDemo: false,
      productsLive: true,
    };
  }

  return buildDemoDashboard(period, liveProducts);
}

export async function getAdminSalesData(
  token: string
): Promise<AdminResult<AdminSale[]>> {
  const liveSales = await fetchJsonWithAuth<AdminSale[]>("/admin/sales", token);
  if (liveSales) {
    return { data: liveSales, isDemo: false };
  }
  return { data: DEMO_SALES, isDemo: true };
}

export async function getAdminCustomersData(
  token: string
): Promise<AdminResult<AdminCustomer[]>> {
  const liveCustomers = await fetchJsonWithAuth<AdminCustomer[]>(
    "/admin/customers",
    token
  );
  if (liveCustomers) {
    return { data: liveCustomers, isDemo: false };
  }
  return { data: DEMO_CUSTOMERS, isDemo: true };
}

export async function getAdminSettingsData(
  token: string
): Promise<AdminResult<AdminSettings>> {
  const liveSettings = await fetchJsonWithAuth<AdminSettings>(
    "/admin/settings",
    token
  );
  if (liveSettings) {
    return { data: liveSettings, isDemo: false };
  }
  return { data: DEFAULT_ADMIN_SETTINGS, isDemo: true };
}

export async function saveAdminSettingsData(
  token: string,
  settings: AdminSettings
): Promise<{ savedRemotely: boolean; settings: AdminSettings }> {
  if (!token) {
    return { savedRemotely: false, settings };
  }

  try {
    const response = await fetch(apiUrl("/admin/settings"), {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings),
    });

    if (response.ok) {
      const updated = (await response.json()) as AdminSettings;
      return { savedRemotely: true, settings: updated };
    }
  } catch {
    // Fallback handled gracefully when endpoint is not yet deployed in Go
  }

  return { savedRemotely: false, settings };
}
