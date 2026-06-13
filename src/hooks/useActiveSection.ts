"use client";

import { useEffect } from "react";

export function useActiveSection(sectionIds: string[]) {
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const hash = id === "home" ? "#home" : `#${id}`;
            window.history.replaceState(null, "", hash);
          }
        },
        {
          threshold: 0.5, // section must be 50% visible to trigger
        },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [sectionIds]);
}
