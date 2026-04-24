import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type CompanyProfile = {
  companyName: string;
  siteCount: string;
  ownerName: string;
  ownerTitle: string;
};

export type SourceStatus = "pending" | "loading" | "complete" | "error";

export type DataSourceConfigState = {
  sourceId: string;
  progress: number;
  status: SourceStatus;
  setupCompleted: boolean;
  selectedDomains?: string[];
  deltaStrategy?: string;
  plants?: string;
  orderTypes?: string;
  timestampField?: string;
  schedule?: string;
  ownerName: string;
  ownerTitle: string;
  ownerEmail: string;
  pollingIntervalMinutes: string;
  autoIngest: boolean;
  qualityChecks: boolean;
  isCollapsed: boolean;
};

export type OnboardingFlowState = {
  selectedIndustry: string;
  companyProfile: CompanyProfile | null;
  selectedUseCases: string[];
  connectedSources: Record<string, boolean>;
  dataSourceConfigs: DataSourceConfigState[];
};

const defaultState: OnboardingFlowState = {
  selectedIndustry: "",
  companyProfile: null,
  selectedUseCases: [],
  connectedSources: {},
  dataSourceConfigs: [],
};

type OnboardingFlowContextValue = {
  flowState: OnboardingFlowState;
  setFlowState: (next: OnboardingFlowState) => void;
  updateFlowState: (updater: (current: OnboardingFlowState) => OnboardingFlowState) => void;
};

const OnboardingFlowContext = createContext<OnboardingFlowContextValue | undefined>(undefined);

export const OnboardingFlowProvider = ({ children }: { children: ReactNode }) => {
  const [flowState, setFlowStateState] = useState<OnboardingFlowState>(defaultState);

  const value = useMemo<OnboardingFlowContextValue>(
    () => ({
      flowState,
      setFlowState: setFlowStateState,
      updateFlowState: (updater) => {
        setFlowStateState((current) => updater(current));
      },
    }),
    [flowState]
  );

  return <OnboardingFlowContext.Provider value={value}>{children}</OnboardingFlowContext.Provider>;
};

export const useOnboardingFlow = () => {
  const context = useContext(OnboardingFlowContext);
  if (!context) {
    throw new Error("useOnboardingFlow must be used within OnboardingFlowProvider");
  }

  return context;
};
