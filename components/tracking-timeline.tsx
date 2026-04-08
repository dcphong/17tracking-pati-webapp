"use client";

import type { TrackingEvent } from "@/lib/types";
import { STATUS_MAP } from "@/lib/types";

/* eslint-disable @next/next/no-img-element */

function getEventBadge(stage: string, subStatus: string) {
  if (stage === "Exception" || subStatus.startsWith("Exception") || subStatus.startsWith("Undelivered")) {
    return <img src="/icons/exception.svg" alt="" style={{ width: 24, height: 24 }} />;
  }
  if (stage === "PickedUp" || subStatus.startsWith("PickedUp")) {
    return <img src="/icons/pickup.svg" alt="" style={{ width: 24, height: 24 }} />;
  }
  return <img src="/icons/blank.svg" alt="" style={{ width: 24, height: 24 }} />;
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function TrackingTimeline({ events, statusLabel }: { events: TrackingEvent[]; statusLabel: string }) {
  return (
    <div style={{ float: "left", width: "68%", boxSizing: "border-box", padding: "0 16px 16px", borderRadius: 8, border: "1px solid #d9d9d9" }}>
      <h2 style={{ fontSize: 25, marginBlockStart: 16, fontWeight: 550, marginBottom: 30 }}>
        {STATUS_MAP[statusLabel] || statusLabel}
      </h2>

      <div style={{ width: "100%", flexDirection: "column", justifyContent: "flex-start", alignItems: "stretch", gap: 20, display: "inline-flex" }}>
        {events.map((event, idx) => (
          <div key={idx} style={{ justifyContent: "flex-start", alignItems: "stretch", gap: 8, display: "inline-flex" }}>
            <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "center", display: "inline-flex", position: "relative" }}>
              <div style={{ float: "left", width: 24, height: 24, position: "relative" }}>
                {getEventBadge(event.stage, event.sub_status)}
              </div>
              {idx < events.length - 1 && (
                <div style={{ width: 2, height: "100%", backgroundColor: "#efefef", marginBottom: -10, minHeight: 40 }} />
              )}
            </div>

            <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "stretch", display: "inline-flex", width: "100%" }}>
              <div style={{ marginLeft: 12, boxShadow: "0px 4px 6px -2px rgba(26, 26, 26, 0.2)", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex", borderRadius: 8 }}>
                <div style={{ padding: "10px 14px", background: "#f5f6fa", borderRadius: 8, flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: 2, display: "inline-flex", position: "relative", width: "100%", boxSizing: "border-box" }}>
                  <div style={{ position: "absolute", top: 2, left: -5, width: 0, height: 0, borderStyle: "solid", borderWidth: "8px 8px 8px 0", borderColor: "transparent #f5f6fa transparent transparent" }} />
                  <div style={{ color: "#303030", fontSize: 14, fontWeight: 400, lineHeight: "22px", wordWrap: "break-word" }}>
                    {event.description}
                    {event.location && <span style={{ color: "#999" }}>, {event.location}</span>}
                  </div>
                  <div style={{ textAlign: "left", color: "#616161", fontSize: 13, fontWeight: 400, lineHeight: "20px" }}>
                    {formatDate(event.time_iso)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
