import { useTaxHarvesting } from '../../context/TaxHarvestingContext';
import { HoldingRow } from './HoldingRow';
import { TableCheckbox } from './TableCheckbox';
import { useState } from 'react';

export function HoldingsTable() {
  const {
    holdings,
    selectedAssetIds,
    toggleAll,
  } = useTaxHarvesting();

  const [isExpanded, setIsExpanded] = useState(false);

  if (holdings.length === 0) return null;

  // Sorting: by highest absolute short-term capital gains first
  const sortedHoldings = [...holdings].sort((a, b) => {
    return Math.abs(b.stcg.gain) - Math.abs(a.stcg.gain);
  });

  const visibleHoldings = isExpanded ? sortedHoldings : sortedHoldings.slice(0, 8);
  const isAllSelected = holdings.length > 0 && selectedAssetIds.size === holdings.length;
  const isIndeterminate = selectedAssetIds.size > 0 && selectedAssetIds.size < holdings.length;

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold text-light-900 dark:text-white mb-4 theme-transition">
        Holdings
      </h2>

      {/* Table Container */}
      <div className="bg-white dark:bg-navy-800 border border-light-200 dark:border-navy-600 rounded-xl overflow-hidden theme-transition">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-light-200 dark:border-navy-600 theme-transition">
                <th className="py-4 pl-4 pr-2 w-12">
                  <TableCheckbox
                    checked={isAllSelected}
                    indeterminate={isIndeterminate}
                    onChange={toggleAll}
                  />
                </th>
                <th className="py-4 px-4 text-xs font-semibold text-light-500 dark:text-gray-400 uppercase tracking-wider">
                  Asset
                </th>
                <th className="py-4 px-4 text-xs font-semibold text-light-500 dark:text-gray-400 uppercase tracking-wider text-right">
                  <div className="flex flex-col items-end">
                    <span>Holdings</span>
                    <span className="text-[10px] text-light-400 dark:text-gray-500 font-normal normal-case">
                      Current Market Rate
                    </span>
                  </div>
                </th>
                <th className="py-4 px-4 text-xs font-semibold text-light-500 dark:text-gray-400 uppercase tracking-wider text-right">
                  Total Current Value
                </th>
                <th className="py-4 px-4 text-xs font-semibold text-light-500 dark:text-gray-400 uppercase tracking-wider text-right hidden sm:table-cell">
                  Short-term
                </th>
                <th className="py-4 px-4 text-xs font-semibold text-light-500 dark:text-gray-400 uppercase tracking-wider text-right hidden sm:table-cell">
                  Long-term
                </th>
                <th className="py-4 px-4 text-xs font-semibold text-light-500 dark:text-gray-400 uppercase tracking-wider text-right">
                  Amount to Sell
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-200 dark:divide-navy-600 theme-transition">
              {visibleHoldings.map((holding) => (
                <HoldingRow key={holding.coin} holding={holding} />
              ))}
            </tbody>
          </table>
        </div>

        {/* View All Toggle */}
        {sortedHoldings.length > 8 && (
          <div className="border-t border-light-200 dark:border-navy-600 p-4 theme-transition">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm font-semibold text-koinx-blue hover:text-koinx-blue-dark transition-colors cursor-pointer"
            >
              {isExpanded ? 'View less' : `View all (${sortedHoldings.length})`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
