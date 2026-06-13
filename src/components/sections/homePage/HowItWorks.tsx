import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Step = {
  number: string;
  title: string;
  copy: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Discovery call",
    copy: "In 45 minutes, we learn about your team, the tools they use, your business goals, and any previous training that did or didn't land. We don't recommend anything until we've done this.",
  },
  {
    number: "02",
    title: "Training proposal",
    copy: "We come back with a clear recommendation: the right program scope, audience, format, timeline, and investment. No generic deck. No upselling you on things you don't need.",
  },
  {
    number: "03",
    title: "Skills baseline assessment",
    copy: "Before training begins, participants complete a short assessment. This tells us where to start, how to tailor delivery, and gives you a baseline to measure against after.",
  },
  {
    number: "04",
    title: "Delivery",
    copy: "Virtual programs built for your team's schedule, with cohorts of 15 to 40 participants and flexible formats ranging from two-day intensives to multi-week engagements.",
  },
  {
    number: "05",
    title: "Post-training report",
    copy: "Every engagement closes with a full report: individual participant progress, skills shift data, and recommendations for what to build on next. You leave with evidence, not just a training day behind you.",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="px-5 md:px-10 lg:px-20 py-16 md:py-20 lg:py-24 bg-white"
    >
      <div className="mb-14 md:mb-16">
        <div
          className="select-none flex justify-center items-center gap-2 w-fit mb-7 border
            border-green-400 rounded-full px-6 py-3 bg-green-400"
        >
          <span className="w-4 h-px bg-white" />

          <span className="tracking-[12%] text-[11px] uppercase font-semibold text-white">
            How it works
          </span>
        </div>

        <h2
          id="how-it-works-heading"
          className="max-w-lg mb-5 leading-[1.24] tracking-[-2%] text-[34px]
            md:text-[40px] lg:text-[44px] font-semibold text-grey-600"
        >
          From first conversation to trained team.
        </h2>

        <p className="max-w-lg leading-[1.7] lg:text-[16.5px] text-grey-600">
          We don't send a proposal before we understand your team. Every
          engagement starts with a conversation — because that's the only way
          the training actually works.
        </p>
      </div>

      <ol
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:w-[90%]
          lg:mx-auto mt-20"
      >
        {steps.map((step) => (
          <li
            key={step.number}
            className="flex flex-col gap-20 min-h-[300px] rounded-2xl p-7
              odd:bg-green-100 even:bg-green-700 odd:text-grey-700 even:text-white"
          >
            <h3 className="text-[51px] font-semibold">{step.number}</h3>

            <div>
              <h4
                className="mb-3 leading-[1.375] tracking-[-1%] text-[15px] font-body
                  capitalize font-bold"
              >
                {step.title}
              </h4>

              <p className="leading-[1.65] text-[13.5px]">{step.copy}</p>
            </div>
          </li>
        ))}

        <li
          className="flex flex-col min-h-[300px] rounded-2xl p-7
            bg-amber-600"
        >
          <span
            className="select-none w-fit rounded-full px-3 py-1 bg-white/20 tracking-[0.12em]
              text-[11px] uppercase font-semibold text-white"
          >
            Ready to get started?
          </span>

          <h3 className="mt-5 leading-[1.2] text-[28px] font-semibold text-white">
            Let's discuss your team's training needs.
          </h3>

          <p className="mt-4 leading-[1.7] text-[14px] text-grey-50">
            Tell us about your team, your goals, and the skills you want to
            build. We'll recommend the right training approach — only after we
            understand what you actually need.
          </p>

          <Link
            href="#cta"
            className="group select-none inline-flex items-center gap-2 w-fit mt-8 rounded-full
              px-6 py-3 bg-white text-sm font-semibold text-amber-900 transition-colors
              duration-150 hover:bg-grey-200"
          >
            Schedule a discovery call
            <ArrowRight
              size={14}
              className="transition-translate duration-150 group-hover:translate-x-[2px]"
            />
          </Link>
        </li>
      </ol>
    </section>
  );
}
