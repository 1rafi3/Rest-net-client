"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Star, MapPin, BedDouble, Bath, Square, Calendar, User, ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { Property } from "@/lib/mock-data";
import { useAuth } from "@/context/AuthContext";
import PropertyCard from "@/components/property-card";
import PropertySkeleton from "@/components/property-skeleton";

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();

  const [property, setProperty] = useState<Property | null>(null);
  const [related, setRelated] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Active gallery image
  const [activeImage, setActiveImage] = useState(0);

  // Booking states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  // Review states
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

  const fetchPropertyData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/properties/${id}`);
      if (!res.ok) {
        throw new Error("Property not found");
      }
      const data = await res.json();
      setProperty(data.property);
      setActiveImage(0);

      // Load related properties (same category, excluding current one)
      const relRes = await fetch(`/api/properties?category=${data.property.category}`);
      if (relRes.ok) {
        const relData = await relRes.json();
        const filteredRelated = relData.properties.filter((p: Property) => p.id !== id).slice(0, 3);
        setRelated(filteredRelated);
      }
    } catch (err) {
      console.error(err);
      setProperty(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPropertyData();
    }
  }, [id]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push(`/login?redirect=/properties/${id}`);
      return;
    }

    if (!startDate || !endDate) {
      setBookingError("Please pick check-in and check-out dates");
      return;
    }

    try {
      setBookingLoading(true);
      setBookingError("");
      setBookingMessage("");

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: id,
          startDate,
          endDate
        })
      });

      const data = await res.json();
      if (res.ok) {
        setBookingMessage("Booking confirmed successfully! View details in your Dashboard.");
        setStartDate("");
        setEndDate("");
      } else {
        setBookingError(data.error || "Booking failed.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      setBookingError("Network error. Try again later.");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push(`/login?redirect=/properties/${id}`);
      return;
    }

    if (!comment.trim()) {
      setReviewError("Please write a comment for your review.");
      return;
    }

    try {
      setReviewLoading(true);
      setReviewError("");
      setReviewMessage("");

      const res = await fetch(`/api/properties/${id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          comment
        })
      });

      const data = await res.json();
      if (res.ok) {
        setReviewMessage("Review added successfully! Thank you for sharing your experience.");
        setComment("");
        setRating(5);
        // Refresh property data to show new review
        fetchPropertyData();
      } else {
        setReviewError(data.error || "Review submission failed.");
      }
    } catch (err) {
      console.error("Review error:", err);
      setReviewError("Network error. Try again later.");
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-pulse">
        <div className="h-6 w-32 bg-[#131c2e] rounded" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video w-full bg-[#131c2e] rounded-xl" />
            <div className="h-8 w-2/3 bg-[#131c2e] rounded" />
            <div className="h-32 bg-[#131c2e] rounded-xl" />
          </div>
          <div className="h-96 bg-[#131c2e] rounded-xl" />
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Stay listing not found</h2>
        <p className="text-sm text-slate-400">The property you are looking for has been removed or is unavailable.</p>
        <Link href="/explore" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold">
          <ArrowLeft className="h-4 w-4" />
          Back to Explore
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(property.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      
      {/* Back button */}
      <div>
        <Link href="/explore" className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-medium">
          <ArrowLeft className="h-4 w-4" />
          Back to listings
        </Link>
      </div>

      {/* Main Title and Location header */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="bg-indigo-600/90 text-white text-xs font-semibold px-2.5 py-1 rounded">
            {property.category}
          </span>
          <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
            <Star className="h-4 w-4 fill-amber-400 stroke-amber-400" />
            <span>{property.rating > 0 ? property.rating.toFixed(1) : "New Listing"} ({property.reviews?.length ?? 0} reviews)</span>
          </div>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">{property.title}</h1>
        <div className="flex items-center gap-1.5 text-sm text-slate-400 font-medium">
          <MapPin className="h-4 w-4 text-indigo-400" />
          <span>{property.location}</span>
        </div>
      </div>

      {/* LAYOUT: GALLERY & BOOKING FORM CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Images & Detailed Specifications */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* IMAGE GALLERY */}
          <div className="space-y-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#24324f] bg-slate-800">
              <img
                src={property.images[activeImage]}
                alt={`${property.title} view`}
                className="h-full w-full object-cover object-center transition-opacity"
              />
            </div>
            
            {/* Gallery Thumbnails */}
            {property.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative h-20 w-28 shrink-0 rounded-lg overflow-hidden border-2 cursor-pointer transition ${
                      activeImage === idx ? "border-indigo-500" : "border-[#24324f] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="Thumbnail view" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* OVERVIEW SECTION */}
          <div className="bg-[#131c2e] border border-[#24324f] p-6 rounded-2xl space-y-4">
            <h2 className="text-xl font-bold text-white">Stay Overview</h2>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* KEY SPECIFICATIONS */}
          <div className="bg-[#131c2e] border border-[#24324f] p-6 rounded-2xl space-y-6">
            <h2 className="text-xl font-bold text-white">Specifications & Features</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 bg-[#1b2640] rounded-xl text-center border border-slate-700/50">
                <BedDouble className="h-6 w-6 text-indigo-400 mx-auto mb-1.5" />
                <p className="text-xs text-slate-400">Bedrooms</p>
                <p className="text-sm font-bold text-white mt-0.5">{property.beds} Bed{property.beds > 1 ? "s" : ""}</p>
              </div>
              <div className="p-3 bg-[#1b2640] rounded-xl text-center border border-slate-700/50">
                <Bath className="h-6 w-6 text-indigo-400 mx-auto mb-1.5" />
                <p className="text-xs text-slate-400">Bathrooms</p>
                <p className="text-sm font-bold text-white mt-0.5">{property.baths} Bath{property.baths > 1 ? "s" : ""}</p>
              </div>
              <div className="p-3 bg-[#1b2640] rounded-xl text-center border border-slate-700/50">
                <Square className="h-6 w-6 text-indigo-400 mx-auto mb-1.5" />
                <p className="text-xs text-slate-400">Usable Space</p>
                <p className="text-sm font-bold text-white mt-0.5">{property.sqft} sqft</p>
              </div>
              <div className="p-3 bg-[#1b2640] rounded-xl text-center border border-slate-700/50">
                <Calendar className="h-6 w-6 text-indigo-400 mx-auto mb-1.5" />
                <p className="text-xs text-slate-400">Listed On</p>
                <p className="text-xs font-bold text-white mt-1">{formattedDate}</p>
              </div>
            </div>

            {/* Amenities Checklist */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-slate-300">Amenities</h3>
              <div className="grid grid-cols-2 gap-3">
                {property.amenities.map((am) => (
                  <div key={am} className="flex items-center gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0" />
                    <span>{am}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Interactive Booking Widget */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-[#131c2e] border border-[#24324f] p-6 rounded-2xl shadow-xl space-y-6">
            <div className="flex items-baseline justify-between border-b border-[#24324f] pb-4">
              <div>
                <span className="text-2xl font-extrabold text-white">${property.price}</span>
                <span className="text-sm text-slate-400">/{property.category === "Villa" ? "night" : "mo"}</span>
              </div>
              <span className="text-xs text-slate-400 font-medium">All Bills Included</span>
            </div>

            {/* BOOKING DRAWER FORM */}
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Check-In Date</label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Check-Out Date</label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {bookingError && (
                <div className="text-xs text-red-400 font-semibold bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                  {bookingError}
                </div>
              )}

              {bookingMessage && (
                <div className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                  {bookingMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={bookingLoading}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-sm font-semibold transition cursor-pointer"
              >
                {bookingLoading ? "Processing..." : user ? "Confirm Reservation" : "Login to Reserve"}
              </button>
            </form>

            <div className="text-center text-xs text-slate-500 pt-2 border-t border-[#24324f]/50">
              {property.category === "Villa"
                ? "Prices may vary during peak holiday weekends."
                : "Standard co-living contracts require a minimum 30-day lease stay."}
            </div>
          </div>
        </div>

      </div>

      {/* REVIEWS & RATINGS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Review Comments list */}
        <div className="lg:col-span-2 bg-[#131c2e] border border-[#24324f] p-6 rounded-2xl space-y-6">
          <h2 className="text-xl font-bold text-white border-b border-[#24324f] pb-3">
            Reviews ({property.reviews?.length ?? 0})
          </h2>

          {property.reviews && property.reviews.length > 0 ? (
            <div className="space-y-6 divide-y divide-[#24324f]">
              {property.reviews.map((rev, index) => (
                <div key={rev.id} className={`space-y-2.5 ${index > 0 ? "pt-6" : ""}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"}
                        alt={rev.name}
                        className="h-10 w-10 rounded-full object-cover border border-[#24324f]"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                        <span className="text-xs text-slate-500">{rev.date}</span>
                      </div>
                    </div>

                    <div className="flex gap-0.5 text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-amber-400 stroke-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed pl-1">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-sm text-slate-500">
              No reviews yet. Be the first to share your thoughts on this stay!
            </div>
          )}
        </div>

        {/* Leave a review Form */}
        <div className="lg:col-span-1 bg-[#131c2e] border border-[#24324f] p-6 rounded-2xl h-fit space-y-4">
          <h3 className="text-base font-bold text-white border-b border-[#24324f] pb-3">Leave a Review</h3>
          
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value={5}>5 Stars - Outstanding</option>
                <option value={4}>4 Stars - Very Good</option>
                <option value={3}>3 Stars - Average</option>
                <option value={2}>2 Stars - Below Average</option>
                <option value={1}>1 Star - Poor Stay</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Your Experience</label>
              <textarea
                rows={4}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share clean details about the Wi-Fi speed, bed comfort, amenities, location tips..."
                className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {reviewError && (
              <div className="text-xs text-red-400 font-semibold bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                {reviewError}
              </div>
            )}

            {reviewMessage && (
              <div className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                {reviewMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={reviewLoading}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Send className="h-4 w-4" />
              {reviewLoading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>

      </div>

      {/* RELATED ITEMS */}
      <div className="space-y-6 pt-4 border-t border-[#24324f]">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Similar Stays You May Like</h2>
          <Link href="/explore" className="text-sm text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
            View All →
          </Link>
        </div>
        {related.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => <PropertySkeleton key={i} />)}
          </div>
        )}
      </div>

    </div>
  );
}
