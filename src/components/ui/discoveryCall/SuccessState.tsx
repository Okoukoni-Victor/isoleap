import { Check } from "lucide-react";

export default function SuccessState({
  firstName,
  onClose,
}: {
  firstName: string;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <span
        className="inline-flex justify-center items-center w-16 h-16 mb-5 rounded-full
          bg-green-50 text-green-600"
      >
        <Check size={28} strokeWidth={2.5} />
      </span>

      <h3
        className="mb-3 leading-snug tracking-[-0.02em] text-[24px] font-semibold
          text-grey-600"
      >
        We'll be in touch within 48 hours.
      </h3>

      <p className="max-w-[340px] mb-8 leading-[1.72] text-[15px] text-grey-700">
        Thanks{firstName ? `, ${firstName}` : ""}. Look out for an email from{" "}
        <span className="font-medium text-amber-600">hello@isoleap.com</span>{" "}
        with next steps for your discovery call.
      </p>

      <button
        type="button"
        onClick={onClose}
        className="select-none cursor-pointer rounded-full px-8 py-3 bg-green-600
          text-sm md:text-[15px] font-semibold text-white transition-colors duration-150
          hover:bg-green-700"
      >
        Done
      </button>
    </div>
  );
}
