# Requirement Traceability

| Requirement | Planned implementation | File or component | Status | Verification |
| --- | --- | --- | --- | --- |
| Read PRD and repo | Extracted requirements and inspected empty workspace | `docs/implementation-plan.md` | BUILT | Manual review |
| Home page | Hero, trust strip, services, about, work, insights, enquiry panel | `app/page.tsx` | BUILT | Route smoke test, build |
| Services overview | Service summaries, problems, models, principles, FAQ | `app/services/page.tsx` | BUILT | Route smoke test |
| Individual service pages | Five PRD service families with deliverables and CTA | `app/services/[slug]/page.tsx` | BUILT | Route generation test |
| About Maren | Profile, expertise, timeline, education, certifications | `app/about/maren/page.tsx` | BUILT | Content rendering test |
| Company page | Mission, operating model, legal identity | `app/company/page.tsx` | BUILT | Route smoke test |
| Work page | Selected experience and project highlights | `app/work/page.tsx` | BUILT | Route smoke test |
| Case studies | Draft/needs-review case-study listing | `app/case-studies/page.tsx` | BUILT | Content rendering test |
| Insights | Article listing and article detail pages | `app/insights/page.tsx`, `app/insights/[slug]/page.tsx` | BUILT | Route generation test |
| Contact | Accessible enquiry form with validation | `app/contact/page.tsx`, `components/contact-form.tsx` | BUILT | Unit and E2E tests |
| Server submission | Server route, Zod validation, honeypot, rate limiting, adapter | `app/api/contact/route.ts`, `lib/contact.ts` | BUILT | Unit tests |
| Email integration | Environment-driven adapter with dev-safe mode | `lib/email.ts` | PARTIALLY BUILT | Build and README; provider config required |
| Navigation | Desktop nav, mobile dialog, active states, skip link | `components/site-header.tsx` | BUILT | E2E keyboard/menu test |
| Footer | Key nav, legal links, company number/jurisdiction | `components/site-footer.tsx` | BUILT | Route smoke test |
| SEO metadata | Unique titles/descriptions, canonical paths, OG | `lib/metadata.ts`, page files | BUILT | Metadata unit test |
| Structured data | Person, organisation and article JSON-LD | `components/structured-data.tsx` | BUILT | Unit test |
| Sitemap and robots | Dynamic routes for sitemap and robots | `app/sitemap.ts`, `app/robots.ts` | BUILT | Build |
| Custom 404 | Helpful recovery links | `app/not-found.tsx` | BUILT | E2E 404 test |
| Accessibility | Semantics, focus, labels, reduced motion | `app/globals.css`, components | BUILT | Manual review, E2E |
| Privacy/security | Privacy pages, headers, CSP, safe links | `next.config.mjs`, legal pages | BUILT | Build, manual review |
| Analytics | Configurable abstraction and safe event names | `lib/analytics.ts` | BUILT | Unit test |
| Performance | Server components by default, minimal client JS, no heavy assets | App structure | BUILT | Production build |
| Documentation | README, env example, content guide, backlog | `README.md`, `.env.example`, docs | BUILT | Manual review |
| Sensitive data exclusion | Exclude DOB, tax refs, private details and immigration status | `content/site.ts` | BUILT | Content audit |
| CMS | Full managed CMS with roles/preview/scheduling | N/A | PARTIALLY BUILT | Local content layer only |
| Real email delivery | Authenticated provider sends email | `lib/email.ts` | BLOCKED | Requires provider credentials |
| Production analytics | Provider-specific tracking | `lib/analytics.ts` | BLOCKED | Requires provider choice |
| Professional photography | Approved headshots | N/A | BLOCKED | Requires assets |
| Downloadable profile | Downloadable CV/profile PDF | N/A | PARTIALLY BUILT | Link placeholder disabled pending approved PDF |

