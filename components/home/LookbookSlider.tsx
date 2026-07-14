"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

interface SlideData {
  id: number;
  modelImage: string;
  modelAlt: string;
  title: string;
  items: {
    id: number;
    imageSrc: string;
    imageAlt: string;
    name: string;
    category: string;
  }[];
}

const slides: SlideData[] = [
  {
    id: 1,
    modelImage: "/products/lookbook/look1/look1.png",
    modelAlt: "Kerala Heritage Styling Look",
    title: "Kerala Heritage Look",
    items: [
      {
        id: 101,
        imageSrc: "/products/lookbook/look1/necklace.jpg",
        imageAlt: "Heritage Gold Necklace",
        name: "Heritage Gold Necklace",
        category: "Jewellery",
      },
      {
        id: 102,
        imageSrc: "/products/lookbook/look1/bangle.jpg",
        imageAlt: "Classic Gold Bangle",
        name: "Classic Gold Bangle",
        category: "Jewellery",
      },
      {
        id: 103,
        imageSrc: "/products/lookbook/look1/earing.jpg",
        imageAlt: "Heritage Earrings",
        name: "Heritage Earrings",
        category: "Jewellery",
      },
      {
        id: 104,
        imageSrc: "/products/lookbook/look1/cloth.jpg",
        imageAlt: "Premium Kasavu Saree",
        name: "Premium Kasavu Saree",
        category: "Apparel",
      },
    ],
  },
  {
    id: 2,
    modelImage: "/products/lookbook/look2/look2.png",
    modelAlt: "Luxury Saree Look",
    title: "Bridal Elegance Look",
    items: [
      {
        id: 201,
        imageSrc: "/products/lookbook/look2/necklace.jpg",
        imageAlt: "Bridal Kundan Choker",
        name: "Bridal Kundan Choker",
        category: "Jewellery",
      },
      {
        id: 202,
        imageSrc: "/products/lookbook/look2/earing.jpg",
        imageAlt: "Bridal Earrings",
        name: "Bridal Earrings",
        category: "Jewellery",
      },
      {
        id: 203,
        imageSrc: "/products/lookbook/look2/cloth.jpg",
        imageAlt: "Banarasi Silk Saree",
        name: "Banarasi Silk Saree",
        category: "Apparel",
      },
      {
        id: 204,
        imageSrc: "/products/lookbook/look2/bangle.jpg",
        imageAlt: "Matching Bangle Set",
        name: "Matching Bangle Set",
        category: "Jewellery",
      },
    ],
  },
  {
    id: 3,
    modelImage: "/products/lookbook/look3/look3.png",
    modelAlt: "Modern Festive Look",
    title: "Modern Festive Look",
    items: [
      {
        id: 301,
        imageSrc: "/products/lookbook/look3/cloth.jpg",
        imageAlt: "Designer Apparel Set",
        name: "Designer Apparel Set",
        category: "Apparel",
      },
      {
        id: 302,
        imageSrc: "/products/lookbook/look3/earing.jpg",
        imageAlt: "Delicate Earrings",
        name: "Delicate Earrings",
        category: "Jewellery",
      },
      {
        id: 303,
        imageSrc: "/products/lookbook/look3/bangle.jpg",
        imageAlt: "Classic Gold Bangle",
        name: "Classic Gold Bangle",
        category: "Jewellery",
      },
      {
        id: 304,
        imageSrc: "/products/lookbook/look3/ring.jpg",
        imageAlt: "Statement Ring",
        name: "Statement Ring",
        category: "Jewellery",
      },
    ],
  },
];

export default function LookbookSlider() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = slides[currentSlideIndex];

  return (
    <section className="relative w-full py-10 px-4 md:px-8 bg-white">
      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        aria-label="Previous Look"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center border border-[#010526]/20 bg-white/80 hover:bg-white text-[#010526] transition-colors"
      >
        &larr;
      </button>
      <button
        onClick={handleNext}
        aria-label="Next Look"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center border border-[#010526]/20 bg-white/80 hover:bg-white text-[#010526] transition-colors"
      >
        &rarr;
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center max-w-[1600px] mx-auto">
        {/* Left Side: Large image of the look/model */}
        <div className="relative aspect-[4/5] w-full max-h-[500px] bg-[#f8f8f8] overflow-hidden group">
          <Image
            src={currentSlide.modelImage}
            alt={currentSlide.modelAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
        </div>

        {/* Right Side: Showcase items */}
        <div className="flex flex-col justify-center py-2">
          <div className="text-center mb-6">
            <h3
              className="text-xs uppercase tracking-widest text-[#010526]/60 mb-1 font-semibold"
            >
              Finishing Touches
            </h3>
            <h2
              className="text-2xl md:text-3xl italic text-[#010526]"
              style={{ fontFamily: "var(--font-pt-serif)" }}
            >
              {currentSlide.title}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-6">
            {currentSlide.items.map((item) => (
              <div key={item.id} className="flex flex-col items-center text-center group cursor-pointer">
                <div className="relative w-full aspect-[4/3] bg-[#fdfdfd] mb-2 overflow-hidden flex items-center justify-center">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    width={150}
                    height={112}
                    className="object-contain max-h-[85%] transition-transform duration-500 group-hover:scale-105"
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#010526] mb-0.5">
                  {item.name}
                </h4>
                <p className="text-[9px] uppercase tracking-widest text-[#010526]/50">
                  {item.category}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center w-full">
            <Button
              variant="primary"
              size="md"
              className="max-w-[280px] w-full tracking-[0.2em] font-semibold"
              icon={
                <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              }
            >
              Shop the Look
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
