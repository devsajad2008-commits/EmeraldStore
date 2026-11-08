"use client";

import Select from "react-select";

export type CustomSelectOption = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  id: string;
  ariaLabel: string;
  options: readonly CustomSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

export function CustomSelect({
  id,
  ariaLabel,
  options,
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
}: CustomSelectProps) {
  return (
    <Select<CustomSelectOption>
      inputId={id}
      instanceId={id}
      aria-label={ariaLabel}
      className={`custom-select ${className}`.trim()}
      classNamePrefix="custom-select"
      options={options}
      value={options.find((option) => option.value === value) ?? null}
      onChange={(option) => onChange(option?.value ?? "")}
      placeholder={placeholder}
      isClearable={false}
      isSearchable={false}
      isRtl
      required={required}
      menuPortalTarget={typeof document === "undefined" ? undefined : document.body}
      menuPosition="fixed"
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 1000 }) }}
      unstyled
    />
  );
}
