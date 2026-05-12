import { Header } from "@/components/header/header";
import { BannerSection } from "@/components/home/bannerSection";
import { Footer } from "@/components/footer/footer";
import { AboutSection } from "@/components/home/aboutSection";
import { StudySection } from "@/components/home/studySection";
import { TeachSection } from "@/components/home/teachSection";
import { FaqSection } from "@/components/home/faqSection";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[#fafafa] flex flex-col font-sora">
      <Header />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 md:mt-10 mb-4 flex flex-col gap-10 md:gap-16">
        <BannerSection />

        <div className="flex flex-col gap-12 md:gap-20">
          <StudySection />

          <div className="flex items-center gap-4 px-4 md:px-0">
            <hr className="flex-1 border-[#E5E5E3]" />
            <span className="text-[10px] md:text-xs text-[#5A5A58] font-black uppercase tracking-[0.3em]">ou</span>
            <hr className="flex-1 border-[#E5E5E3]" />
          </div>

          <TeachSection />
          <AboutSection />
          <FaqSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
