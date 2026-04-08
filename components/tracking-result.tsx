"use client";

import type { TrackingData } from "@/lib/types";
import { TrackingProgress } from "./tracking-progress";
import { TrackingTimeline } from "./tracking-timeline";
import { TrackingSidebar } from "./tracking-sidebar";

export function TrackingResult({ data }: { data: TrackingData }) {
  const info = data.track_info;
  const status = info.latest_status.status;
  const events = info.tracking.providers?.[0]?.events || [];
  const carrier = info.tracking.providers?.[0]?.provider;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
      <TrackingProgress milestones={info.milestone} currentStatus={status} />

      <div style={{ minHeight: 100, display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: 20, width: "100%", overflow: "hidden" }}>
          <TrackingTimeline events={events} statusLabel={status} />
          <TrackingSidebar
            trackingNumber={data.number}
            carrierName={carrier?.name || ""}
            carrierHomepage={carrier?.homepage || ""}
          />
        </div>
      </div>
    </div>
  );
}
