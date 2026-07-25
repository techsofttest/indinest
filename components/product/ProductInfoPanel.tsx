"use client";

import type { Product } from "@/components/data/products";

// Helper – compute delivery date 5 days from now
const getDeliveryDate = () => {
  const today = new Date();
  const delivery = new Date(today);
  delivery.setDate(today.getDate() + 5);
  return delivery.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
};

interface ProductInfoPanelProps {
  product: Product;
  discountPercent: number;
  sizeOptions: string[];
  selectedSize: string | null;
  setSelectedSize: (size: string) => void;
  isAddedToBag: boolean;
  onAddToBag: () => void;
  onOpenSizeGuide: () => void;
  onUnavailableSize: (size: string) => void;
  openAccordions: Record<string, boolean>;
  toggleAccordion: (key: string) => void;
  actionButtonsRef: React.RefObject<HTMLDivElement | null>;
}

export default function ProductInfoPanel({
  product,
  discountPercent,
  sizeOptions,
  selectedSize,
  setSelectedSize,
  isAddedToBag,
  onAddToBag,
  onOpenSizeGuide,
  onUnavailableSize,
  openAccordions,
  toggleAccordion,
  actionButtonsRef,
}: ProductInfoPanelProps) {
  return (
    <div className="lg:col-span-5 flex flex-col justify-start">
      {/* Brand / Category */}
      <p className="text-xs md:text-xs font-bold uppercase tracking-[0.25em] text-[#010526]/70 mb-2">
        {product.brand} • {product.category}
      </p>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-light tracking-wide text-[#010526] leading-tight mb-4">
        {product.name}
      </h1>

      {/* Pricing */}
      <div className="flex items-baseline gap-4 mb-6">
        <span className="text-2xl md:text-3xl font-bold text-[#010526]">{product.price}</span>
        {product.originalPrice && (
          <>
            <span className="text-base md:text-lg text-[#010526]/40 line-through">
              {product.originalPrice}
            </span>
            <span className="text-xs md:text-sm font-bold text-emerald-600 uppercase tracking-widest">
              {discountPercent}% OFF
            </span>
          </>
        )}
      </div>

      {/* Size Selection */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold uppercase tracking-wider text-[#010526]/80">
            Select Size
          </span>
          <button
            onClick={onOpenSizeGuide}
            className="text-xs md:text-sm font-semibold tracking-wider text-[#010526]/60 hover:text-[#010526] underline transition-colors flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
            Size Guide
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {sizeOptions.map((size) => {
            const isStandardSize = ["S", "M", "L", "XL", "XXL"].includes(size);
            
            if (!isStandardSize) {
              return (
                <div
                  key={size}
                  className="text-sm font-bold text-[#010526] py-3 flex items-center justify-center"
                >
                  {size}
                </div>
              );
            }

            const isAvailable = product.sizes?.includes(size) ?? false;
            return (
              <button
                key={size}
                onClick={() => {
                  if (isAvailable) {
                    setSelectedSize(size);
                  } else {
                    onUnavailableSize(size);
                  }
                }}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold relative transition-all duration-200 border group/size ${!isAvailable
                  ? "border-[#010526]/10 text-[#010526]/30 cursor-pointer hover:border-[#010526]/30 hover:text-[#010526]/50"
                  : selectedSize === size
                    ? "bg-[#010526] border-[#010526] text-white"
                    : "border-[#010526]/20 hover:border-[#010526] text-[#010526]"
                  }`}
              >
                <span className={!isAvailable ? "line-through text-[#010526]/40" : ""}>{size}</span>
                {!isAvailable && (
                  <>
                    <svg
                      className="absolute inset-0 w-full h-full text-[#010526]/20 pointer-events-none"
                      viewBox="0 0 48 48"
                    >
                      <line x1="8" y1="40" x2="40" y2="8" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white border border-[#010526]/10 text-[#010526] text-[10px] font-semibold py-1.5 px-2.5 rounded shadow-lg opacity-0 group-hover/size:opacity-100 pointer-events-none transition-all duration-200 text-center z-20">
                      Unavailable. Click to view similar items in size {size}.
                      <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Urgency Notice */}
      <div className="flex items-center gap-2.5 mb-6 text-[#010526]/90">
        <svg
          className="w-5 h-5 flex-shrink-0 text-red-600 animate-pulse"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z" />
        </svg>
        <p className="text-xs md:text-sm font-medium leading-relaxed">
          <span className="font-bold">Highly Popular:</span>{" "}
          {product.demand || 24} people have added this piece to their bag. Order soon!
        </p>
      </div>

      {/* Action Buttons */}
      <div ref={actionButtonsRef} className="flex flex-col sm:flex-row gap-3 mb-8">
        <button
          onClick={onAddToBag}
          className={`flex-1 py-4 border-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2.5 ${isAddedToBag
            ? "bg-emerald-600 border-emerald-600 text-white"
            : "border-[#010526] hover:bg-[#010526] hover:text-white text-[#010526]"
            }`}
        >
          {isAddedToBag ? (
            "✓ Added to Bag"
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              Add to Bag
            </>
          )}
        </button>
        <button className="flex-1 py-4 bg-[#010526] text-white text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          Buy Now
        </button>
      </div>

      {/* Key Highlights */}
      <div className="py-6 border-t border-[#010526]/10 grid grid-cols-2 gap-x-6 gap-y-4">
        {[
          {
            label: "Fabric",
            value: product.fabric,
            icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
          },
          {
            label: "Colour",
            value: product.colour,
            icon: <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z" />,
          },
          {
            label: "Occasion",
            value: product.occasion,
            icon: (
              <>
                <rect x="3" y="8" width="18" height="12" rx="2" />
                <path d="M12 8V22M19 12H5M12 7a3 3 0 1 0-3-3M12 7a3 3 0 1 1 3-3" />
              </>
            ),
          },
          {
            label: "Quality",
            value: "100% Handcrafted",
            icon: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
          },
        ].map(({ label, value, icon }) => (
          <div key={label} className="flex items-center gap-3 text-xs md:text-sm text-[#010526]">
            <div className="w-8 h-8 rounded-full border border-[#010526]/20 flex items-center justify-center text-[#010526]/90 flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                {icon}
              </svg>
            </div>
            <span>
              <strong className="font-semibold text-[#010526]">{label}:</strong> {value}
            </span>
          </div>
        ))}
      </div>

      {/* Estimated Delivery */}
      <div className="py-5 border-t border-[#010526]/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-[#010526]/20 flex items-center justify-center text-[#010526]/90 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-semibold text-[#010526]">Estimated Delivery</p>
            <p className="text-xs md:text-sm text-[#010526]/75">
              Guaranteed delivery by{" "}
              <span className="font-bold text-[#010526]">{getDeliveryDate()}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="border-t border-[#010526]/10 mt-2">
        <AccordionItem
          id="details"
          label="Product Details"
          isOpen={openAccordions.details}
          toggle={() => toggleAccordion("details")}
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-5">
            <InfoRow label="Style No" value={product.styleNo || `SG3260${product.id}`} />
            <InfoRow
              label="Design No"
              value={
                product.designNo ||
                `IND${product.id}N${product.colour.slice(0, 3).toUpperCase()}2026`
              }
            />
            <InfoRow label="Color" value={product.colour} />
            <InfoRow label="Fabric" value={product.fabric} />
            <InfoRow
              label="Pack Contains"
              value={
                product.packContains ||
                (product.category.includes("sherwani")
                  ? "Sherwani, Pajama"
                  : product.category.includes("waistcoat")
                    ? "Waistcoat, Kurta, Pajama"
                    : "Kurta, Pajama")
              }
            />
            <InfoRow
              label="Manufactured / Packed by"
              value={product.manufacturedBy || "IndiNest Weaves Pvt Ltd"}
            />
          </div>
          <p className="font-bold text-[#010526]/80 mb-2">Product Speciality :</p>
          <p className="leading-relaxed text-[#010526]/80 font-light">
            {product.speciality ||
              `Radiate graceful charm with this ${product.colour} ${product.fabric} viscose men's ${product.category.replace("-", " ")}, featuring exquisite handwork enhanced with traditional style embroidery. The lightweight ${product.fabric} fabric offers a soft sheen and comfortable fit...`}{" "}
            <span className="font-bold underline cursor-pointer">More Product Details</span>
          </p>
        </AccordionItem>

        <AccordionItem
          id="styleFit"
          label="Style & Fit Tips"
          isOpen={openAccordions.styleFit}
          toggle={() => toggleAccordion("styleFit")}
        >
          Ethnic wear outfits are designed to have a slightly looser silhouette. If you are in
          between sizes, we recommend ordering the larger size for a more relaxed and comfortable fit.
        </AccordionItem>

        <AccordionItem
          id="shippingReturns"
          label="Shipping & Returns"
          isOpen={openAccordions.shippingReturns}
          toggle={() => toggleAccordion("shippingReturns")}
        >
          Free shipping across India. Standard shipping takes 5–7 business days. Easy returns and
          exchanges within 5 days of delivery.
        </AccordionItem>

        <AccordionItem
          id="faqs"
          label="FAQs"
          isOpen={openAccordions.faqs}
          toggle={() => toggleAccordion("faqs")}
        >
          <div className="flex flex-col gap-3">
            <p>
              <strong>Q: Is custom tailoring available?</strong>
              <br />
              A: We currently offer standard sizes. For custom modifications, please consult our size
              guide or contact support.
            </p>
            <p>
              <strong>Q: What is the fabric care instruction?</strong>
              <br />
              A: Dry clean only is recommended to preserve the premium weave and embroidery details.
            </p>
          </div>
        </AccordionItem>
      </div>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function AccordionItem({
  id,
  label,
  isOpen,
  toggle,
  children,
}: {
  id: string;
  label: string;
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[#010526]/10">
      <button
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-${id}`}
        className="w-full flex justify-between items-center py-4 text-left text-base font-semibold text-[#010526] hover:opacity-85 transition-opacity"
      >
        <span>{label}</span>
        <span className="text-xl font-light text-[#010526]/70">{isOpen ? "—" : "+"}</span>
      </button>
      {isOpen && (
        <div
          id={`accordion-${id}`}
          className="pb-6 pt-2 text-xs md:text-sm text-[#010526]/80 leading-relaxed"
        >
          {children}
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-bold text-[#010526]/80">{label}:</p>
      <p className="text-[#010526]/70 capitalize">{value}</p>
    </div>
  );
}
