import { useState } from 'react';
import { submitWithdrawal } from '../api/investorApi';

export default function useWithdraw(selectedProduct, onSuccess) {
  const [amount,      setAmount]      = useState('');
  const [amountError, setAmountError] = useState(null);
  const [apiError,    setApiError]    = useState(null);
  const [success,     setSuccess]     = useState(null);
  const [loading,     setLoading]     = useState(false);

  const maxAllowed = selectedProduct ? selectedProduct.balance * 0.9 : 0;

  function handleAmountChange(value) {
    setAmount(value);
    setAmountError(null);
    if (value && parseFloat(value) > maxAllowed) {
      setAmountError(`Cannot exceed R ${maxAllowed.toFixed(2)} (90% of balance).`);
    }
  }

  async function handleSubmit() {
    setApiError(null);
    setSuccess(null);

    const parsed = parseFloat(amount);
    if (!amount || isNaN(parsed) || parsed <= 0) {
      setAmountError('Please enter a valid withdrawal amount.');
      return;
    }
    if (parsed > maxAllowed) {
      setAmountError(`Cannot exceed R ${maxAllowed.toFixed(2)} (90% of balance).`);
      return;
    }

    setLoading(true);
    try {
      const result = await submitWithdrawal(selectedProduct.productId, parsed);
      setSuccess(result);
      setAmount('');
      // Notify parent to refetch portfolio so balance updates
      if (onSuccess) onSuccess();
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { amount, amountError, apiError, success, loading, maxAllowed, handleAmountChange, handleSubmit };
}