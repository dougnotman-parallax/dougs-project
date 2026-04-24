import type { CitationBadgeKind, CitationDetail } from "../constants/chatResponseScenarios";
import type { SelectedSource } from "./SourceDetailsPanel";

/** Maps inline citation metadata to the source details panel selection */
export function citationToSelectedSource(
  citation: CitationDetail,
  iconKind: CitationBadgeKind,
): SelectedSource {
  const kind = citation.kind ?? iconKind;
  const panelKind: SelectedSource["kind"] =
    kind === "asset" ? "asset" : kind === "file" ? "file" : "other";
  return {
    label: citation.title,
    kind: panelKind,
    displayTitle: citation.title,
  };
}
