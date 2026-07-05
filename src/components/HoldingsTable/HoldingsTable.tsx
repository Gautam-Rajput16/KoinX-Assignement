import { useState, useMemo } from 'react';
import { useTaxHarvesting } from '../../context/TaxHarvestingContext';
import { HoldingRow } from './HoldingRow';
import { TableCheckbox } from './TableCheckbox';

const INITIAL_VISIBLE = 8;

export function HoldingsTable() {
  const { holdings, selectedAssetIds, toggleAsset, toggleAll } =
    useTaxHarvesting();
  const [showAll, setShowAll] = useState(false);

  // Sort by absolute STCG gain descending (most impactful candidates first)
  const sortedHoldings = useMemo(() => {
    return [...holdings].sort(
      (a, b) => Math.abs(b.stcg.gain) - Math.abs(a.stcg.gain)
    );
  }, [holdings]);

  const visibleHoldings = showAll
    ? sortedHoldings
    : sortedHoldings.slice(0, INITIAL_VISIBLE);

  const allSelected =
    holdings.length > 0 && selectedAssetIds.size === holdings.length;
  const someSelected =
    selectedAssetIds.size > 0 && selectedAssetIds.size < holdings.length;

  return (
    <div className="mt-8">
      {/* Section Title */}
      <h2 className="text-lg font-semibold text-white mb-4">Holdings</h2>

      {/* Table Container - horizontally scrollable on small screens */}
      <div className="overflow-x-auto rounded-xl border border-navy-700">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-navy-600">
              {/* Select All Checkbox */}
              <th className="py-3 px-3 sm:px-4 text-left w-12">
                <TableCheckbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={toggleAll}
                  ariaLabel="Select all holdings"
                />
              </th>

              <th className="py-3 px-2 sm:px-3 text-left">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Asset
                </span>
              </th>

              <th className="py-3 px-2 sm:px-3 text-right">
                <div>
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Holdings
                  </span>
                  <div className="text-[10px] text-gray-500 font-normal normal-case">
                    Current Market Rate
                  </div>
                </div>
              </th>

              <th className="py-3 px-2 sm:px-3 text-right hidden lg:table-cell">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Total Current Value
                </span>
              </th>

              <th className="py-3 px-2 sm:px-3 text-right hidden md:table-cell">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Short-term
                </span>
              </th>

              <th className="py-3 px-2 sm:px-3 text-right hidden md:table-cell">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Long-Term
                </span>
              </th>

              <th className="py-3 px-2 sm:px-4 text-right hidden sm:table-cell">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Amount to Sell
                </span>
              </th>
            </tr>
          </thead>

          <tbody>
            {visibleHoldings.map((holding) => (
              <HoldingRow
                key={holding.coin}
                holding={holding}
                isSelected={selectedAssetIds.has(holding.coin)}
                onToggle={() => toggleAsset(holding.coin)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* View All / View Less */}
      {sortedHoldings.length > INITIAL_VISIBLE && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 text-sm font-medium text-koinx-blue hover:text-koinx-blue/80 transition-colors cursor-pointer"
        >
          {showAll
            ? 'View less'
            : `View all (${sortedHoldings.length})`}
        </button>
      )}
    </div>
  );
}
