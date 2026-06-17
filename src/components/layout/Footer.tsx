"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Mail, Phone, Globe, MapPin } from "lucide-react";
import DiscoveryCallModal from "@/components/ui/discoveryCall/DiscoveryCallModal";

const companyNavLinks = [
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Isoleap", href: "#why-isoleap" },
  { label: "Our Heritage", href: "#our-heritage" },
  { label: "Sectors", href: "#sectors" },
];

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <footer className="mx-[2vw] mb-4 rounded-2xl px-5 md:px-15 lg:px-20 py-10 bg-green-900">
        <div
          className="grid grid-cols-1 md:grid-cols-3 md:justify-items-center gap-7 mb-10
          border-b border-grey-500/[0.25] pb-10"
        >
          <div className="flex flex-col text-sm">
            <Link
              href="#home"
              aria-label="Isoleap homepage"
              className="select-none relative w-[116px] h-[29px] mb-2"
            >
              <Image
                src="/logos/Isoleap.svg"
                alt="Isoleap logo"
                fill
                sizes="116px"
                className="object-contain"
              />
            </Link>

            <p className="mb-4 font-display text-grey-400">
              Skills that move organizations forward.
            </p>

            <p className="text-amber-200">
              A digital and AI skills training company, powered by the
              instructional expertise of Tech4Dev.
            </p>
          </div>

          <nav aria-labelledby="companyNavigationHeading">
            <h4
              id="companyNavigationHeading"
              className="mb-5 text-xs font-body uppercase font-semibold text-amber-400"
            >
              Company
            </h4>

            <ul className="flex flex-col gap-3">
              {companyNavLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="select-none text-sm capitalize text-grey-400 transition-colors
                    duration-150 hover:text-amber-100 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="mb-5 text-xs font-body uppercase font-semibold text-amber-400">
              Connect with us
            </h4>

            <ul className="flex flex-col gap-3 text-sm text-grey-400">
              <li>
                <Link
                  href="mailto:hello@isoleap.com"
                  className="inline-flex items-center gap-2 transition-colors duration-150
                  hover:text-amber-100 hover:underline"
                >
                  <Mail size={16} /> hello@isoleap.com
                </Link>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="select-none cursor-pointer inline-flex items-center gap-2
                  transition-colors duration-150 hover:text-amber-100 hover:underline"
                >
                  <Phone size={16} /> Book a discovery call
                </button>
              </li>

              <li>
                <Link
                  href="https://tech4dev.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="select-none inline-flex items-center gap-2 transition-colors
                  duration-150 hover:text-amber-100 hover:underline"
                >
                  <Globe size={16} /> Tech4Dev
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row md:justify-between md:items-center gap-3
          text-grey-500"
        >
          <small>&copy; 2025 Isoleap. All rights reserved.</small>

          <small className="inline-flex items-center gap-2">
            <MapPin size={16} /> Lagos, Nigeria
          </small>
        </div>
      </footer>

      <DiscoveryCallModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
