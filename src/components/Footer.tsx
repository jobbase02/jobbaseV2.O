'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, FileText, Lock, AlertTriangle, X, BriefcaseBusiness, Wrench, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'disclaimer' | 'terms' | 'privacy' | 'fairUse' | null>(null);

  const companyName = "Jobbase";

  return (
    <footer className="w-full bg-[#FAFAFA] relative overflow-hidden antialiased [font-synthesis:none] mt-4">


      {/* Dark Theme Panel Section */}
      <div className="relative w-full bg-[#050316] z-10 min-h-[400px]">
        {/* Background Ambient Glass & Fluted Lines Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
          <div className="absolute -right-24 -top-24 w-96 h-96 bg-[#f97415]/20 rounded-full blur-3xl" />
          <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

          {/* Fluted Vertical Glass Lines Pattern */}
          <div
            className="w-full h-full"
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 24px)',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-14 md:py-20 flex flex-col lg:flex-row justify-between gap-10 sm:gap-12 lg:gap-16">

          {/* Left Side: Brand Logo, Description, Social Icons, Copyright */}
          <div className="flex flex-col justify-between max-w-md w-full space-y-6 sm:space-y-8">
            <div className="flex flex-col space-y-2.5 sm:space-y-3">
              {/* Logo */}
              <Link href="/" className="inline-block">
                <img src="/logo.png" alt="JobBase Logo" className="w-28 sm:w-36 lg:w-44 h-auto object-contain" />
              </Link>
              <h2 className="text-white text-xs sm:text-base md:text-[19px] font-normal leading-relaxed font-body">
                Free, verified off-campus jobs &amp; internships for graduates directly from official portals.
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4 pt-2 sm:pt-4">
              {/* Social Icons SVG */}
              <svg width="312" height="34" viewBox="0 0 312 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 w-[140px] sm:w-[180px] md:w-[200px] h-auto opacity-90 hover:opacity-100 transition-opacity">
                <path d="M12.673 20.703L18.427 28.375H26.885L17.39 15.714L25.29 6.625H22.088L15.905 13.737L10.573 6.625H2.115L11.189 18.727L2.803 28.375H6.005L12.673 20.703ZM19.635 25.958L6.948 9.042H9.364L22.052 25.958H19.635Z" fill="#FFFFFF" />
                <path d="M68.75 5.75C69.413 5.75 70.049 6.013 70.518 6.482C70.987 6.951 71.25 7.587 71.25 8.25V25.75C71.25 26.413 70.987 27.049 70.518 27.518C70.049 27.987 69.413 28.25 68.75 28.25H51.25C50.587 28.25 49.951 27.987 49.482 27.518C49.013 27.049 48.75 26.413 48.75 25.75V8.25C48.75 7.587 49.013 6.951 49.482 6.482C49.951 6.013 50.587 5.75 51.25 5.75H68.75ZM68.125 25.125V18.5C68.125 17.419 67.696 16.383 66.931 15.618C66.167 14.854 65.131 14.425 64.05 14.425C62.987 14.425 61.75 15.075 61.15 16.05V14.662H57.663V25.125H61.15V18.962C61.15 18 61.925 17.212 62.888 17.212C63.352 17.212 63.797 17.397 64.125 17.725C64.453 18.053 64.638 18.498 64.638 18.962V25.125H68.125ZM53.6 12.7C54.157 12.7 54.691 12.479 55.085 12.085C55.479 11.691 55.7 11.157 55.7 10.6C55.7 9.438 54.763 8.488 53.6 8.488C53.04 8.488 52.502 8.71 52.106 9.106C51.71 9.502 51.487 10.04 51.487 10.6C51.487 11.762 52.438 12.7 53.6 12.7ZM55.337 25.125V14.662H51.875V25.125H55.337Z" fill="#FFFFFF" />
                <path d="M124.167 17C124.167 9.18 117.82 2.833 110 2.833C102.18 2.833 95.833 9.18 95.833 17C95.833 23.857 100.707 29.566 107.167 30.883V21.25H104.333V17H107.167V13.458C107.167 10.724 109.391 8.5 112.125 8.5H115.667V12.75H112.833C112.054 12.75 111.417 13.387 111.417 14.167V17H115.667V21.25H111.417V31.096C118.571 30.387 124.167 24.352 124.167 17Z" fill="#FFFFFF" />
                <path d="M167.458 12.922C165.619 6.078 159.292 6.506 159.292 6.506C159.292 6.506 150.542 5.923 150.542 17C150.542 28.078 159.292 27.495 159.292 27.495C159.292 27.495 164.493 27.841 166.875 22.924C167.653 20.757 167.458 16.422 159.875 16.422C159.875 16.422 156.375 16.422 156.375 19.339C156.375 20.478 157.542 21.672 159.292 21.672C161.042 21.672 162.991 20.474 163.375 18.172C164.542 11.172 158.125 10.589 156.375 13.506" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M200.1 6.333H209.9C213.633 6.333 216.667 9.367 216.667 13.1V22.9C216.667 24.695 215.954 26.416 214.685 27.685C213.416 28.954 211.695 29.667 209.9 29.667H200.1C196.367 29.667 193.333 26.633 193.333 22.9V13.1C193.333 11.305 194.046 9.584 195.315 8.315C196.584 7.046 198.305 6.333 200.1 6.333ZM199.867 8.667C198.753 8.667 197.684 9.109 196.897 9.897C196.109 10.684 195.667 11.753 195.667 12.867V23.133C195.667 25.455 197.545 27.333 199.867 27.333H210.133C211.247 27.333 212.315 26.891 213.103 26.103C213.891 25.316 214.333 24.247 214.333 23.133V12.867C214.333 10.545 212.455 8.667 210.133 8.667H199.867ZM211.125 10.417C211.512 10.417 211.883 10.57 212.156 10.844C212.43 11.117 212.583 11.488 212.583 11.875C212.583 12.262 212.43 12.633 212.156 12.906C211.883 13.18 211.512 13.333 211.125 13.333C210.738 13.333 210.367 13.18 210.094 12.906C209.82 12.633 209.667 12.262 209.667 11.875C209.667 11.488 209.82 11.117 210.094 10.844C210.367 10.57 210.738 10.417 211.125 10.417ZM205 12.167C206.547 12.167 208.031 12.781 209.125 13.875C210.219 14.969 210.833 16.453 210.833 18C210.833 19.547 210.219 21.031 209.125 22.125C208.031 23.219 206.547 23.833 205 23.833C203.453 23.833 201.969 23.219 200.875 22.125C199.781 21.031 199.167 19.547 199.167 18C199.167 16.453 199.781 14.969 200.875 13.875C201.969 12.781 203.453 12.167 205 12.167ZM205 14.5C204.072 14.5 203.181 14.869 202.525 15.525C201.869 16.181 201.5 17.072 201.5 18C201.5 18.928 201.869 19.819 202.525 20.475C203.181 21.131 204.072 21.5 205 21.5C205.928 21.5 206.818 21.131 207.475 20.475C208.131 19.819 208.5 18.928 208.5 18C208.5 17.072 208.131 16.181 207.475 15.525C206.818 14.869 205.928 14.5 205 14.5Z" fill="#FFFFFF" />
                <path d="M256.367 9.79C255.569 8.879 255.13 7.71 255.13 6.5H251.525V20.967C251.498 21.75 251.167 22.492 250.604 23.036C250.04 23.58 249.287 23.884 248.503 23.883C246.847 23.883 245.47 22.53 245.47 20.85C245.47 18.843 247.407 17.338 249.402 17.957V14.27C245.377 13.733 241.853 16.86 241.853 20.85C241.853 24.735 245.073 27.5 248.492 27.5C252.155 27.5 255.13 24.525 255.13 20.85V13.512C256.592 14.562 258.347 15.125 260.147 15.122V11.517C260.147 11.517 257.953 11.622 256.367 9.79Z" fill="#FFFFFF" />
                <path d="M311.209 8.588C310.88 7.356 309.909 6.385 308.677 6.055C306.443 5.457 297.484 5.457 297.484 5.457C297.484 5.457 288.525 5.457 286.291 6.055C285.059 6.385 284.088 7.356 283.758 8.588C283.159 10.822 283.159 15.484 283.159 15.484C283.159 15.484 283.159 20.145 283.758 22.379C284.088 23.612 285.059 24.583 286.291 24.912C288.525 25.511 297.484 25.511 297.484 25.511C297.484 25.511 306.443 25.511 308.677 24.912C309.909 24.583 310.88 23.612 311.209 22.379C311.808 20.145 311.808 15.484 311.808 15.484C311.808 15.484 311.808 10.822 311.209 8.588ZM294.619 19.781V11.186L302.062 15.484L294.619 19.781Z" fill="#FFFFFF" />
              </svg>
              <p className="font-light text-white/70 text-[11px] sm:text-xs md:text-[13px] mt-0.5 font-body">
                © {new Date().getFullYear()} {companyName}, All rights reserved
              </p>
            </div>
          </div>

          {/* Right Side - Categorized Resources Links */}
          <div className="flex gap-8 sm:gap-12 md:gap-16 lg:gap-20 flex-wrap sm:flex-nowrap">
            
            {/* Explore Column */}
            <div className="flex flex-col gap-2.5 sm:gap-4">
              <h3 className="text-[#f97415] font-bold text-xs sm:text-sm md:text-lg tracking-wider uppercase font-subheading">
                Explore
              </h3>
              <ul className="flex flex-col gap-2 sm:gap-3">
                <li>
                  <Link href="/" className="text-white/80 hover:text-[#f97415] transition-colors text-xs sm:text-sm md:text-[15px] font-medium flex items-center gap-1.5 font-subheading">
                    <BriefcaseBusiness className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f97415]" /> All Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/tools" className="text-white/80 hover:text-[#f97415] transition-colors text-xs sm:text-sm md:text-[15px] font-medium flex items-center gap-1.5 font-subheading">
                    <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f97415]" /> Career Tools
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-white/80 hover:text-[#f97415] transition-colors text-xs sm:text-sm md:text-[15px] font-medium flex items-center gap-1.5 font-subheading">
                    <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f97415]" /> Resources
                  </Link>
                </li>
              </ul>
            </div>

            {/* Job Types Column */}
            <div className="flex flex-col gap-2.5 sm:gap-4">
              <h3 className="text-[#f97415] font-bold text-xs sm:text-sm md:text-lg tracking-wider uppercase font-subheading">
                Job Types
              </h3>
              <ul className="flex flex-col gap-2 sm:gap-3">
                <li>
                  <Link href="/?opportunityType=Full-Time" className="text-white/80 hover:text-[#f97415] transition-colors text-xs sm:text-sm md:text-[15px] font-medium font-subheading">
                    Full-Time Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/?opportunityType=Internship" className="text-white/80 hover:text-[#f97415] transition-colors text-xs sm:text-sm md:text-[15px] font-medium font-subheading">
                    Internships
                  </Link>
                </li>
                <li>
                  <Link href="/?batch=2025" className="text-white/80 hover:text-[#f97415] transition-colors text-xs sm:text-sm md:text-[15px] font-medium font-subheading">
                    2025 Class
                  </Link>
                </li>
                <li>
                  <Link href="/?batch=2026" className="text-white/80 hover:text-[#f97415] transition-colors text-xs sm:text-sm md:text-[15px] font-medium font-subheading">
                    2026 Class
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div className="flex flex-col gap-2.5 sm:gap-4">
              <h3 className="text-[#f97415] font-bold text-xs sm:text-sm md:text-lg tracking-wider uppercase font-subheading">
                Legal
              </h3>
              <ul className="flex flex-col gap-2 sm:gap-3">
                <li>
                  <button onClick={() => setActiveModal('fairUse')} className="text-white/80 hover:text-[#f97415] transition-colors text-xs sm:text-sm md:text-[15px] font-medium text-left font-subheading">
                    Fair Use Notice
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('disclaimer')} className="text-white/80 hover:text-[#f97415] transition-colors text-xs sm:text-sm md:text-[15px] font-medium text-left font-subheading">
                    Disclaimer
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('terms')} className="text-white/80 hover:text-[#f97415] transition-colors text-xs sm:text-sm md:text-[15px] font-medium text-left font-subheading">
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('privacy')} className="text-white/80 hover:text-[#f97415] transition-colors text-xs sm:text-sm md:text-[15px] font-medium text-left font-subheading">
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>

          </div>

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
