import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const fieldClass =
  "h-11 w-full rounded-sm border border-line bg-elevated px-3 text-sm text-ink placeholder:text-faint";

export function Field({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldClass, className)} {...props} />;
}

export function Area({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-48 w-full rounded-sm border border-line bg-elevated px-3 py-3 text-sm leading-relaxed text-ink placeholder:text-faint",
        className,
      )}
      {...props}
    />
  );
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(fieldClass, "pr-8", className)} {...props} />;
}

export function Label({ children, hint }: { children: string; hint?: string }) {
  return (
    <div className="block">
      <span className="mb-1 block text-sm font-medium text-ink">{children}</span>
      {hint ? <span className="mb-1 block text-sm text-muted">{hint}</span> : null}
    </div>
  );
}
