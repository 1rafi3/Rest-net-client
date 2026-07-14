"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import PropertyCard from "@/components/property-card";
import PropertySkeleton from "@/components/property-skeleton";
import { Property } from "@/lib/mock-data";

function ExploreContent() {
  const searchParams = useSearchParams();

  // Initialize state synchronously from search parameters
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "All";
  const initialLocation = searchParams.get("location") || "All";

  // Query parameters state
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState(initialLocation);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  // Fetch results state
  const [properties, setProperties] = useState<Property[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch locations for filter dropdown
  const uniqueLocations = ["All", "New York", "Los Angeles", "Miami", "Chicago", "Palo Alto", "San Francisco", "Austin", "Seattle"];
  const categories = ["All", "Co-living", "Apartment", "Studio", "Villa"];

  const fetchProperties = async (overrideSearch?: string, overrideCategory?: string, overrideLocation?: string) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      const activeSearch = typeof overrideSearch === "string" ? overrideSearch : search;
      const activeCategory = typeof overrideCategory === "string" ? overrideCategory : category;
      const activeLocation = typeof overrideLocation === "string" ? overrideLocation : location;

      if (activeSearch) queryParams.append("search", activeSearch);
      if (activeCategory && activeCategory !== "All") queryParams.append("category", activeCategory);
      if (activeLocation && activeLocation !== "All") queryParams.append("location", activeLocation);
      if (minPrice) queryParams.append("minPrice", minPrice);
      if (maxPrice) queryParams.append("maxPrice", maxPrice);
      if (rating > 0) queryParams.append("rating", rating.toString());
      if (sort) queryParams.append("sort", sort);
      queryParams.append("page", page.toString());
      queryParams.append("limit", "8"); // 8 per page (4 columns grid)

      const res = await fetch(`/api/properties?${queryParams.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setProperties(data.properties);
        setTotalPages(data.pagination.totalPages);
        setTotalCount(data.pagination.total);
      }
    } catch (error) {
      console.error("Failed to load listings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sync state and run fetch when URL query params change dynamically
  useEffect(() => {
    const searchVal = searchParams.get("search") || "";
    const catVal = searchParams.get("category") || "All";
    const locVal = searchParams.get("location") || "All";

    setSearch(searchVal);
    setCategory(catVal);
    setLocation(locVal);
    setPage(1);

    fetchProperties(searchVal, catVal, locVal);
  }, [searchParams]);

  // Trigger search on filter changes (excluding search parameter itself to prevent keystroke requests)
  useEffect(() => {
    fetchProperties();
  }, [category, location, sort, page, rating]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProperties();
  };

  const handleClearFilters = () => {
    setSearch("");
    setCategory("All");
    setLocation("All");
    setMinPrice("");
    maxPrice; // Keep maxPrice empty
    setMinPrice("");
    setRating(0);
    setSort("newest");
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Explore Nests</h1>
        <p className="mt-2 text-sm text-slate-400">
          Search and filter premium co-living spots, luxury apartments, and cozy studios.
        </p>
      </div>

      {/* Main Grid: Filters Sidebar + Listing Display */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* FILTERS PANEL */}
        <div className="lg:col-span-1 bg-[#131c2e] border border-[#24324f] p-5 rounded-xl h-fit space-y-6">
          <div className="flex items-center justify-between border-b border-[#24324f] pb-3">
            <span className="font-bold text-white flex items-center gap-2 text-base">
              <SlidersHorizontal className="h-4 w-4 text-indigo-400" />
              Filters
            </span>
            <button
              onClick={handleClearFilters}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
            >
              Reset All
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setPage(1); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    category === cat
                      ? "bg-indigo-600 text-white border border-indigo-500"
                      : "bg-[#1b2640] text-slate-300 hover:bg-slate-700 border border-slate-700/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Location</label>
            <select
              value={location}
              onChange={(e) => { setLocation(e.target.value); setPage(1); }}
              className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              {uniqueLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc === "All" ? "All Locations" : loc}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Price Budget</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min ($)"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <input
                type="number"
                placeholder="Max ($)"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button
              onClick={() => { setPage(1); fetchProperties(); }}
              className="w-full mt-2 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
            >
              Apply Price
            </button>
          </div>

          {/* Rating Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Minimum Rating</label>
            <div className="flex gap-2">
              {[0, 3, 4, 5].map((stars) => (
                <button
                  key={stars}
                  onClick={() => { setRating(stars); setPage(1); }}
                  className={`flex-1 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    rating === stars
                      ? "bg-amber-500 text-[#0b0f19]"
                      : "bg-[#1b2640] text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {stars === 0 ? "Any" : `${stars}★+`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* LISTINGS SIDE */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search bar & Sorting tools */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#131c2e] border border-[#24324f] p-4 rounded-xl">
            <form onSubmit={handleSearchSubmit} className="relative w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Search stays or keywords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
            </form>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <ArrowUpDown className="h-5 w-5 text-indigo-400" />
              <span className="text-xs text-slate-400">Sort by</span>
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value); setPage(1); }}
                className="bg-[#1b2640] border border-[#24324f] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="newest">Newest Listed</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating_desc">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="text-sm text-slate-400">
            Found <span className="font-semibold text-white">{totalCount}</span> properties
          </div>

          {/* CARDS GRID */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, idx) => (
                <PropertySkeleton key={idx} />
              ))}
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
              {properties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 bg-[#131c2e] border border-[#24324f] rounded-xl text-center p-6">
              <span className="text-4xl mb-4">🔍</span>
              <h3 className="text-lg font-bold text-white">No properties found</h3>
              <p className="text-sm text-slate-400 mt-1 max-w-xs">
                Try widening your search terms or adjusting the slider boundaries.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* PAGINATION CONTROLS */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8 pt-4 border-t border-[#24324f]">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="p-2 bg-[#1b2640] border border-[#24324f] rounded-lg text-slate-300 hover:bg-[#24324f] disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm text-slate-300">
                Page <span className="font-semibold text-white">{page}</span> of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                className="p-2 bg-[#1b2640] border border-[#24324f] rounded-lg text-slate-300 hover:bg-[#24324f] disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="text-center text-slate-400 py-20">Loading stay explorer...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
