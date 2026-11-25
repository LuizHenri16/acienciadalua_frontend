import { Suspense } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { BannerSection } from "@/components/home/banner-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { AboutSection } from "@/components/home/about-section";
import { StudySection } from "@/components/home/study-section";
import { TeachSection } from "@/components/home/teach-section";
import { FaqSection } from "@/components/home/faq-section";
import { CatalogIntro } from "@/components/home/catalog-intro";
import { SectionDivider } from "@/components/home/section-divider";
import { getProducts } from "@/lib/api/products";
import type { Material } from "@/types/material";

async function fetchCategory(category: "STUDENT" | "TEACHER") {
  try {
    return { materials: await getProducts(category), error: null as string | null };
  } catch {
    return {
      materials: [] as Material[],
      error: "Não foi possível carregar os materiais. Tente novamente mais tarde.",
    };
  }
}

// Each fetch gets its own Suspense boundary: the banner and the interactive
// workbench stream immediately instead of waiting for two API round trips.
async function StudyProducts() {
  const { materials, error } = await fetchCategory("STUDENT");
  return <StudySection materials={materials} error={error} />;
}

async function TeachProducts() {
  const { materials, error } = await fetchCategory("TEACHER");
  return <TeachSection materials={materials} error={error} />;
}

function ProductsSkeleton() {
  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-6">
      <span className="sr-only">Carregando materiais…</span>
      <div className="h-8 w-64 bg-gray-200/70 squircle-border-sm animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="aspect-4/3 bg-gray-200/70 squircle-border animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="w-full min-h-dvh flex flex-col font-sora relative overflow-x-clip">
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="bg-paper-texture">
        <div className="w-full min-h-dvh flex items-stretch bg-hero">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col pt-[var(--header-h)] md:pt-24">
            <BannerSection />
          </div>
        </div>
        <div className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 mt-4 md:mt-10 mb-12 md:mb-16 flex flex-col gap-10 md:gap-16 relative z-10">
          <CatalogIntro />
          <div id="produtos" className="flex flex-col gap-12 md:gap-20">
            <Suspense fallback={<ProductsSkeleton />}>
              <StudyProducts />
            </Suspense>
            <SectionDivider />
            <Suspense fallback={<ProductsSkeleton />}>
              <TeachProducts />
            </Suspense>
            <AboutSection />
          </div>
        </div>
        <FaqSection />
      </main>
      <SiteFooter className="mt-0" />
    </div>
  );
}
