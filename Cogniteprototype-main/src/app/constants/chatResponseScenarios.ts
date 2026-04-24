import type { SelectedSource } from "../components/SourceDetailsPanel";
import { OIL_ANALYSIS_REPORT_FILE_TITLE, VALVE_PRESSURE_DISCHARGE_TITLE } from "./sourceDocuments";
import { isAnalyseActExpandedMessage } from "./suggestedPaths";

/** Citation badge glyph (design reference: Asset, File, Time series, Event, Sequence; clipboard for trip row). */
export type CitationBadgeKind =
  | "asset"
  | "file"
  | "timeSeries"
  | "event"
  | "sequence"
  | "clipboardCheck";

/** One slide in the inline citation popover */
export type CitationDetail = {
  title: string;
  source: string;
  retrieved: string;
  agentNote: string;
  /** Glyph for popover header (per item when navigating grouped “+N” sources) */
  kind?: CitationBadgeKind;
  /** Optional PDF URL for inline preview; defaults to remote sample PDF (Trinity sample) */
  pdfPreviewUrl?: string;
};

export type ChatResponseScenarioSimple = {
  kind: "simple";
  title: string;
  sectionHeading: string;
  body: string;
  inlineCitation: string;
  citations: CitationDetail[];
};

export type AnalyseActTimelineBadge = {
  kind: CitationBadgeKind;
  citations: CitationDetail[];
};

/** One sentence (or clause) with an optional citation badge immediately after it */
export type AnalyseActTimelineSentence = {
  text: string;
  tailBadge?: AnalyseActTimelineBadge;
};

export type AnalyseActTimelineRow = {
  id: string;
  headline: string;
  /** Each entry renders as inline text + optional Aura citation badge after that sentence */
  sentences: AnalyseActTimelineSentence[];
  /** Optional icon badge next to the timestamp line (e.g. 04:12 + time series) */
  headerBadge?: AnalyseActTimelineBadge;
};

export type AnalyseActFiveWhysRow = {
  id: string;
  question: string;
  answer: string;
  /** Aura citation badge immediately after the answer (same pattern as timeline) */
  answerTailBadge?: AnalyseActTimelineBadge;
};

/** One pill in the Sources strip (label + optional glyph matching inline citations) */
export type SourcesFooterPill = {
  label: string;
  /** Omit for count/overflow-only pills (e.g. "+4") */
  kind?: CitationBadgeKind;
  /** When set, the pill opens the source details panel */
  selectedSource?: SelectedSource;
};

/** One row for incident inline line/bar charts (Recharts) */
export type IncidentInlineChartTimeRow = {
  timeLabel: string;
  /** Primary series (e.g. observed vibration) */
  observed: number;
  /** Reference or threshold band center */
  reference: number;
};

export type IncidentInlineChartPieSlice = {
  name: string;
  value: number;
};

export type IncidentInlineChartData = {
  title: string;
  description: string;
  /** Shared x-axis data for line and bar views */
  timeSeries: IncidentInlineChartTimeRow[];
  /** Category breakdown for pie view */
  pieSlices: IncidentInlineChartPieSlice[];
};

/** Payload for pinning a chat chart to the Home dashboard (citation chart vs incident widget). */
export type AddChartToDashboardPayload = {
  title: string;
  /** When set, Home shows the incident inline chart; otherwise the production preview chart. */
  incidentChartData?: IncidentInlineChartData;
};

export type ChatResponseScenarioAnalyseAct = {
  kind: "analyseAct";
  title: string;
  incidentHeading: string;
  incidentBody: string;
  incidentBadgeLabel: string;
  incidentBadgeCitations: CitationDetail[];
  severityNote: string;
  timeHeading: string;
  timelineRows: AnalyseActTimelineRow[];
  fiveWhysHeading: string;
  fiveWhysRows: AnalyseActFiveWhysRow[];
  /** Pills shown in the Sources strip above the response footer */
  sourcesFooterPills: SourcesFooterPill[];
  /** Inline chart block (line / bar / pie) with scenario-backed demo data */
  incidentInlineChart?: IncidentInlineChartData;
};

export type ChatResponseScenario =
  | ChatResponseScenarioSimple
  | ChatResponseScenarioAnalyseAct;

const INCIDENT_CITATIONS: CitationDetail[] = [
  {
    title: "KGQ-34219 — Compressor C-19 Equipment Profile",
    source: "Knowledge Graph – Equipment Registry",
    retrieved:
      "Asset type, OEM specifications, operational envelope, protection thresholds.",
    agentNote: "Detection agent (01/04/2026 1:04pm)",
    kind: "asset",
  },
  {
    title: "LER_13FI2418N.Y-1728 — Event report",
    source: "Document store – LER repository",
    retrieved: "Failure narrative, operator notes, containment actions, linked tags.",
    agentNote: "Document agent (01/04/2026 1:05pm)",
    kind: "file",
  },
  {
    title: "VIB-C19-DE — Spectral snapshot",
    source: "Time series – Vibration analytics",
    retrieved: "Narrowband energy, envelope trends, baseline comparison (72h).",
    agentNote: "Signal agent (01/04/2026 1:06pm)",
    kind: "timeSeries",
  },
];

const MAINTENANCE_CITATIONS: CitationDetail[] = [
  {
    title: "WO-88421 — Pump P-401 PM deferral",
    source: "EAM – Work orders",
    retrieved: "PM due date, deferral reason, risk score, asset criticality.",
    agentNote: "Maintenance agent (01/04/2026 9:40am)",
    kind: "file",
  },
  {
    title: "Route R-VIB-12 — Execution history",
    source: "Inspection routes",
    retrieved: "Last completed, technician, findings, follow-up tasks.",
    agentNote: "Maintenance agent (01/04/2026 9:41am)",
    kind: "file",
  },
  {
    title: "Thermal survey Q1 — Heatmap rollup",
    source: "Condition monitoring",
    retrieved: "Hotspot clusters, threshold exceedances, imagery links.",
    agentNote: "Imaging agent (01/04/2026 9:42am)",
    kind: "timeSeries",
  },
  {
    title: "Spares forecast — Bearings kit",
    source: "Supply chain connector",
    retrieved: "On-hand qty, lead time, recommended min/max, substitutes.",
    agentNote: "Inventory agent (01/04/2026 9:43am)",
    kind: "file",
  },
];

const ANALYSE_ACT_PLUS4: CitationDetail[] = [
  {
    title: "C-19 train — Interlock and trip log",
    source: "DCS – Event historian",
    retrieved:
      "Narrative matches historian: compressor C-19 unloaded under peak train load; trip stack shows orderly shutdown with downstream headers isolated until balance restored.",
    agentNote: "Historian agent (03/31/2026 1:50pm)",
    kind: "event",
  },
  {
    title: "LER_C19-0312 — 5 Whys working notes",
    source: "Document store",
    retrieved:
      "Scope statement: investigation of the most critical recent event — sudden C-19 trip — with production loss and downstream deviation register attached.",
    agentNote: "Document agent (03/31/2026 1:51pm)",
    kind: "file",
  },
  {
    title: "Line7 — Production deviation ledger",
    source: "Operations data mart",
    retrieved:
      "Shift rollup: temporary throughput loss on Line7 and multiple downstream offsets triggered while the compressor train was offline.",
    agentNote: "Analytics agent (03/31/2026 1:52pm)",
    kind: "timeSeries",
  },
  {
    title: "RCA-C19 — Severity assessment",
    source: "Risk register",
    retrieved:
      "Assessment text: severity High — material system impact, extended recovery window, and safety exposure per RCA scoring criteria.",
    agentNote: "Risk agent (03/31/2026 1:53pm)",
    kind: "file",
  },
];

const CITE_TS_VIB_0412: CitationDetail[] = [
  {
    title: VALVE_PRESSURE_DISCHARGE_TITLE,
    source: "Time series – Chart",
    retrieved:
      "Chart for Valve_PRESSURE_DISCHARGE shows a clear value anomaly in the 04:12–04:14 window: the series departs from baseline, crosses the warning band, and stays below trip — matching the reconstruction’s ‘initial anomaly’ language (sharp increase, no auto mitigation because the shutdown threshold was not met).",
    agentNote: "Signal agent (03/31/2026 4:12am)",
    kind: "timeSeries",
  },
];

const CITE_TS_TEMP_0417: CitationDetail[] = [
  {
    title: "TEMP-C19-HEAD — Intercooler outlet",
    source: "Time series – Thermal",
    retrieved:
      "04:17: thermal load at compressor head climbs faster than prior baseline — pattern consistent with mechanical friction rising ahead of vibration trip.",
    agentNote: "Signal agent (03/31/2026 4:17am)",
  },
];

const CITE_SEQ_OPLOG_0423: CitationDetail[] = [
  {
    title: "Andromeda sequence tvd 9",
    source: "Sequence – Andromeda timeline",
    retrieved:
      "TVD-9 captures this acknowledgment as a sequence event: at 04:23 the operator logged the vibration anomaly as a likely transient spike from upstream load variation and did not request a hold or rate reduction — the reconstruction cites this same sequence step.",
    agentNote: "Operations agent (03/31/2026 4:23am)",
    kind: "sequence",
  },
];

const CITE_EVENT_TRIP_0431: CitationDetail[] = [
  {
    title: "E-STOP-C19 — Emergency shutdown record",
    source: "Event – Protection system",
    retrieved:
      "04:31 protection log: emergency shutdown on hard vibration limit — DE seismic channel exceeded interlock setpoint; trip sequence and valve states recorded.",
    agentNote: "Protection agent (03/31/2026 4:31am)",
  },
];

const CITE_WHY1_VIB: CitationDetail[] = [
  {
    title: "VIB-C19-DE — Emergency trip context",
    source: "Time series – Vibration",
    retrieved:
      "Evidence excerpt: peak DE amplitude exceeds emergency envelope immediately before recorded trip — matches narrative that shutdown was due to vibration spike.",
    agentNote: "Signal agent (RCA thread)",
  },
];

const CITE_WHY2_THERMAL: CitationDetail[] = [
  {
    title: "TEMP-C19-BRG — Bearing metal temperature",
    source: "Time series – Thermal",
    retrieved:
      "Bearing metal and lube outlet temperatures rise together — supports conclusion that vibration spike was preceded by inadequate lubrication to the journal.",
    agentNote: "Signal agent (RCA thread)",
  },
];

const CITE_WHY3_LUBE_ASSET: CitationDetail[] = [
  {
    title: "LUBE-C19-FEED — Lubrication feed line",
    source: "Knowledge Graph – Equipment",
    retrieved:
      "Equipment record: feed line to DE bearings; last borescope noted clean bore with no full obstruction — partial blockage in-line is consistent with restricted flow.",
    agentNote: "Equipment agent (RCA thread)",
  },
];

const CITE_WHY4_LAB: CitationDetail[] = [
  {
    title: OIL_ANALYSIS_REPORT_FILE_TITLE,
    source: "Document store",
    retrieved:
      "Report conclusion: sludge and particulate loading exceeded what the installed filter element is rated to handle under current duty — aligns with blockage formation upstream.",
    agentNote: "Lab agent (RCA thread)",
    kind: "file",
  },
];

const CITE_WHY5_EAM: CitationDetail[] = [
  {
    title: "WO-FILTER-C19 — Filter replacement history",
    source: "EAM – Work orders",
    retrieved:
      "Work-order notes: PM deferrals recorded twice; most recent replacement references substitute part number with lower particulate retention than OEM spec.",
    agentNote: "Maintenance agent (RCA thread)",
    kind: "file",
  },
];

const INCIDENT: ChatResponseScenarioSimple = {
  kind: "simple",
  title: "Root cause analysis: compressor C-19 failure",
  sectionHeading: "Incident summary",
  body:
    "I've reviewed sensor telemetry, maintenance logs, and the LER linked to compressor train C-19. The pattern is consistent with progressive bearing degradation, amplified by repeated short-interval starts during the upset window on 12 Mar. I recommend isolating DE/NDE vibration spectra, inspecting lube filtration and cooler performance, and aligning with operations before returning to full load.",
  inlineCitation: "Asset +3",
  citations: INCIDENT_CITATIONS,
};

/** 20 points: build-up in March then high-resolution 04:00–04:31 window (YTD / quarter filters slice in the UI) */
const ANALYSE_ACT_INLINE_CHART: IncidentInlineChartData = {
  title: "Likely data signals — compressor C-19",
  description:
    "Representative DE vibration and reference band before trip; pie shows estimated contribution to failure mode (illustrative).",
  timeSeries: [
    ...Array.from({ length: 11 }, (_, i) => {
      const d = i + 1;
      return {
        timeLabel: `3/${String(d).padStart(2, "0")}`,
        observed: Math.min(5.2, 1.35 + d * 0.12 + (d % 4) * 0.08 + Math.sin(d / 2) * 0.2),
        reference: 2.0,
      };
    }),
    { timeLabel: "04:00", observed: 1.8, reference: 2.0 },
    { timeLabel: "04:05", observed: 2.0, reference: 2.0 },
    { timeLabel: "04:10", observed: 2.4, reference: 2.0 },
    { timeLabel: "04:12", observed: 3.6, reference: 2.0 },
    { timeLabel: "04:15", observed: 4.2, reference: 2.0 },
    { timeLabel: "04:17", observed: 5.1, reference: 2.0 },
    { timeLabel: "04:23", observed: 6.8, reference: 2.0 },
    { timeLabel: "04:28", observed: 8.4, reference: 2.0 },
    { timeLabel: "04:31", observed: 11.2, reference: 2.0 },
  ],
  pieSlices: [
    { name: "Bearing / vibration", value: 32 },
    { name: "Thermal / friction", value: 24 },
    { name: "Lubrication flow", value: 20 },
    { name: "Filtration / particulate", value: 16 },
    { name: "Process / operations", value: 8 },
  ],
};

const ANALYSE_ACT: ChatResponseScenarioAnalyseAct = {
  kind: "analyseAct",
  title: "Root cause analysis: compressor C-19 failure",
  incidentHeading: "Incident summary",
  incidentBody:
    "The Cognite AI assistant has completed a full 5 Whys investigation of the most critical recent incident: the sudden shutdown of compressor C-19 during peak operational load. This event resulted in a temporary production loss and triggered multiple downstream process deviations.",
  incidentBadgeLabel: "+4",
  incidentBadgeCitations: ANALYSE_ACT_PLUS4,
  severityNote:
    "Severity was classified as High due to system impact, recovery time, and safety exposure.",
  incidentInlineChart: ANALYSE_ACT_INLINE_CHART,
  timeHeading: "Time reconstruction",
  timelineRows: [
    {
      id: "t0412",
      headline: "04:12 — initial anomaly detected",
      headerBadge: { kind: "timeSeries", citations: CITE_TS_VIB_0412 },
      sentences: [
        {
          text: "The system registered a sharp increase in vibration amplitude.",
          tailBadge: { kind: "timeSeries", citations: CITE_TS_VIB_0412 },
        },
        {
          text: "No automated mitigation was triggered because the value crossed the warning threshold but not the shutdown threshold.",
          tailBadge: { kind: "timeSeries", citations: CITE_TS_VIB_0412 },
        },
      ],
    },
    {
      id: "t0417",
      headline: "04:17 — temperature deviation observed",
      sentences: [
        {
          text: "Thermal load increased around the compressor head, indicating mechanical friction rising faster than expected.",
          tailBadge: { kind: "timeSeries", citations: CITE_TS_TEMP_0417 },
        },
      ],
    },
    {
      id: "t0423",
      headline: "04:23 — operator acknowledgment",
      sentences: [
        {
          text: "Operator noted the anomaly but assumed it was a transient spike due to upstream load variation.",
          tailBadge: { kind: "sequence", citations: CITE_SEQ_OPLOG_0423 },
        },
      ],
    },
    {
      id: "t0431",
      headline: "04:31 — failure event",
      sentences: [
        {
          text: "Compressor C-19 initiated an emergency shutdown due to exceeding the hard vibration limit.",
          tailBadge: { kind: "event", citations: CITE_EVENT_TRIP_0431 },
        },
      ],
    },
  ],
  fiveWhysHeading: "5 Whys root cause path",
  fiveWhysRows: [
    {
      id: "w1",
      question: "Why 1: Why did the compressor shut down?",
      answer: "Because vibration levels spiked beyond the emergency threshold.",
      answerTailBadge: { kind: "timeSeries", citations: CITE_WHY1_VIB },
    },
    {
      id: "w2",
      question: "Why 2: Why did vibration levels spike?",
      answer: "Bearing temperature rose rapidly, suggesting lubrication flow had become restricted.",
      answerTailBadge: { kind: "timeSeries", citations: CITE_WHY2_THERMAL },
    },
    {
      id: "w3",
      question: "Why 3: Why was lubrication flow restricted?",
      answer: "A partial blockage developed in the lubrication feed line.",
      answerTailBadge: { kind: "asset", citations: CITE_WHY3_LUBE_ASSET },
    },
    {
      id: "w4",
      question: "Why 4: Why did a blockage form?",
      answer:
        "Sludge and particulate accumulation exceeded the filtration system's handling capacity.",
      answerTailBadge: { kind: "file", citations: CITE_WHY4_LAB },
    },
    {
      id: "w5",
      question: "Why 5: Why did sludge accumulation exceed capacity?",
      answer:
        "Scheduled filter replacement was deferred twice and the last replacement used a non-spec filter with lower particulate retention.",
      answerTailBadge: { kind: "file", citations: CITE_WHY5_EAM },
    },
  ],
  sourcesFooterPills: [
    {
      label: "21PT1019",
      kind: "timeSeries",
      selectedSource: {
        label: "21PT1019",
        kind: "other",
        displayTitle: "21PT1019",
      },
    },
    {
      label: "LER_13FI2418N.Y-1728.pdf",
      kind: "file",
      selectedSource: {
        label: "LER_13FI2418N.Y-1728.pdf",
        kind: "file",
        displayTitle: "LER_13FI2418N.Y-1728.pdf",
      },
    },
    {
      label: "120_oaoXR",
      kind: "asset",
      selectedSource: {
        label: "120_oaoXR — Context bundle",
        kind: "asset",
        displayTitle: "120_oaoXR — Context bundle",
      },
    },
    {
      label: "ORB_1901.pdf",
      kind: "file",
      selectedSource: {
        label: "ORB_1901.pdf",
        kind: "file",
        displayTitle: "ORB_1901.pdf",
      },
    },
    { label: "4" },
  ],
};

const MAINTENANCE: ChatResponseScenarioSimple = {
  kind: "simple",
  title: "Maintenance optimization outlook",
  sectionHeading: "Key findings",
  body:
    "Work-order data and MTTR trends suggest rotating-asset inspections are clustered too late in the PM cycle. Bringing vibration routes forward by two weeks on pumps rated critical, and consolidating lubrication tasks with thermal imaging, should reduce unplanned stops without adding headcount.",
  inlineCitation: "Work orders +4",
  citations: MAINTENANCE_CITATIONS,
};

/** Default agent reply (no scenario): aligns with footer source pills */
export const DEFAULT_RESPONSE_CITATIONS: CitationDetail[] = [
  {
    title: "22PT1019-MF_22_013 — Field device",
    source: "CDF – Time series & alarms",
    retrieved: "Vibration trend, temperature deltas, alarm acknowledgements.",
    agentNote: "Atlas agent (01/04/2026 11:02am)",
    kind: "timeSeries",
  },
  {
    title: "LER_13FI2418N.Y-1728.pdf",
    source: "Document store",
    retrieved: "Embedded tables, revision history, referenced tags.",
    agentNote: "Document agent (01/04/2026 11:03am)",
    kind: "file",
  },
  {
    title: "120_oaoXR — Context bundle",
    source: "Knowledge graph – Related entities",
    retrieved: "Linked assets, events, and annotations used for grounding.",
    agentNote: "Context agent (01/04/2026 11:04am)",
    kind: "asset",
  },
];

const DEFAULT_BODY =
  "According to the time series, vibration amplitude has been rising steadily since 03:00. The motor temperature also increased by 8°C over the same period. Would you like me to add this to the canvas?";

function bodyForCopyAnalyseAct(s: ChatResponseScenarioAnalyseAct): string {
  const timelineBlock = s.timelineRows
    .map((row) => {
      const body = row.sentences.map((sent) => sent.text).join(" ");
      return `${row.headline}\n${body}`;
    })
    .join("\n\n");
  const whysBlock = s.fiveWhysRows
    .map((row) => `${row.question}\n${row.answer}`)
    .join("\n\n");
  return [
    s.title,
    "",
    s.incidentHeading,
    s.incidentBody,
    "",
    s.severityNote,
    ...(s.incidentInlineChart
      ? [
          "",
          s.incidentInlineChart.title,
          s.incidentInlineChart.description,
        ]
      : []),
    "",
    s.timeHeading,
    timelineBlock,
    "",
    s.fiveWhysHeading,
    whysBlock,
    "",
    "Sources",
    s.sourcesFooterPills.map((p) => p.label).join(", "),
  ].join("\n");
}

export function resolveChatResponseScenario(userMessage: string): {
  scenario: ChatResponseScenario | null;
  bodyForCopy: string;
  citations: CitationDetail[];
} {
  const m = userMessage.trim().toLowerCase();
  const trimmed = userMessage.trim();

  if (isAnalyseActExpandedMessage(trimmed)) {
    return {
      scenario: ANALYSE_ACT,
      bodyForCopy: bodyForCopyAnalyseAct(ANALYSE_ACT),
      citations: DEFAULT_RESPONSE_CITATIONS,
    };
  }

  if (m.includes("incident")) {
    return {
      scenario: INCIDENT,
      bodyForCopy: INCIDENT.body,
      citations: INCIDENT.citations,
    };
  }

  if (m.includes("optimize") && m.includes("maintenance")) {
    return {
      scenario: MAINTENANCE,
      bodyForCopy: MAINTENANCE.body,
      citations: MAINTENANCE.citations,
    };
  }

  return {
    scenario: null,
    bodyForCopy: DEFAULT_BODY,
    citations: DEFAULT_RESPONSE_CITATIONS,
  };
}
