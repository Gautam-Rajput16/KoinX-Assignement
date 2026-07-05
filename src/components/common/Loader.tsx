export function Loader() {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-light-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-6 theme-transition">
          <div className="skeleton h-5 w-32 mb-6" />
          <div className="space-y-3">
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-full" />
          </div>
          <div className="skeleton h-8 w-48 mt-6" />
        </div>
        <div className="rounded-xl bg-koinx-blue/10 dark:bg-koinx-blue/30 p-6 theme-transition">
          <div className="skeleton h-5 w-36 mb-6" />
          <div className="space-y-3">
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-full" />
          </div>
          <div className="skeleton h-8 w-48 mt-6" />
        </div>
      </div>

      {/* Table skeleton */}
      <div className="mt-8">
        <div className="skeleton h-6 w-24 mb-4" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 py-3 border-b border-light-200 dark:border-navy-700 theme-transition"
            >
              <div className="skeleton h-5 w-5" />
              <div className="skeleton h-8 w-8 rounded-full" />
              <div className="skeleton h-4 w-24" />
              <div className="flex-1" />
              <div className="skeleton h-4 w-20" />
              <div className="skeleton h-4 w-20" />
              <div className="skeleton h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
