"use client";

import { useState } from "react";

export interface ProductImage {
  src: string;
  label: string;
  style: string;
}

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
  activeImageIndex: number;
  setActiveImageIndex: (idx: number) => void;
}

export default function ProductImageGallery({
  images,
  productName,
  activeImageIndex,
  setActiveImageIndex,
}: ProductImageGalleryProps) {
  const [zoomState, setZoomState] = useState({ x: 0, y: 0, show: false });

  const currentImage =
    images[activeImageIndex] || images[0] || { src: "", label: "Product Image", style: "" };

  return (
    <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-4">
      {/* ── Main Image with Magnifier ── */}
      <div
        className="flex-1 aspect-[2/3] bg-[#F0F2FF] relative overflow-hidden cursor-crosshair"
        onMouseEnter={() => setZoomState((prev) => ({ ...prev, show: true }))}
        onMouseLeave={() => setZoomState((prev) => ({ ...prev, show: false }))}
        onMouseMove={(e) => {
          const el = e.currentTarget;
          const { left, top, width, height } = el.getBoundingClientRect();
          const x = ((e.clientX - left) / width) * 100;
          const y = ((e.clientY - top) / height) * 100;
          setZoomState({ x, y, show: true });
        }}
      >
        <img
          src={currentImage.src}
          alt={`${productName} - ${currentImage.label}`}
          className={`w-full h-full object-cover transition-transform duration-500 ${currentImage.style}`}
        />

        {/* Magnifier Circle (3× Zoom) */}
        {zoomState.show && (
          <>
            {/* Clipped zoomed image */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:block"
              style={{ clipPath: `circle(72px at ${zoomState.x}% ${zoomState.y}%)` }}
            >
              <img
                src={currentImage.src}
                alt={`${productName} zoom`}
                className="absolute max-w-none w-[300%] h-[300%] pointer-events-none"
                style={{
                  left: `${-2 * zoomState.x}%`,
                  top: `${-2 * zoomState.y}%`,
                  imageRendering: "-webkit-optimize-contrast",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "translate3d(0, 0, 0)",
                  WebkitTransform: "translate3d(0, 0, 0)",
                }}
              />
            </div>
            {/* Lens ring */}
            <div
              className="absolute pointer-events-none w-36 h-36 rounded-full border-2 border-white shadow-xl z-20 hidden md:block"
              style={{
                left: `${zoomState.x}%`,
                top: `${zoomState.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          </>
        )}

        {/* Mobile dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
            {images.map((_: ProductImage, idx: number) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeImageIndex === idx ? "bg-[#010526] w-4" : "bg-[#010526]/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Thumbnails Sidebar ── */}
      {images.length > 1 && (
        <div className="hidden md:flex flex-col gap-3 w-20 flex-shrink-0">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`aspect-[2/3] w-full bg-[#F0F2FF] overflow-hidden transition-all duration-300 relative ${
                activeImageIndex === idx
                  ? "ring-2 ring-[#010526] opacity-100"
                  : "opacity-60 hover:opacity-90"
              }`}
            >
              <img
                src={img.src}
                alt={`${productName} thumbnail`}
                className={`w-full h-full object-cover ${img.style}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
