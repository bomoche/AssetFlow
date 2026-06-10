import React from 'react';
import useHistory     from '../hooks/useHistory';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ErrorBanner    from '../components/shared/ErrorBanner';
import { formatDate, formatZAR } from '../utils/formatter';


function ProductTypeBadge({ type }) {
  const styles = {
    SAVINGS:    'bg-secondary-fixed text-on-secondary-fixed',
    RETIREMENT: 'bg-primary-fixed text-on-primary-fixed',
    EQUITY:     'bg-tertiary-fixed text-on-tertiary-fixed',
  };
  const cls = styles[type] ?? 'bg-surface-container-highest text-on-surface-variant';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase ${cls}`}>
      {type}
    </span>
  );
}

export default function History() {
  const { withdrawals, loading, error, handleDownloadCsv } = useHistory();

  if (loading) return <LoadingSpinner message="Loading history..." />;

  return (
    <div className="max-w-5xl mx-auto pb-28 md:pb-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-stack-lg gap-stack-sm">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-primary mb-2">Withdrawal History</h1>
          <p className="text-on-surface-variant font-body-md">Review your recent transaction history and export statements.</p>
        </div>
        <button
          onClick={handleDownloadCsv}
          className="flex items-center gap-base border-2 border-primary text-primary px-stack-md py-stack-sm font-label-caps text-label-caps uppercase hover:bg-primary hover:text-on-primary transition-all duration-300"
        >
          <span className="material-symbols-outlined">download</span>
          Download CSV
        </button>
      </div>

      <ErrorBanner message={error} />

      {withdrawals.length === 0 ? (
        <div className="flat-card p-stack-lg text-center text-on-surface-variant">
          <span className="material-symbols-outlined text-[48px] mb-stack-sm block">history</span>
          <p className="font-body-md text-body-md">No withdrawals have been made yet.</p>
        </div>
      ) : (
        <div className="flat-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="table-header">
                <tr>
                  {['DATE', 'PRODUCT NAME', 'PRODUCT TYPE', 'AMOUNT (R)', 'BALANCE AFTER (R)'].map(col => (
                    <th key={col} className="px-stack-md py-4 font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant last:text-right">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {withdrawals.map(w => (
                  <tr key={w.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-stack-md py-stack-sm font-data-mono text-data-mono text-on-surface">{formatDate(w.createdAt)}</td>
                    <td className="px-stack-md py-stack-sm font-body-md text-body-md font-semibold text-primary">{w.productName}</td>
                    <td className="px-stack-md py-stack-sm"><ProductTypeBadge type={w.productType} /></td>
                    <td className="px-stack-md py-stack-sm font-data-mono text-data-mono text-error text-right">{formatZAR(w.amount)}</td>
                    <td className="px-stack-md py-stack-sm font-data-mono text-data-mono text-on-surface text-right">{formatZAR(w.balanceAfterWithdrawal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-stack-md p-stack-md bg-surface-container-low border border-outline-variant flex items-start gap-stack-sm">
        <span className="material-symbols-outlined text-primary">info</span>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Withdrawals are typically processed within 2–3 business days. Contact your account manager for transaction queries.
        </p>
      </div>
    </div>
  );
}