'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// FAQ Category definitions for JobBase
export const defaultCategories: Record<string, string> = {
  jobs: 'Jobs & Applications',
  tools: 'Career Utilities',
  search: 'AI Intent Search',
  employers: 'For Recruiters',
};

// FAQ Data tailored to JobBase
export const defaultFaqData: Record<string, { question: string; answer: string }[]> = {
  jobs: [
    {
      question: 'How does JobBase verify entry-level tech listings?',
      answer:
        'Every opportunity on JobBase is vetted directly against verified company career portals (such as Greenhouse, Lever, Workday, and Taleo). We verify that all positions are active, authentic, and link directly to official employer career pages without middlemen, broker fees, or third-party redirects.',
    },
    {
      question: 'Do I apply directly on the employer’s official website?',
      answer:
        'Yes. When you click "Apply on Official Portal" on any role, JobBase routes you straight to the employer’s official applicant tracking system. We never harvest your personal credentials or charge fees of any kind.',
    },
    {
      question: 'What graduation batches and experience levels are supported?',
      answer:
        'JobBase focuses specifically on early-career roles: fresh graduate batches (2024, 2025, and 2026), seasonal software internships, and 0–3 years experience engineering openings. You can easily filter listings by your exact graduation batch and experience tier.',
    },
    {
      question: 'Is JobBase completely free for students and job seekers?',
      answer:
        'Yes, 100% free. You can search jobs, filter by technology and batch, and access all candidate tools without any paywalled accounts or subscription plans.',
    },
  ],
  tools: [
    {
      question: 'How does the CGPA to Percentage Converter work?',
      answer:
        'Our converter implements official conversion equations for Indian technical universities and boards, including VTU ((CGPA - 0.75) × 10), KTU ((CGPA - 0.5) × 10), Anna University (CGPA × 10), and the standard CBSE/AICTE 10-point scale (CGPA × 9.5).',
    },
    {
      question: 'What is the Outreach Email Generator?',
      answer:
        'It generates concise, high-converting referral messages (under 150 words) optimized for LinkedIn DMs and cold emails to engineering managers and alumni recruiters.',
    },
    {
      question: 'What free career resources can I download?',
      answer:
        'Our resources library includes ATS-tested resume templates, system design cheatsheets, technical interview roadmaps, and preparation checklists available in PDF, DOCX, and ZIP formats.',
    },
  ],
  search: [
    {
      question: 'How does the AI Intent Search find matching jobs?',
      answer:
        'Our natural language search extracts your intent from everyday queries like "Bangalore 2025 batch frontend react remote". It automatically maps your graduation year, location, and technical stack to surface relevant openings instantly.',
    },
    {
      question: 'Can I search quickly using keyboard shortcuts?',
      answer:
        'Yes! You can press Cmd + K on macOS or Ctrl + K on Windows and Linux from anywhere on JobBase to launch the interactive smart search modal instantly.',
    },
    {
      question: 'What happens if no exact role matches my query?',
      answer:
        'When an exact match is not found, our intent engine intelligently broadens parameters to recommend closely aligned positions with overlapping skill sets and compatible batch eligibility.',
    },
  ],
  employers: [
    {
      question: 'How can hiring teams post listings on JobBase?',
      answer:
        'Recruiters and engineering leads can reach out through our Contact & Advertising page. We verify company credentials and feature your openings directly to thousands of high-intent early-career engineers.',
    },
    {
      question: 'Are spotlight sponsorships and ad placements available?',
      answer:
        'Yes. We offer dedicated sidebar placements, details page banners, and newsletter sponsor slots. You can review placement options or get in touch via our Contact form.',
    },
  ],
};

interface FAQProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  categories?: Record<string, string>;
  faqData?: Record<string, { question: string; answer: string }[]>;
}

// Main reusable FAQ component
export const FAQ: React.FC<FAQProps> = ({
  title = 'Frequently Asked Questions',
  subtitle = 'Everything You Need To Know',
  categories = defaultCategories,
  faqData = defaultFaqData,
  className,
  ...props
}) => {
  const categoryKeys = Object.keys(categories);
  const [selectedCategory, setSelectedCategory] = useState(categoryKeys[0]);

  return (
    <section
      className={cn(
        'relative overflow-hidden bg-[#fcfafe] border-t border-[#d0e5f7] px-4 py-16 sm:py-24 text-[#000000]',
        className
      )}
      {...props}
    >
      <FAQHeader title={title} subtitle={subtitle} />
      <FAQTabs
        categories={categories}
        selected={selectedCategory}
        setSelected={setSelectedCategory}
      />
      <FAQList faqData={faqData} selected={selectedCategory} />

      {/* Still Have Questions CTA */}
      <div className="mx-auto mt-14 max-w-3xl">
        <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#d0e5f7] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F3F7FE] flex items-center justify-center shrink-0 border border-[#d0e5f7] text-[#1D74C1]">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#000000] font-subheading">Still have questions?</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-body">Can’t find what you need? Reach out to our team directly.</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1D74C1] text-white text-xs sm:text-sm font-bold shadow-sm hover:bg-[#175fa3] transition-colors shrink-0"
          >
            Get in touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const FAQHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="relative z-10 flex flex-col items-center justify-center text-center mb-10 sm:mb-12">
    <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#d0e5f7] text-xs font-bold text-[#1D74C1] shadow-2xs font-subheading">
      <HelpCircle className="w-3.5 h-3.5 text-[#1D74C1]" />
      <span className="bg-gradient-to-r from-[#1D74C1] to-[#175fa3] bg-clip-text text-transparent uppercase tracking-wider font-semibold">
        {subtitle}
      </span>
    </div>
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#000000] font-subheading tracking-tight">
      {title}
    </h2>
    <p className="mt-3 text-sm sm:text-base text-slate-600 font-body max-w-xl mx-auto">
      Clear answers regarding listing verification, candidate utilities, and direct applications.
    </p>
    <span
      className="absolute -top-[200px] left-[50%] z-0 h-[400px] w-[550px] -translate-x-[50%] rounded-full bg-gradient-to-r from-[#1D74C1]/10 to-[#1D74C1]/5 blur-3xl pointer-events-none"
      aria-hidden="true"
    />
  </div>
);

const FAQTabs: React.FC<{
  categories: Record<string, string>;
  selected: string;
  setSelected: (key: string) => void;
}> = ({ categories, selected, setSelected }) => (
  <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-2">
    {Object.entries(categories).map(([key, label]) => {
      const isSelected = selected === key;
      return (
        <button
          key={key}
          type="button"
          onClick={() => setSelected(key)}
          className={cn(
            'relative overflow-hidden whitespace-nowrap rounded-xl border px-4 py-2 text-xs sm:text-sm font-semibold transition-colors duration-300 font-subheading cursor-pointer shadow-2xs',
            isSelected
              ? 'border-[#1D74C1] text-white shadow-xs'
              : 'border-[#d0e5f7] bg-white text-[#353535] hover:text-[#000000] hover:border-[#1D74C1]/40'
          )}
        >
          <span className="relative z-10">{label}</span>
          <AnimatePresence>
            {isSelected && (
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="absolute inset-0 z-0 bg-gradient-to-r from-[#1D74C1] to-[#175fa3]"
              />
            )}
          </AnimatePresence>
        </button>
      );
    })}
  </div>
);

const FAQList: React.FC<{
  faqData: Record<string, { question: string; answer: string }[]>;
  selected: string;
}> = ({ faqData, selected }) => (
  <div className="mx-auto mt-8 sm:mt-10 max-w-3xl">
    <AnimatePresence mode="wait">
      {Object.entries(faqData).map(([category, questions]) => {
        if (selected === category) {
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="space-y-3 sm:space-y-3.5"
            >
              {questions.map((faq, index) => (
                <FAQItem key={index} {...faq} index={index} />
              ))}
            </motion.div>
          );
        }
        return null;
      })}
    </AnimatePresence>
  </div>
);

const FAQItem: React.FC<{ question: string; answer: string; index?: number }> = ({
  question,
  answer,
  index = 0,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      animate={isOpen ? 'open' : 'closed'}
      className={cn(
        'rounded-2xl border transition-all duration-200 overflow-hidden',
        isOpen
          ? 'bg-[#F3F7FE]/70 border-[#1D74C1] shadow-[0_4px_20px_-2px_rgba(29,116,193,0.10)] ring-1 ring-[#1D74C1]/20'
          : 'bg-white border-[#d0e5f7] hover:border-[#1D74C1]/40 shadow-2xs'
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left cursor-pointer transition-colors"
      >
        <div className="flex items-center gap-3 sm:gap-3.5 flex-1">
          <span
            className={cn(
              'w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-[11px] sm:text-xs font-bold font-mono shrink-0 transition-colors',
              isOpen
                ? 'bg-[#1D74C1] text-white'
                : 'bg-[#F3F7FE] text-[#1D74C1] border border-[#d0e5f7]'
            )}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className={cn(
              'text-sm sm:text-[15px] font-medium font-poppins transition-colors leading-relaxed',
              isOpen ? 'text-[#1C4980]' : 'text-[#000000]'
            )}
          >
            {question}
          </span>
        </div>
        <motion.span
          variants={{
            open: { rotate: 45 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className={cn(
            'w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors',
            isOpen ? 'bg-[#e8f1fb] text-[#1D74C1]' : 'bg-[#F3F7FE] text-slate-400'
          )}
        >
          <Plus className="h-4 w-4" />
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : '0px',
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden px-4 sm:px-5"
      >
        <div className="pb-4 sm:pb-5 pt-1 text-xs sm:text-sm text-[#0D273C]/85 font-poppins leading-relaxed">
          <p>{answer}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Also export FAQSection alias for seamless drop-in
export const FAQSection = FAQ;
