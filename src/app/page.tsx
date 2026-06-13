import ActiveSectionTracker from "@/components/layout/ActiveSectionTracker";
import Hero from "@/components/sections/homePage/Hero";
import TrustStrip from "@/components/sections/homePage/TrustStrip";
import About from "@/components/sections/homePage/About";
import HowItWorks from "@/components/sections/homePage/HowItWorks";
import WhyIsoleap from "@/components/sections/homePage/WhyIsoleap";
import Testimonials from "@/components/sections/homePage/Testimonials";
import Heritage from "@/components/sections/homePage/Heritage";
import Sectors from "@/components/sections/homePage/Sectors";
import CTA from "@/components/sections/homePage/CTA";

export default function HomePage() {
  return (
    <main>
      <ActiveSectionTracker />
      <Hero />
      <TrustStrip />
      <About />
      <HowItWorks />
      <WhyIsoleap />
      <Testimonials />
      <Heritage />
      <Sectors />
      <CTA />
    </main>
  );
}
