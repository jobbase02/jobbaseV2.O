/**
 * Route-level loading skeleton — shown by Next.js Suspense while
 * the Server Component fetches data from Sanity.
 */

export default function HomeLoading() {
  return (
    <div className="space-y-6">

      {/* Hero skeleton */}
      <section className="pt-2 pb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="h-5 w-36 bg-slate-100 rounded-full animate-pulse" />
            <div className="h-10 w-80 bg-slate-100 rounded-xl animate-pulse" />
            <div className="h-5 w-64 bg-slate-100 rounded-lg animate-pulse" />
          </div>
          <div className="h-10 w-full sm:w-72 bg-slate-100 rounded-xl animate-pulse" />
        </div>
      </section>

      {/* Filter skeleton */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex gap-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-8 w-24 bg-slate-200 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-10 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>

      {/* Feed + Sidebar skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <div className="h-4 w-40 bg-slate-100 rounded-lg animate-pulse" />
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-40 rounded-2xl bg-slate-100 border border-slate-100 animate-pulse" />
          ))}
        </div>
        <div className="space-y-5">
          <div className="h-52 rounded-2xl bg-slate-100 animate-pulse" />
          <div className="h-40 rounded-2xl bg-slate-100 animate-pulse" />
          <div className="h-48 rounded-2xl bg-slate-100 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
