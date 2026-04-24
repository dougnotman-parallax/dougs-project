import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Container,
  HStack,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  Toast,
  ToastContainer,
  VStack,
} from "cdf-design-system-alpha";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  ClipboardList,
  Database,
  FileText,
  LineChart,
  Network,
  Plus,
  Settings2,
  Workflow,
  Wrench,
  Boxes,
} from "lucide-react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import appLogo from "../assets/logo.svg";
import { FlowNavigationFooter } from "../components/FlowNavigationFooter";
import { useOnboardingFlow, type DataSourceConfigState } from "../context/OnboardingFlowContext";

type Step = {
  id: number;
  title: string;
  subtitle: string;
};

type DataSourceCatalogItem = {
  id: string;
  name: string;
  icon: LucideIcon;
};

type SapWizardState = {
  connectivity: {
    odata: boolean;
    rfc: boolean;
    odp: boolean;
  };
  domains: string[];
  deltaStrategy: string[];
  plants: string;
  orderTypes: string;
  timestampField: string;
  schedule: string;
};

const setupSteps: Step[] = [
  { id: 1, title: "Discovery", subtitle: "Industry & Use cases" },
  { id: 2, title: "Configuration", subtitle: "Data sources" },
  { id: 3, title: "Integration", subtitle: "AI Agent Setup" },
  { id: 4, title: "Contextualization", subtitle: "Mapping validation" },
  { id: 5, title: "Launch", subtitle: "Go Live" },
];

const dataSourceCatalog: DataSourceCatalogItem[] = [
  { id: "pi", name: "PI System", icon: Database },
  { id: "opcua", name: "OPC-UA", icon: Network },
  { id: "sap", name: "SAP", icon: Boxes },
  { id: "maximo", name: "Maximo", icon: Wrench },
  { id: "historians", name: "Historians", icon: LineChart },
  { id: "cmms", name: "CMMS", icon: Settings2 },
  { id: "eam", name: "EAM", icon: ClipboardList },
  { id: "dms", name: "DMS", icon: FileText },
];

const sapWizardSteps = [
  "Connect to SAP System",
  "Select Data Domains",
  "Configure Delta Strategy",
  "Apply Filters & Mapping",
  "Schedule & Go Live",
] as const;

const sapDomainOptions = [
  "Maintenance Orders",
  "Notifications",
  "Equipment Masters",
  "Functional Locations",
];

const sapDeltaStrategyOptions = [
  "ODP Delta Queue",
  "Change Pointers (BDCP2)",
  "Timestamp-Based Delta",
  "Document Number Ranges",
];

const initialSapWizardState: SapWizardState = {
  connectivity: {
    odata: false,
    rfc: false,
    odp: false,
  },
  domains: [],
  deltaStrategy: [],
  plants: "",
  orderTypes: "",
  timestampField: "",
  schedule: "Every 15 minutes",
};

const createDefaultConfig = (
  sourceId: string,
  index: number,
  ownerName: string,
  ownerTitle: string
): DataSourceConfigState => ({
  sourceId,
  progress: Math.min(25 + index * 18, 92),
  status: index === 0 ? "loading" : "pending",
  setupCompleted: sourceId !== "sap",
  selectedDomains: [],
  deltaStrategy: "",
  plants: "",
  orderTypes: "",
  timestampField: "",
  schedule: "Every 15 minutes",
  ownerName,
  ownerTitle,
  ownerEmail: `${ownerName.toLowerCase().replace(/\s+/g, ".")}@company.com`,
  pollingIntervalMinutes: "15",
  autoIngest: true,
  qualityChecks: true,
  isCollapsed: index > 1,
});

const isSapWizardStepValid = (step: number, state: SapWizardState) => {
  if (step === 0) {
    return Object.values(state.connectivity).some(Boolean);
  }
  if (step === 1) {
    return state.domains.length > 0;
  }
  if (step === 2) {
    return state.deltaStrategy.length > 0;
  }
  if (step === 3) {
    return Boolean(state.plants.trim() && state.timestampField.trim());
  }

  return true;
};

const statusBadge = (status: DataSourceConfigState["status"]) => {
  switch (status) {
    case "complete":
      return (
        <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700">
          Complete
        </span>
      );
    case "loading":
      return (
        <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700">
          Loading
        </span>
      );
    case "error":
      return (
        <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium bg-rose-100 text-rose-700">
          Error
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-700">
          Pending
        </span>
      );
  }
};

const ProgressSpinner = ({ progress }: { progress: number }) => {
  const safeProgress = Math.max(0, Math.min(100, progress));
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setAnimatedProgress(safeProgress);
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [safeProgress]);

  return (
    <span className="relative inline-flex h-8 w-8 items-center justify-center">
      <CircularProgressbarWithChildren
        value={animatedProgress}
        strokeWidth={12}
        styles={buildStyles({
          pathColor: "rgb(59 130 246)",
          trailColor: "rgb(226 232 240)",
          pathTransitionDuration: 0.9,
          strokeLinecap: "round",
        })}
      >
        <span className="h-5 w-5 rounded-full bg-white" />
      </CircularProgressbarWithChildren>
    </span>
  );
};

export const ConfigurationPage = () => {
  const navigate = useNavigate();
  const { flowState, updateFlowState } = useOnboardingFlow();
  const { selectedIndustry, companyProfile, dataSourceConfigs, connectedSources } = flowState;
  const [isSapWizardOpen, setIsSapWizardOpen] = useState(false);
  const [sapWizardStep, setSapWizardStep] = useState(0);
  const [sapWizardState, setSapWizardState] = useState<SapWizardState>(initialSapWizardState);
  const [loadSuccessToasts, setLoadSuccessToasts] = useState<
    Array<{ id: string; sourceName: string }>
  >([]);
  const progressTimelineRef = useRef<
    Record<
      string,
      {
        startAt: number;
        from: number;
        duration: number;
      }
    >
  >({});
  const completedToastSourcesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!selectedIndustry || !companyProfile) {
      navigate("/");
      return;
    }

    if (dataSourceConfigs.length > 0) return;

    const enabledSourceIds = Object.entries(connectedSources)
      .filter(([, connected]) => connected)
      .map(([id]) => id);

    if (enabledSourceIds.length === 0) return;

    updateFlowState((current) => ({
      ...current,
      dataSourceConfigs: enabledSourceIds.map((sourceId, index) =>
        createDefaultConfig(sourceId, index, companyProfile.ownerName, companyProfile.ownerTitle)
      ),
    }));
  }, [
    companyProfile,
    connectedSources,
    dataSourceConfigs.length,
    navigate,
    selectedIndustry,
    updateFlowState,
  ]);

  useEffect(() => {
    const hasActiveConfigs = dataSourceConfigs.some(
      (config) => config.setupCompleted && config.progress < 100
    );
    if (!hasActiveConfigs) return;

    const intervalId = window.setInterval(() => {
      const now = Date.now();

      updateFlowState((current) => {
        let hasAnyChange = false;
        let staggerIndex = 0;

        const nextConfigs = current.dataSourceConfigs.map((config) => {
          if (!config.setupCompleted) {
            return config;
          }

          const sourceId = config.sourceId;
          const timeline = progressTimelineRef.current[sourceId];

          if (!timeline) {
            progressTimelineRef.current[sourceId] = {
              startAt: now + staggerIndex * 900,
              from: Math.max(0, Math.min(100, config.progress)),
              duration: 3000 + staggerIndex * 1200,
            };
          }

          staggerIndex += 1;

          const activeTimeline = progressTimelineRef.current[sourceId];
          if (!activeTimeline) {
            return config;
          }

          if (now < activeTimeline.startAt) {
            const pendingStatus: DataSourceConfigState["status"] =
              config.progress >= 100 ? "complete" : "pending";
            if (config.status !== pendingStatus) {
              hasAnyChange = true;
              return {
                ...config,
                status: pendingStatus,
              };
            }
            return config;
          }

          const elapsed = now - activeTimeline.startAt;
          const ratio = Math.max(0, Math.min(1, elapsed / activeTimeline.duration));
          const targetProgress = Math.round(
            activeTimeline.from + (100 - activeTimeline.from) * ratio
          );
          const nextProgress = Math.max(config.progress, targetProgress);
          const nextStatus: DataSourceConfigState["status"] =
            nextProgress >= 100 ? "complete" : "loading";

          if (nextProgress === config.progress && nextStatus === config.status) {
            return config;
          }

          hasAnyChange = true;
          return {
            ...config,
            progress: nextProgress,
            status: nextStatus,
          };
        });

        if (!hasAnyChange) {
          return current;
        }

        return {
          ...current,
          dataSourceConfigs: nextConfigs,
        };
      });
    }, 140);

    return () => window.clearInterval(intervalId);
  }, [dataSourceConfigs, updateFlowState]);

  useEffect(() => {
    dataSourceConfigs.forEach((config) => {
      if (!config.setupCompleted || config.progress < 100) return;
      if (completedToastSourcesRef.current.has(config.sourceId)) return;

      completedToastSourcesRef.current.add(config.sourceId);
      const sourceName = dataSourceCatalog.find((item) => item.id === config.sourceId)?.name ?? config.sourceId;

      setLoadSuccessToasts((current) => [
        ...current,
        {
          id: `${config.sourceId}-${Date.now()}`,
          sourceName,
        },
      ]);
    });
  }, [dataSourceConfigs]);

  if (!selectedIndustry || !companyProfile) {
    return null;
  }

  const configuredIds = new Set(dataSourceConfigs.map((config) => config.sourceId));
  const availableSources = dataSourceCatalog.filter((source) => !configuredIds.has(source.id));

  const updateConfig = (sourceId: string, updater: (current: DataSourceConfigState) => DataSourceConfigState) => {
    updateFlowState((current) => ({
      ...current,
      dataSourceConfigs: current.dataSourceConfigs.map((config) =>
        config.sourceId === sourceId ? updater(config) : config
      ),
    }));
  };

  const addSource = (sourceId: string) => {
    updateFlowState((current) => ({
      ...current,
      connectedSources: { ...current.connectedSources, [sourceId]: true },
      dataSourceConfigs: [
        ...current.dataSourceConfigs,
        createDefaultConfig(
          sourceId,
          current.dataSourceConfigs.length,
          current.companyProfile?.ownerName ?? "Site Owner",
          current.companyProfile?.ownerTitle ?? "Operations Lead"
        ),
      ],
    }));
  };

  const openSapWizard = () => {
    setSapWizardStep(0);
    setSapWizardState(initialSapWizardState);
    setIsSapWizardOpen(true);
  };

  const completeSapWizard = () => {
    updateFlowState((current) => ({
      ...current,
      dataSourceConfigs: current.dataSourceConfigs.map((config) =>
        config.sourceId === "sap"
          ? {
              ...config,
              setupCompleted: true,
              isCollapsed: false,
              status: "loading",
              progress: Math.max(config.progress, 35),
              selectedDomains: sapWizardState.domains,
              deltaStrategy: sapWizardState.deltaStrategy.join(", "),
              plants: sapWizardState.plants,
              orderTypes: sapWizardState.orderTypes,
              timestampField: sapWizardState.timestampField,
              schedule: sapWizardState.schedule,
            }
          : config
      ),
    }));
    setIsSapWizardOpen(false);
  };

  const canAdvanceWizard = isSapWizardStepValid(sapWizardStep, sapWizardState);
  const isFinalWizardStep = sapWizardStep === sapWizardSteps.length - 1;

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
                      Step 2of 5
                    </p>
                  </HStack>
                </div>

                {setupSteps.map((step) => {
                  const isCompleted = step.id === 1;
                  const isActive = step.id === 2;
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
                      <Workflow className="h-7 w-7 text-slate-600 mt-0.5" />
                      <div className="mt-3 w-px flex-1 bg-slate-300" />
                    </div>
                    <div>
                      <HStack gap="sm" align="start" className="mb-8">
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">
                            Configuration - Data sources
                          </h3>
                          <p className="text-sm text-slate-500">
                            Configure ingestion, quality, ownership, and controls for enabled sources.
                          </p>
                        </div>
                      </HStack>

                      <VStack gap="none" className="w-full gap-y-6">
                        {dataSourceConfigs.map((config) => {
                          const source = dataSourceCatalog.find((item) => item.id === config.sourceId);
                          if (!source) return null;
                          const SourceIcon = source.icon;
                          const isSapPendingSetup = config.sourceId === "sap" && !config.setupCompleted;
                          if (isSapPendingSetup) {
                            return (
                              <Card
                                key={config.sourceId}
                                className="!p-0 border border-slate-200 bg-white rounded-md"
                              >
                                <CardContent className="p-4">
                                  <HStack justify="between" align="center" className="w-full">
                                    <HStack gap="sm" align="center">
                                      <SourceIcon className="h-4.5 w-4.5 text-slate-600" />
                                      <VStack gap="xs" className="items-start">
                                        <p className="text-sm font-semibold text-slate-900">{source.name}</p>
                                        <p className="text-xs text-slate-500">
                                          Setup required before this source can be configured.
                                        </p>
                                      </VStack>
                                    </HStack>
                                    <Button
                                      variant="secondary"
                                      className="!px-3 !py-1 !text-xs !rounded bg-slate-900 text-white hover:bg-slate-800"
                                      onClick={openSapWizard}
                                    >
                                      Setup
                                    </Button>
                                  </HStack>
                                </CardContent>
                              </Card>
                            );
                          }

                          return (
                            <Card key={config.sourceId} className="!p-0 border border-slate-200 bg-white rounded-md">
                              <CardContent className="p-4">
                                <button
                                  type="button"
                                  className="w-full text-left"
                                  onClick={() =>
                                    updateConfig(config.sourceId, (current) => ({
                                      ...current,
                                      isCollapsed: !current.isCollapsed,
                                    }))
                                  }
                                >
                                  <HStack justify="between" align="center" className="w-full">
                                    <HStack gap="sm" align="center">
                                      <SourceIcon className="h-4.5 w-4.5 text-slate-600" />
                                      <p className="text-sm font-semibold text-slate-900">{source.name}</p>
                                    </HStack>
                                    <HStack gap="sm" align="center">
                                      <div className="w-32 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                                        <div
                                          className="h-full bg-slate-900 progress-grow-on-load"
                                          style={{ width: `${Math.max(2, config.progress)}%` }}
                                        />
                                      </div>
                                      {statusBadge(config.status)}
                                      {config.isCollapsed ? (
                                        <ChevronRight className="h-4 w-4 text-slate-500" />
                                      ) : (
                                        <ChevronDown className="h-4 w-4 text-slate-500" />
                                      )}
                                    </HStack>
                                  </HStack>
                                </button>

                                {config.isCollapsed ? null : (
                                  <div className="mt-5 border-t border-slate-100 pt-6">
                                    <VStack gap="lg" className="items-start">
                                      <div className="w-full">
                                        <p className="text-sm font-semibold text-slate-900 mb-5">
                                          Ingestion controls
                                        </p>
                                        {config.sourceId === "sap" ? (
                                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                            {["OData ingestion", "RFC ingestion", "ODP ingestion"].map((label) => (
                                              <div
                                                key={label}
                                                className="rounded-md border border-slate-200 bg-slate-50 p-3"
                                              >
                                                <HStack gap="sm" align="center">
                                                  <ProgressSpinner progress={config.progress} />
                                                  <div>
                                                    <p className="text-xs font-semibold text-slate-800">
                                                      {label}
                                                    </p>
                                                    <p className="text-xs text-slate-500">
                                                      {config.progress}% synced
                                                    </p>
                                                  </div>
                                                </HStack>
                                              </div>
                                            ))}
                                          </div>
                                        ) : null}

                                        <div className="grid grid-cols-1 gap-6">
                                          <div className="max-w-[400px]">
                                            <Input
                                              label="Polling interval (minutes)"
                                              value={config.pollingIntervalMinutes}
                                              onChange={(event) =>
                                                updateConfig(config.sourceId, (current) => ({
                                                  ...current,
                                                  pollingIntervalMinutes: event.target.value,
                                                }))
                                              }
                                            />
                                          </div>
                                          <div className="flex flex-col gap-5 pt-2">
                                            <label className="flex w-full items-center gap-2 text-sm text-slate-700">
                                              <input
                                                type="checkbox"
                                                checked={config.autoIngest}
                                                onChange={(event) =>
                                                  updateConfig(config.sourceId, (current) => ({
                                                    ...current,
                                                    autoIngest: event.target.checked,
                                                  }))
                                                }
                                              />
                                              Auto-ingest new records
                                            </label>
                                            <label className="flex w-full items-center gap-2 text-sm text-slate-700">
                                              <input
                                                type="checkbox"
                                                checked={config.qualityChecks}
                                                onChange={(event) =>
                                                  updateConfig(config.sourceId, (current) => ({
                                                    ...current,
                                                    qualityChecks: event.target.checked,
                                                  }))
                                                }
                                              />
                                              Run quality checks on ingest
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </VStack>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          );
                        })}
                      </VStack>

                    </div>
                  </div>
                </section>

                <section className="w-full fade-in-up">
                  <div className="grid grid-cols-[40px_minmax(0,1fr)] gap-4 items-start">
                    <div className="flex flex-col items-center self-stretch pt-1">
                      <Plus className="h-7 w-7 text-slate-600 mt-0.5" />
                      <div className="mt-3 w-px flex-1 bg-slate-300" />
                    </div>
                    <div>
                      <HStack gap="sm" align="start" className="mb-8">
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">
                            Add additional data sources
                          </h3>
                          <p className="text-sm text-slate-500">
                            Include sources not enabled in discovery and configure them here.
                          </p>
                        </div>
                      </HStack>

                      {availableSources.length === 0 ? (
                        <p className="text-xs text-slate-500">All available sources are already enabled.</p>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
                          {availableSources.map((source) => {
                            const SourceIcon = source.icon;
                            return (
                              <Button
                                key={source.id}
                                variant="secondary"
                                onClick={() => addSource(source.id)}
                                className="!px-3 !py-1 !text-xs !rounded bg-slate-900 text-white hover:bg-slate-800 justify-start"
                              >
                                <HStack gap="xs" align="center">
                                  <Plus className="h-3.5 w-3.5" />
                                  <SourceIcon className="h-3.5 w-3.5" />
                                  <span>{source.name}</span>
                                </HStack>
                              </Button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </section>

              </VStack>
            </div>
          </HStack>
        </div>
      </Container>

      <FlowNavigationFooter
        backLabel="Back to Discovery"
        onBack={() => navigate("/")}
        nextLabel="Continue to Integration"
        onNext={() => navigate("/integration")}
        nextIcon={<Activity className="h-4 w-4" />}
      />

      <ToastContainer position="top-right" maxToasts={4}>
        {loadSuccessToasts.map((toast) => (
          <Toast
            key={toast.id}
            variant="success"
            title={`${toast.sourceName} load complete`}
            description="Progress reached 100% and ingestion is ready."
            duration={3000}
            dismissible
            className="!border-slate-900 !bg-slate-900 [&_*]:!text-white"
            onDismiss={() =>
              setLoadSuccessToasts((current) => current.filter((item) => item.id !== toast.id))
            }
          />
        ))}
      </ToastContainer>

      <Modal
        isOpen={isSapWizardOpen}
        onClose={() => setIsSapWizardOpen(false)}
        title="SAP Setup"
        size="lg"
      >
        <ModalContent>
          <VStack gap="md">
            {sapWizardStep === 0 ? (
              <VStack gap="sm" className="items-start">
                <p className="text-sm font-semibold text-slate-900">Connect to SAP System</p>
                <p className="text-sm text-slate-600">
                  Select one or more connectivity options to proceed.
                </p>
                <HStack gap="sm" className="w-full">
                  <Button
                    variant={sapWizardState.connectivity.odata ? "primary" : "outline"}
                    onClick={() =>
                      setSapWizardState((current) => ({
                        ...current,
                        connectivity: { ...current.connectivity, odata: !current.connectivity.odata },
                      }))
                    }
                  >
                    Test OData
                  </Button>
                  <Button
                    variant={sapWizardState.connectivity.rfc ? "primary" : "outline"}
                    onClick={() =>
                      setSapWizardState((current) => ({
                        ...current,
                        connectivity: { ...current.connectivity, rfc: !current.connectivity.rfc },
                      }))
                    }
                  >
                    Test RFC
                  </Button>
                  <Button
                    variant={sapWizardState.connectivity.odp ? "primary" : "outline"}
                    onClick={() =>
                      setSapWizardState((current) => ({
                        ...current,
                        connectivity: { ...current.connectivity, odp: !current.connectivity.odp },
                      }))
                    }
                  >
                    Test ODP
                  </Button>
                </HStack>
              </VStack>
            ) : null}

            {sapWizardStep === 1 ? (
              <VStack gap="sm" className="items-start">
                <p className="text-sm font-semibold text-slate-900">Select Data Domains</p>
                <p className="text-sm text-slate-600">
                  Choose which SAP domains should be extracted first.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                  {sapDomainOptions.map((domain) => {
                    const selected = sapWizardState.domains.includes(domain);
                    return (
                      <label
                        key={domain}
                        className={`inline-flex items-center gap-2 rounded border px-3 py-2 text-sm ${
                          selected ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-white"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={(event) =>
                            setSapWizardState((current) => ({
                              ...current,
                              domains: event.target.checked
                                ? [...current.domains, domain]
                                : current.domains.filter((item) => item !== domain),
                            }))
                          }
                        />
                        {domain}
                      </label>
                    );
                  })}
                </div>
              </VStack>
            ) : null}

            {sapWizardStep === 2 ? (
              <VStack gap="sm" className="items-start">
                <p className="text-sm font-semibold text-slate-900">Configure Delta Strategy</p>
                <p className="text-sm text-slate-600">
                  Select one or more delta strategies for extraction.
                </p>
                <div className="flex flex-wrap gap-2">
                  {sapDeltaStrategyOptions.map((strategy) => {
                    const selected = sapWizardState.deltaStrategy.includes(strategy);
                    return (
                      <Button
                        key={strategy}
                        variant={selected ? "primary" : "outline"}
                        onClick={() =>
                          setSapWizardState((current) => ({
                            ...current,
                            deltaStrategy: selected
                              ? current.deltaStrategy.filter((item) => item !== strategy)
                              : [...current.deltaStrategy, strategy],
                          }))
                        }
                      >
                        {strategy}
                      </Button>
                    );
                  })}
                </div>
              </VStack>
            ) : null}

            {sapWizardStep === 3 ? (
              <VStack gap="sm" className="items-start">
                <p className="text-sm font-semibold text-slate-900">Apply Filters & Mapping</p>
                <p className="text-sm text-slate-600">
                  Configure plants, order types, and timestamp mapping fields.
                </p>
                <Input
                  label="Plants"
                  value={sapWizardState.plants}
                  onChange={(event) =>
                    setSapWizardState((current) => ({ ...current, plants: event.target.value }))
                  }
                  placeholder="e.g., 1000, 1100"
                />
                <Input
                  label="Order types"
                  value={sapWizardState.orderTypes}
                  onChange={(event) =>
                    setSapWizardState((current) => ({ ...current, orderTypes: event.target.value }))
                  }
                  placeholder="e.g., PM01, PM02"
                />
                <Input
                  label="Timestamp field"
                  value={sapWizardState.timestampField}
                  onChange={(event) =>
                    setSapWizardState((current) => ({
                      ...current,
                      timestampField: event.target.value,
                    }))
                  }
                  placeholder="e.g., LastChangedDateTime"
                />
              </VStack>
            ) : null}

            {sapWizardStep === 4 ? (
              <VStack gap="sm" className="items-start">
                <p className="text-sm font-semibold text-slate-900">Schedule & Go Live</p>
                <p className="text-sm text-slate-600">
                  Review summary and start first extraction.
                </p>
                <div className="w-full rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  <p>
                    <span className="font-medium">Domains:</span>{" "}
                    {sapWizardState.domains.length > 0
                      ? sapWizardState.domains.join(", ")
                      : "Not selected"}
                  </p>
                  <p>
                    <span className="font-medium">Delta strategy:</span>{" "}
                    {sapWizardState.deltaStrategy.length > 0
                      ? sapWizardState.deltaStrategy.join(", ")
                      : "Not configured"}
                  </p>
                  <p>
                    <span className="font-medium">Plants:</span>{" "}
                    {sapWizardState.plants || "Not configured"}
                  </p>
                  <p>
                    <span className="font-medium">Timestamp:</span>{" "}
                    {sapWizardState.timestampField || "Not configured"}
                  </p>
                  <p>
                    <span className="font-medium">Schedule:</span> {sapWizardState.schedule}
                  </p>
                </div>
              </VStack>
            ) : null}
          </VStack>
        </ModalContent>
        <ModalFooter justify="between">
          <Button
            variant="outline"
            onClick={() => setSapWizardStep((current) => Math.max(current - 1, 0))}
            disabled={sapWizardStep === 0}
          >
            Back
          </Button>
          {isFinalWizardStep ? (
            <Button
              variant="primary"
              onClick={completeSapWizard}
              disabled={!isSapWizardStepValid(sapWizardStep, sapWizardState)}
            >
              Start First Extraction
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => setSapWizardStep((current) => Math.min(current + 1, sapWizardSteps.length - 1))}
              disabled={!canAdvanceWizard}
            >
              Next step
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
};
