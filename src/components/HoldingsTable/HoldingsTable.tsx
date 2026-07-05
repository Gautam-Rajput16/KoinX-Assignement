import { useTaxHarvesting } from '../../context/TaxHarvestingContext';
import { HoldingRow } from './HoldingRow';
import { TableCheckbox } from './TableCheckbox';
import { useState, useMemo } from 'react';

export function HoldingsTable() {
  const {
    holdings,
    selectedAssetIds,
    toggleAll,
  } = useTaxHarvesting();

  const [isExpanded, setIsExpanded] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: 'stcg' | 'ltcg';
    direction: 'asc' | 'desc';
  } | null>(null);

  if (holdings.length === 0) return null;

  // Sorting logic
  const sortedHoldings = useMemo(() => {
    let sortableItems = [...holdings];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aVal = a[sortConfig.key].gain;
        const bVal = b[sortConfig.key].gain;
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    } else {
      // Default: absolute STCG descending
      sortableItems.sort((a, b) => Math.abs(b.stcg.gain) - Math.abs(a.stcg.gain));
    }
    return sortableItems;
  }, [holdings, sortConfig]);

  const requestSort = (key: 'stcg' | 'ltcg') => {
    let direction: 'asc' | 'desc' = 'desc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

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
                <th 
                  className="py-4 px-4 text-xs font-semibold text-light-500 dark:text-gray-400 uppercase tracking-wider text-right hidden sm:table-cell cursor-pointer group select-none transition-colors hover:text-light-700 dark:hover:text-gray-300"
                  onClick={() => requestSort('stcg')}
                >
                  <div className="flex items-center justify-end gap-1">
                    Short-term
                    <span className={`transition-opacity ${sortConfig?.key === 'stcg' ? 'text-koinx-blue opacity-100' : 'opacity-0 group-hover:opacity-50'}`}>
                      {sortConfig?.key === 'stcg' && sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  </div>
                </th>
                <th 
                  className="py-4 px-4 text-xs font-semibold text-light-500 dark:text-gray-400 uppercase tracking-wider text-right hidden sm:table-cell cursor-pointer group select-none transition-colors hover:text-light-700 dark:hover:text-gray-300"
                  onClick={() => requestSort('ltcg')}
                >
                  <div className="flex items-center justify-end gap-1">
                    Long-term
                    <span className={`transition-opacity ${sortConfig?.key === 'ltcg' ? 'text-koinx-blue opacity-100' : 'opacity-0 group-hover:opacity-50'}`}>
                      {sortConfig?.key === 'ltcg' && sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  </div>
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
