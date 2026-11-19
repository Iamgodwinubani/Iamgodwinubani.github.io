"use client";

import { useReducedMotion } from "motion/react";

const SIGNALS = [
  { label: "Sender identity", result: "Verified", tone: "ok" },
  { label: "Domain history", result: "Recently created", tone: "warn" },
  { label: "Payment request pattern", result: "Unusual urgency", tone: "risk" },
  { label: "Contact details", result: "Consistent", tone: "ok" },
] as const;

const TONE = { ok: "#b5f36b", warn: "#f2c879", risk: "#ff9b85" } as const;

/** Digital trust: signals checked, risk summarised in a single readable verdict. */
export function AuvetraVisual() {
  const reduce = useReducedMotion();

  // Segmented gauge arc
  const cx = 130;
  const cy = 186;
  const r = 82;
  const segments = 24;
  const filled = 16;
  const start = Math.PI * 0.8;
  const sweep = Math.PI * 1.4;

  return (
    <svg viewBox="0 0 600 340" className="absolute inset-0 h-full w-full font-mono" role="img" aria-label="Illustration of a risk assessment panel showing verification signals and an overall risk indicator">
      <g className="text-auvetra">
        <text x="30" y="40" fontSize="9.5" letterSpacing="1.2" fill="#6f746f">
          RISK ASSESSMENT
        </text>

        {/* Gauge */}
        {Array.from({ length: segments }).map((_, i) => {
          const a = start + (sweep * i) / (segments - 1);
          const x1 = cx + Math.cos(a) * (r - 12);
          const y1 = cy + Math.sin(a) * (r - 12);
          const x2 = cx + Math.cos(a) * r;
          const y2 = cy + Math.sin(a) * r;
          return (
            <line
              key={i}
              x1={x1.toFixed(2)}
              y1={y1.toFixed(2)}
              x2={x2.toFixed(2)}
              y2={y2.toFixed(2)}
              stroke={i < filled ? "currentColor" : "rgba(255,255,255,0.14)"}
              strokeOpacity={i < filled ? 0.35 + (i / filled) * 0.65 : 1}
              strokeWidth="3"
            />
          );
        })}
        <text x={cx} y={cy - 4} fontSize="11" letterSpacing="1.4" fill="currentColor" textAnchor="middle">
          ELEVATED
        </text>
        <text x={cx} y={cy + 16} fontSize="9.5" letterSpacing="1" fill="#929792" textAnchor="middle">
          REVIEW ADVISED
        </text>

        {/* Signals panel */}
        <g transform="translate(270 62)">
          <rect width="300" height="216" fill="#0c0f0c" stroke="rgba(255,255,255,0.12)" />
          <text x="16" y="26" fontSize="9.5" letterSpacing="1.2" fill="#6f746f">
            SIGNALS CHECKED
          </text>
          {SIGNALS.map((s, i) => (
            <g key={s.label} transform={`translate(16 ${58 + i * 40})`}>
              <line x1="0" x2="268" y1="-18" y2="-18" stroke="rgba(255,255,255,0.07)" />
              <rect y="-7" width="7" height="7" fill={TONE[s.tone]} />
              <text x="16" y="0" fontSize="11" fill="#F5F5F2">
                {s.label}
              </text>
              <text x="268" y="0" fontSize="10" fill={TONE[s.tone]} textAnchor="end">
                {s.result}
              </text>
            </g>
          ))}
          {/* Scanning line */}
          {!reduce && (
            <rect x="1" width="298" height="28" fill="currentColor" fillOpacity="0.06">
              <animate attributeName="y" values="36;186;36" dur="5s" repeatCount="indefinite" />
            </rect>
          )}
        </g>

        <g transform="translate(30 312)">
          <line x1="0" x2="540" y1="-18" y2="-18" stroke="rgba(255,255,255,0.08)" />
          <text fontSize="10" letterSpacing="1" fill="#929792">
            VERIFY BEFORE YOU PROCEED
          </text>
          <text x="540" fontSize="10" letterSpacing="1" fill="currentColor" textAnchor="end">
            2 SIGNALS NEED ATTENTION
          </text>
        </g>
      </g>
    </svg>
  );
}
