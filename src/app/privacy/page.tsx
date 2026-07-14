"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: "52rem", margin: "0 auto", padding: "60px 1.5rem" }}>
      <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#6366f1", textDecoration: "none", fontSize: "0.875rem", fontWeight: 600, marginBottom: "32px" }}>
        <ArrowLeft style={{ width: "16px", height: "16px" }} />
        Back to Home
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ShieldCheck style={{ width: "20px", height: "20px", color: "#6366f1" }} />
        </div>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 800, color: "#f8fafc", letterSpacing: "-0.02em" }}>Privacy Policy</h1>
      </div>

      <p style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.75, marginBottom: "32px" }}>
        Last Updated: July 11, 2026. RentNest is committed to protecting your privacy. This Privacy Policy describes how we collect, use, and share your personal data when you use our rental co-living search platform.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "28px", color: "#cbd5e1" }}>
        <div>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#f8fafc", marginBottom: "12px" }}>1. Information We Collect</h2>
          <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#94a3b8" }}>
            We collect personal information that you provide to us directly when registering, submitting listing reviews, creating bookings, or coordinating stay options with regional hosts. This includes your name, email address, payment credentials, phone numbers, and profile details.
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#f8fafc", marginBottom: "12px" }}>2. How We Use Information</h2>
          <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#94a3b8" }}>
            We utilize collected personal information to process bookings securely, verify user credentials, maintain transparent listing environments, coordinate check-in and digital smart locks, and send periodic newsletters containing relevant stays and off-market deals.
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#f8fafc", marginBottom: "12px" }}>3. Data Sharing & Disclosure</h2>
          <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#94a3b8" }}>
            Your information is shared with verified regional hosts only once a booking has been confirmed. We do not sell or rent user details to third-party marketing companies under any circumstances. Payment transactions are processed securely via verified processors.
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#f8fafc", marginBottom: "12px" }}>4. Cookies & Web Tokens</h2>
          <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#94a3b8" }}>
            We utilize secure HttpOnly JSON Web Token (JWT) cookies to authenticate sessions and keep you signed in. These cookies store no identifiable tracker profile data and are cleared immediately upon logging out.
          </p>
        </div>
      </div>
    </div>
  );
}
