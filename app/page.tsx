import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import HeroSection from "@/components/home/HeroSection";
import HeritageCarousel from "@/components/home/ProductCarousel";
import EditorialGrid from "@/components/home/EditorialGrid";
import LookbookSlider from "@/components/home/LookbookSlider";
import FeaturedSareeShowcase from "@/components/home/FeaturedSareeShowcase";
import OfferBanner from "@/components/home/OfferBanner";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-white text-[#010526]">
      <Header />

      <main className="flex-1 w-full">
        <HeroSection />
        <HeritageCarousel />
        <FeaturedSareeShowcase />
        <EditorialGrid />
        <OfferBanner />
        <LookbookSlider />
      </main>

      <Footer />
    </div>
  );
}