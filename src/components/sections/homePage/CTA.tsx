"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import DiscoveryCallModal from "@/components/ui/DiscoveryCallModal";

export default function CTA() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        id="cta"
        aria-labelledby="cta-heading"
        className="px-5 md:px-10 lg:px-20 py-16 md:py-20 lg:py-24 bg-grey-50"
      >
        <div className="overflow-hidden grid grid-cols-1 lg:grid-cols-2 rounded-[24px]">
          <div
            className="px-8 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20 bg-amber-200
            selection:bg-green-100 selection:text-amber-900"
          >
            <div
              className="select-none flex justify-center items-center gap-2 w-fit mb-7 border
              border-green-700 rounded-full px-6 py-3 bg-transparent"
            >
              <span className="w-4 h-px bg-green-700" />

              <span className="tracking-[12%] text-[11px] uppercase font-semibold text-green-700">
                Get started
              </span>
            </div>

            <h2
              id="cta-heading"
              className="max-w-lg mb-5 leading-[1.24] tracking-[-2%] text-[34px] md:text-[40px]
              lg:text-[44px] font-semibold text-grey-600"
            >
              The right training starts with the right conversation.
            </h2>

            <p className="max-w-lg mb-5 leading-[1.7] lg:text-[16.5px] text-grey-700">
              Tell us about your organization and what you're trying to achieve.
              We'll listen, ask the right questions, and come back within 48
              hours with a clear recommendation — no pressure, no generic pitch.
            </p>

            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="select-none cursor-pointer inline-flex items-center gap-2 border
                border-green-800 rounded-full px-6 md:px-7 py-3 md:py-3.5 bg-green-800
                text-sm md:text-[15px] font-semibold text-white transition-colors
                duration-150 hover:border-green-900 hover:bg-green-900"
              >
                <Calendar size={15} strokeWidth={2} />
                Book a discovery call
              </button>

              <Link
                href="#how-it-works"
                className="select-none inline-flex items-center gap-2 border border-grey-700
                rounded-full px-6 md:px-7 py-3 md:py-3.5 bg-transparent text-sm
                md:text-[15px] font-semibold text-grey-700 transition-colors duration-150
                hover:border-grey-600 hover:bg-grey-600 hover:text-white"
              >
                See how it works
                <ArrowRight size={15} strokeWidth={2} />
              </Link>
            </div>

            <p className="mt-5 text-[13.5px] text-grey-600">
              Or email us directly at{" "}
              <Link
                href="mailto:hello@isoleap.com"
                className="font-medium text-green-700 underline underline-offset-2
                decoration-green-700/30 transition-colors duration-150 hover:text-green-800
                hover:decoration-green-800/50"
              >
                hello@isoleap.com
              </Link>
            </p>
          </div>

          <div className="relative h-[250px] md:h-[500px] lg:h-auto">
            {/* Landscape image for mobile & tablet */}
            <Image
              src="/images/cta_image_landscape.jpg"
              alt=""
              aria-hidden="true"
              fill
              className="lg:hidden object-cover object-center"
              sizes="100vw"
            />

            {/* Portrait image for desktop */}
            <Image
              src="/images/cta_image_portrait.jpg"
              alt=""
              aria-hidden="true"
              fill
              className="hidden lg:block object-cover object-center"
              sizes="50vw"
            />

            {/* Mobile/tablet: top-edge gradient — blends image into the amber panel above it */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 lg:hidden h-14 bg-gradient-to-b
              from-amber-200 to-transparent"
            />

            {/* Desktop: left-edge gradient — blends image into the amber panel beside it */}
            <div
              aria-hidden="true"
              className="absolute left-0 inset-y-0 hidden lg:block w-16 bg-gradient-to-r
              from-amber-200 to-transparent"
            />
          </div>
        </div>
      </section>

      <DiscoveryCallModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
