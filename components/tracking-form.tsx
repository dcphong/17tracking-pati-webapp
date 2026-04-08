"use client";

import { useState } from "react";
import type { TrackingData } from "@/lib/types";

interface TrackingFormProps {
  onResult: (data: TrackingData) => void;
  onLoading: (loading: boolean) => void;
  onError: (error: string | null) => void;
  initialValue?: string;
}

export function TrackingForm({ onResult, onLoading, onError, initialValue = "" }: TrackingFormProps) {
  const [trackingNumber, setTrackingNumber] = useState(initialValue);

  const handleTrack = async () => {
    const value = trackingNumber.trim();
    if (!value) return;
    onLoading(true);
    onError(null);

    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tracking_number: value }),
      });
      const json = await res.json();

      if (!res.ok) {
        onError(json.error || "Could not find tracking info. Please check your input.");
        return;
      }

      onResult(json.data);
    } catch {
      onError("An error occurred. Please try again later.");
    } finally {
      onLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, width: "100%", margin: "0 auto", padding: "0 20px", boxSizing: "border-box" }}>
      <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: 8, color: "#000" }}>
        Tracking Number
      </label>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          placeholder="Enter your tracking number"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleTrack()}
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: 4,
            border: "1px solid #ccc",
            fontSize: 14,
            lineHeight: "20px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
        <button
          onClick={handleTrack}
          style={{
            backgroundColor: "#007a5c",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "10px 28px",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            lineHeight: "20px",
            whiteSpace: "nowrap",
          }}
        >
          Track
        </button>
      </div>
    </div>
  );
}
