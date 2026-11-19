"use client";

import { useReducedMotion } from "motion/react";

const SOURCES = ["CHECKOUT", "API REQUEST", "INVOICE"];
const TARGETS = ["PROVIDER A", "PROVIDER B", "PROVIDER C"];
const ROWS = [62, 152, 242];

/** Payment orchestration: many entry points routed through one coordinated layer. */
export function QuentavoVisual() {
  const reduce = useReducedMotion();

  const inPath = (y: number) => `M150 ${y + 18} C200 ${y + 18} 196 170 236 170`;
  const outPath = (y: number) => `M364 170 C404 170 400 ${y + 18} 450 ${y + 18}`;

  return (
    <svg viewBox="0 0 600 340" className="absolute inset-0 h-full w-full font-mono" role="img" aria-label="Illustration of payment flows routed through an orchestration layer to multiple providers">
      <g className="text-quentavo">
        {/* Connections */}
        {ROWS.map((y) => (
          <g key={y} fill="none" strokeWidth="1">
            <path d={inPath(y)} stroke="rgba(255,255,255,0.16)" />
            <path d={outPath(y)} stroke="rgba(255,255,255,0.16)" />
          </g>
        ))}
        {/* Highlighted active route */}
        <path d={inPath(ROWS[0])} stroke="currentColor" strokeOpacity="0.7" fill="none" />
        <path d={outPath(ROWS[1])} stroke="currentColor" strokeOpacity="0.7" fill="none" />

        {/* Moving payments */}
        {!reduce &&
          ROWS.map((y, i) => (
            <g key={`dots-${y}`}>
              <circle r="3" fill="currentColor">
                <animateMotion dur="2.6s" begin={`${i * 0.85}s`} repeatCount="indefinite" path={inPath(y)} />
              </circle>
              <circle r="3" fill="currentColor">
                <animateMotion dur="2.6s" begin={`${i * 0.85 + 1.3}s`} repeatCount="indefinite" path={outPath(ROWS[(i + 1) % 3])} />
              </circle>
            </g>
          ))}

        {/* Sources */}
        {SOURCES.map((label, i) => (
          <g key={label} transform={`translate(30 ${ROWS[i]})`}>
            <rect width="120" height="36" fill="#0c0f0c" stroke="rgba(255,255,255,0.12)" />
            <text x="12" y="22" fontSize="10" letterSpacing="1.2" fill="#929792">
              {label}
            </text>
          </g>
        ))}

        {/* Hub */}
        <g transform="translate(236 104)">
          <rect width="128" height="132" fill="#0c0f0c" stroke="currentColor" strokeOpacity="0.55" />
          <rect width="128" height="26" fill="currentColor" fillOpacity="0.1" />
          <text x="12" y="17" fontSize="10" letterSpacing="1.4" fill="currentColor">
            QUENTAVO
          </text>
          {["Rules", "Routing", "State", "Retries"].map((t, i) => (
            <g key={t} transform={`translate(12 ${46 + i * 21})`}>
              <rect width="6" height="6" y="-6" fill={i === 1 ? "currentColor" : "rgba(255,255,255,0.18)"} />
              <text x="14" y="0" fontSize="10.5" fill={i === 1 ? "#F5F5F2" : "#929792"}>
                {t}
              </text>
            </g>
          ))}
        </g>

        {/* Targets */}
        {TARGETS.map((label, i) => (
          <g key={label} transform={`translate(450 ${ROWS[i]})`}>
            <rect width="120" height="36" fill="#0c0f0c" stroke={i === 1 ? "currentColor" : "rgba(255,255,255,0.12)"} strokeOpacity={i === 1 ? 0.55 : 1} />
            <text x="12" y="22" fontSize="10" letterSpacing="1.2" fill={i === 1 ? "#F5F5F2" : "#929792"}>
              {label}
            </text>
          </g>
        ))}

        {/* Transaction strip */}
        <g transform="translate(30 300)">
          <line x1="0" x2="540" y1="-14" y2="-14" stroke="rgba(255,255,255,0.08)" />
          <text fontSize="10" letterSpacing="1" fill="#6f746f">
            TXN
          </text>
          <text x="38" fontSize="10" letterSpacing="1" fill="#929792">
            Initiated
          </text>
          <text x="118" fontSize="10" fill="#6f746f">→</text>
          <text x="138" fontSize="10" letterSpacing="1" fill="#929792">
            Routed
          </text>
          <text x="200" fontSize="10" fill="#6f746f">→</text>
          <text x="220" fontSize="10" letterSpacing="1" fill="currentColor">
            Authorized
          </text>
          <text x="540" fontSize="10" letterSpacing="1" fill="#6f746f" textAnchor="end">
            ONE LAYER · MANY FLOWS
          </text>
        </g>
      </g>
    </svg>
  );
}
