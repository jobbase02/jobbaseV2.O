'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SearchModal } from '@/components/SearchModal';
import { usePathname } from 'next/navigation';
import { WebsiteSkeleton } from '@/components/WebsiteSkeleton';
import { AnimatePresence, motion } from 'framer-motion';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');

  // Website on-load skeleton effect
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (document.readyState === 'complete') {
      timeout = setTimeout(() => setIsLoading(false), 450);
    } else {
      const handleLoad = () => {
        timeout = setTimeout(() => setIsLoading(false), 400);
      };
      window.addEventListener('load', handleLoad);
      const fallback = setTimeout(() => setIsLoading(false), 850);

      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(timeout);
        clearTimeout(fallback);
      };
    }

    return () => clearTimeout(timeout);
  }, []);

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
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full"
          >
            <WebsiteSkeleton />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex-1 flex flex-col w-full"
          >
            <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
