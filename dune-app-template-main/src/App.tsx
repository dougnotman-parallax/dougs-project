import { useEffect, useRef } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { TopNavigation } from "./components/Navigation/TopNavigation";
import { HomePage } from "./pages/HomePage";
import { ConfigurationPage } from "./pages/ConfigurationPage";
import { IntegrationPage } from "./pages/IntegrationPage";
import { ContextualizationPage } from "./pages/ContextualizationPage";
import { LaunchPage } from "./pages/LaunchPage";
import { PlaygroundPage } from "./pages/PlaygroundPage";
import { AnalysisPage } from "./pages/AnalysisPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { OnboardingFlowProvider } from "./context/OnboardingFlowContext";

function AppLayout() {
  const location = useLocation();
  const mainScrollRef = useRef<HTMLElement | null>(null);
  const showTopNavigation = !["/", "/configuration", "/integration", "/contextualization", "/launch"].includes(
    location.pathname
  );

  useEffect(() => {
    mainScrollRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {showTopNavigation ? <TopNavigation /> : null}
      <main ref={mainScrollRef} className="app-scroll min-h-0 flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/configuration" element={<ConfigurationPage />} />
          <Route path="/integration" element={<IntegrationPage />} />
          <Route path="/contextualization" element={<ContextualizationPage />} />
          <Route path="/launch" element={<LaunchPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <OnboardingFlowProvider>
      <HashRouter>
        <AppLayout />
      </HashRouter>
    </OnboardingFlowProvider>
  );
}

export default App;
