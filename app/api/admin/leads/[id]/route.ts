import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { hasAdminAccess } from "@/lib/admin-auth";
import { leadFollowUpStatuses, leadStatuses, updateLead, type LeadUpdateInput } from "@/lib/leads";

const updateLeadSchema = z.object({
  status: z.enum(leadStatuses).optional(),
  internalNotes: z.string().max(5000, "Use shorter notes.").optional(),
  nextActionDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD.")
    .nullable()
    .optional()
    .or(z.literal("")),
  followUpStatus: z.enum(leadFollowUpStatuses).optional()
}).refine((value) => Object.values(value).some((field) => field !== undefined), {
  message: "Provide at least one lead update."
});

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!hasAdminAccess(request)) {
    return NextResponse.json({ ok: false, message: "Admin access is required." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = updateLeadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Choose valid lead update details." }, { status: 400 });
  }

  const { id } = await params;
  const updates: LeadUpdateInput = {};
  if (parsed.data.status !== undefined) updates.status = parsed.data.status;
  if (parsed.data.internalNotes !== undefined) updates.internalNotes = parsed.data.internalNotes;
  if (parsed.data.nextActionDate !== undefined) updates.nextActionDate = parsed.data.nextActionDate || null;
  if (parsed.data.followUpStatus !== undefined) updates.followUpStatus = parsed.data.followUpStatus;

  const lead = await updateLead(id, updates);

  if (!lead) {
    return NextResponse.json({ ok: false, message: "Lead not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, lead });
}
