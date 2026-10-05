import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function ChartFrame({ className, children }: { className?: string; children: ReactNode }) {
  const mounted = useMounted();
  return <div className={cn("h-72 w-full min-w-0", className)}>{mounted ? children : null}</div>;
}

export const tooltipStyle = {
  background: "var(--color-elevated)",
  border: "1px solid var(--color-line)",
  borderRadius: 8,
  color: "var(--color-ink)",
  fontSize: 13,
};
