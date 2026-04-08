"use client";

import type { StatusNode } from "@/lib/types";

const STATUS_ORDER = ["1001", "1100", "2", "3", "4"];
const STATUS_LABELS: Record<string, string> = {
  "1001": "Ordered",
  "1100": "Order Ready",
  "2": "In Transit",
  "3": "Out for Delivery",
  "4": "Delivered",
  "7": "Exception",
};

// Outline SVG icons matching the original TrackingMore progress bar exactly
function ProgressIcon({ statusKey, color }: { statusKey: string; color: string }) {
  switch (statusKey) {
    case "1001": // Shopping cart
      return (
        <svg width="28" height="28" viewBox="0 0 1024 1024" fill={color}>
          <path d="M922.9 335.2H304.5l-27.6-138H128v69h86.4l110.5 552.3h493.3v-69H387.4l-13.8-69h480.4l68.9-345.3zM806.7 611.5H359.8l-41.4-207.3h535.2l-46.9 207.3z"/>
          <path d="M359.8 818.5m-55.2 0a55.2 55.2 0 1 0 110.4 0 55.2 55.2 0 1 0-110.4 0Z"/>
          <path d="M731.8 818.5m-55.2 0a55.2 55.2 0 1 0 110.4 0 55.2 55.2 0 1 0-110.4 0Z"/>
        </svg>
      );
    case "1100": // Package/box with checkmark
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <path d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H4V5h16v14z"/>
          <path d="M17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z"/>
        </svg>
      );
    case "2": // Truck with signal waves
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <path d="M20 8h-3V4H1v13h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
          <path d="M6 6h2v2H6zm3 0h2v2H9zm-3 3h2v2H6z" opacity=".5"/>
        </svg>
      );
    case "3": // Out for delivery - box with arrow
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
          <path d="M12 17l-5-5 1.41-1.41L12 14.17l3.59-3.58L17 12z"/>
        </svg>
      );
    case "4": // Delivered - filled green circle with checkmark
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="12" fill={color}/>
          <path fillRule="evenodd" clipRule="evenodd" d="M19.69 6.62a1.07 1.07 0 010 1.51l-9.24 9.24a1.07 1.07 0 01-1.51 0l-4.62-4.62a1.07 1.07 0 011.51-1.51l3.87 3.87 8.49-8.49a1.07 1.07 0 011.5 0z" fill="white"/>
        </svg>
      );
    case "7": // Exception - diamond with exclamation
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <path fillRule="evenodd" clipRule="evenodd" d="M13.35 4.56a1.91 1.91 0 00-2.7 0L4.56 10.65a1.91 1.91 0 000 2.7l6.09 6.09a1.91 1.91 0 002.7 0l6.09-6.09a1.91 1.91 0 000-2.7l-6.09-6.09zM11.81 5.72a.1.1 0 01.14 0l6.33 6.33a.1.1 0 010 .14l-6.33 6.33a.1.1 0 01-.14 0L5.72 12.19a.1.1 0 010-.14l6.09-6.33z"/>
          <rect x="11.18" y="7.64" width="1.64" height="5.45" rx=".82" fill={color}/>
          <circle cx="12" cy="15.27" r="1.09" fill={color}/>
        </svg>
      );
    default:
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" fill="white" stroke={color} strokeWidth="2"/>
        </svg>
      );
  }
}

export function TrackingProgress({
  statusNode,
  currentStatus,
}: {
  statusNode: Record<string, StatusNode>;
  currentStatus: string;
}) {
  const isException = currentStatus === "Exception";
  const reachedKeys = new Set(Object.keys(statusNode));

  let stepsToShow = [...STATUS_ORDER];
  if (isException || statusNode["7"]) {
    stepsToShow = [...STATUS_ORDER, "7"];
  }

  return (
    <div style={{ width: "100%", marginBottom: 20 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          margin: "20px auto",
          width: "100%",
        }}
      >
        {stepsToShow.map((key, idx) => {
          const isLast = idx === stepsToShow.length - 1;
          const reached = reachedKeys.has(key);
          const nextReached = !isLast && reachedKeys.has(stepsToShow[idx + 1]);
          const color = reached ? "#008000" : "#CDCDCD";

          return (
            <div key={key} style={{ display: "flex", alignItems: "flex-start", flex: isLast ? "0 0 auto" : 1 }}>
              {/* Node column */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: 100,
                  maxWidth: 160,
                }}
              >
                {/* Icon */}
                <ProgressIcon statusKey={key} color={color} />
                {/* Label */}
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 550,
                    lineHeight: 1.25,
                    color,
                    marginTop: 4,
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  {STATUS_LABELS[key]}
                </span>
                {/* Date */}
                {statusNode[key]?.date && (
                  <span
                    style={{
                      fontSize: 13,
                      marginTop: 4,
                      color: "#707070",
                      textAlign: "center",
                      maxWidth: 130,
                      display: "block",
                      lineHeight: 1.4,
                    }}
                  >
                    {statusNode[key].date}
                  </span>
                )}
              </div>

              {/* Connecting line */}
              {!isLast && (
                <div
                  style={{
                    flex: 1,
                    margin: "12px 4px 0",
                    height: 5,
                    borderRadius: 8,
                    background:
                      reached && nextReached
                        ? "#008000"
                        : reached
                          ? "linear-gradient(to right, #008000, #efefef)"
                          : "#efefef",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
