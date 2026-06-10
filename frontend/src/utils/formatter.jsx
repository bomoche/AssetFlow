export function formatZAR(value) {
  return 'R ' + Number(value).toLocaleString('en-ZA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-ZA', {
    year: 'numeric', month: 'short', day: '2-digit',
  });
}