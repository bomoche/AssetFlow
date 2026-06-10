import React from 'react';
import usePortfolio from '../hooks/usePortfolio';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ErrorBanner    from '../components/shared/ErrorBanner';
import { formatZAR } from '../utils/formatter';


function ProductTypeBadge({ type }) {
  const styles = {
    SAVINGS:    'bg-primary-fixed text-on-primary-fixed-variant',
    RETIREMENT: 'bg-secondary-fixed text-on-secondary-fixed-variant',
    EQUITY:     'bg-tertiary-fixed text-on-tertiary-fixed-variant',
  };
  const cls = styles[type] ?? 'bg-surface-container-highest text-on-surface-variant';
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wider w-fit font-label-caps ${cls}`}>
      {type}
    </span>
  );
}

export default function Portfolio({ onSelectProduct }) {
  const { investor, loading, error } = usePortfolio();

  if (loading) return <LoadingSpinner message="Loading portfolio..." />;

  return (
    <div className="pb-28 md:pb-0">
      <div className="mb-stack-lg">
        <h1 className="font-headline-xl text-headline-xl text-primary mb-stack-sm hidden md:block">Portfolio Overview</h1>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-stack-sm md:hidden">Portfolio</h1>
      </div>

      <ErrorBanner message={error} />

      {investor && (
        <>
          <section className="bg-surface-container-low p-stack-md rounded-lg flat-border mb-stack-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-stack-md">
            <div className="flex items-center gap-stack-md">
              <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined" style={{ fontSize: 32 }}>person</span>
              </div>
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant mb-stack-xs">INVESTOR</p>
                <h2 className="font-headline-md text-headline-md text-primary">
                  {investor.firstName} {investor.lastName}
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-md w-full md:w-auto">
              <div className="flat-border p-stack-sm rounded bg-surface">
                <p className="font-label-caps text-label-caps text-on-surface-variant">EMAIL</p>
                <p className="font-data-mono text-data-mono">{investor.email}</p>
              </div>
              <div className="flat-border p-stack-sm rounded bg-surface">
                <p className="font-label-caps text-label-caps text-on-surface-variant">AGE</p>
                <p className="font-data-mono text-data-mono">{investor.age}</p>
              </div>
            </div>
          </section>

          <section className="space-y-stack-md">
            <div className="flex justify-between items-end mb-stack-sm">
              <h3 className="font-headline-md text-headline-md text-primary">Active Products</h3>
              <span className="font-label-caps text-label-caps text-on-surface-variant">
                {investor.products.length} ITEMS
              </span>
            </div>

            {investor.products.map(product => (
              <div key={product.productId} className="bg-surface p-stack-md rounded-lg flat-border flex flex-col md:flex-row justify-between items-start md:items-center gap-stack-md hover:bg-surface-container-low transition-colors duration-200">
                <div className="flex flex-col gap-stack-xs">
                  <ProductTypeBadge type={product.productType} />
                  <h4 className="font-headline-md text-headline-md text-primary">{product.productName}</h4>
                </div>
                <div className="flex flex-col md:items-end w-full md:w-auto gap-stack-sm">
                  <div>
                    <p className="font-label-caps text-label-caps text-on-surface-variant">CURRENT BALANCE</p>
                    <p className="font-headline-md text-headline-md text-primary font-bold">{formatZAR(product.balance)}</p>
                  </div>
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="w-full md:w-auto px-stack-md py-base border-2 border-secondary text-secondary font-bold rounded-lg hover:bg-secondary hover:text-on-secondary transition-all active:scale-95 text-label-caps"
                  >
                    WITHDRAW
                  </button>
                </div>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  );
}