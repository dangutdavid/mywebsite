import { NextResponse, type NextRequest } from "next/server";
import { hasAdminAccess } from "@/lib/admin-auth";
import { isDatabaseConfigured } from "@/lib/database";
import { leadStatuses, listLeads } from "@/lib/leads";

export async function GET(request: NextRequest) {
  if (!hasAdminAccess(request)) {
    return NextResponse.json({ ok: false, message: "Admin access is required." }, { status: 401 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: false, message: "Lead database is not configured." }, { status: 503 });
  }

  const params = request.nextUrl.searchParams;
  const status = params.get("status") || undefined;
  const query = params.get("query")?.trim() || undefined;
  const limit = Number(params.get("limit") || 100);

  if (status && !leadStatuses.includes(status as never)) {
    return NextResponse.json({ ok: false, message: "Unknown lead status." }, { status: 400 });
  }

  const leads = await listLeads({ status, query, limit });

  return NextResponse.json({ ok: true, leads, statuses: leadStatuses });
}

