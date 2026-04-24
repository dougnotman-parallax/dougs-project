import { useCallback, useId, useMemo, useState } from "react";
import { motion } from "motion/react";
import { IconArrowsMaximize, IconX } from "@tabler/icons-react";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardHeaderRight,
  CardTitle,
} from "@/components/ui/aura/card";
import { Button } from "@/components/ui/aura/button";
import { Separator } from "@/components/ui/aura/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/aura/dialog";
import { cn } from "@/lib/utils";
import { CANVAS_OPTIONS } from "../constants/canvases";
import type { AddChartToDashboardPayload, CitationDetail } from "../constants/chatResponseScenarios";
import {
  buildCitationPreviewDetails,
  CitationPreviewDetailsPanel,
} from "./CitationPreviewDetailsPanel";
import {
  ChartPreviewControls,
  defaultChartPreviewControlState,
  useDerivedChartPreviewProps,
  type ChartPreviewControlState,
} from "./ChartPreviewControls";
import { ProductionDetailsLineChart } from "./charts/ProductionDetailsLineChart";

const motionEase = [0.43, 0.13, 0.23, 0.96] as const;

export function InlineChartPreviewCard({
  citation,
  onClose,
  className,
  onAddChartToCanvas,
  onAddChartToDashboard,
}: {
  citation: CitationDetail;
  onClose: () => void;
  className?: string;
  onAddChartToCanvas?: (payload: { title: string }) => void;
  onAddChartToDashboard?: (payload: AddChartToDashboardPayload) => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDetailsOpen, setModalDetailsOpen] = useState(false);
  const [addToCanvasOpen, setAddToCanvasOpen] = useState(false);
  const [chartControls, setChartControls] = useState<ChartPreviewControlState>(defaultChartPreviewControlState);
  const chartProps = useDerivedChartPreviewProps(chartControls);
  const patchChartControls = useCallback((patch: Partial<ChartPreviewControlState>) => {
    setChartControls((prev) => ({ ...prev, ...patch }));
  }, []);
  const modalDetailsData = useMemo(() => buildCitationPreviewDetails(citation), [citation]);
  const modalDetailsPanelId = useId();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.3, ease: motionEase }}
      className={cn("w-full min-w-0", className)}
      role="region"
      aria-label={`Chart preview: ${citation.title}`}
    >
      <Card className="border border-border shadow-sm">
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="truncate pr-2 text-base" title={citation.title}>
            {citation.title}
          </CardTitle>
          <CardDescription className="text-xs leading-snug text-muted-foreground">
            Production and forecast series (same chart as Charts details).
          </CardDescription>
          <CardHeaderRight className="flex flex-row items-center gap-1">
            {onAddChartToCanvas || onAddChartToDashboard ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="shrink-0 text-foreground"
                aria-label="Add chart"
                onClick={() => setAddToCanvasOpen(true)}
              >
                <Plus className="size-4" strokeWidth={2} aria-hidden />
              </Button>
            ) : null}
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="shrink-0 text-foreground"
              aria-label="Expand chart preview"
              onClick={() => setModalOpen(true)}
            >
              <IconArrowsMaximize className="size-4" stroke={2} aria-hidden />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="shrink-0 text-foreground"
              aria-label="Close chart preview"
              onClick={onClose}
            >
              <IconX className="size-4" stroke={2} aria-hidden />
            </Button>
          </CardHeaderRight>
        </CardHeader>
        <CardContent className="bg-muted/20 px-2 py-3">
          <div className="h-[260px] w-full min-w-0 overflow-hidden rounded-md border border-border/60 bg-background">
            <ProductionDetailsLineChart {...chartProps} />
          </div>
        </CardContent>
      </Card>

      <Dialog open={addToCanvasOpen} onOpenChange={setAddToCanvasOpen}>
        <DialogContent className="sm:max-w-md" showCloseButton>
          <DialogHeader>
            <DialogTitle>Add chart</DialogTitle>
            <DialogDescription>Choose where to place this chart.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 py-2">
            {onAddChartToDashboard ? (
              <Button
                type="button"
                variant="outline"
                className="h-auto justify-start py-3 text-left font-medium"
                onClick={() => {
                  onAddChartToDashboard({ title: citation.title });
                  setAddToCanvasOpen(false);
                }}
              >
                Dashboard (Home)
              </Button>
            ) : null}
            {onAddChartToDashboard && onAddChartToCanvas ? (
              <>
                <div className="flex flex-col gap-1.5 pt-1">
                  <Separator />
                  <p className="text-xs font-medium text-muted-foreground">Canvas</p>
                </div>
              </>
            ) : null}
            {onAddChartToCanvas
              ? CANVAS_OPTIONS.map((c) => (
                  <Button
                    key={c.id}
                    type="button"
                    variant="outline"
                    className="h-auto justify-start py-3 text-left font-medium"
                    onClick={() => {
                      onAddChartToCanvas({ title: citation.title });
                      setAddToCanvasOpen(false);
                    }}
                  >
                    {c.name}
                  </Button>
                ))
              : null}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={modalOpen}
        onOpenChange={(open) => {
          setModalOpen(open);
          if (!open) setModalDetailsOpen(false);
        }}
      >
        <DialogContent
          showCloseButton
          className={cn(
            "fixed top-1/2 left-1/2 z-50 flex h-[min(88vh,720px)] max-h-[min(88vh,720px)] -translate-x-1/2 -translate-y-1/2 flex-col gap-0 border p-0 shadow-xl transition-[width,max-width] duration-200 ease-out",
            "inset-x-auto mb-0",
            modalDetailsOpen
              ? "w-[min(96vw,1540px)] max-w-[min(96vw,1540px)] sm:max-w-[min(96vw,1540px)]"
              : "w-[min(96vw,1200px)] max-w-[min(96vw,1200px)] sm:max-w-[min(96vw,1200px)]",
          )}
        >
          <div className="flex min-h-0 min-w-0 flex-1 flex-row overflow-hidden">
            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
              <DialogHeader className="shrink-0 border-b border-border px-5 pt-5 pb-3 pr-14">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <DialogTitle className="min-w-0 flex-1 truncate pr-1 text-left" title={citation.title}>
                    {citation.title}
                  </DialogTitle>
                  <Button
                    type="button"
                    variant={modalDetailsOpen ? "secondary" : "outline"}
                    size="sm"
                    className="shrink-0"
                    aria-expanded={modalDetailsOpen}
                    aria-controls={modalDetailsPanelId}
                    onClick={() => setModalDetailsOpen((v) => !v)}
                  >
                    {modalDetailsOpen ? "Hide details" : "Details"}
                  </Button>
                </div>
                <DialogDescription className="sr-only">
                  Expanded time series chart preview
                </DialogDescription>
              </DialogHeader>
              <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-muted/30">
                <ChartPreviewControls state={chartControls} onChange={patchChartControls} />
                <div className="min-h-0 flex-1 overflow-hidden px-3 pb-4 pt-2">
                  <div className="h-full min-h-[min(56vh,480px)] w-full">
                    <ProductionDetailsLineChart {...chartProps} />
                  </div>
                </div>
              </div>
            </div>
            <div
              id={modalDetailsPanelId}
              className={cn(
                "shrink-0 overflow-hidden border-l border-border bg-muted/20 transition-[width] duration-200 ease-out",
                modalDetailsOpen ? "w-[min(100%,360px)]" : "w-0 border-l-0",
              )}
              aria-hidden={!modalDetailsOpen}
            >
              <div className="h-full min-w-0 w-[min(100%,360px)] max-w-full overflow-y-auto overflow-x-hidden">
                {modalDetailsOpen ? <CitationPreviewDetailsPanel data={modalDetailsData} /> : null}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
