"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function TrafficTracker() {
  const pathname = usePathname();
  useEffect(() => {
    const externalReferrer = (() => {
      if (!document.referrer) return null;
      try { return new URL(document.referrer).origin === window.location.origin ? null : document.referrer; }
      catch { return null; }
    })();
    void fetch("/api/traffic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, search: window.location.search, referrer: externalReferrer }),
      keepalive: true,
    });
  }, [pathname]);
  return null;
}
