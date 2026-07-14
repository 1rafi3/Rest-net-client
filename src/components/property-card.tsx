"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, MapPin, BedDouble, Bath, Square, Calendar } from "lucide-react";
import { Property } from "@/lib/mock-data";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [hovered, setHovered] = useState(false);
  const formattedDate = new Date(property.createdAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  const card: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    background: "#131c2e",
    border: `1px solid ${hovered ? "rgba(99,102,241,0.45)" : "#24324f"}`,
    borderRadius: "14px",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
    transform: hovered ? "translateY(-5px)" : "translateY(0)",
    boxShadow: hovered
      ? "0 20px 40px -12px rgba(99,102,241,0.2)"
      : "0 2px 8px rgba(0,0,0,0.3)",
    cursor: "default",
  };

  const statItem: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: "5px",
    fontSize: "0.75rem", color: "#94a3b8",
  };

  return (
    <div
      style={card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Container */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", background: "#1b2640" }}>
        <img
          src={property.images[0] || "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80"}
          alt={property.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover", objectPosition: "center",
            transition: "transform 0.6s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
          loading="lazy"
        />
        {/* Category Badge */}
        <span style={{
          position: "absolute", top: "10px", left: "10px",
          background: "rgba(79,70,229,0.9)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(129,140,248,0.3)",
          color: "#fff", fontSize: "0.7rem", fontWeight: 700,
          padding: "3px 10px", borderRadius: "6px",
          letterSpacing: "0.04em",
        }}>
          {property.category}
        </span>
        {/* Rating Badge */}
        <div style={{
          position: "absolute", top: "10px", right: "10px",
          display: "flex", alignItems: "center", gap: "4px",
          background: "rgba(11,15,25,0.85)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(245,158,11,0.2)",
          padding: "3px 8px", borderRadius: "6px",
        }}>
          <Star style={{ width: "12px", height: "12px", color: "#fbbf24", fill: "#fbbf24" }} />
          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#fbbf24" }}>
            {property.rating > 0 ? property.rating.toFixed(1) : "New"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, padding: "18px 20px" }}>
        {/* Location */}
        <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "6px" }}>
          <MapPin style={{ width: "12px", height: "12px", color: "#6366f1", flexShrink: 0 }} />
          <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {property.location}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: "1rem", fontWeight: 700, color: "#f1f5f9",
          marginBottom: "6px", letterSpacing: "-0.01em",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          transition: "color 0.2s ease",
          ...(hovered ? { color: "#a5b4fc" } : {}),
        }}>
          {property.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: "0.8rem", color: "#64748b", lineHeight: 1.6,
          marginBottom: "14px",
          overflow: "hidden", display: "-webkit-box",
          WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
        }}>
          {property.shortDescription}
        </p>

        {/* Specs row */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          borderTop: "1px solid #1e293b", paddingTop: "12px",
          marginBottom: "14px", gap: "6px",
        }}>
          <div style={statItem}>
            <BedDouble style={{ width: "13px", height: "13px", color: "#6366f1", flexShrink: 0 }} />
            <span>{property.beds} Bed{property.beds > 1 ? "s" : ""}</span>
          </div>
          <div style={statItem}>
            <Bath style={{ width: "13px", height: "13px", color: "#6366f1", flexShrink: 0 }} />
            <span>{property.baths} Bath{property.baths > 1 ? "s" : ""}</span>
          </div>
          <div style={statItem}>
            <Square style={{ width: "13px", height: "13px", color: "#6366f1", flexShrink: 0 }} />
            <span>{property.sqft} sqft</span>
          </div>
        </div>

        {/* Price + CTA */}
        <div style={{ marginTop: "auto", paddingTop: "12px", borderTop: "1px solid #1e293b", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#475569", fontSize: "0.7rem", marginBottom: "2px" }}>
              <Calendar style={{ width: "11px", height: "11px" }} />
              {formattedDate}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
              <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "#f8fafc" }}>${property.price.toLocaleString()}</span>
              <span style={{ fontSize: "0.72rem", color: "#475569" }}>/{property.category === "Villa" ? "night" : "mo"}</span>
            </div>
          </div>

          <Link
            href={`/properties/${property.id}`}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              padding: "8px 18px", borderRadius: "8px",
              fontSize: "0.8rem", fontWeight: 600, textDecoration: "none",
              background: hovered ? "linear-gradient(135deg,#4f46e5,#6366f1)" : "rgba(99,102,241,0.1)",
              color: hovered ? "#fff" : "#818cf8",
              border: `1px solid ${hovered ? "transparent" : "rgba(99,102,241,0.25)"}`,
              boxShadow: hovered ? "0 4px 14px rgba(99,102,241,0.35)" : "none",
              transition: "all 0.2s ease",
            }}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
