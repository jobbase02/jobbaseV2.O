'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, BriefcaseBusiness, Wrench, BookOpen, Menu, X, ChevronRight, Zap } from 'lucide-react';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuDragOffset, setMenuDragOffset] = useState(0);
  const menuDragStart = useRef<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMenuDragOffset(0);
  }, [pathname]);

  const handleMenuPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    menuDragStart.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleMenuPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (menuDragStart.current === null) return;
    setMenuDragOffset(Math.max(0, event.clientY - menuDragStart.current));
  };

  const handleMenuPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (menuDragStart.current === null) return;
    const draggedDistance = event.clientY - menuDragStart.current;
    menuDragStart.current = null;
    setMenuDragOffset(0);
    if (draggedDistance > 80) setMobileMenuOpen(false);
  };

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
    <header className={`sticky top-0 z-50 w-full bg-white relative transition-all duration-200 ${scrolled ? 'border-b border-slate-200 shadow-sm' : 'border-b border-transparent'}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-[60px] flex items-center justify-between gap-4">

        {/* Brand */}
        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center shrink-0 group cursor-pointer">
          <img
            src="/logo.png"
            alt="JobBase Logo"
            className="h-14 md:h-16 w-auto object-contain transition-transform group-hover:scale-105"
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
            className="ai-search-trigger flex items-center gap-2.5 h-10 px-3.5 sm:px-4 md:w-56 lg:w-64 rounded-xl border border-[#dddbff] bg-[#fbfbfe] text-slate-500 hover:text-[#050316] hover:border-[#f97415]/50 hover:bg-white transition-all text-sm font-subheading shadow-2xs"
            title="Search opportunities"
          >
            <Search className="w-4 h-4 text-[#f97415] shrink-0" />
            <span className="hidden sm:inline text-xs sm:text-sm font-medium">Search jobs using AI</span>
            <span className="sm:hidden text-xs font-medium">AI search</span>
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

      {/* Mobile menu drawer */}
      <>
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMobileMenuOpen(false)}
          className={`fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${mobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        />
        <aside
          className={`fixed inset-x-0 bottom-0 z-50 max-h-[42vh] w-full overflow-y-auto rounded-t-3xl border-t border-slate-200 bg-white shadow-[0_-16px_40px_rgba(15,23,42,0.16)] ${menuDragOffset ? 'transition-none' : 'transition-transform duration-300 ease-out'} will-change-transform md:hidden ${mobileMenuOpen ? 'translate-y-0' : 'pointer-events-none translate-y-full'}`}
          style={menuDragOffset && mobileMenuOpen ? { transform: `translateY(${menuDragOffset}px)` } : undefined}
        >
            <div
              className="flex items-center justify-center border-b border-slate-100 px-4 pb-3 pt-3 touch-none"
              onPointerDown={handleMenuPointerDown}
              onPointerMove={handleMenuPointerMove}
              onPointerUp={handleMenuPointerUp}
              onPointerCancel={handleMenuPointerUp}
              aria-label="Drag down to close menu"
            >
              <span className="h-1 w-12 rounded-full bg-slate-300" aria-hidden="true" />
            </div>

            <div className="space-y-1 p-3 px-4 pb-5 sm:px-8">
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

            <div className="pt-4 pb-1">
              <button
                onClick={() => { setMobileMenuOpen(false); if (onOpenSearch) onOpenSearch(); }}
                className="ai-search-trigger w-full flex items-center justify-center gap-2 h-11 rounded-lg border border-[#dddbff] bg-[#fbfbfe] text-[#050316] text-sm font-semibold shadow-sm btn-press transition-colors"
              >
                <Search className="w-4 h-4 text-blue-600" />
                AI Search
              </button>
            </div>

            </div>
        </aside>
      </>
    </header>
  );
};
