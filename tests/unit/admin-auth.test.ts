import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { hasAdminAccess } from "@/lib/admin-auth";

describe("admin lead access", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("requires the configured admin token", () => {
    vi.stubEnv("LEADS_ADMIN_TOKEN", "local-secret");
    const request = new NextRequest("http://127.0.0.1:3002/api/admin/leads", {
      headers: { "x-admin-token": "local-secret" }
    });

    expect(hasAdminAccess(request)).toBe(true);
  });

  it("rejects missing or different tokens", () => {
    vi.stubEnv("LEADS_ADMIN_TOKEN", "local-secret");
    const request = new NextRequest("http://127.0.0.1:3002/api/admin/leads", {
      headers: { "x-admin-token": "wrong-token" }
    });

    expect(hasAdminAccess(request)).toBe(false);
  });
});

