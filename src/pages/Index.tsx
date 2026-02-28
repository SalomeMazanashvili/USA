import { Header } from "@/components/layout/Header";
import { StickyContactBar } from "@/components/layout/StickyContactBar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { MainServicesSection } from "@/components/home/MainServicesSection";
import { OtherServicesSection } from "@/components/home/OtherServicesSection";
import { VacanciesPreview } from "@/components/home/VacanciesPreview";
import { NewsPreview } from "@/components/home/NewsPreview";
import { AboutPreview } from "@/components/home/AboutPreview";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-[88px]">
        <HeroSection />
        <MainServicesSection />
        <OtherServicesSection />
        <VacanciesPreview />
        <NewsPreview />
        <AboutPreview />
      </main>

      <Footer />
      <StickyContactBar />
    </div>
  );
};

export default Index;
