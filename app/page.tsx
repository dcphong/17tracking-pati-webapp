"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Ticker } from "@/components/ticker";
import { Header } from "@/components/header";
import { TrackingForm } from "@/components/tracking-form";
import { TrackingResult } from "@/components/tracking-result";
import type { TrackingData, ProductInfo } from "@/lib/types";

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialValue, setInitialValue] = useState("");

  const doTrack = useCallback(async (trackingNumber: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tracking_number: trackingNumber }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Could not find tracking info.");
        return;
      }
      setTrackingData(json.data);
      setProducts(json.products || []);
    } catch {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const tn = searchParams.get("tracking_number") || searchParams.get("nums") || "";
    if (tn.trim()) {
      setInitialValue(tn.trim());
      doTrack(tn.trim());
    }
  }, [searchParams, doTrack]);

  return (
    <div className="flex flex-col flex-1 bg-white">
      <Ticker />
      <Header />

      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 20px", maxWidth: 1200, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        <h1 style={{ fontSize: 26, fontWeight: 400, lineHeight: "32px", textAlign: "center", marginBottom: 24, color: "#000" }}>
          Track Your Order
        </h1>

        <TrackingForm
          initialValue={initialValue}
          onResult={(data) => { setTrackingData(data); setError(null); }}
          onProducts={setProducts}
          onLoading={setLoading}
          onError={setError}
        />

        {loading && (
          <div style={{ marginTop: 40, color: "#707070", fontSize: 14 }}>Loading...</div>
        )}

        {error && (
          <div style={{ marginTop: 40, color: "red", fontSize: 14, fontWeight: 500 }}>{error}</div>
        )}

        {trackingData && !loading && <TrackingResult data={trackingData} products={products} />}
      </main>
    </div>
  );
}
