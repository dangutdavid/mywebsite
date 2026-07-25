"use client";

import { useMemo, useState } from "react";
import type { LeadFollowUpStatus, LeadRecord, LeadStatus } from "@/lib/leads";

const statusLabels: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  won: "Won",
  declined: "Declined",
  archived: "Archived"
};

const followUpLabels: Record<LeadFollowUpStatus, string> = {
  none: "No follow-up set",
  needs_follow_up: "Needs follow-up",
  scheduled: "Scheduled",
  waiting: "Waiting",
  completed: "Completed"
};

type LeadsResponse = {
  ok: boolean;
  message?: string;
  leads?: LeadRecord[];
  statuses?: LeadStatus[];
  followUpStatuses?: LeadFollowUpStatus[];
};

type FollowUpDraft = {
  internalNotes: string;
  nextActionDate: string;
  followUpStatus: LeadFollowUpStatus;
};

export function AdminLeadsDashboard() {
  const [token, setToken] = useState("");
  const [savedToken, setSavedToken] = useState("");
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [statuses, setStatuses] = useState<LeadStatus[]>([]);
  const [followUpStatuses, setFollowUpStatuses] = useState<LeadFollowUpStatus[]>([]);
  const [followUpDrafts, setFollowUpDrafts] = useState<Record<string, FollowUpDraft>>({});
  const [statusFilter, setStatusFilter] = useState("");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("Enter the admin token to load leads.");
  const [loading, setLoading] = useState(false);

  const totals = useMemo(() => {
    return leads.reduce<Record<string, number>>((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {});
  }, [leads]);

  async function loadLeads(accessToken = savedToken) {
    if (!accessToken) {
      setMessage("Enter the admin token to load leads.");
      return;
    }

    setLoading(true);
    setMessage("Loading leads...");

    const params = new URLSearchParams();
    if (statusFilter) params.set("status", statusFilter);
    if (query.trim()) params.set("query", query.trim());

    const response = await fetch(`/api/admin/leads?${params.toString()}`, {
      headers: { "x-admin-token": accessToken }
    });
    const data = (await response.json()) as LeadsResponse;

    setLoading(false);

    if (!response.ok || !data.ok) {
      setMessage(data.message || "Could not load leads.");
      return;
    }

    setSavedToken(accessToken);
    setLeads(data.leads || []);
    setStatuses(data.statuses || []);
    setFollowUpStatuses(data.followUpStatuses || []);
    setFollowUpDrafts(buildFollowUpDrafts(data.leads || []));
    setMessage(`${data.leads?.length || 0} lead${data.leads?.length === 1 ? "" : "s"} loaded.`);
  }

  async function updateStatus(id: string, status: LeadStatus) {
    const response = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": savedToken
      },
      body: JSON.stringify({ status })
    });
    const data = (await response.json()) as { ok: boolean; message?: string; lead?: LeadRecord };

    if (!response.ok || !data.ok || !data.lead) {
      setMessage(data.message || "Could not update lead.");
      return;
    }

    setLeads((current) => current.map((lead) => (lead.id === id ? data.lead! : lead)));
    setMessage("Lead status updated.");
  }

  async function saveFollowUp(lead: LeadRecord) {
    const draft = getFollowUpDraft(lead);
    const response = await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": savedToken
      },
      body: JSON.stringify(draft)
    });
    const data = (await response.json()) as { ok: boolean; message?: string; lead?: LeadRecord };

    if (!response.ok || !data.ok || !data.lead) {
      setMessage(data.message || "Could not save follow-up details.");
      return;
    }

    setLeads((current) => current.map((item) => (item.id === lead.id ? data.lead! : item)));
    setFollowUpDrafts((current) => ({ ...current, [lead.id]: toFollowUpDraft(data.lead!) }));
    setMessage("Follow-up details saved.");
  }

  function updateFollowUpDraft(id: string, patch: Partial<FollowUpDraft>) {
    const lead = leads.find((item) => item.id === id);
    if (!lead) return;

    setFollowUpDrafts((current) => ({
      ...current,
      [id]: {
        ...toFollowUpDraft(lead),
        ...current[id],
        ...patch
      }
    }));
  }

  function getFollowUpDraft(lead: LeadRecord) {
    return followUpDrafts[lead.id] || toFollowUpDraft(lead);
  }

  function exportCsv() {
    const header = [
      "created_at",
      "status",
      "follow_up_status",
      "next_action_date",
      "name",
      "organisation",
      "email",
      "telephone",
      "service",
      "timing",
      "budget",
      "preferred_contact",
      "internal_notes",
      "summary"
    ];
    const rows = leads.map((lead) =>
      [
        lead.createdAt,
        lead.status,
        lead.followUpStatus,
        lead.nextActionDate || "",
        lead.name,
        lead.organisation,
        lead.email,
        lead.telephone || "",
        lead.service,
        lead.timing,
        lead.budget || "",
        lead.preferredContact,
        lead.internalNotes,
        lead.summary
      ].map(csvCell)
    );
    const csv = [header, ...rows].map((row) => row.join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `skydive-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="border-b border-line bg-cloud">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
          <aside className="border border-line bg-white p-5 shadow-soft">
            <h2 className="font-display text-2xl font-semibold text-navy">Lead access</h2>
            <p className="mt-2 text-sm leading-6 text-slate">
              Use the private lead token from your local environment file. The token is only sent to protected API routes.
            </p>
            <label className="mt-5 block">
              <span className="block text-sm font-semibold text-navy">Admin token</span>
              <input
                value={token}
                onChange={(event) => setToken(event.target.value)}
                type="password"
                className="field mt-2"
                autoComplete="current-password"
              />
            </label>
            <button
              type="button"
              onClick={() => loadLeads(token)}
              className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-teal px-5 py-3 text-sm font-semibold text-white hover:bg-[#066d70]"
            >
              {loading ? "Loading..." : "Load leads"}
            </button>
            <div className="mt-5 border-t border-line pt-5">
              <label className="block">
                <span className="block text-sm font-semibold text-navy">Status</span>
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="field mt-2">
                  <option value="">All statuses</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {statusLabels[status]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="mt-4 block">
                <span className="block text-sm font-semibold text-navy">Search</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="field mt-2"
                  placeholder="Name, company, email or service"
                />
              </label>
              <button
                type="button"
                onClick={() => loadLeads()}
                className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-md border border-line bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-teal hover:text-teal"
              >
                Apply filters
              </button>
            </div>
            <p className="mt-5 rounded-md bg-mint p-3 text-sm leading-6 text-navy" role="status">
              {message}
            </p>
          </aside>

          <div className="min-w-0 border border-line bg-white shadow-soft">
            <div className="flex flex-col gap-4 border-b border-line px-5 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold text-navy">Lead pipeline</h2>
                <p className="mt-1 text-sm text-slate">
                  {leads.length ? `${leads.length} visible lead${leads.length === 1 ? "" : "s"}` : "No leads loaded yet"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(totals).map(([status, count]) => (
                  <span key={status} className="rounded-md border border-line bg-cloud px-3 py-2 text-xs font-semibold text-navy">
                    {statusLabels[status as LeadStatus] || status}: {count}
                  </span>
                ))}
                <button
                  type="button"
                  onClick={exportCsv}
                  disabled={!leads.length}
                  className="rounded-md bg-navy px-4 py-2 text-xs font-semibold text-white hover:bg-teal disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Export CSV
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-[760px] w-full border-collapse text-left text-sm">
                <thead className="bg-cloud text-xs uppercase tracking-[0.08em] text-slate">
                  <tr>
                    <th className="border-b border-line px-5 py-3 font-semibold">Lead</th>
                    <th className="border-b border-line px-5 py-3 font-semibold">Service</th>
                    <th className="border-b border-line px-5 py-3 font-semibold">Timing</th>
                    <th className="border-b border-line px-5 py-3 font-semibold">Status</th>
                    <th className="border-b border-line px-5 py-3 font-semibold">Follow-up</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {leads.map((lead) => {
                    const draft = getFollowUpDraft(lead);

                    return (
                      <tr key={lead.id} className="align-top">
                        <td className="px-5 py-4">
                          <p className="font-semibold text-navy">{lead.name}</p>
                          <p className="mt-1 text-slate">{lead.organisation}</p>
                          <a className="mt-1 block font-semibold text-teal hover:text-navy" href={`mailto:${lead.email}`}>
                            {lead.email}
                          </a>
                          {lead.telephone ? <p className="mt-1 text-slate">{lead.telephone}</p> : null}
                          <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate">Received {formatDateTime(lead.createdAt)}</p>
                          <p className="mt-3 max-w-xl leading-6 text-slate">{lead.summary}</p>
                        </td>
                        <td className="px-5 py-4 text-slate">{lead.service}</td>
                        <td className="px-5 py-4 text-slate">
                          <p>{lead.timing}</p>
                          {lead.budget ? <p className="mt-1">Budget: {lead.budget}</p> : null}
                          <p className="mt-1">Prefers: {lead.preferredContact}</p>
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={lead.status}
                            onChange={(event) => updateStatus(lead.id, event.target.value as LeadStatus)}
                            className="field min-w-36"
                          >
                            {statuses.map((status) => (
                              <option key={status} value={status}>
                                {statusLabels[status]}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="min-w-[280px] px-5 py-4">
                          <div className="grid gap-3">
                            <label>
                              <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate">Follow-up status</span>
                              <select
                                value={draft.followUpStatus}
                                onChange={(event) =>
                                  updateFollowUpDraft(lead.id, { followUpStatus: event.target.value as LeadFollowUpStatus })
                                }
                                className="field mt-1 min-w-52"
                              >
                                {followUpStatuses.map((status) => (
                                  <option key={status} value={status}>
                                    {followUpLabels[status]}
                                  </option>
                                ))}
                              </select>
                            </label>
                            <label>
                              <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate">Next action date</span>
                              <input
                                type="date"
                                value={draft.nextActionDate}
                                onChange={(event) => updateFollowUpDraft(lead.id, { nextActionDate: event.target.value })}
                                className="field mt-1"
                              />
                            </label>
                            <label>
                              <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate">Internal notes</span>
                              <textarea
                                value={draft.internalNotes}
                                onChange={(event) => updateFollowUpDraft(lead.id, { internalNotes: event.target.value })}
                                rows={4}
                                className="field mt-1"
                                placeholder="Private notes, call outcome, next step..."
                              />
                            </label>
                            <button
                              type="button"
                              onClick={() => saveFollowUp(lead)}
                              className="inline-flex min-h-10 items-center justify-center rounded-md bg-teal px-4 py-2 text-xs font-semibold text-white hover:bg-[#066d70]"
                            >
                              Save follow-up
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {!leads.length ? (
                    <tr>
                      <td className="px-5 py-12 text-center text-slate" colSpan={5}>
                        Load leads with the admin token to review enquiries.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function csvCell(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

function buildFollowUpDrafts(leads: LeadRecord[]) {
  return leads.reduce<Record<string, FollowUpDraft>>((acc, lead) => {
    acc[lead.id] = toFollowUpDraft(lead);
    return acc;
  }, {});
}

function toFollowUpDraft(lead: LeadRecord): FollowUpDraft {
  return {
    internalNotes: lead.internalNotes || "",
    nextActionDate: lead.nextActionDate || "",
    followUpStatus: lead.followUpStatus || "none"
  };
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}
