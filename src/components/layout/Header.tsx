"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Isoleap", href: "#why-isoleap" },
  { label: "Sectors", href: "#sectors" },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <header className="z-fixed fixed inset-x-0 top-0">
      <nav
        aria-label="Main navigation"
        className="flex justify-between items-center h-[72px] mx-[2vw] mt-4 border
          border-black/20 rounded-full px-4 bg-white/20 backdrop-blur-[15px]
          backdrop-saturate-[180%]"
      >
        <Link href="#home" aria-label="Go to homepage" className="select-none">
          Isoleap
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="select-none relative text-sm capitalize font-medium
                  transition-colors duration-150 hover:text-amber-500
                  after:absolute after:left-0 after:bottom-[-4]
                  after:w-0 after:h-[2px] after:rounded-full after:bg-amber-500
                  after:transition-[width] after:duration-300 after:ease-in-out
                  hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="#cta"
          className="select-none hidden lg:inline-flex justify-center items-center
            rounded-full px-6 py-3 bg-amber-500 text-sm font-semibold transition-all
            duration-150 hover:bg-amber-600"
        >
          Talk to Us
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={drawerOpen}
          aria-controls="mobile-drawer"
          className="inline-flex lg:hidden justify-center items-center"
        >
          <Menu size={30} />
        </button>
      </nav>

      {/* Mobile drawer overlay */}
      <div
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
        className={`
          lg:hidden z-overlay fixed inset-0 bg-black/50 transition-opacity duration-300
          ${drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-label="Navigation menu"
        aria-hidden={!drawerOpen}
        inert={!drawerOpen}
        className={`
          lg:hidden z-drawer fixed right-0 inset-y-0 flex flex-col gap-6 w-[75vw] py-6
          bg-green-900 transition-transform duration-300 ease-in-out
          ${drawerOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <button
          type="button"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close navigation menu"
          className="select-none shrink-0 self-end inline-flex justify-center items-center
            me-6 rounded-full p-1.5 bg-white/[0.08] text-white/60 transition-colors
            duration-150 hover:bg-white/[0.14] hover:text-white"
        >
          <X size={30} />
        </button>

        <nav
          className="flex-1 flex flex-col gap-10 border-t border-white/[0.06]"
          aria-label="Mobile navigation"
        >
          <ul>
            {navLinks.map((link) => (
              <li
                key={link.label}
                className="border-b border-white/[0.06] p-6 md:px-12"
              >
                <Link
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                  className="select-none capitalize font-medium text-grey-400
                    transition-colors duration-150 hover:text-amber-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="#cta"
            onClick={() => setDrawerOpen(false)}
            className="select-none inline-flex justify-center items-center mx-6 md:mx-12
              rounded-full px-6 py-3 bg-amber-500 font-semibold text-green-900
              transition-colors duration-150 hover:bg-amber-400"
          >
            Talk to Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
