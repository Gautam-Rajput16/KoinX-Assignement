import { useTaxHarvesting } from '../../context/TaxHarvestingContext';
import type { Holding } from '../../types';
import { formatIndianCurrency, formatPrice } from '../../hooks/useCapitalGainsCalculations';
import { TableCheckbox } from './TableCheckbox';
import { memo } from 'react';

interface HoldingRowProps {
  holding: Holding;
}

export const HoldingRow = memo(function HoldingRow({ holding }: HoldingRowProps) {
  const { selectedAssetIds, toggleAsset } = useTaxHarvesting();
  const isSelected = selectedAssetIds.has(holding.coin);

  const totalCurrentValue = holding.totalHolding * holding.currentPrice;

  // Format amount to sell (combine balances if both are losses/profits, or just take the ones being harvested)
  // Simplified for display: if selected, we sell the whole holding (or whatever logic is preferred)
  // According to design, when checked it shows the full holding amount.
  const amountToSell = isSelected ? `${formatPrice(holding.totalHolding)} ${holding.coin}` : '—';

  return (
    <tr
      className={`hover:bg-light-50 dark:hover:bg-navy-700/50 transition-colors duration-150 theme-transition ${
        isSelected ? 'row-selected' : ''
      }`}
    >
      <td className="py-4 pl-4 pr-2">
        <TableCheckbox
          checked={isSelected}
          onChange={() => toggleAsset(holding.coin)}
        />
      </td>

      {/* Asset Info */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 shrink-0 flex items-center justify-center">
            {holding.logo ? (
              <img src={holding.logo} alt={holding.coinName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs font-bold text-light-500">{holding.coin[0]}</span>
            )}
          </div>
          <div>
            <div className="font-semibold text-light-900 dark:text-white theme-transition">{holding.coinName}</div>
            <div className="text-xs text-light-500 dark:text-gray-400 theme-transition">{holding.coin}</div>
          </div>
        </div>
      </td>

      {/* Holdings & Price */}
      <td className="py-4 px-4 text-right">
        <div className="font-medium text-light-900 dark:text-white theme-transition">
          {formatPrice(holding.totalHolding)} {holding.coin}
        </div>
        <div className="text-xs text-light-500 dark:text-gray-400 theme-transition">
          {formatIndianCurrency(holding.currentPrice)}/{holding.coin}
        </div>
      </td>

      {/* Total Current Value */}
      <td className="py-4 px-4 text-right font-medium text-light-900 dark:text-white theme-transition">
        {formatIndianCurrency(totalCurrentValue)}
      </td>

      {/* Short Term */}
      <td className="py-4 px-4 text-right hidden sm:table-cell">
        <div
          className={`font-medium ${
            holding.stcg.gain > 0
              ? 'text-gain-green'
              : holding.stcg.gain < 0
              ? 'text-loss-red'
              : 'text-light-500 dark:text-gray-400'
          }`}
        >
          {holding.stcg.gain > 0 ? '+' : ''}
          {formatIndianCurrency(holding.stcg.gain)}
        </div>
        <div className="text-xs text-light-500 dark:text-gray-400 theme-transition">
          {formatPrice(holding.stcg.balance)} {holding.coin}
        </div>
      </td>

      {/* Long Term */}
      <td className="py-4 px-4 text-right hidden sm:table-cell">
        <div
          className={`font-medium ${
            holding.ltcg.gain > 0
              ? 'text-gain-green'
              : holding.ltcg.gain < 0
              ? 'text-loss-red'
              : 'text-light-500 dark:text-gray-400'
          }`}
        >
          {holding.ltcg.gain > 0 ? '+' : ''}
          {formatIndianCurrency(holding.ltcg.gain)}
        </div>
        <div className="text-xs text-light-500 dark:text-gray-400 theme-transition">
          {formatPrice(holding.ltcg.balance)} {holding.coin}
        </div>
      </td>

      {/* Amount to Sell */}
      <td className="py-4 px-4 text-right font-medium text-light-900 dark:text-white theme-transition">
        {amountToSell}
      </td>
    </tr>
  );
});
