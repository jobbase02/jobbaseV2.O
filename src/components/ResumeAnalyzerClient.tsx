'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertTriangle, Loader2, RefreshCw, ArrowRight } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker to use the local file copied to public/
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

interface AuditResult {
  score: number;
  summary: string;
  missingKeywords: string[];
  improvements: { section: string; feedback: string }[];
}

export function ResumeAnalyzerClient() {
  const [file, setFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'extracting' | 'analyzing' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [result, setResult] = useState<AuditResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setStatus('idle');
      setErrorMsg('');
      setResult(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
        setStatus('idle');
        setErrorMsg('');
        setResult(null);
      } else {
        setErrorMsg('Please upload a valid PDF file.');
      }
    }
  };

  const extractTextFromPDF = async (pdfFile: File): Promise<string> => {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item: any) => item.str);
      fullText += strings.join(' ') + '\n';
    }
    
    return fullText;
  };

  const startAnalysis = async () => {
    if (!file) return;
    if (!consent) {
      setErrorMsg('You must provide consent to analyze your resume.');
      return;
    }

    try {
      setStatus('extracting');
      setErrorMsg('');
      
      const text = await extractTextFromPDF(file);
      
      if (text.trim().length < 50) {
        throw new Error("Could not extract meaningful text from this PDF. It might be scanned or image-based.");
      }

      setStatus('analyzing');
      
      const response = await fetch('/api/tools/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze resume');
      }

      setResult(data as AuditResult);
      setStatus('done');
      
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMsg(err.message || 'An unexpected error occurred.');
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-rose-500';
  };

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-8 shadow-subtle">
        <div 
          className="border-2 border-dashed border-slate-300 rounded-3xl p-10 flex flex-col items-center justify-center text-center hover:border-emerald-400 hover:bg-emerald-50/30 transition-colors bg-slate-50 relative cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            accept=".pdf" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mb-4">
            <UploadCloud className="w-8 h-8 text-emerald-600" />
          </div>
          
          <h3 className="text-lg font-bold text-slate-800">
            {file ? file.name : "Click or drag your PDF resume here"}
          </h3>
          <p className="text-sm text-slate-500 mt-2 max-w-sm">
            PDFs only. We extract text locally in your browser. Files are never saved to our servers.
          </p>

          {file && (
            <div className="mt-6 px-4 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-sm font-medium text-emerald-700 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              File ready for analysis ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
        </div>

        {file && status !== 'done' && (
          <div className="mt-6 space-y-5 p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <label className="flex items-start gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 mt-0.5"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                disabled={status === 'extracting' || status === 'analyzing'}
              />
              <span className="text-sm text-slate-700 font-medium leading-relaxed">
                By clicking analyze, I give permission to extract my resume text locally and send it to the AI API for analysis. I understand this action cannot be undone.
              </span>
            </label>

            {errorMsg && (
              <div className="text-sm text-rose-600 bg-rose-50 border border-rose-200 p-3 rounded-lg flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              onClick={(e) => { e.stopPropagation(); startAnalysis(); }}
              disabled={!consent || status === 'extracting' || status === 'analyzing'}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 text-white font-bold shadow-sm transition-all active:scale-[0.98]"
            >
              {status === 'idle' || status === 'error' ? (
                <>Analyze Resume Now <ArrowRight className="w-4 h-4" /></>
              ) : status === 'extracting' ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Extracting Text...</>
              ) : (
                <><Loader2 className="w-4 h-4 animate-spin" /> AI is auditing your resume...</>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Results Section */}
      {status === 'done' && result && (
        <div className="space-y-6 fade-in-up">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 font-subheading">Audit Results</h2>
            <button 
              onClick={() => { setFile(null); setResult(null); setStatus('idle'); setConsent(false); }}
              className="text-sm font-semibold text-emerald-600 flex items-center gap-1.5 hover:text-emerald-700"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Analyze Another
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            
            {/* Left Col: Score & Missing Keywords */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-center">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">ATS Readiness Score</p>
                <div className={`text-6xl font-black ${getScoreColor(result.score)} tracking-tighter`}>
                  {result.score}<span className="text-2xl text-slate-300">/100</span>
                </div>
                <p className="text-sm text-slate-600 mt-4 leading-relaxed font-medium">
                  {result.summary}
                </p>
              </div>

              {result.missingKeywords && result.missingKeywords.length > 0 && (
                <div className="bg-rose-50/50 border border-rose-200 rounded-3xl p-6 shadow-sm">
                  <p className="text-sm font-bold text-rose-800 flex items-center gap-1.5 mb-4">
                    <AlertTriangle className="w-4 h-4" /> Missing Keywords
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.missingKeywords.map((kw, i) => (
                      <span key={i} className="inline-flex px-2.5 py-1 rounded-md text-xs font-semibold bg-white border border-rose-200 text-rose-600 shadow-xs">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Col: Detailed Feedback */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Actionable Improvements</h3>
              {result.improvements && result.improvements.map((imp, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-start gap-4 hover:border-emerald-300 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500 font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{imp.section}</h4>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      {imp.feedback}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
