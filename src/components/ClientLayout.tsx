'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SearchModal } from '@/components/SearchModal';
import { usePathname } from 'next/navigation';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');

  // Global Cmd+K or Ctrl+K key binding handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isStudio) {
    return <div className="h-full m-0 p-0 bg-[#fcfafe] text-[#000000]">{children}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfafe] text-[#000000] selection:bg-[#1D74C1]/20 selection:text-[#175fa3]">
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
