import React from 'react';
import useWithdraw    from '../hooks/useWithdraw';
import usePortfolio   from '../hooks/usePortfolio';
import ErrorBanner    from '../components/shared/ErrorBanner';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { formatZAR }  from '../utils/formatter';

function ProductTypeBadge({ type }) {
  const styles = {
    SAVINGS:    'bg-primary-fixed text-on-primary-fixed-variant',
    RETIREMENT: 'bg-secondary-fixed text-on-secondary-fixed-variant',
  };
  const cls = styles[type] ?? 'bg-surface-container-highest text-on-surface-variant';
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wider w-fit font-label-caps ${cls}`}>
      {type}
    </span>
  );
}

function ProductList({ products, onSelect }) {
  return (
    <div>
      <div className="mb-stack-lg">
        <h1 className="font-headline-xl text-headline-xl text-primary mb-2 hidden md:block">
          Withdraw Funds
        </h1>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-2 md:hidden">
          Withdraw
        </h1>
        <p className="text-on-surface-variant font-body-md">
          Select a product to withdraw from.
        </p>
      </div>

      <div className="space-y-stack-md">
        {products.map(product => (
          <div
            key={product.productId}
            onClick={() => onSelect(product)}
            className="bg-surface p-stack-md rounded-lg flat-border flex flex-col md:flex-row justify-between items-start md:items-center gap-stack-md hover:bg-surface-container-low transition-colors duration-200 cursor-pointer"
          >
            <div className="flex flex-col gap-stack-xs">
              <ProductTypeBadge type={product.productType} />
              <h4 className="font-headline-md text-headline-md text-primary">
                {product.productName}
              </h4>
            </div>
            <div className="flex flex-col md:items-end w-full md:w-auto gap-stack-sm">
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant">
                  CURRENT BALANCE
                </p>
                <p className="font-headline-md text-headline-md text-primary font-bold">
                  {formatZAR(product.balance)}
                </p>
              </div>
              <button className="w-full md:w-auto px-stack-md py-base border-2 border-secondary text-secondary font-bold rounded-lg hover:bg-secondary hover:text-on-secondary transition-all active:scale-95 text-label-caps">
                SELECT
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WithdrawalForm({ selectedProduct, onWithdrawSuccess, onBack }) {
  const {
    amount, amountError, apiError, success,
    loading, maxAllowed, handleAmountChange, handleSubmit,
  } = useWithdraw(selectedProduct, onWithdrawSuccess);

  return (
    <div className="flex items-start justify-center bg-surface-container-low min-h-screen p-margin-mobile md:p-margin-desktop">
      <div className="w-full max-w-lg">

        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary font-label-caps text-label-caps mb-stack-md transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to products
        </button>

        {success && (
          <div className="mb-stack-md bg-[#e6f4ea] border border-[#34a853] p-4 rounded-lg flex items-center gap-3">
            <span className="material-symbols-outlined text-[#1e8e3e]">check_circle</span>
            <p className="font-body-md text-body-md text-[#1e8e3e]">
              Withdrawal of {formatZAR(success.amount)} submitted successfully.
              New balance: {formatZAR(success.balanceAfterWithdrawal)}.
            </p>
          </div>
        )}

        <ErrorBanner message={apiError} />

        <div className="bg-surface-container-lowest border border-outline-variant p-stack-md md:p-stack-lg shadow-sm">
          <div className="mb-stack-md">
            <h2 className="font-headline-md text-headline-md text-primary">Withdraw Funds</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-stack-xs">
              Provide details to process your institutional withdrawal request.
            </p>
          </div>

          <div className="space-y-stack-md">
            <div className="space-y-stack-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                Selected Investment Product
              </label>
              <div className="w-full p-stack-sm bg-surface-container border border-outline-variant rounded-lg flex items-center justify-between">
                <span className="font-body-md text-body-md font-semibold text-primary">
                  {selectedProduct.productName}
                </span>
                <span className="font-data-mono text-data-mono bg-white px-2 py-1 border border-outline-variant rounded">
                  Balance: {formatZAR(selectedProduct.balance)}
                </span>
              </div>
            </div>

            <div className="space-y-stack-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="amount">
                Withdrawal Amount (R)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-on-surface-variant font-body-md">R</span>
                </div>
                <input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={amount}
                  onChange={e => handleAmountChange(e.target.value)}
                  placeholder="0.00"
                  className={`block w-full pl-8 pr-3 py-stack-sm border rounded-lg font-data-mono text-body-md bg-surface transition-all outline-none
                    ${amountError ? 'border-error' : 'border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary'}`}
                />
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant italic">
                Maximum: {formatZAR(maxAllowed)} (90% of balance)
              </p>
              {amountError && (
                <div className="flex items-center gap-1 text-error">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <span className="font-body-sm text-body-sm">{amountError}</span>
                </div>
              )}
            </div>

            <div className="p-3 bg-surface-container-low border-l-4 border-secondary text-on-surface-variant">
              <p className="font-body-sm text-body-sm">
                Withdrawals are processed within 3–5 business days.
                Fees may apply depending on your fund tier.
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !!amountError}
              className="w-full py-4 bg-secondary-container hover:bg-[#e89d21] text-on-secondary-fixed font-bold rounded-lg transition-all active:scale-[0.98] flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? <><div className="w-4 h-4 border-2 border-on-secondary-fixed border-t-transparent rounded-full animate-spin" />Processing…</>
                : <span className="font-label-caps text-label-caps uppercase">Submit Withdrawal</span>
              }
            </button>
          </div>
        </div>

        <div className="mt-stack-md flex justify-center items-center gap-2 text-on-surface-variant opacity-60">
          <span className="material-symbols-outlined text-sm">lock</span>
          <span className="font-label-caps text-label-caps">Secure Transaction Encryption Enabled</span>
        </div>
      </div>
    </div>
  );
}

export default function Withdraw({ selectedProduct: initialProduct, onWithdrawSuccess }) {
  const [activeProduct, setActiveProduct] = React.useState(initialProduct);
  const { investor, loading, error } = usePortfolio();

  // Sync if parent passes a product from portfolio page
  React.useEffect(() => {
    if (initialProduct) setActiveProduct(initialProduct);
  }, [initialProduct]);

  if (loading) return <LoadingSpinner message="Loading products..." />;

  if (activeProduct) {
    return (
      <WithdrawalForm
        selectedProduct={activeProduct}
        onWithdrawSuccess={onWithdrawSuccess}
        onBack={() => setActiveProduct(null)}
      />
    );
  }

  return (
    <ProductList
      products={investor?.products || []}
      onSelect={setActiveProduct}
    />
  );
}