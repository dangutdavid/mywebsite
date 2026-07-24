# Open Questions And Assumptions

## Questions For Owner Review

- Confirm the final public domain and canonical base URL. Current implementation uses `NEXT_PUBLIC_SITE_URL`.
- Confirm the preferred public contact email. The CV lists a personal email, but the site should ideally use a company address before launch.
- Confirm whether the registered office should be published on legal pages. The footer currently includes company name, number and jurisdiction only.
- Confirm which client names and project descriptions can be used publicly. Current case studies are marked `needsReview` and displayed cautiously.
- Confirm final certification status immediately before publication.
- Confirm whether a downloadable profile PDF should be generated from the current CV before launch.
- Confirm analytics provider choice and cookie-consent requirements.
- Confirm email provider and sender domain for the contact form.
- Confirm whether professional headshots and brand/logo assets are available.

## Reversible Assumptions

- Use one primary SkyDive company website with a prominent About Maren section, as recommended by the PRD.
- Use local structured content for MVP rather than a full CMS, while keeping content separate from layout code.
- Do not use non-essential cookies or analytics until configured.
- Use neutral draft case-study wording where public permission is not yet confirmed.
- Treat the contact form as production-shaped but development-safe until email credentials are configured.

