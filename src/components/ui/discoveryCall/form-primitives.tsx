"use client";

import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";

export function FieldLabel({
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
      className="block mb-1.5 text-[13px] font-semibold text-grey-600"
    >
      {children}

      {required && (
        <span className="ms-0.5 text-red-500" aria-hidden="true">
          {" "}
          *
        </span>
      )}

      {optional && (
        <span className="ms-1 font-normal text-grey-500">(optional)</span>
      )}
    </label>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p role="alert" id={id} className="mt-1.5 text-[12px] text-red-600">
      {message}
    </p>
  );
}

export function inputClasses(error?: boolean) {
  return `w-full border rounded-xl px-4 py-3 bg-grey-50 text-[14.5px] placeholder:text-grey-500
    transition-colors duration-150 focus-visible:outline-none focus:ring-2 
    ${
      error
        ? "border-red-300 focus:border-red-400 focus:ring-red-200/40"
        : "border-grey-200 focus:border-green-600 focus:ring-green-600/10"
    }`;
}

export function SelectField({
  label,
  name,
  placeholder,
  options,
  value,
  onChange,
  error,
  required,
  optional,
  ariaDescribedBy,
}: {
  label: string;
  name: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  required?: boolean;
  optional?: boolean;
  ariaDescribedBy?: string;
}) {
  return (
    <Field>
      <Label className="block mb-1.5 text-[13px] font-semibold text-grey-600">
        {label}

        {required && (
          <span className="ms-0.5 text-red-500" aria-hidden="true">
            {" "}
            *
          </span>
        )}

        {optional && (
          <span className="ms-1 font-normal text-grey-500">(optional)</span>
        )}
      </Label>

      <Listbox name={name} value={value} onChange={onChange}>
        <ListboxButton
          aria-describedby={ariaDescribedBy}
          aria-invalid={error}
          className={`cursor-pointer flex justify-between items-center ${inputClasses(error)}`}
        >
          {({ open }) => (
            <>
              <span className={value ? "text-grey-700" : "text-grey-500"}>
                {value || placeholder}
              </span>

              <ChevronDown
                className={`w-4 h-4 text-grey-600 transition-transform duration-200
                  ${open ? "rotate-180" : ""}`}
              />
            </>
          )}
        </ListboxButton>

        <ListboxOptions
          modal={false}
          anchor="bottom start"
          transition
          className="w-(--button-width) [--anchor-gap:4px] shadow-md border border-grey-100
            rounded-[8px] bg-white transition duration-200 ease-out data-closed:scale-95
            origin-top data-closed:opacity-0 focus:outline-none"
        >
          {options.map((option) => (
            <ListboxOption
              key={option}
              value={option}
              className="cursor-pointer flex items-center h-[60px] not-last:border-b
                not-last:border-grey-100 px-[24px] text-sm font-medium text-grey-600
                transition-colors duration-150 data-focus:bg-grey-100
                data-selected:bg-amber-200 data-selected:text-grey-700"
            >
              {option}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </Field>
  );
}
