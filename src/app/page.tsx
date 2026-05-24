import { Header } from "@/components/header/header";
import { BannerSection } from "@/components/home/bannerSection";
import { Footer } from "@/components/footer/footer";
import { AboutSection } from "@/components/home/aboutSection";
import { StudySection } from "@/components/home/studySection";
import { TeachSection } from "@/components/home/teachSection";
import { FaqSection } from "@/components/home/faqSection";
import { ChemistryBackground } from "@/components/home/chemistryBackground";
import { getProducts } from "@/api/product";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [studyMaterials, teachMaterials] = await Promise.all([
    getProducts('STUDENT').catch(() => []),
    getProducts('TEACHER').catch(() => []),
  ]);

  return (
    <div className="w-full min-h-screen bg-[#fafafa] flex flex-col font-sora relative">
      <ChemistryBackground />
      <Header />
      <main className="">
        <div className="bg-marinho w-full min-h-[calc(100vh-64px)] flex items-center">
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <BannerSection />
          </div>
        </div>
        <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 md:mt-10 mb-4 flex flex-col gap-10 md:gap-16 relative z-10">
          <div className="flex flex-col gap-12 md:gap-20">
            <StudySection materials={studyMaterials} />
            <div className="flex items-center gap-4 px-4 md:px-0">
              <hr className="flex-1 border-[#E5E5E3]" />
              <span className="text-[10px] md:text-xs text-[#5A5A58] font-black uppercase tracking-[0.3em]">ou</span>
              <hr className="flex-1 border-[#E5E5E3]" />
            </div>
            <TeachSection materials={teachMaterials} />
            <AboutSection />
            <FaqSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
