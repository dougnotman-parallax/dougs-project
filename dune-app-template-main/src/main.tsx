import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CDFAuthenticationProvider } from "dune-fe-auth";
import App from "./App.tsx";
import { OpenInNewTabMessage } from "./components/OpenInNewTabMessage";
import appConfig from "../app.json";
import "./style.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

// Get config from app.json in dev mode, undefined in production (Fusion provides it)
const localConfig = import.meta.env.DEV && !import.meta.env.VITE_FUSION_MODE
  ? {
      org: appConfig.deployment.org,
      project: appConfig.deployment.project,
      baseUrl: appConfig.deployment.baseUrl,
    }
  : undefined;

// When running standalone auth inside an iframe, Cognite login is blocked (X-Frame-Options).
// Show a message and "Open in new tab" so the user can sign in in the top window.
function Root() {
  const isInIframe =
    typeof window !== "undefined" && window.self !== window.top;
  const mustOpenInNewTab = Boolean(localConfig && isInIframe);

  if (mustOpenInNewTab) {
    return <OpenInNewTabMessage />;
  }

  return (
    <CDFAuthenticationProvider useLocalConfiguration={localConfig}>
      <App />
    </CDFAuthenticationProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Root />
    </QueryClientProvider>
  </React.StrictMode>
);
