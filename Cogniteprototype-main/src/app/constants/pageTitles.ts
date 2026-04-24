/** Labels aligned with sidebar `navItems` in App.tsx */
export const PAGE_TAB_LABELS: Record<string, string> = {
  home: "Dashboard",
  projects: "Projects",
  search: "Search",
  canvas: "Canvas",
  charts: "Charts",
  "custom-apps": "Custom apps",
  "agent-library": "Agent library",
};

export function getPageTabLabel(tabId: string): string {
  return PAGE_TAB_LABELS[tabId] ?? "Dashboard";
}
