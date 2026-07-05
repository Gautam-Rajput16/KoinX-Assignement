import { useTaxHarvesting } from '../../context/TaxHarvestingContext';
import { CapitalGainsCard } from './CapitalGainsCard';

export function PreHarvestingCard() {
  const { preHarvestingGains } = useTaxHarvesting();

  if (!preHarvestingGains) return null;

  return (
    <CapitalGainsCard
      variant="dark"
      title="Pre Harvesting"
      gains={preHarvestingGains}
      totalLabel="Realised Capital Gains"
    />
  );
}
