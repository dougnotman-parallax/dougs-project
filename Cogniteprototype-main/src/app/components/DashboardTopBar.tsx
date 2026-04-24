import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "./ui/utils";

const dashboardViewTriggerClass = cn(
  "h-7 w-auto min-w-0 gap-2 border-0 bg-transparent px-2 shadow-none",
  "font-sans font-medium text-[14px] leading-[18px] text-[#111213]",
  "hover:bg-[#f9fafa] focus:ring-0 focus-visible:ring-0 data-[placeholder]:text-[#111213]",
  "[&>svg]:size-4 [&>svg]:text-[#111213] [&>svg]:opacity-100",
);

const dateTriggerClass = cn(
  "inline-flex h-7 items-center gap-2 rounded-[4px] px-2",
  "font-sans font-medium text-[14px] leading-[18px] text-[#111213]",
  "hover:bg-[#f9fafa] outline-none focus-visible:ring-2 focus-visible:ring-[#4c9aff] focus-visible:ring-offset-1",
);

function Heading() {
  return (
    <div
      className="content-stretch flex min-w-0 flex-[1_0_0] flex-col gap-[8px] items-start min-h-px relative"
      data-name="Heading"
    >
      <div
        className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full min-w-0"
        data-name="Dashboard title"
      >
        <p
          className="min-w-0 flex-[1_0_0] font-sans font-semibold leading-[20px] not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[-0.176px] truncate"
          style={{ fontFeatureSettings: "'cv05'" }}
        >
          Dashboard settings
        </p>
      </div>
    </div>
  );
}

function DashboardViewSelect() {
  return (
    <Select defaultValue="default">
      <SelectTrigger className={dashboardViewTriggerClass} aria-label="Dashboard options">
        <SelectValue placeholder="Dashboard options" />
      </SelectTrigger>
      <SelectContent align="end" className="min-w-[10rem]">
        <SelectItem value="default">Dashboard options</SelectItem>
        <SelectItem value="operations">Operations</SelectItem>
        <SelectItem value="maintenance">Maintenance</SelectItem>
        <SelectItem value="executive">Executive summary</SelectItem>
      </SelectContent>
    </Select>
  );
}

function DateRangeControl() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>(() => new Date(2024, 11, 17));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" className={dateTriggerClass} aria-label="Select date">
          <span className="whitespace-nowrap tabular-nums">{format(date, "MM/dd/yyyy")}</span>
          <CalendarIcon className="size-4 shrink-0 text-[#111213]" strokeWidth={2} aria-hidden />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            if (d) {
              setDate(d);
              setOpen(false);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

/** Dashboard view + time range; used in page when agent closed and in chat top bar when agent open */
export function DashboardToolbarUtilities() {
  return (
    <div
      className="content-stretch flex shrink-0 items-center gap-6"
      data-name="Dashboard utilities"
    >
      <DashboardViewSelect />
      <DateRangeControl />
    </div>
  );
}

function TopSection() {
  return (
    <div
      className="content-stretch flex w-full min-h-[36px] items-center justify-between gap-6"
      data-name="Top section"
    >
      <Heading />
      <DashboardToolbarUtilities />
    </div>
  );
}

export function DashboardTopBar() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Contents">
      <div
        aria-hidden="true"
        className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none"
      />
      <div className="content-stretch flex flex-col items-start px-[20px] py-[12px] relative w-full">
        <TopSection />
      </div>
    </div>
  );
}
