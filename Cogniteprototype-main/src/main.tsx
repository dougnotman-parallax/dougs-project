import { Component, type ErrorInfo, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

/** Surfaces render errors instead of a blank page (check DevTools console for the stack). */
class RootErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[App error]", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-dvh bg-background p-6 text-foreground">
          <h1 className="text-lg font-semibold">Something went wrong</h1>
          <pre className="mt-4 max-w-prose whitespace-pre-wrap break-words rounded-md border border-border bg-muted p-4 text-sm">
            {this.state.error.message}
          </pre>
          <p className="mt-4 text-sm text-muted-foreground">
            See the browser console for the full stack trace.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Mount point #root is missing from index.html");
}

createRoot(rootEl).render(
  <RootErrorBoundary>
    <App />
  </RootErrorBoundary>,
);
