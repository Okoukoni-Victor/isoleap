export interface FormFields {
  fullName: string;
  workEmail: string;
  organization: string;
  jobTitle: string;
  sector: string;
  teamSize: string;
  message: string;
  referral: string;
}

export type FormErrors = Partial<Record<keyof FormFields, string>>;

export type FormStatus = "idle" | "submitting" | "success" | "error";

export const EMPTY: FormFields = {
  fullName: "",
  workEmail: "",
  organization: "",
  jobTitle: "",
  sector: "",
  teamSize: "",
  message: "",
  referral: "",
};

export const SECTORS = [
  "Banking & Financial Services",
  "Telecommunications",
  "Oil & Gas",
  "FMCG & Consumer Goods",
  "Government Agencies",
  "Technology",
  "Other",
];

export const TEAM_SIZES = [
  "15-30 people",
  "31-50 people",
  "51-100 people",
  "101-250 people",
  "251-500 people",
  "500+ people",
];

export const REFERRAL_SOURCES = [
  "LinkedIn",
  "Google search",
  "Referral from a colleague",
  "Tech4Dev",
  "Event or conference",
  "Other",
];

export function encode(data: Record<string, string>): string {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
}

export function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields.fullName.trim()) errors.fullName = "Please enter your full name";
  if (!fields.workEmail.trim())
    errors.workEmail = "Please enter your work email";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.workEmail))
    errors.workEmail = "Please enter a valid email address";
  if (!fields.organization.trim())
    errors.organization = "Please enter your organization";
  if (!fields.jobTitle.trim()) errors.jobTitle = "Please enter your job title";
  if (!fields.sector) errors.sector = "Please select your sector";
  if (!fields.teamSize) errors.teamSize = "Please select your team size";
  if (!fields.message.trim())
    errors.message = "Please tell us what you're hoping to achieve";
  return errors;
}
