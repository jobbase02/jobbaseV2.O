'use client';

import React, { useState, useEffect } from 'react';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SearchModal } from '@/components/SearchModal';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    return (
      <html lang="en" className="h-full">
        <head>
          <title>JobBase Studio</title>
        </head>
        <body className="h-full m-0 p-0 bg-white text-neutral-900">
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className="scroll-smooth bg-white">
      <head>
        <title>JobBase — Entry-Level Technology Roles & Software Engineering</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Discover verified entry-level and early-career software engineering roles. Apply directly through official employer portals." />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAFAFA] text-slate-900 selection:bg-orange-500/20 selection:text-orange-900">
        <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </body>
    </html>
  );
}
