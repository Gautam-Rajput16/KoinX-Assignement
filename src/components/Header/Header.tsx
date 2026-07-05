export function Header() {
  return (
    <header className="bg-navy-900 border-b border-navy-700">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <span className="text-koinx-green font-extrabold text-xl tracking-tight">
            Koin
          </span>
          <span className="text-koinx-blue font-extrabold text-xl tracking-tight italic">
            X
          </span>
          <sup className="text-[10px] text-gray-400 -ml-0.5">®</sup>
        </div>
      </div>
    </header>
  );
}
