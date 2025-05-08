import React from "react";

export type TherapistProps = {
  id: number;
  slug: string;
  name: string;
  profession: string;
  communication_method: string[];
  address: string | null;
  specialisms: string[];
  email: string;
  phone_number: string;
  fee_per_hour: number;
  therapy_types_offered: string[];
  website_link: string;
  profile_image: string;
  qualifications_and_accreditations: string[];
  age: ("14-18" | "18-65" | "65+")[];
  faith: string;
  insurance: string[];
  languages: string[];
  sexuality: string | null;
  ethnicity: string[];
  biography: string;
  how_we_start: string;
};

export type CheckboxButtonOptions = {
  icon: React.ReactNode;
  label: string;
}[];
