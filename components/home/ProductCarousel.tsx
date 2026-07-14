"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import ProductCard from "@/components/ui/ProductCard";
import Button from "@/components/ui/Button";

const heritageProducts = [
  {
    id: 1,
    imageSrc: "/products/cloth/ChatGPT Image Jul 14, 2026, 10_28_54 AM 1.jpg",
    imageAlt: "Traditional Indian Outfit",
    brand: "Traditional Indian Outfit",
    price: "₹ 14,500",
  },
  {
    id: 2,
    imageSrc: "/products/cloth/ChatGPT Image Jul 14, 2026, 10_31_20 AM 1.jpg",
    imageAlt: "Heritage Saree",
    brand: "Heritage Saree",
    price: "₹ 34,900",
  },
  {
    id: 3,
    imageSrc: "/products/jewellery/earing.jpg",
    imageAlt: "Heritage Earrings",
    brand: "Heritage Earrings",
    price: "₹ 9,800",
  },
  {
    id: 4,
    imageSrc: "/products/cloth/ChatGPT Image Jul 14, 2026, 10_36_40 AM 1.jpg",
    imageAlt: "Designer Saree",
    brand: "Designer Saree",
    price: "₹ 28,500",
  },
  {
    id: 5,
    imageSrc: "/products/cloth/ed1.jpg",
    imageAlt: "Ethnic Outfit",
    brand: "Ethnic Outfit",
    price: "₹ 18,900",
  },
  {
    id: 6,
    imageSrc: "/products/jewellery/ring.jpg",
    imageAlt: "Gold Ring",
    brand: "Gold Ring",
    price: "₹ 12,000",
  },
  {
    id: 7,
    imageSrc: "/products/cloth/ed2.jpg",
    imageAlt: "Festive Wear",
    brand: "Festive Wear",
    price: "₹ 22,000",
  },
  {
    id: 8,
    imageSrc: "/products/jewellery/necklace.jpg",
    imageAlt: "Gold Necklace",
    brand: "Gold Necklace",
    price: "₹ 48,000",
  },
  {
    id: 9,
    imageSrc: "/products/jewellery/bangle.jpg",
    imageAlt: "Gold Bangle",
    brand: "Gold Bangle",
    price: "₹ 18,500",
  },
];

export default function HeritageCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Drag state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const rafId = useRef<number | null>(null);
  const [dragging, setDragging] = useState(false);

  // Progress indicator (0–1)
  const [progress, setProgress] = useState(0);

  /* ── Update progress bar on scroll ── */
  const updateProgress = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress(); // initialise
    return () => el.removeEventListener("scroll", updateProgress);
  }, [updateProgress]);

  /* ── Momentum helper ── */
  const applyMomentum = () => {
    if (!trackRef.current) return;
    velocity.current *= 0.92; // friction
    trackRef.current.scrollLeft -= velocity.current;
    if (Math.abs(velocity.current) > 0.5) {
      rafId.current = requestAnimationFrame(applyMomentum);
    }
  };

  /* ── Mouse handlers ── */
  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    isDragging.current = true;
    setDragging(true);
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollStart.current = trackRef.current.scrollLeft;
    lastX.current = e.pageX;
    velocity.current = 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    velocity.current = lastX.current - e.pageX;
    lastX.current = e.pageX;
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollStart.current + (startX.current - x);
  };

  const stopDrag = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setDragging(false);
    // kick off momentum
    rafId.current = requestAnimationFrame(applyMomentum);
  };

  /* ── Touch handlers ── */
  const onTouchStart = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    startX.current = e.touches[0].pageX - trackRef.current.offsetLeft;
    scrollStart.current = trackRef.current.scrollLeft;
    lastX.current = e.touches[0].pageX;
    velocity.current = 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    velocity.current = lastX.current - e.touches[0].pageX;
    lastX.current = e.touches[0].pageX;
    const x = e.touches[0].pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollStart.current + (startX.current - x);
  };

  const onTouchEnd = () => {
    rafId.current = requestAnimationFrame(applyMomentum);
  };

  const handleScrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 max-w-[1600px] mx-auto">
      {/* Section header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest mb-2 text-[#010526]/60">
            Sale Last Call &bull; Extra 20% Off
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-[#010526]">
            New Styles from the Heritage Collection
          </h2>
        </div>
        <Button
          href="#"
          variant="secondary"
          size="sm"
          className="whitespace-nowrap"
        >
          See all
        </Button>
      </div>

      {/* Relative wrapper containing carousel track and navigation arrows */}
      <div className="relative w-full">
        {/* Scroll Left Button */}
        <button
          onClick={handleScrollLeft}
          aria-label="Scroll Left"
          className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center border border-[#010526]/20 bg-white/80 hover:bg-white text-[#010526] transition-colors"
        >
          &larr;
        </button>

        {/* Scroll Right Button */}
        <button
          onClick={handleScrollRight}
          aria-label="Scroll Right"
          className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center border border-[#010526]/20 bg-white/80 hover:bg-white text-[#010526] transition-colors"
        >
          &rarr;
        </button>

        {/* Draggable track */}
        <div
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ cursor: dragging ? "grabbing" : "grab" }}
          className="flex gap-5 overflow-x-auto pb-6 no-scrollbar select-none"
        >
          {heritageProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>

      {/* Line progress indicator */}
      <div className="mt-5 w-full h-[1px] bg-[#010526]/15 relative overflow-hidden rounded-full">
        <div
          className="absolute top-0 left-0 h-full bg-[#010526] rounded-full transition-none"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </section>
  );
}
