"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PlusCircle, ShieldAlert, Sparkles, MapPin, DollarSign, Home, Image } from "lucide-react";

export default function AddPropertyPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Form states
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Co-living");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [beds, setBeds] = useState("1");
  const [baths, setBaths] = useState("1");
  const [sqft, setSqft] = useState("350");
  const [amenities, setAmenities] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Authentication check
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/properties/add");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !shortDescription || !description || !price || !location) {
      setError("Please fill in all mandatory fields.");
      return;
    }

    // Split amenities by comma and clean spaces
    const amenitiesList = amenities
      ? amenities.split(",").map((a) => a.trim()).filter((a) => a !== "")
      : ["High-speed Wi-Fi", "Smart TV", "Air Conditioning"];

    const imagesList = imageUrl.trim() ? [imageUrl.trim()] : [];

    try {
      setSubmitting(true);
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          shortDescription,
          description,
          price,
          category,
          location,
          images: imagesList,
          beds,
          baths,
          sqft,
          amenities: amenitiesList
        })
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("Stay listing published successfully! Redirecting...");
        setTimeout(() => {
          router.push(`/properties/${data.property.id}`);
        }, 1500);
      } else {
        setError(data.error || "Failed to publish listing.");
      }
    } catch (err) {
      console.error(err);
      setError("A network error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 text-center space-y-4 animate-pulse">
        <div className="h-6 w-32 bg-[#131c2e] rounded mx-auto" />
        <div className="h-96 w-full max-w-2xl bg-[#131c2e] rounded-xl mx-auto" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Add New Property</h1>
        <p className="text-sm text-slate-400">List your studio, apartment, or co-living space on RentNest's network.</p>
      </div>

      {/* Form Card */}
      <div className="bg-[#131c2e] border border-[#24324f] p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
        
        {error && (
          <div className="flex gap-2 items-start bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-xs text-red-400 font-medium animate-fade-in">
            <ShieldAlert className="h-5 w-5 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex gap-2 items-start bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg text-xs text-emerald-400 font-semibold animate-fade-in">
            <Sparkles className="h-5 w-5 shrink-0 text-emerald-400" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Property Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Modern Downtown Studio with Skyline Views"
              className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Short Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Short Summary *</label>
            <input
              type="text"
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="A brief 1-sentence sales pitch shown on listing cards"
              className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Full Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Detailed Description *</label>
            <textarea
              rows={5}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a comprehensive walkthrough of utility bills, furniture quality, co-working conditions, neighborhood sights..."
              className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Grid fields: Price, Category, Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Monthly Price ($) *</label>
              <div className="relative">
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="1200"
                  className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg pl-8 pr-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
                <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Stay Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Co-living">Co-living</option>
                <option value="Apartment">Apartment</option>
                <option value="Studio">Studio</option>
                <option value="Villa">Villa</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Location / City *</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Austin, Texas"
                  className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg pl-8 pr-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              </div>
            </div>
          </div>

          {/* Grid fields: Beds, Baths, Sqft */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Beds</label>
              <input
                type="number"
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Baths</label>
              <input
                type="number"
                step="0.5"
                value={baths}
                onChange={(e) => setBaths(e.target.value)}
                className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Sqft Area</label>
              <input
                type="number"
                value={sqft}
                onChange={(e) => setSqft(e.target.value)}
                className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Image URL (Optional)</label>
            <div className="relative">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="e.g. https://images.unsplash.com/photo-..."
                className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg pl-8 pr-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
              <Image className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Amenities (Comma separated)</label>
            <input
              type="text"
              value={amenities}
              onChange={(e) => setAmenities(e.target.value)}
              placeholder="e.g. Fiber Internet, Gym, Smart TV, In-unit Laundry, Private Balcony"
              className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Action button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-2"
          >
            <PlusCircle className="h-5 w-5" />
            {submitting ? "Publishing listing..." : "Publish Accommodation"}
          </button>

        </form>
      </div>
    </div>
  );
}
