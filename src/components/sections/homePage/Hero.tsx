"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    target: 200,
    format: "K" as const,
    suffix: "+",
    label: "People trained through our instructional network",
  },
  {
    target: 65,
    format: "" as const,
    suffix: "%",
    label: "Alumni employment rate",
  },
  {
    target: 30,
    format: "" as const,
    suffix: "+",
    label: "African countries reached",
  },
];

/**
 * Counts from 0 up to `target` over `duration` ms using an easeOutQuart curve.
 * Only starts when `enabled` flips to true. Cleans up its rAF on unmount.
 */
function useCountUp(target: number, duration: number, enabled: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    let startTime: number | null = null;
    let raf: number;

    const tick = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutQuart — fast start, smooth landing
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setCount(target); // guarantee exact final value
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, target, duration]);

  return count;
}

interface StatItemProps {
  target: number;
  format: string;
  suffix: string;
  label: string;
  enabled: boolean;
  /** Stagger delay in ms before this item starts counting */
  delay?: number;
}

function StatItem({
  target,
  format,
  suffix,
  label,
  enabled,
  delay = 0,
}: StatItemProps) {
  const [delayedEnabled, setDelayedEnabled] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    if (delay === 0) {
      setDelayedEnabled(true);
      return;
    }
    const id = setTimeout(() => setDelayedEnabled(true), delay);
    return () => clearTimeout(id);
  }, [enabled, delay]);

  const count = useCountUp(target, 1800, delayedEnabled);

  return (
    <div
      className="flex-1 flex flex-col items-center md:not-first:border-l
        not-first:border-t md:not-first:border-t-0 border-grey-500/[0.25] py-8 md:py-0"
    >
      <h2
        className="mb-2 leading-none tracking-[-2%] text-[36px] md:text-[40px] lg:text-[44px]
          font-semibold"
      >
        <span className="text-white tabular-nums">
          {count}
          {format}
        </span>
        <span className="text-amber-400">{suffix}</span>
      </h2>

      <p
        className="max-w-[225px] md:max-w-[300px] text-center leading-[1.45] text-[13px] md:text-sm
          text-grey-400"
      >
        {label}
      </p>
    </div>
  );
}

export default function HeroSection() {
  const statsRef = useRef<HTMLDivElement>(null);

  // Tracks whether the animation has already fired this page-load.
  // Using a ref (not state) means it survives re-renders without causing them.
  const hasAnimated = useRef(false);

  // Flip to true once — triggers all StatItem counts to start.
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setAnimationStarted(true);
          observer.disconnect(); // never fires again until page reload
        }
      },
      {
        // Fire when at least 30% of the strip is in the viewport
        threshold: 0.3,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      className="overflow-hidden relative flex flex-col justify-center items-center min-h-dvh"
    >
      <Image
        src="/images/hero_image.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Green overlay */}
      <div className="z-overlay absolute inset-0 bg-green-900/80" />

      <div
        className="z-content relative flex flex-col px-5 md:px-10 lg:px-20 pt-[72px] pb-12 md:pb-16
          lg:pb-20"
      >
        <div className="flex flex-col justify-center items-center pt-10 md:pt-14 lg:pt-20">
          <div
            className="flex justify-center items-center md:gap-2 mb-7
              border border-amber-400 rounded-full px-6 py-3 bg-transparent"
          >
            <span className="hidden md:inline w-4 h-px bg-amber-400" />

            <span
              className="select-none text-center uppercase tracking-[12%] text-[11px]
                font-semibold text-amber-400"
            >
              Corporate digital and AI skills training
            </span>
          </div>

          <h1
            className="max-w-4xl mb-7 text-center leading-[1.24] lg:leading-[1.12]
              tracking-[-2%] text-[40px] md:text-[60px] lg:text-[72px] font-semibold text-white"
          >
            Skills that move organizations forward.
          </h1>

          <p
            className="max-w-4xl mb-11 text-center leading-[1.75] md:text-[17px] lg:text-[18px]
              text-grey-50"
          >
            Isoleap designs and delivers hands-on digital and AI skills training
            for corporate teams — built on the instructional depth of Tech4Dev,
            the organization that has trained over 200,000 people across Africa.
          </p>

          <div className="flex items-center gap-4 mb-10">
            <Link
              href="#how-it-works"
              className="select-none inline-flex justify-center items-center border
                border-amber-500 rounded-full px-6 md:px-7 py-3 md:py-3.5 bg-amber-500
                text-sm md:text-[15px] font-semibold transition-colors duration-150
                hover:border-amber-600 hover:bg-amber-600"
            >
              See how it works
            </Link>

            <Link
              href="#cta"
              className="select-none inline-flex justify-center items-center border
                border-grey-50 rounded-full px-6 md:px-7 py-3 md:py-3.5 bg-transparent
                text-sm md:text-[15px] font-semibold text-grey-50 transition-colors
                duration-150 hover:bg-grey-50 hover:text-grey-700"
            >
              Talk to us
            </Link>
          </div>
        </div>

        {/* Stats strip — observed for viewport entry */}
        <div
          ref={statsRef}
          className="flex flex-col md:flex-row md:gap-8 mt-10"
        >
          {stats.map((stat, i) => (
            <StatItem
              key={stat.label}
              target={stat.target}
              format={stat.format}
              suffix={stat.suffix}
              label={stat.label}
              enabled={animationStarted}
              delay={i * 120} // 0ms, 120ms, 240ms stagger
            />
          ))}
        </div>
      </div>
    </section>
  );
}
