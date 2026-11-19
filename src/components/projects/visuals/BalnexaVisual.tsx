"use client";

import { useReducedMotion } from "motion/react";

const LEFT = [
  { ref: "INV-1042", amount: "1,250.00" },
  { ref: "INV-1043", amount: "380.40" },
  { ref: "INV-1044", amount: "2,900.00" },
  { ref: "INV-1045", amount: "74.99" },
  { ref: "INV-1046", amount: "615.00" },
];

const RIGHT = [
  { ref: "TRF 0193", amount: "380.40" },
  { ref: "TRF 0194", amount: "1,250.00" },
  { ref: "TRF 0195", amount: "615.00" },
  { ref: "TRF 0196", amount: "2,900.00" },
  { ref: "TRF 0197", amount: "79.99" },
];

// left index -> right index
const MATCHES: [number, number][] = [
  [0, 1],
  [1, 0],
  [2, 3],
  [4, 2],
];

/** Reconciliation: two sets of records matched line by line, exceptions surfaced. */
export function BalnexaVisual() {
  const reduce = useReducedMotion();
  const rowY = (i: number) => 74 + i * 44;

  return (
    <svg viewBox="0 0 600 340" className="absolute inset-0 h-full w-full font-mono" role="img" aria-label="Illustration of transaction records from two sources being matched, with one exception flagged for review">
      <g className="text-balnexa">
        <g fontSize="9.5" letterSpacing="1.2" fill="#6f746f">
          <text x="30" y="40">INTERNAL RECORDS</text>
          <text x="570" y="40" textAnchor="end">BANK STATEMENT</text>
        </g>

        {/* Match lines */}
        {MATCHES.map(([l, r], i) => {
          const d = `M222 ${rowY(l)} C300 ${rowY(l)} 300 ${rowY(r)} 378 ${rowY(r)}`;
          return (
            <path
              key={`${l}-${r}`}
              d={d}
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.55"
              strokeDasharray={reduce ? undefined : "240"}
              strokeDashoffset={reduce ? undefined : "240"}
            >
              {!reduce && (
                <animate attributeName="stroke-dashoffset" values="240;0;0;240" keyTimes="0;0.35;0.85;1" dur="6s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
              )}
            </path>
          );
        })}

        {/* Records */}
        {LEFT.map((row, i) => {
          const exception = i === 3;
          return (
            <g key={row.ref} transform={`translate(30 ${rowY(i) - 16})`}>
              <rect width="192" height="32" fill="#0c0f0c" stroke={exception ? "#ff9b85" : "rgba(255,255,255,0.12)"} strokeOpacity={exception ? 0.6 : 1} />
              <text x="12" y="20" fontSize="11" fill="#929792">
                {row.ref}
              </text>
              <text x="180" y="20" fontSize="11.5" fill="#F5F5F2" textAnchor="end">
                {row.amount}
              </text>
            </g>
          );
        })}
        {RIGHT.map((row, i) => {
          const exception = i === 4;
          return (
            <g key={row.ref} transform={`translate(378 ${rowY(i) - 16})`}>
              <rect width="192" height="32" fill="#0c0f0c" stroke={exception ? "#ff9b85" : "rgba(255,255,255,0.12)"} strokeOpacity={exception ? 0.6 : 1} />
              <text x="12" y="20" fontSize="11" fill="#929792">
                {row.ref}
              </text>
              <text x="180" y="20" fontSize="11.5" fill="#F5F5F2" textAnchor="end">
                {row.amount}
              </text>
            </g>
          );
        })}

        {/* Match nodes */}
        {MATCHES.map(([l, r]) => (
          <g key={`n-${l}`}>
            <rect x="219" y={rowY(l) - 3} width="6" height="6" fill="currentColor" />
            <rect x="375" y={rowY(r) - 3} width="6" height="6" fill="currentColor" />
          </g>
        ))}

        {/* Summary */}
        <g transform="translate(30 312)">
          <line x1="0" x2="540" y1="-18" y2="-18" stroke="rgba(255,255,255,0.08)" />
          <rect width="7" height="7" y="-7" fill="currentColor" />
          <text x="16" fontSize="10" letterSpacing="1" fill="#F5F5F2">
            4 MATCHED
          </text>
          <rect x="120" width="7" height="7" y="-7" fill="#ff9b85" />
          <text x="136" fontSize="10" letterSpacing="1" fill="#ff9b85">
            1 EXCEPTION · AMOUNT MISMATCH
          </text>
          <text x="540" fontSize="10" letterSpacing="1" fill="#6f746f" textAnchor="end">
            NEEDS REVIEW
          </text>
        </g>
      </g>
    </svg>
  );
}
