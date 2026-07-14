"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Contact Our Team</h1>
        <p className="text-sm text-slate-400">
          Have a question about a stay, lease contracts, hosting properties, or technical issues? Send us a message and we'll reply within 12 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Contact Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#131c2e] border border-[#24324f] p-6 rounded-2xl space-y-4">
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Corporate HQ</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  120 Silicon Boulevard, Suite 500, San Francisco, CA 94107
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start pt-4 border-t border-[#24324f]">
              <div className="h-10 w-10 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Email Addresses</h4>
                <p className="text-xs text-slate-400">General: <a href="mailto:support@rentnest.com" className="text-indigo-400 hover:underline">support@rentnest.com</a></p>
                <p className="text-xs text-slate-400">Hosting: <a href="mailto:hosts@rentnest.com" className="text-indigo-400 hover:underline">hosts@rentnest.com</a></p>
              </div>
            </div>

            <div className="flex gap-4 items-start pt-4 border-t border-[#24324f]">
              <div className="h-10 w-10 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                <Phone className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Call Support</h4>
                <p className="text-xs text-slate-400">Renter Support: <a href="tel:+14155552678" className="text-indigo-400 hover:underline">+1 (415) 555-2678</a></p>
                <p className="text-xs text-slate-400">Corporate: <a href="tel:+14155559090" className="text-indigo-400 hover:underline">+1 (415) 555-9090</a></p>
              </div>
            </div>
          </div>

          {/* Additional details */}
          <div className="bg-[#131c2e] border border-[#24324f] p-6 rounded-2xl flex gap-4 items-start">
            <Clock className="h-5 w-5 text-amber-500 shrink-0" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Host Working Hours</h4>
              <p className="text-xs text-slate-400">Monday - Friday: 9:00 AM - 6:00 PM PST</p>
              <p className="text-xs text-slate-400">Emergency support is available 24/7 for active residents.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Message Submission Form */}
        <div className="lg:col-span-7 bg-[#131c2e] border border-[#24324f] p-6 sm:p-8 rounded-2xl space-y-6">
          <div className="flex items-center gap-2 border-b border-[#24324f] pb-3">
            <MessageSquare className="h-5 w-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">Send Us a Message</h3>
          </div>

          {submitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-xl text-center space-y-3">
              <span className="text-4xl">check_circle_outline</span>
              <h4 className="text-lg font-bold text-white">Message Sent Successfully!</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Thank you for contacting RentNest. Our team has received your query and one of our local hosts will respond shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold cursor-pointer transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Message Content</label>
                <textarea
                  rows={6}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you'd like assistance with..."
                  className="w-full bg-[#1b2640] border border-[#24324f] rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                Send Inquiry
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
