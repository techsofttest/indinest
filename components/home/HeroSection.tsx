import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[40vh] md:h-[80vh] bg-[#f5ede0] overflow-hidden">
      <video
        src="/banner/b-v-2.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-[105%] object-cover object-top"
      />

      {/* Background Gradient Overlay: Restricted to the right 50% on desktop, completely transparent on the left */}
      <div className="absolute inset-y-0 right-0 w-full md:w-1/2 bg-gradient-to-l from-[#F0F2FF]/65 to-transparent pointer-events-none" />

      {/* Right-aligned editorial overlay content */}
      <div className="absolute inset-0 flex flex-col items-end justify-center text-right px-8 md:px-16 pointer-events-none">

        {/* Main serif italic headline */}
        <h1
          className="text-[32px] md:text-[64px] leading-none font-black italic text-[#010526] mb-1 drop-shadow-sm"
          style={{ fontFamily: "var(--font-pt-serif)" }}
        >
          IndiNest
        </h1>

        {/* Script subtitle */}
        <p
          className="text-2xl md:text-xl text-[#010526]/85 mb-3"
          style={{ fontFamily: "var(--font-pt-serif)" }}
        >
          Premium Indian Fashion
        </p>

        {/* CTA */}
        <div className="pointer-events-auto">
          <Button
            href="#"
            variant="secondary"
            className="mt-6 tracking-[0.2em] px-7 py-3 border-[#010526] text-[#010526] hover:bg-[#010526] hover:text-white transition-all"
          >
            Discover the Collection
          </Button>
        </div>

      </div>
    </section>
  );
}
