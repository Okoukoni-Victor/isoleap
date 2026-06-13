"use client";

import { useEffect, useState } from "react";
import { ChevronsUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(null, "", "#home");
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        cursor-pointer z-fab fixed right-[2vw] bottom-8 flex justify-center items-center
        w-12 h-12 shadow-lg rounded-full bg-green-500 text-white transition-all
        duration-300 hover:bg-green-600 hover:scale-110
        ${
          isVisible
            ? `opacity-100 translate-y-0`
            : `opacity-0 translate-y-4 pointer-events-none`
        }
      `}
    >
      <ChevronsUp size={25} />
    </button>
  );
}
