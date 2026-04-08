"use client";

import type { TrackingData } from "@/lib/types";
import { TrackingProgress } from "./tracking-progress";
import { TrackingTimeline } from "./tracking-timeline";
import { TrackingSidebar } from "./tracking-sidebar";

export function TrackingResult({ data }: { data: TrackingData }) {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
      {/* Order title - matches .tm_tracking_result_title */}
      <div style={{ textAlign: "center", marginTop: 60 }}>
        <h1 style={{ fontSize: 26, fontWeight: 400, lineHeight: "32px" }}>
          Order {data.order_number}
        </h1>
      </div>

      {/* Progress bar */}
      <TrackingProgress
        statusNode={data.status_node}
        currentStatus={data.status}
      />

      {/* Result area - float layout matching original */}
      <div style={{ minHeight: 100, display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: 20, width: "100%", overflow: "hidden" }}>
          {/* Left: Timeline (68%) */}
          <div>
            <TrackingTimeline events={data.trackinfo} statusLabel={data.status} />
          </div>
          {/* Right: Sidebar (30%) */}
          <TrackingSidebar
            trackingNumber={data.track_number}
            products={data.title}
          />
        </div>
      </div>
    </div>
  );
}
