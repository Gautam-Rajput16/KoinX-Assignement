interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 animate-fade-in">
      {/* Error Icon */}
      <div className="w-16 h-16 rounded-full bg-koinx-red/10 flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-koinx-red"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-light-900 dark:text-white mb-2 theme-transition">
        Something went wrong
      </h3>
      <p className="text-sm text-light-500 dark:text-gray-400 mb-6 text-center max-w-md theme-transition">
        {message}
      </p>

      <button
        onClick={onRetry}
        className="px-6 py-2.5 bg-koinx-blue hover:bg-koinx-blue-dark text-white text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );
}
