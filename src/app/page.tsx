import { Header } from "@/components/header/header";
import { BannerSection } from "@/components/home/bannerSection";
import { Footer } from "@/components/footer/footer";
import { AboutSection } from "@/components/home/aboutSection";

export default function Home() {
  return (
    <div className="w-full h-screen bg-[#fafafa]">
      <Header />
      <div className="w-full px-6 mt-8 flex flex-col gap-8">
        <BannerSection />
        <AboutSection />
      </div>

      <Footer />
    </div>
  );
}
