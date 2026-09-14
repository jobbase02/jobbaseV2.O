'use client';

import React, { useState } from 'react';
import { Send, Copy, Check, Sparkles, Loader2, MessageSquare } from 'lucide-react';

export const ColdEmailGenerator: React.FC = () => {
  const [role, setRole] = useState('Software Engineer (SDE-1)');
  const [company, setCompany] = useState('CRED');
  const [skills, setSkills] = useState('React, TypeScript, Next.js');
  const [batch, setBatch] = useState('2024');
  const [channel, setChannel] = useState<'LinkedIn' | 'Email'>('LinkedIn');
  const [loading, setLoading] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role || !company) return;

    setLoading(true);
    setCopied(false);

    try {
      const res = await fetch('/api/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, company, skills, batch, channel }),
      });

      const data = await res.json();
      if (data.message) {
        setGeneratedMessage(data.message);
      }
    } catch (err) {
      console.error('Error generating cold message:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedMessage) return;
    navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-subtle mt-8">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-100">
        <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center shrink-0">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 flex items-center gap-2">
            Cold Email & Referral Outreach Generator
            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
              <Sparkles className="w-3 h-3 text-indigo-600" /> Smart Referral Assistant
            </span>
          </h2>
          <p className="text-xs text-neutral-500 font-medium">
            Generate crisp, high-conversion referral templates tailored for LinkedIn messages or recruiter emails.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Input Form Column */}
        <form onSubmit={handleGenerate} className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1 uppercase tracking-wider">
              Target Role Name
            </label>
            <input
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. SDE-1 / Product Designer"
              className="w-full text-xs sm:text-sm font-semibold bg-neutral-50 text-neutral-900 border border-neutral-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1 uppercase tracking-wider">
              Target Company
            </label>
            <input
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. CRED, Stripe, Wipro"
              className="w-full text-xs sm:text-sm font-semibold bg-neutral-50 text-neutral-900 border border-neutral-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1 uppercase tracking-wider">
                Batch
              </label>
              <input
                type="text"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                placeholder="2024"
                className="w-full text-xs sm:text-sm font-semibold bg-neutral-50 text-neutral-900 border border-neutral-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1 uppercase tracking-wider">
                Channel
              </label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value as any)}
                className="w-full text-xs sm:text-sm font-semibold bg-neutral-50 text-neutral-900 border border-neutral-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"
              >
                <option value="LinkedIn">LinkedIn InMail / DM</option>
                <option value="Email">Official Direct Email</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1 uppercase tracking-wider">
              Top Technical Skills & Stack
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. React, Node.js, Go, System Design"
              className="w-full text-xs sm:text-sm font-semibold bg-neutral-50 text-neutral-900 border border-neutral-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl accent-gradient-bg text-white font-bold text-xs sm:text-sm hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Generate Outreach Message
          </button>

        </form>

        {/* Output Column */}
        <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200 flex flex-col justify-between">
          
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Generated Outreach Template
              </span>
              <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                {channel} Format
              </span>
            </div>

            <div className="bg-white border border-neutral-200 rounded-xl p-4 min-h-[200px] text-xs font-mono text-neutral-800 whitespace-pre-wrap leading-relaxed overflow-y-auto max-h-[300px] shadow-subtle">
              {generatedMessage || (
                <span className="text-neutral-400 font-sans italic font-normal">
                  Fill in your role and company details and click "Generate Outreach Message" to create your customized referral template.
                </span>
              )}
            </div>
          </div>

          {generatedMessage && (
            <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between">
              <span className="text-[11px] text-neutral-500 font-medium">
                Ready to copy and send
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="px-4 py-2 rounded-xl accent-gradient-bg text-white text-xs font-bold hover:opacity-95 transition-all flex items-center gap-1.5 shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'One-Click Copy'}
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
