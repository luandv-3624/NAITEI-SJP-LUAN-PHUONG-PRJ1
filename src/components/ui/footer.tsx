import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className='w-full py-6 mt-8 text-center bg-gray-100 dark:bg-gray-800'>
      <p className='text-sm text-gray-600 dark:text-gray-400'>{t('footer')}</p>
    </footer>
  );
}
