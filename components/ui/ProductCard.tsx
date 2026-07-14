interface ProductCardProps {
  imageSrc: string;
  imageAlt: string;
  brand: string;
  price: string;
  bgColor?: string;
}

export default function ProductCard({
  imageSrc,
  imageAlt,
  brand,
  price,
  bgColor = "bg-[#F0F2FF]",
}: ProductCardProps) {
  return (
    <div className="flex-none w-[220px] md:w-[280px] snap-start group cursor-pointer">
      <div className={`w-full aspect-[3/4] ${bgColor} mb-3 relative overflow-hidden`}>
        {/* Add to Cart button - visible on hover */}
        <button
          className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 text-[#010526] z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md hover:bg-white hover:scale-105"
          aria-label="Add to cart"
        >
          <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </button>
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="text-center">
        <h3 className="text-xs font-bold uppercase tracking-widest mb-1">{brand}</h3>
        <p className="text-sm">{price}</p>
      </div>
    </div>
  );
}
