import { TaxHarvestingProvider, useTaxHarvesting } from './context/TaxHarvestingContext';
import { Header } from './components/Header/Header';
import { Disclaimers } from './components/Disclaimers/Disclaimers';
import { PreHarvestingCard } from './components/CapitalGainsCard/PreHarvestingCard';
import { AfterHarvestingCard } from './components/CapitalGainsCard/AfterHarvestingCard';
import { HoldingsTable } from './components/HoldingsTable/HoldingsTable';
import { Loader } from './components/common/Loader';
import { ErrorState } from './components/common/ErrorState';

function DashboardContent() {
  const {
    isLoadingHoldings,
    isLoadingCapitalGains,
    holdingsError,
    capitalGainsError,
    retryHoldings,
    retryCapitalGains,
    capitalGains,
    holdings,
  } = useTaxHarvesting();

  const isLoading = isLoadingHoldings || isLoadingCapitalGains;
  const hasError = holdingsError || capitalGainsError;

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <ErrorState
        message={holdingsError || capitalGainsError || 'An error occurred'}
        onRetry={() => {
          if (holdingsError) retryHoldings();
          if (capitalGainsError) retryCapitalGains();
        }}
      />
    );
  }

  if (!capitalGains || holdings.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        No data available.
      </div>
    );
  }

  return (
    <>
      {/* Capital Gains Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PreHarvestingCard />
        <AfterHarvestingCard />
      </div>

      {/* Holdings Table */}
      <HoldingsTable />
    </>
  );
}

export default function App() {
  return (
    <TaxHarvestingProvider>
      <div className="min-h-screen bg-navy-950">
        <Header />

        <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Page Title */}
          <div className="flex items-baseline gap-3 mb-5">
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Tax Harvesting
            </h1>
            <a
              href="#"
              className="text-sm text-koinx-blue hover:text-koinx-blue/80 transition-colors"
            >
              How it works?
            </a>
          </div>

          {/* Disclaimers */}
          <Disclaimers />

          {/* Main Content */}
          <DashboardContent />
        </main>
      </div>
    </TaxHarvestingProvider>
  );
}
