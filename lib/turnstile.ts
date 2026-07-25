import type { NextRequest } from "next/server";

type TurnstileResponse = {
  success?: boolean;
  "error-codes"?: string[];
};

export type TurnstileResult = {
  ok: boolean;
  mode: "disabled" | "verified" | "failed";
  message: string;
};

export function isTurnstileConfigured() {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstileToken(token: string | undefined, request: NextRequest): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return {
      ok: true,
      mode: "disabled",
      message: "Turnstile is not configured."
    };
  }

  if (!token) {
    return {
      ok: false,
      mode: "failed",
      message: "Complete the spam check and try again."
    };
  }

  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);

  const remoteIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (remoteIp) {
    formData.append("remoteip", remoteIp);
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData
  });
  const data = (await response.json().catch(() => ({}))) as TurnstileResponse;

  if (!response.ok || !data.success) {
    console.warn("Turnstile verification failed", {
      status: response.status,
      errors: data["error-codes"] || []
    });
    return {
      ok: false,
      mode: "failed",
      message: "Spam verification failed. Refresh the form and try again."
    };
  }

  return {
    ok: true,
    mode: "verified",
    message: "Turnstile verification passed."
  };
}
