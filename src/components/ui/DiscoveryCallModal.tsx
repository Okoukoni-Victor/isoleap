"use client";

import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { X, ChevronDown, Check, Loader2 } from "lucide-react";

// Types
interface FormFields {
  fullName: string;
  workEmail: string;
  organization: string;
  jobTitle: string;
  sector: string;
  teamSize: string;
  message: string;
  referral: string;
}

interface FormErrors {
  fullName?: string;
  workEmail?: string;
  organization?: string;
  jobTitle?: string;
  sector?: string;
  teamSize?: string;
  message?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

// Constants
const EMPTY: FormFields = {
  fullName: "",
  workEmail: "",
  organization: "",
  jobTitle: "",
  sector: "",
  teamSize: "",
  message: "",
  referral: "",
};

const SECTORS = [
  "Banking & Financial Services",
  "Telecommunications",
  "Oil & Gas",
  "FMCG & Consumer Goods",
  "Government Agencies",
  "Technology",
  "Other",
];

const TEAM_SIZES = [
  "15-30 people",
  "31-50 people",
  "51-100 people",
  "101-250 people",
  "251-500 people",
  "500+ people",
];

const REFERRAL_SOURCES = [
  "LinkedIn",
  "Google Search",
  "Referral from a colleague",
  "Tech4Dev",
  "Event or conference",
  "Other",
];

// Netlify encoder

function encode(data: Record<string, string>): string {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
}

// Validation

function validate(f: FormFields): FormErrors {
  const e: FormErrors = {};
  if (!f.fullName.trim()) e.fullName = "Please enter your full name";
  if (!f.workEmail.trim()) e.workEmail = "Please enter your work email";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.workEmail))
    e.workEmail = "Please enter a valid email address";
  if (!f.organization.trim()) e.organization = "Please enter your organization";
  if (!f.jobTitle.trim()) e.jobTitle = "Please enter your job title";
  if (!f.sector) e.sector = "Please select your sector";
  if (!f.teamSize) e.teamSize = "Please select your team size";
  if (!f.message.trim())
    e.message = "Please tell us what you're hoping to achieve";
  return e;
}

// Reusable field parts

function FieldLabel({
  htmlFor,
  children,
  required,
  optional,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block font-body text-[13px] font-semibold text-ink"
    >
      {children}
      {required && (
        <span className="ml-0.5 text-amber-600" aria-hidden="true">
          *
        </span>
      )}
      {optional && (
        <span className="ml-1 font-normal text-ink-tertiary">(optional)</span>
      )}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p
      id={id}
      role="alert"
      className="mt-1.5 font-body text-[12px] text-red-600"
    >
      {message}
    </p>
  );
}

function inputClasses(error?: boolean) {
  return `w-full border rounded-xl px-4 py-3 bg-grey-50 text-[14.5px] text-grey-700
   placeholder:text-grey-500 transition-colors duration-150 focus:outline-none focus:ring-2
   ${
     error
       ? "border-red-300 focus:border-red-400 focus:ring-red-200/40"
       : "border-grey-200 focus:border-green-600 focus:ring-green-600/10"
   }`;
}

// Select wrapper (custom chevron)

function SelectField({
  id,
  name,
  value,
  onChange,
  placeholder,
  options,
  error,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  options: string[];
  error?: boolean;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={
          (inputClasses(error), "cursor-pointer appearance-none pr-10")
        }
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        strokeWidth={2}
        aria-hidden="true"
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-tertiary"
      />
    </div>
  );
}

// Success state

function SuccessState({
  firstName,
  onClose,
}: {
  firstName: string;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div
        className="flex justify-center items-center w-16 h-16 mb-5 rounded-full bg-green-50
          text-green-600"
      >
        <Check size={28} strokeWidth={2.5} />
      </div>

      <h3 className="mb-3 font-display text-[24px] font-semibold leading-snug tracking-[-0.02em] text-ink">
        We'll be in touch within 48 hours.
      </h3>

      <p className="mb-8 max-w-[340px] font-body text-[15px] leading-[1.72] text-ink-secondary">
        Thanks{firstName ? `, ${firstName}` : ""}. Look out for an email from{" "}
        <span className="font-medium text-green-700">hello@isoleap.com</span>{" "}
        with next steps for your discovery call.
      </p>

      <button
        type="button"
        onClick={onClose}
        className="select-none cursor-pointer rounded-full px-8 py-3 bg-green-800
          text-[14px] font-semibold text-white transition-colors duration-150
          hover:bg-green-700"
      >
        Done
      </button>
    </div>
  );
}

// Modal

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

  // Generic field setter — clears the field's error on change
  const set =
    (key: keyof FormFields) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      if (errors[key as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [key]: undefined }));
      }
    };

  const handleClose = () => {
    onClose();
    // Reset after the closing animation finishes
    setTimeout(() => {
      setFields(EMPTY);
      setErrors({});
      setStatus("idle");
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errs = validate(fields);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Scroll to the first errored field
      const firstKey = Object.keys(errs)[0];
      document
        .getElementById(firstKey)
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

  const firstName = fields.fullName.trim().split(" ")[0];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="z-modal relative" onClose={handleClose}>
        {/* ── Backdrop ──────────────────────────────────────────────── */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-ink/60 backdrop-blur-sm"
            aria-hidden="true"
          />
        </TransitionChild>

        {/* ── Scroll container ──────────────────────────────────────── */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            {/* ── Panel ───────────────────────────────────────────── */}
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <DialogPanel
                className="w-full max-w-[560px] shadow-[0_24px_80px_rgba(0,0,0,0.18)]
                  rounded-[20px] bg-white"
              >
                {/* Header */}
                <div
                  className="flex justify-between items-start border-b border-grey-200
                    px-8 py-6"
                >
                  <div>
                    <DialogTitle
                      className="leading-snug tracking-[-0.02em] text-[22px] font-display
                        font-semibold text-grey-700"
                    >
                      Book a discovery call
                    </DialogTitle>

                    <p className="mt-1 font-body text-[13px] text-ink-tertiary">
                      45 minutes &middot; No commitment &middot; We respond
                      within 48 hours
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close dialog"
                    className="ml-4 flex h-8 w-8 flex-shrink-0 items-center justify-center
                      rounded-full bg-cream-100 text-ink-tertiary
                      transition-colors duration-150
                      hover:bg-cream-200 hover:text-grey-700
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                  >
                    <X size={15} strokeWidth={2} aria-hidden="true" />
                  </button>
                </div>

                {/* Body */}
                <div className="px-8 py-7">
                  {status === "success" ? (
                    <SuccessState firstName={firstName} onClose={handleClose} />
                  ) : (
                    <form
                      name="discovery-call"
                      data-netlify="true"
                      onSubmit={handleSubmit}
                      noValidate
                    >
                      {/* Required by Netlify when submitting via fetch */}
                      <input
                        type="hidden"
                        name="form-name"
                        value="discovery-call"
                      />

                      {/* Row 1: Full name + Work email */}
                      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <FieldLabel htmlFor="fullName" required>
                            Full name
                          </FieldLabel>
                          <input
                            id="fullName"
                            type="text"
                            name="full-name"
                            autoComplete="name"
                            placeholder="Adaeze Okonkwo"
                            value={fields.fullName}
                            onChange={set("fullName")}
                            aria-describedby={
                              errors.fullName ? "fullName-err" : undefined
                            }
                            className={inputClasses(!!errors.fullName)}
                          />
                          <FieldError
                            id="fullName-err"
                            message={errors.fullName}
                          />
                        </div>

                        <div>
                          <FieldLabel htmlFor="workEmail" required>
                            Work email
                          </FieldLabel>
                          <input
                            id="workEmail"
                            type="email"
                            name="work-email"
                            autoComplete="work email"
                            placeholder="adaeze@company.com"
                            value={fields.workEmail}
                            onChange={set("workEmail")}
                            aria-describedby={
                              errors.workEmail ? "workEmail-err" : undefined
                            }
                            className={inputClasses(!!errors.workEmail)}
                          />
                          <FieldError
                            id="workEmail-err"
                            message={errors.workEmail}
                          />
                        </div>
                      </div>

                      {/* Row 2: Organization + Job title */}
                      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <FieldLabel htmlFor="organization" required>
                            Organization
                          </FieldLabel>
                          <input
                            id="organization"
                            type="text"
                            name="organization"
                            autoComplete="organization"
                            placeholder="Zenith Bank"
                            value={fields.organization}
                            onChange={set("organization")}
                            aria-describedby={
                              errors.organization ? "org-err" : undefined
                            }
                            className={inputClasses(!!errors.organization)}
                          />
                          <FieldError
                            id="org-err"
                            message={errors.organization}
                          />
                        </div>

                        <div>
                          <FieldLabel htmlFor="jobTitle" required>
                            Job title
                          </FieldLabel>
                          <input
                            id="jobTitle"
                            type="text"
                            name="job-title"
                            autoComplete="organization-title"
                            placeholder="Head of L&D"
                            value={fields.jobTitle}
                            onChange={set("jobTitle")}
                            aria-describedby={
                              errors.jobTitle ? "jobTitle-err" : undefined
                            }
                            className={inputClasses(!!errors.jobTitle)}
                          />
                          <FieldError
                            id="jobTitle-err"
                            message={errors.jobTitle}
                          />
                        </div>
                      </div>

                      {/* Sector */}
                      <div className="mb-4">
                        <FieldLabel htmlFor="sector" required>
                          Sector
                        </FieldLabel>
                        <SelectField
                          id="sector"
                          name="sector"
                          value={fields.sector}
                          onChange={set("sector")}
                          placeholder="Select your sector"
                          options={SECTORS}
                          error={!!errors.sector}
                        />
                        <FieldError id="sector-err" message={errors.sector} />
                      </div>

                      {/* Team size */}
                      <div className="mb-4">
                        <FieldLabel htmlFor="teamSize" required>
                          Estimated team size for training
                        </FieldLabel>
                        <SelectField
                          id="teamSize"
                          name="team-size"
                          value={fields.teamSize}
                          onChange={set("teamSize")}
                          placeholder="Select team size"
                          options={TEAM_SIZES}
                          error={!!errors.teamSize}
                        />
                        <FieldError
                          id="teamSize-err"
                          message={errors.teamSize}
                        />
                      </div>

                      {/* Message */}
                      <div className="mb-4">
                        <FieldLabel htmlFor="message" required>
                          What are you hoping to achieve?
                        </FieldLabel>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          placeholder="Tell us about your team, the skills you're looking to build, and any context about previous training that has or hasn't worked..."
                          value={fields.message}
                          onChange={set("message")}
                          aria-describedby={
                            errors.message ? "message-err" : undefined
                          }
                          className={
                            (inputClasses(!!errors.message),
                            "resize-none leading-relaxed")
                          }
                        />
                        <FieldError id="message-err" message={errors.message} />
                      </div>

                      {/* Referral — optional */}
                      <div className="mb-7">
                        <FieldLabel htmlFor="referral" optional>
                          How did you hear about us?
                        </FieldLabel>
                        <SelectField
                          id="referral"
                          name="referral"
                          value={fields.referral}
                          onChange={set("referral")}
                          placeholder="Select an option"
                          options={REFERRAL_SOURCES}
                        />
                      </div>

                      {/* Error banner */}
                      {status === "error" && (
                        <div
                          role="alert"
                          className="mb-5 rounded-xl border border-red-200 bg-red-50
                            px-4 py-3"
                        >
                          <p className="font-body text-[13.5px] text-red-700">
                            Something went wrong on our end. Please try again or
                            email us directly at{" "}
                            <a
                              href="mailto:hello@isoleap.com"
                              className="font-semibold underline underline-offset-2"
                            >
                              hello@isoleap.com
                            </a>
                          </p>
                        </div>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="flex w-full items-center justify-center gap-2
                          rounded-[999px] bg-amber-500
                          px-7 py-3.5
                          font-body text-[15px] font-semibold text-green-900
                          transition-all duration-200
                          hover:bg-amber-400 hover:-translate-y-px
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2
                          disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                      >
                        {status === "submitting" ? (
                          <>
                            <Loader2
                              size={16}
                              strokeWidth={2}
                              className="animate-spin"
                              aria-hidden="true"
                            />
                            Sending your request...
                          </>
                        ) : (
                          "Book my discovery call"
                        )}
                      </button>

                      <p className="mt-3 text-center font-body text-[12px] text-ink-tertiary">
                        We'll respond within 48 hours to confirm your call time.
                      </p>
                    </form>
                  )}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
