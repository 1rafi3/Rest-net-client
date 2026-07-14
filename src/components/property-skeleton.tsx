import React from "react";

const shimmer: React.CSSProperties = {
  background: "linear-gradient(90deg, #1b2640 25%, #243050 50%, #1b2640 75%)",
  backgroundSize: "200% 100%",
  animation: "skeletonShimmer 1.5s infinite",
  borderRadius: "6px",
};

export default function PropertySkeleton() {
  return (
    <>
      <style>{`
        @keyframes skeletonShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      <div style={{
        display: "flex", flexDirection: "column", height: "100%",
        background: "#131c2e", border: "1px solid #24324f",
        borderRadius: "14px", overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      }}>
        {/* Image placeholder */}
        <div style={{ aspectRatio: "16/9", width: "100%", ...shimmer, borderRadius: 0 }} />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, padding: "18px 20px" }}>
          {/* Location */}
          <div style={{ width: "38%", height: "10px", marginBottom: "10px", ...shimmer }} />

          {/* Title */}
          <div style={{ width: "72%", height: "18px", marginBottom: "10px", ...shimmer }} />

          {/* Description */}
          <div style={{ display: "flex", flexDirection: "column", gap: "7px", marginBottom: "16px" }}>
            <div style={{ width: "100%", height: "10px", ...shimmer }} />
            <div style={{ width: "84%",  height: "10px", ...shimmer }} />
          </div>

          {/* Specs */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
            borderTop: "1px solid #1e293b", paddingTop: "12px",
            marginBottom: "14px", gap: "8px",
          }}>
            <div style={{ height: "10px", ...shimmer }} />
            <div style={{ height: "10px", ...shimmer }} />
            <div style={{ height: "10px", ...shimmer }} />
          </div>

          {/* Footer */}
          <div style={{
            marginTop: "auto", paddingTop: "12px",
            borderTop: "1px solid #1e293b",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ width: "60px", height: "10px", ...shimmer }} />
              <div style={{ width: "80px", height: "18px", ...shimmer }} />
            </div>
            <div style={{ width: "80px", height: "34px", borderRadius: "8px", ...shimmer }} />
          </div>
        </div>
      </div>
    </>
  );
}
