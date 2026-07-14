import Image from "next/image";
import Link from "next/link";

export default function OfferBanner() {
  return (
    <section className="w-full px-4 md:px-8 max-w-[1600px] mx-auto">
      <Link
        href="#"
        className="block relative w-full aspect-[21/9] md:aspect-[21/7] max-h-[350px] overflow-hidden bg-[#F0F2FF] group"
      >
        <Image
          src="/offer-banner/b5.jpg"
          alt="Offer Banner"
          fill
          sizes="(max-width: 1600px) 100vw, 1600px"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          priority
        />
      </Link>
    </section>
  );
}
