'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, CheckCircle2, AlertCircle, Mail, Send } from 'lucide-react';
import Link from 'next/link';

function ContactForm() {
  const searchParams = useSearchParams();
  const initialReason = searchParams.get('reason') || '';
  const initialAdSpot = searchParams.get('adspot') || '';
  const initialPage = searchParams.get('page') || '';

  const isAdInquiry = initialReason === 'ad';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: isAdInquiry ? 'Advertisement Inquiry' : '',
    message: '',
    ad_spot: initialAdSpot,
    page_name: initialPage,
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to submit form');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        reason: isAdInquiry ? 'Advertisement Inquiry' : '',
        message: '',
        ad_spot: '',
        page_name: '',
      });
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-8 fade-in-up">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to home
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10">
        <div className="mb-8">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-5">
            <Mail className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Contact Us</h1>
          <p className="text-slate-500 mt-2">
            {isAdInquiry 
              ? 'Interested in advertising on JobBase? Fill out the form below and our team will get back to you shortly.'
              : 'Have a question, feedback, or want to report an issue? We\'re here to help.'}
          </p>
        </div>

        {status === 'success' ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-4">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-emerald-900">Message Sent Successfully!</h3>
              <p className="text-sm text-emerald-700 mt-1">Thank you for reaching out. Our team will review your inquiry and get back to you as soon as possible.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-4 px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-sm font-bold rounded-lg transition-colors"
              >
                Send Another Message
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold text-slate-700">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all text-sm outline-none font-medium"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-slate-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all text-sm outline-none font-medium"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="reason" className="text-sm font-bold text-slate-700">Reason for Contact</label>
              <select
                id="reason"
                name="reason"
                required
                value={formData.reason}
                onChange={handleChange}
                disabled={isAdInquiry} // Lock the field if they came from an ad spot
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all text-sm outline-none font-medium disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <option value="" disabled>Select a reason...</option>
                {isAdInquiry ? (
                  <option value="Advertisement Inquiry">Advertisement Inquiry</option>
                ) : (
                  <>
                    <option value="General Support">General Support</option>
                    <option value="Report an Issue">Report an Issue / Bug</option>
                    <option value="Feedback / Suggestion">Feedback / Suggestion</option>
                    <option value="Advertisement Inquiry">Advertisement Inquiry</option>
                    <option value="Partnership">Partnership / Collaboration</option>
                  </>
                )}
              </select>
            </div>

            {(isAdInquiry || formData.reason === 'Advertisement Inquiry') && (
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ad Placement Details</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="page_name" className="text-xs font-semibold text-slate-600">Target Page</label>
                    <input
                      type="text"
                      id="page_name"
                      name="page_name"
                      value={formData.page_name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm outline-none font-medium text-slate-500"
                      placeholder="e.g. Homepage"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="ad_spot" className="text-xs font-semibold text-slate-600">Ad Spot</label>
                    <input
                      type="text"
                      id="ad_spot"
                      name="ad_spot"
                      value={formData.ad_spot}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm outline-none font-medium text-slate-500"
                      placeholder="e.g. Banner Top"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-bold text-slate-700">
                {formData.reason === 'Advertisement Inquiry' ? 'Additional Details (Optional)' : 'Message'}
              </label>
              <textarea
                id="message"
                name="message"
                required={formData.reason !== 'Advertisement Inquiry'}
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all text-sm outline-none font-medium resize-none"
                placeholder="How can we help you?"
              />
            </div>

            {status === 'error' && (
              <div className="p-4 bg-red-50 text-red-700 text-sm font-semibold rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" /> {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed btn-press"
            >
              {status === 'loading' ? 'Sending Message...' : (
                <>Send Message <Send className="w-4 h-4" /></>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-20"><div className="animate-pulse text-slate-400 font-bold">Loading...</div></div>}>
      <ContactForm />
    </Suspense>
  );
}
