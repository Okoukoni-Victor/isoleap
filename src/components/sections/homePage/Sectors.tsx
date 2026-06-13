import {
  Landmark,
  RadioTower,
  Fuel,
  ShoppingBag,
  Building2,
  Cpu,
  type LucideIcon,
} from "lucide-react";

type Sector = {
  Icon: LucideIcon;
  title: string;
  copy: string;
};

const sectors: Sector[] = [
  {
    Icon: Landmark,
    title: "Banks & Financial Services",
    copy: "From compliance teams to customer-facing staff, we build the data and AI literacy that keeps financial institutions ahead of fintech disruption.",
  },
  {
    Icon: RadioTower,
    title: "Telecommunications",
    copy: "Rapid product cycles and shifting customer behaviour demand teams who can move fast with data. We close the gap between technical and commercial functions.",
  },
  {
    Icon: Fuel,
    title: "Oil & Gas",
    copy: "Digital tools are changing field operations and back-office functions alike. We train the people managing both.",
  },
  {
    Icon: ShoppingBag,
    title: "FMCG & Consumer Goods",
    copy: "From supply chain teams to marketing functions, consumer goods organizations need people who can work with data and AI tools at pace.",
  },
  {
    Icon: Building2,
    title: "Government Agencies",
    copy: "Public sector digital transformation starts with people. We build practical digital skills for government teams tasked with delivering better services.",
  },
  {
    Icon: Cpu,
    title: "Technology Companies",
    copy: "Even tech-native organizations have skills gaps especially as AI reshapes what technical roles look like. We build the skills your teams need for what's next.",
  },
];

export default function Sectors() {
  return (
    <section
      id="sectors"
      aria-labelledby="sectors-heading"
      className="px-5 md:px-10 lg:px-20 py-16 md:py-20 lg:py-24 bg-grey-50"
    >
      <div className="mb-14 md:mb-16">
        <div
          className="select-none flex justify-center items-center gap-2 w-fit mb-7 border
            border-green-400 rounded-full px-6 py-3 bg-green-400"
        >
          <span className="w-4 h-px bg-white" />

          <span className="tracking-[12%] text-[11px] uppercase font-semibold text-white">
            Who we work with
          </span>
        </div>

        <h2
          id="how-it-works-heading"
          className="max-w-lg mb-5 leading-[1.24] tracking-[-2%] text-[34px]
            md:text-[40px] lg:text-[44px] font-semibold text-grey-600"
        >
          We train teams across Nigeria's most active sectors.
        </h2>

        <p className="max-w-lg leading-[1.7] lg:text-[16.5px] text-grey-600">
          Digital transformation is moving at different speeds across industries
          — but in every sector below, the skills gap is real, the pressure is
          on, and the organizations investing in their people now are the ones
          pulling ahead.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {sectors.map(({ Icon, title, copy }) => (
          <div
            key={title}
            className="group overflow-hidden relative flex flex-col border border-grey-200
              rounded-[20px] p-8 md:p-9 bg-white transition-all duration-200
              hover:-translate-y-[3px] hover:shadow-lg hover:border-amber-200"
          >
            <span
              className="inline-flex justify-center items-center w-11 h-11 mb-5
                rounded-full bg-amber-100 text-amber-700 transition-colors duration-200
                group-hover:bg-amber-200"
            >
              <Icon size={19} />
            </span>

            <h3
              className="mb-2.5 leading-snug tracking-[-0.01em] text-[15.5px] font-body
                font-bold text-amber-900"
            >
              {title}
            </h3>

            <p className="leading-[1.68] text-[13.5px] text-amber-900">
              {copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
