type ValueProposition = {
  number: string;
  title: string;
  copy: string;
};

const valuePropositions: ValueProposition[] = [
  {
    number: "01",
    title: "Proven at Scale",
    copy: "Our programs are built on the methodology of Tech4Dev, an organization that has trained over 200,000 people across 30 African countries since 2016. This isn't new curriculum. It's been tested on real people in real workplaces, refined over nearly a decade.",
  },
  {
    number: "02",
    title: "AI-Integrated by Design",
    copy: "AI tools and workflows are built into how we teach everything — from data analysis to communication to operations. Your teams don't just learn about AI. They learn to use it for the actual work they do every day.",
  },
  {
    number: "03",
    title: "Africa-Native Expertise",
    copy: "Most international training firms design for Western workplaces and sell those programs here. We understand the Nigerian and broader African context — the tools your teams actually use, the connectivity realities, and the organizational cultures that determine whether training sticks.",
  },
  {
    number: "04",
    title: "Evidence of Impact, Not Just Completion",
    copy: "Pre-training assessment, progress tracking, and a post-training report — standard on every engagement. You'll know what changed, who moved, and what to invest in next.",
  },
  {
    number: "05",
    title: "Built Around Your Organization",
    copy: "We deliver virtual programs for cohorts of 15 to 40, with flexible intensive or extended formats designed to align with how your organization actually operates.",
  },
  {
    number: "06",
    title: "A Partner, Not a Vendor",
    copy: "We scope every engagement before we propose one. We ask the questions other providers skip. We understand your teams, your tools, and your constraints first — because that's the only way training delivers real change.",
  },
];

export default function WhyIsoleapSection() {
  return (
    <section
      id="why-isoleap"
      aria-labelledby="why-isoleap-heading"
      className="px-5 md:px-10 lg:px-20 py-16 md:py-20 lg:py-24 bg-green-900"
    >
      <div className="mb-14 md:mb-16">
        <div
          className="select-none flex justify-center items-center gap-2 w-fit mb-7 border
            border-amber-400 rounded-full px-6 py-3 bg-amber-400"
        >
          <span className="w-4 h-px bg-grey-700" />

          <span className="tracking-[12%] text-[11px] uppercase font-semibold">
            Why Isoleap
          </span>
        </div>

        <h2
          id="why-isoleap-heading"
          className="max-w-lg mb-5 leading-[1.24] tracking-[-2%] text-[34px]
            md:text-[40px] lg:text-[44px] font-semibold text-white"
        >
          What makes our training different.
        </h2>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-white/[0.07]">
        {valuePropositions.map((item) => (
          <li
            key={item.title}
            className="relative p-8 md:p-9 lg:p-10 bg-green-900 transition-colors
              duration-150 hover:bg-green-800 after:absolute after:left-0 after:top-0
              after:w-0 after:h-0.5 after:bg-amber-500 after:transition-width
              after:duration-300 after:ease-in-out hover:after:w-full"
          >
            <h3 className="mb-5 tracking-[4%] text-[13px] italic text-grey-500">
              {item.number}
            </h3>

            <h4
              className="mb-3 leading-[1.375] tracking-[-1%] text-[16.5px] font-body
                font-bold text-amber-200"
            >
              {item.title}
            </h4>

            <p className="leading-[1.72] text-sm text-grey-300">{item.copy}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
