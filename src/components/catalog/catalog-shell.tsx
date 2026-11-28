import type { ReactNode } from "react";
import { CatalogHeader } from "@/components/layout/catalog-header";

interface CatalogShellProps {
  children: ReactNode;
  headerVariant?: "light" | "hero";
}

export function CatalogShell({ children, headerVariant = "light" }: CatalogShellProps) {
  return (
    <div className="min-h-dvh flex flex-col font-sora bg-paper-texture overflow-x-clip">
      <CatalogHeader variant={headerVariant} />
      {children}
    </div>
  );
}
