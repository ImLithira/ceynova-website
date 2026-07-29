import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Point = { x: number; y: number };

type Pair = {
  from: [number, number];
  to: [number, number];
  variant: "primary" | "secondary";
  appearFrame: number;
  sweepDelay: number;
  cycleFrames: number;
  pulse?: "sky" | "pink";
};

const COLORS = {
  slate: "#2c2f36",
  gold: "#a6895a",
  sky: "#7dd3fc",
  pink: "#e0438f",
};

const SWEEP_FRAMES = 38;
const FADE_FRAMES = 18;
const TRAIL_FRACTION = 0.42;

/**
 * Strictly isolated 1-to-1 connections: each pair owns two nodes that never
 * appear anywhere else. Widely scattered across the canvas, no grid, no
 * shared vertices, no polygons -- just disconnected pairs of points.
 */
const PAIRS: Pair[] = [
  { from: [150, 190], to: [430, 380], variant: "primary", appearFrame: 0, sweepDelay: 90, cycleFrames: 85 },
  { from: [630, 100], to: [510, 460], variant: "secondary", appearFrame: 9, sweepDelay: 96, cycleFrames: 97 },
  { from: [910, 60], to: [1160, 300], variant: "primary", appearFrame: 18, sweepDelay: 102, cycleFrames: 109, pulse: "sky" },
  { from: [1370, 150], to: [1180, 480], variant: "secondary", appearFrame: 27, sweepDelay: 108, cycleFrames: 85 },
  { from: [1530, 400], to: [1300, 630], variant: "primary", appearFrame: 36, sweepDelay: 114, cycleFrames: 97 },
  { from: [80, 540], to: [340, 710], variant: "secondary", appearFrame: 45, sweepDelay: 120, cycleFrames: 109 },
  { from: [560, 770], to: [830, 570], variant: "primary", appearFrame: 54, sweepDelay: 126, cycleFrames: 85, pulse: "pink" },
  { from: [980, 810], to: [1130, 570], variant: "secondary", appearFrame: 63, sweepDelay: 132, cycleFrames: 97 },
  { from: [1420, 770], to: [1560, 540], variant: "primary", appearFrame: 72, sweepDelay: 138, cycleFrames: 109 },
];

const quadraticPoint = (p0: Point, control: Point, p2: Point, t: number): Point => ({
  x: (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * control.x + t ** 2 * p2.x,
  y: (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * control.y + t ** 2 * p2.y,
});

const controlPointFor = (from: Point, to: Point, bend: number): Point => {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  return { x: mx + nx * bend, y: my + ny * bend };
};

/** Gentle organic drift so resting nodes still feel alive, not static dots. */
const drift = (frame: number, fps: number, seed: number, amplitude: number, speed: number) =>
  Math.sin((frame / fps) * speed + seed) * amplitude;

export const Network: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const driftPoint = (point: [number, number]): Point => ({
    x: point[0] + drift(frame, fps, point[0] * 0.7, 3, 0.22),
    y: point[1] + drift(frame, fps, point[1] * 0.9, 3, 0.18),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <svg viewBox="0 0 1600 900" width="100%" height="100%" style={{ overflow: "visible" }}>
        <defs>
          <filter
            id="soft-glow"
            x="-80%"
            y="-80%"
            width="260%"
            height="260%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {PAIRS.map((pair, i) => {
          const from = driftPoint(pair.from);
          const to = driftPoint(pair.to);

          const dist = Math.hypot(to.x - from.x, to.y - from.y);
          // Shallow bend -- a gentle arc, never a deep loop.
          const bend = dist * 0.12 * (i % 2 === 0 ? 1 : -1) + ((i % 3) - 1) * 8;
          const control = controlPointFor(from, to, bend);

          const pathD = `M ${from.x} ${from.y} Q ${control.x} ${control.y} ${to.x} ${to.y}`;
          const length =
            Math.hypot(control.x - from.x, control.y - from.y) +
            Math.hypot(to.x - control.x, to.y - control.y);

          const sinceDelay = frame - pair.sweepDelay;
          const local = sinceDelay >= 0 ? sinceDelay % pair.cycleFrames : -1;
          const active = local >= 0;

          // Head travels 0 -> 1 across the sweep, then holds at the
          // destination while the whole trail fades out.
          const t = interpolate(active ? local : -1, [0, SWEEP_FRAMES], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.inOut(Easing.cubic),
          });

          const trailOpacity = active
            ? interpolate(
                local,
                [0, SWEEP_FRAMES, SWEEP_FRAMES + FADE_FRAMES],
                [1, 1, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              )
            : 0;

          const trailLength = length * TRAIL_FRACTION;
          const dashOffset = t * length - trailLength;

          const tailU = Math.min(Math.max(dashOffset / length, 0), 1);
          const headU = Math.min(Math.max((dashOffset + trailLength) / length, 0), 1);
          const tailPoint = quadraticPoint(from, control, to, tailU);
          const headPoint = quadraticPoint(from, control, to, headU);

          const baseColor = pair.variant === "primary" ? COLORS.gold : COLORS.slate;
          const headColor = pair.pulse ? (pair.pulse === "sky" ? COLORS.sky : COLORS.pink) : baseColor;
          const strokeWidth = pair.variant === "primary" ? 3 : 1.75;
          const gradientId = `trail-grad-${i}`;

          return (
            <g key={`${pair.from.join(",")}-${pair.to.join(",")}-${i}`}>
              <linearGradient
                id={gradientId}
                gradientUnits="userSpaceOnUse"
                x1={tailPoint.x}
                y1={tailPoint.y}
                x2={headPoint.x}
                y2={headPoint.y}
              >
                <stop offset="0%" stopColor={baseColor} stopOpacity={0} />
                <stop offset="100%" stopColor={baseColor} stopOpacity={0.95} />
              </linearGradient>

              {trailOpacity > 0.05 && (
                <>
                  <path
                    d={pathD}
                    fill="none"
                    stroke={`url(#${gradientId})`}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={`${trailLength} ${length}`}
                    strokeDashoffset={dashOffset}
                    opacity={trailOpacity}
                  />
                  <circle
                    cx={headPoint.x}
                    cy={headPoint.y}
                    r={pair.pulse ? 5 : 3.5}
                    fill={headColor}
                    filter={pair.pulse ? "url(#soft-glow)" : undefined}
                    opacity={trailOpacity}
                  />
                </>
              )}
            </g>
          );
        })}

        {PAIRS.map((pair) => {
          const sinceDelay = frame - pair.sweepDelay;
          const local = sinceDelay >= 0 ? sinceDelay % pair.cycleFrames : -1;
          const active = local >= 0;

          const arrivalFlash = pair.pulse
            ? interpolate(
                active ? local : -1,
                [SWEEP_FRAMES - 6, SWEEP_FRAMES, SWEEP_FRAMES + 22],
                [0, 1, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              )
            : 0;
          const flashColor = pair.pulse === "sky" ? COLORS.sky : COLORS.pink;

          return ([pair.from, pair.to] as [number, number][]).map((raw, nodeIndex) => {
            const isDestination = nodeIndex === 1;
            const appear = spring({
              frame,
              fps,
              delay: pair.appearFrame + nodeIndex * 5,
              config: { damping: 12, stiffness: 120, mass: 0.6 },
            });

            const { x, y } = driftPoint(raw);
            const flash = isDestination ? arrivalFlash : 0;
            const baseRadius = 8 + drift(frame, fps, raw[0], 0.6, 0.35);

            return (
              <g key={`${pair.from.join(",")}-${pair.to.join(",")}-node-${nodeIndex}`} opacity={appear}>
                {flash > 0.05 && (
                  <circle
                    cx={x}
                    cy={y}
                    r={baseRadius + 10 * flash}
                    fill={flashColor}
                    opacity={flash * 0.35}
                    filter="url(#soft-glow)"
                  />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={baseRadius * (0.6 + appear * 0.4)}
                  fill={flash > 0.05 ? flashColor : COLORS.slate}
                  opacity={0.9}
                />
              </g>
            );
          });
        })}
      </svg>
    </AbsoluteFill>
  );
};
