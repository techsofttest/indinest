"use client";

import { use, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import HeritageCarousel from "@/components/home/ProductCarousel";
import { menProducts, womenProducts, giftProducts, parsePrice } from "@/components/data/products";

import ProductBreadcrumbs from "@/components/product/ProductBreadcrumbs";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfoPanel from "@/components/product/ProductInfoPanel";
import SizeGuideModal from "@/components/product/SizeGuideModal";
import UnavailableSizeModal from "@/components/product/UnavailableSizeModal";
import StickyCartBar from "@/components/product/StickyCartBar";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = use(params);
  const productId = parseInt(id, 10);
  const router = useRouter();
  const allProducts = [...menProducts, ...womenProducts, ...giftProducts];
  const product = allProducts.find((p) => p.id === productId);

  // ── State ────────────────────────────────────────────────────────────────
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAddedToBag, setIsAddedToBag] = useState(false);
  const [unavailableSizeForModal, setUnavailableSizeForModal] = useState<string | null>(null);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    details: true,
    styleFit: false,
    shippingReturns: false,
    faqs: false,
  });
  const [isStickyBarVisible, setIsStickyBarVisible] = useState(false);

  const actionButtonsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = (key: string) =>
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleAddToBag = () => {
    setIsAddedToBag(true);
    setTimeout(() => setIsAddedToBag(false), 3000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    const numericPrice = parsePrice(product.price) || 0;
    const buyNowItem = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: numericPrice,
      image: product.image,
      size: selectedSize || (product as any).sizes?.[0] || "One Size",
      colour: product.colour || "Standard",
      quantity: 1,
    };
    localStorage.setItem("directCheckoutItem", JSON.stringify([buyNowItem]));
    router.push('/checkout?direct=true');
  };

  // Reset state when navigating between products
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveImageIndex(0);
    setSelectedSize(null);
    setIsAddedToBag(false);
    setUnavailableSizeForModal(null);
    setOpenAccordions({ details: true, styleFit: false, shippingReturns: false, faqs: false });
  }, [productId]);

  // Sticky bar visibility
  useEffect(() => {
    const handleScroll = () => {
      if (!actionButtonsRef.current || !footerRef.current) return;
      const actionButtonsBottom =
        actionButtonsRef.current.offsetTop + actionButtonsRef.current.offsetHeight;
      const footerTop = footerRef.current.offsetTop;
      const scrollPosition = window.scrollY + window.innerHeight;
      if (window.scrollY > actionButtonsBottom && scrollPosition < footerTop) {
        setIsStickyBarVisible(true);
      } else {
        setIsStickyBarVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── 404 ──────────────────────────────────────────────────────────────────
  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white flex flex-col items-center justify-center py-20 text-center px-6">
          <h1 className="text-2xl font-bold text-[#010526] mb-4">Product Not Found</h1>
          <p className="text-[#010526]/60 mb-8">
            The product you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/men"
            className="px-8 py-3 bg-[#010526] text-white text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
          >
            Back to Men's Collection
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  // ── Derived data ─────────────────────────────────────────────────────────
  const images =
    (product as any).images && (product as any).images.length > 0
      ? (product as any).images.map((img: string, idx: number) => ({
        src: img,
        label: `View ${idx + 1}`,
        style: "",
      }))
      : [{ src: product.image, label: "Front View", style: "" }];

  let discountPercent = 0;
  if (product.originalPrice) {
    const orig = parsePrice(product.originalPrice);
    const cur = parsePrice(product.price);
    discountPercent = Math.round(((orig - cur) / orig) * 100);
  }

  const isClothing =
    product.category === "sherwani" ||
    product.category === "kurta-pajama" ||
    product.category === "pathani-suit" ||
    product.category === "waistcoat-set";
  const sizeOptions = isClothing ? ["S", "M", "L", "XL", "XXL"] : product.sizes || [];

  const similarCarouselProducts = menProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .map((p) => ({
      id: p.id,
      imageSrc: p.image,
      imageAlt: p.name,
      brand: p.brand,
      name: p.name,
      price: p.price,
      originalPrice: p.originalPrice,
      sizes: p.sizes,
    }));

  const alternativeProducts = menProducts
    .filter(
      (p) =>
        p.category === product.category &&
        p.id !== product.id &&
        p.sizes?.includes(unavailableSizeForModal || "")
    )
    .map((p) => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      price: p.price,
      originalPrice: p.originalPrice ?? undefined,
      image: p.image,
      sizes: p.sizes,
      category: p.category,
    }));

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-[#010526]">
        <ProductBreadcrumbs
          gender={slug}
          category={product.category}
          productName={product.name}
        />

        <div className="px-6 md:px-8 pt-2 pb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <ProductImageGallery
            images={images}
            productName={product.name}
            activeImageIndex={activeImageIndex}
            setActiveImageIndex={setActiveImageIndex}
          />

          <ProductInfoPanel
            product={product}
            discountPercent={discountPercent}
            sizeOptions={sizeOptions}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            isAddedToBag={isAddedToBag}
            onAddToBag={handleAddToBag}
            onBuyNow={handleBuyNow}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
            onUnavailableSize={setUnavailableSizeForModal}
            openAccordions={openAccordions}
            toggleAccordion={toggleAccordion}
            actionButtonsRef={actionButtonsRef}
          />
        </div>

        {/* Similar Products */}
        {similarCarouselProducts.length > 0 && (
          <div className="">
            <HeritageCarousel
              products={similarCarouselProducts}
              title="Similar Products"
              subtitle="PEOPLE ALSO VIEWED"
              showSeeAll={false}
            />
          </div>
        )}

        {/* Size Guide Modal */}
        {isSizeGuideOpen && <SizeGuideModal onClose={() => setIsSizeGuideOpen(false)} />}

        {/* Unavailable Size Modal */}
        {unavailableSizeForModal && (
          <UnavailableSizeModal
            size={unavailableSizeForModal}
            products={alternativeProducts}
            productCategory={product.category}
            onClose={() => setUnavailableSizeForModal(null)}
          />
        )}
      </main>

      <div ref={footerRef}>
        <Footer />
      </div>

      <StickyCartBar
        isVisible={isStickyBarVisible}
        productName={product.name}
        productPrice={product.price}
        productImage={product.image}
        isAddedToBag={isAddedToBag}
        onAddToBag={handleAddToBag}
        onBuyNow={handleBuyNow}
        onClose={() => setIsStickyBarVisible(false)}
      />
    </>
  );
}
