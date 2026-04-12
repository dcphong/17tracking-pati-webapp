"use client";

import type { TrackingEvent } from "@/lib/types";
import { STATUS_MAP } from "@/lib/types";

/* eslint-disable @next/next/no-img-element */

function getEventBadge(stage: string, subStatus: string, isFirst: boolean) {
  const desc = subStatus.toLowerCase();

  // Delivered — green filled circle with checkmark
  if (stage === "Delivered" || desc.includes("delivered")) {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="14" fill="#22c55e" />
        <path d="M8 14.5l3.5 3.5L20 10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Out for delivery — orange filled circle with truck
  if (stage === "OutForDelivery" || desc.includes("out_for_delivery") || desc.includes("outfordelivery")) {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="14" fill="#f59e0b" />
        <path d="M8 10h6v6H8z M14 12h3l2 2v2h-5z M10.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z M17.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Exception / Undelivered — red circle with !
  if (stage === "Exception" || desc.includes("exception") || desc.includes("undelivered") || desc.includes("alert")) {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="14" fill="#ef4444" />
        <rect x="13" y="8" width="2" height="8" rx="1" fill="#fff" />
        <circle cx="14" cy="19.5" r="1.2" fill="#fff" />
      </svg>
    );
  }

  // Picked up — green outline circle with box
  if (stage === "PickedUp" || desc.includes("pickup") || desc.includes("picked_up") || desc.includes("collected")) {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="13" stroke="#22c55e" strokeWidth="2" fill="#fff" />
        <path d="M10 11l4-2 4 2v6l-4 2-4-2z M14 9v8 M10 11l4 2 4-2" stroke="#22c55e" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // First event (latest) gets a blue dot if no specific stage
  if (isFirst) {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="8" fill="#3b82f6" />
        <circle cx="14" cy="14" r="13" stroke="#3b82f6" strokeWidth="2" fill="none" opacity="0.3" />
      </svg>
    );
  }

  // Default — gray outline circle
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="10" stroke="#d1d5db" strokeWidth="2" fill="#fff" />
    </svg>
  );
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function TrackingTimeline({ events, statusLabel }: { events: TrackingEvent[]; statusLabel: string }) {
  return (
    <div className="tracking-timeline" style={{ float: "left", width: "68%", boxSizing: "border-box", padding: "0 16px 16px" }}>
      <h2 style={{ fontSize: 25, marginBlockStart: 16, fontWeight: 550, marginBottom: 30, position: "sticky", top: 0, background: "#fff", zIndex: 2, paddingBottom: 8 }}>
        {STATUS_MAP[statusLabel] || statusLabel}
      </h2>

      <div className="timeline-scroll" style={{ maxHeight: 500, overflowY: "auto", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {events.map((event, idx) => (
            <div key={idx} style={{ display: "flex", gap: 8, position: "relative" }}>
              {/* Vertical line */}
              {idx < events.length - 1 && (
                <div style={{
                  position: "absolute", left: 11, top: 24, bottom: 0,
                  width: 2, background: "#efefef", zIndex: 0,
                }} />
              )}

              {/* Badge — sticky within scroll container */}
              <div style={{
                position: "sticky", top: 0, zIndex: 1,
                width: 24, minWidth: 24, height: 24,
                background: "#fff", borderRadius: "50%",
                alignSelf: "flex-start",
              }}>
                {getEventBadge(event.stage, event.sub_status, idx === 0)}
              </div>

              {/* Content bubble */}
              <div style={{ flex: 1, paddingBottom: 16, paddingLeft: 12 }}>
                <div style={{
                  boxShadow: "0px 4px 6px -2px rgba(26, 26, 26, 0.2)",
                  borderRadius: 8, position: "relative",
                }}>
                  <div style={{
                    padding: "10px 14px", background: "#f5f6fa", borderRadius: 8,
                    display: "flex", flexDirection: "column", gap: 2,
                  }}>
                    {/* Arrow */}
                    <div style={{
                      position: "absolute", top: 2, left: -5,
                      width: 0, height: 0, borderStyle: "solid",
                      borderWidth: "8px 8px 8px 0",
                      borderColor: "transparent #f5f6fa transparent transparent",
                    }} />
                    <div style={{ color: "#303030", fontSize: 14, fontWeight: 400, lineHeight: "22px", wordWrap: "break-word" }}>
                      {event.description}
                      {event.location && !/[\u4e00-\u9fff]/.test(event.location) && !/\b(Guangzhou|Shenzhen|Shanghai|Beijing|Hangzhou|Dongguan|Foshan|Zhongshan|Xiamen|Chengdu|Wuhan|Nanjing|Tianjin|Chongqing|Suzhou|Qingdao|Dalian|Ningbo|Hefei|Changsha|Kunming|Fuzhou|Zhengzhou|Jinan|Sorting Centre|CN|China)\b/i.test(event.location) && (
                        <span style={{ color: "#999" }}>, {event.location}</span>
                      )}
                    </div>
                    <div style={{ color: "#616161", fontSize: 13, fontWeight: 400, lineHeight: "20px" }}>
                      {formatDate(event.time_iso)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
