"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import {
  FormFields,
  FormErrors,
  FormStatus,
  SECTORS,
  TEAM_SIZES,
  REFERRAL_SOURCES,
} from "./types";
import {
  FieldLabel,
  FieldError,
  inputClasses,
  SelectField,
} from "./form-primitives";

interface DiscoveryFormProps {
  fields: FormFields;
  errors: FormErrors;
  status: FormStatus;
  setField: (key: keyof FormFields, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function DiscoveryCallForm({
  fields,
  errors,
  status,
  setField,
  onSubmit,
}: DiscoveryFormProps) {
  return (
    <form
      name="discovery-call"
      data-netlify="true"
      onSubmit={onSubmit}
      noValidate
    >
      {/* Required by Netlify when submitting via fetch */}
      <input type="hidden" name="form-name" value="discovery-call" />
      <input type="hidden" name="bot-field" value="" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <FieldLabel htmlFor="fullName" required>
            Full name
          </FieldLabel>

          <input
            type="text"
            id="fullName"
            name="full-name"
            placeholder="John Doe"
            autoComplete="name"
            value={fields.fullName}
            onChange={(e) => setField("fullName", e.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullNameError" : undefined}
            className={inputClasses(Boolean(errors.fullName))}
          />

          <FieldError id="fullNameError" message={errors.fullName} />
        </div>

        <div>
          <FieldLabel htmlFor="workEmail" required>
            Work email
          </FieldLabel>

          <input
            type="email"
            id="workEmail"
            name="work-email"
            placeholder="johndoe@company.com"
            autoComplete="work email"
            value={fields.workEmail}
            onChange={(e) => setField("workEmail", e.target.value)}
            aria-invalid={Boolean(errors.workEmail)}
            aria-describedby={errors.workEmail ? "workEmailError" : undefined}
            className={inputClasses(Boolean(errors.workEmail))}
          />

          <FieldError id="workEmailError" message={errors.workEmail} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <FieldLabel htmlFor="organization" required>
            Organization
          </FieldLabel>

          <input
            type="text"
            id="organization"
            name="organization"
            placeholder="ABC Holdings"
            autoComplete="organization"
            value={fields.organization}
            onChange={(e) => setField("organization", e.target.value)}
            aria-invalid={Boolean(errors.organization)}
            aria-describedby={
              errors.organization ? "organizationError" : undefined
            }
            className={inputClasses(Boolean(errors.organization))}
          />

          <FieldError id="organizationError" message={errors.organization} />
        </div>

        <div>
          <FieldLabel htmlFor="jobTitle" required>
            Job title
          </FieldLabel>

          <input
            type="text"
            id="jobTitle"
            name="job-title"
            placeholder="Head of L&D"
            autoComplete="organization-title"
            value={fields.jobTitle}
            onChange={(e) => setField("jobTitle", e.target.value)}
            aria-invalid={Boolean(errors.jobTitle)}
            aria-describedby={errors.jobTitle ? "jobTitleError" : undefined}
            className={inputClasses(Boolean(errors.jobTitle))}
          />

          <FieldError id="jobTitleError" message={errors.jobTitle} />
        </div>
      </div>

      <div className="mb-4">
        <SelectField
          label="Sector"
          name="sector"
          placeholder="Select your sector"
          options={SECTORS}
          value={fields.sector}
          onChange={(value) => setField("sector", value)}
          error={Boolean(errors.sector)}
          ariaDescribedBy={errors.sector ? "sectorError" : undefined}
          required
        />

        <FieldError id="sectorError" message={errors.sector} />
      </div>

      <div className="mb-4">
        <SelectField
          label="Estimated team size for training"
          name="team-size"
          placeholder="Select team size"
          options={TEAM_SIZES}
          value={fields.teamSize}
          onChange={(value) => setField("teamSize", value)}
          error={Boolean(errors.teamSize)}
          ariaDescribedBy={errors.teamSize ? "teamSizeError" : undefined}
          required
        />

        <FieldError id="teamSizeError" message={errors.teamSize} />
      </div>

      <div className="mb-4">
        <FieldLabel htmlFor="message" required>
          What are you hoping to achieve?
        </FieldLabel>

        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your team, the skills you're looking to build..."
          value={fields.message}
          onChange={(e) => setField("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "messageError" : undefined}
          className={`${inputClasses(Boolean(errors.message))} resize-none leading-relaxed`}
        />

        <FieldError id="messageError" message={errors.message} />
      </div>

      <div className="mb-7">
        <SelectField
          label="How did you hear about us?"
          name="referral"
          placeholder="Select an option"
          options={REFERRAL_SOURCES}
          value={fields.referral}
          onChange={(value) => setField("referral", value)}
          optional
        />
      </div>

      {/* Error banner */}
      {status === "error" && (
        <div
          role="alert"
          className="mb-5 border border-red-200 rounded-xl px-4 py-3 bg-red-50"
        >
          <p className="text-[13.5px] text-red-700">
            Something went wrong on our end. Please try again or email us at{" "}
            <Link
              href="mailto:hello@isoleap.com"
              className="font-semibold underline underline-offset-2"
            >
              hello@isoleap.com
            </Link>
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="select-none cursor-pointer inline-flex justify-center items-center gap-2
          w-full rounded-full px-7 py-3.5 bg-green-600 text-sm md:text-[15px] font-semibold
          text-white transition-colors duration-150 hover:bg-green-700
          disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={16} strokeWidth={2} className="animate-spin" />{" "}
            Sending your request...
          </>
        ) : (
          "Book my discovery call"
        )}
      </button>

      <p className="mt-3 text-center text-[12px] font-medium text-grey-600">
        We'll respond within 48 hours to confirm your call time.
      </p>
    </form>
  );
}
