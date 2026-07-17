"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SearchModal from "./SearchModal";
import MenuDropdown from "./MenuDropdown";

// Left-side nav links
export const leftLinks = [
  { label: "Shop", href: "#" },
  { label: "New Arrival", href: "#" },
  { label: "Kerala Traditional", href: "#" },
];

// Right-side nav links
export const rightLinks = [
  { label: "Men", href: "#" },
  { label: "Women", href: "#" },
  { label: "Kids", href: "#" },
  { label: "Best Sellers", href: "#" },
  { label: "Blog", href: "#" },
];

const categories = [
  { label: "Sarees", href: "#" },
  { label: "Lehengas", href: "#" },
  { label: "Salwar Suits", href: "#" },
  { label: "Silk Weaves", href: "#" },
  { label: "Designer Jewellery", href: "#" },
];

export const drawerCategories = [
  { name: "Sarees", image: "/category/sarees.png", href: "#" },
  { name: "Readymade Blouses", image: "/category/blouses2.png", href: "#" },
  { name: "Jewellery", image: "/category/jewellery.png", href: "#" },
  { name: "Kaftans", image: "/category/kaftan2.png", href: "#" },
  { name: "Salwar Suits", image: "/category/salvar.png", href: "#" },
  { name: "Kurtas", image: "/category/kurtas.png", href: "#" },
  { name: "Kids' Wear", image: "/banner/kids_category.png", href: "#" },
  { name: "Men's Wear", image: "/banner/men_category.png", href: "#" },
];

export const keralaTraditionalItems = [
  { label: "Kerala Saree", href: "#" },
  { label: "120 Mul Cotton Saree", href: "#" },
  { label: "Premium Silk Sarees", href: "#" },
  { label: "Party Wear Sarees", href: "#" },
  { label: "Readymade Blouse", href: "#" },
  { label: "Jewellery", href: "#" },
  { label: "Kaftan", href: "#" },
  { label: "Salwar", href: "#" },
  { label: "Kurta", href: "#" },
  { label: "Co-ord Set", href: "#" },
  { label: "Dhavani Set", href: "#" },
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
              {leftLinks.map((link) => {
                if (link.label === "Kerala Traditional") {
                  return (
                    <div key={link.label} className="relative group py-2">
                      <button className="flex items-center gap-1.5 text-[#010526] hover:opacity-60 transition-opacity uppercase tracking-widest font-semibold text-[11px]">
                        {link.label}
                        <svg className="w-2.5 h-2.5 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </button>

                      {/* Dropdown Menu */}
                      <div className="absolute left-0 mt-2 w-60 bg-white border border-[#010526]/10 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 py-2.5">
                        {keralaTraditionalItems.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="flex items-center justify-between px-5 py-2.5 text-[12px] text-[#010526] hover:bg-[#010526]/5 transition-all tracking-wider uppercase font-semibold group/item"
                          >
                            <span>{item.label}</span>
                            <span className="opacity-0 -translate-x-1.5 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 text-[#010526]/60 font-normal">
                              &rarr;
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="relative text-[#010526] hover:opacity-60 transition-opacity after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:w-0 after:bg-[#010526] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.label}
                  </a>
                );
              })}
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
        <MenuDropdown isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      </header >
    </>
  );
}
