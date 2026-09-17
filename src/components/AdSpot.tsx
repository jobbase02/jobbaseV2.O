import React from 'react';
import { Megaphone, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface AdSpotProps {
  className?: string;
  type?: 'banner' | 'sidebar' | 'native';
  spotName?: string;
  pageName?: string;
}

export function AdSpot({ className = '', type = 'sidebar', spotName = 'Unknown', pageName = 'Unknown' }: AdSpotProps) {
  
  // Calculate heights based on type for some variety, but keeping the same styling language
  let sizingClass = 'min-h-[220px]';
  if (type === 'banner') sizingClass = 'h-[250px] w-[300px] max-w-full mx-auto sm:h-auto sm:w-full sm:max-w-none sm:min-h-[140px] flex-row sm:flex-col';

  const targetUrl = `/contact?reason=ad&adspot=${encodeURIComponent(spotName)}&page=${encodeURIComponent(pageName)}`;

  return (
    <article className={`group relative bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-5 flex flex-col justify-between ${sizingClass} ${className}`}>
      <div className="absolute top-3 right-3 px-1.5 py-0.5 bg-slate-200 text-[9px] font-bold text-slate-500 uppercase tracking-wider rounded">
        Ad Spot
      </div>
      
      <div className={`flex gap-3 flex-grow items-center justify-center text-center opacity-70 group-hover:opacity-100 transition-opacity mt-4 ${type === 'banner' ? 'flex-row text-left' : 'flex-col'}`}>
         <div className="w-12 h-12 rounded-lg bg-slate-200 flex items-center justify-center text-slate-500 mb-1 shrink-0">
           <Megaphone className="w-6 h-6" />
         </div>
         <div>
           <h3 className="font-bold text-slate-800 text-base">Promote Your Brand Here</h3>
           <p className={`text-xs text-slate-500 mt-1 max-w-[250px] ${type === 'banner' ? '' : 'mx-auto'}`}>Reach thousands of active students and early-career professionals.</p>
         </div>
      </div>
      
      <div className="mt-5 pt-4 border-t border-slate-200 flex justify-between items-center w-full">
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Sponsored Placement</span>
        <Link 
          href={targetUrl}
          className="text-[11px] font-bold text-orange-500 flex items-center gap-1 group-hover:text-orange-600 transition-colors"
        >
          Advertise With Us <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </article>
  );
}
