import { timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

export function hasAdminAccess(request: NextRequest) {
  const expected = process.env.LEADS_ADMIN_TOKEN?.trim();
  const provided = request.headers.get("x-admin-token")?.trim();

  if (!expected || !provided) {
    return false;
  }

  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(provided);

  if (expectedBuffer.length !== providedBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, providedBuffer);
}

