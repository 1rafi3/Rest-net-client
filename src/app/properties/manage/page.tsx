"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Trash2, Eye, Plus, ShieldAlert, Sparkles, Building } from "lucide-react";
import { Property } from "@/lib/mock-data";

export default function ManagePropertiesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [properties, setProperties] = useState<Property[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadProperties = async () => {
    try {
      setFetching(true);
      setError("");
      
      // Fetch all properties
      const res = await fetch("/api/properties?limit=100");
      if (res.ok) {
        const data = await res.json();
        
        // Filter based on user role
        if (user) {
          if (user.role === "admin") {
            setProperties(data.properties); // Admins see everything
          } else {
            // Regular hosts see only their own listings
            setProperties(data.properties.filter((p: Property) => p.hostId === user.id));
          }
        }
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch listings.");
    } finally {
      setFetching(false);
    }
  };

  // Auth protection check & Load listings
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login?redirect=/properties/manage");
      } else {
        loadProperties();
      }
    }
  }, [user, loading, router]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this property listing?")) {
      return;
    }

    try {
      setError("");
      setSuccess("");
      const res = await fetch(`/api/properties/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setSuccess("Listing successfully deleted.");
        // Reload properties
        loadProperties();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to delete property listing.");
      }
    } catch (err) {
      console.error(err);
      setError("A network error occurred. Please try again.");
    }
  };

  if (loading || fetching || !user) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 text-center space-y-4 animate-pulse">
        <div className="h-6 w-32 bg-[#131c2e] rounded mx-auto" />
        <div className="h-48 w-full max-w-4xl bg-[#131c2e] rounded-xl mx-auto" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Manage Listings</h1>
          <p className="text-sm text-slate-400 mt-1">
            {user.role === "admin"
              ? "Administrator View: Reviewing all active property listings on RentNest."
              : "Review, add, or delete your published property listings."}
          </p>
        </div>
        <Link
          href="/properties/add"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add Property
        </Link>
      </div>

      {/* Alerts */}
      {error && (
        <div className="flex gap-2 items-start bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-xs text-red-400 font-medium">
          <ShieldAlert className="h-5 w-5 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex gap-2 items-start bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg text-xs text-emerald-400 font-semibold">
          <Sparkles className="h-5 w-5 shrink-0 text-emerald-400" />
          <span>{success}</span>
        </div>
      )}

      {/* Table grid */}
      {properties.length > 0 ? (
        <div className="bg-[#131c2e] border border-[#24324f] rounded-2xl overflow-hidden shadow-xl">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-[#0b0f19] text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-[#24324f]">
                <tr>
                  <th scope="col" className="px-6 py-4">Property</th>
                  <th scope="col" className="px-6 py-4">Category</th>
                  <th scope="col" className="px-6 py-4">Location</th>
                  <th scope="col" className="px-6 py-4">Price</th>
                  <th scope="col" className="px-6 py-4">Rating</th>
                  <th scope="col" className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#24324f]">
                {properties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-[#1b2640]/30 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={prop.images[0]}
                        alt={prop.title}
                        className="h-10 w-16 rounded object-cover border border-slate-700/50"
                      />
                      <span className="font-bold text-white max-w-xs truncate">{prop.title}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-indigo-600/20 border border-indigo-500/20 text-indigo-400 text-xs px-2 py-0.5 rounded font-medium">
                        {prop.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{prop.location}</td>
                    <td className="px-6 py-4 font-semibold text-white">${prop.price}</td>
                    <td className="px-6 py-4 font-semibold text-amber-400">
                      {prop.rating > 0 ? `${prop.rating} ★` : "New"}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        href={`/properties/${prop.id}`}
                        className="inline-flex items-center justify-center p-2 rounded-lg bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-600 hover:text-white transition cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(prop.id)}
                        className="inline-flex items-center justify-center p-2 rounded-lg bg-red-600/10 text-red-400 border border-red-500/20 hover:bg-red-600 hover:text-white transition cursor-pointer"
                        title="Delete listing"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card-List View */}
          <div className="md:hidden divide-y divide-[#24324f]">
            {properties.map((prop) => (
              <div key={prop.id} className="p-4 space-y-3">
                <div className="flex gap-3">
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="h-12 w-20 rounded object-cover border border-slate-700/50 shrink-0"
                  />
                  <div className="space-y-0.5 min-w-0">
                    <h4 className="font-bold text-white text-sm truncate">{prop.title}</h4>
                    <p className="text-xs text-slate-400 truncate">{prop.location}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex gap-2">
                    <span className="bg-indigo-600/20 border border-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded font-medium">
                      {prop.category}
                    </span>
                    <span className="font-semibold text-white">${prop.price}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/properties/${prop.id}`}
                      className="inline-flex items-center justify-center p-2 rounded-lg bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-600 hover:text-white transition"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(prop.id)}
                      className="inline-flex items-center justify-center p-2 rounded-lg bg-red-600/10 text-red-400 border border-red-500/20 hover:bg-red-600 hover:text-white transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-[#131c2e] border border-[#24324f] rounded-2xl text-center p-6 space-y-4">
          <Building className="h-12 w-12 text-slate-500" />
          <h3 className="text-lg font-bold text-white">No properties listed</h3>
          <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
            You haven't listed any properties yet. Click the button below to add your first studio, apartment, or co-living space.
          </p>
          <Link
            href="/properties/add"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition cursor-pointer"
          >
            Create Your First Listing
          </Link>
        </div>
      )}
    </div>
  );
}
