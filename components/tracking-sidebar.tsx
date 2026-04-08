"use client";

import { useState } from "react";

export function TrackingSidebar({
  trackingNumber,
  carrierName,
  carrierHomepage,
}: {
  trackingNumber: string;
  carrierName: string;
  carrierHomepage: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ float: "right", width: "30%" }}>
      <ul style={{ marginBlockEnd: 0, display: "flex", flexDirection: "column", padding: "0 20px", listStyle: "none", marginBlockStart: 0, paddingInlineStart: 0 }}>
        {/* Tracking Number */}
        <li style={{ marginBottom: 20, width: "100%", marginTop: 20 }}>
          <div style={{ fontSize: 14, color: "#303030", marginBottom: 10, fontWeight: "bold" }}>
            Tracking Number
          </div>
          <div style={{ fontSize: 14, fontWeight: 400, color: "#303030", wordBreak: "break-word", display: "flex", alignItems: "center", gap: 8 }}>
            <span>{trackingNumber}</span>
            <button onClick={handleCopy} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }} aria-label="Copy tracking number">
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

        {/* Carrier */}
        {carrierName && (
          <li style={{ marginBottom: 20, width: "100%" }}>
            <div style={{ fontSize: 14, color: "#303030", marginBottom: 10, fontWeight: "bold" }}>
              Carrier
            </div>
            <div style={{ fontSize: 14, fontWeight: 400, color: "#303030" }}>
              {carrierHomepage ? (
                <a href={carrierHomepage} target="_blank" rel="noopener noreferrer" style={{ color: "#007a5c", textDecoration: "none" }}>
                  {carrierName}
                </a>
              ) : carrierName}
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}
