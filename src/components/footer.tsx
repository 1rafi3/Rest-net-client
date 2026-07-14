"use client";

import React from "react";
import Link from "next/link";
import { Home, Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sectionHead: React.CSSProperties = {
    fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase",
    letterSpacing: "0.1em", color: "#cbd5e1", marginBottom: "16px",
  };

  const footerLink: React.CSSProperties = {
    color: "#64748b", textDecoration: "none", fontSize: "0.875rem",
    transition: "color 0.2s ease", display: "block", marginBottom: "8px",
  };

  return (
    <footer style={{ marginTop: "auto", borderTop: "1px solid #24324f", background: "#080c14" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "3.5rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2.5rem" }}>

          {/* Brand */}
          <div style={{ gridColumn: "span 1" }}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none", marginBottom: "16px" }}>
              <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: "linear-gradient(135deg,#4f46e5,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Home style={{ width: "17px", height: "17px", color: "#fff" }} />
              </div>
              <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "#f8fafc" }}>Rent<span style={{ color: "#818cf8" }}>Nest</span></span>
            </Link>
            <p style={{ fontSize: "0.8rem", color: "#475569", lineHeight: 1.75, maxWidth: "260px", marginBottom: "20px" }}>
              Curated premium co-living, apartment renting, and vacation stays. Finding your next cozy nest made simple.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                { Icon: Github,   href: "https://github.com/1rafi3" },
                { Icon: Twitter,  href: "https://twitter.com" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/rafiwolkarimrafi/" },
              ].map(({ Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #24324f", display: "flex", alignItems: "center", justifyContent: "center", color: "#475569", transition: "all 0.2s ease" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#6366f1"; (e.currentTarget as HTMLElement).style.color = "#818cf8"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#24324f"; (e.currentTarget as HTMLElement).style.color = "#475569"; }}
                >
                  <Icon style={{ width: "15px", height: "15px" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Discover */}
          <div>
            <p style={sectionHead}>Discover</p>
            {[
              { label: "Explore Stays",       href: "/explore" },
              { label: "Co-Living Spaces",    href: "/explore?category=Co-living" },
              { label: "Premium Apartments",  href: "/explore?category=Apartment" },
              { label: "Coastal Villas",      href: "/explore?category=Villa" },
              { label: "Studio Apartments",   href: "/explore?category=Studio" },
            ].map(({ label, href }) => (
              <Link key={href} href={href} style={footerLink}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#f8fafc"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#64748b"}
              >{label}</Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <p style={sectionHead}>Company</p>
            {[
              { label: "About Us",     href: "/about" },
              { label: "Contact Us",   href: "/contact" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
            ].map(({ label, href }) => (
              <Link key={label} href={href} style={footerLink}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#f8fafc"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#64748b"}
              >{label}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={sectionHead}>Get In Touch</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", gap: "10px" }}>
                <MapPin style={{ width: "15px", height: "15px", color: "#6366f1", flexShrink: 0, marginTop: "2px" }} />
                <span style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.6 }}>120 Silicon Blvd, Suite 500, San Francisco, CA 94107</span>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Phone style={{ width: "15px", height: "15px", color: "#6366f1", flexShrink: 0 }} />
                <a href="tel:+14155552678" style={{ fontSize: "0.8rem", color: "#64748b", textDecoration: "none" }}>+1 (415) 555-2678</a>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Mail style={{ width: "15px", height: "15px", color: "#6366f1", flexShrink: 0 }} />
                <a href="mailto:rwolkorimrafi@gmail.com" style={{ fontSize: "0.8rem", color: "#64748b", textDecoration: "none" }}>rwolkorimrafi@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid #1e293b", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
          <p style={{ fontSize: "0.75rem", color: "#334155" }}>© {currentYear} RentNest Inc. All rights reserved.</p>
          <div style={{ display: "flex", gap: "20px" }}>
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Sitemap", href: "/explore" }
            ].map(({ label, href }) => (
              <Link key={label} href={href} style={{ fontSize: "0.75rem", color: "#334155", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#94a3b8"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#334155"}
              >{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
