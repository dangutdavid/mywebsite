import { NextResponse, type NextRequest } from "next/server";
import { contactSchema, checkRateLimit } from "@/lib/contact";
import { sendClientConfirmationEmail, sendContactEmail } from "@/lib/email";
import { saveLead } from "@/lib/leads";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ ok: false, message: "Too many submissions. Try again shortly." }, { status: 429 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Check the form and try again.",
        errors: parsed.error.flatten().fieldErrors
      },
      { status: 400 }
    );
  }

  try {
    const turnstileResult = await verifyTurnstileToken(parsed.data.turnstileToken, request);
    if (!turnstileResult.ok) {
      return NextResponse.json({ ok: false, message: turnstileResult.message }, { status: 403 });
    }

    const leadResult = await saveLead(parsed.data, request);
    const emailResult = await sendContactEmail(parsed.data);
    const confirmationResult = await sendClientConfirmationEmail(parsed.data);

    if (!emailResult.ok) {
      console.error("Lead notification failed", {
        message: emailResult.message,
        leadId: leadResult.id,
        leadMode: leadResult.mode
      });
    }

    if (!confirmationResult.ok) {
      console.error("Client confirmation email failed", {
        message: confirmationResult.message,
        leadId: leadResult.id,
        leadMode: leadResult.mode
      });
    }

    return NextResponse.json({
      ok: true,
      message:
        leadResult.mode === "database"
          ? "Thank you. Your enquiry has been received and saved."
          : emailResult.message,
      mode: emailResult.mode,
      emailSent: emailResult.ok,
      confirmationSent: confirmationResult.ok,
      turnstileMode: turnstileResult.mode,
      leadId: leadResult.id,
      leadMode: leadResult.mode
    });
  } catch (error) {
    console.error("Lead capture failed", error);
    return NextResponse.json(
      { ok: false, message: "The enquiry could not be saved. Please try again shortly." },
      { status: 500 }
    );
  }
}
