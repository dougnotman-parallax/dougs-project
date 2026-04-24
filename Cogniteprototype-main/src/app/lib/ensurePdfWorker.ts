import { pdfjs } from "react-pdf";

/**
 * Worker must match the pdfjs API version shipped with react-pdf. A local `?url` import can
 * resolve to a different pdfjs-dist version under Vite dev (stale optimize cache), causing
 * "API version does not match the Worker version" — so we load the worker from npm CDN by version.
 */
const pdfjsVersion =
  typeof (pdfjs as { version?: string }).version === "string"
    ? (pdfjs as { version: string }).version
    : "5.4.296";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.mjs`;
