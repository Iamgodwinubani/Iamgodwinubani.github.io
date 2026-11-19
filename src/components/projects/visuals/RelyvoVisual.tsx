"use client";

import { useReducedMotion } from "motion/react";

type Row = { event: string; endpoint: string; status: string; state: "ok" | "retry" | "pending" };

const ROWS: Row[] = [
  { event: "order.created", endpoint: "/hooks/orders", status: "200", state: "ok" },
  { event: "invoice.paid", endpoint: "/hooks/billing", status: "200", state: "ok" },
  { event: "user.updated", endpoint: "/hooks/crm", status: "503", state: "retry" },
  { event: "refund.issued", endpoint: "/hooks/billing", status: "200", state: "ok" },
  { event: "shipment.sent", endpoint: "/hooks/ops", status: "···", state: "pending" },
];

/** Webhook delivery log with a timeline of attempts. */
export function RelyvoVisual() {
  const reduce = useReducedMotion();
  const bars = [6, 9, 5, 11, 8, 12, 7, 10, 13, 9, 6, 11, 8, 14, 10, 7, 12, 9, 11, 8, 13, 10, 6, 9];

  return (
    <svg viewBox="0 0 600 340" className="absolute inset-0 h-full w-full font-mono" role="img" aria-label="Illustration of a webhook event delivery log with delivery statuses and retries">
      <g className="text-relyvo">
        {/* Attempts timeline */}
        <g transform="translate(30 28)">
          <text fontSize="10" letterSpacing="1.2" fill="#6f746f">
            DELIVERY ATTEMPTS
          </text>
          <text x="540" fontSize="10" letterSpacing="1.2" fill="#6f746f" textAnchor="end">
            LIVE
          </text>
          <circle cx="503" cy="-3.5" r="3" fill="currentColor">
            {!reduce && <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />}
          </circle>
          {bars.map((h, i) => (
            <rect
              key={i}
              x={i * 22.6}
              y={58 - h * 3}
              width="14"
              height={h * 3}
              fill={i === 13 ? "#ff9b85" : "currentColor"}
              fillOpacity={i === 13 ? 0.7 : 0.18 + (i / bars.length) * 0.5}
            />
          ))}
          <line x1="0" x2="540" y1="58.5" y2="58.5" stroke="rgba(255,255,255,0.12)" />
        </g>

        {/* Header */}
        <g transform="translate(30 116)" fontSize="9.5" letterSpacing="1.2" fill="#6f746f">
          <text>EVENT</text>
          <text x="190">ENDPOINT</text>
          <text x="370">STATUS</text>
          <text x="540" textAnchor="end">STATE</text>
        </g>

        {ROWS.map((row, i) => {
          const y = 140 + i * 38;
          const color = row.state === "ok" ? "currentColor" : row.state === "retry" ? "#ff9b85" : "#929792";
          const label = row.state === "ok" ? "DELIVERED" : row.state === "retry" ? "RETRYING" : "QUEUED";
          return (
            <g key={row.event} transform={`translate(30 ${y})`}>
              <line x1="0" x2="540" y1="-14" y2="-14" stroke="rgba(255,255,255,0.07)" />
              {row.state === "retry" && <rect x="-30" y="-14" width="600" height="38" fill="#ff9b85" fillOpacity="0.05" />}
              <text y="10" fontSize="11.5" fill="#F5F5F2">
                {row.event}
              </text>
              <text x="190" y="10" fontSize="11" fill="#929792">
                {row.endpoint}
              </text>
              <text x="370" y="10" fontSize="11" fill={color}>
                {row.status}
              </text>
              <g transform="translate(540 0)">
                <rect x="-84" y="-3" width="84" height="20" fill="none" stroke={color} strokeOpacity="0.45" />
                <text x="-42" y="10.5" fontSize="9" letterSpacing="1" fill={color} textAnchor="middle">
                  {label}
                </text>
              </g>
              {row.state === "pending" && !reduce && (
                <rect x="0" y="16" height="1.5" width="540" fill="currentColor" fillOpacity="0.6">
                  <animate attributeName="width" values="0;540" dur="3s" repeatCount="indefinite" />
                </rect>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
