import type { ReactNode } from "react";
import { Button, Container, HStack } from "cdf-design-system-alpha";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useOnboardingFlow } from "../context/OnboardingFlowContext";

type FlowNavigationFooterProps = {
  backLabel?: string;
  onBack?: () => void;
  auxiliaryLabel?: string;
  onAuxiliary?: () => void;
  nextLabel: string;
  onNext: () => void;
  nextDisabled?: boolean;
  nextIcon?: ReactNode;
  leftContent?: ReactNode;
};

export const FlowNavigationFooter = ({
  backLabel,
  onBack,
  auxiliaryLabel,
  onAuxiliary,
  nextLabel,
  onNext,
  nextDisabled,
  nextIcon,
  leftContent,
}: FlowNavigationFooterProps) => {
  const { flowState } = useOnboardingFlow();
  const location = useLocation();
  const showBack = Boolean(backLabel && onBack);
  const { selectedIndustry, companyProfile } = flowState;

  const toTitleCase = (value: string) =>
    value
      .split("-")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

  const details: Array<{ label: string; value: string }> = [];
  if (selectedIndustry) {
    details.push({ label: "Industry", value: toTitleCase(selectedIndustry) });
  }
  if (companyProfile?.companyName) {
    details.push({ label: "Company", value: companyProfile.companyName });
  }
  if (companyProfile?.ownerName) {
    details.push({ label: "Owner", value: companyProfile.ownerName });
  }
  if (companyProfile?.ownerTitle) {
    details.push({ label: "Title", value: companyProfile.ownerTitle });
  }

  const totalSteps = 5;
  const stepByPath: Record<string, number> = {
    "/": 1,
    "/configuration": 2,
    "/integration": 3,
    "/contextualization": 4,
    "/launch": 5,
  };
  const currentStep = stepByPath[location.pathname];
  const progressPercent = currentStep ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <Container maxWidth="full" padding="lg">
        <div className="mx-auto max-w-7xl">
          <HStack justify="between" align="center" className="w-full gap-3 py-3">
            <div className="min-w-0 flex flex-1 flex-col items-start gap-2">
              {details.length > 0 ? (
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  {details.map((detail) => (
                    <span
                      key={detail.label}
                      className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-xs text-slate-700"
                    >
                      <span className="text-slate-500">{detail.label}:</span>
                      <span className="font-medium text-slate-800">{detail.value}</span>
                    </span>
                  ))}
                </div>
              ) : (
                leftContent
              )}

              {currentStep ? (
                <div className="w-full max-w-[380px]">
                  <HStack justify="between" align="center" className="w-full">
                    <p className="text-xs font-medium text-slate-700">
                      Step {currentStep} of {totalSteps}
                    </p>
                    <p className="text-xs text-slate-500">{Math.round(progressPercent)}%</p>
                  </HStack>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-slate-900 transition-all duration-300 ease-out progress-grow-on-load"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              ) : null}
            </div>

            <HStack gap="sm" align="center">
              {showBack ? (
                <Button
                  variant="outline"
                  aria-label={backLabel}
                  title={backLabel}
                  className="!h-9 !w-9 !min-w-9 !p-0 !shadow-none"
                  onClick={onBack}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              ) : null}
              {auxiliaryLabel && onAuxiliary ? (
                <Button variant="outline" className="!shadow-none text-slate-700" onClick={onAuxiliary}>
                  {auxiliaryLabel}
                </Button>
              ) : null}
              <Button variant="primary" className="!shadow-none" disabled={nextDisabled} onClick={onNext}>
                <HStack gap="xs" align="center">
                  <span>{nextLabel}</span>
                  {nextIcon ?? <ArrowRight className="h-4 w-4" />}
                </HStack>
              </Button>
            </HStack>
          </HStack>
        </div>
      </Container>
    </div>
  );
};
