import { CANVAS_OPTIONS } from "./canvases";

export type ProjectContextKind = "file" | "asset" | "timeSeries" | "event";

export type ProjectContextItem = {
  id: string;
  kind: ProjectContextKind;
  title: string;
  meta?: string;
};

export type LinkedCanvas = {
  id: string;
  name: string;
  /** When set, aligns with prototype canvas list */
  canvasOptionId?: string;
};

export type LinkedChart = {
  id: string;
  name: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  intendedOutcome: string;
  labels: string[];
  updatedAt: string;
  updatedBy: string;
  owner: string;
  ownerInitials: string;
  linkedCanvases: LinkedCanvas[];
  linkedCharts: LinkedChart[];
  contextItems: ProjectContextItem[];
};

export type CreateProjectInput = {
  name: string;
  description: string;
  intendedOutcome: string;
};

export function buildNewProject(input: CreateProjectInput): Project {
  return {
    id: `proj_${Date.now()}`,
    name: input.name.trim(),
    description: input.description.trim(),
    intendedOutcome: input.intendedOutcome.trim(),
    labels: [],
    updatedAt: "Just now",
    updatedBy: "me",
    owner: "Ryan Wood",
    ownerInitials: "RW",
    linkedCanvases: [],
    linkedCharts: [],
    contextItems: [],
  };
}

export function duplicateProject(p: Project): Project {
  const suffix = Date.now();
  return {
    ...p,
    id: `proj_${suffix}`,
    name: `${p.name} (copy)`,
    updatedAt: "Just now",
    updatedBy: "me",
    linkedCanvases: p.linkedCanvases.map((c, i) => ({
      ...c,
      id: `lc_${suffix}_${i}`,
    })),
    linkedCharts: p.linkedCharts.map((c, i) => ({
      ...c,
      id: `lch_${suffix}_${i}`,
    })),
    contextItems: p.contextItems.map((c, i) => ({
      ...c,
      id: `ctx_${suffix}_${i}`,
    })),
  };
}

const mainCanvas = CANVAS_OPTIONS[0]!;

export const SEED_PROJECTS: Project[] = [
  {
    id: "proj_seed_ops",
    name: "Field performance deep-dive",
    description:
      "Gather production signals, engineering documents, and time series to explain variance vs plan for the Valhall area.",
    intendedOutcome:
      "A concise report the subsurface and operations leads can share in the weekly review.",
    labels: ["Production", "Valhall"],
    updatedAt: "3 days ago",
    updatedBy: "me",
    owner: "Ryan Wood",
    ownerInitials: "RW",
    linkedCanvases: [
      { id: "lc_seed_1", name: mainCanvas.name, canvasOptionId: mainCanvas.id },
    ],
    linkedCharts: [{ id: "lch_seed_1", name: "Field production overview" }],
    contextItems: [
      {
        id: "ctx_seed_doc",
        kind: "file",
        title: "Monthly ops summary.pdf",
        meta: "Document",
      },
      {
        id: "ctx_seed_ts",
        kind: "timeSeries",
        title: "FT-000105",
        meta: "Flow · m³/h",
      },
      {
        id: "ctx_seed_asset",
        kind: "asset",
        title: "Well P-12",
        meta: "Asset",
      },
      {
        id: "ctx_seed_evt",
        kind: "event",
        title: "Compressor trip — Jan 12",
        meta: "Event",
      },
    ],
  },
  {
    id: "proj_seed_maintenance",
    name: "Maintenance backlog triage",
    description:
      "Correlate work orders, equipment hierarchy, and recent alarms to prioritize the next maintenance window.",
    intendedOutcome:
      "Ranked backlog list with rationale tied to reliability risk and production impact.",
    labels: ["Maintenance"],
    updatedAt: "2 weeks ago",
    updatedBy: "me",
    owner: "Ryan Wood",
    ownerInitials: "RW",
    linkedCanvases: [],
    linkedCharts: [],
    contextItems: [],
  },
];
