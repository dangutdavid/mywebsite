import type { Metadata } from "next";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

export function pageMetadata({ title, description, path, type = "website" }: PageMetadata): Metadata {
  const fullTitle = title === site.shortName ? `${site.shortName} | ${site.tagline}` : `${title} | ${site.shortName}`;
  const url = absoluteUrl(path);

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type,
      locale: "en_GB"
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description
    }
  };
}

