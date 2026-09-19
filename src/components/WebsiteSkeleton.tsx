'use client';

import React from 'react';

export function WebsiteSkeleton() {
  return (
    <div className="min-h-screen w-full bg-[#fcfafe] text-[#000000] flex flex-col overflow-hidden select-none pointer-events-none">
      {/* -------------------- NAVBAR SKELETON -------------------- */}
      <header className="sticky top-0 z-40 w-full bg-[#fcfafe]/90 backdrop-blur-md border-b border-[#d0e5f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[60px] sm:h-[68px] flex items-center justify-between gap-4">
          {/* Logo Placeholder */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg skeleton-shimmer shrink-0" />
            <div className="w-24 h-5 rounded-md skeleton-shimmer" />
          </div>

          {/* Nav Links (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <div className="w-14 h-4 rounded-full skeleton-shimmer" />
            <div className="w-16 h-4 rounded-full skeleton-shimmer" />
            <div className="w-20 h-4 rounded-full skeleton-shimmer" />
            <div className="w-16 h-4 rounded-full skeleton-shimmer" />
          </div>

          {/* Right Action / Search Bar Trigger */}
          <div className="flex items-center gap-3">
            <div className="w-36 sm:w-52 h-9 rounded-full border border-[#d0e5f7] bg-white p-1.5 flex items-center gap-2">
              <div className="w-4 h-4 rounded-full skeleton-shimmer ml-1" />
              <div className="w-20 sm:w-28 h-3 rounded-full skeleton-shimmer" />
              <div className="hidden sm:block ml-auto w-8 h-5 rounded bg-slate-100 skeleton-shimmer" />
            </div>
            <div className="md:hidden w-8 h-8 rounded-lg skeleton-shimmer" />
          </div>
        </div>
      </header>

      {/* -------------------- HERO SECTION SKELETON -------------------- */}
      <section className="relative w-full bg-[#fcfafe] bg-graph-grid border-b border-[#d0e5f7] pt-8 sm:pt-14 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
          
          {/* Top Pill Badge */}
          <div className="w-52 sm:w-60 h-7 rounded-full bg-white border border-[#d0e5f7] p-1 flex items-center justify-center gap-2 mb-6 shadow-2xs">
            <div className="w-3.5 h-3.5 rounded-full skeleton-shimmer" />
            <div className="w-36 h-3 rounded-full skeleton-shimmer" />
          </div>

          {/* Main Headline Bones */}
          <div className="w-full max-w-2xl flex flex-col items-center gap-3 mb-4 sm:mb-5">
            <div className="w-3/4 sm:w-4/5 h-10 sm:h-14 rounded-2xl skeleton-shimmer" />
            <div className="w-2/3 sm:w-3/5 h-8 sm:h-12 rounded-2xl skeleton-shimmer" />
          </div>

          {/* Subheadline Bones */}
          <div className="w-full max-w-lg flex flex-col items-center gap-2 mb-7 sm:mb-9 px-4">
            <div className="w-full h-3.5 rounded-md skeleton-shimmer" />
            <div className="w-4/5 h-3.5 rounded-md skeleton-shimmer" />
          </div>

          {/* Search Bar Pill Skeleton */}
          <div className="w-full max-w-xl bg-white rounded-2xl sm:rounded-full border border-[#d0e5f7] p-2 sm:p-2.5 shadow-lg shadow-[#1D74C1]/5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex items-center gap-2.5 px-3.5 w-full sm:w-1/2 py-2">
              <div className="w-4 h-4 rounded-full skeleton-shimmer shrink-0" />
              <div className="w-28 h-4 rounded-md skeleton-shimmer" />
            </div>
            <div className="hidden sm:block h-6 w-[1px] bg-[#d0e5f7]" />
            <div className="flex items-center gap-2.5 px-3.5 w-full sm:w-1/2 py-2">
              <div className="w-4 h-4 rounded-full skeleton-shimmer shrink-0" />
              <div className="w-24 h-4 rounded-md skeleton-shimmer" />
            </div>
            <div className="w-full sm:w-28 h-10 sm:h-11 rounded-xl sm:rounded-full bg-[#1D74C1]/20 skeleton-shimmer shrink-0" />
          </div>

          {/* Social Community Buttons Skeleton */}
          <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <div className="w-36 sm:w-40 h-9 sm:h-10 rounded-full bg-white border border-[#d0e5f7] p-2 flex items-center gap-2">
              <div className="w-5 h-5 rounded-full skeleton-shimmer shrink-0" />
              <div className="w-20 h-3.5 rounded-full skeleton-shimmer" />
            </div>
            <div className="w-44 sm:w-52 h-9 sm:h-10 rounded-full bg-white border border-[#d0e5f7] p-2 flex items-center gap-2">
              <div className="w-5 h-5 rounded-full skeleton-shimmer shrink-0" />
              <div className="w-28 h-3.5 rounded-full skeleton-shimmer" />
            </div>
          </div>

        </div>
      </section>

      {/* -------------------- LATEST JOBS GRID SKELETON -------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="w-28 h-3.5 rounded-full skeleton-shimmer mb-2" />
            <div className="w-44 h-8 rounded-xl skeleton-shimmer mb-1.5" />
            <div className="w-56 h-3.5 rounded-md skeleton-shimmer" />
          </div>
          <div className="w-32 h-10 rounded-lg border border-[#d0e5f7] bg-[#F3F7FE] skeleton-shimmer" />
        </div>

        {/* 6 Job Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-[#F6F6FE] border border-[#d0e5f7] rounded-xl p-5 flex flex-col justify-between min-h-[220px] shadow-2xs"
            >
              <div>
                {/* Card Top: Logo + Title + Badges */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white border border-[#d0e5f7] skeleton-shimmer shrink-0" />
                    <div>
                      <div className="w-32 sm:w-36 h-4.5 rounded-md skeleton-shimmer mb-1.5" />
                      <div className="w-20 h-3 rounded-md skeleton-shimmer" />
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full skeleton-shimmer shrink-0" />
                </div>

                {/* Location / Mode Pill */}
                <div className="w-28 h-3.5 rounded-md skeleton-shimmer mb-4 mt-2" />

                {/* Tags row */}
                <div className="flex flex-wrap gap-1.5">
                  <div className="w-16 h-5 rounded-md bg-white border border-[#d0e5f7] skeleton-shimmer" />
                  <div className="w-20 h-5 rounded-md bg-white border border-[#d0e5f7] skeleton-shimmer" />
                  <div className="w-14 h-5 rounded-md bg-white border border-[#d0e5f7] skeleton-shimmer" />
                </div>
              </div>

              {/* Card Footer: Metadata + Action */}
              <div className="pt-4 mt-4 border-t border-[#d0e5f7]/60 flex items-center justify-between gap-2">
                <div className="w-24 h-4 rounded-md skeleton-shimmer" />
                <div className="w-24 h-8 rounded-lg bg-[#1D74C1]/20 skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
