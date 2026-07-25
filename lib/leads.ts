import type { NextRequest } from "next/server";
import { getPool, isDatabaseConfigured } from "@/lib/database";
import type { ContactInput } from "@/lib/contact";

export const leadStatuses = ["new", "contacted", "qualified", "won", "declined", "archived"] as const;
export type LeadStatus = (typeof leadStatuses)[number];
export const leadFollowUpStatuses = ["none", "needs_follow_up", "scheduled", "waiting", "completed"] as const;
export type LeadFollowUpStatus = (typeof leadFollowUpStatuses)[number];

export type LeadCaptureResult = {
  ok: boolean;
  mode: "database" | "disabled";
  id?: string;
  message?: string;
};

export type LeadRecord = {
  id: string;
  name: string;
  organisation: string;
  email: string;
  telephone: string | null;
  service: string;
  summary: string;
  timing: string;
  budget: string | null;
  preferredContact: string;
  consent: boolean;
  status: LeadStatus;
  internalNotes: string;
  nextActionDate: string | null;
  followUpStatus: LeadFollowUpStatus;
  sourcePath: string | null;
  createdAt: string;
  updatedAt: string;
};

type LeadRow = {
  id: string;
  name: string;
  organisation: string;
  email: string;
  telephone: string | null;
  service: string;
  summary: string;
  timing: string;
  budget: string | null;
  preferred_contact: string;
  consent: boolean;
  status: LeadStatus;
  internal_notes: string;
  next_action_date: Date | string | null;
  follow_up_status: LeadFollowUpStatus;
  source_path: string | null;
  created_at: Date;
  updated_at: Date;
};

export type LeadUpdateInput = {
  status?: LeadStatus;
  internalNotes?: string;
  nextActionDate?: string | null;
  followUpStatus?: LeadFollowUpStatus;
};

export async function saveLead(input: ContactInput, request: NextRequest): Promise<LeadCaptureResult> {
  if (!isDatabaseConfigured()) {
    return {
      ok: true,
      mode: "disabled",
      message: "Database capture is disabled until DATABASE_URL is configured."
    };
  }

  const pool = getPool();
  const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
  const userAgent = request.headers.get("user-agent") || null;
  const sourcePath = request.headers.get("referer") || "/contact";

  const result = await pool.query<{ id: string }>(
    `
      insert into leads (
        name,
        organisation,
        email,
        telephone,
        service,
        summary,
        timing,
        budget,
        preferred_contact,
        consent,
        source_path,
        ip_address,
        user_agent
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      returning id
    `,
    [
      input.name,
      input.organisation,
      input.email,
      input.telephone || null,
      input.service,
      input.summary,
      input.timing,
      input.budget || null,
      input.preferredContact,
      input.consent,
      sourcePath,
      ipAddress,
      userAgent
    ]
  );

  return { ok: true, mode: "database", id: result.rows[0]?.id };
}

export async function listLeads({
  status,
  query,
  limit = 100
}: {
  status?: string;
  query?: string;
  limit?: number;
}) {
  if (!isDatabaseConfigured()) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const filters: string[] = [];
  const values: Array<string | number> = [];

  if (status && leadStatuses.includes(status as LeadStatus)) {
    values.push(status);
    filters.push(`status = $${values.length}`);
  }

  if (query) {
    values.push(`%${query}%`);
    filters.push(
      `(name ilike $${values.length} or organisation ilike $${values.length} or email ilike $${values.length} or service ilike $${values.length})`
    );
  }

  values.push(Math.min(Math.max(limit, 1), 250));

  const result = await getPool().query<LeadRow>(
    `
      select
        id,
        name,
        organisation,
        email,
        telephone,
        service,
        summary,
        timing,
        budget,
        preferred_contact,
        consent,
        status,
        internal_notes,
        next_action_date,
        follow_up_status,
        source_path,
        created_at,
        updated_at
      from leads
      ${filters.length ? `where ${filters.join(" and ")}` : ""}
      order by created_at desc
      limit $${values.length}
    `,
    values
  );

  return result.rows.map(mapLeadRow);
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  return updateLead(id, { status });
}

export async function updateLead(id: string, updates: LeadUpdateInput) {
  if (!isDatabaseConfigured()) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const assignments: string[] = [];
  const values: Array<string | null> = [id];

  if (updates.status) {
    values.push(updates.status);
    assignments.push(`status = $${values.length}`);
  }

  if (updates.internalNotes !== undefined) {
    values.push(updates.internalNotes);
    assignments.push(`internal_notes = $${values.length}`);
  }

  if (updates.nextActionDate !== undefined) {
    values.push(updates.nextActionDate || null);
    assignments.push(`next_action_date = $${values.length}`);
  }

  if (updates.followUpStatus) {
    values.push(updates.followUpStatus);
    assignments.push(`follow_up_status = $${values.length}`);
  }

  if (!assignments.length) {
    return null;
  }

  const result = await getPool().query<LeadRow>(
    `
      update leads
      set ${assignments.join(", ")}
      where id = $1
      returning
        id,
        name,
        organisation,
        email,
        telephone,
        service,
        summary,
        timing,
        budget,
        preferred_contact,
        consent,
        status,
        internal_notes,
        next_action_date,
        follow_up_status,
        source_path,
        created_at,
        updated_at
    `,
    values
  );

  return result.rows[0] ? mapLeadRow(result.rows[0]) : null;
}

function mapLeadRow(row: LeadRow): LeadRecord {
  return {
    id: row.id,
    name: row.name,
    organisation: row.organisation,
    email: row.email,
    telephone: row.telephone,
    service: row.service,
    summary: row.summary,
    timing: row.timing,
    budget: row.budget,
    preferredContact: row.preferred_contact,
    consent: row.consent,
    status: row.status,
    internalNotes: row.internal_notes || "",
    nextActionDate: formatDateOnly(row.next_action_date),
    followUpStatus: row.follow_up_status || "none",
    sourcePath: row.source_path,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString()
  };
}

function formatDateOnly(value: Date | string | null) {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    return value.slice(0, 10);
  }

  return value.toISOString().slice(0, 10);
}
