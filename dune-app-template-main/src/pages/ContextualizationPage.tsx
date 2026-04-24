import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Container, HStack, Textarea, VStack } from "cdf-design-system-alpha";
import {
  CircleAlert,
  CircleCheck,
  GitMerge,
  Link2,
  LoaderCircle,
  MoreVertical,
  Send,
  ShieldAlert,
  WandSparkles,
  X,
} from "lucide-react";
import appLogo from "../assets/logo.svg";
import { FlowNavigationFooter } from "../components/FlowNavigationFooter";
import { StatusBadge } from "../components/StatusBadge";
import { useOnboardingFlow } from "../context/OnboardingFlowContext";

type Step = {
  id: number;
  title: string;
  subtitle: string;
};

const setupSteps: Step[] = [
  { id: 1, title: "Discovery", subtitle: "Industry & Use cases" },
  { id: 2, title: "Configuration", subtitle: "Data sources" },
  { id: 3, title: "Integration", subtitle: "AI Agent Setup" },
  { id: 4, title: "Contextualization", subtitle: "Mapping validation" },
  { id: 5, title: "Launch", subtitle: "Go Live" },
];

type GapIssue = {
  id: string;
  title: string;
  detail: string;
  tone: "rose" | "amber" | "orange" | "red" | "low";
  severity: "critical" | "low";
  autoResolveProgress?: number;
};

type GapAgentMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  outline?: string[];
  canApply?: boolean;
};

const gapIssues: GapIssue[] = [
  {
    id: "cmms",
    title: "Missing CMMS Events",
    detail: "No failure codes found for predictive maintenance workflow. 8 assets affected.",
    tone: "rose",
    severity: "critical",
  },
  {
    id: "hierarchy",
    title: "Incomplete Hierarchy",
    detail: "234 assets missing parent-child relationships in Area-2.",
    tone: "amber",
    severity: "critical",
  },
  {
    id: "metadata",
    title: "Metadata Gaps",
    detail: "156 time series missing unit of measurement data.",
    tone: "orange",
    severity: "critical",
  },
  {
    id: "merge",
    title: "Asset Merge Conflicts",
    detail: "High-risk many-to-one merge detected for 3 critical pumps.",
    tone: "red",
    severity: "critical",
  },
  {
    id: "timezone",
    title: "Timestamp Timezone Drift",
    detail: "42 records have inconsistent timezone offsets and are being normalized automatically.",
    tone: "low",
    severity: "low",
    autoResolveProgress: 68,
  },
  {
    id: "units",
    title: "Unit Alias Normalization",
    detail: "31 tags use non-standard unit aliases and are being mapped to canonical units.",
    tone: "low",
    severity: "low",
    autoResolveProgress: 54,
  },
  {
    id: "naming",
    title: "Naming Convention Cleanup",
    detail: "27 signal names need casing and delimiter normalization to match template standards.",
    tone: "low",
    severity: "low",
    autoResolveProgress: 61,
  },
  {
    id: "duplicates",
    title: "Duplicate Tag Candidates",
    detail: "19 low-confidence duplicates are under automatic deduplication scoring.",
    tone: "low",
    severity: "low",
    autoResolveProgress: 47,
  },
  {
    id: "metadata-fill",
    title: "Optional Metadata Fill",
    detail: "23 optional metadata fields are being enriched from source defaults.",
    tone: "low",
    severity: "low",
    autoResolveProgress: 72,
  },
  {
    id: "hierarchy-depth",
    title: "Hierarchy Depth Alignment",
    detail: "15 assets with shallow hierarchy depth are being auto-attached to nearest parent group.",
    tone: "low",
    severity: "low",
    autoResolveProgress: 58,
  },
  {
    id: "label-standardization",
    title: "Label Standardization",
    detail: "21 labels are being standardized to template taxonomy synonyms.",
    tone: "low",
    severity: "low",
    autoResolveProgress: 64,
  },
  {
    id: "description-trim",
    title: "Description Formatting",
    detail: "18 long-form descriptions are being trimmed and formatted for consistent display.",
    tone: "low",
    severity: "low",
    autoResolveProgress: 76,
  },
];

export const ContextualizationPage = () => {
  const navigate = useNavigate();
  const { flowState } = useOnboardingFlow();
  const { selectedIndustry, companyProfile } = flowState;
  const [isGapPanelOpen, setIsGapPanelOpen] = useState(false);
  const [isGapAgentOpen, setIsGapAgentOpen] = useState(false);
  const [activeChecklistMenu, setActiveChecklistMenu] = useState<string | null>(null);
  const [selectedGapIssue, setSelectedGapIssue] = useState<GapIssue | null>(null);
  const [gapAgentPrompt, setGapAgentPrompt] = useState("");
  const [gapAgentMessages, setGapAgentMessages] = useState<GapAgentMessage[]>([]);
  const [resolvedGapIds, setResolvedGapIds] = useState<string[]>([]);

  if (!selectedIndustry || !companyProfile) {
    navigate("/");
    return null;
  }

  const unresolvedGapIssues = gapIssues.filter((gap) => !resolvedGapIds.includes(gap.id));

  const handleResolveGap = (gapId: string) => {
    const gap = gapIssues.find((item) => item.id === gapId);
    if (!gap) return;

    setSelectedGapIssue(gap);
    setGapAgentPrompt("");
    setGapAgentMessages([
      {
        id: "assistant-initial",
        role: "assistant",
        content: `I reviewed "${gap.title}" and prepared a safe resolution plan for this site.`,
        outline: [
          "Inspect impacted assets and current source mappings",
          "Apply recommended normalization and fallback defaults",
          "Re-run validation checks and confirm workflow readiness",
        ],
        canApply: true,
      },
    ]);
    setIsGapPanelOpen(false);
    setIsGapAgentOpen(true);
  };

  const handleSendGapPrompt = () => {
    const prompt = gapAgentPrompt.trim();
    if (!prompt) return;

    setGapAgentMessages((current) => [
      ...current,
      {
        id: `user-${Date.now()}`,
        role: "user",
        content: prompt,
      },
      {
        id: `assistant-${Date.now() + 1}`,
        role: "assistant",
        content: "Understood. I can apply the recommended fix package and re-check this gap automatically.",
        canApply: true,
      },
    ]);
    setGapAgentPrompt("");
  };

  const handleApplyGapFix = () => {
    if (!selectedGapIssue) return;
    setResolvedGapIds((current) =>
      current.includes(selectedGapIssue.id) ? current : [...current, selectedGapIssue.id]
    );
    setIsGapAgentOpen(false);
    setIsGapPanelOpen(true);
  };

  const handleChecklistAction = (_itemId: string, _action: string) => {
    setActiveChecklistMenu(null);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(114,141,241,1)_0%,rgba(223,229,252,1)_36%,rgba(127,233,210,1)_76%,rgba(26,150,122,1)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/45 to-white" />
        <Container maxWidth="full" padding="lg" className="relative z-10">
          <VStack gap="sm" className="py-10 items-center text-center">
            <img src={appLogo} alt="App logo" className="h-10 w-auto" />
            <h2 className="marketing-banner-title text-4xl font-semibold tracking-tight text-slate-900">
              Welcome to Cognite Data Fusion
            </h2>
            <p className="text-base text-slate-700 max-w-3xl">
              Let&apos;s get you up and running in less than 48 hours with our intelligent onboarding process.
            </p>
          </VStack>
        </Container>
      </div>

      <Container maxWidth="full" padding="lg" className="pb-40">
        <div className="mx-auto max-w-7xl">
          <HStack align="start" gap="xl" className="w-full py-6">
            <aside className="w-[294px] shrink-0 self-stretch">
              <VStack gap="md">
                <div className="px-2 w-full">
                  <HStack justify="between" align="center">
                    <p className="text-sm font-medium leading-[18px] tracking-[-0.08px] text-slate-900 whitespace-nowrap">
                      Step 4of 5
                    </p>
                  </HStack>
                </div>

                {setupSteps.map((step) => {
                  const isCompleted = step.id < 4;
                  const isActive = step.id === 4;
                  return (
                    <Card
                      key={step.id}
                      variant="outlined"
                      className={
                        isActive
                          ? "!p-0 !rounded-md border-transparent bg-transparent shadow-none"
                          : isCompleted
                            ? "!p-0 !rounded-md border-transparent bg-slate-200/10 shadow-none"
                            : "!p-0 !rounded-md border-transparent bg-slate-100 shadow-none"
                      }
                    >
                      <CardContent className="p-4 flex flex-col justify-between items-start self-stretch">
                        <HStack gap="sm" align="start" className="w-full">
                          <span
                            className={`inline-flex h-6 min-w-6 items-center justify-center rounded text-sm font-semibold ${
                              isActive
                                ? "bg-blue-500 text-white px-1.5"
                                : isCompleted
                                  ? "bg-emerald-500 text-white px-1.5"
                                  : "bg-slate-200 text-slate-600 px-1.5"
                            }`}
                          >
                            {step.id}
                          </span>
                          <HStack justify="between" align="start" className="w-full">
                            <VStack gap="xs" className="items-start">
                              <p
                                className={`${
                                  isActive || isCompleted
                                    ? "text-base font-medium leading-5 tracking-[-0.08px] text-slate-900"
                                    : "text-base font-medium leading-5 tracking-[-0.08px] text-slate-400"
                                }`}
                              >
                                {step.title}
                              </p>
                              <p
                                className={
                                  isActive || isCompleted
                                    ? "text-base font-medium leading-5 tracking-[-0.08px] text-slate-500"
                                    : "text-base font-medium leading-5 tracking-[-0.08px] text-slate-300"
                                }
                              >
                                {step.subtitle}
                              </p>
                            </VStack>
                            {isCompleted ? (
                              <CircleCheck className="h-4.5 w-4.5 text-emerald-600 mt-0.5" />
                            ) : null}
                          </HStack>
                        </HStack>
                      </CardContent>
                    </Card>
                  );
                })}
              </VStack>
            </aside>

            <div className="min-w-0 flex-1">
              <VStack gap="none" className="w-full gap-y-20">
                <section className="w-full fade-in-up">
                  <div className="grid grid-cols-[40px_minmax(0,1fr)] gap-4 items-start">
                    <div className="flex flex-col items-center self-stretch pt-1">
                      <GitMerge className="h-7 w-7 text-slate-600 mt-0.5" />
                      <div className="mt-3 w-px flex-1 bg-slate-300" />
                    </div>
                    <div>
                      <HStack justify="between" className="w-full mb-4">
                        <VStack gap="xs" className="items-start">
                          <p className="text-base font-semibold text-slate-900">Mapping Agents Status</p>
                          <p className="text-xs text-slate-500">Autonomous agents aligning data to CDF templates</p>
                        </VStack>
                        <VStack gap="none" className="items-end">
                          <p className="text-2xl font-semibold leading-none text-slate-900">3/4</p>
                          <p className="text-xs text-slate-500">Agents Active</p>
                        </VStack>
                      </HStack>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="rounded-md border border-slate-200 bg-white p-5">
                      <HStack justify="end" className="w-full">
                        <span className="relative inline-flex h-2.5 w-2.5">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-70 animate-ping" />
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500" />
                        </span>
                      </HStack>
                      <p className="mt-3 text-sm font-semibold text-slate-900">Mapping Agent</p>
                      <p className="text-sm text-slate-600">Aligning artifacts to CDF model...</p>
                      <HStack justify="end" className="w-full mt-3 mb-1">
                        <p className="text-xs text-slate-500">78% complete</p>
                      </HStack>
                      <div className="h-1.5 w-full rounded-full bg-slate-200">
                        <div className="h-full w-[78%] rounded-full bg-slate-900 progress-grow-on-load" />
                      </div>
                    </div>

                    <button
                      type="button"
                      className="text-left rounded-md bg-red-100/60 p-5 hover:bg-red-100/80 transition-colors cursor-pointer"
                      onClick={() => setIsGapPanelOpen(true)}
                    >
                      <HStack justify="end" className="w-full">
                        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-400" />
                      </HStack>
                      <p className="mt-3 text-sm font-semibold text-slate-900">Gap Detection Agent</p>
                      <p className="text-sm text-slate-600">
                        Found {unresolvedGapIssues.length} missing sources
                      </p>
                      <HStack justify="between" className="w-full mt-4">
                        <StatusBadge label="Issues Found" tone="error" />
                        <p className="text-xs text-slate-500">{unresolvedGapIssues.length} gaps</p>
                      </HStack>
                    </button>

                    <div className="rounded-md border border-slate-200 bg-white p-5">
                      <HStack justify="end" className="w-full">
                        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      </HStack>
                      <p className="mt-3 text-sm font-semibold text-slate-900">Template Selection Agent</p>
                      <p className="text-sm text-slate-600">Oil & Gas template applied</p>
                      <HStack justify="between" className="w-full mt-4">
                        <StatusBadge label="Completed" tone="success" />
                        <p className="text-xs text-slate-500">5 min ago</p>
                      </HStack>
                    </div>

                    <div className="rounded-md border border-slate-200 bg-white p-5">
                      <HStack justify="end" className="w-full">
                        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
                      </HStack>
                      <p className="mt-3 text-sm font-semibold text-slate-900">HITL Review Agent</p>
                      <p className="text-sm text-slate-600">Awaiting human validation...</p>
                      <HStack justify="between" className="w-full mt-4">
                        <StatusBadge label="Pending Review" tone="warning" />
                        <p className="text-xs text-slate-500">3 items</p>
                      </HStack>
                    </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="w-full fade-in-up order-2">
                  <div className="grid grid-cols-[40px_minmax(0,1fr)] gap-4 items-start">
                    <div className="flex flex-col items-center self-stretch pt-1">
                      <Link2 className="h-7 w-7 text-slate-600 mt-0.5" />
                      <div className="mt-3 w-px flex-1 bg-slate-300" />
                    </div>
                    <div className="w-full">
                      <HStack justify="between" className="w-full mb-4">
                        <p className="text-base font-semibold text-slate-900">Contextualization Check list</p>
                      </HStack>

                      <div className="flex flex-col gap-4">
                      <VStack gap="none" className="items-start gap-y-3">
                    <div className="w-full rounded-md border border-slate-200 bg-white shadow-none transition duration-200 hover:bg-white hover:shadow-md px-3 py-3">
                      <HStack justify="between" align="center" className="w-full">
                        <HStack gap="sm" align="center">
                          <GitMerge className="h-4.5 w-4.5 text-rose-600" />
                          <div>
                            <p className="text-sm font-semibold text-slate-900">Asset Merge Validations</p>
                            <p className="text-sm text-slate-600">3 critical pumps require merge approval</p>
                            <p className="text-xs text-slate-500">Risk Level: High</p>
                          </div>
                        </HStack>
                        <div className="relative">
                          <Button
                            variant="ghost"
                            aria-label="Open checklist item actions"
                            className="!p-2 !shadow-none text-slate-600 hover:bg-slate-200"
                            onClick={() =>
                              setActiveChecklistMenu((current) =>
                                current === "asset-merge" ? null : "asset-merge"
                              )
                            }
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                          {activeChecklistMenu === "asset-merge" ? (
                            <>
                              <button
                                type="button"
                                aria-label="Close checklist menu"
                                className="fixed inset-0 z-10"
                                onClick={() => setActiveChecklistMenu(null)}
                              />
                              <div className="absolute right-0 top-10 z-20 min-w-[148px] rounded-md border border-slate-200 bg-white p-1 shadow-md">
                                <button
                                  type="button"
                                  className="w-full rounded px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                                  onClick={() => handleChecklistAction("asset-merge", "reject")}
                                >
                                  Reject
                                </button>
                                <button
                                  type="button"
                                  className="w-full rounded px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                                  onClick={() => handleChecklistAction("asset-merge", "review")}
                                >
                                  Review
                                </button>
                              </div>
                            </>
                          ) : null}
                        </div>
                      </HStack>
                    </div>

                    <div className="w-full rounded-md border border-slate-200 bg-white shadow-none transition duration-200 hover:bg-white hover:shadow-md px-3 py-3">
                      <HStack justify="between" align="center" className="w-full">
                        <HStack gap="sm" align="center">
                          <ShieldAlert className="h-4.5 w-4.5 text-rose-600" />
                          <div>
                            <p className="text-sm font-semibold text-slate-900">Ambiguous Template Match</p>
                            <p className="text-sm text-slate-600">89 assets could match multiple templates</p>
                            <p className="text-xs text-slate-500">Risk Level: Medium</p>
                          </div>
                        </HStack>
                        <div className="relative">
                          <Button
                            variant="ghost"
                            aria-label="Open checklist item actions"
                            className="!p-2 !shadow-none text-slate-600 hover:bg-slate-200"
                            onClick={() =>
                              setActiveChecklistMenu((current) =>
                                current === "ambiguous-template" ? null : "ambiguous-template"
                              )
                            }
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                          {activeChecklistMenu === "ambiguous-template" ? (
                            <>
                              <button
                                type="button"
                                aria-label="Close checklist menu"
                                className="fixed inset-0 z-10"
                                onClick={() => setActiveChecklistMenu(null)}
                              />
                              <div className="absolute right-0 top-10 z-20 min-w-[148px] rounded-md border border-slate-200 bg-white p-1 shadow-md">
                                <button
                                  type="button"
                                  className="w-full rounded px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                                  onClick={() => handleChecklistAction("ambiguous-template", "skip")}
                                >
                                  Skip
                                </button>
                                <button
                                  type="button"
                                  className="w-full rounded px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                                  onClick={() => handleChecklistAction("ambiguous-template", "review")}
                                >
                                  Review
                                </button>
                              </div>
                            </>
                          ) : null}
                        </div>
                      </HStack>
                    </div>

                    <div className="w-full rounded-md border border-slate-200 bg-white shadow-none transition duration-200 hover:bg-white hover:shadow-md px-3 py-3">
                      <HStack justify="between" align="center" className="w-full">
                        <HStack gap="sm" align="center">
                          <Link2 className="h-4.5 w-4.5 text-rose-600" />
                          <div>
                            <p className="text-sm font-semibold text-slate-900">Relationship Validation</p>
                            <p className="text-sm text-slate-600">156 parent-child links need verification</p>
                            <p className="text-xs text-slate-500">Risk Level: Low</p>
                          </div>
                        </HStack>
                        <div className="relative">
                          <Button
                            variant="ghost"
                            aria-label="Open checklist item actions"
                            className="!p-2 !shadow-none text-slate-600 hover:bg-slate-200"
                            onClick={() =>
                              setActiveChecklistMenu((current) =>
                                current === "relationship-validation" ? null : "relationship-validation"
                              )
                            }
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                          {activeChecklistMenu === "relationship-validation" ? (
                            <>
                              <button
                                type="button"
                                aria-label="Close checklist menu"
                                className="fixed inset-0 z-10"
                                onClick={() => setActiveChecklistMenu(null)}
                              />
                              <div className="absolute right-0 top-10 z-20 min-w-[164px] rounded-md border border-slate-200 bg-white p-1 shadow-md">
                                <button
                                  type="button"
                                  className="w-full rounded px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                                  onClick={() => handleChecklistAction("relationship-validation", "auto-approve")}
                                >
                                  Auto-Approve
                                </button>
                                <button
                                  type="button"
                                  className="w-full rounded px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                                  onClick={() => handleChecklistAction("relationship-validation", "review")}
                                >
                                  Review
                                </button>
                              </div>
                            </>
                          ) : null}
                        </div>
                      </HStack>
                    </div>
                      </VStack>

                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
                        <div className="rounded-xl bg-slate-50 p-5">
                          <p className="text-base font-semibold text-slate-900">Solution Summary</p>
                          <VStack gap="sm" className="items-start mt-5">
                            <div className="w-full rounded-lg bg-slate-100 px-4 py-3">
                              <HStack justify="between" align="center" className="w-full">
                                <HStack gap="sm" align="center">
                                  <div>
                                    <p className="text-sm font-semibold text-slate-900">Alternative Sources</p>
                                    <p className="text-sm text-slate-600">3 integrations proposed</p>
                                  </div>
                                </HStack>
                                <p className="text-sm font-medium text-blue-700">Ready</p>
                              </HStack>
                            </div>

                            <div className="w-full rounded-lg bg-slate-100 px-4 py-3">
                              <HStack justify="between" align="center" className="w-full">
                                <HStack gap="sm" align="center">
                                  <div>
                                    <p className="text-sm font-semibold text-slate-900">Schema Transforms</p>
                                    <p className="text-sm text-slate-600">2 auto-fixes available</p>
                                  </div>
                                </HStack>
                                <p className="text-sm font-medium text-emerald-700">Auto</p>
                              </HStack>
                            </div>

                            <div className="w-full rounded-lg bg-slate-100 px-4 py-3">
                              <HStack justify="between" align="center" className="w-full">
                                <HStack gap="sm" align="center">
                                  <div>
                                    <p className="text-sm font-semibold text-slate-900">Migration Plans</p>
                                    <p className="text-sm text-slate-600">1 cutover scheduled</p>
                                  </div>
                                </HStack>
                                <p className="text-sm font-medium text-amber-700">Scheduled</p>
                              </HStack>
                            </div>

                            <div className="w-full rounded-lg bg-slate-100 px-4 py-3">
                              <HStack justify="between" align="center" className="w-full">
                                <HStack gap="sm" align="center">
                                  <div>
                                    <p className="text-sm font-semibold text-slate-900">Expert Reviews</p>
                                    <p className="text-sm text-slate-600">4 SME validations</p>
                                  </div>
                                </HStack>
                                <p className="text-sm font-medium text-violet-700">Pending</p>
                              </HStack>
                            </div>
                          </VStack>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-5">
                          <p className="text-base font-semibold text-slate-900">Approval Status</p>
                          <div className="mt-5 rounded-md bg-slate-100 px-5 py-6">
                            <VStack gap="none" className="items-center">
                              <p className="text-[44px] font-semibold leading-none text-slate-900">8/12</p>
                              <p className="text-sm text-slate-600 mt-2">Solutions Approved</p>
                            </VStack>
                          </div>

                          <VStack gap="sm" className="items-start mt-5">
                            <HStack justify="between" className="w-full">
                              <p className="text-sm text-slate-700">High Priority</p>
                              <p className="text-sm font-medium text-red-600">3 pending</p>
                            </HStack>
                            <HStack justify="between" className="w-full">
                              <p className="text-sm text-slate-700">Medium Priority</p>
                              <p className="text-sm font-medium text-amber-600">1 pending</p>
                            </HStack>
                            <HStack justify="between" className="w-full">
                              <p className="text-sm text-slate-700">Low Priority</p>
                              <p className="text-sm font-medium text-emerald-600">0 pending</p>
                            </HStack>
                          </VStack>

                          <Button
                            variant="secondary"
                            className="w-full mt-5 bg-slate-900 text-white hover:bg-slate-800 !shadow-none"
                          >
                            Approve All Recommended
                          </Button>
                        </div>
                      </div>
                      </div>

                      <HStack justify="end" className="w-full mt-3">
                        <Button
                          variant="secondary"
                          className="bg-slate-900 text-white hover:bg-slate-800 !shadow-none"
                        >
                          Review All
                        </Button>
                      </HStack>
                    </div>
                  </div>
                </section>

                <section className="w-full fade-in-up order-1">
                  <div className="grid grid-cols-[40px_minmax(0,1fr)] gap-4 items-start">
                    <div className="flex flex-col items-center self-stretch pt-1">
                      <ShieldAlert className="h-7 w-7 text-slate-600 mt-0.5" />
                      <div className="mt-3 w-px flex-1 bg-slate-300" />
                    </div>
                    <div className="w-full">
                      <VStack gap="sm" className="items-start">
                        <p className="text-base font-semibold text-slate-900">Applied Template Configuration</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                      <div className="rounded-md bg-slate-50 px-5 py-6">
                        <HStack gap="xs" align="center">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">Oil & Gas Template</p>
                            <p className="text-sm text-emerald-700 font-medium">Active</p>
                          </div>
                        </HStack>
                        <VStack gap="sm" className="items-start mt-5">
                          <HStack justify="between" className="w-full">
                            <p className="text-sm text-slate-600">Asset Types:</p>
                            <p className="text-sm font-semibold text-slate-900">12</p>
                          </HStack>
                          <HStack justify="between" className="w-full">
                            <p className="text-sm text-slate-600">Workflows:</p>
                            <p className="text-sm font-semibold text-slate-900">8</p>
                          </HStack>
                          <HStack justify="between" className="w-full">
                            <p className="text-sm text-slate-600">KPIs:</p>
                            <p className="text-sm font-semibold text-slate-900">24</p>
                          </HStack>
                        </VStack>
                      </div>

                      <div className="rounded-md bg-slate-50 px-5 py-6">
                        <p className="text-sm font-semibold text-slate-900 mb-5">Coverage Statistics</p>
                        <VStack gap="sm" className="items-start">
                          <div className="w-full">
                            <HStack justify="between" className="w-full">
                              <p className="text-sm text-slate-700">Pumps</p>
                              <p className="text-sm font-semibold text-slate-900">94/98</p>
                            </HStack>
                            <div className="mt-1 h-1.5 w-full rounded-full bg-slate-200">
                              <div className="h-full w-[96%] rounded-full bg-slate-900 progress-grow-on-load" />
                            </div>
                          </div>
                          <div className="w-full">
                            <HStack justify="between" className="w-full">
                              <p className="text-sm text-slate-700">Compressors</p>
                              <p className="text-sm font-semibold text-slate-900">87/89</p>
                            </HStack>
                            <div className="mt-1 h-1.5 w-full rounded-full bg-slate-200">
                              <div className="h-full w-[98%] rounded-full bg-slate-900 progress-grow-on-load" />
                            </div>
                          </div>
                          <div className="w-full">
                            <HStack justify="between" className="w-full">
                              <p className="text-sm text-slate-700">Network Paths</p>
                              <p className="text-sm font-semibold text-slate-900">76/81</p>
                            </HStack>
                            <div className="mt-1 h-1.5 w-full rounded-full bg-slate-200">
                              <div className="h-full w-[94%] rounded-full bg-slate-900 progress-grow-on-load" />
                            </div>
                          </div>
                        </VStack>
                      </div>

                      <div className="rounded-md bg-slate-50 px-5 py-6">
                        <p className="text-sm font-semibold text-slate-900 mb-5">Mapping Progress</p>
                        <VStack gap="sm" className="items-start">
                          <div className="w-full">
                            <HStack justify="between" className="w-full">
                              <p className="text-sm text-slate-700">Assets Mapped</p>
                              <p className="text-sm font-semibold text-slate-900">95%</p>
                            </HStack>
                            <div className="mt-1 h-1.5 w-full rounded-full bg-slate-200">
                              <div className="h-full w-[95%] rounded-full bg-slate-900 progress-grow-on-load" />
                            </div>
                          </div>
                          <div className="w-full">
                            <HStack justify="between" className="w-full">
                              <p className="text-sm text-slate-700">Time Series Aligned</p>
                              <p className="text-sm font-semibold text-slate-900">81%</p>
                            </HStack>
                            <div className="mt-1 h-1.5 w-full rounded-full bg-slate-200">
                              <div className="h-full w-[81%] rounded-full bg-slate-900 progress-grow-on-load" />
                            </div>
                          </div>
                          <div className="w-full">
                            <HStack justify="between" className="w-full">
                              <p className="text-sm text-slate-700">Tags Contextualized</p>
                              <p className="text-sm font-semibold text-slate-900">78%</p>
                            </HStack>
                            <div className="mt-1 h-1.5 w-full rounded-full bg-slate-200">
                              <div className="h-full w-[78%] rounded-full bg-slate-900 progress-grow-on-load" />
                            </div>
                          </div>
                        </VStack>
                      </div>
                        </div>
                      </VStack>
                    </div>
                  </div>
                </section>

              </VStack>
            </div>
          </HStack>
        </div>
      </Container>

      <FlowNavigationFooter
        backLabel="Back to Integration"
        onBack={() => navigate("/integration")}
        nextLabel="Continue to Launch"
        onNext={() => navigate("/launch")}
      />

      {isGapPanelOpen ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close gap analysis panel"
            className="absolute inset-0 bg-slate-900/25"
            onClick={() => setIsGapPanelOpen(false)}
          />
          <aside className="absolute right-0 top-0 h-full w-full max-w-[520px] border-l border-slate-200 bg-white shadow-2xl">
            <div className="h-full flex flex-col">
              <div className="border-b border-slate-200 px-4 py-3 bg-white">
                <HStack justify="between" align="center">
                  <HStack gap="sm" align="center">
                    <div>
                      <p className="text-base font-semibold text-slate-900">Gap Analysis</p>
                      <p className="text-xs text-slate-500">Review and resolve detected contextualization gaps.</p>
                    </div>
                  </HStack>
                  <Button
                    variant="ghost"
                    aria-label="Close gap analysis panel"
                    className="!p-2 !shadow-none"
                    onClick={() => setIsGapPanelOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </HStack>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-4">
                <HStack justify="between" className="w-full mb-3">
                  <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium bg-rose-100 text-rose-700">
                    {unresolvedGapIssues.length} Issues
                  </span>
                </HStack>
                <VStack gap="md" className="items-start">
                  {unresolvedGapIssues.map((gap) => {
                    const iconClass =
                      gap.tone === "low"
                        ? "text-slate-400"
                        : gap.tone === "rose"
                        ? "text-rose-600"
                        : gap.tone === "amber"
                          ? "text-amber-600"
                          : gap.tone === "orange"
                            ? "text-orange-600"
                            : "text-red-600";
                    return (
                      <div key={gap.id} className="w-full rounded-md bg-white hover:bg-slate-50 transition-colors px-4 py-4">
                        <HStack justify="between" align="start" className="w-full">
                          <HStack gap="xs" align="start">
                            <CircleAlert className={`h-4 w-4 mt-0.5 shrink-0 ${iconClass}`} />
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{gap.title}</p>
                              <p className="mt-1 text-xs text-slate-600">{gap.detail}</p>
                            </div>
                          </HStack>
                          {gap.severity === "critical" ? (
                            <Button
                              variant="secondary"
                              className="!h-7 !px-3 !text-xs !rounded bg-slate-900 text-white hover:bg-slate-800 !shadow-none"
                              onClick={() => handleResolveGap(gap.id)}
                            >
                              Resolve
                            </Button>
                          ) : (
                            <VStack gap="xs" className="items-end min-w-[128px]">
                              <HStack gap="xs" align="center">
                                <LoaderCircle className="h-3.5 w-3.5 text-slate-500 animate-spin" />
                                <p className="text-xs font-medium text-slate-500">Agent resolving</p>
                              </HStack>
                              <div className="h-1.5 w-full rounded-full bg-slate-200">
                                <div
                                  className="h-full rounded-full bg-slate-400 progress-grow-on-load"
                                  style={{ width: `${gap.autoResolveProgress ?? 0}%` }}
                                />
                              </div>
                              <p className="text-xs text-slate-500">{gap.autoResolveProgress ?? 0}%</p>
                            </VStack>
                          )}
                        </HStack>
                      </div>
                    );
                  })}
                </VStack>
              </div>
            </div>
          </aside>
        </div>
      ) : null}

      {isGapAgentOpen && selectedGapIssue ? (
        <div className="fixed inset-0 z-[60]">
          <button
            type="button"
            aria-label="Close Atlas resolution agent"
            className="absolute inset-0 bg-slate-900/25"
            onClick={() => setIsGapAgentOpen(false)}
          />
          <aside className="absolute right-0 top-0 h-full w-full max-w-[430px] border-l border-slate-200 bg-slate-50 shadow-2xl">
            <div className="h-full flex flex-col">
              <div className="border-b border-slate-200 px-4 py-3">
                <HStack justify="between" align="center">
                  <HStack gap="sm" align="center">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded bg-violet-100 text-violet-700">
                      <WandSparkles className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">Atlas Resolution Agent</h3>
                      <p className="text-xs text-slate-500">{selectedGapIssue.title}</p>
                    </div>
                  </HStack>
                  <Button
                    variant="ghost"
                    aria-label="Close Atlas resolution agent panel"
                    className="!p-2"
                    onClick={() => setIsGapAgentOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </HStack>
              </div>

              <div className="mt-4 min-h-0 flex-1 overflow-y-auto px-5">
                <VStack gap="sm">
                  {gapAgentMessages.map((message) => (
                    <div key={message.id} className="w-full">
                      {message.role === "user" ? (
                        <div className="px-1 py-2">
                          <HStack gap="sm" align="start">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-violet-100 text-[11px] font-semibold text-violet-700">
                              RW
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-slate-900">Ryan Wood</p>
                              <p className="mt-1 text-sm text-slate-800">{message.content}</p>
                            </div>
                          </HStack>
                        </div>
                      ) : (
                        <div className="rounded-md bg-violet-100/70 p-3">
                          <HStack gap="sm" align="center">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-white text-violet-700">
                              <WandSparkles className="h-3.5 w-3.5" />
                            </span>
                            <p className="text-sm font-semibold text-slate-900">Atlas Agent</p>
                          </HStack>
                          <p className="mt-2 text-sm text-slate-800">{message.content}</p>
                          {message.outline ? (
                            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 mt-2">
                              {message.outline.map((line) => (
                                <li key={line}>{line}</li>
                              ))}
                            </ul>
                          ) : null}
                          {message.canApply ? (
                            <HStack justify="end" className="w-full mt-3">
                              <Button variant="primary" onClick={handleApplyGapFix}>
                                Apply Recommended Fix
                              </Button>
                            </HStack>
                          ) : null}
                        </div>
                      )}
                    </div>
                  ))}
                </VStack>
              </div>

              <div className="px-4 pb-4 pt-3">
                <Textarea
                  placeholder="Ask Atlas about the resolution plan"
                  value={gapAgentPrompt}
                  onChange={(event) => setGapAgentPrompt(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      handleSendGapPrompt();
                    }
                  }}
                  resize="vertical"
                  rows={3}
                  className="rounded-md border border-slate-300 bg-white focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500"
                />
                <HStack justify="between" align="center" className="w-full mt-2">
                  <p className="text-xs text-slate-500">
                    Atlas suggestions should be reviewed before approval.
                  </p>
                  <Button
                    variant="secondary"
                    className="!h-8 !px-3 !text-xs bg-slate-900 text-white hover:bg-slate-800"
                    onClick={handleSendGapPrompt}
                  >
                    <HStack gap="xs" align="center">
                      <Send className="h-3.5 w-3.5" />
                      <span>Send</span>
                    </HStack>
                  </Button>
                </HStack>
              </div>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
};
