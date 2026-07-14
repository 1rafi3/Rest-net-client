"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  TrendingUp,
  DollarSign,
  Building,
  Star,
  Users,
  Calendar,
  AlertCircle,
  FileSpreadsheet
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

interface SummaryData {
  totalListings: number;
  totalBookings: number;
  totalRevenue: number;
  avgRating: number;
}

interface BookingRow {
  id: string;
  propertyName: string;
  userName: string;
  price: number;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
}

interface StatsData {
  summary: SummaryData;
  charts: {
    monthlyRevenue: Array<{ name: string; revenue: number }>;
    categoryData: Array<{ name: string; value: number }>;
    bookingCounts: Array<{ name: string; bookings: number }>;
  };
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);

  const COLORS = ["#6366f1", "#f59e0b", "#10b981", "#ec4899"];

  const loadDashboardData = async () => {
    try {
      setLoadingStats(true);
      // Fetch stats
      const statsRes = await fetch("/api/dashboard/stats");
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      // Fetch bookings
      const bookingsRes = await fetch("/api/bookings");
      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        setBookings(bookingsData.bookings);
      }
    } catch (error) {
      console.error("Dashboard fetching error:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    if (!loading) {
      if (!user) {
        router.push("/login?redirect=/dashboard");
      } else {
        loadDashboardData();
      }
    }
  }, [user, loading, router]);

  if (!mounted || loading || loadingStats || !user) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 text-center space-y-4 animate-pulse">
        <div className="h-6 w-32 bg-[#131c2e] rounded mx-auto" />
        <div className="h-96 w-full max-w-5xl bg-[#131c2e] rounded-xl mx-auto" />
      </div>
    );
  }

  const summary = stats?.summary || { totalListings: 0, totalBookings: 0, totalRevenue: 0, avgRating: 4.8 };
  const charts = stats?.charts || { monthlyRevenue: [], categoryData: [], bookingCounts: [] };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Performance Analytics</h1>
        <p className="text-sm text-slate-400 mt-1">
          Welcome back, <span className="font-semibold text-white">{user.name}</span>. Here is your platform overview.
        </p>
      </div>

      {/* SUMMARY CARDS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Revenue */}
        <div className="bg-[#131c2e] border border-[#24324f] p-5 rounded-2xl flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Cumulative Earnings</p>
            <h3 className="text-2xl font-extrabold text-white mt-0.5">${summary.totalRevenue.toLocaleString()}</h3>
          </div>
        </div>

        {/* Card 2: Bookings */}
        <div className="bg-[#131c2e] border border-[#24324f] p-5 rounded-2xl flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Bookings</p>
            <h3 className="text-2xl font-extrabold text-white mt-0.5">{summary.totalBookings}</h3>
          </div>
        </div>

        {/* Card 3: Properties */}
        <div className="bg-[#131c2e] border border-[#24324f] p-5 rounded-2xl flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <Building className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Listed Accommodations</p>
            <h3 className="text-2xl font-extrabold text-white mt-0.5">{summary.totalListings}</h3>
          </div>
        </div>

        {/* Card 4: Avg Rating */}
        <div className="bg-[#131c2e] border border-[#24324f] p-5 rounded-2xl flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-[#ec4899]/10 border border-[#ec4899]/20 flex items-center justify-center text-[#ec4899]">
            <Star className="h-6 w-6 fill-[#ec4899]" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Average Rating</p>
            <h3 className="text-2xl font-extrabold text-white mt-0.5">{summary.avgRating} ★</h3>
          </div>
        </div>

      </div>

      {/* CHARTS LAYER (RECHARTS) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chart 1: Revenue Flow Area Chart */}
        <div className="lg:col-span-2 bg-[#131c2e] border border-[#24324f] p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#24324f] pb-3">
            <h3 className="text-base font-bold text-white">Monthly Revenue Trend ($)</h3>
          </div>
          <div className="h-72 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={charts.monthlyRevenue} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#24324f" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: "#131c2e", borderColor: "#24324f", color: "#fff" }} />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Category Distribution Pie Chart */}
        <div className="lg:col-span-1 bg-[#131c2e] border border-[#24324f] p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#24324f] pb-3">
            <h3 className="text-base font-bold text-white">Listings Category Mix</h3>
          </div>
          <div className="h-72 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={charts.categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {charts.categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#131c2e", borderColor: "#24324f", color: "#fff" }} />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ color: "#94a3b8" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Booking Count Bar Chart */}
        <div className="lg:col-span-3 bg-[#131c2e] border border-[#24324f] p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#24324f] pb-3">
            <h3 className="text-base font-bold text-white">Monthly Reservation Volume</h3>
          </div>
          <div className="h-72 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.bookingCounts} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#24324f" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: "#131c2e", borderColor: "#24324f", color: "#fff" }} />
                <Bar dataKey="bookings" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* BOOKINGS HISTORY TABLE */}
      <div className="bg-[#131c2e] border border-[#24324f] p-6 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 border-b border-[#24324f] pb-3">
          <FileSpreadsheet className="h-5 w-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white">Your Bookings & Contracts</h3>
        </div>

        {bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-[#0b0f19] text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-[#24324f]">
                <tr>
                  <th scope="col" className="px-4 py-3">Property</th>
                  <th scope="col" className="px-4 py-3">Renter</th>
                  <th scope="col" className="px-4 py-3">Dates</th>
                  <th scope="col" className="px-4 py-3">Total Cost</th>
                  <th scope="col" className="px-4 py-3">Contract Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#24324f]">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#1b2640]/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-white">{b.propertyName}</td>
                    <td className="px-4 py-3 text-slate-400">{b.userName}</td>
                    <td className="px-4 py-3 flex items-center gap-1.5 text-slate-400 pt-3.5">
                      <Calendar className="h-4 w-4 text-indigo-400 shrink-0" />
                      <span>{b.startDate} to {b.endDate}</span>
                    </td>
                    <td className="px-4 py-3 font-bold text-white">${b.price.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold border ${
                        b.status === "confirmed"
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                          : "bg-amber-500/10 border-amber-500/20 text-amber-500"
                      }`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center text-slate-500 space-y-2">
            <AlertCircle className="h-8 w-8 text-slate-600" />
            <p className="text-sm font-semibold">No bookings found</p>
            <p className="text-xs max-w-xs leading-relaxed">
              Renters will see their reservation contracts listed here once they complete a booking form.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
