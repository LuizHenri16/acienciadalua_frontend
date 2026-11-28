import type { Material } from "@/types/material";
import type {
  AdminCustomer,
  AdminDashboardPayload,
  AdminSale,
  AdminSettings,
  DashboardPeriod,
} from "@/types/admin";
import { apiUrl, privateApiUrl } from "./client";
import { HTTP_ONLY_SESSION } from "@/lib/auth/cookies";
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

// Go serializes decimal values as strings; the panel works with numbers.
function decimalToNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : fallback;
  if (typeof value === "string") {
    const parsed = Number(value);
    return value.trim() !== "" && Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
}

function normalizeProduct(product: Material): Material {
  return { ...product, price: decimalToNumber(product.price) };
}

async function fetchProducts(token: string): Promise<Material[]> {
  const products = await adminGetProducts(token);
  return products.map(normalizeProduct);
}

type RawDashboard = Omit<AdminDashboardPayload, "isDemo" | "productsLive">;

function normalizeDashboard(data: RawDashboard): RawDashboard {
  return {
    ...data,
    kpis: {
      ...data.kpis,
      monthlyRevenue: decimalToNumber(data.kpis.monthlyRevenue),
      previousMonthlyRevenue: decimalToNumber(data.kpis.previousMonthlyRevenue),
    },
    periodSummary: {
      ...data.periodSummary,
      totalRevenue: decimalToNumber(data.periodSummary.totalRevenue),
      averageTicket: decimalToNumber(data.periodSummary.averageTicket),
    },
    revenueSeries: (data.revenueSeries ?? []).map((point) => ({
      ...point,
      revenue: decimalToNumber(point.revenue),
    })),
    topProducts: (data.topProducts ?? []).map((product) => ({
      ...product,
      revenue: decimalToNumber(product.revenue),
      price: decimalToNumber(product.price),
    })),
    recentSales: (data.recentSales ?? []).map((sale) => ({
      ...sale,
      amount: decimalToNumber(sale.amount),
    })),
    recentActivity: data.recentActivity ?? [],
  };
}

async function fetchJsonWithAuth<T>(path: string, token: string): Promise<T | null> {
  if (!token) return null;
  try {
    const response = await fetch(token === HTTP_ONLY_SESSION ? privateApiUrl(path) : apiUrl(path), {
      ...(token === HTTP_ONLY_SESSION ? {} : { headers: { Authorization: `Bearer ${token}` } }),
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
    const products = await fetchProducts(token);
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
    fetchJsonWithAuth<RawDashboard>(
      `/admin/dashboard?period=${encodeURIComponent(period)}`,
      token
    ),
    fetchProducts(token).catch(() => null),
  ]);

  if (liveDashboard) {
    return {
      ...normalizeDashboard(liveDashboard),
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
    return {
      data: liveSales.map((sale) => ({ ...sale, amount: decimalToNumber(sale.amount) })),
      isDemo: false,
    };
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
    return {
      data: liveCustomers.map((customer) => ({
        ...customer,
        totalSpent: decimalToNumber(customer.totalSpent),
        purchases: (customer.purchases ?? []).map((purchase) => ({
          ...purchase,
          amount: decimalToNumber(purchase.amount),
        })),
      })),
      isDemo: false,
    };
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
    const response = await fetch(token === HTTP_ONLY_SESSION ? privateApiUrl("/admin/settings") : apiUrl("/admin/settings"), {
      method: "PUT",
      headers: token === HTTP_ONLY_SESSION
        ? { "Content-Type": "application/json" }
        : { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
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
