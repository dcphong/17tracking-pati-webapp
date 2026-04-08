"use client";

import { useState } from "react";
import { Ticker } from "@/components/ticker";
import { Header } from "@/components/header";
import { TrackingForm } from "@/components/tracking-form";
import { TrackingResult } from "@/components/tracking-result";
import type { TrackingData } from "@/lib/types";

export default function Home() {
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col flex-1 bg-white">
      <Ticker />
      <Header />

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px 20px",
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            fontSize: 26,
            fontWeight: 400,
            lineHeight: "32px",
            textAlign: "center",
            marginBottom: 24,
            color: "#000",
          }}
        >
          Track Your Order
        </h1>

        <TrackingForm
          onResult={(data) => {
            setTrackingData(data);
            setError(null);
          }}
          onLoading={setLoading}
          onError={setError}
        />


        {/* Loading */}
        {loading && (
          <div style={{ marginTop: 40, color: "#707070", fontSize: 14 }}>
            Loading...
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            style={{
              marginTop: 40,
              color: "red",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {error}
          </div>
        )}

        {/* Tracking Result */}
        {trackingData && !loading && <TrackingResult data={trackingData} />}
      </main>
    </div>
  );
}
