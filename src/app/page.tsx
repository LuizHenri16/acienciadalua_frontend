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

async function fetchCategory(category: 'STUDENT' | 'TEACHER') {
  try {
    return { materials: await getProducts(category), error: null as string | null };
  } catch {
    return { materials: [] as Material[], error: 'Não foi possível carregar os materiais. Tente novamente mais tarde.' };
  }
}

export default async function Home() {
  const [studyResult, teachResult] = await Promise.all([
    fetchCategory('STUDENT'),
    fetchCategory('TEACHER'),
  ]);

  return (
    <div className="w-full min-h-dvh flex flex-col font-sora relative">
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <div className="w-full min-h-dvh flex items-stretch bg-hero">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col pt-[var(--header-h)] md:pt-24">
            <BannerSection />
          </div>
        </div>
        <div className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 mt-4 md:mt-10 mb-20 flex flex-col gap-10 md:gap-16 relative z-10">
          <CatalogIntro />
          <div id="produtos" className="flex flex-col gap-12 md:gap-20">
            <StudySection materials={studyResult.materials} error={studyResult.error} />
            <SectionDivider />
            <TeachSection materials={teachResult.materials} error={teachResult.error} />
            <AboutSection />
            <FaqSection />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
