import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "md" | "sm";

export function Button({
  className,
  variant = "secondary",
  size = "md",
  asChild = false,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      type={asChild ? undefined : type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm font-medium disabled:opacity-50",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        size === "md" && "h-11 px-4 text-sm",
        size === "sm" && "h-9 px-3 text-sm",
        variant === "primary" && "bg-accent text-accent-fg hover:bg-ink",
        variant === "secondary" && "border border-line bg-elevated text-ink hover:bg-surface",
        variant === "ghost" && "text-ink hover:bg-accent-soft",
        variant === "danger" && "bg-danger text-accent-fg",
        className,
      )}
      {...props}
    />
  );
}
