import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Container, HStack, Textarea, VStack } from "cdf-design-system-alpha";
import type { ComponentType } from "react";
import {
  Circle,
  Cog,
  Gauge,
  LineChart,
  Link2,
  Plus,
  Play,
  ShieldAlert,
  Send,
  Truck,
  WandSparkles,
  Zap,
} from "lucide-react";
import appLogo from "../assets/logo.svg";
import { FlowNavigationFooter } from "../components/FlowNavigationFooter";
import { StatusBadge } from "../components/StatusBadge";
import { useOnboardingFlow } from "../context/OnboardingFlowContext";

type WorkflowCard = {
  id: string;
  title: string;
  description: string;
  statusLabel: string;
  statusTone: "success" | "warning" | "error";
  icon: ComponentType<{ className?: string }>;
  iconClass: string;
  metrics: Array<{ label: string; value: string; valueClass?: string }>;
  actionLabel: string;
  actionClassName?: string;
};

const workflowCards: WorkflowCard[] = [
  {
    id: "predictive-maintenance",
    title: "Predictive Maintenance",
    description: "ML-driven failure prediction for rotating equipment with anomaly detection.",
    statusLabel: "Data OK",
    statusTone: "success",
    icon: Cog,
    iconClass: "text-slate-600",
    metrics: [
      { label: "Coverage", value: "156 Assets" },
      { label: "Data Sources", value: "OPC-UA, CMMS" },
      { label: "Model Accuracy", value: "94.2%", valueClass: "text-emerald-700" },
    ],
    actionLabel: "Run Workflow",
  },
  {
    id: "energy-optimization",
    title: "Energy Optimization",
    description: "Real-time energy consumption analysis with efficiency recommendations.",
    statusLabel: "Data OK",
    statusTone: "success",
    icon: Zap,
    iconClass: "text-slate-600",
    metrics: [
      { label: "Coverage", value: "23 Units" },
      { label: "Data Sources", value: "Smart Meters, DCS" },
      { label: "Potential Savings", value: "12.3%", valueClass: "text-emerald-700" },
    ],
    actionLabel: "Run Workflow",
  },
  {
    id: "quality-control",
    title: "Quality Control",
    description: "Statistical process control with automated deviation alerts.",
    statusLabel: "Gaps Deferred",
    statusTone: "warning",
    icon: LineChart,
    iconClass: "text-slate-600",
    metrics: [
      { label: "Coverage", value: "8 Lines" },
      { label: "Data Sources", value: "QC Systems, LIMS" },
      { label: "Detection Rate", value: "87.1%", valueClass: "text-rose-700" },
    ],
    actionLabel: "Run Workflow",
  },
  {
    id: "asset-performance",
    title: "Asset Performance",
    description: "OEE tracking and performance benchmarking across production units.",
    statusLabel: "Data OK",
    statusTone: "success",
    icon: Gauge,
    iconClass: "text-slate-600",
    metrics: [
      { label: "Coverage", value: "45 Assets" },
      { label: "Data Sources", value: "MES, Historians" },
      { label: "Current OEE", value: "78.4%", valueClass: "text-violet-700" },
    ],
    actionLabel: "Run Workflow",
  },
  {
    id: "safety-monitoring",
    title: "Safety Monitoring",
    description: "Real-time safety parameter tracking with emergency response protocols.",
    statusLabel: "Needs Review",
    statusTone: "error",
    icon: ShieldAlert,
    iconClass: "text-slate-600",
    metrics: [
      { label: "Coverage", value: "12 Zones" },
      { label: "Data Sources", value: "Gas Detectors, F&G" },
      { label: "Response Time", value: "< 30s", valueClass: "text-rose-700" },
    ],
    actionLabel: "Review Required",
    actionClassName: "bg-rose-600 hover:bg-rose-700",
  },
  {
    id: "supply-chain",
    title: "Supply Chain",
    description: "Inventory optimization and supplier performance tracking.",
    statusLabel: "Gaps Deferred",
    statusTone: "warning",
    icon: Truck,
    iconClass: "text-slate-600",
    metrics: [
      { label: "Coverage", value: "234 SKUs" },
      { label: "Data Sources", value: "ERP, WMS" },
      { label: "Service Level", value: "96.7%", valueClass: "text-emerald-700" },
    ],
    actionLabel: "Run Workflow",
  },
];

const deploymentStatusItems = [
  {
    id: "production-ready",
    label: "Production Ready",
    detail: "10 workflows validated",
    value: "10",
    rowClass: "bg-slate-100",
    valueClass: "text-slate-900",
    dotClass: "text-emerald-500",
  },
  {
    id: "minor-gaps",
    label: "Minor Gaps",
    detail: "Can run with limitations",
    value: "2",
    rowClass: "bg-slate-100",
    valueClass: "text-slate-900",
    dotClass: "text-amber-500",
  },
  {
    id: "needs-review",
    label: "Needs Review",
    detail: "Requires attention",
    value: "1",
    rowClass: "bg-rose-50",
    valueClass: "text-rose-700",
    dotClass: "text-rose-500",
  },
];

const quickActions = [
  {
    id: "run-ready",
    label: "Run All Ready Workflows",
    detail: "Start 10 validated workflows",
    rowClass: "bg-slate-100",
    iconClass: "text-blue-600",
    icon: Play,
  },
  {
    id: "create-custom",
    label: "Create Custom Workflow",
    detail: "Use AI Copilot to build new process",
    rowClass: "bg-slate-100",
    iconClass: "text-violet-600",
    icon: WandSparkles,
  },
  {
    id: "chain-workflows",
    label: "Chain Workflows",
    detail: "Link workflows into a single launch sequence",
    rowClass: "bg-slate-100",
    iconClass: "text-emerald-600",
    icon: Link2,
  },
];

const conversationQuickPrompts = [
  "What capabilities are ready to launch?",
  "Show configuration completion by source",
  "What workflows are unlocked for this site?",
] as const;

export const LaunchPage = () => {
  const navigate = useNavigate();
  const { flowState } = useOnboardingFlow();
  const { selectedIndustry, companyProfile } = flowState;
  const [conversationPrompt, setConversationPrompt] = useState("");

  if (!selectedIndustry || !companyProfile) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(114,141,241,1)_0%,rgba(223,229,252,1)_36%,rgba(127,233,210,1)_76%,rgba(26,150,122,1)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/45 to-white" />
        <Container maxWidth="full" padding="lg" className="relative z-10">
          <VStack gap="sm" className="py-10 items-center text-center">
            <img src={appLogo} alt="App logo" className="h-10 w-auto" />
            <h2 className="marketing-banner-title text-4xl font-semibold tracking-tight text-slate-900">
              Your site is ready for launch
            </h2>
            <p className="text-base text-slate-700 max-w-3xl">
              Explore your pre-configured workflows and activate what&apos;s ready for your site.
            </p>
            <div className="mt-14 w-full max-w-4xl fade-in-up">
              <div className="relative">
                <Textarea
                  value={conversationPrompt}
                  onChange={(event) => setConversationPrompt(event.target.value)}
                  placeholder="Ask what is ready to launch."
                  rows={4}
                  resize="none"
                  className="!min-h-[150px] !rounded-xl !border-slate-200 !bg-white !pr-14 !text-base text-slate-900 placeholder:!text-slate-400"
                />
                <Button
                  type="button"
                  variant="secondary"
                  aria-label="Send conversation prompt"
                  className="!absolute !bottom-3 !right-3 !h-10 !w-10 !min-w-10 !rounded-md !bg-slate-900 !p-0 !text-white hover:!bg-slate-800"
                >
                  <Send className="h-4.5 w-4.5" />
                </Button>
              </div>
              <HStack gap="sm" className="mt-3 w-full flex-wrap justify-center">
                {conversationQuickPrompts.map((prompt) => (
                  <Button
                    key={prompt}
                    type="button"
                    variant="outline"
                    className="!rounded-md !bg-white/90 !px-4 !py-1.5 !text-sm !font-medium !text-slate-800"
                  >
                    {prompt}
                  </Button>
                ))}
              </HStack>
            </div>
          </VStack>
        </Container>
      </div>

      <Container maxWidth="full" padding="lg" className="pb-40">
        <div className="mx-auto max-w-7xl">
          <section className="w-full py-6 fade-in-up">
            <VStack gap="md" className="items-start">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
                <Card className="!p-0 !rounded-md border border-slate-200 bg-white shadow-none">
                  <CardContent className="p-5">
                    <VStack gap="sm" className="items-start">
                      <p className="text-base font-semibold text-slate-900">Site Deployment Status</p>
                      <VStack gap="sm" className="items-start w-full">
                        {deploymentStatusItems.map((item) => (
                          <div key={item.id} className={`w-full rounded-md px-4 py-3 ${item.rowClass}`}>
                            <HStack justify="between" align="center" className="w-full">
                              <HStack gap="sm" align="start">
                                <Circle className={`h-2 w-2 mt-1 ${item.dotClass}`} fill="currentColor" />
                                <div>
                                  <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                                  <p className="text-sm text-slate-600">{item.detail}</p>
                                </div>
                              </HStack>
                              <p className={`text-2xl font-semibold ${item.valueClass}`}>{item.value}</p>
                            </HStack>
                          </div>
                        ))}
                      </VStack>
                    </VStack>
                  </CardContent>
                </Card>

                <Card className="!p-0 !rounded-md border border-slate-200 bg-white shadow-none">
                  <CardContent className="p-5">
                    <VStack gap="sm" className="items-start">
                      <p className="text-base font-semibold text-slate-900">Quick Actions</p>
                      <VStack gap="sm" className="items-start w-full">
                        {quickActions.map((action) => {
                          const ActionIcon = action.icon;
                          return (
                            <button
                              key={action.id}
                              type="button"
                              className={`w-full text-left rounded-md px-4 py-3 shadow-none transition-all duration-200 hover:bg-slate-100 hover:shadow-md ${action.rowClass}`}
                            >
                              <HStack gap="sm" align="start">
                                <ActionIcon className={`h-4.5 w-4.5 mt-0.5 ${action.iconClass}`} />
                                <div>
                                  <p className="text-sm font-semibold text-slate-900">{action.label}</p>
                                  <p className="text-sm text-slate-600">{action.detail}</p>
                                </div>
                              </HStack>
                            </button>
                          );
                        })}
                      </VStack>
                    </VStack>
                  </CardContent>
                </Card>
              </div>

              <div className="w-full text-center mt-20">
                <div className="inline-flex flex-col items-center">
                  <p className="text-3xl font-semibold leading-tight text-slate-900">Ready-to-Run Workflows</p>
                  <p className="mt-1 text-sm font-normal text-slate-500">
                    Validated industry templates with real-time status
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
                {workflowCards.map((workflow) => {
                  const WorkflowIcon = workflow.icon;
                  return (
                    <Card
                      key={workflow.id}
                      className="!p-0 !h-full !rounded-md border border-slate-200 bg-white shadow-none transition duration-200 hover:bg-white hover:shadow-md"
                    >
                      <CardContent className="h-full p-5 flex flex-col gap-4">
                        <HStack justify="between" align="center" className="w-full">
                          <span className="inline-flex h-6 w-6 items-center justify-center">
                            <WorkflowIcon className={`h-6 w-6 ${workflow.iconClass}`} />
                          </span>
                          <StatusBadge
                            label={workflow.statusLabel}
                            tone={
                              workflow.statusTone === "success"
                                ? "success"
                                : workflow.statusTone === "warning"
                                  ? "warning"
                                  : "error"
                            }
                          />
                        </HStack>

                        <div>
                          <p className="text-2xl font-semibold text-slate-900">{workflow.title}</p>
                          <p className="mt-1 text-base text-slate-600">{workflow.description}</p>
                        </div>

                        <VStack gap="xs" className="items-start">
                          {workflow.metrics.map((metric) => (
                            <HStack key={metric.label} justify="between" className="w-full">
                              <p className="text-sm text-slate-500">{metric.label}</p>
                              <p className={`text-sm font-semibold ${metric.valueClass ?? "text-slate-900"}`}>
                                {metric.value}
                              </p>
                            </HStack>
                          ))}
                        </VStack>

                        <Button
                          variant="secondary"
                          className={`w-full mt-auto bg-slate-900 text-white hover:bg-slate-800 !shadow-none ${
                            workflow.actionClassName ?? ""
                          }`}
                        >
                          {workflow.actionLabel}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <HStack justify="end" className="w-full">
                <Button
                  type="button"
                  variant="secondary"
                  className="!px-3 !py-1 !text-xs !rounded bg-slate-900 text-white hover:bg-slate-800"
                >
                  <HStack gap="xs" align="center">
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add workflow</span>
                  </HStack>
                </Button>
              </HStack>
            </VStack>
          </section>
        </div>
      </Container>

      <FlowNavigationFooter
        backLabel="Back to Contextualization"
        onBack={() => navigate("/contextualization")}
        auxiliaryLabel="Configure Next Site"
        onAuxiliary={() => undefined}
        nextLabel="Launch Site"
        onNext={() => undefined}
      />
    </div>
  );
};
