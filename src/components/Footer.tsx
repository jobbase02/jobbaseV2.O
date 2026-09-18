'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import {
  ShieldCheck, FileText, Lock, AlertTriangle, X, BriefcaseBusiness,
  Wrench, BookOpen, Mail, Sparkles, ArrowRight, CheckCircle2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'disclaimer' | 'terms' | 'privacy' | 'fairUse' | null>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'already_subscribed'>('idle');

  const companyName = "Jobbase";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.status === 409) {
        setStatus('already_subscribed');
        return;
      }
      if (!response.ok) throw new Error('Subscription failed');
      setEmail('');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <footer className="w-full bg-[#353535] relative overflow-hidden antialiased [font-synthesis:none] border-t border-[#242424]">
      {/* Decorative subtle gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1D74C1]/15 via-[#353535] to-[#353535]"></div>
      <div className="absolute top-0 right-0 -z-10 h-96 w-96 transform-gpu rounded-full bg-[#1D74C1]/8 blur-3xl" aria-hidden="true"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-10 sm:pt-20 sm:pb-14 flex flex-col gap-12 lg:gap-16">

        {/* TOP PART: NEWSLETTER */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 pb-12 border-b border-[#4a4a4a]">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#F3F7FE] mb-4">
              <Sparkles className="h-4 w-4" />
              <span>JobBase Updates</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Fresh opportunities.<br />Delivered weekly.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-400">
              Get hand-picked job alerts and practical career resources directly in your inbox. No spam, just value.
            </p>
          </div>

          <div className="w-full lg:max-w-md shrink-0 lg:pt-8">
            <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-3">
              <label htmlFor="footer-email-address" className="sr-only">Email address</label>
              <div className="relative flex-grow">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Mail className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  id="footer-email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border-0 bg-white/5 py-3.5 pl-11 pr-4 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-[#F3F7FE]/40 focus:bg-white/10 focus:ring-2 focus:ring-inset focus:ring-[#1D74C1] sm:text-sm sm:leading-6 transition-all"
                  placeholder="Enter your email"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#1D74C1] px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#175fa3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D74C1] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Joining...' : 'Subscribe'}
                {status !== 'loading' && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
            <p className="mt-2.5 text-[11px] text-slate-500">
              By subscribing you opt for email notifications, but you can unsubscribe at any time.
            </p>
            <div className="mt-3 h-6">
              {status === 'success' && (
                <p className="flex items-center gap-2 text-sm font-medium text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" /> You're successfully subscribed!
                </p>
              )}
              {status === 'already_subscribed' && (
                <p className="flex items-center gap-2 text-sm font-medium text-blue-400">
                  <CheckCircle2 className="h-4 w-4" /> You are already subscribed!
                </p>
              )}
              {status === 'error' && (
                <p className="text-sm font-medium text-red-400">
                  Oops! Something went wrong. Please try again.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* MIDDLE PART: LOGO + LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 lg:gap-16">

          {/* Middle Left Side: Logo and Text */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="inline-block">
              <img src="/logo.png" alt="JobBase Logo" className="w-36 lg:w-44 h-auto object-contain" />
            </Link>
            <p className="text-[#F3F7FE]/60 text-sm sm:text-base leading-relaxed font-body max-w-sm">
              A focused place to discover verified jobs, internships, and practical career resources.
            </p>
          </div>

          {/* Middle Right Side: Quick Links and Legals */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10 md:pl-12 md:border-l md:border-[#4a4a4a]">

            {/* Explore Column */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <h3 className="text-[#F3F7FE]/70 font-bold text-xs sm:text-sm tracking-[0.16em] uppercase font-subheading">
                Explore
              </h3>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <Link href="/jobs" className="text-[#F3F7FE]/80 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 font-subheading">
                    <BriefcaseBusiness className="w-3.5 h-3.5 text-[#1D74C1]" /> All Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/tools" className="text-[#F3F7FE]/80 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 font-subheading">
                    <Wrench className="w-3.5 h-3.5 text-[#1D74C1]" /> Career Tools
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-[#F3F7FE]/80 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 font-subheading">
                    <BookOpen className="w-3.5 h-3.5 text-[#1D74C1]" /> Resources
                  </Link>
                </li>
              </ul>
            </div>

            {/* Job Types Column */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <h3 className="text-[#F3F7FE]/70 font-bold text-xs sm:text-sm tracking-[0.16em] uppercase font-subheading">
                Job Types
              </h3>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <Link href="/jobs?opportunityType=Full-Time" className="text-slate-300 hover:text-white transition-colors text-sm font-medium font-subheading">
                    Full-Time Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/jobs?opportunityType=Internship" className="text-slate-300 hover:text-white transition-colors text-sm font-medium font-subheading">
                    Internships
                  </Link>
                </li>
                <li>
                  <Link href="/jobs?batch=2025" className="text-slate-300 hover:text-white transition-colors text-sm font-medium font-subheading">
                    2025 Class
                  </Link>
                </li>
                <li>
                  <Link href="/jobs?batch=2026" className="text-slate-300 hover:text-white transition-colors text-sm font-medium font-subheading">
                    2026 Class
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <h3 className="text-[#F3F7FE]/70 font-bold text-xs sm:text-sm tracking-[0.16em] uppercase font-subheading">
                Legal
              </h3>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <button onClick={() => setActiveModal('fairUse')} className="text-slate-300 hover:text-white transition-colors text-sm font-medium text-left font-subheading">
                    Fair Use Notice
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('disclaimer')} className="text-slate-300 hover:text-white transition-colors text-sm font-medium text-left font-subheading">
                    Disclaimer
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('terms')} className="text-slate-300 hover:text-white transition-colors text-sm font-medium text-left font-subheading">
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('privacy')} className="text-slate-300 hover:text-white transition-colors text-sm font-medium text-left font-subheading">
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM PART: COPYRIGHT AND DEVELOPED BY */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#4a4a4a] pt-8 mt-2">
          <p className="font-light text-slate-500 text-xs sm:text-sm font-body">
            © {new Date().getFullYear()} {companyName}, All rights reserved
          </p>
          <p className="text-xs sm:text-sm text-slate-500 font-body">
            Developed by{' '}
            <a href="https://www.elevenxsolutions.com" target="_blank" rel="noopener noreferrer" className="font-medium text-[#F3F7FE]/80 transition-colors hover:text-[#1D74C1]">
              Eleven X Solutions
            </a>
          </p>
        </div>

      </div>

      {/* Legal Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white text-slate-900 rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl relative max-h-[80vh] overflow-y-auto">

            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                {activeModal === 'fairUse' && <><ShieldCheck className="w-4 h-4 text-indigo-500" /> Fair Use Notice</>}
                {activeModal === 'disclaimer' && <><AlertTriangle className="w-4 h-4 text-amber-500" /> Disclaimer</>}
                {activeModal === 'terms' && <><FileText className="w-4 h-4 text-sky-600" /> Terms of Service</>}
                {activeModal === 'privacy' && <><Lock className="w-4 h-4 text-emerald-600" /> Privacy Policy</>}
              </h3>
              <button onClick={() => setActiveModal(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-sm text-slate-600 leading-relaxed space-y-4 font-body">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Effective Date: September 2026</div>

              {activeModal === 'fairUse' && (
                <>
                  <p><strong className="font-bold text-slate-900">Trademarks &amp; Copyrights (Fair Use):</strong> All company names, logos, and trademarks featured on JobBase are the exclusive property of their respective owners.</p>
                  <p><strong className="font-bold text-slate-900">Purpose of Use:</strong> These assets are used strictly for identification and educational purposes. We display logos solely to help students quickly recognize the employers associated with job opportunities.</p>
                  <p><strong className="font-bold text-slate-900">No Affiliation:</strong> We do not claim any ownership rights to these logos, nor does their use imply any official endorsement, affiliation, sponsorship, or partnership with the respective companies.</p>
                </>
              )}
              {activeModal === 'disclaimer' && (
                <>
                  <p><strong className="font-bold text-slate-900">Zero Fee Policy:</strong> JobBase operates strictly as a free platform for job seekers. We will never request monetary compensation for our services, tools, or listings. Please report any individual or entity claiming otherwise on our behalf.</p>
                  <p><strong className="font-bold text-slate-900">Non-Affiliation:</strong> We operate independently and are not officially affiliated, associated, or endorsed by the companies featured on this platform. We serve solely as an aggregator and notification service.</p>
                  <p><strong className="font-bold text-slate-900">No Guarantees:</strong> All applications, interview processes, and final selections are managed entirely by the respective hiring organizations. JobBase provides informational resources only and does not guarantee job placement or application success.</p>
                </>
              )}
              {activeModal === 'terms' && (
                <>
                  <p><strong className="font-bold text-slate-900">Acceptable Use:</strong> By accessing JobBase, you agree to utilize our aggregated job listings, tools, and educational resources strictly for personal, non-commercial career development purposes.</p>
                  <p><strong className="font-bold text-slate-900">Third-Party Links:</strong> Our platform redirects to external, official application portals. We are not responsible for the content, privacy practices, or application procedures of these external sites.</p>
                  <p><strong className="font-bold text-slate-900">Tools &amp; Accuracy:</strong> Resources such as CGPA converters are provided for general guidance. We strongly advise verifying all academic conversions with your respective institution.</p>
                </>
              )}
              {activeModal === 'privacy' && (
                <>
                  <p><strong className="font-bold text-slate-900">Anonymous Usage:</strong> JobBase does not require user accounts or authentication. As a result, we do not track individual browsing behavior or maintain personally identifiable profiles.</p>
                  <p><strong className="font-bold text-slate-900">Email Communications:</strong> If you opt-in to our newsletter, your email address is collected exclusively for delivering relevant career alerts. You reserve the right to unsubscribe at any time, resulting in the permanent deletion of your email from our active database.</p>
                  <p><strong className="font-bold text-slate-900">Data Protection:</strong> We are committed to your privacy. JobBase explicitly prohibits the sale, rental, or sharing of user contact information with third-party marketing services.</p>
                </>
              )}

              <div className="pt-2 mt-4 border-t border-slate-100">
                <p className="text-[11px] text-slate-500 italic">
                  <strong>Policy Updates:</strong> We reserve the right to modify, amend, or update these terms and policies at our discretion. We encourage users to review this section periodically to stay informed of any changes.
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 rounded-lg bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors btn-press"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </footer>
  );
};
