import { type KeyboardEvent, useEffect, useState } from "react";
import {
  Container,
  VStack,
  HStack,
  Card,
  CardContent,
  Button,
  Badge,
  Modal,
  ModalContent,
  ModalFooter,
  Input,
  Textarea,
} from "cdf-design-system-alpha";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Workflow,
  Database,
  Fuel,
  Zap,
  Factory,
  FlaskConical,
  Mountain,
  Search,
  Activity,
  Settings2,
  BarChart3,
  Network,
  Boxes,
  Wrench,
  LineChart,
  ClipboardList,
  FileText,
  Square,
  CheckSquare2,
  Plus,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import appLogo from "../assets/logo.svg";
import atlasAiLogo from "../assets/atlas-ai-logo.png";
import { FlowNavigationFooter } from "../components/FlowNavigationFooter";
import { useOnboardingFlow, type CompanyProfile } from "../context/OnboardingFlowContext";

type Step = {
  id: number;
  title: string;
  subtitle: string;
};

type Industry = {
  id: string;
  name: string;
  detail: string;
  icon: LucideIcon;
  iconColor: string;
};

type UseCase = {
  id: string;
  name: string;
  detail: string;
  eta: string;
  icon: LucideIcon;
};

type DataSource = {
  id: string;
  name: string;
  icon: LucideIcon;
};

type AgentChatMessage = {
  id: string;
  role: "user" | "agent";
  content: string;
  outline?: string[];
  canAccept?: boolean;
};

type UseCaseAgentStage = "intake" | "clarify" | "dependencies" | "final";

const setupSteps: Step[] = [
  { id: 1, title: "Discovery", subtitle: "Industry & Use cases" },
  { id: 2, title: "Configuration", subtitle: "Data sources" },
  { id: 3, title: "Integration", subtitle: "AI Agent Setup" },
  { id: 4, title: "Contextualization", subtitle: "Mapping validation" },
  { id: 5, title: "Launch", subtitle: "Go Live" },
];

const industries: Industry[] = [
  {
    id: "oil-gas",
    name: "Oil & Gas",
    detail: "Upstream, Midstream, Downstream",
    icon: Fuel,
    iconColor: "text-teal-500",
  },
  {
    id: "power-utilities",
    name: "Power & Utilities",
    detail: "Generation, Transmission, Distribution",
    icon: Zap,
    iconColor: "text-amber-500",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    detail: "Process, Discrete, Hybrid",
    icon: Factory,
    iconColor: "text-lime-500",
  },
  {
    id: "chemicals",
    name: "Chemicals",
    detail: "Petrochemicals, Specialty, Basic",
    icon: FlaskConical,
    iconColor: "text-rose-500",
  },
  {
    id: "mining",
    name: "Mining",
    detail: "Surface, Underground, Processing",
    icon: Mountain,
    iconColor: "text-indigo-500",
  },
  {
    id: "other",
    name: "Other",
    detail: "Atlas AI Custom industry setup",
    icon: Building2,
    iconColor: "text-indigo-500",
  },
];

const initialUseCases: UseCase[] = [
  {
    id: "rca",
    name: "Root Cause Analysis (RCA)",
    detail: "Identify failure patterns and optimize maintenance strategies",
    eta: "4-6 hours setup",
    icon: Search,
  },
  {
    id: "condition-monitoring",
    name: "Condition Monitoring",
    detail: "Real-time asset health tracking and predictive insights",
    eta: "6-8 hours setup",
    icon: Activity,
  },
  {
    id: "asset-health",
    name: "Asset Health Management",
    detail: "Comprehensive asset lifecycle optimization",
    eta: "8-12 hours setup",
    icon: Settings2,
  },
  {
    id: "downtime",
    name: "Downtime Analysis",
    detail: "Minimize unplanned outages and optimize uptime",
    eta: "4-6 hours setup",
    icon: BarChart3,
  },
];

const dataSources: DataSource[] = [
  { id: "pi", name: "PI System", icon: Database },
  { id: "opcua", name: "OPC-UA", icon: Network },
  { id: "sap", name: "SAP", icon: Boxes },
  { id: "maximo", name: "Maximo", icon: Wrench },
  { id: "historians", name: "Historians", icon: LineChart },
  { id: "cmms", name: "CMMS", icon: Settings2 },
  { id: "eam", name: "EAM", icon: ClipboardList },
  { id: "dms", name: "DMS", icon: FileText },
];

const titleCase = (value: string) =>
  value
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const inferDependencies = (context: string, connectedSourceNames: string[]) => {
  const lower = context.toLowerCase();
  const dependencies = new Set<string>();

  if (connectedSourceNames.length > 0) {
    dependencies.add(`Connected systems: ${connectedSourceNames.join(", ")}`);
  }
  if (lower.includes("sap")) dependencies.add("Business context from SAP work orders and notifications");
  if (lower.includes("pi") || lower.includes("historian") || lower.includes("opc")) {
    dependencies.add("High-frequency operational signals from historian/OT systems");
  }
  if (lower.includes("cmms") || lower.includes("maximo") || lower.includes("eam")) {
    dependencies.add("Maintenance master data and failure codes from CMMS/EAM");
  }
  if (lower.includes("document") || lower.includes("manual") || lower.includes("procedure")) {
    dependencies.add("Procedure and document context for operator guidance");
  }

  dependencies.add("Asset hierarchy and equipment criticality mapping");
  dependencies.add("SME validation from operations and reliability teams");
  dependencies.add("Alert ownership, escalation path, and response SLAs");

  return Array.from(dependencies);
};

const buildUseCaseTitle = (context: string) => {
  const lower = context.toLowerCase();
  const assetMatch = lower.match(
    /(compressor|pump|turbine|motor|valve|boiler|heat exchanger|conveyor|reactor)/
  );
  const asset = assetMatch ? titleCase(assetMatch[1]) : "Critical Assets";

  if (lower.includes("root cause")) return `Root Cause Analysis for ${asset}`;
  if (lower.includes("condition monitor")) return `Condition Monitoring for ${asset}`;
  if (lower.includes("downtime")) return `Downtime Reduction for ${asset}`;
  if (lower.includes("anomal") || lower.includes("predict") || lower.includes("failure")) {
    return `Predictive Maintenance for ${asset}`;
  }
  if (lower.includes("energy") || lower.includes("efficiency")) {
    return `Performance Optimization for ${asset}`;
  }

  return `Operational Intelligence for ${asset}`;
};

export const HomePage = () => {
  const navigate = useNavigate();
  const { flowState, setFlowState } = useOnboardingFlow();
  const [selectedIndustry, setSelectedIndustry] = useState<string>(flowState.selectedIndustry);
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>(flowState.selectedUseCases);
  const [useCaseCards, setUseCaseCards] = useState<UseCase[]>(initialUseCases);
  const [selectedDataSource, setSelectedDataSource] = useState<string>(
    Object.keys(flowState.connectedSources).find((sourceId) => flowState.connectedSources[sourceId]) ??
      "sap"
  );
  const [connectedSources, setConnectedSources] = useState<Record<string, boolean>>(
    flowState.connectedSources
  );
  const [isSapModalOpen, setIsSapModalOpen] = useState(false);
  const [isUseCaseAgentPanelOpen, setIsUseCaseAgentPanelOpen] = useState(false);
  const [isCompanyProfileModalOpen, setIsCompanyProfileModalOpen] = useState(false);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(flowState.companyProfile);
  const [companyProfileDraft, setCompanyProfileDraft] = useState<CompanyProfile>(
    flowState.companyProfile ?? {
      companyName: "",
      siteCount: "",
      ownerName: "",
      ownerTitle: "",
    }
  );
  const [sapCredentials, setSapCredentials] = useState({
    username: "",
    password: "",
    universalId: "",
    clientNumber: "",
  });
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isDependentLoading, setIsDependentLoading] = useState(false);
  const [hasDependentLoaded, setHasDependentLoaded] = useState(
    Boolean(flowState.selectedIndustry && flowState.companyProfile)
  );
  const [isDataSourceLoading, setIsDataSourceLoading] = useState(false);
  const [hasDataSourceLoaded, setHasDataSourceLoaded] = useState(
    flowState.selectedUseCases.length > 0
  );
  const [useCasePrompt, setUseCasePrompt] = useState("");
  const [isGeneratingUseCaseOutline, setIsGeneratingUseCaseOutline] = useState(false);
  const [useCaseAgentMessages, setUseCaseAgentMessages] = useState<AgentChatMessage[]>([]);
  const [generatedUseCaseDraft, setGeneratedUseCaseDraft] = useState<UseCase | null>(null);
  const [useCaseAgentStage, setUseCaseAgentStage] = useState<UseCaseAgentStage>("intake");
  const [useCaseAgentInputs, setUseCaseAgentInputs] = useState<string[]>([]);
  const activeStep = 1;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsInitialLoading(false);
    }, 270);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedUseCases.length > 0 && !hasDataSourceLoaded) {
      setIsDataSourceLoading(true);
      const timer = window.setTimeout(() => {
        setIsDataSourceLoading(false);
        setHasDataSourceLoaded(true);
      }, 1050);

      return () => window.clearTimeout(timer);
    }
  }, [selectedUseCases.length, hasDataSourceLoaded]);

  const toggleUseCase = (useCaseId: string) => {
    setSelectedUseCases((current) =>
      current.includes(useCaseId)
        ? current.filter((id) => id !== useCaseId)
        : [...current, useCaseId]
    );
  };

  const handleDataSourceClick = (sourceId: string) => {
    setSelectedDataSource(sourceId);
  };

  const handleIndustrySelect = (industryId: string) => {
    setSelectedIndustry(industryId);
    setCompanyProfile(null);
    setSelectedUseCases([]);
    setConnectedSources({});
    setHasDependentLoaded(false);
    setHasDataSourceLoaded(false);
    setIsDataSourceLoading(false);
    setCompanyProfileDraft({
      companyName: "",
      siteCount: "",
      ownerName: "",
      ownerTitle: "",
    });
    setIsCompanyProfileModalOpen(true);
  };

  const triggerUseCaseSectionLoad = () => {
    if (hasDependentLoaded) return;
    setIsDependentLoading(true);
    window.setTimeout(() => {
      setIsDependentLoading(false);
      setHasDependentLoaded(true);
    }, 1050);
  };

  const handleCompanyProfileSubmit = () => {
    if (
      !companyProfileDraft.companyName.trim() ||
      !companyProfileDraft.siteCount.trim() ||
      !companyProfileDraft.ownerName.trim() ||
      !companyProfileDraft.ownerTitle.trim()
    ) {
      return;
    }

    setCompanyProfile({
      companyName: companyProfileDraft.companyName.trim(),
      siteCount: companyProfileDraft.siteCount.trim(),
      ownerName: companyProfileDraft.ownerName.trim(),
      ownerTitle: companyProfileDraft.ownerTitle.trim(),
    });
    setIsCompanyProfileModalOpen(false);
    triggerUseCaseSectionLoad();
  };

  const resetUseCaseAgent = () => {
    setUseCasePrompt("");
    setUseCaseAgentMessages([]);
    setGeneratedUseCaseDraft(null);
    setIsGeneratingUseCaseOutline(false);
    setUseCaseAgentStage("intake");
    setUseCaseAgentInputs([]);
  };

  const openUseCaseAgentModal = () => {
    resetUseCaseAgent();
    setUseCaseAgentMessages([
      {
        id: `agent-intro-${Date.now()}`,
        role: "agent",
        content:
          "Hi, I am Atlas AI. Describe the use case you want to add, including objective, target assets, and expected business outcome.",
      },
    ]);
    setUseCaseAgentStage("intake");
    setUseCaseAgentInputs([]);
    setIsUseCaseAgentPanelOpen(true);
  };

  const generateUseCaseOutline = () => {
    const prompt = useCasePrompt.trim();
    if (!prompt) return;

    const userMessage: AgentChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: prompt,
    };
    setUseCaseAgentMessages((current) => [...current, userMessage]);
    setUseCaseAgentInputs((current) => [...current, prompt]);
    setUseCasePrompt("");
    setIsGeneratingUseCaseOutline(true);

    const nextInputs = [...useCaseAgentInputs, prompt];
    const fullContext = nextInputs.join(" ");
    const connectedSourceNames = dataSources
      .filter((source) => connectedSources[source.id])
      .map((source) => source.name);

    window.setTimeout(() => {
      if (useCaseAgentStage === "intake") {
        setUseCaseAgentMessages((current) => [
          ...current,
          {
            id: `agent-clarify-${Date.now()}`,
            role: "agent",
            content:
              "Great start. Before I draft the outline, please clarify:\n1) What decision or action should this use case drive?\n2) Which systems/signals are available today, and what is missing?\n3) What success KPI and response time are required?",
          },
        ]);
        setUseCaseAgentStage("clarify");
        setIsGeneratingUseCaseOutline(false);
        return;
      }

      const identifiedDependencies = inferDependencies(fullContext, connectedSourceNames);

      if (useCaseAgentStage === "clarify") {
        setUseCaseAgentMessages((current) => [
          ...current,
          {
            id: `agent-deps-${Date.now()}`,
            role: "agent",
            content: `Thanks, I can now identify key dependencies that the final outline should detail:\n- ${identifiedDependencies.join(
              "\n- "
            )}\n\nPlease share any constraints for security/compliance, ownership, and rollout timeline.`,
          },
        ]);
        setUseCaseAgentStage("dependencies");
        setIsGeneratingUseCaseOutline(false);
        return;
      }

      const generatedTitle = buildUseCaseTitle(fullContext);
      const objectiveSummary =
        fullContext.length > 170 ? `${fullContext.slice(0, 167).trim()}...` : fullContext;
      const detailedOutline = [
        `Use case title: ${generatedTitle}`,
        `Objective and scope: ${objectiveSummary}`,
        `Dependency mapping: ${identifiedDependencies.join("; ")}`,
        "Data model detail: define tags/signals, event schema, contextual relationships, and quality checks.",
        "Execution detail: detection logic, thresholds, model cadence, and human-in-the-loop review.",
        "Business detail: owner, KPI targets, alert workflow, and phased rollout plan.",
      ];

      setUseCaseAgentMessages((current) => [
        ...current,
        {
          id: `agent-final-${Date.now()}`,
          role: "agent",
          content:
            "I now have enough context. Here is a detailed outline with dependencies captured. Review and accept when ready.",
          outline: detailedOutline,
          canAccept: true,
        },
      ]);

      setGeneratedUseCaseDraft({
        id: `custom-use-case-${Date.now()}`,
        name: generatedTitle,
        detail: `Dependencies captured: ${identifiedDependencies.slice(0, 2).join(", ")}`,
        eta: "6-10 hours setup",
        icon: Search,
      });
      setUseCaseAgentStage("final");
      setIsGeneratingUseCaseOutline(false);
    }, 900);
  };

  const handleUseCasePromptKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || event.shiftKey) return;
    event.preventDefault();
    if (!useCasePrompt.trim() || isGeneratingUseCaseOutline) return;
    generateUseCaseOutline();
  };

  const confirmUseCaseDraft = () => {
    if (!generatedUseCaseDraft) return;
    setUseCaseCards((current) => [...current, generatedUseCaseDraft]);
    setSelectedUseCases((current) =>
      current.includes(generatedUseCaseDraft.id)
        ? current
        : [...current, generatedUseCaseDraft.id]
    );
    setIsUseCaseAgentPanelOpen(false);
    resetUseCaseAgent();
  };

  const handleConnectSource = () => {
    if (
      !sapCredentials.username.trim() ||
      !sapCredentials.password.trim() ||
      !sapCredentials.universalId.trim() ||
      !sapCredentials.clientNumber.trim()
    ) {
      return;
    }
    setConnectedSources((current) => ({ ...current, [selectedDataSource]: true }));
    setIsSapModalOpen(false);
  };

  const selectedSourceName =
    dataSources.find((source) => source.id === selectedDataSource)?.name ?? "Data Source";
  const selectedIndustryName =
    industries.find((industry) => industry.id === selectedIndustry)?.name ?? "Selected Industry";
  const companyInitials = companyProfile
    ? companyProfile.companyName
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("")
    : "CO";
  const hasConnectedSource = Object.values(connectedSources).some(Boolean);
  const canContinue =
    Boolean(selectedIndustry && companyProfile) && selectedUseCases.length > 0 && hasConnectedSource;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(114,141,241,1)_0%,rgba(223,229,252,1)_36%,rgba(127,233,210,1)_76%,rgba(26,150,122,1)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/45 to-white" />
        <Container maxWidth="full" padding="lg" className="relative z-10">
          <VStack gap="sm" className="py-10 items-center text-center">
            <img src={appLogo} alt="App logo" className="h-10 w-auto" />
            <h2 className="marketing-banner-title text-4xl font-semibold tracking-tight text-slate-900">
              Cognite Data Fusion Site Configuration
            </h2>
            <p className="text-base text-slate-700 max-w-3xl">
              Getup and running in less than 48 hours with our intelligent onboarding process.
            </p>
          </VStack>
        </Container>
      </div>

      <Container maxWidth="full" padding="lg" className="pb-40">
        <div className="mx-auto max-w-7xl">
          <HStack align="start" gap="xl" className="w-full py-6">
            <aside
              className={`w-[294px] shrink-0 self-stretch transition-all duration-500 ${
                isInitialLoading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              }`}
            >
              <VStack gap="md">
                <div className="px-2 w-full">
                  <HStack justify="between" align="center">
                    <p className="text-sm font-medium leading-[18px] tracking-[-0.08px] text-slate-900 whitespace-nowrap">
                      Step 1of 5
                    </p>
                  </HStack>
                </div>

                {setupSteps.map((step) => {
                  const isActive = step.id === activeStep;
                  return (
                    <Card
                      key={step.id}
                      variant="outlined"
                      className={
                        isActive
                          ? "!p-0 !rounded-md border-transparent bg-transparent shadow-none"
                          : "!p-0 !rounded-md border-transparent bg-slate-100 shadow-none"
                      }
                    >
                      <CardContent className="p-4 flex flex-col justify-between items-start self-stretch">
                        <HStack gap="sm" align="start" className="w-full">
                          <span
                            className={`inline-flex h-6 min-w-6 items-center justify-center rounded text-sm font-semibold ${
                              isActive
                                ? "bg-blue-500 text-white px-1.5"
                                : "bg-slate-200 text-slate-600 px-1.5"
                            }`}
                          >
                            {step.id}
                          </span>
                          <VStack gap="xs" className="items-start">
                            <p
                              className={`${
                                isActive
                                  ? "text-base font-medium leading-5 tracking-[-0.08px] text-slate-900"
                                  : "text-base font-medium leading-5 tracking-[-0.08px] text-slate-400"
                              }`}
                            >
                              {step.title}
                            </p>
                            <p
                              className={
                                isActive
                                  ? "text-base font-medium leading-5 tracking-[-0.08px] text-slate-500"
                                  : "text-base font-medium leading-5 tracking-[-0.08px] text-slate-300"
                              }
                            >
                              {step.subtitle}
                            </p>
                          </VStack>
                        </HStack>
                      </CardContent>
                    </Card>
                  );
                })}
              </VStack>
            </aside>

            <div className="min-w-0 flex-1">
              <VStack gap="none" className="w-full gap-y-20">
                <section
                  className={`w-full transition-all duration-500 ${
                    isInitialLoading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                  }`}
                >
                  <div className="grid grid-cols-[40px_minmax(0,1fr)] gap-4 items-start">
                    <div className="flex flex-col items-center self-stretch pt-1">
                      <Building2 className="h-7 w-7 text-slate-600" />
                      <div className="mt-3 w-px flex-1 bg-slate-300" />
                    </div>

                    <div>
                      <HStack gap="sm" align="start" className="mb-8">
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">
                            Select your industry
                          </h3>
                          <p className="text-sm text-slate-500">
                            Choose your primary industry to unlock tailored use cases and templates.
                          </p>
                        </div>
                      </HStack>
                      {companyProfile && selectedIndustry ? (
                        <Card className="!p-0 border border-slate-200 bg-white shadow-sm rounded-md overflow-hidden">
                          <CardContent className="p-5">
                            <HStack justify="between" align="start" className="w-full">
                              <HStack gap="md" align="start">
                                <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-violet-100 text-violet-700 text-sm font-semibold">
                                  {companyInitials}
                                </span>
                                <VStack gap="xs" className="items-start">
                                  <p className="text-lg font-semibold text-slate-900">
                                    {companyProfile.companyName}
                                  </p>
                                  <p className="text-sm text-slate-600">
                                    {selectedIndustryName} operations across {companyProfile.siteCount} site
                                    {companyProfile.siteCount === "1" ? "" : "s"}.
                                  </p>
                                  <p className="text-sm text-slate-500">
                                    Owner: {companyProfile.ownerName}, {companyProfile.ownerTitle}
                                  </p>
                                </VStack>
                              </HStack>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setCompanyProfileDraft(companyProfile);
                                  setIsCompanyProfileModalOpen(true);
                                }}
                              >
                                Edit
                              </Button>
                            </HStack>
                          </CardContent>
                        </Card>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                          {industries.map((industry) => {
                            const isOtherIndustry = industry.id === "other";
                            const isSelected = !isOtherIndustry && selectedIndustry === industry.id;
                            const IndustryIcon = industry.icon;
                            return (
                              <button
                                key={industry.id}
                                type="button"
                                onClick={() =>
                                  isOtherIndustry
                                    ? openUseCaseAgentModal()
                                    : handleIndustrySelect(industry.id)
                                }
                                className={`text-left rounded-md transition-all ${
                                  isOtherIndustry
                                    ? "border border-violet-300 bg-white hover:bg-[linear-gradient(90deg,rgba(114,141,241,0.08)_0%,rgba(223,229,252,0.3)_36%,rgba(127,233,210,0.14)_76%,rgba(26,150,122,0.08)_100%)] hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-16px_rgba(109,40,217,0.55)]"
                                    : isSelected
                                      ? "bg-blue-100/80"
                                      : "bg-slate-100 hover:bg-slate-200/70"
                                }`}
                              >
                                <div className="h-[148px] p-4 flex flex-col items-start gap-4">
                                  {isOtherIndustry ? (
                                    <img
                                      src={atlasAiLogo}
                                      alt="Atlas AI"
                                      className="h-5 w-5 object-contain"
                                    />
                                  ) : (
                                    <IndustryIcon className={`h-5 w-5 ${industry.iconColor}`} />
                                  )}
                                  <div>
                                    <p className="font-semibold text-slate-900">{industry.name}</p>
                                    <p className="text-xs text-slate-600">{industry.detail}</p>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {selectedIndustry && companyProfile ? (
                <section className="w-full fade-in-up">
                  <div className="grid grid-cols-[40px_minmax(0,1fr)] gap-4 items-start">
                    <div className="flex flex-col items-center self-stretch pt-1">
                      <Workflow className="h-7 w-7 text-slate-600 mt-0.5" />
                      <div className="mt-3 w-px flex-1 bg-slate-300" />
                    </div>

                    <div>
                      <HStack gap="sm" align="start" className="mb-8">
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">
                            Select use case bundles
                          </h3>
                          <p className="text-sm text-slate-500">
                            Choose your primary industry to unlock tailored use cases and templates.
                          </p>
                        </div>
                      </HStack>
                      {isDependentLoading ? (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 fade-in-up">
                          {[...Array(4)].map((_, index) => (
                            <div key={index} className="h-[148px] rounded-md bg-slate-100 animate-pulse" />
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 fade-in-up">
                          {useCaseCards.map((useCase) => {
                            const isSelected = selectedUseCases.includes(useCase.id);
                            return (
                              <button
                                key={useCase.id}
                                type="button"
                                onClick={() => toggleUseCase(useCase.id)}
                                className={`text-left rounded-md transition-all ${
                                  isSelected
                                    ? "bg-blue-100/80"
                                    : "bg-slate-100 hover:bg-slate-200/70"
                                }`}
                              >
                                <div className="h-[148px] p-4 flex flex-col items-start gap-4">
                                  <HStack justify="between" align="center" className="w-full">
                                    <p className="font-semibold text-slate-900">{useCase.name}</p>
                                    {isSelected ? (
                                      <CheckSquare2 className="h-4 w-4 text-slate-700" />
                                    ) : (
                                      <Square className="h-4 w-4 text-slate-500" />
                                    )}
                                  </HStack>
                                  <div>
                                    <p className="text-sm text-slate-600">{useCase.detail}</p>
                                    <p className="text-xs text-slate-500">{useCase.eta}</p>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                      <HStack justify="end" className="mt-4">
                        <Button
                          variant="secondary"
                          className="!px-3 !py-1 !text-xs !rounded bg-slate-900 text-white hover:bg-slate-800"
                          onClick={openUseCaseAgentModal}
                        >
                          <HStack gap="xs" align="center">
                            <Plus className="h-3.5 w-3.5" />
                            <span>Add Use Case</span>
                          </HStack>
                        </Button>
                      </HStack>
                    </div>
                  </div>
                </section>
                ) : null}

                {selectedIndustry && selectedUseCases.length > 0 ? (
                <section className="w-full fade-in-up">
                  <div className="grid grid-cols-[40px_minmax(0,1fr)] gap-4 items-start">
                    <div className="flex flex-col items-center self-stretch pt-1">
                      <Database className="h-7 w-7 text-slate-600 mt-0.5" />
                      <div className="mt-3 w-px flex-1 bg-slate-300" />
                    </div>

                    <div>
                      <HStack gap="sm" align="start" className="mb-8">
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">
                            Data Source Connections
                          </h3>
                          <p className="text-sm text-slate-500">Select a source and connect with credentials.</p>
                        </div>
                      </HStack>
                      {isDataSourceLoading ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 fade-in-up">
                          {[...Array(8)].map((_, index) => (
                            <div key={index} className="h-[148px] rounded-md bg-slate-100 animate-pulse" />
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 fade-in-up">
                          {dataSources.map((source) => {
                            const isConnected = Boolean(connectedSources[source.id]);
                            const SourceIcon = source.icon;
                            return (
                              <button
                                key={source.id}
                                type="button"
                                onClick={() => handleDataSourceClick(source.id)}
                                className="text-left rounded-md border border-slate-200 bg-white shadow-none transition duration-200 hover:bg-white hover:shadow-md"
                              >
                                <div className="h-[148px] p-4 flex flex-col items-start gap-4">
                                  <HStack gap="sm" align="center">
                                    <SourceIcon className="h-4.5 w-4.5 text-slate-600" />
                                    <p className="text-sm font-semibold text-slate-800">{source.name}</p>
                                  </HStack>
                                  <div className="mt-auto">
                                    {isConnected ? (
                                      <Badge variant="success">Connected</Badge>
                                    ) : (
                                      <Button
                                        variant="secondary"
                                        className="!px-3 !py-1 !text-xs !rounded bg-slate-900 text-white hover:bg-slate-800"
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          setSelectedDataSource(source.id);
                                          setIsSapModalOpen(true);
                                        }}
                                      >
                                        Connect
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}

                    </div>
                  </div>
                </section>
                ) : null}

              </VStack>
            </div>
          </HStack>
        </div>
      </Container>

      <FlowNavigationFooter
        nextLabel="Continue to Data Sources"
        nextDisabled={!canContinue}
        onNext={() => {
          if (!companyProfile) return;
          setFlowState({
            ...flowState,
            selectedIndustry,
            companyProfile,
            selectedUseCases,
            connectedSources,
            dataSourceConfigs: flowState.dataSourceConfigs.filter((config) => connectedSources[config.sourceId]),
          });
          navigate("/configuration");
        }}
        leftContent={
          <p className="text-sm text-slate-500">
            Selected industry:{" "}
            <span className="font-semibold text-slate-700">
              {industries.find((industry) => industry.id === selectedIndustry)?.name ?? "Not selected"}
            </span>
          </p>
        }
      />

      {isUseCaseAgentPanelOpen ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close use case chat"
            className="absolute inset-0 bg-slate-900/25"
            onClick={() => {
              setIsUseCaseAgentPanelOpen(false);
              resetUseCaseAgent();
            }}
          />
          <aside className="absolute right-0 top-0 h-full w-full max-w-[430px] border-l border-slate-200 bg-slate-50 shadow-2xl">
            <div className="h-full flex flex-col">
              <div className="border-b border-slate-200 px-4 py-3">
                <HStack justify="between" align="center">
                  <HStack gap="sm" align="center">
                    <span className="inline-flex h-7 w-7 items-center justify-center">
                      <img src={atlasAiLogo} alt="Atlas AI" className="h-5 w-5 object-contain" />
                    </span>
                    <h3 className="text-base font-semibold text-slate-900">Atlas</h3>
                  </HStack>
                  <Button
                    variant="ghost"
                    aria-label="Close use case chat panel"
                    className="!p-2"
                    onClick={() => {
                      setIsUseCaseAgentPanelOpen(false);
                      resetUseCaseAgent();
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </HStack>
              </div>

              <div className="mt-4 min-h-0 flex-1 overflow-y-auto px-5">
                <VStack gap="sm">
                  {useCaseAgentMessages.map((message) => (
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
                            <span className="inline-flex h-6 w-6 items-center justify-center">
                              <img src={atlasAiLogo} alt="Atlas AI" className="h-4 w-4 object-contain" />
                            </span>
                            <p className="text-sm font-semibold text-slate-900">Use case Agent</p>
                          </HStack>
                          <p className="mt-2 text-sm text-slate-800">{message.content}</p>
                          {message.outline ? (
                            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 mt-2">
                              {message.outline.map((line) => (
                                <li key={line}>{line}</li>
                              ))}
                            </ul>
                          ) : null}
                          {message.canAccept ? (
                            <HStack justify="end" className="w-full mt-3">
                              <Button
                                variant="primary"
                                onClick={confirmUseCaseDraft}
                                disabled={!generatedUseCaseDraft || isGeneratingUseCaseOutline}
                              >
                                Accept use case
                              </Button>
                            </HStack>
                          ) : null}
                        </div>
                      )}
                    </div>
                  ))}

                  {isGeneratingUseCaseOutline ? (
                    <div className="w-full rounded-md bg-violet-100/70 p-3 animate-pulse">
                      <p className="text-sm font-semibold mb-1">Use case Agent</p>
                      <p className="text-sm text-slate-600">Thinking through your use case...</p>
                    </div>
                  ) : null}
                </VStack>
              </div>

              <div className="px-4 pb-4 pt-3">
                <Textarea
                  placeholder="Send a message to your agent"
                  value={useCasePrompt}
                  onChange={(event) => setUseCasePrompt(event.target.value)}
                  onKeyDown={handleUseCasePromptKeyDown}
                  resize="vertical"
                  rows={3}
                  className="rounded-md border border-slate-300 bg-white focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500"
                />
                <p className="mt-2 text-xs text-slate-500">
                  AI doesn&apos;t always get it right. Review generated content before accepting.
                </p>
              </div>
            </div>
          </aside>
        </div>
      ) : null}

      <Modal
        isOpen={isCompanyProfileModalOpen}
        onClose={() => {
          setIsCompanyProfileModalOpen(false);
          if (!companyProfile) {
            setSelectedIndustry("");
          }
        }}
        title="Add company context"
        description="Provide the company details required to personalize your onboarding flow."
        size="md"
      >
        <ModalContent>
          <VStack gap="sm">
            <Input
              label="Company name"
              value={companyProfileDraft.companyName}
              onChange={(event) =>
                setCompanyProfileDraft((prev) => ({ ...prev, companyName: event.target.value }))
              }
              required
            />
            <Input
              label="Number of sites"
              type="number"
              value={companyProfileDraft.siteCount}
              onChange={(event) =>
                setCompanyProfileDraft((prev) => ({ ...prev, siteCount: event.target.value }))
              }
              min={1}
              required
            />
            <Input
              label="Site owner name"
              value={companyProfileDraft.ownerName}
              onChange={(event) =>
                setCompanyProfileDraft((prev) => ({ ...prev, ownerName: event.target.value }))
              }
              required
            />
            <Input
              label="Site owner title"
              value={companyProfileDraft.ownerTitle}
              onChange={(event) =>
                setCompanyProfileDraft((prev) => ({ ...prev, ownerTitle: event.target.value }))
              }
              required
            />
          </VStack>
        </ModalContent>
        <ModalFooter justify="end">
          <HStack gap="sm">
            <Button
              variant="outline"
              onClick={() => {
                setIsCompanyProfileModalOpen(false);
                if (!companyProfile) {
                  setSelectedIndustry("");
                }
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCompanyProfileSubmit}>
              Save and continue
            </Button>
          </HStack>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={isSapModalOpen}
        onClose={() => setIsSapModalOpen(false)}
        title={`Connect ${selectedSourceName}`}
        description="Enter credentials to authenticate this data source."
        size="md"
      >
        <ModalContent>
          <VStack gap="sm">
            <div className="rounded-md bg-slate-50 border border-slate-200 p-3">
              <p className="text-sm font-semibold text-slate-800 mb-2">Key Access Credentials</p>
              <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
                <li>User ID/Username: Typically a unique, company-assigned ID.</li>
                <li>Password: Case-sensitive, with modern systems allowing up to 40 characters.</li>
                <li>Universal or Account ID: Single-sign-on account where applicable.</li>
                <li>Client or Tenant Number: Environment identifier if required.</li>
              </ul>
            </div>

            <Input
              label="User ID / Username"
              value={sapCredentials.username}
              onChange={(event) =>
                setSapCredentials((prev) => ({ ...prev, username: event.target.value }))
              }
              required
            />
            <Input
              label="Password"
              type="password"
              value={sapCredentials.password}
              onChange={(event) =>
                setSapCredentials((prev) => ({ ...prev, password: event.target.value }))
              }
              required
            />
            <Input
              label="Universal / Account ID"
              value={sapCredentials.universalId}
              onChange={(event) =>
                setSapCredentials((prev) => ({ ...prev, universalId: event.target.value }))
              }
              required
            />
            <Input
              label="Client / Tenant Number"
              value={sapCredentials.clientNumber}
              onChange={(event) =>
                setSapCredentials((prev) => ({ ...prev, clientNumber: event.target.value }))
              }
              placeholder="e.g. 100"
              required
            />
          </VStack>
        </ModalContent>
        <ModalFooter justify="end">
          <HStack gap="sm">
            <Button variant="outline" onClick={() => setIsSapModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConnectSource}>
              Connect
            </Button>
          </HStack>
        </ModalFooter>
      </Modal>
    </div>
  );
};

