"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

/** Live local time in Shenzhen. Renders a stable placeholder until mounted. */
export function LocalTime({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: site.timezone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      <span className="tabular-nums">{time ?? "--:--"}</span> GMT+8
    </span>
  );
}
