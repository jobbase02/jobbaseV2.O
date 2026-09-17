'use client';

import { useState } from 'react';
import { Check, Share2 } from 'lucide-react';

interface ShareButtonProps {
  title: string;
}

export function ShareButton({ title }: ShareButtonProps) {
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ title, text: `Check out this opportunity: ${title}`, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
      setShared(true);
      window.setTimeout(() => setShared(false), 2200);
    } catch (error) {
      if ((error as DOMException).name !== 'AbortError') {
        try {
          await navigator.clipboard.writeText(url);
          setShared(true);
          window.setTimeout(() => setShared(false), 2200);
        } catch {
          setShared(false);
        }
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
      aria-label="Share this job"
    >
      {shared ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      {shared ? 'Link copied' : 'Share'}
    </button>
  );
}
