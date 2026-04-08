"use client";

import { useState } from "react";
import type { ProductInfo } from "@/lib/types";

/* eslint-disable @next/next/no-img-element */

export function TrackingSidebar({
  trackingNumber,
  products,
}: {
  trackingNumber: string;
  products: ProductInfo[];
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ float: "right", width: "30%" }}>
      <div>
        <ul
          style={{
            marginBlockEnd: 0,
            display: "flex",
            flexDirection: "column",
            padding: "0 20px",
            listStyle: "none",
            marginBlockStart: 0,
            paddingInlineStart: 0,
          }}
        >
          {/* Tracking Number */}
          <li style={{ marginBottom: 20, width: "100%", marginTop: 20 }}>
            <div
              style={{
                fontSize: 14,
                color: "#303030",
                marginBottom: 10,
                fontWeight: "bold",
              }}
            >
              Tracking Number
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: "#303030",
                wordBreak: "break-word",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span>{trackingNumber}</span>
              <button
                onClick={handleCopy}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
                aria-label="Copy tracking number"
              >
                {copied ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#008000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                )}
              </button>
            </div>
          </li>

          {/* Product */}
          {products.length > 0 && (
            <li style={{ marginBottom: 20, width: "100%" }}>
              <div
                style={{
                  fontSize: 14,
                  color: "#303030",
                  marginBottom: 10,
                  fontWeight: "bold",
                }}
              >
                Product
              </div>
              <div style={{ fontSize: 14, fontWeight: 400, wordBreak: "break-word" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {products.map((product, idx) => (
                    <div key={idx} style={{ position: "relative", overflow: "visible", display: "flex", gap: 10 }}>
                      {/* Image */}
                      <div
                        style={{
                          position: "relative",
                          width: 60,
                          minWidth: 60,
                          maxHeight: 75,
                        }}
                      >
                        <img
                          src={product.title_img}
                          alt={product.title}
                          style={{ maxHeight: 75, width: "100%", objectFit: "cover", borderRadius: 4 }}
                        />
                        {product.quantity > 0 && (
                          <span
                            style={{
                              display: "inline-block",
                              position: "absolute",
                              top: -6,
                              right: -6,
                              padding: "2px 5px",
                              backgroundColor: "#808080",
                              color: "#fff",
                              borderRadius: "50%",
                              fontSize: 11,
                              lineHeight: "14px",
                              zIndex: 10,
                              minWidth: 14,
                              textAlign: "center",
                            }}
                          >
                            {product.quantity}
                          </span>
                        )}
                      </div>
                      {/* Title */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span
                          style={{
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 3,
                            lineHeight: "24px",
                            color: "#303030",
                          }}
                        >
                          {product.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
