"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SearchModal from "./SearchModal";

// Left-side nav links
const leftLinks = [
  { label: "Shop", href: "#" },
  { label: "New Arrival", href: "#" },
  { label: "Kerala Traditional", href: "#" },
];

// Right-side nav links
const rightLinks = [
  { label: "Sale", href: "#" },
  { label: "Blog", href: "#" },
];

const categories = [
  { label: "Sarees", href: "#" },
  { label: "Lehengas", href: "#" },
  { label: "Salwar Suits", href: "#" },
  { label: "Silk Weaves", href: "#" },
  { label: "Designer Jewellery", href: "#" },
];

export default function Header() {
  const [revealed, setRevealed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <header className="w-full sticky top-0 z-50 bg-white relative">
        <div className="flex items-center justify-between px-4 md:px-8 py-5">

          {/* ── LEFT: Hamburger + nav links ── */}
          <div className="flex items-center gap-6">
            {/* Hamburger */}
            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-6 w-6 flex-col items-center justify-center gap-1.5"
            >
              <span
                className={`block h-0.5 w-5 bg-[#010526] transition-transform duration-300 ease-in-out ${menuOpen ? "translate-y-2 rotate-45" : ""
                  }`}
              />
              <span
                className={`block h-0.5 bg-[#010526] transition-opacity duration-300 ease-in-out ${menuOpen ? "w-5 opacity-0" : "w-5"
                  }`}
              />
              <span
                className={`block h-0.5 w-5 bg-[#010526] transition-transform duration-300 ease-in-out ${menuOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
              />
            </button>

            {/* Left nav links — hidden on mobile */}
            <nav className="hidden md:flex items-center gap-7 text-[11px] font-semibold uppercase tracking-widest">
              {leftLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative text-[#010526] hover:opacity-60 transition-opacity after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:w-0 after:bg-[#010526] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* ── CENTER: Logo with reveal animation ── */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <div
              className="transition-all duration-1000 ease-out"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed
                  ? "translateY(0) scale(1)"
                  : "translateY(-14px) scale(0.88)",
                filter: revealed ? "blur(0px)" : "blur(5px)",
              }}
            >
              <Image
                src="/logo/logo.png"
                alt="IndiNest"
                width={160}
                height={58}
                priority
                className="object-contain"
                style={{ maxWidth: "160px", maxHeight: "58px", width: "100%", height: "auto" }}
              />
            </div>
          </div>

          {/* ── RIGHT: nav links + icons ── */}
          <div className="flex items-center gap-5">
            {/* Right nav links — hidden on mobile */}
            <nav className="hidden md:flex items-center gap-7 text-[11px] font-semibold uppercase tracking-widest">
              {rightLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative transition-opacity after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:w-0 after:bg-[#010526] after:transition-all after:duration-300 hover:after:w-full hover:opacity-60 text-[#010526]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Icon group */}
            <div className="flex items-center gap-4 text-[#010526]">
              {/* Search */}
              <button
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
                className="hover:opacity-60 transition-opacity"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>

              {/* Account */}
              <button aria-label="Account" className="hover:opacity-60 transition-opacity">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>

              {/* Cart */}
              <button aria-label="Cart" className="relative hover:opacity-60 transition-opacity">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {/* Cart badge */}
                <span className="absolute -top-1.5 -right-1.5 bg-[#010526] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  0
                </span>
              </button>
            </div>
          </div>

        </div>
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      </header>

      {/* ── MOBILE MENU DRAWER ── */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${menuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer */}
        <nav
          className={`absolute top-0 left-0 h-full w-64 bg-white shadow-xl flex flex-col pt-20 px-8 overflow-y-auto gap-6 text-[12px] font-semibold uppercase tracking-widest transition-transform duration-300 ease-out ${menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="flex flex-col gap-5">
            {[...leftLinks, ...rightLinks].map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="hover:opacity-60 transition-opacity text-[#010526]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <hr className="border-[#010526]/10" />

          {/* Categories Section */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] text-[#010526]/50 tracking-[0.2em] font-bold">Categories</span>
            <div className="flex flex-col gap-4 pl-2 normal-case font-normal text-sm text-[#010526]/85">
              {categories.map((cat) => (
                <a
                  key={cat.label}
                  href={cat.href}
                  onClick={() => setMenuOpen(false)}
                  className="hover:opacity-60 transition-opacity whitespace-nowrap"
                >
                  {cat.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
