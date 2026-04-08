"use client";

import type { Milestone } from "@/lib/types";
import { STATUS_MAP } from "@/lib/types";

const STAGE_ORDER = ["InfoReceived", "PickedUp", "InTransit", "OutForDelivery", "Delivered"];

const STAGE_LABELS: Record<string, string> = {
  InfoReceived: "Info Received",
  PickedUp: "Picked Up",
  InTransit: "In Transit",
  OutForDelivery: "Out for Delivery",
  Delivered: "Delivered",
  Exception: "Exception",
};

function ProgressIcon({ stage, color }: { stage: string; color: string }) {
  switch (stage) {
    case "InfoReceived":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      );
    case "PickedUp":
      return (
        <svg width="28" height="28" viewBox="0 0 1024 1024" fill={color}>
          <path d="M922.9 335.2H304.5l-27.6-138H128v69h86.4l110.5 552.3h493.3v-69H387.4l-13.8-69h480.4l68.9-345.3zM806.7 611.5H359.8l-41.4-207.3h535.2l-46.9 207.3z"/>
          <path d="M359.8 818.5m-55.2 0a55.2 55.2 0 1 0 110.4 0 55.2 55.2 0 1 0-110.4 0Z"/>
          <path d="M731.8 818.5m-55.2 0a55.2 55.2 0 1 0 110.4 0 55.2 55.2 0 1 0-110.4 0Z"/>
        </svg>
      );
    case "InTransit":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <path d="M20 8h-3V4H1v13h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
      );
    case "OutForDelivery":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
          <path d="M12 17l-5-5 1.41-1.41L12 14.17l3.59-3.58L17 12z"/>
        </svg>
      );
    case "Delivered":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="12" fill={color}/>
          <path fillRule="evenodd" clipRule="evenodd" d="M19.69 6.62a1.07 1.07 0 010 1.51l-9.24 9.24a1.07 1.07 0 01-1.51 0l-4.62-4.62a1.07 1.07 0 011.51-1.51l3.87 3.87 8.49-8.49a1.07 1.07 0 011.5 0z" fill="white"/>
        </svg>
      );
    case "Exception":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
        </svg>
      );
    default:
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" fill="white" stroke={color} strokeWidth="2"/>
        </svg>
      );
  }
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function TrackingProgress({ milestones, currentStatus }: { milestones: Milestone[]; currentStatus: string }) {
  const isException = currentStatus === "Exception" || currentStatus === "Undelivered" || currentStatus === "Alert";

  // Build milestone lookup
  const milestoneMap = new Map<string, Milestone>();
  for (const m of milestones) {
    milestoneMap.set(m.key_stage, m);
  }

  let stages = [...STAGE_ORDER];
  if (isException) {
    stages = [...stages, "Exception"];
  }

  return (
    <div style={{ width: "100%", marginBottom: 20 }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", margin: "20px auto", width: "100%" }}>
        {stages.map((stage, idx) => {
          const isLast = idx === stages.length - 1;
          const m = milestoneMap.get(stage);
          const reached = !!(m?.time_iso) || (stage === "Exception" && isException);
          const nextReached = !isLast && !!(milestoneMap.get(stages[idx + 1])?.time_iso);
          const color = reached
            ? (stage === "Exception" ? "#e53935" : "#008000")
            : "#CDCDCD";

          return (
            <div key={stage} style={{ display: "flex", alignItems: "flex-start", flex: isLast ? "0 0 auto" : 1 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 100, maxWidth: 160 }}>
                <ProgressIcon stage={stage} color={color} />
                <span style={{ fontSize: 14, fontWeight: 550, lineHeight: 1.25, color, marginTop: 4, textAlign: "center", whiteSpace: "nowrap" }}>
                  {STAGE_LABELS[stage] || STATUS_MAP[stage] || stage}
                </span>
                {m?.time_iso && (
                  <span style={{ fontSize: 13, marginTop: 4, color: "#707070", textAlign: "center", maxWidth: 130, display: "block", lineHeight: 1.4 }}>
                    {formatDate(m.time_iso)}
                  </span>
                )}
              </div>

              {!isLast && (
                <div style={{
                  flex: 1, margin: "12px 4px 0", height: 5, borderRadius: 8,
                  background: reached && nextReached ? "#008000" : reached ? "linear-gradient(to right, #008000, #efefef)" : "#efefef",
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
