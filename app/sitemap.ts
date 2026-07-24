import type { MetadataRoute } from "next";
import { articles, services } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/services",
    "/work",
    "/case-studies",
    "/about/maren",
    "/company",
    "/skills",
    "/certifications",
    "/education",
    "/public-profile",
    "/insights",
    "/contact",
    "/privacy",
    "/cookies",
    "/terms"
  ];
  const serviceRoutes = services.map((service) => `/services/${service.slug}`);
  const articleRoutes = articles.filter((article) => article.status === "published").map((article) => `/insights/${article.slug}`);
  return [...staticRoutes, ...serviceRoutes, ...articleRoutes].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date()
  }));
}
