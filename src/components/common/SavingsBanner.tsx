import { formatIndianCurrency } from '../../hooks/useCapitalGainsCalculations';

interface SavingsBannerProps {
  savings: number;
}

export function SavingsBanner({ savings }: SavingsBannerProps) {
  if (savings <= 0) return null;

  return (
    <div className="mt-3 px-4 py-2.5 bg-koinx-green/15 rounded-lg border border-koinx-green/30 animate-slide-down">
      <p className="text-sm font-medium text-koinx-green flex items-center gap-2">
        <span className="text-base">🎉</span>
        <span>
          You are going to save upto{' '}
          <span className="font-bold">{formatIndianCurrency(savings)}</span>
        </span>
      </p>
    </div>
  );
}
