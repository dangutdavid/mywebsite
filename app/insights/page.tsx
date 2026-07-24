import { CompactBand, CompactCell, CompactHero } from "@/components/compact-layout";
import { articles } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Insights",
  description: "Practical articles on Salesforce engineering, AI, data, integration and technical leadership.",
  path: "/insights"
});

export default function InsightsPage() {
  return (
    <>
      <CompactHero
        eyebrow="Insights"
        title="Insights"
        copy="Draft launch articles designed to be useful, specific and easy to maintain through the local content layer."
      />
      <CompactBand title="Published articles" columns="md:grid-cols-[0.85fr_repeat(3,1fr)]">
        {articles
          .filter((article) => article.status === "published")
          .map((article) => (
            <CompactCell
              key={article.slug}
              title={article.title}
              copy={article.description}
              footer={`${article.category} / ${formatDate(article.date)} / ${article.readingTime}`}
              href={`/insights/${article.slug}`}
            />
          ))}
      </CompactBand>
    </>
  );
}
