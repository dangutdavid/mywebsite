"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { services } from "@/content/site";
import { contactSchema, type ContactInput } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";
import { TurnstileWidget } from "@/components/turnstile-widget";

const timingOptions = ["As soon as practical", "Within 1-3 months", "Exploratory / not yet scheduled"];
const contactOptions = ["Email", "Telephone", "LinkedIn"];
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { consent: false, website: "" }
  });

  useEffect(() => {
    if (isDirty) {
      trackEvent("contact_form_start");
    }
  }, [isDirty]);

  const clearTurnstileToken = useCallback(() => {
    setTurnstileToken("");
  }, []);

  async function onSubmit(values: ContactInput) {
    setStatus("idle");
    trackEvent("contact_form_submit", {
      service: values.service,
      timing: values.timing,
      preferredContact: values.preferredContact
    });

    if (turnstileSiteKey && !turnstileToken) {
      setStatus("error");
      setMessage("Complete the spam check and try again.");
      trackEvent("contact_form_error", { reason: "turnstile_missing" });
      return;
    }

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, turnstileToken })
    });
    const data = (await response.json()) as { ok: boolean; message: string };
    if (response.ok && data.ok) {
      trackEvent("contact_form_success", { service: values.service });
      setStatus("success");
      setMessage(data.message);
      reset();
      setTurnstileToken("");
      setTurnstileResetSignal((value) => value + 1);
      return;
    }
    setStatus("error");
    setMessage(data.message || "The enquiry could not be submitted.");
    trackEvent("contact_form_error", { reason: response.status.toString() });
    setTurnstileToken("");
    setTurnstileResetSignal((value) => value + 1);
  }

  return (
    <form className="border border-line bg-white shadow-soft" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="border-b border-line bg-navy px-6 py-5 text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-mint">Project enquiry</p>
        <h2 className="mt-2 font-display text-2xl font-semibold">Tell us what needs to work better</h2>
      </div>
      <div className="p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input {...register("name")} autoComplete="name" className="field" />
        </Field>
        <Field label="Organisation" error={errors.organisation?.message}>
          <input {...register("organisation")} autoComplete="organization" className="field" />
        </Field>
        <Field label="Work email" error={errors.email?.message}>
          <input {...register("email")} type="email" autoComplete="email" className="field" />
        </Field>
        <Field label="Telephone (optional)" error={errors.telephone?.message}>
          <input {...register("telephone")} type="tel" autoComplete="tel" className="field" />
        </Field>
        <Field label="Service of interest" error={errors.service?.message}>
          <select
            {...register("service", {
              onChange: (event) => trackEvent("contact_form_service_select", { service: event.target.value })
            })}
            className="field"
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Desired timing" error={errors.timing?.message}>
          <select {...register("timing")} className="field">
            <option value="">Select timing</option>
            {timingOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>
        <Field label="Budget range (optional)" error={errors.budget?.message}>
          <input {...register("budget")} className="field" placeholder="Optional" />
        </Field>
        <Field label="Preferred contact method" error={errors.preferredContact?.message}>
          <select {...register("preferredContact")} className="field">
            <option value="">Select contact method</option>
            {contactOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Project summary" error={errors.summary?.message} className="mt-5">
        <textarea {...register("summary")} rows={6} className="field" />
      </Field>
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input {...register("website")} tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="mt-5 flex gap-3 text-sm leading-6 text-slate">
        <input type="checkbox" {...register("consent")} className="mt-1 h-5 w-5 rounded border-line text-teal focus:ring-teal" />
        <span>
          I consent to SkyDive using these details to respond to this enquiry. I understand this form
          is not for confidential source code, secrets or sensitive personal data.
        </span>
      </label>
      {errors.consent?.message ? <p className="mt-2 text-sm font-medium text-red-700">{errors.consent.message}</p> : null}
      <TurnstileWidget onVerify={setTurnstileToken} onExpire={clearTurnstileToken} resetSignal={turnstileResetSignal} />
      {status !== "idle" ? (
        <div className={status === "success" ? "mt-5 rounded-md bg-mint p-4 text-sm text-navy" : "mt-5 rounded-md bg-red-50 p-4 text-sm text-red-800"} role="status">
          {message}
        </div>
      ) : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex min-h-11 items-center rounded-md bg-teal px-5 py-3 text-sm font-semibold text-white hover:bg-[#066d70] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send enquiry"}
      </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
  className
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="block text-sm font-semibold text-navy">{label}</span>
      <span className="mt-2 block">{children}</span>
      {error ? <span className="mt-2 block text-sm font-medium text-red-700">{error}</span> : null}
    </label>
  );
}
