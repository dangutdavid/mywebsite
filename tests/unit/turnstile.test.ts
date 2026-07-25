import { afterEach, describe, expect, it, vi } from "vitest";
import { verifyTurnstileToken } from "@/lib/turnstile";
import type { NextRequest } from "next/server";

function requestWithIp(ip = "203.0.113.10") {
  return {
    headers: new Headers({ "x-forwarded-for": ip })
  } as NextRequest;
}

describe("turnstile verification", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("passes when Turnstile is not configured", async () => {
    await expect(verifyTurnstileToken(undefined, requestWithIp())).resolves.toMatchObject({
      ok: true,
      mode: "disabled"
    });
  });

  it("rejects missing tokens when configured", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");

    await expect(verifyTurnstileToken("", requestWithIp())).resolves.toMatchObject({
      ok: false,
      mode: "failed"
    });
  });

  it("verifies tokens with Cloudflare", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true })
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(verifyTurnstileToken("token", requestWithIp())).resolves.toMatchObject({
      ok: true,
      mode: "verified"
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      expect.objectContaining({ method: "POST", body: expect.any(FormData) })
    );
  });
});
