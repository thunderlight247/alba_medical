"use client";

import { useEffect, useState } from "react";
import { SCHEDULE } from "@/lib/site";

export type OpenStatus = { day: number; open: boolean; label: string };

/** Clinic status computed in Ghana time (Africa/Accra). Null on first render to avoid hydration mismatch. */
export function useOpenStatus(): OpenStatus | null {
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    const compute = () => {
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Accra" }));
      const day = now.getDay();
      const hour = now.getHours() + now.getMinutes() / 60;
      const today = SCHEDULE[day];
      const open = !!today && hour >= today[0] && hour < today[1];
      const label = !today
        ? "Closed today (Sunday)"
        : open
          ? `Open now, until ${today[1] > 12 ? today[1] - 12 : today[1]}:00 PM`
          : hour < today[0]
            ? "Opens today at 8:00 AM"
            : "Closed for today";
      setStatus({ day, open, label });
    };
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, []);

  return status;
}
