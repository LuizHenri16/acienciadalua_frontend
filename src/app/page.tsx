import { Header } from "@/components/header/header";
import { BannerSection } from "@/components/home/bannerSection";
import { Footer } from "@/components/footer/footer";
import { AboutSection } from "@/components/home/aboutSection";
import { StudySection } from "@/components/home/studySection";
import { TeachSection } from "@/components/home/teachSection";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[#fafafa]">
      <Header />
      <div className="w-full px-6 mt-8 flex flex-col gap-8">
        <BannerSection />
        <StudySection />

        <div className="flex items-center gap-4">
          <hr className="flex-1 border-[#e0e0e0]" />
          <span className="text-sm text-[#9e9e9e] font-medium">ou</span>
          <hr className="flex-1 border-[#e0e0e0]" />
        </div>

        <TeachSection />
        <AboutSection />
      </div>

      <Footer />
    </div>
  );
}
