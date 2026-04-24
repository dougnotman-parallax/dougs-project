/** Export the first embedded SVG (e.g. Recharts) under `root` as a PNG download. */
export function downloadElementSvgAsPng(
  root: HTMLElement | null,
  filename: string,
): void {
  if (!root) return;
  const svg = root.querySelector("svg");
  if (!svg) return;

  const rect = svg.getBoundingClientRect();
  const width = Math.max(1, Math.floor(rect.width));
  const height = Math.max(1, Math.floor(rect.height));

  const clone = svg.cloneNode(true) as SVGElement;
  const xmlns = "http://www.w3.org/2000/svg";
  if (!clone.getAttribute("xmlns")) clone.setAttribute("xmlns", xmlns);
  clone.setAttribute("width", String(width));
  clone.setAttribute("height", String(height));
  if (!clone.getAttribute("viewBox") && width && height) {
    clone.setAttribute("viewBox", `0 0 ${width} ${height}`);
  }

  const serialized = new XMLSerializer().serializeToString(clone);
  const blob = new Blob([serialized], { type: "image/svg+xml;charset=utf-8" });
  const objectUrl = URL.createObjectURL(blob);
  const img = new Image();

  img.onload = () => {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const canvas = document.createElement("canvas");
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      URL.revokeObjectURL(objectUrl);
      return;
    }
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);
    URL.revokeObjectURL(objectUrl);
    canvas.toBlob(
      (out) => {
        if (!out) return;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(out);
        a.download = filename.endsWith(".png") ? filename : `${filename}.png`;
        a.click();
        URL.revokeObjectURL(a.href);
      },
      "image/png",
      0.95,
    );
  };
  img.onerror = () => {
    URL.revokeObjectURL(objectUrl);
  };
  img.src = objectUrl;
}

export function filenameSafeTitle(title: string) {
  return title.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-|-$/g, "") || "chart";
}
