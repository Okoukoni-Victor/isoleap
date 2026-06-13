"use client";

import { useActiveSection } from "@/hooks/useActiveSection";

const sectionIds = [
  "home",
  "trust-strip",
  "about",
  "how-it-works",
  "why-isoleap",
  "testimonials",
  "heritage",
  "sectors",
  "cta",
];

export default function ActiveSectionTracker() {
  useActiveSection(sectionIds);
  return null; // renders nothing, just runs the hook
}
