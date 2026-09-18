'use client';

import React, { useState } from 'react';
import { Search, MapPin, ThumbsUp, CheckCircle2, BadgeCheck, Users, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  initialSearchQuery?: string;
  initialLocation?: string;
  onSearch?: (query: string, location: string) => void;
}

const LOCATION_OPTIONS = ['All', 'Bangalore', 'Remote', 'Hyderabad', 'Gurugram', 'Coimbatore'];

export function HeroSection({
  initialSearchQuery = '',
  initialLocation = 'Bangalore',
  onSearch,
}: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [location, setLocation] = useState(
    LOCATION_OPTIONS.includes(initialLocation) ? initialLocation : 'Bangalore'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery, location);
    }
  };

  return (
    <section className="relative w-full bg-[#fcfafe] bg-graph-grid overflow-hidden pt-6 sm:pt-10 pb-4 sm:pb-24 border-b border-[#d0e5f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative min-h-[480px] sm:min-h-[540px] flex flex-col justify-center">

        {/* -------------------- DESKTOP COLLAGE FRAME (lg+ screens) -------------------- */}

        {/* Left Side Photos & Floating Card */}
        <div className="hidden lg:block pointer-events-none">
          {/* Top Left Photo */}
          <div className="absolute left-2 xl:left-6 top-6 w-32 xl:w-36 h-40 xl:h-44 rounded-3xl overflow-hidden shadow-md border-4 border-white transform -rotate-1 z-10 transition-transform hover:scale-105">
            <img
              src="/hero/hero-1.jpg"
              alt="Career specialist"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Left Photo */}
          <div className="absolute left-4 xl:left-8 bottom-4 w-32 xl:w-44 h-40 xl:h-52 rounded-3xl overflow-hidden shadow-md border-4 border-white transform rotate-2 z-10 transition-transform hover:scale-105">
            <img
              src="/hero/hero-2.jpg"
              alt="Job seeker"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Left Floating UI Card: Microsoft Job Card */}
          <div className="absolute left-24 xl:left-32 top-36 z-20 pointer-events-auto bg-white rounded-2xl p-4 shadow-xl border border-slate-100 w-52 xl:w-56 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="flex items-center gap-2 mb-2">
              <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
                <div className="bg-[#F25022]"></div>
                <div className="bg-[#7FBA00]"></div>
                <div className="bg-[#00A4EF]"></div>
                <div className="bg-[#FFB900]"></div>
              </div>
            </div>
            <div className="text-xs font-bold text-[#000000]">Software Engineer</div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-2.5">
              <span>Microsoft</span>
              <BadgeCheck className="w-3.5 h-3.5 text-[#1D74C1] fill-[#1D74C1]/10" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] text-slate-500 font-medium">Engineering</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] text-slate-500 font-medium">Remote</span>
            </div>
          </div>
        </div>

        {/* Right Side Photos & Floating Card */}
        <div className="hidden lg:block pointer-events-none">
          {/* Top Right Photo */}
          <div className="absolute right-4 xl:left-auto xl:right-16 top-4 w-32 xl:w-36 h-40 xl:h-44 rounded-3xl overflow-hidden shadow-md border-4 border-white transform rotate-3 z-10 transition-transform hover:scale-105">
            <img
              src="/hero/hero-3.jpg"
              alt="Hiring manager"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Middle Right Photo */}
          <div className="absolute right-2 xl:right-4 top-48 w-32 xl:w-36 h-40 xl:h-44 rounded-3xl overflow-hidden shadow-md border-4 border-white transform -rotate-2 z-10 transition-transform hover:scale-105">
            <img
              src="/hero/hero-4.jpg"
              alt="Candidate"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Floating UI Card: Google Job Card */}
          <div className="absolute right-20 xl:right-28 bottom-6 z-20 pointer-events-auto bg-white rounded-2xl p-4 shadow-xl border border-slate-100 w-52 xl:w-56 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>
            <div className="text-xs font-bold text-[#000000]">Product Designer</div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-2.5">
              <span>Google Inc</span>
              <BadgeCheck className="w-3.5 h-3.5 text-[#1D74C1] fill-[#1D74C1]/10" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] text-slate-500 font-medium">Design</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] text-slate-500 font-medium">Full time</span>
            </div>
          </div>
        </div>

        {/* -------------------- CENTER CONTENT AREA -------------------- */}
        <div className="relative z-30 max-w-2xl mx-auto text-center pt-2 sm:pt-4">

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F7FE] border border-[#d0e5f7] text-xs font-medium text-[#1D74C1] shadow-xs mb-4 sm:mb-6 hover:shadow-sm transition-shadow">
            <ThumbsUp className="w-3.5 h-3.5 text-[#1D74C1] shrink-0" />
            <span>India's Top Rated Job Platform</span>
          </div>

          {/* Headline - Optimized for mobile typography */}
          <h1 className="text-5xl sm:text-5xl lg:text-7xl font-normal font-heading text-[#000000] tracking-normal mb-3 sm:mb-4 px-1 leading-[0.8]">
            Jobs move <span className="text-[#1D74C1] font-normal font-avenue ">fast.</span> <br />
            <span className='text-[2.4rem] sm:text-5xl lg:text-6xl font-heading italic font-thin text-[#000000] tracking-tight'>So do we, <br className='block sm:hidden' /> every single morning. </span>
          </h1>

          {/* Subheadline - Mobile friendly line height & width */}
          <p className="text-xs sm:text-base text-[#353535] font-normal max-w-lg mx-auto leading-relaxed mb-6 sm:mb-8 px-2">
            JobBase tracks fresh openings, off-campus drives and internships in real time → so you apply before the crowd does.
          </p>

          {/* Search Bar Pill - Mobile First with 44px+ Touch Targets */}
          <form
            onSubmit={handleSubmit}
            className="w-full bg-[#fcfafe] rounded-2xl sm:rounded-full shadow-lg shadow-[#1D74C1]/10 border border-[#d0e5f7] p-2 sm:p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-xl mx-auto transition-all focus-within:ring-2 focus-within:ring-[#1D74C1]/20 focus-within:border-[#1D74C1]"
          >
            {/* Search Input */}
            <div className="flex items-center gap-2.5 px-3.5 w-full sm:w-1/2 py-2.5 sm:py-1.5 min-h-[44px]">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find job here"
                className="w-full text-sm text-[#000000] placeholder-[#353535]/40 bg-transparent outline-none font-sans"
              />
            </div>

            {/* Mobile Horizontal Divider / Desktop Vertical Divider */}
            <div className="h-[1px] w-full bg-slate-100 sm:hidden" />
            <div className="hidden sm:block h-6 w-[1px] bg-[#d0e5f7] shrink-0" />

            {/* Location Select Dropdown */}
            <div className="flex items-center gap-2.5 px-3.5 w-full sm:w-1/2 py-2.5 sm:py-1.5 min-h-[44px] relative">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-sm text-[#000000] bg-transparent outline-none font-sans cursor-pointer appearance-none pr-5"
              >
                {LOCATION_OPTIONS.map((loc) => (
                  <option key={loc} value={loc} className="text-[#000000] bg-white">
                    {loc === 'All' ? 'All Locations' : loc}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 pointer-events-none absolute right-3" />
            </div>

            {/* Search Button - Touch Friendly */}
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#1D74C1] active:bg-[#175fa3] hover:bg-[#175fa3] text-white font-semibold text-sm rounded-xl sm:rounded-full px-7 py-3 min-h-[44px] transition-colors shadow-md hover:shadow-lg shrink-0 flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              Search
            </button>
          </form>

          {/* -------------------- MOBILE COLLAGE PREVIEW (Visible only on < lg screens) -------------------- */}
          <div className="mt-2 pt-4 border-t border-slate-100 flex lg:hidden flex-col items-center justify-center gap-3">
            <div className="flex items-center justify-center -space-x-2.5 overflow-hidden">
              <img src="/hero/hero-1.jpg" alt="" className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover shadow-xs" />
              <img src="/hero/hero-2.jpg" alt="" className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover shadow-xs" />
              <img src="/hero/hero-3.jpg" alt="" className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover shadow-xs" />
              <img src="/hero/hero-4.jpg" alt="" className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover shadow-xs" />
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1 text-[#1D74C1] font-semibold">
                <Users className="w-3.5 h-3.5" /> 800K+
              </span>
              <span>job seekers hired across 20K+ companies</span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <div className="bg-[#F3F7FE] rounded-full px-3 py-1 shadow-xs border border-[#d0e5f7] text-[11px] font-medium text-[#353535] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#1D74C1]" />
                Profile Auto-Match
              </div>
              <div className="bg-[#F3F7FE] rounded-full px-3 py-1 shadow-xs border border-[#d0e5f7] text-[11px] font-medium text-[#353535] flex items-center gap-1">
                <BadgeCheck className="w-3 h-3 text-[#1D74C1]" />
                Verified Employers
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Fade Gradient Overlay for smooth grid line exit */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-36 bg-gradient-to-b from-transparent via-[#fcfafe]/70 to-[#fcfafe] pointer-events-none z-20" />
    </section>
  );
}
