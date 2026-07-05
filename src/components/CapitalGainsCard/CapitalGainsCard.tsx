import { formatIndianCurrency } from '../../hooks/useCapitalGainsCalculations';
import type { ComputedGains } from '../../types';

interface CapitalGainsCardProps {
  variant: 'dark' | 'blue';
  title: string;
  gains: ComputedGains;
  totalLabel: string;
  children?: React.ReactNode;
}

export function CapitalGainsCard({
  variant,
  title,
  gains,
  totalLabel,
  children,
}: CapitalGainsCardProps) {
  const isDark = variant === 'dark';

  const cardClasses = isDark
    ? 'bg-navy-800 border border-navy-600'
    : 'bg-gradient-to-br from-koinx-blue to-koinx-blue-dark';

  const titleClasses = isDark
    ? 'text-white'
    : 'text-koinx-green';

  const labelClasses = isDark
    ? 'text-gray-300'
    : 'text-white/90';

  const headerClasses = isDark
    ? 'text-gray-400'
    : 'text-white/70';

  const valueClasses = 'text-white';

  const dividerClasses = isDark
    ? 'border-navy-600'
    : 'border-white/15';

  return (
    <div className={`rounded-xl p-5 sm:p-6 ${cardClasses}`}>
      {/* Title */}
      <h3 className={`text-base font-semibold mb-4 ${titleClasses}`}>
        {title}
      </h3>

      {/* Table Header */}
      <div className="grid grid-cols-3 gap-2 mb-2">
        <div />
        <div className={`text-xs font-medium text-right ${headerClasses}`}>
          Short-term
        </div>
        <div className={`text-xs font-medium text-right ${headerClasses}`}>
          Long-term
        </div>
      </div>

      {/* Profits Row */}
      <div
        className={`grid grid-cols-3 gap-2 py-2.5 border-b ${dividerClasses}`}
      >
        <div className={`text-sm ${labelClasses}`}>Profits</div>
        <div className={`text-sm text-right number-transition ${valueClasses}`}>
          {formatIndianCurrency(gains.stcg.profits)}
        </div>
        <div className={`text-sm text-right number-transition ${valueClasses}`}>
          {formatIndianCurrency(gains.ltcg.profits)}
        </div>
      </div>

      {/* Losses Row */}
      <div
        className={`grid grid-cols-3 gap-2 py-2.5 border-b ${dividerClasses}`}
      >
        <div className={`text-sm ${labelClasses}`}>Losses</div>
        <div className={`text-sm text-right number-transition ${valueClasses}`}>
          {formatIndianCurrency(-gains.stcg.losses)}
        </div>
        <div className={`text-sm text-right number-transition ${valueClasses}`}>
          {formatIndianCurrency(-gains.ltcg.losses)}
        </div>
      </div>

      {/* Net Capital Gains Row */}
      <div className="grid grid-cols-3 gap-2 py-2.5">
        <div className={`text-sm font-medium ${labelClasses}`}>
          Net Capital Gains
        </div>
        <div
          className={`text-sm text-right font-medium number-transition ${valueClasses}`}
        >
          {formatIndianCurrency(gains.stcg.net)}
        </div>
        <div
          className={`text-sm text-right font-medium number-transition ${valueClasses}`}
        >
          {formatIndianCurrency(gains.ltcg.net)}
        </div>
      </div>

      {/* Divider */}
      <div className={`border-t ${dividerClasses} mt-2 pt-4`}>
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className={`text-sm font-medium ${labelClasses}`}>
            {totalLabel}:
          </span>
          <span
            className={`text-2xl sm:text-3xl font-bold number-transition ${valueClasses}`}
          >
            {formatIndianCurrency(gains.realisedCapitalGains)}
          </span>
        </div>
      </div>

      {/* Optional children (e.g., savings banner) */}
      {children}
    </div>
  );
}
