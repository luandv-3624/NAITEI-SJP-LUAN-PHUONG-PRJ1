import i18n from '@/i18n';

export function formatDate(date: Date | undefined) {
  if (!date) {
    return '';
  }

  const currentLanguage = i18n.language;

  const locale = currentLanguage === 'vi' ? 'vi-VN' : 'en-US';

  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}
