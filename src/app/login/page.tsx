"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, LogIn, ShieldAlert, Sparkles, User, Shield } from "lucide-react";

function LoginForm() {
  const { login, user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/explore";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push(redirect);
    }
  }, [user, loading, redirect, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all credentials.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      
      const res = await login(email, password);
      if (res.success) {
        router.push(redirect);
        router.refresh();
      } else {
        setError(res.error || "Invalid credentials.");
      }
    } catch (err) {
      setError("An unexpected network error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoAutofill = (role: "user" | "admin") => {
    setError("");
    if (role === "admin") {
      setEmail("admin@rentnest.com");
      setPassword("password123");
    } else {
      setEmail("user@rentnest.com");
      setPassword("password123");
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6 space-y-8">
      {/* Page header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h1>
        <p className="text-sm text-slate-400">Sign in to your RentNest account to book stays or manage properties.</p>
      </div>

      {/* Main Form container */}
      <div className="bg-[#131c2e] border border-[#24324f] p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
        
        {error && (
          <div className="flex gap-2 items-start bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-xs text-red-400 font-medium">
            <ShieldAlert className="h-5 w-5 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <LogIn className="h-4 w-4" />
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* DEMO AUTOFILL BUTTONS */}
        <div className="border-t border-[#24324f] pt-5 space-y-3">
          <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            Demo Autocomplete Credentials
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleDemoAutofill("user")}
              className="flex items-center justify-center gap-1.5 py-2 bg-[#1b2640] hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg cursor-pointer transition"
            >
              <User className="h-3.5 w-3.5 text-indigo-400" />
              Renter Login
            </button>
            <button
              onClick={() => handleDemoAutofill("admin")}
              className="flex items-center justify-center gap-1.5 py-2 bg-[#1b2640] hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg cursor-pointer transition"
            >
              <Shield className="h-3.5 w-3.5 text-amber-500" />
              Host Admin
            </button>
          </div>
        </div>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-400">
            Don't have an account?{" "}
            <Link href={`/register?redirect=${redirect}`} className="text-indigo-400 hover:underline font-semibold">
              Create an account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center text-slate-400 py-20">Loading authentication panel...</div>}>
      <LoginForm />
    </Suspense>
  );
}
