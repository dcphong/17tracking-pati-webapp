"use client";

import { useState } from "react";
import type { TrackingData } from "@/lib/types";

interface TrackingFormProps {
  onResult: (data: TrackingData) => void;
  onLoading: (loading: boolean) => void;
  onError: (error: string | null) => void;
}

const API_URL =
  "https://tms.trackingmore.net/api/v2/track-page/back-data";
const SHOP = "e49d78-3.myshopify.com";
const USER_ID = 33175;

export function TrackingForm({ onResult, onLoading, onError }: TrackingFormProps) {
  const [orderNumber, setOrderNumber] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleTrack = async (type: "order" | "number", value: string) => {
    if (!value.trim()) return;
    onLoading(true);
    onError(null);

    try {
      const params = new URLSearchParams({
        nums: value.trim(),
        user_id: String(USER_ID),
        track_type: type,
        shop: SHOP,
      });

      const res = await fetch(`${API_URL}?${params}`);
      const json = await res.json();

      if (json.data?.tracking?.[0]) {
        const tracking = json.data.tracking[0];
        tracking.order_number = json.data.order_number;
        onResult(tracking);
      } else {
        onError(json.message || "Could not find order. Please check your input.");
      }
    } catch {
      onError("An error occurred. Please try again later.");
    } finally {
      onLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 1200,
        width: "100%",
        margin: "0 auto",
        border: "none",
        borderRadius: 0,
        padding: "40px 60px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 0,
        }}
      >
        {/* Order Number */}
        <div style={{ flex: 1 }}>
          <label
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 8,
              color: "#000",
            }}
          >
            Order Number
          </label>
          <input
            placeholder="#WN196196"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleTrack("order", orderNumber)
            }
            style={{
              width: "100%",
              maxWidth: 300,
              padding: "8px 12px",
              borderRadius: 4,
              border: "1px solid #ccc",
              fontSize: 14,
              lineHeight: "20px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <div style={{ marginTop: 12 }}>
            <button
              onClick={() => handleTrack("order", orderNumber)}
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
              }}
            >
              Track
            </button>
          </div>
        </div>

        {/* OR Divider */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            alignSelf: "stretch",
            margin: "0 30px",
            minHeight: 120,
          }}
        >
          <div
            style={{
              width: 1,
              flex: 1,
              borderLeft: "1px dashed #ccc",
            }}
          />
          <span
            style={{
              color: "#999",
              fontSize: 14,
              padding: "8px 0",
              fontWeight: 500,
            }}
          >
            OR
          </span>
          <div
            style={{
              width: 1,
              flex: 1,
              borderLeft: "1px dashed #ccc",
            }}
          />
        </div>

        {/* Tracking Number */}
        <div style={{ flex: 1 }}>
          <label
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 8,
              color: "#000",
            }}
          >
            Tracking Number
          </label>
          <input
            placeholder="PG16185056394DE"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleTrack("number", trackingNumber)
            }
            style={{
              width: "100%",
              maxWidth: 300,
              padding: "8px 12px",
              borderRadius: 4,
              border: "1px solid #ccc",
              fontSize: 14,
              lineHeight: "20px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <div style={{ marginTop: 12 }}>
            <button
              onClick={() => handleTrack("number", trackingNumber)}
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
              }}
            >
              Track
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
