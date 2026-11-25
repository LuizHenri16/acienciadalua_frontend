"use client";

import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // The fade is pure CSS (see .page-transition in globals.css), so the first
  // paint never waits for hydration. The key restarts it on client navigation;
  // the noscript fallback in the root layout keeps content visible without JS.
  return <div key={pathname} className="page-transition">{children}</div>;
}
