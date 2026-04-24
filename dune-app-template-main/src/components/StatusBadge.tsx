import type { ComponentType } from "react";
import { CircleAlert, CircleCheck, LoaderCircle, OctagonAlert, Trash2 } from "lucide-react";

type StatusBadgeTone = "neutral" | "success" | "warning" | "error" | "undefined";

type StatusBadgeProps = {
  label: string;
  tone: StatusBadgeTone;
  filled?: boolean;
  spinning?: boolean;
};

const toneStyles: Record<
  StatusBadgeTone,
  { text: string; border: string; bg: string; icon: string; iconNode: ComponentType<{ className?: string }> }
> = {
  neutral: {
    text: "text-indigo-700",
    border: "border-indigo-200",
    bg: "bg-indigo-100/70",
    icon: "text-indigo-700",
    iconNode: LoaderCircle,
  },
  success: {
    text: "text-emerald-700",
    border: "border-emerald-200",
    bg: "bg-emerald-100/80",
    icon: "text-emerald-700",
    iconNode: CircleCheck,
  },
  warning: {
    text: "text-amber-700",
    border: "border-amber-200",
    bg: "bg-amber-100/80",
    icon: "text-amber-700",
    iconNode: OctagonAlert,
  },
  error: {
    text: "text-rose-700",
    border: "border-rose-200",
    bg: "bg-rose-100/80",
    icon: "text-rose-700",
    iconNode: CircleAlert,
  },
  undefined: {
    text: "text-slate-600",
    border: "border-slate-300",
    bg: "bg-slate-200/80",
    icon: "text-slate-600",
    iconNode: Trash2,
  },
};

export const StatusBadge = ({ label, tone, filled = false, spinning = false }: StatusBadgeProps) => {
  const style = toneStyles[tone];
  const Icon = style.iconNode;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium ${
        filled ? `${style.bg} ${style.border} ${style.text}` : `bg-white ${style.border} ${style.text}`
      }`}
    >
      <Icon className={`h-3.5 w-3.5 ${style.icon} ${spinning ? "animate-spin" : ""}`} />
      <span>{label}</span>
    </span>
  );
};
