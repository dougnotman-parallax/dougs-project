import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Container, HStack, VStack } from "cdf-design-system-alpha";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Bell,
  Boxes,
  ClipboardList,
  CircleCheck,
  Database,
  Link2,
  Network,
  SearchCheck,
  Shield,
  ShieldAlert,
  Tags,
  Workflow,
  Download,
  Wrench,
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

type MappingAgent = {
  name: string;
  detail: string;
  status: "complete" | "loading" | "pending";
  metric: string;
  icon: LucideIcon;
};

const setupSteps: Step[] = [
  { id: 1, title: "Discovery", subtitle: "Industry & Use cases" },
  { id: 2, title: "Configuration", subtitle: "Data sources" },
  { id: 3, title: "Integration", subtitle: "AI Agent Setup" },
  { id: 4, title: "Contextualization", subtitle: "Mapping validation" },
  { id: 5, title: "Launch", subtitle: "Go Live" },
];

const mappingAgents: MappingAgent[] = [
  {
    name: "Authentication Agent",
    detail: "Credentials validated",
    status: "complete",
    metric: "2 min ago",
    icon: CircleCheck,
  },
  {
    name: "Asset Discovery Agent",
    detail: "Enumerating assets...",
    status: "loading",
    metric: "1,247 found",
    icon: SearchCheck,
  },
  {
    name: "Time Series Agent",
    detail: "Scanning data streams...",
    status: "loading",
    metric: "8,456 streams",
    icon: Activity,
  },
  {
    name: "Event Scanner Agent",
    detail: "Collecting events & alarms...",
    status: "loading",
    metric: "3,892 events",
    icon: Workflow,
  },
  {
    name: "Work Order Agent",
    detail: "Queued for processing...",
    status: "pending",
    metric: "Waiting",
    icon: Link2,
  },
  {
    name: "Tag Mapping Agent",
    detail: "Awaiting asset data...",
    status: "pending",
    metric: "Waiting",
    icon: ShieldAlert,
  },
];

const discoveryStats = [
  {
    id: "assets-found",
    label: "Assets Found",
    value: 1247,
    icon: Boxes,
    iconClass: "text-blue-600",
  },
  {
    id: "timeseries",
    label: "Time Series",
    value: 8456,
    icon: Activity,
    iconClass: "text-emerald-600",
  },
  {
    id: "tags-mapped",
    label: "Tags Mapped",
    value: 24892,
    icon: Tags,
    iconClass: "text-violet-600",
  },
  {
    id: "events-alarms",
    label: "Events/Alarms",
    value: 3892,
    icon: Bell,
    iconClass: "text-amber-600",
  },
  {
    id: "work-orders",
    label: "Work Orders",
    value: 1056,
    icon: ClipboardList,
    iconClass: "text-rose-600",
  },
] as const;

export const IntegrationPage = () => {
  const navigate = useNavigate();
  const { flowState } = useOnboardingFlow();
  const { selectedIndustry, companyProfile } = flowState;
  const statsSectionRef = useRef<HTMLDivElement | null>(null);
  const [shouldAnimateStats, setShouldAnimateStats] = useState(false);
  const [animatedStatValues, setAnimatedStatValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(discoveryStats.map((stat) => [stat.id, 0]))
  );

  if (!selectedIndustry || !companyProfile) {
    navigate("/");
    return null;
  }

  const activeAgents = useMemo(
    () => mappingAgents.filter((agent) => agent.status !== "pending").length,
    []
  );

  useEffect(() => {
    const node = statsSectionRef.current;
    if (!node || shouldAnimateStats) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldAnimateStats(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldAnimateStats]);

  useEffect(() => {
    if (!shouldAnimateStats) return;

    const startTime = performance.now();
    const durationMs = 1400;
    const staggerMs = 140;
    let rafId = 0;

    const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

    const tick = (now: number) => {
      let allDone = true;
      const nextValues: Record<string, number> = {};

      discoveryStats.forEach((stat, index) => {
        const statStart = startTime + index * staggerMs;
        const rawProgress = (now - statStart) / durationMs;
        const boundedProgress = Math.max(0, Math.min(1, rawProgress));
        const eased = easeOutCubic(boundedProgress);
        const nextValue = Math.round(stat.value * eased);
        nextValues[stat.id] = nextValue;
        if (boundedProgress < 1) {
          allDone = false;
        }
      });

      setAnimatedStatValues(nextValues);

      if (!allDone) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [shouldAnimateStats]);

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
                      Step 3of 5
                    </p>
                  </HStack>
                </div>

                {setupSteps.map((step) => {
                  const isCompleted = step.id < 3;
                  const isActive = step.id === 3;
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
                      <HStack justify="between" className="w-full mb-8">
                        <VStack gap="xs" className="items-start">
                          <p className="text-base font-semibold text-slate-900">Connection Agents Status</p>
                          <p className="text-xs text-slate-500">
                            Real-time monitoring of autonomous integration agents.
                          </p>
                        </VStack>
                        <VStack gap="none" className="items-end">
                          <p className="text-2xl font-semibold text-slate-900">
                            {activeAgents}/{mappingAgents.length}
                          </p>
                          <p className="text-xs text-slate-500">Agents Active</p>
                        </VStack>
                      </HStack>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                        {mappingAgents.map((agent) => {
                          const statusDotClass =
                            agent.status === "complete"
                              ? "bg-emerald-500"
                              : agent.status === "loading"
                                ? "bg-blue-500"
                                : "bg-amber-500";
                          return (
                            <Card
                              key={agent.name}
                              className="!p-0 !rounded-md border border-slate-200 bg-white shadow-none transition duration-200 hover:bg-white hover:shadow-md"
                            >
                              <CardContent className="h-[148px] p-5 flex flex-col items-start gap-3">
                                <HStack justify="end" align="start" className="w-full">
                                  {agent.status === "loading" ? (
                                    <span className="relative inline-flex h-2.5 w-2.5">
                                      <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-70 animate-ping" />
                                      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${statusDotClass}`} />
                                    </span>
                                  ) : (
                                    <span className={`inline-flex h-2.5 w-2.5 rounded-full ${statusDotClass}`} />
                                  )}
                                </HStack>
                                <div>
                                  <p className="text-sm font-semibold text-slate-900">{agent.name}</p>
                                  <p className="text-sm text-slate-600">{agent.detail}</p>
                                </div>
                                <HStack justify="between" className="w-full mt-auto">
                                  <StatusBadge
                                    label={
                                      agent.status === "loading"
                                        ? "In Progress"
                                        : agent.status.charAt(0).toUpperCase() + agent.status.slice(1)
                                    }
                                    tone={
                                      agent.status === "complete"
                                        ? "success"
                                        : agent.status === "loading"
                                          ? "neutral"
                                          : "warning"
                                    }
                                    spinning={agent.status === "loading"}
                                  />
                                  <p className="text-xs text-slate-500">{agent.metric}</p>
                                </HStack>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </section>

                <section className="w-full fade-in-up">
                  <div className="grid grid-cols-[40px_minmax(0,1fr)] gap-4 items-start">
                    <div className="flex flex-col items-center self-stretch pt-1">
                      <Shield className="h-7 w-7 text-slate-600 mt-0.5" />
                      <div className="mt-3 w-px flex-1 bg-slate-300" />
                    </div>
                    <div>
                      <HStack gap="sm" align="start" className="mb-8">
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">
                            Connections & Permissions
                          </h3>
                          <p className="text-sm text-slate-500">
                            Review source connectivity and security posture before validation.
                          </p>
                        </div>
                      </HStack>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Card className="!p-0 border border-slate-200 bg-white rounded-md">
                          <CardContent className="p-4">
                            <VStack gap="sm" className="items-start">
                              <p className="text-base font-semibold text-slate-900">Connection Details</p>
                              <div className="w-full space-y-3">
                                {[
                                  {
                                    id: "pi-system",
                                    name: "PI System",
                                    endpoint: "pi.company.com",
                                    status: "Connected",
                                    icon: Database,
                                    iconClass: "text-blue-600",
                                    statusClass: "text-emerald-700",
                                    dotClass: "bg-emerald-500",
                                  },
                                  {
                                    id: "opcua-server",
                                    name: "OPC-UA Server",
                                    endpoint: "opc.tcp://server:4840",
                                    status: "Connected",
                                    icon: Network,
                                    iconClass: "text-green-600",
                                    statusClass: "text-emerald-700",
                                    dotClass: "bg-emerald-500",
                                  },
                                  {
                                    id: "sap-erp",
                                    name: "SAP ERP",
                                    endpoint: "sap.company.com",
                                    status: "Connected",
                                    icon: Boxes,
                                    iconClass: "text-orange-600",
                                    statusClass: "text-emerald-700",
                                    dotClass: "bg-emerald-500",
                                  },
                                  {
                                    id: "maximo",
                                    name: "Maximo",
                                    endpoint: "maximo.company.com",
                                    status: "Connecting",
                                    icon: Wrench,
                                    iconClass: "text-violet-600",
                                    statusClass: "text-blue-700",
                                    dotClass: "bg-blue-500",
                                    pulse: true,
                                  },
                                ].map((item) => {
                                  const ItemIcon = item.icon;
                                  return (
                                    <HStack
                                      key={item.id}
                                      justify="between"
                                      className="w-full rounded-md bg-slate-50 px-3 py-3"
                                    >
                                      <HStack gap="sm" align="center">
                                        <ItemIcon className={`h-4.5 w-4.5 ${item.iconClass}`} />
                                        <VStack gap="none" className="items-start">
                                          <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                                          <p className="text-xs text-slate-500">{item.endpoint}</p>
                                        </VStack>
                                      </HStack>
                                      <HStack gap="xs" align="center">
                                        {item.pulse ? (
                                          <span className="relative inline-flex h-2.5 w-2.5">
                                            <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-70 animate-ping" />
                                            <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${item.dotClass}`} />
                                          </span>
                                        ) : (
                                          <span className={`inline-flex h-2.5 w-2.5 rounded-full ${item.dotClass}`} />
                                        )}
                                        <p className={`text-sm font-medium ${item.statusClass}`}>{item.status}</p>
                                      </HStack>
                                    </HStack>
                                  );
                                })}
                              </div>
                            </VStack>
                          </CardContent>
                        </Card>

                        <Card className="!p-0 border border-slate-200 bg-white rounded-md">
                          <CardContent className="p-4">
                            <VStack gap="sm" className="items-start">
                              <p className="text-base font-semibold text-slate-900">Security & Permissions</p>
                              <div className="w-full rounded-md bg-emerald-50 px-3 py-3">
                                <HStack gap="sm" align="start">
                                  <Shield className="h-5 w-5 text-emerald-700 mt-0.5" />
                                  <div>
                                    <p className="text-sm font-semibold text-emerald-900">Read-Only Mode Active</p>
                                    <p className="text-sm text-emerald-800">
                                      All agents operating with read-only permissions. No write operations allowed
                                      during discovery phase.
                                    </p>
                                  </div>
                                </HStack>
                              </div>
                              <div className="w-full space-y-2">
                                {[
                                  { label: "Credentials Validated", value: "OAuth 2.0" },
                                  { label: "Scope Verification", value: "Read Access" },
                                  { label: "TLS Encryption", value: "TLS 1.3" },
                                  { label: "Rate Limiting", value: "Active" },
                                ].map((item) => (
                                  <HStack
                                    key={item.label}
                                    justify="between"
                                    className="w-full rounded-md bg-slate-50 px-3 py-2"
                                  >
                                    <HStack gap="xs" align="center">
                                      <CircleCheck className="h-4 w-4 text-emerald-600" />
                                      <p className="text-sm text-slate-700">{item.label}</p>
                                    </HStack>
                                    <p className="text-sm text-slate-500">{item.value}</p>
                                  </HStack>
                                ))}
                              </div>
                            </VStack>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="w-full fade-in-up">
                  <div className="grid grid-cols-[40px_minmax(0,1fr)] gap-4 items-start">
                    <div className="flex flex-col items-center self-stretch pt-1">
                      <Activity className="h-7 w-7 text-slate-600 mt-0.5" />
                      <div className="mt-3 w-px flex-1 bg-slate-300" />
                    </div>
                    <div>
                      <HStack gap="sm" align="start" className="mb-8">
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">
                            Discovery Statistics
                          </h3>
                          <p className="text-sm text-slate-500">
                            Data discovery output and live integration activity for this onboarding run.
                          </p>
                        </div>
                      </HStack>
                      <div ref={statsSectionRef} className="mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-3 w-full">
                          {discoveryStats.map((stat) => {
                            const StatIcon = stat.icon;
                            return (
                              <div
                                key={stat.id}
                                className="h-[148px] rounded-md bg-slate-100 hover:bg-slate-200/70 transition-all p-4 flex flex-col items-start gap-4"
                              >
                                <StatIcon className={`h-6 w-6 ${stat.iconClass}`} />
                                <div>
                                  <p className="text-4xl font-semibold leading-none text-slate-900">
                                    {(animatedStatValues[stat.id] ?? 0).toLocaleString()}
                                  </p>
                                  <p className="text-sm text-slate-600 mt-1">{stat.label}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <Card className="!p-0 border border-slate-200 bg-white rounded-md">
                        <CardContent className="p-4">
                          <VStack gap="sm" className="items-start">
                            <HStack justify="between" align="center" className="w-full">
                              <p className="text-base font-semibold text-slate-900">Real-Time Activity Log</p>
                              <Button variant="ghost" className="!px-0 !text-blue-600">
                                <HStack gap="xs" align="center">
                                  <Download className="h-4 w-4" />
                                  <span className="text-sm">Export Log</span>
                                </HStack>
                              </Button>
                            </HStack>
                            <div className="w-full space-y-3">
                              {[
                                {
                                  id: "timeseries-discovery",
                                  message: "Time Series Agent discovered 156 new data streams from PI System",
                                  age: "2 seconds ago",
                                  dotClass: "bg-blue-600",
                                  pulse: true,
                                },
                                {
                                  id: "asset-discovery",
                                  message: "Asset Discovery Agent enumerated 47 pumps in Area-3",
                                  age: "8 seconds ago",
                                  dotClass: "bg-emerald-600",
                                  pulse: false,
                                },
                                {
                                  id: "event-scanner",
                                  message: "Event Scanner Agent processed 234 alarm records from last 30 days",
                                  age: "15 seconds ago",
                                  dotClass: "bg-blue-600",
                                  pulse: true,
                                },
                                {
                                  id: "auth-agent",
                                  message: "Authentication Agent validated OPC-UA server credentials",
                                  age: "23 seconds ago",
                                  dotClass: "bg-emerald-600",
                                  pulse: false,
                                },
                              ].map((event) => (
                                <div key={event.id} className="w-full rounded-md bg-slate-100 px-4 py-3">
                                  <HStack gap="sm" align="start">
                                    {event.pulse ? (
                                      <span className="relative mt-1 inline-flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-70 animate-ping" />
                                        <span className={`relative inline-flex h-2 w-2 rounded-full ${event.dotClass}`} />
                                      </span>
                                    ) : (
                                      <span className={`mt-1 inline-flex h-2 w-2 rounded-full ${event.dotClass}`} />
                                    )}
                                    <VStack gap="none" className="items-start">
                                      <p className="text-sm font-medium text-slate-900">{event.message}</p>
                                      <p className="text-xs text-slate-500">{event.age}</p>
                                    </VStack>
                                  </HStack>
                                </div>
                              ))}
                            </div>
                          </VStack>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </section>

              </VStack>
            </div>
          </HStack>
        </div>
      </Container>

      <FlowNavigationFooter
        backLabel="Back to Configuration"
        onBack={() => navigate("/configuration")}
        nextLabel="Continue to Contextualization"
        onNext={() => navigate("/contextualization")}
      />
    </div>
  );
};
