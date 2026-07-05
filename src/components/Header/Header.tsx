import { useTheme } from '../../context/ThemeContext';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-navy-900 border-b border-light-200 dark:border-navy-700 theme-transition">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <span className="text-koinx-green font-extrabold text-xl tracking-tight">
            Koin
          </span>
          <span className="text-koinx-blue font-extrabold text-xl tracking-tight italic">
            X
          </span>
          <sup className="text-[10px] text-light-400 dark:text-gray-400 -ml-0.5">®</sup>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-light-100 dark:bg-navy-800 hover:bg-light-200 dark:hover:bg-navy-700 border border-light-200 dark:border-navy-600 transition-all duration-200 cursor-pointer"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            /* Sun icon for switching to light */
            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            /* Moon icon for switching to dark */
            <svg className="w-5 h-5 text-light-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
