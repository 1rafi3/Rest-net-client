"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search, Compass, MapPin, Award, CheckCircle2, ChevronDown,
  Sparkles, Building, Key, DollarSign, Star, Send
} from "lucide-react";
import PropertyCard from "@/components/property-card";
import PropertySkeleton from "@/components/property-skeleton";
import { Property } from "@/lib/mock-data";

export default function LandingPage() {
  const [featured, setFeatured] = useState<Property[]>([]);
  const [loading, setLoading]   = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [activeFaq, setActiveFaq]   = useState<number | null>(null);
  const [searchQuery, setSearchQuery]       = useState("");
  const [searchCategory, setSearchCategory] = useState("All");

  useEffect(() => {
    async function loadFeatured() {
      try {
        setLoading(true);
        const res = await fetch("/api/properties?limit=4");
        if (res.ok) {
          const data = await res.json();
          setFeatured(data.properties);
        }
      } catch (e) {
        console.error("Failed to load featured properties:", e);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  const steps = [
    { title: "Discover Your Nest",    description: "Browse our hand-picked collection of premium co-living spaces, studios, and luxury apartments using advanced filter tools.", icon: Search },
    { title: "Confirm Your Stay",     description: "Input your dates and secure your reservation instantly via our secure billing layout. No hidden broker fees.", icon: Key },
    { title: "Move In & Connect",     description: "Unlock access to premium resident perks, digital smart door access, and join weekly networking community events.", icon: Compass },
  ];

  const locations = [
    { name: "New York",      count: "12 Properties", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&auto=format&fit=crop&q=80" },
    { name: "Los Angeles",   count: "8 Properties",  image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=500&auto=format&fit=crop&q=80" },
    { name: "Miami",         count: "5 Properties",  image: "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?w=500&auto=format&fit=crop&q=80" },
    { name: "San Francisco", count: "10 Properties", image: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=500&auto=format&fit=crop&q=80" },
  ];

  const faqs = [
    { q: "What is included in the monthly rent price?",  a: "For all Co-Living spaces, rent is fully inclusive of electricity, high-speed Wi-Fi, heating, gas, water, weekly cleaning of shared areas, and fully-stocked kitchen essentials." },
    { q: "How does the security deposit work?",         a: "Our security deposit is standardized to 1 month's rent for long-term leases, and a flat $500 for stays shorter than 3 months. Deposits are returned within 14 days of move-out." },
    { q: "Are the listings physically verified?",       a: "Yes! Every listing goes through our multi-point background checklist and physical inspection — verifying coordinates, amenities quality, landlord documentation, and internet speeds." },
    { q: "Can I schedule a virtual tour before booking?", a: "Absolutely. On each property details page you can request a live 3D walkthrough or coordinate a real-time video tour with one of our certified regional hosts." },
  ];

  const testimonials = [
    { quote: "RentNest made moving to New York absolutely seamless. The co-working space in the building is top notch, and the residents are great professionals.", author: "Sarah Mitchell", role: "Lead Software Architect", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80", rating: 5 },
    { quote: "The coastal villa in Miami exceeded all our expectations. Working remotely with ocean views was a dream come true. Checking in was fully digital and simple.", author: "David Vasc", role: "Product Designer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80", rating: 5 },
  ];

  return (
    <div className="flex flex-col gap-20 pb-20">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#131c2e] to-[#0b0f19] border-b border-[#24324f] min-h-[65vh] flex items-center">
        {/* Background glow blobs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-indigo-600/[0.08] blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-amber-500/[0.05] blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-12 items-center">
            {/* Left */}
            <div>
              {/* Animated pill badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600/10 border border-indigo-600/20 px-4 py-1 mb-5 animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-xs font-bold text-indigo-400 tracking-widest uppercase">Co-living & Executive Rental Redefined</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight text-white mb-5">
                Find Your Premium<br />
                <span className="bg-gradient-to-r from-indigo-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                  Cozy Nest Stay
                </span>
              </h1>

              <p className="text-slate-400 text-sm leading-relaxed mb-7 max-w-lg">
                Hand-picked high-end spaces with high-speed fiber internet, modern amenities, and vibrant community settings.
              </p>

              {/* Search bar widget */}
              <div className="p-3 bg-[#131c2e]/95 border border-[#24324f] rounded-2xl shadow-2xl max-w-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Where to? (e.g. Austin)"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 transition-colors"
                  />
                  <select
                    value={searchCategory}
                    onChange={e => setSearchCategory(e.target.value)}
                    className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg px-3 py-2.5 text-sm text-slate-400 outline-none cursor-pointer focus:border-indigo-500 transition-colors"
                  >
                    <option value="All">All Categories</option>
                    <option value="Co-living">Co-living</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Studio">Studio</option>
                    <option value="Villa">Villa</option>
                  </select>
                </div>
                <Link
                  href={`/explore?search=${searchQuery}&category=${searchCategory}`}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-700 to-indigo-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 hover:opacity-90 transition-opacity"
                >
                  <Search className="w-4 h-4" />
                  Search Available Nests
                </Link>
              </div>

              {/* Trust row */}
              <div className="flex gap-5 mt-5 flex-wrap">
                {[{ label: "Verified Hosts", icon: CheckCircle2 }, { label: "0 Hidden Fees", icon: DollarSign }, { label: "4.9★ Avg Rating", icon: Star }].map(({ label, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-xs text-slate-500 font-semibold">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right image — large screens only */}
            <div className="hidden lg:block">
              <div className="relative w-full max-w-md mx-auto aspect-square rounded-3xl overflow-hidden border-2 border-indigo-500/20 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                <img
                  src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80"
                  alt="Modern Living"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19]/85 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 p-4 bg-[#0b0f19]/85 backdrop-blur-md border border-[#24324f] rounded-xl flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Featured Space</p>
                    <h4 className="text-sm font-bold text-white mt-0.5">Urban Nest Co-Living</h4>
                  </div>
                  <span className="text-base font-extrabold text-amber-400">$1,200/mo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2">The RentNest Experience</h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">We provide everything you need to feel right at home from the day you move in.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Building, title: "Premium Furnishing",   desc: "Every unit features custom designer furniture, memory foam beds, and fully equipped kitchens with state-of-the-art tech." },
              { icon: Key,      title: "All-Inclusive Living", desc: "No extra bills. High-speed Wi-Fi, electricity, streaming memberships, and weekly cleaning are all unified in one flat rate." },
              { icon: Award,    title: "Community Settings",   desc: "Unlock access to coworking lounges, fitness centers, and attend weekly food tastings, network panels, and game nights." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#131c2e] border border-[#24324f] rounded-2xl p-7 hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-200">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-base font-bold text-white mb-2.5">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ── */}
      <section>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2">Featured Accommodations</h2>
              <p className="text-slate-400 text-sm">Hand-selected listings with superior ratings and high occupancy rates.</p>
            </div>
            <Link href="/explore" className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-700 to-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/30 hover:opacity-90 transition-opacity">
              Browse All Stays
            </Link>
          </div>
          {/* FIX #3: Strict 4-column grid on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? [...Array(4)].map((_, i) => <PropertySkeleton key={i} />)
              : featured.map(prop => <PropertyCard key={prop.id} property={prop} />)
            }
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section>
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#131c2e] border border-[#24324f] rounded-3xl p-10 lg:p-14">
            <div className="text-center mb-10">
              <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight mb-2">How Simple It Is</h2>
              <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">Book your next luxury co-living nest in three straightforward steps.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const active = idx === activeStep;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`p-6 rounded-2xl text-left cursor-pointer transition-all duration-300 ${
                      active
                        ? "bg-[#1b2640] border border-indigo-500 scale-[1.03] shadow-xl shadow-indigo-500/15"
                        : "bg-transparent border border-transparent hover:bg-[#1b2640]/40"
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-extrabold flex-shrink-0 ${active ? "bg-indigo-700 text-white" : "bg-[#1b2640] text-indigo-400"}`}>
                        {idx + 1}
                      </div>
                      <Icon className={`w-6 h-6 ${active ? "text-amber-400" : "text-slate-500"}`} />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── TOP LOCATIONS ── */}
      <section>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2">Explore Top Locations</h2>
            <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">Find premium spaces located in the nation's key tech and culture hubs.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {locations.map(loc => (
              <Link
                key={loc.name}
                href={`/explore?location=${loc.name}`}
                className="relative h-60 rounded-2xl overflow-hidden border border-[#24324f] hover:border-indigo-500/45 hover:-translate-y-1 transition-all duration-200 group"
              >
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19]/92 via-[#0b0f19]/10 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h4 className="text-base font-bold text-white mb-1">{loc.name}</h4>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-indigo-400" />
                    {loc.count}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-[#24324f]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "1,200+", label: "Premium Listings",  color: "text-white" },
              { value: "8,500+", label: "Happy Tenants",     color: "text-indigo-400" },
              { value: "99.8%",  label: "Satisfaction Rate", color: "text-amber-400" },
              { value: "4.9 ★", label: "Average Rating",    color: "text-white" },
            ].map(stat => (
              <div key={stat.label}>
                <p className={`text-4xl lg:text-5xl font-black tracking-tight mb-1.5 ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2">Loved by Global Residents</h2>
            <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">Hear from members who chose co-living and luxury apartment renting with us.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-[#131c2e] border border-[#24324f] rounded-2xl p-7">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-7 italic mb-5">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#24324f]">
                  <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover border-2 border-[#24324f]" />
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.author}</h4>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-9">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight mb-2">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-sm">Everything you need to know about leases, bookings, and move-in details.</p>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className={`bg-[#131c2e] rounded-xl overflow-hidden transition-colors duration-200 border ${isOpen ? "border-indigo-500/35" : "border-[#24324f]"}`}>
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left bg-transparent cursor-pointer gap-3"
                  >
                    <span className="text-sm font-bold text-white">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-indigo-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-slate-400 leading-relaxed border-t border-[#24324f] pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA + NEWSLETTER ── */}
      <section>
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900/18 to-[#131c2e] border border-[#24324f] rounded-3xl p-10 lg:p-14 shadow-2xl">
            {/* Glow */}
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-indigo-500/8 blur-[60px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
              {/* Left copy */}
              <div>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight mb-3">
                  Have a Premium Property to Host?
                </h2>
                <p className="text-sm text-slate-400 leading-7 mb-6 max-w-md">
                  Join our premium network of hosts and maximize your occupancy. List your cozy studio, modern loft, or beachfront villa and reach executive tenants.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <Link href="/properties/add" className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-indigo-700 to-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/35 hover:opacity-90 transition-opacity">
                    List Your Property
                  </Link>
                  <Link href="/contact" className="px-6 py-2.5 rounded-lg border border-[#24324f] text-slate-400 text-sm font-semibold hover:border-slate-400 hover:text-white transition-all">
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Newsletter widget */}
              <div className="bg-[#0b0f19]/70 border border-[#24324f] rounded-2xl p-6">
                <h3 className="text-base font-bold text-white mb-1.5">Subscribe to Nest Updates</h3>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  Get monthly newsletters showing newly checked locations and off-market deals.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 min-w-0 bg-[#1b2640] border border-[#24324f] rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 transition-colors"
                  />
                  <button
                    onClick={() => alert("Thank you for subscribing to RentNest updates!")}
                    className="px-4 py-2.5 rounded-lg bg-indigo-700 hover:bg-indigo-500 border-none cursor-pointer flex items-center justify-center flex-shrink-0 transition-colors"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
