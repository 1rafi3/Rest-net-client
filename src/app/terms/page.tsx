"use client";

import React from "react";
import Link from "next/link";
import { Scale, ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div style={{ maxWidth: "52rem", margin: "0 auto", padding: "60px 1.5rem" }}>
      <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#6366f1", textDecoration: "none", fontSize: "0.875rem", fontWeight: 600, marginBottom: "32px" }}>
        <ArrowLeft style={{ width: "16px", height: "16px" }} />
        Back to Home
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Scale style={{ width: "20px", height: "20px", color: "#6366f1" }} />
        </div>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 800, color: "#f8fafc", letterSpacing: "-0.02em" }}>Terms of Service</h1>
      </div>

      <p style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.75, marginBottom: "32px" }}>
        Last Updated: July 11, 2026. Welcome to RentNest. By accessing our website, properties search index, and booking platform, you agree to comply with and be bound by the following terms and conditions.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "28px", color: "#cbd5e1" }}>
        <div>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#f8fafc", marginBottom: "12px" }}>1. Acceptance of Terms</h2>
          <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#94a3b8" }}>
            By registering an account, publishing stays, booking accommodations, or submitting reviews, you certify that you accept these Terms of Service. If you do not agree to these terms, you must refrain from using the platform immediately.
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#f8fafc", marginBottom: "12px" }}>2. Stay Bookings & Cancellations</h2>
          <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#94a3b8" }}>
            A booking represents a contract between a tenant and a regional host. Booking deposits are securely processed, and bookings can be cancelled with a full refund up to 72 hours before the scheduled check-in time.
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#f8fafc", marginBottom: "12px" }}>3. Host Responsibilities</h2>
          <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#94a3b8" }}>
            Hosts posting properties certify that all descriptions, amenity grids, coordinates, utilities lists, and internet speeds are accurate. Fake or misleading listings will result in immediate suspension and loss of payment balances.
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#f8fafc", marginBottom: "12px" }}>4. Intellectual Property</h2>
          <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#94a3b8" }}>
            All logos, graphic elements, layout structures, stylesheets, and custom database setups belong strictly to RentNest Inc. Any unauthorized scraping, mirroring, or reverse-engineering is strictly prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}
