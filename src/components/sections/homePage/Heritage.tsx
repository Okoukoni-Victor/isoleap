const stats = [
  {
    value: 207,
    suffix: "k+",
    label: "People trained",
  },
  {
    value: 82,
    suffix: "%",
    label: "Female inclusion rate",
  },
  {
    value: 30,
    suffix: "+",
    label: "African countries",
  },
  {
    value: 2016,
    label: "Year Tech4Dev was founded",
  },
];

export default function Heritage() {
  return (
    <section
      id="heritage"
      aria-labelledby="heritage-heading"
      className="px-5 md:px-10 lg:px-20 py-16 md:py-20 lg:py-24 bg-white"
    >
      <div
        className="select-none flex justify-center items-center gap-2 w-fit mb-7 border
            border-green-400 rounded-full px-6 py-3 bg-green-400"
      >
        <span className="w-4 h-px bg-white" />

        <span className="tracking-[12%] text-[11px] uppercase font-semibold text-white">
          Our heritage
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <h2
            id="heritage-heading"
            className="max-w-lg mb-5 leading-[1.24] tracking-[-2%] text-[34px]
            md:text-[40px] lg:text-[44px] font-semibold text-grey-600"
          >
            Built on Africa's most proven digital skills methodology.
          </h2>

          <p className="max-w-lg leading-[1.7] lg:text-[16.5px] text-grey-600">
            Isoleap is an independent training company. Our instructional depth
            comes from a formal partnership with Tech4Dev — the nonprofit that
            has been at the forefront of digital skills development across
            Africa since 2016.
            <br /> <br />
            Tech4Dev has trained over 207,000 people across more than 30
            countries, with an 82% female inclusion rate. Their curriculum,
            instructors, and methodology are what power every Isoleap
            engagement.
            <br /> <br />
            When you train with Isoleap, your teams benefit from a standard of
            delivery that no purely commercial provider in Nigeria has matched
            at this scale.
          </p>
        </div>

        <div className="h-fit rounded-2xl p-8 md:p-10 bg-green-50">
          <h3
            className="mb-5 tracking-[0.11em] text-[11.5px] font-body uppercase
              font-semibold text-green-600"
          >
            Tech4Dev — The numbers
          </h3>

          <div className="grid grid-cols-2 gap-4 md:gap-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="shadow rounded-xl p-5 md:p-6 bg-white"
              >
                <span
                  className="leading-none tracking-[-0.02em] text-[32px] md:text-[36px]
                    font-display font-semibold text-green-800"
                >
                  {stat.value}
                  {stat.suffix && (
                    <span className="text-amber-500">{stat.suffix}</span>
                  )}
                </span>

                <p className="mt-2 leading-snug text-[12.5px] md:text-[13px] text-grey-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
