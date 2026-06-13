"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type Testimonial = {
  quote: string;
  avatarUrl: string;
  name: string;
  role: string;
  org?: string;
};

const testimonials: Testimonial[] = [
  {
    quote: `The shift we saw in how our team approached data was immediate. By day two,
     people were asking questions in our weekly review they'd never asked before.
      That's what good training does — it changes how people think, not just what they know.`,
    avatarUrl: "/images/Aisha_Lawal.webp",
    name: "Aisha Lawal",
    role: "Head of Learning & Development",
    org: "Crestline Capital",
  },
  {
    quote: `We've put teams through training before and watched nothing change three weeks later.
     With Isoleap, the post-training report alone was more actionable than anything our previous
      providers delivered. We could see exactly where the gaps were and what to do next.`,
    avatarUrl: "/images/Emeka_Arinze.webp",
    name: "Emeka Arinze",
    role: "Chief People Officer",
    org: "Novacode",
  },
  {
    quote: `I was sceptical at first — we'd done so many generic workshops that left no real
      impression. What surprised me was how practical everything was from day one. Our managers
      came back with tools they actually used the following Monday morning.`,
    avatarUrl: "/images/Fatima_Yusuf.webp",
    name: "Fatima Yusuf",
    role: "Director of Talent",
    org: "Meridian Group",
  },
  {
    quote: `Isoleap didn't just deliver a training programme — they diagnosed where our team
      was genuinely struggling and built around that. The facilitation was sharp, the content
      was relevant, and our engagement scores jumped by 34 points in the quarter that followed.`,
    avatarUrl: "/images/Chidi_Okorie.webp",
    name: "Chidi Okorie",
    role: "VP of People Operations",
    org: "Brightfield Africa",
  },
  {
    quote: `What stood out was the follow-through. Most vendors disappear after the final session.
      Isoleap checked in, shared a detailed retrospective, and helped us embed the learning into
      our actual workflows. That kind of partnership is rare.`,
    avatarUrl: "/images/Ngozi_Eze.webp",
    name: "Ngozi Eze",
    role: "Head of Organisational Development",
    org: "Vantage Advisory",
  },
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, align: "start", containScroll: "trimSnaps" },
    [Autoplay({ delay: 4000, stopOnInteraction: true })],
  );
  const [current, setCurrent] = useState(0);

  const prev = () => emblaApi?.scrollPrev();
  const next = () => emblaApi?.scrollNext();
  const goTo = (index: number) => emblaApi?.scrollTo(index);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.plugins().autoplay?.play;

    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect(); // set initial slide

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="flex flex-col px-5 md:px-10 lg:px-20 py-16 md:py-20 lg:py-24 bg-grey-50"
    >
      <div className="self-center flex flex-col items-center mb-14 md:mb-16">
        <div
          className="select-none flex justify-center items-center gap-2 w-fit mb-7 border
            border-green-400 rounded-full px-6 py-3 bg-green-400"
        >
          <span className="w-4 h-px bg-white" />

          <span className="tracking-[12%] text-[11px] uppercase font-semibold text-white">
            What our clients say
          </span>
        </div>

        <h2
          id="testimonials-heading"
          className="max-w-4xl leading-[1.24] tracking-[-2%] text-center text-[34px]
            md:text-[40px] lg:text-[44px] font-semibold text-grey-600"
        >
          Training that teams actually talk about.
        </h2>
      </div>

      {/* Carousel */}
      <div
        aria-label="Client testimonials carousel"
        className="flex flex-col gap-8 w-full max-w-[88vw] md:max-w-[680px] mx-auto"
      >
        {/* Slideshow */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex items-stretch gap-3">
            {testimonials.map((testimonial, index) => (
              <figure
                key={testimonial.name}
                role="group"
                aria-roledescription="slide"
                aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
                className={`
                  relative flex-[0_0_90%] md:flex-[0_0_86%] rounded-[20px] p-10
                  md:p-12 bg-amber-100 transition-all duration-500 ease-in-out
                  ${
                    index !== current
                      ? "opacity-40 scale-[0.97] origin-left"
                      : "opacity-100 scale-100"
                  }
                `}
              >
                <span
                  aria-hidden="true"
                  className="select-none pointer-events-none absolute left-9 top-5
                    leading-none text-[96px] font-display font-light text-amber-400"
                >
                  &ldquo;
                </span>

                <blockquote className="my-8">
                  <p
                    className="leading-[1.65] text-[18px] md:text-[19px] lg:text-[20px]
                      font-display italic font-light"
                  >
                    {testimonial.quote}
                  </p>
                </blockquote>

                <figcaption className="flex items-center gap-3.5">
                  <div
                    className="overflow-hidden relative flex flex-shrink-0
                      justify-center items-center w-11 h-11 rounded-full"
                  >
                    <Image
                      src={testimonial.avatarUrl}
                      alt={testimonial.name}
                      fill
                      sizes="100%"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <p className="leading-[1.375] text-sm font-bold text-amber-700">
                      {testimonial.name}
                    </p>

                    <p
                      className="mt-0.5 leading-[1.375] text-[13px] font-medium
                        text-grey-600"
                    >
                      {testimonial.role}
                      {testimonial.org && (
                        <>
                          ,{" "}
                          <span className="font-semibold">
                            {testimonial.org}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Testimonial navigation"
          className="flex justify-between items-center"
        >
          {/* Prev and next buttons */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="cursor-pointer inline-flex justify-center items-center w-10
                md:w-12 h-10 md:h-12 shadow-sm rounded-full bg-green-100 text-green-900
                transition-all duration-150 hover:shadow-md hover:bg-green-200"
            >
              <ChevronsLeft />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="cursor-pointer inline-flex justify-center items-center w-10
                md:w-12 h-10 md:h-12 shadow-sm rounded-full bg-green-100 text-green-900
                transition-all duration-150 hover:shadow-md hover:bg-green-200"
            >
              <ChevronsRight />
            </button>
          </div>

          {/* Dot navigation */}
          <div
            role="tablist"
            className="flex flex-wrap items-center gap-2.5 max-w-[105px] md:max-w-[205px]"
          >
            {testimonials.map((testimonial, index) => (
              <button
                type="button"
                key={testimonial.name}
                role="tab"
                aria-label={`Go to testimonial ${index + 1}: ${testimonial.name}`}
                aria-selected={index === current}
                onClick={() => goTo(index)}
                className={`
                  cursor-pointer h-2.5 rounded-full transition-all duration-300
                  ${
                    index === current
                      ? `w-6 bg-amber-500`
                      : `w-2.5 bg-grey-400 hover:bg-amber-200`
                  }
                `}
              />
            ))}
          </div>
        </nav>
      </div>
    </section>
  );
}
