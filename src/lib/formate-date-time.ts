export function formatDateTime(dateString: string) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return `${date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })} ${date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
}
