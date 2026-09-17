export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse">
      <div className="h-[480px] w-full bg-slate-50 border-b border-slate-100" />

      <section className="w-full bg-white py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-4 w-40 rounded bg-slate-100" />
          <div className="mt-4 h-10 w-64 rounded-lg bg-slate-100" />
          <div className="mt-3 h-4 w-48 rounded bg-slate-100" />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="h-52 rounded-xl border border-slate-100 bg-slate-50" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
