import {
  formatIndianCurrency,
  formatNumber,
  formatPrice,
} from '../../hooks/useCapitalGainsCalculations';
import type { Holding } from '../../types';
import { TableCheckbox } from './TableCheckbox';

interface HoldingRowProps {
  holding: Holding;
  isSelected: boolean;
  onToggle: () => void;
}

export function HoldingRow({ holding, isSelected, onToggle }: HoldingRowProps) {
  const gainColor = (val: number) =>
    val >= 0 ? 'text-gain-green' : 'text-loss-red';

  const formatGain = (val: number) => {
    if (val >= 0) return `+${formatIndianCurrency(val)}`;
    return formatIndianCurrency(val);
  };

  return (
    <tr
      className={`border-b border-navy-700 transition-colors duration-200 hover:bg-navy-700/30 ${
        isSelected ? 'row-selected' : ''
      }`}
    >
      {/* Checkbox */}
      <td className="py-3.5 px-3 sm:px-4">
        <TableCheckbox
          checked={isSelected}
          onChange={onToggle}
          ariaLabel={`Select ${holding.coinName}`}
        />
      </td>

      {/* Asset */}
      <td className="py-3.5 px-2 sm:px-3">
        <div className="flex items-center gap-2.5">
          <img
            src={holding.logo}
            alt={holding.coinName}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSIxNiIgZmlsbD0iIzFFMkEzQSIvPjx0ZXh0IHg9IjE2IiB5PSIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI0ZGRiIgZm9udC1zaXplPSIxMiIgZm9udC1mYW1pbHk9IkludGVyIj4/PC90ZXh0Pjwvc3ZnPg==';
            }}
          />
          <div>
            <div className="text-sm font-medium text-white">
              {holding.coinName}
            </div>
            <div className="text-xs text-gray-400">{holding.coin}</div>
          </div>
        </div>
      </td>

      {/* Holdings & Current Market Rate */}
      <td className="py-3.5 px-2 sm:px-3 text-right">
        <div className="text-sm text-white">
          {formatNumber(holding.totalHolding)} {holding.coin}
        </div>
        <div className="text-xs text-gray-400">
          {formatPrice(holding.currentPrice)}/{holding.coin}
        </div>
      </td>

      {/* Total Current Value */}
      <td className="py-3.5 px-2 sm:px-3 text-right hidden lg:table-cell">
        <div className="text-sm text-white">
          {formatPrice(holding.currentPrice * holding.totalHolding)}
        </div>
      </td>

      {/* Short-term */}
      <td className="py-3.5 px-2 sm:px-3 text-right hidden md:table-cell">
        <div className={`text-sm font-medium ${gainColor(holding.stcg.gain)}`}>
          {formatGain(holding.stcg.gain)}
        </div>
        <div className="text-xs text-gray-400">
          {formatNumber(holding.stcg.balance)} {holding.coin}
        </div>
      </td>

      {/* Long-term */}
      <td className="py-3.5 px-2 sm:px-3 text-right hidden md:table-cell">
        <div className={`text-sm font-medium ${gainColor(holding.ltcg.gain)}`}>
          {formatGain(holding.ltcg.gain)}
        </div>
        <div className="text-xs text-gray-400">
          {formatNumber(holding.ltcg.balance)} {holding.coin}
        </div>
      </td>

      {/* Amount to Sell */}
      <td className="py-3.5 px-2 sm:px-4 text-right hidden sm:table-cell">
        <span className="text-sm text-white">
          {isSelected
            ? `${formatNumber(holding.totalHolding)} ${holding.coin}`
            : '—'}
        </span>
      </td>
    </tr>
  );
}
