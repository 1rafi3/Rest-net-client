"use client";

import React from "react";
import { CheckCircle2, Shield, Heart, Users, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      title: "Verified Trust",
      description: "We inspect every single home physically to guarantee coordinates, Wi-Fi speeds, and cleanliness match the listings.",
      icon: Shield
    },
    {
      title: "Community Focused",
      description: "We organize networking panels, weekly tastings, and co-working environments to encourage resident connection.",
      icon: Users
    },
    {
      title: "Streamlined Experience",
      description: "Our fully digital lease signings, keyless entries, and utility packages simplify modern renting.",
      icon: Sparkles
    }
  ];

  const team = [
    {
      name: "Marcus Sterling",
      role: "CEO & Co-founder",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
    },
    {
      name: "Sophia Chen",
      role: "Chief of Community",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80"
    },
    {
      name: "Jared Brooks",
      role: "Lead Properties Inspector",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Banner Section */}
      <section className="bg-gradient-to-b from-[#131c2e] to-[#0b0f19] py-16 text-center border-b border-[#24324f]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-4">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl tracking-tight">Our Mission</h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            At RentNest, we redefine modern renting by connecting digital nomads, remote workers, and traveling executives with curated, premium, and fully-equipped housing spaces.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Why RentNest Exists</h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto">We follow three core principles to make sure you have the perfect co-living or rental stay.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="bg-[#131c2e] border border-[#24324f] p-6 rounded-2xl space-y-4">
                <div className="h-12 w-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{v.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{v.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Core Features list */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-[#131c2e] border border-[#24324f] p-8 sm:p-12 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Our Promise to Renters</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Finding a home from another city can be stressful. Pictures are often outdated, and hidden utility costs pile up. We eliminate these problems with transparent policies:
          </p>
          <ul className="space-y-3">
            {[
              "Physically checked properties and 3D visual walkthroughs",
              "Consolidated pricing - rent, utilities, cleaner unified",
              "High-speed fiber connectivity (min 300Mbps confirmed)",
              "Digital host communication and instant problem reporting"
            ].map((promise) => (
              <li key={promise} className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0" />
                <span>{promise}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6 rounded-2xl overflow-hidden aspect-video border border-[#24324f] shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80"
            alt="RentNest Coworking spaces"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Team Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Meet Our Founders</h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto">The properties visionaries behind the RentNest rental platform.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.name} className="bg-[#131c2e] border border-[#24324f] p-5 rounded-2xl text-center space-y-4">
              <img
                src={member.avatar}
                alt={member.name}
                className="h-28 w-28 rounded-full object-cover mx-auto border-2 border-indigo-500/20"
              />
              <div>
                <h4 className="text-base font-bold text-white">{member.name}</h4>
                <p className="text-xs text-indigo-400 mt-0.5">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
