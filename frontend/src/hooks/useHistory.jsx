import { useState, useEffect } from 'react';
import { fetchWithdrawalHistory, downloadCsv } from '../api/investorApi';

export default function useHistory() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);

  useEffect(() => {
    fetchWithdrawalHistory()
      .then(data => {
        console.log('History data:', data);
        setWithdrawals(data);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleDownloadCsv() {
    try {
      await downloadCsv();
    } catch (err) {
      setError(err.message);
    }
  }

  return { withdrawals, loading, error, handleDownloadCsv };
}