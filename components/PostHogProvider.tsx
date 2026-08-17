"use client";

import { useEffect, useRef } from "react";
import posthog from "posthog-js";
import { useConsent } from "./ConsentProvider";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const { ready, preferences } = useConsent();
  const started = useRef(false);

  useEffect(() => {
    if (!ready || !key) return;

    if (preferences.analytics) {
      if (!started.current) {
        posthog.init(key, {
          api_host: host,
          person_profiles: "identified_only",
          capture_pageview: true,
          capture_pageleave: true,
          persistence: "localStorage+cookie",
        });
        started.current = true;
      } else {
        posthog.opt_in_capturing();
      }
      return;
    }

    if (started.current) {
      posthog.opt_out_capturing();
    }
  }, [ready, preferences.analytics]);

  return children;
}
