import { useState, useEffect, useCallback } from 'react';
import { fetchPortfolio } from '../api/investorApi';

export default function usePortfolio() {
  const [investor, setInvestor] = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    fetchPortfolio()
      .then(setInvestor)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  return { investor, loading, error, refetch: load };
}