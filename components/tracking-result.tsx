"use client";

import type { TrackingData, ProductInfo } from "@/lib/types";
import { TrackingProgress } from "./tracking-progress";
import { TrackingTimeline } from "./tracking-timeline";
import { TrackingSidebar } from "./tracking-sidebar";
import { FloatingWidget } from "./floating-widget";


function isChinaCarrier(carrier: any): boolean {
  if (!carrier) return false;
  return carrier.country === "CN";
}

export function TrackingResult({ data, products, shopifyDomain }: { data: TrackingData; products?: ProductInfo[]; shopifyDomain?: string }) {
  const info = data.track_info;
  const status = info.latest_status.status;
  const rawEvents = info.tracking.providers?.[0]?.events || [];
  const carrier = info.tracking.providers?.[0]?.provider;

  const events = rawEvents;

  // Hide carrier if China-based
  const showCarrier = !isChinaCarrier(carrier);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
      <div style={{ marginTop: 40, marginBottom: 40 }}>
        <TrackingProgress milestones={info.milestone} currentStatus={status} />
      </div>

      <div style={{ minHeight: 100, display: "flex", flexDirection: "column" }}>
        <div className="tracking-content" style={{ marginBottom: 20, width: "100%", overflow: "hidden" }}>
          <TrackingTimeline events={events} statusLabel={status} />
          <TrackingSidebar
            trackingNumber={data.number}
            carrierName={showCarrier ? (carrier?.name || "") : ""}
            carrierHomepage={showCarrier ? (carrier?.homepage || "") : ""}
            products={products || []}
          />
        </div>
      </div>

      <FloatingWidget products={products || []} shopifyDomain={shopifyDomain || ""} />
    </div>
  );
}
