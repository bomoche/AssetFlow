const BASE_URL = 'http://localhost:8080/api';

export { BASE_URL };

// Get stored investor ID from localStorage
export function getInvestorId() {
  return localStorage.getItem('investorId');
}

// Get stored token from localStorage
function getToken() {
  return localStorage.getItem('token');
}

// All authenticated requests go through this
async function authFetch(url, options = {}) {
  const token = getToken();
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  return res;
}

export async function fetchPortfolio() {
  const investorId = getInvestorId();
  const res = await authFetch(`${BASE_URL}/investors/${investorId}/portfolio`);
  if (!res.ok) throw new Error('Failed to load portfolio.');
  return res.json();
}

export async function fetchWithdrawalHistory() {
  const investorId = getInvestorId();
  const res = await authFetch(`${BASE_URL}/withdrawals?investorId=${investorId}`);
  if (!res.ok) throw new Error('Failed to load withdrawal history.');
  return res.json();
}

export async function submitWithdrawal(productId, amount) {
  const investorId = getInvestorId();
  const res = await authFetch(`${BASE_URL}/withdrawals`, {
    method: 'POST',
    body: JSON.stringify({
      investorId: Number(investorId),
      productId,
      amount,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Withdrawal failed.');
  return data;
}

export async function downloadCsv() {
  const investorId = getInvestorId();
  const token = getToken();
  const res = await fetch(
    `${BASE_URL}/withdrawals/export?investorId=${investorId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) throw new Error('CSV export failed.');
  const blob = await res.blob();
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'enviro365-statement.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}