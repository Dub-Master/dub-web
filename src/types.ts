export type LanguageCode = "en" | "es" | "de" | "fr";

export const LanguageName: Record<LanguageCode, string> = {
  en: "English",
  es: "Spanish",
  de: "German",
  fr: "French",
};

export type JobStatus = "created" | "running" | "completed" | "failed";

export interface Job {
  id: string;
  input_url: string;
  target_language: LanguageCode;
  output_url: string;
  status: JobStatus;
}

export function isJobStatusFinal(status: JobStatus) {
  return status === "completed" || status === "failed";
}
