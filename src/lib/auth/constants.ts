import { ADMIN_SIGNIN_ROUTE, CUSTOMER_SIGNIN_ROUTE } from "./routes";

export const CUSTOMER_TOKEN_COOKIE = "customer_token";
export const ADMIN_TOKEN_COOKIE = "admin_token";
export const ADMIN_REFRESH_TOKEN_COOKIE = "admin_refresh_token";

export const PROTECTED_ROUTES = [
  {
    path: "/minha-conta",
    cookie: CUSTOMER_TOKEN_COOKIE,
    redirectTo: CUSTOMER_SIGNIN_ROUTE,
  },
  {
    path: "/painel",
    cookie: ADMIN_TOKEN_COOKIE,
    redirectTo: ADMIN_SIGNIN_ROUTE,
  },
];
