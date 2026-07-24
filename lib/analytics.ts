export type AnalyticsEvent =
  | "contact_cta_click"
  | "contact_form_start"
  | "contact_form_success"
  | "service_page_view"
  | "case_study_view"
  | "article_view"
  | "profile_download_click"
  | "external_profile_click";

export function trackEvent(name: AnalyticsEvent, properties: Record<string, string> = {}) {
  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER;
  if (!provider || typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("skydive:analytics", {
      detail: {
        provider,
        name,
        properties
      }
    })
  );
}

