import {
  BarChart3,
  BriefcaseBusiness,
  ClipboardCheck,
  Cpu,
  GraduationCap,
  Target,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

type Pillar = {
  Icon: LucideIcon;
  WatermarkIcon: LucideIcon;
  iconColor: string;
  iconBg: string;
  textColor: string;
  title: string;
  copy: string;
};

const pillars: Pillar[] = [
  {
    Icon: Users,
    WatermarkIcon: GraduationCap,
    iconColor: "text-green-700",
    iconBg: "bg-green-100",
    title: "Inclusive Skilling",
    copy: "Programs designed for every level, from entry staff to senior leaders — not just for people who are already tech-comfortable.",
    textColor: "text-green-900",
  },
  {
    Icon: BriefcaseBusiness,
    WatermarkIcon: Target,
    iconColor: "text-amber-700",
    iconBg: "bg-amber-100",
    title: "Real-Work Outcomes",
    copy: "Every program connects skills to actual job tasks. Participants leave knowing exactly how to apply what they've learned on Day 1 back at their desks.",
    textColor: "text-amber-900",
  },
  {
    Icon: Cpu,
    WatermarkIcon: Workflow,
    iconColor: "text-green-700",
    iconBg: "bg-green-100",
    title: "AI-Integrated by Default",
    copy: "AI tools and workflows aren't an add-on module. They're built into how we teach everything — because that's how work actually gets done now.",
    textColor: "text-green-900",
  },
  {
    Icon: BarChart3,
    WatermarkIcon: ClipboardCheck,
    iconColor: "text-amber-700",
    iconBg: "bg-amber-100",
    title: "Evidence of Impact",
    copy: "Pre and post assessments, progress tracking, and a full post-training report on every engagement. Your L&D investment has numbers behind it.",
    textColor: "text-amber-900",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="px-5 md:px-10 lg:px-20 py-16 md:py-20 lg:py-24 bg-grey-50"
    >
      <div
        className="select-none flex justify-center items-center gap-2 w-fit mb-7
          border border-green-400 rounded-full px-6 py-3 bg-green-400"
      >
        <span className="w-4 h-px bg-white" />

        <span className="tracking-[12%] text-[11px] uppercase font-semibold text-white">
          About Isoleap
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <h2
          id="about-heading"
          className="max-w-lg leading-[1.24] tracking-[-2%] text-[34px] md:text-[40px]
              lg:text-[44px] font-semibold text-grey-600"
        >
          We develop your workforce so your organization can consistently
          perform at its best.
        </h2>

        <p className="shadow-lg rounded-2xl p-10 bg-white leading-[1.8] text-grey-600">
          Every organization is facing the same pressure: technology is changing
          faster than teams can keep up. AI is reshaping roles, workflows, and
          entire industries. The gap between what your people can do today and
          what your business needs them to do tomorrow is widening — and generic
          training isn't closing it.
          <br /> <br />
          Isoleap builds and delivers digital skills training designed
          specifically for corporate teams. Not off-the-shelf courses. Not
          certificates for the sake of it. Programs built around your industry,
          your tools, and your goals — delivered by instructors who have trained
          people at scale across Africa.
          <br /> <br />
          We are an independent training company. Our instructional depth comes
          from a formal partnership with Tech4Dev, a global nonprofit that has
          been at the forefront of digital skills development across Africa
          since 2016, with over 200,000 people trained across 30 countries. That
          proven methodology is the foundation of everything we deliver.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-20">
        {pillars.map(
          ({
            Icon,
            WatermarkIcon,
            iconColor,
            iconBg,
            title,
            textColor,
            copy,
          }) => (
            <div
              key={title}
              className="overflow-hidden relative flex flex-col gap-20 min-h-[300px]
                rounded-2xl p-7 odd:bg-green-300 even:bg-amber-300 transition-shadow
                duration-200 hover:shadow-lg"
            >
              <WatermarkIcon
                size={100}
                className="pointer-events-none absolute -right-3 -top-3 text-black/[0.07]"
              />

              <span
                className={`
                  inline-flex justify-center items-center w-12 h-12 rounded-full
                  ${iconBg} ${iconColor}
                `}
              >
                <Icon size={25} />
              </span>

              <div>
                <h3
                  className={`
                    mb-2 leading-[1.375] tracking-[-1%] text-[15px] font-body font-bold
                    ${textColor}
                  `}
                >
                  {title}
                </h3>

                <p
                  className={`
                    leading-[1.65] text-[13.5px] ${textColor}
                  `}
                >
                  {copy}
                </p>
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
