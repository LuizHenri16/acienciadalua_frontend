import type { MaterialType } from "./material";

export type DashboardPeriod = "7d" | "30d" | "90d" | "1y";

export type SaleStatus =
  | "approved"
  | "pending"
  | "rejected"
  | "cancelled"
  | "refunded";

export type PaymentMethodType = "pix" | "credit_card" | "checkout_pro";

export interface DashboardKPIs {
  monthlySalesCount: number;
  previousMonthlySalesCount: number;
  monthlySalesDeltaPct: number;
  monthlyRevenue: number;
  previousMonthlyRevenue: number;
  monthlyRevenueDeltaPct: number;
  activeProductsCount: number;
  totalProductsCount: number;
  totalCustomersCount: number;
  newCustomersMonthCount: number;
}

export interface RevenueSeriesPoint {
  date: string;
  label: string;
  revenue: number;
  salesCount: number;
  newCustomers: number;
}

export interface TopProductItem {
  id: string;
  title: string;
  category: MaterialType | string;
  salesCount: number;
  revenue: number;
  price: number;
  tone?: "teal" | "lilac" | "amber" | "navy" | "rose";
}

export interface AdminSale {
  id: string;
  externalPaymentId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  productId: string;
  productTitle: string;
  productCategory: MaterialType | string;
  amount: number;
  paymentMethod: PaymentMethodType;
  status: SaleStatus;
  statusDetail?: string;
  accessGranted: boolean;
  createdAt: string;
}

export type ActivityType =
  | "sale_approved"
  | "customer_registered"
  | "payment_pending"
  | "product_updated"
  | "sale_refunded";

export interface AdminActivity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  createdAt: string;
  relativeTime: string;
}

export interface AdminCustomerPurchase {
  saleId: string;
  productId: string;
  productTitle: string;
  productCategory: MaterialType | string;
  amount: number;
  status: SaleStatus;
  paymentMethod: PaymentMethodType;
  purchasedAt: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  purchasesCount: number;
  totalSpent: number;
  lastPurchaseAt?: string | null;
  purchases: AdminCustomerPurchase[];
}

export interface PeriodSummaryMetrics {
  totalRevenue: number;
  revenueDeltaPct: number;
  comparisonLabel: string;
  averageTicket: number;
  averageTicketDeltaPct: number;
  approvalRate: number;
  approvalRateDeltaPp: number;
  refundsCount: number;
  refundsDelta: number;
  totalSalesCount: number;
  newCustomersCount: number;
}

export interface AdminDashboardPayload {
  kpis: DashboardKPIs;
  periodSummary: PeriodSummaryMetrics;
  revenueSeries: RevenueSeriesPoint[];
  topProducts: TopProductItem[];
  recentSales: AdminSale[];
  recentActivity: AdminActivity[];
  pendingSalesCount: number;
  webhookStatus: {
    connected: boolean;
    lastEventRelative: string;
  };
  isDemo: boolean;
  productsLive: boolean;
}

export interface AdminSettings {
  storeName: string;
  supportEmail: string;
  storefrontEnabled: boolean;
  autoReleaseOnApproval: boolean;
  notifyOnNewSale: boolean;
  notifyOnPendingPix: boolean;
  mercadoPagoMode: "production" | "sandbox";
  webhookUrl: string;
}
