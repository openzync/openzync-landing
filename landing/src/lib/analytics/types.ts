export type Ga4Event =
  | "page_view"
  | "sign_up"
  | "login"
  | "cta_click"
  | "social_click"
  | "doc_click"
  | "faq_interaction"
  | "feature_view";

export interface Ga4EventParams {
  [key: string]: string | number | boolean | undefined | null;
  page_title?: string;
  page_location?: string;
}
