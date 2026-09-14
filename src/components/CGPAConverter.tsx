'use client';

import React, { useState } from 'react';
import { Calculator, Check, Info } from 'lucide-react';

export const CGPAConverter: React.FC = () => {
  const [cgpa, setCgpa] = useState<string>('8.5');
  const [formula, setFormula] = useState<string>('10-point');
  const [copied, setCopied] = useState(false);

  const numCgpa = parseFloat(cgpa) || 0;

  const calculatePercentage = (val: number, type: string): { percentage: number; formulaStr: string } => {
    switch (type) {
      case 'vtu':
        return { percentage: Math.max(0, (val - 0.75) * 10), formulaStr: '(CGPA - 0.75) × 10' };
      case 'ktu':
        return { percentage: Math.max(0, (val - 0.5) * 10), formulaStr: '(CGPA - 0.5) × 10' };
      case 'anna':
        return { percentage: Math.min(100, val * 10), formulaStr: 'CGPA × 10' };
      case 'cbse':
        return { percentage: Math.min(100, val * 9.5), formulaStr: 'CGPA × 9.5' };
      case '10-point':
      default:
        return { percentage: Math.min(100, val * 9.5), formulaStr: 'CGPA × 9.5' };
    }
  };

  const { percentage, formulaStr } = calculatePercentage(numCgpa, formula);
  const formattedPercentage = percentage.toFixed(2);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${formattedPercentage}%`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-subtle">
      
      {/* Tool Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-100">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-neutral-900">
            CGPA to Percentage Converter
          </h2>
          <p className="text-xs text-neutral-500 font-medium">
            Supports official university conversion formulas for VTU, KTU, Anna Univ, CBSE & Standard 10-Point scale.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Controls Column */}
        <div className="space-y-4">
          
          {/* Formula Select */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1.5 uppercase tracking-wider">
              Select Scale Standard
            </label>
            <select
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              className="w-full text-xs sm:text-sm font-semibold bg-neutral-50 text-neutral-900 border border-neutral-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"
            >
              <option value="10-point">Standard 10-Point Scale (CGPA × 9.5)</option>
              <option value="vtu">Visvesvaraya Tech Univ (VTU) - [(CGPA - 0.75) × 10]</option>
              <option value="ktu">APJ Abdul Kalam Tech Univ (KTU) - [(CGPA - 0.5) × 10]</option>
              <option value="anna">Anna University - (CGPA × 10)</option>
              <option value="cbse">CBSE 10th / 12th Board - (CGPA × 9.5)</option>
            </select>
          </div>

          {/* Input CGPA */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1.5 uppercase tracking-wider">
              Enter CGPA Score (out of 10.0)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="10"
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
              placeholder="e.g. 8.5"
              className="w-full text-lg font-mono font-bold bg-neutral-50 text-neutral-900 border border-neutral-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"
            />
          </div>

          {/* Quick presets */}
          <div className="pt-1">
            <span className="text-xs text-neutral-400 block mb-1.5 font-bold uppercase tracking-wider">Quick Presets:</span>
            <div className="flex flex-wrap gap-1.5">
              {['6.5', '7.0', '7.5', '8.0', '8.5', '9.0', '9.5'].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setCgpa(val)}
                  className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 transition-colors"
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Output Column */}
        <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200 flex flex-col justify-between">
          
          <div>
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-1">
              Calculated Equivalent Percentage
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight font-mono accent-gradient-text">
                {formattedPercentage}%
              </span>
            </div>
            
            <div className="mt-4 space-y-2 text-xs text-neutral-600 font-medium">
              <div className="flex items-center justify-between py-1 border-b border-neutral-200">
                <span>Formula Applied:</span>
                <span className="font-mono font-bold text-neutral-900">{formulaStr}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-neutral-200">
                <span>Grading Band:</span>
                <span className="font-bold text-emerald-700">
                  {numCgpa >= 8.0 ? 'First Class with Distinction' : numCgpa >= 6.5 ? 'First Class' : 'Second Class'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1 text-[11px] text-neutral-500 font-medium">
              <Info className="w-3.5 h-3.5 shrink-0 text-indigo-600" />
              <span>Official formula for hiring forms</span>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl accent-gradient-bg text-white text-xs font-bold hover:opacity-95 transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : null}
              {copied ? 'Copied!' : 'Copy Percentage'}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
