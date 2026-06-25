"use client";

import { useState } from "react";
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { X } from "lucide-react";
import {
  FormFields,
  FormErrors,
  FormStatus,
  EMPTY,
  encode,
  validate,
} from "./types";
import DiscoveryCallForm from "./DiscoveryCallForm";
import SuccessState from "./SuccessState";

export default function DiscoveryCallModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [fields, setFields] = useState<FormFields>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const setField = (key: keyof FormFields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleClose = () => {
    onClose();

    setFields(EMPTY);
    setErrors({});
    setStatus("idle");
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errs = validate(fields);

    if (Object.keys(errs).length > 0) {
      setErrors(errs);

      document
        .getElementById(Object.keys(errs)[0])
        ?.scrollIntoView({ behavior: "smooth", block: "center" });

      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "discovery-call",
          "full-name": fields.fullName,
          "work-email": fields.workEmail,
          organization: fields.organization,
          "job-title": fields.jobTitle,
          sector: fields.sector,
          "team-size": fields.teamSize,
          message: fields.message,
          referral: fields.referral,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-modal">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 backdrop-blur-sm duration-300 ease-out
          data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-y-auto w-screen p-4">
        <div className="flex justify-center items-center min-h-full">
          <DialogPanel
            transition
            className="w-full max-w-[560px] shadow-xl rounded-[20px] bg-white
              duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
          >
            <div className="flex flex-col gap-4 border-b border-grey-200 px-8 py-6">
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close dialog"
                className="cursor-pointer self-end inline-flex justify-center items-center
                  w-8 h-8 rounded-full bg-grey-100 transition-colors duration-150
                  hover:bg-grey-200"
              >
                <X size={15} strokeWidth={2} />
              </button>

              {status !== "success" && (
                <div className="self-center flex flex-col items-center">
                  <DialogTitle
                    className="text-center leading-snug tracking-[-0.02em] text-[22px]
                    font-display font-semibold text-amber-500"
                  >
                    Book a discovery call
                  </DialogTitle>

                  <Description className="mt-1 text-center text-[13px] font-medium text-grey-600">
                    45 minutes &middot; No commitment &middot; We respond within
                    48 hours
                  </Description>
                </div>
              )}
            </div>

            <div className="px-8 py-7">
              {status === "success" ? (
                <SuccessState
                  firstName={fields.fullName.trim().split(" ")[0]}
                  onClose={handleClose}
                />
              ) : (
                <DiscoveryCallForm
                  fields={fields}
                  errors={errors}
                  status={status}
                  setField={setField}
                  onSubmit={handleSubmit}
                />
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
