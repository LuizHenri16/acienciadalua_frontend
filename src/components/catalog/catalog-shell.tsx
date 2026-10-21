import type { ReactNode } from "react";
import { CatalogHeader } from "@/components/layout/catalog-header";

interface CatalogShellProps {
  children: ReactNode;
}

export function CatalogShell({ children }: CatalogShellProps) {
  return (
    <div className="min-h-dvh flex flex-col font-sora bg-white">
      <CatalogHeader />
      {children}
    </div>
  );
}
