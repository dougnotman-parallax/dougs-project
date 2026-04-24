import type { ReactNode } from "react";
import {
  IconArrowsLeftRight,
  IconClipboard,
  IconIdBadge,
  IconTag,
} from "@tabler/icons-react";
import { CalendarClock } from "lucide-react";
import { Badge } from "@/components/ui/aura/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/aura/card";
import { Separator } from "@/components/ui/aura/separator";
import type { CitationDetail } from "../constants/chatResponseScenarios";

export type CitationPreviewDetailsModel = {
  displayName: string;
  description: string;
  tags: { label: string; variant: "sky" | "nordic" }[];
  aliases: string[];
  calendarMonth: string;
  calendarDay: string;
  startTimeLabel: string;
  endTimeLabel: string;
};

/** Derives prototype “industrial” metadata for the details rail from citation fields. */
export function buildCitationPreviewDetails(citation: CitationDetail): CitationPreviewDetailsModel {
  const name = citation.title.trim() || "—";
  const rawDesc = (citation.retrieved?.trim() || citation.source?.trim() || citation.agentNote?.trim() || "—")
    .split(/\s+/)
    .slice(0, 12)
    .join(" ");
  const description = rawDesc.length > 0 ? rawDesc.toUpperCase() : "—";

  const digits = citation.source.replace(/\D/g, "");
  const aliases = [name, digits.slice(0, 6) || "681760", digits.slice(6, 11) || digits.slice(0, 5) || "96160"].filter(
    (a, i, arr) => a && arr.indexOf(a) === i,
  );

  return {
    displayName: name,
    description,
    tags: [
      { label: "ExampleTag1", variant: "sky" },
      { label: "ExampleTag2", variant: "nordic" },
    ],
    aliases: aliases.length ? aliases : [name],
    calendarMonth: "Jun",
    calendarDay: "06",
    startTimeLabel: "06/01/2016 8:00 AM",
    endTimeLabel: "06/30/2016 1:00 AM",
  };
}

function DetailRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 max-w-full gap-3 border-b border-border/60 py-3 last:border-b-0">
      <span className="mt-0.5 shrink-0 text-muted-foreground [&_svg]:size-[18px]" aria-hidden>
        {icon}
      </span>
      <div className="flex min-w-0 max-w-full flex-1 flex-col gap-1 sm:flex-row sm:items-start sm:gap-4">
        <span className="w-28 shrink-0 text-sm font-medium text-muted-foreground">{label}</span>
        <div className="min-w-0 max-w-full flex-1 overflow-hidden text-sm leading-snug text-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}

export function CitationPreviewDetailsPanel({ data }: { data: CitationPreviewDetailsModel }) {
  return (
    <div className="flex min-w-0 max-w-full flex-col gap-4 bg-muted/30 p-4">
      <Card className="min-w-0 max-w-full overflow-hidden border border-border shadow-sm">
        <CardHeader className="min-w-0 border-b border-border px-4 pb-3 pt-4">
          <CardTitle className="truncate text-base font-semibold tracking-tight">Details</CardTitle>
        </CardHeader>
        <CardContent className="min-w-0 max-w-full overflow-x-hidden px-4 pb-4 pt-1">
          <DetailRow icon={<IconIdBadge stroke={1.5} />} label="Name">
            <span className="block min-w-0 max-w-full truncate" title={data.displayName}>
              {data.displayName}
            </span>
          </DetailRow>
          <DetailRow icon={<IconClipboard stroke={1.5} />} label="Description">
            <p className="min-w-0 max-w-full break-words [overflow-wrap:anywhere]">{data.description}</p>
          </DetailRow>
          <DetailRow icon={<IconTag stroke={1.5} />} label="Tags">
            <div className="flex min-w-0 max-w-full flex-wrap gap-2">
              {data.tags.map((t) => (
                <Badge
                  key={t.label}
                  variant={t.variant}
                  className="!shrink max-w-full min-w-0 truncate px-2 py-0.5 text-xs font-medium"
                  title={t.label}
                >
                  {t.label}
                </Badge>
              ))}
            </div>
          </DetailRow>
          <DetailRow icon={<IconArrowsLeftRight stroke={1.5} />} label="Aliases">
            <div className="flex min-w-0 max-w-full flex-wrap gap-2">
              {data.aliases.map((a) => (
                <Badge
                  key={a}
                  variant="gray"
                  className="!shrink max-w-full min-w-0 truncate px-2 py-0.5 text-xs font-medium"
                  title={a}
                >
                  {a}
                </Badge>
              ))}
            </div>
          </DetailRow>
        </CardContent>
      </Card>

      <Card className="min-w-0 max-w-full overflow-hidden border border-border shadow-sm">
        <CardContent className="flex min-w-0 max-w-full gap-4 overflow-x-hidden px-4 py-4">
          <div
            className="flex h-[4.5rem] w-[4.5rem] shrink-0 flex-col items-center justify-center rounded-md border border-border bg-background shadow-sm"
            aria-hidden
          >
            <span className="text-[10px] font-semibold uppercase leading-none tracking-wide text-muted-foreground">
              {data.calendarMonth}
            </span>
            <span className="mt-1 text-2xl font-bold leading-none tabular-nums text-foreground">{data.calendarDay}</span>
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-3">
            <div className="flex items-start gap-2">
              <CalendarClock className="mt-0.5 size-[18px] shrink-0 text-muted-foreground" strokeWidth={1.5} aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground">Start time</p>
                <p className="text-sm text-foreground">{data.startTimeLabel}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-start gap-2">
              <CalendarClock className="mt-0.5 size-[18px] shrink-0 text-muted-foreground" strokeWidth={1.5} aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground">Scheduled end time</p>
                <p className="text-sm text-foreground">{data.endTimeLabel}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
