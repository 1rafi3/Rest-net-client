"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Home, Compass, PlusCircle, Settings, BarChart2, LogOut, Menu, X, User } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = user
    ? [
        { name: "Home",            href: "/",                  icon: Home },
        { name: "Explore",         href: "/explore",           icon: Compass },
        { name: "Add Property",    href: "/properties/add",    icon: PlusCircle },
        { name: "Manage Listings", href: "/properties/manage", icon: Settings },
        { name: "Dashboard",       href: "/dashboard",         icon: BarChart2 },
      ]
    : [
        { name: "Home",    href: "/",        icon: Home },
        { name: "Explore", href: "/explore", icon: Compass },
        { name: "About",   href: "/about",   icon: User },
        { name: "Contact", href: "/contact", icon: Compass },
      ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 50, width: "100%", borderBottom: "1px solid #24324f", background: "rgba(11,15,25,0.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", height: "64px", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }} className="logo-link">
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "linear-gradient(135deg, #4f46e5, #6366f1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 14px rgba(99,102,241,0.4)"
            }}>
              <Home style={{ width: "18px", height: "18px", color: "#fff" }} />
            </div>
            <span style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#f8fafc" }}>
              Rent<span style={{ color: "#818cf8" }}>Nest</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }} className="desktop-nav">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    padding: "8px 14px", borderRadius: "8px",
                    fontSize: "0.875rem", fontWeight: 500,
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    background: active ? "rgba(99,102,241,0.12)" : "transparent",
                    color: active ? "#818cf8" : "#94a3b8",
                    border: active ? "1px solid rgba(99,102,241,0.25)" : "1px solid transparent",
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = "#f8fafc";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }
                  }}
                >
                  <Icon style={{ width: "15px", height: "15px" }} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Auth Section (Desktop) */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }} className="desktop-nav">
            {user ? (
              <>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#f8fafc" }}>{user.name.split(" ")[0]}</span>
                  <span style={{
                    fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
                    color: user.role === "admin" ? "#fbbf24" : "#818cf8",
                    background: user.role === "admin" ? "rgba(245,158,11,0.12)" : "rgba(99,102,241,0.12)",
                    padding: "1px 6px", borderRadius: "4px",
                    border: `1px solid ${user.role === "admin" ? "rgba(245,158,11,0.25)" : "rgba(99,102,241,0.25)"}`,
                  }}>
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={logout}
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    padding: "7px 14px", borderRadius: "8px",
                    fontSize: "0.8rem", fontWeight: 600,
                    background: "rgba(239,68,68,0.08)", color: "#f87171",
                    border: "1px solid rgba(239,68,68,0.2)",
                    cursor: "pointer", transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(220,38,38,0.85)";
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)";
                    (e.currentTarget as HTMLElement).style.color = "#f87171";
                  }}
                >
                  <LogOut style={{ width: "14px", height: "14px" }} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                style={{
                  padding: "8px 20px", borderRadius: "8px", textDecoration: "none",
                  fontSize: "0.875rem", fontWeight: 600, color: "#fff",
                  background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                  boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
                  transition: "all 0.2s ease",
                }}
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-only"
            style={{
              display: "none", padding: "8px", borderRadius: "8px",
              background: "transparent", border: "1px solid #24324f",
              color: "#94a3b8", cursor: "pointer",
            }}
          >
            {mobileMenuOpen ? <X style={{ width: "20px", height: "20px" }} /> : <Menu style={{ width: "20px", height: "20px" }} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{ borderTop: "1px solid #24324f", background: "#0b0f19", padding: "12px 16px 16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "10px 14px", borderRadius: "8px",
                    fontSize: "0.9rem", fontWeight: 500, textDecoration: "none",
                    background: active ? "#4f46e5" : "transparent",
                    color: active ? "#fff" : "#cbd5e1",
                  }}
                >
                  <Icon style={{ width: "18px", height: "18px" }} />
                  {item.name}
                </Link>
              );
            })}
          </div>
          <div style={{ borderTop: "1px solid #24324f", marginTop: "12px", paddingTop: "12px" }}>
            {user ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "0 4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#f8fafc" }}>{user.name}</span>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", color: "#fbbf24", background: "rgba(245,158,11,0.12)", padding: "2px 8px", borderRadius: "4px", border: "1px solid rgba(245,158,11,0.2)" }}>{user.role}</span>
                </div>
                <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{user.email}</span>
                <button
                  onClick={() => { setMobileMenuOpen(false); logout(); }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "9px", borderRadius: "8px", background: "rgba(239,68,68,0.08)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}
                >
                  <LogOut style={{ width: "15px", height: "15px" }} />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px", borderRadius: "8px", background: "linear-gradient(135deg,#4f46e5,#6366f1)", color: "#fff", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem" }}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-only { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
