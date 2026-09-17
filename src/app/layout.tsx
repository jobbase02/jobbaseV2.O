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
          <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <meta name="apple-mobile-web-app-title" content="Jobbase" />
          <link rel="manifest" href="/site.webmanifest" />
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
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Jobbase" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-500/20 selection:text-blue-900">
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
