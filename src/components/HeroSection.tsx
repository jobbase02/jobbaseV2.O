'use client';

import React, { useState } from 'react';
import { Search, MapPin, ThumbsUp, CheckCircle2, BadgeCheck, Users, ChevronDown, ArrowUpRight } from 'lucide-react';

function TelegramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.196 1.006.128.83.942z" />
    </svg>
  );
}

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

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

          {/* Community Social Action Buttons (Telegram & Instagram) */}
          <div className="mt-3.5 sm:mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 sm:px-2">
            <a
              href="https://t.me/jobbase02"
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-full bg-white/95 hover:bg-white text-[#000000] border border-[#d0e5f7] hover:border-[#1D74C1] shadow-2xs hover:shadow-[0_4px_16px_-2px_rgba(29,116,193,0.15)] text-xs sm:text-sm font-semibold font-subheading transition-all duration-200 active:scale-95"
            >
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#e8f1fb] text-[#1D74C1] flex items-center justify-center shrink-0 group-hover/btn:scale-110 transition-transform">
                <TelegramIcon className="w-3.5 h-3.5 fill-current" />
              </span>
              <span className="group-hover/btn:text-[#1D74C1] transition-colors font-heading font-semibold tracking-wider">Join Telegram</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-[#1D74C1] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
            </a>

            <a
              href="https://t.me/jobbase02"
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-full bg-white/95 hover:bg-white text-[#000000] border border-[#d0e5f7] hover:border-[#E1306C]/50 shadow-2xs hover:shadow-[0_4px_16px_-2px_rgba(225,48,108,0.15)] text-xs sm:text-sm font-semibold font-subheading transition-all duration-200 active:scale-95"
            >
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#fdf0f5] text-[#E1306C] flex items-center justify-center shrink-0 group-hover/btn:scale-110 transition-transform">
                <InstagramIcon className="w-3.5 h-3.5 fill-current" />
              </span>
              <span className="group-hover/btn:text-[#E1306C] transition-colors font-heading font-semibold tracking-wider">Follow us on Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-[#E1306C] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
            </a>
          </div>

          {/* -------------------- MOBILE COLLAGE PREVIEW (Visible only on < lg screens) -------------------- */}
          <div className="mt-3 sm:mt-4 pt-4 border-t border-slate-100 flex lg:hidden flex-col items-center justify-center gap-3">
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
