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

type RawDashboard = AdminDashboardPayload;

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

async function fetchJsonWithAuth<T>(path: string, token: string): Promise<T> {
  if (!token) throw new Error("A sessão administrativa não está disponível.");
  const response = await fetch(token === HTTP_ONLY_SESSION ? privateApiUrl(path) : apiUrl(path), {
    ...(token === HTTP_ONLY_SESSION ? {} : { headers: { Authorization: `Bearer ${token}` } }),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Falha ao carregar dados do painel (${response.status}).`);
  }
  return (await response.json()) as T;
}

export async function getAdminProductsData(
  token: string
): Promise<{ products: Material[]; salesByProduct: Record<string, number> }> {
  const [products, salesByProduct] = await Promise.all([
    fetchProducts(token),
    fetchJsonWithAuth<Record<string, number>>("/admin/products/sales-count", token),
  ]);
  return { products, salesByProduct };
}

export async function getAdminDashboardData(
  token: string,
  period: DashboardPeriod
): Promise<AdminDashboardPayload> {
  const liveDashboard = await fetchJsonWithAuth<RawDashboard>(
    `/admin/dashboard?period=${encodeURIComponent(period)}`,
    token
  );
  return normalizeDashboard(liveDashboard);
}

export async function getAdminSalesData(
  token: string
): Promise<AdminSale[]> {
  const liveSales = await fetchJsonWithAuth<AdminSale[]>("/admin/sales", token);
  return liveSales.map((sale) => ({ ...sale, amount: decimalToNumber(sale.amount) }));
}

export async function getAdminCustomersData(
  token: string
): Promise<AdminCustomer[]> {
  const liveCustomers = await fetchJsonWithAuth<AdminCustomer[]>(
    "/admin/customers",
    token
  );
  return liveCustomers.map((customer) => ({
    ...customer,
    totalSpent: decimalToNumber(customer.totalSpent),
    purchases: (customer.purchases ?? []).map((purchase) => ({
      ...purchase,
      amount: decimalToNumber(purchase.amount),
    })),
  }));
}

export async function getAdminSettingsData(
  token: string
): Promise<AdminSettings> {
  return fetchJsonWithAuth<AdminSettings>("/admin/settings", token);
}

export async function saveAdminSettingsData(
  token: string,
  settings: AdminSettings
): Promise<{ savedRemotely: boolean; settings: AdminSettings }> {
  if (!token) throw new Error("A sessão administrativa não está disponível.");
  const response = await fetch(token === HTTP_ONLY_SESSION ? privateApiUrl("/admin/settings") : apiUrl("/admin/settings"), {
    method: "PUT",
    headers: token === HTTP_ONLY_SESSION
      ? { "Content-Type": "application/json" }
      : { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(settings),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Falha ao salvar configurações (${response.status}).`);
  const updated = (await response.json()) as AdminSettings;
  return { savedRemotely: true, settings: updated };
}
