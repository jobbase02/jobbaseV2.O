'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Zap, ShieldCheck, FileText, Lock, AlertTriangle, X, Mail, BriefcaseBusiness, Wrench, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'disclaimer' | 'terms' | 'privacy' | 'fairUse' | null>(null);

  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8 space-y-10">

        {/* Top: Brand + Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1 space-y-1">
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="JobBase Logo" className="w-28 h-16 object-contain" />
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
              Free, verified off-campus jobs &amp; internships for graduates — directly from official portals.
            </p>
          </div>

          {/* Explore */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-600 transition-colors font-medium">
                  <BriefcaseBusiness className="w-3.5 h-3.5" /> All Jobs
                </Link>
              </li>
              <li>
                <Link href="/tools" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-600 transition-colors font-medium">
                  <Wrench className="w-3.5 h-3.5" /> Career Tools
                </Link>
              </li>
              <li>
                <Link href="/resources" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-600 transition-colors font-medium">
                  <BookOpen className="w-3.5 h-3.5" /> Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Job Types */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Job Types</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/?opportunityType=Full-Time" className="text-sm text-slate-500 hover:text-orange-600 transition-colors font-medium">
                  Full-Time Jobs
                </Link>
              </li>
              <li>
                <Link href="/?opportunityType=Internship" className="text-sm text-slate-500 hover:text-orange-600 transition-colors font-medium">
                  Internships
                </Link>
              </li>
              <li>
                <Link href="/?batch=2025" className="text-sm text-slate-500 hover:text-orange-600 transition-colors font-medium">
                  2025 Class
                </Link>
              </li>
              <li>
                <Link href="/?batch=2026" className="text-sm text-slate-500 hover:text-orange-600 transition-colors font-medium">
                  2026 Class
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Legal</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveModal('fairUse')}
                  className="text-sm text-slate-500 hover:text-orange-600 transition-colors text-left font-medium">
                  Fair Use Notice
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('disclaimer')}
                  className="text-sm text-slate-500 hover:text-orange-600 transition-colors text-left font-medium">
                  Disclaimer
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('terms')}
                  className="text-sm text-slate-500 hover:text-orange-600 transition-colors text-left font-medium">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('privacy')}
                  className="text-sm text-slate-500 hover:text-orange-600 transition-colors text-left font-medium">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-slate-200 text-xs text-slate-400 font-medium">
          <span>© {new Date().getFullYear()} JobBase. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Not affiliated with any company. Direct portal links only.
          </span>
        </div>

      </div>

      {/* Legal Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white text-slate-900 rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl relative max-h-[80vh] overflow-y-auto">

            <div className="flex items-center justify-between">
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

            <div className="text-sm text-slate-600 leading-relaxed space-y-4">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Effective Date: September 2026</div>
              
              {activeModal === 'fairUse' && (
                <>
                  <p><strong className="font-bold text-slate-900">Trademarks & Copyrights (Fair Use):</strong> All company names, logos, and trademarks featured on JobBase are the exclusive property of their respective owners.</p>
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
                  <p><strong className="font-bold text-slate-900">Tools & Accuracy:</strong> Resources such as CGPA converters are provided for general guidance. We strongly advise verifying all academic conversions with your respective institution.</p>
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
