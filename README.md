# SkyDive Website

Next.js App Router website for Dr Maren David Dangut and SkyDive Technologies and Consultancy Ltd, built from the PRD dated 24 July 2026.

## Stack

- Next.js, React and TypeScript in strict mode
- Tailwind CSS with central design tokens
- Local structured content in `content/site.ts`
- Zod, React Hook Form, Postgres lead capture and a server contact route
- Vitest unit tests and Playwright E2E tests
- Vercel-compatible deployment

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

If another app is already using port 3000 or 3001, run:

```bash
npm run dev -- -H 127.0.0.1 -p 3002
```

Open `http://127.0.0.1:3002`.

## Lead Database

The contact form saves validated enquiries into Postgres when `DATABASE_URL` is configured.

For local development:

```bash
cp .env.example .env.local
npm run db:up
npm run dev -- -H 127.0.0.1 -p 3002
```

The local database runs on `127.0.0.1:5434` and is initialised from `db/schema.sql`.

To apply the schema to another Postgres database:

```bash
DATABASE_URL="postgres://user:password@host:5432/database" npm run db:schema
```

Lead records are stored in the `leads` table with contact details, service interest, project summary, consent, source path and request metadata.

### Private Lead Dashboard

Open `http://127.0.0.1:3002/admin/leads` and enter `LEADS_ADMIN_TOKEN` from `.env.local`.

The dashboard can:

- Load recent enquiries from Postgres.
- Filter by status or search text.
- Update lead status.
- Export the visible lead list to CSV.

## Checks

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm run test:e2e
```

## Environment

Copy `.env.example` to `.env.local` and configure values as needed.

- `NEXT_PUBLIC_SITE_URL`: canonical production URL.
- `DATABASE_URL`: Postgres connection string used to save validated lead enquiries.
- `DATABASE_SSL`: set to `true` for hosted databases that require SSL.
- `DATABASE_POOL_MAX`: optional Postgres connection-pool size.
- `LEADS_ADMIN_TOKEN`: private token required by the lead dashboard and admin lead API.
- `CONTACT_EMAIL_PROVIDER`: use `development` locally. Replace with the chosen provider name before production.
- `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `CONTACT_PROVIDER_API_KEY`: required for real email delivery.
- `NEXT_PUBLIC_ANALYTICS_PROVIDER`, `NEXT_PUBLIC_ANALYTICS_SITE_ID`: optional analytics configuration.

The current email adapter is development-safe. It does not claim to send real email unless a production provider implementation is added and confirmed.

## Content Editing

Frequently updated content lives in `content/site.ts`:

- Services
- Skills
- Certifications
- Education
- Professional experience
- Case-study candidates
- Articles
- Site metadata and contact/social links

Add future articles or case studies by adding objects to the relevant arrays. Keep incomplete case studies marked `needsReview` until public wording, client permissions and evidence are approved.

## Privacy And Security Notes

- Do not add tax references, dates of birth, passport details, immigration details, private residential data, confidential client deliverables or source code to public content.
- The site ships without non-essential analytics cookies by default.
- Contact submissions are validated server-side, rate limited, protected by a honeypot field and saved to Postgres when configured.
- Security headers and a conservative CSP are configured in `next.config.mjs`.

## Deployment

1. Configure environment variables in the hosting platform.
2. Run `db/schema.sql` against the production database.
3. Add the production email provider implementation in `lib/email.ts`.
4. Confirm the canonical domain in `NEXT_PUBLIC_SITE_URL`.
5. Run `npm run build`.
6. Deploy to Vercel or another Next.js-compatible host.

## Known Limitations

- Managed CMS, preview, scheduling and role-based publishing are represented by a local content layer for MVP.
- Real email delivery requires provider selection and credentials.
- A hosted Postgres database is required before production lead capture.
- Analytics is configurable but disabled until a provider is chosen.
- Professional photography, downloadable profile PDF and final logo assets require owner-supplied or approved assets.
- Legal, privacy and cookie pages require final legal review before production launch.

## Future Backlog

1. Add a managed CMS with preview and scheduling if Maren wants non-developer editing.
2. Implement the chosen email provider and delivery monitoring.
3. Add approved professional photography and final brand assets.
4. Create an approved downloadable capability statement.
5. Replace draft case-study candidates with permissioned public case studies.
6. Add newsletter and gated resources only after consent and cookie requirements are confirmed.
