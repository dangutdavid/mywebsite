import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { hasAdminAccess } from "@/lib/admin-auth";
import { leadStatuses, updateLeadStatus } from "@/lib/leads";

const updateLeadSchema = z.object({
  status: z.enum(leadStatuses)
});

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!hasAdminAccess(request)) {
    return NextResponse.json({ ok: false, message: "Admin access is required." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = updateLeadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Choose a valid lead status." }, { status: 400 });
  }

  const { id } = await params;
  const lead = await updateLeadStatus(id, parsed.data.status);

  if (!lead) {
    return NextResponse.json({ ok: false, message: "Lead not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, lead });
}

