"use client";

import { useState } from "react";
import type { ProductInfo } from "@/lib/types";
import { ProductUpsell, RelatedProducts } from "./product-upsell";

export function FloatingWidget({ products, shopifyDomain }: { products: ProductInfo[]; shopifyDomain: string }) {
  const [open, setOpen] = useState(true);
  const [minimized, setMinimized] = useState(false);

  const hasBuyable = products.some((p) => p.variant_id && p.variant_id !== 0);
  if (!hasBuyable && !shopifyDomain) return null;

  // Minimized: show small floating button
  if (!open) {
    return (
      <button
        className="floating-widget-btn"
        onClick={() => { setOpen(true); setMinimized(false); }}
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 1000,
          width: 48, height: 48, borderRadius: "50%",
          background: "#007a5c", color: "#fff", border: "none",
          cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20, transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
        title="Open Reorder"
      >
        🛒
      </button>
    );
  }

  return (
    <div
      className="floating-widget-panel"
      style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 1000,
        width: minimized ? 280 : 340, maxHeight: minimized ? 48 : "70vh",
        background: "#fff", borderRadius: 14,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
        border: "1px solid #e5e5e5",
        overflow: "hidden",
        transition: "all 0.3s ease",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 16px", borderBottom: minimized ? "none" : "1px solid #eee",
        background: "#007a5c", color: "#fff", borderRadius: "14px 14px 0 0",
        cursor: "pointer", flexShrink: 0,
      }}
        onClick={() => setMinimized(!minimized)}
      >
        <span style={{ fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
          🛒 Reorder & Discover
        </span>
        <div style={{ display: "flex", gap: 4 }}>
          <button
            onClick={(e) => { e.stopPropagation(); setMinimized(!minimized); }}
            style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 16, padding: "0 4px", opacity: 0.8 }}
            title={minimized ? "Expand" : "Minimize"}
          >
            {minimized ? "▲" : "▼"}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setOpen(false); }}
            style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 16, padding: "0 4px", opacity: 0.8 }}
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content */}
      {!minimized && (
        <div className="floating-widget-content" style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
          <ProductUpsell products={products} shopifyDomain={shopifyDomain} />
          <RelatedProducts shopifyDomain={shopifyDomain} />
        </div>
      )}
    </div>
  );
}
