/** Pre-suggested paths shown on the dashboard welcome and in new-conversation agent state */
export const DASHBOARD_SUGGESTED_PATHS = [
  "Incident investigation",
  "Analyse and act",
  "Optimize maintenance",
] as const;

export type DashboardSuggestedPath = (typeof DASHBOARD_SUGGESTED_PATHS)[number];

/** Inline tag in the expanded “Analyse and act” user message (matches design: timeline # 21PT1019 reconstruction) */
export const ANALYSE_ACT_TIMELINE_TAG = "# 21PT1019";

/**
 * Canonical text sent when the user chooses “Analyse and act” (dashboard or new-chat chips).
 * Includes the asset tag in the timeline sentence; ChatResponse renders the tag as a teal inline badge.
 */
export const ANALYSE_ACT_EXPANDED_TEXT =
  "Perform a comprehensive root cause analysis on the most critical recent incident using the 5 Whys methodology. " +
  `Include timeline ${ANALYSE_ACT_TIMELINE_TAG} reconstruction, failure mode analysis, and actionable recommendations to prevent recurrence.`;

/**
 * Strict: user message must match the expanded prompt exactly (trim only). No fingerprint or whitespace normalization.
 */
export function isAnalyseActExpandedMessage(message: string): boolean {
  return message.trim() === ANALYSE_ACT_EXPANDED_TEXT.trim();
}

/**
 * Dashboard / new-chat chips send a short label; “Analyse and act” expands to the full prompt
 * (see `ANALYSE_ACT_EXPANDED_TEXT`). Wired from `ChatPrompt` via `onSendSuggestion` →
 * `handleSendFromSuggestion` in `App.tsx`.
 */
export function expandDashboardSuggestion(label: string): string {
  const t = label.trim();
  if (t === "Analyse and act") {
    return ANALYSE_ACT_EXPANDED_TEXT;
  }
  return label;
}
