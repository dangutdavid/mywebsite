import { notFound } from "next/navigation";
import { CompactHero } from "@/components/compact-layout";
import { Container } from "@/components/section";
import { StructuredData } from "@/components/structured-data";
import { articles, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.filter((article) => article.status === "published").map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug && item.status === "published");
  if (!article) return {};
  return pageMetadata({ title: article.title, description: article.description, path: `/insights/${article.slug}`, type: "article" });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug && item.status === "published");
  if (!article) notFound();

  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.description,
          datePublished: article.date,
          author: { "@type": "Person", name: site.personName },
          publisher: { "@type": "Organization", name: site.name },
          mainEntityOfPage: absoluteUrl(`/insights/${article.slug}`)
        }}
      />
      <CompactHero
        eyebrow={`${article.category} / ${formatDate(article.date)} / ${article.readingTime}`}
        title={article.title}
        copy={article.description}
      />
      <section className="border-b border-line bg-white">
        <Container className="py-10">
          <article className="mx-auto max-w-3xl text-base leading-8 text-slate">
            {article.body.map((paragraph) => (
              <p key={paragraph} className="mb-6">
                {paragraph}
              </p>
            ))}
          </article>
        </Container>
      </section>
    </>
  );
}
