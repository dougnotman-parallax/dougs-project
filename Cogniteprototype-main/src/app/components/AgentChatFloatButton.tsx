import React, { useCallback, useEffect, useRef, useState } from "react";
import { GripHorizontal, GripVertical } from "lucide-react";
import Atlas from "../../imports/Atlas";

interface AgentChatFloatButtonProps {
  isChatOpen: boolean;
  /** Open agent (e.g. docked side panel) or close and reset chat */
  onToggle: () => void;
}

const BUTTON_SIZE = 48;
/** Knob span parallel to the viewport edge (top/bottom → width, left/right → height). */
const KNOB_ALONG_EDGE_PX = 72;
/** Knob depth into the viewport, perpendicular to the edge (top/bottom → height, left/right → width). */
const KNOB_CROSS_EDGE_PX = 18;
/** Flush to rim: same as cross-edge depth on every side after orientation swap. */
const RIM_INSET = KNOB_CROSS_EDGE_PX;
/** Minimum clear space between knob inner edge and persistent button */
const BUTTON_KNOB_GAP = 6;
/** Inset for button center track from viewport = rim + gap */
const BUTTON_TRACK_INSET = RIM_INSET + BUTTON_KNOB_GAP;
const Z_INDEX = 10000;
const KNOB_Z_INDEX = Z_INDEX - 1;
/** Default right-edge float: distance from viewport top to the **top** of the button. */
const DEFAULT_RIGHT_EDGE_TOP_OFFSET_PX = 80;
/** Rim knob: single element animates left/top/width/height so edge changes don’t unmount (avoids flicker). */
const KNOB_MOVE_MS = 480;
const KNOB_MOVE_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
/** Grace period to move pointer from rim knob to Atlas button without collapsing (chat open only). */
const ATLAS_REVEAL_LEAVE_MS = 240;
/** Opacity + emerge translate/scale share one timing so the disc slides out from under the rim with the same ease as the knob. */
const ATLAS_REVEAL_MOTION_MS = 480;
/** Pixels toward the viewport rim when hidden (under the knob) before easing into docked position */
const ATLAS_EMERGE_PX = 22;
/** First visit: peek the Atlas button from the rim, hold, then tuck away (localStorage). */
const INTRO_STORAGE_KEY = "cognite_agent_float_intro_v1";
/** Time the button stays fully visible during intro before sliding back under the knob */
const INTRO_HOLD_MS = 2400;

/** Which viewport edge the float control is snapped to */
export type BorderEdge = "top" | "right" | "bottom" | "left";

const EDGE_ORDER: BorderEdge[] = ["top", "right", "bottom", "left"];

/** Slide + scale from under the rim knob into the docked rest pose. */
function atlasEmergeTransform(edge: BorderEdge, visible: boolean): string {
  if (visible) return "translate(0, 0) scale(1)";
  const d = ATLAS_EMERGE_PX;
  switch (edge) {
    case "bottom":
      return `translate(0, ${d}px) scale(0.9)`;
    case "top":
      return `translate(0, ${-d}px) scale(0.9)`;
    case "left":
      return `translate(${-d}px, 0) scale(0.9)`;
    case "right":
      return `translate(${d}px, 0) scale(0.9)`;
  }
}

function clamp(n: number, lo: number, hi: number) {
  return Math.min(Math.max(n, lo), hi);
}

/** Closest point on segment (x1,y1)-(x2,y2) to (px,py). */
function closestPointOnSegment(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): { x: number; y: number } {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return { x: x1, y: y1 };
  let t = ((px - x1) * dx + (py - y1) * dy) / len2;
  t = clamp(t, 0, 1);
  return { x: x1 + t * dx, y: y1 + t * dy };
}

export type SnapCenterResult = { x: number; y: number; edge: BorderEdge };

/**
 * Snap button **center** to the nearest point on the viewport inset frame
 * (button may only sit flush to top / right / bottom / left edges).
 * @param trackInset distance from viewport to inner edge of button (includes gap past rim knob).
 */
function snapCenterToWindowBorder(
  cx: number,
  cy: number,
  vw: number,
  vh: number,
  s: number,
  trackInset: number,
): SnapCenterResult {
  const half = s / 2;
  const minCX = trackInset + half;
  const maxCX = vw - trackInset - half;
  const minCY = trackInset + half;
  const maxCY = vh - trackInset - half;

  if (maxCX < minCX || maxCY < minCY) {
    const x = clamp(cx, trackInset + half, vw - trackInset - half);
    const y = clamp(cy, trackInset + half, vh - trackInset - half);
    return { x, y, edge: "bottom" };
  }

  const segments: [number, number, number, number][] = [
    [minCX, minCY, maxCX, minCY], // top
    [maxCX, minCY, maxCX, maxCY], // right
    [maxCX, maxCY, minCX, maxCY], // bottom
    [minCX, maxCY, minCX, minCY], // left
  ];

  let bestX = minCX;
  let bestY = minCY;
  let bestD = Infinity;
  let bestEdge: BorderEdge = "top";

  segments.forEach(([x1, y1, x2, y2], i) => {
    const p = closestPointOnSegment(cx, cy, x1, y1, x2, y2);
    const d = (p.x - cx) ** 2 + (p.y - cy) ** 2;
    if (d < bestD) {
      bestD = d;
      bestX = p.x;
      bestY = p.y;
      bestEdge = EDGE_ORDER[i]!;
    }
  });

  return { x: bestX, y: bestY, edge: bestEdge };
}

function centerToTopLeft(cx: number, cy: number, s: number) {
  return { x: cx - s / 2, y: cy - s / 2 };
}

type FloatPosition = { x: number; y: number; edge: BorderEdge };

/** Default on the **right** viewport edge; vertical placement is {@link DEFAULT_RIGHT_EDGE_TOP_OFFSET_PX} from viewport top (clamped to track). */
function defaultRightEdgePosition(vw: number, vh: number, s: number, trackInset: number): FloatPosition {
  const half = s / 2;
  const minCY = trackInset + half;
  const maxCY = vh - trackInset - half;
  const cx = vw - trackInset - half;
  const cy = clamp(DEFAULT_RIGHT_EDGE_TOP_OFFSET_PX + half, minCY, maxCY);
  const snapped = snapCenterToWindowBorder(cx, cy, vw, vh, s, trackInset);
  const tl = centerToTopLeft(snapped.x, snapped.y, s);
  return { ...tl, edge: snapped.edge };
}

function snapTopLeftToBorder(
  x: number,
  y: number,
  vw: number,
  vh: number,
  s: number,
  trackInset: number,
): FloatPosition {
  const cx = x + s / 2;
  const cy = y + s / 2;
  const c = snapCenterToWindowBorder(cx, cy, vw, vh, s, trackInset);
  const tl = centerToTopLeft(c.x, c.y, s);
  return { ...tl, edge: c.edge };
}

/** Pixel frame for one rim knob; always uses left/top/width/height so CSS can interpolate across edges. */
function getKnobPixelRect(
  edge: BorderEdge,
  centerX: number,
  centerY: number,
  vw: number,
  vh: number,
): { left: number; top: number; width: number; height: number } {
  const halfAlong = KNOB_ALONG_EDGE_PX / 2;
  const cross = KNOB_CROSS_EDGE_PX;
  switch (edge) {
    case "top":
      return {
        left: centerX - halfAlong,
        top: 0,
        width: KNOB_ALONG_EDGE_PX,
        height: cross,
      };
    case "bottom":
      return {
        left: centerX - halfAlong,
        top: vh - cross,
        width: KNOB_ALONG_EDGE_PX,
        height: cross,
      };
    case "left":
      return {
        left: 0,
        top: centerY - halfAlong,
        width: cross,
        height: KNOB_ALONG_EDGE_PX,
      };
    case "right":
      return {
        left: vw - cross,
        top: centerY - halfAlong,
        width: cross,
        height: KNOB_ALONG_EDGE_PX,
      };
  }
}

/** Draggable rim capsule (grip); single DOM node so position/edge changes animate without unmount flicker. */
function BorderConnectionKnob({
  edge,
  centerX,
  centerY,
  viewportWidth,
  viewportHeight,
  isDragging,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onLostPointerCapture,
  zIndex,
  onPointerEnter,
  onPointerLeave,
}: {
  edge: BorderEdge;
  centerX: number;
  centerY: number;
  viewportWidth: number;
  viewportHeight: number;
  isDragging: boolean;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerCancel: (e: React.PointerEvent<HTMLDivElement>) => void;
  onLostPointerCapture: (e: React.PointerEvent<HTMLDivElement>) => void;
  zIndex: number;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
}) {
  const base =
    "fixed box-border flex touch-none select-none items-center justify-center border border-white/[0.2] bg-[#111213] shadow-[0_1px_3px_rgba(0,0,0,0.35)]";
  const cursor = isDragging ? "cursor-grabbing" : "cursor-grab";
  const horizPad = "px-3";
  const vertPad = "py-3";
  const pad = edge === "top" || edge === "bottom" ? horizPad : vertPad;
  const edgeShape =
    edge === "top"
      ? "rounded-t-none rounded-b-[4px] border-t-0"
      : edge === "bottom"
        ? "rounded-b-none rounded-t-[4px] border-b-0"
        : edge === "left"
          ? "rounded-l-none rounded-r-[4px] border-l-0"
          : "rounded-r-none rounded-l-[4px] border-r-0";

  /** White at rest; pink on hover. */
  const gripIconClass =
    "text-white transition-colors duration-200 ease-out group-hover:text-[#e879f9]";

  const rect = getKnobPixelRect(edge, centerX, centerY, viewportWidth, viewportHeight);
  const transitionStyle = isDragging
    ? "none"
    : `left ${KNOB_MOVE_MS}ms ${KNOB_MOVE_EASE}, top ${KNOB_MOVE_MS}ms ${KNOB_MOVE_EASE}, width ${KNOB_MOVE_MS}ms ${KNOB_MOVE_EASE}, height ${KNOB_MOVE_MS}ms ${KNOB_MOVE_EASE}, box-shadow 220ms ease-out`;

  return (
    <div
      className={`${base} ${cursor} ${pad} ${edgeShape} group`}
      style={{
        zIndex,
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        transition: transitionStyle,
        backfaceVisibility: "hidden",
      }}
      aria-label="Drag to move agent shortcut along the screen edge"
      title="Drag to move"
      data-edge-knob={edge}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onLostPointerCapture={onLostPointerCapture}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      {edge === "top" || edge === "bottom" ? (
        <GripHorizontal
          className={`pointer-events-none size-[14px] shrink-0 origin-center scale-x-[calc(15/14)] ${gripIconClass}`}
          strokeWidth={2.25}
          aria-hidden
        />
      ) : (
        <GripVertical className={`pointer-events-none size-[14px] shrink-0 ${gripIconClass}`} strokeWidth={2.25} aria-hidden />
      )}
    </div>
  );
}

/**
 * Atlas chat toggle (click only) constrained to the viewport border track; the rim
 * knob is draggable and eases when idle; the button trails the knob slightly.
 */
export function AgentChatFloatButton({
  isChatOpen,
  onToggle,
}: AgentChatFloatButtonProps) {
  const [position, setPosition] = useState<FloatPosition>(() =>
    typeof window === "undefined"
      ? defaultRightEdgePosition(1200, 800, BUTTON_SIZE, BUTTON_TRACK_INSET)
      : defaultRightEdgePosition(
          window.innerWidth,
          window.innerHeight,
          BUTTON_SIZE,
          BUTTON_TRACK_INSET,
        ),
  );

  const positionRef = useRef(position);
  positionRef.current = position;

  const [knobDragging, setKnobDragging] = useState(false);
  const [viewport, setViewport] = useState(() => ({
    w: typeof window !== "undefined" ? window.innerWidth : 1200,
    h: typeof window !== "undefined" ? window.innerHeight : 800,
  }));
  const dragSession = useRef<{
    pointerId: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const reclampToBorder = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setPosition((p) => snapTopLeftToBorder(p.x, p.y, vw, vh, BUTTON_SIZE, BUTTON_TRACK_INSET));
  }, []);

  useEffect(() => {
    const onResize = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
      reclampToBorder();
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [reclampToBorder]);

  type IntroLifecycle = "done" | "popIn" | "hold" | "popOut";
  const [introLifecycle, setIntroLifecycle] = useState<IntroLifecycle>("done");
  const [introPoseOut, setIntroPoseOut] = useState(false);
  const introMountStartedRef = useRef(false);

  useEffect(() => {
    if (introMountStartedRef.current) return;
    introMountStartedRef.current = true;
    if (isChatOpen) {
      try {
        globalThis.localStorage?.setItem(INTRO_STORAGE_KEY, "1");
      } catch {
        /* private mode */
      }
      return;
    }
    try {
      if (globalThis.localStorage?.getItem(INTRO_STORAGE_KEY) === "1") return;
    } catch {
      return;
    }
    if (globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      try {
        globalThis.localStorage?.setItem(INTRO_STORAGE_KEY, "1");
      } catch {
        /* private mode */
      }
      return;
    }
    setIntroLifecycle("popIn");
  }, [isChatOpen]);

  useEffect(() => {
    if (introLifecycle !== "popIn") return;
    setIntroPoseOut(false);
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setIntroPoseOut(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [introLifecycle]);

  useEffect(() => {
    if (introLifecycle !== "popIn" || !introPoseOut) return;
    const t = window.setTimeout(() => setIntroLifecycle("hold"), ATLAS_REVEAL_MOTION_MS);
    return () => clearTimeout(t);
  }, [introLifecycle, introPoseOut]);

  useEffect(() => {
    if (introLifecycle !== "hold") return;
    const t = window.setTimeout(() => setIntroLifecycle("popOut"), INTRO_HOLD_MS);
    return () => clearTimeout(t);
  }, [introLifecycle]);

  useEffect(() => {
    if (introLifecycle !== "popOut") return;
    setIntroPoseOut(false);
    const t = window.setTimeout(() => {
      try {
        globalThis.localStorage?.setItem(INTRO_STORAGE_KEY, "1");
      } catch {
        /* private mode */
      }
      setIntroLifecycle("done");
    }, ATLAS_REVEAL_MOTION_MS);
    return () => clearTimeout(t);
  }, [introLifecycle]);

  useEffect(() => {
    if (!isChatOpen) return;
    if (introLifecycle === "done") return;
    try {
      globalThis.localStorage?.setItem(INTRO_STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setIntroLifecycle("done");
    setIntroPoseOut(true);
  }, [isChatOpen, introLifecycle]);

  const [hoverRevealAtlas, setHoverRevealAtlas] = useState(false);
  const revealLeaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearRevealLeaveTimer = useCallback(() => {
    if (revealLeaveTimerRef.current != null) {
      clearTimeout(revealLeaveTimerRef.current);
      revealLeaveTimerRef.current = null;
    }
  }, []);

  useEffect(() => () => clearRevealLeaveTimer(), [clearRevealLeaveTimer]);

  useEffect(() => {
    if (isChatOpen) return;
    clearRevealLeaveTimer();
    setHoverRevealAtlas(false);
  }, [isChatOpen, clearRevealLeaveTimer]);

  const scheduleHideAtlas = useCallback(() => {
    clearRevealLeaveTimer();
    revealLeaveTimerRef.current = setTimeout(() => {
      setHoverRevealAtlas(false);
      revealLeaveTimerRef.current = null;
    }, ATLAS_REVEAL_LEAVE_MS);
  }, [clearRevealLeaveTimer]);

  const onKnobPointerEnter = useCallback(() => {
    clearRevealLeaveTimer();
    setHoverRevealAtlas(true);
  }, [clearRevealLeaveTimer]);

  const onKnobPointerLeave = useCallback(() => {
    if (knobDragging) return;
    if (!isChatOpen) return;
    scheduleHideAtlas();
  }, [knobDragging, isChatOpen, scheduleHideAtlas]);

  const onButtonPointerEnter = useCallback(() => {
    clearRevealLeaveTimer();
    setHoverRevealAtlas(true);
  }, [clearRevealLeaveTimer]);

  const onButtonPointerLeave = useCallback(() => {
    if (!isChatOpen) return;
    scheduleHideAtlas();
  }, [isChatOpen, scheduleHideAtlas]);

  /** Chat closed: disc always visible. Chat open: disc only while rim (or button) is hovered, or while dragging the rim. */
  const showAtlasButton = !isChatOpen || hoverRevealAtlas || knobDragging;
  const knobStackZ = showAtlasButton ? KNOB_Z_INDEX : Z_INDEX;
  const buttonStackZ = showAtlasButton ? Z_INDEX : KNOB_Z_INDEX - 1;

  const onKnobPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setKnobDragging(true);
    const p = positionRef.current;
    dragSession.current = {
      pointerId: e.pointerId,
      offsetX: e.clientX - p.x,
      offsetY: e.clientY - p.y,
    };
  }, []);

  const onKnobPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const s = dragSession.current;
    if (!s || e.pointerId !== s.pointerId) return;
    e.preventDefault();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const rawX = e.clientX - s.offsetX;
    const rawY = e.clientY - s.offsetY;
    const cx = rawX + BUTTON_SIZE / 2;
    const cy = rawY + BUTTON_SIZE / 2;
    const snapped = snapCenterToWindowBorder(cx, cy, vw, vh, BUTTON_SIZE, BUTTON_TRACK_INSET);
    const tl = centerToTopLeft(snapped.x, snapped.y, BUTTON_SIZE);
    setPosition({ ...tl, edge: snapped.edge });
  }, []);

  const endKnobDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const s = dragSession.current;
    if (!s || e.pointerId !== s.pointerId) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    setKnobDragging(false);
    dragSession.current = null;
  }, []);

  const onKnobLostPointerCapture = useCallback(() => {
    setKnobDragging(false);
    dragSession.current = null;
  }, []);

  const centerX = position.x + BUTTON_SIZE / 2;
  const centerY = position.y + BUTTON_SIZE / 2;

  /** Open state keeps the same face color as idle; hover glow unchanged. */
  const fillVar = "#2d3134";

  return (
    <>
      <BorderConnectionKnob
        edge={position.edge}
        centerX={centerX}
        centerY={centerY}
        viewportWidth={viewport.w}
        viewportHeight={viewport.h}
        isDragging={knobDragging}
        zIndex={knobStackZ}
        onPointerEnter={onKnobPointerEnter}
        onPointerLeave={onKnobPointerLeave}
        onPointerDown={onKnobPointerDown}
        onPointerMove={onKnobPointerMove}
        onPointerUp={endKnobDrag}
        onPointerCancel={endKnobDrag}
        onLostPointerCapture={onKnobLostPointerCapture}
      />
      <button
        type="button"
        onClick={() => onToggle()}
        onPointerEnter={onButtonPointerEnter}
        onPointerLeave={onButtonPointerLeave}
        tabIndex={showAtlasButton ? 0 : -1}
        aria-hidden={!showAtlasButton}
        className={`agent-chat-float-btn group fixed flex cursor-pointer items-center justify-center rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.06)] outline-none ring-0 touch-none select-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent${introLifecycle === "hold" ? " agent-chat-float-btn--intro-dwell" : ""}${introLifecycle === "popIn" && introPoseOut ? " agent-chat-float-btn--intro-pop" : ""}`}
        style={
          {
            left: position.x,
            top: position.y,
            width: BUTTON_SIZE,
            height: BUTTON_SIZE,
            zIndex: buttonStackZ,
            opacity: showAtlasButton ? 1 : 0,
            pointerEvents: showAtlasButton ? "auto" : "none",
            transform: atlasEmergeTransform(position.edge, showAtlasButton),
            transformOrigin: "center center",
            transition: `opacity ${ATLAS_REVEAL_MOTION_MS}ms ${KNOB_MOVE_EASE}, transform ${ATLAS_REVEAL_MOTION_MS}ms ${KNOB_MOVE_EASE}, left ${KNOB_MOVE_MS}ms ${KNOB_MOVE_EASE}, top ${KNOB_MOVE_MS}ms ${KNOB_MOVE_EASE}, box-shadow 220ms ease-out`,
            ["--agent-float-fill" as string]: fillVar,
          } as React.CSSProperties
        }
        aria-label={isChatOpen ? "Close agent chat" : "Open agent chat"}
        aria-pressed={isChatOpen}
        title={isChatOpen ? "Close agent chat" : "Open agent chat"}
      >
        <span className="pointer-events-none flex size-7 origin-center items-center justify-center transition-transform duration-150 ease-out group-active:scale-[0.98]">
          <span
            className={`flex size-full items-center justify-center${isChatOpen ? " agent-chat-float-icon-active" : ""}`}
          >
            <Atlas isActive={isChatOpen} />
          </span>
        </span>
      </button>
    </>
  );
}
