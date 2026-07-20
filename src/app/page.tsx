import { Header } from "@/components/header/header";
import { BannerSection } from "@/components/home/bannerSection";
import { Footer } from "@/components/footer/footer";
import { AboutSection } from "@/components/home/aboutSection";
import { StudySection } from "@/components/home/studySection";
import { TeachSection } from "@/components/home/teachSection";
import { FaqSection } from "@/components/home/faqSection";
import { ContactSection } from "@/components/home/contactSection";
import { ChemistryBackground } from "@/components/home/chemistryBackground";
import { getProducts } from "@/api/product";
import type { Material } from "@/types/material";

export const dynamic = 'force-dynamic';

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
    <div className="w-full min-h-screen bg-off-white flex flex-col font-sora relative">
      <ChemistryBackground />
      <Header />
      <main id="main-content">
        <div className="bg-marinho w-full min-h-[calc(100vh-64px)] flex items-center">
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <BannerSection />
          </div>
        </div>
        <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 md:mt-10 mb-20 flex flex-col gap-10 md:gap-16 relative z-10">
          <div id="produtos" className="flex flex-col gap-12 md:gap-20">
            <StudySection materials={studyResult.materials} error={studyResult.error} />
            <Divider />
            <TeachSection materials={teachResult.materials} error={teachResult.error} />
            <AboutSection />
            <FaqSection />
            <ContactSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-4 px-4 md:px-0">
      <hr className="flex-1 border-borda" />
      <span className="text-[10px] md:text-xs text-texto-secundario font-black uppercase tracking-[0.3em]">ou</span>
      <hr className="flex-1 border-borda" />
    </div>
  )
}