"use client";

import { useEffect, useRef } from "react";

type TurnstileRenderOptions = {
  sitekey: string;
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onSkyDiveTurnstileLoad?: () => void;
  }
}

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function TurnstileWidget({
  onVerify,
  onExpire,
  resetSignal
}: {
  onVerify: (token: string) => void;
  onExpire: () => void;
  resetSignal: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!siteKey || !containerRef.current) {
      return;
    }
    const activeSiteKey = siteKey;

    function renderWidget() {
      if (!window.turnstile || !containerRef.current || widgetIdRef.current) {
        return;
      }

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: activeSiteKey,
        callback: onVerify,
        "expired-callback": onExpire,
        "error-callback": onExpire
      });
    }

    if (window.turnstile) {
      renderWidget();
    } else {
      window.onSkyDiveTurnstileLoad = renderWidget;
      if (!document.querySelector('script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]')) {
        const script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onSkyDiveTurnstileLoad";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [onExpire, onVerify]);

  useEffect(() => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [resetSignal]);

  if (!siteKey) {
    return null;
  }

  return (
    <div className="mt-5">
      <div ref={containerRef} />
    </div>
  );
}
