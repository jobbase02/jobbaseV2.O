'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, Sparkles } from 'lucide-react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error('Subscription failed');
      setEmail('');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="relative bg-[#fcfafe] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-3xl bg-[#353535] px-6 py-16 shadow-2xl sm:px-16 md:py-20 lg:flex lg:items-center lg:gap-x-20 lg:px-24">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1D74C1]/20 via-[#353535] to-[#353535]"></div>
          
          <div className="absolute -top-24 -right-24 -z-10 h-96 w-96 transform-gpu rounded-full bg-[#1D74C1]/15 blur-3xl" aria-hidden="true"></div>
          
          <div className="w-full max-w-md lg:mx-0 lg:flex-auto">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#F3F7FE] mb-4">
              <Sparkles className="h-4 w-4" />
              <span>JobBase Updates</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Fresh opportunities.<br />Delivered weekly.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Get hand-picked job alerts and practical career resources directly in your inbox. No spam, just value.
            </p>
          </div>
          
          <div className="mt-10 w-full max-w-md lg:mt-0 lg:flex-auto lg:max-w-lg">
            <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-3">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <div className="relative flex-grow">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Mail className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border-0 bg-white/5 py-3.5 pl-11 pr-4 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-[#F3F7FE]/40 focus:bg-white/10 focus:ring-2 focus:ring-inset focus:ring-[#1D74C1] sm:text-sm sm:leading-6 transition-all"
                  placeholder="Enter your email"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1D74C1] px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#175fa3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D74C1] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Joining...' : 'Subscribe'}
                {status !== 'loading' && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
            
            <div className="mt-4 h-6">
              {status === 'success' && (
                <p className="flex items-center gap-2 text-sm font-medium text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" /> You're successfully subscribed!
                </p>
              )}
              {status === 'error' && (
                <p className="text-sm font-medium text-red-400">
                  Oops! Something went wrong. Please try again.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

