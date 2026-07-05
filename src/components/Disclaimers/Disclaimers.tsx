import { useState } from 'react';

const DISCLAIMERS = [
  'Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.',
  'Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.',
  'Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.',
  'Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.',
  'Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.',
];

export function Disclaimers() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-navy-800 border border-light-200 dark:border-navy-600 rounded-xl hover:border-light-300 dark:hover:border-navy-500 transition-colors duration-200 cursor-pointer theme-transition"
      >
        <div className="flex items-center gap-2.5">
          {/* Info icon */}
          <svg
            className="w-5 h-5 text-koinx-blue"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm font-medium text-light-800 dark:text-white">
            Important Notes & Disclaimers
          </span>
        </div>

        {/* Chevron */}
        <svg
          className={`w-5 h-5 text-light-400 dark:text-gray-400 transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-0 px-4 py-4 bg-white dark:bg-navy-800 border border-t-0 border-light-200 dark:border-navy-600 rounded-b-xl animate-slide-down -mt-2 pt-4 theme-transition">
          <ul className="space-y-2">
            {DISCLAIMERS.map((text, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-light-600 dark:text-gray-300"
              >
                <span className="text-light-400 dark:text-gray-500 mt-0.5">•</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
