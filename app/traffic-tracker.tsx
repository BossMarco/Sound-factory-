"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function TrafficTracker() {
  const pathname = usePathname();
  useEffect(() => { void fetch("/api/traffic", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path: pathname }), keepalive: true }); }, [pathname]);
  return null;
}
