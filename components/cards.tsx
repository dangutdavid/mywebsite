import Link from "next/link";
import { type Article, type CaseStudy, type Service } from "@/content/site";
import { formatDate } from "@/lib/utils";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="rounded-lg border border-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <h3 className="text-xl font-semibold text-navy">
        <Link href={`/services/${service.slug}`} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal">
          {service.title}
        </Link>
      </h3>
      <p className="mt-3 leading-7 text-slate">{service.summary}</p>
      <p className="mt-5 text-sm font-semibold text-teal">View service</p>
    </article>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="rounded-lg border border-line bg-white p-6">
      <p className="text-sm font-medium text-teal">
        {article.category} · {formatDate(article.date)}
      </p>
      <h3 className="mt-3 text-xl font-semibold text-navy">
        <Link href={`/insights/${article.slug}`} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal">
          {article.title}
        </Link>
      </h3>
      <p className="mt-3 leading-7 text-slate">{article.description}</p>
    </article>
  );
}

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="rounded-lg border border-line bg-cloud p-6">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-xl font-semibold text-navy">{study.title}</h3>
        {study.status === "needsReview" ? (
          <span className="rounded-sm border border-amber/40 bg-white px-2 py-1 text-xs font-semibold text-amber">
            Draft: needs owner review
          </span>
        ) : null}
      </div>
      <p className="mt-3 leading-7 text-slate">{study.context}</p>
      <p className="mt-5 text-sm font-semibold text-navy">Role</p>
      <p className="mt-1 leading-7 text-slate">{study.role}</p>
    </article>
  );
}

