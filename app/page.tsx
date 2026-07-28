import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import HeroSection from "@/components/home/HeroSection";
import HeritageCarousel from "@/components/home/ProductCarousel";
import CategorySection from "@/components/home/CategorySection";
import ShopByCategory from "@/components/home/ShopByCategory";
import EditorialGrid from "@/components/home/EditorialGrid";
import LookbookSlider from "@/components/home/LookbookSlider";
import FeaturedSareeShowcase from "@/components/home/FeaturedSareeShowcase";
import OfferBanner from "@/components/home/OfferBanner";
import GiftSection from "@/components/home/GiftSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-white text-[#010526]">
      <Header />

      <main className="flex-1 w-full">
        <HeroSection />
        <HeritageCarousel />
        <CategorySection />
        <ShopByCategory />
        <FeaturedSareeShowcase />
        <EditorialGrid />
        <OfferBanner />
        <LookbookSlider />
        <GiftSection />
      </main>

      <Footer />
    </div>
  );
}