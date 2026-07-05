import { useTaxHarvesting } from '../../context/TaxHarvestingContext';
import { CapitalGainsCard } from './CapitalGainsCard';
import { SavingsBanner } from '../common/SavingsBanner';

export function AfterHarvestingCard() {
  const { afterHarvestingGains, savings } = useTaxHarvesting();

  if (!afterHarvestingGains) return null;

  return (
    <CapitalGainsCard
      variant="blue"
      title="After Harvesting"
      gains={afterHarvestingGains}
      totalLabel="Effective Capital Gains"
    >
      <SavingsBanner savings={savings} />
    </CapitalGainsCard>
  );
}
