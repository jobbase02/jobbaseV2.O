'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, BriefcaseBusiness, Wrench, BookOpen, Menu, X, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Jobs', href: '/jobs', icon: BriefcaseBusiness },
    { label: 'Tools', href: '/tools', icon: Wrench },
    { label: 'Resources', href: '/resources', icon: BookOpen },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full bg-[#fcfafe] relative transition-all duration-200 ${scrolled ? 'border-b border-[#d0e5f7] shadow-sm' : 'border-b border-transparent'}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-[60px] flex items-center justify-between gap-4">

        {/* Brand */}
        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center shrink-0 group cursor-pointer">
          <img
            src="/logo.png"
            alt="JobBase Logo"
            className="h-14 md:h-20 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${isActive
                  ? 'bg-[#F3F7FE] text-[#1D74C1] font-semibold'
                  : 'text-[#353535] hover:text-[#000000] hover:bg-[#F3F7FE]'
                  }`}
              >
                <Icon className={`w-4 h-4 font-body ${isActive ? 'text-[#1D74C1]' : 'text-[#353535]/50'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="ai-search-trigger flex items-center gap-2.5 h-10 px-3.5 sm:px-4 md:w-56 lg:w-64 rounded-xl border border-[#d0e5f7] bg-[#fcfafe] text-[#353535] hover:text-[#000000] hover:border-[#1D74C1]/40 hover:bg-[#F3F7FE] transition-all text-sm font-subheading shadow-2xs cursor-pointer touch-manipulation"
            title="Search opportunities"
          >
            <Search className="w-4 h-4 text-[#1D74C1] shrink-0" />
            <span className="hidden sm:inline text-xs sm:text-sm font-medium">Search jobs using AI</span>
            <span className="sm:hidden text-xs font-medium">AI search</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-[#d0e5f7] text-[#353535] hover:text-[#000000] hover:bg-[#F3F7FE] active:scale-95 transition-all touch-manipulation cursor-pointer shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#1D74C1]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile backdrop overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 top-[60px] z-40 bg-[#000000]/25 backdrop-blur-xs md:hidden transition-opacity duration-200"
          aria-hidden="true"
        />
      )}

      {/* Mobile dropdown menu (drops down from top navbar) */}
      <div
        className={`absolute top-[60px] left-0 right-0 z-50 w-full bg-[#fcfafe] border-b border-[#d0e5f7] shadow-xl md:hidden overflow-hidden transition-all duration-300 ease-out origin-top ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto visible max-h-[420px]'
            : 'opacity-0 -translate-y-3 pointer-events-none invisible max-h-0'
        }`}
      >
        <div className="p-4 sm:px-8 space-y-2 bg-[#fcfafe]">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#F3F7FE] text-[#1D74C1] font-bold border border-[#d0e5f7] shadow-2xs'
                    : 'text-[#353535] hover:text-[#000000] hover:bg-[#F3F7FE] font-semibold'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                      isActive ? 'bg-[#1D74C1] text-white' : 'bg-[#F3F7FE] text-[#1D74C1]'
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-sm">{item.label}</span>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    isActive ? 'text-[#1D74C1] translate-x-0.5' : 'text-[#bcdbf7]'
                  }`}
                />
              </Link>
            );
          })}

          <div className="pt-2 pb-1">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenSearch) onOpenSearch();
              }}
              className="ai-search-trigger w-full flex items-center justify-center gap-2 h-11 rounded-xl border border-[#d0e5f7] bg-[#F3F7FE] hover:bg-[#e8f1fb] text-[#000000] text-sm font-bold shadow-xs active:scale-[0.98] transition-all touch-manipulation cursor-pointer"
            >
              <Search className="w-4 h-4 text-[#1D74C1]" />
              Search Opportunities with AI
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
