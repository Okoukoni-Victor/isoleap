import Image from "next/image";

const sectors = [
  "Banking & Financial Services",
  "Telecommunications",
  "Oil & Gas",
  "FMCG",
  "Government",
  "Technology",
];

const partnerLogos = [
  { name: "Tech4Dev", src: "/logos/Tech4Dev.svg", scale: "scale-100" },
  { name: "Microsoft", src: "/logos/Microsoft.svg", scale: "scale-145" },
  { name: "FCDO", src: "/logos/FCDO.png", scale: "scale-100" },
  { name: "ISDB", src: "/logos/IsDB.svg", scale: "scale-200" },
  { name: "GIZ", src: "/logos/GIZ.svg", scale: "scale-100" },
  { name: "CompTIA", src: "/logos/CompTIA.svg", scale: "scale-518" },
  { name: "UNDP", src: "/logos/UNDP.svg", scale: "scale-106" },
];

export default function TrustStripSection() {
  return (
    <section
      aria-label="Trusted by teams across sectors"
      id="trust-strip"
      className="border-b border-grey-200 bg-white"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-10 lg:px-20 py-10">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <h2 className="tracking-[11%] font-body uppercase text-[11.5px] font-semibold">
            Trusted by teams in
          </h2>

          {/* Divider (Hidden on small screens) */}
          <span
            aria-hidden="true"
            className="hidden md:block flex-shrink-0 w-px h-4 bg-grey-300"
          />

          <div className="flex flex-wrap gap-2">
            {sectors.map((sector) => (
              <span
                key={sector}
                className="cursor-default select-none inline-flex justify-center items-center border
                  border-green-200 rounded-full px-3.5 py-[5px] bg-green-50 text-[13px] font-semibold
                  text-green-700"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-grey-200 pt-10">
          <div className="logo-fade-edges overflow-hidden" aria-hidden="true">
            <div
              className="animate-logo-marquee flex items-center w-max
                hover:[animation-play-state:paused]"
            >
              {[...partnerLogos, ...partnerLogos].map((logo, i) => (
                <div
                  key={i}
                  className="overflow-hidden relative flex flex-shrink-0 justify-center items-center
                    w-36 h-9 mx-3"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    sizes="100%"
                    className={`object-contain ${logo.scale} select-none`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
