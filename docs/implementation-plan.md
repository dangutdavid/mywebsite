# SkyDive Website Implementation Plan

## Source Of Truth

Primary source: `SkyDive_Personal_and_Company_Website_PRD.docx`, dated 24 July 2026.

Supporting source used only for public-safe facts: supplied CV and company summary. Sensitive details such as tax references, date of birth, private identity information and unnecessary residential information are excluded.

## Implementation Checklist

### Required Pages

- Home
- Services overview
- Individual service pages:
  - Salesforce engineering and architecture
  - AI and data solutions
  - Systems integration
  - Technical leadership and delivery
  - Training and advisory
- Work / selected experience
- Case studies listing
- About Maren
- Company overview
- Insights listing and article detail pages
- Contact
- Privacy notice
- Cookie notice
- Terms of use
- Custom 404 page

### Reusable Components

- Site shell, header, footer and responsive navigation
- Skip link and focus styles
- Section, container, hero, CTA, card and metadata primitives
- Service cards and service detail layout
- Work/case-study cards with content status
- Article cards and article detail layout
- Contact form with accessible validation states
- Structured data components

### Content Models

Local structured content is stored in `content/site.ts` and separated from layout code:

- Site metadata
- Navigation and contact routes
- Services
- Skills and technologies
- Professional experience
- Projects and case studies
- Certifications
- Education
- Articles
- Legal page copy

Future articles and case studies can be added by extending the relevant arrays without changing route logic.

### Forms And Integrations

- Contact form uses client validation plus a server route.
- Server validation uses Zod.
- Honeypot spam protection and in-memory rate limiting are included for MVP.
- Email delivery uses an environment-driven adapter.
- If provider credentials are not configured, submissions are accepted in development mode only and logged server-side.

### SEO Requirements

- Page-level metadata, canonical paths and Open Graph data.
- Sitemap and robots routes.
- Person schema for Maren.
- Organisation / ProfessionalService schema for SkyDive.
- Article schema for published insights.
- Breadcrumb-style internal links where useful.

### Accessibility Requirements

- WCAG 2.2 AA-oriented implementation.
- Semantic landmarks and heading order.
- Skip link.
- Keyboard-accessible desktop and mobile navigation.
- Mobile menu closes with Escape and restores focus.
- Focus-visible styles.
- Form labels, errors and success/failure states.
- Reduced-motion support.
- No information communicated by colour only.

### Security And Privacy Requirements

- No secrets committed.
- Environment variable documentation in `.env.example`.
- Server-side validation and sanitisation.
- Honeypot and rate limiting.
- Safe external links.
- Security headers and CSP in `next.config.mjs`.
- No unnecessary analytics or non-essential cookies by default.
- Privacy, cookie and terms pages included.

### Analytics Requirements

- Privacy-conscious analytics abstraction in `lib/analytics.ts`.
- Provider is disabled unless configured.
- Events are named for CTA clicks, form starts/submissions, service/case-study/article views, CV/profile downloads and external profile clicks.
- No form contents are sent to analytics.

### Deployment Requirements

- Vercel-compatible Next.js App Router application.
- Strict TypeScript.
- Production build command documented.
- Environment variables documented.
- Security headers configured.
- Known limitations and future backlog documented in README.

## Phases

1. Discovery and traceability documentation.
2. Foundation: app structure, tokens, typography, shell, navigation and content models.
3. Pages and content: implement PRD sitemap and public-safe draft content.
4. Functionality: contact workflow, SEO, structured data, analytics abstraction and error states.
5. QA: lint, type check, unit tests, E2E tests and production build.
6. Final review: update traceability statuses honestly.

