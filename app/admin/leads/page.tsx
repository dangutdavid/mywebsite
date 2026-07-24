import { AdminLeadsDashboard } from "@/components/admin-leads-dashboard";
import { CompactHero } from "@/components/compact-layout";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Lead Pipeline",
  description: "Private SkyDive lead management dashboard.",
  path: "/admin/leads"
});

export default function AdminLeadsPage() {
  return (
    <>
      <CompactHero
        eyebrow="Private"
        title="Lead pipeline"
        copy="Review website enquiries, filter the pipeline, update lead status and export a working CSV for follow-up."
        tone="brand"
      />
      <AdminLeadsDashboard />
    </>
  );
}
