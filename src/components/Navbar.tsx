'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, BriefcaseBusiness, Wrench, BookOpen, Menu, X, ChevronRight, Zap } from 'lucide-react';

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Jobs', href: '/', icon: BriefcaseBusiness },
    { label: 'Tools', href: '/tools', icon: Wrench },
    { label: 'Resources', href: '/resources', icon: BookOpen },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full bg-white relative transition-all duration-200 ${scrolled ? 'border-b border-slate-200 shadow-sm' : 'border-b border-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[60px] flex items-center justify-between gap-4">

        {/* Brand */}
        <Link href="/" className="flex items-center shrink-0 group">
          <img
            src="/logo.png"
            alt="JobBase Logo"
            className=" h-8 md:h-24 w-auto object-contain transition-transform group-hover:scale-105"
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
                  ? 'bg-orange-50 text-orange-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
              >
                <Icon className={`w-4 h-4 font-body ${isActive ? 'text-orange-600' : 'text-slate-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 h-9 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-800 hover:border-slate-300 hover:bg-white transition-all text-sm font-medium"
            title="Search jobs (Ctrl+K)"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Search</span>
            <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-200 rounded border border-slate-300 ml-0.5">
              ⌘K
            </kbd>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all"
          >
            {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer (Floats overlaying hero section instead of pushing page down) */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 w-full md:hidden border-b border-slate-200 bg-white shadow-xl animate-in slide-in-from-top-1 duration-150 z-50">
          <div className="p-3 space-y-1 max-w-6xl mx-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all ${isActive
                    ? 'bg-orange-50 text-orange-700'
                    : 'text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center ${isActive ? 'bg-orange-500' : 'bg-slate-100'
                      }`}>
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    </div>
                    <span className="font-semibold text-sm">{item.label}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-orange-500' : 'text-slate-300'}`} />
                </Link>
              );
            })}

            <div className="pt-2 pb-1">
              <button
                onClick={() => { setMobileMenuOpen(false); if (onOpenSearch) onOpenSearch(); }}
                className="w-full flex items-center justify-center gap-2 h-11 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold shadow-sm btn-press transition-colors"
              >
                <Search className="w-4 h-4" />
                Search Jobs
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
