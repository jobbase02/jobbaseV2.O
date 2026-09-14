'use client';

import React from 'react';
import { FilterState } from '@/types';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

interface JobFilterProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onReset: () => void;
}

export const JobFilter: React.FC<JobFilterProps> = ({ filters, onFilterChange, onReset }) => {
  const opportunityTypes = ['All', 'Full-Time', 'Internship'];
  const qualifications = ['All', 'B.Tech / B.E', 'M.Tech / M.E', 'BCA / MCA', 'B.Sc / M.Sc', 'Any Graduate'];
  const locations = ['All', 'Bangalore', 'Remote', 'Hyderabad', 'Gurugram', 'Coimbatore'];
  const batches = ['All', '2026', '2025', '2024', '2023', '2022', '2021'];
  const experiences = ['All', 'Fresher', '1-3 YOE', '3+ YOE'];
  const modes = ['All', 'Remote', 'Hybrid', 'Onsite'];

  const hasActiveFilters =
    filters.opportunityType !== 'All' || filters.qualification !== 'All' ||
    filters.location !== 'All' || filters.batch !== 'All' ||
    filters.experience !== 'All' || filters.domain !== 'All' ||
    filters.workMode !== 'All' || filters.searchQuery !== '';

  const selectClass = "w-full text-sm bg-white text-slate-900 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all cursor-pointer font-medium appearance-none shadow-sm";

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

      {/* Type Pills Tab Bar */}
      <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {opportunityTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onFilterChange('opportunityType', type)}
              className={`shrink-0 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all btn-press ${
                filters.opportunityType === type
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-200 hover:text-orange-700'
              }`}
            >
              {type === 'All' ? 'All Roles' : type === 'Full-Time' ? 'Full-Time' : 'Internships'}
            </button>
          ))}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Filters</span>
          </button>
        )}
      </div>

      {/* Dropdown Filters Grid */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">

        <div className="relative">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Batch</label>
          <select
            value={filters.batch}
            onChange={(e) => onFilterChange('batch', e.target.value)}
            className={selectClass}
          >
            {batches.map((b) => (
              <option key={b} value={b}>{b === 'All' ? 'All Years' : `Batch ${b}`}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Education</label>
          <select
            value={filters.qualification}
            onChange={(e) => onFilterChange('qualification', e.target.value)}
            className={selectClass}
          >
            {qualifications.map((q) => (
              <option key={q} value={q}>{q === 'All' ? 'All Degrees' : q}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Location</label>
          <select
            value={filters.location}
            onChange={(e) => onFilterChange('location', e.target.value)}
            className={selectClass}
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc === 'All' ? 'All Cities' : loc}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Work Mode</label>
          <select
            value={filters.workMode}
            onChange={(e) => onFilterChange('workMode', e.target.value)}
            className={selectClass}
          >
            {modes.map((m) => (
              <option key={m} value={m}>{m === 'All' ? 'All Modes' : m}</option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
};
