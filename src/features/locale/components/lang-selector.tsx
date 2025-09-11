import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { localeAtom } from '../atoms';
import type { Locale } from '../types';

export function LangSelector() {
  const [locale, setLocale] = useAtom(localeAtom);
  const { t, i18n } = useTranslation('common');

  const handleChangeLanguage = (lang: Locale) => {
    return () => {
      setLocale(lang);
      i18n.changeLanguage(lang);
    };
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          <span>{t(locale)}</span>
          <span className='sr-only'>{t('select_lang')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={handleChangeLanguage('en')}>
          {t('en')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleChangeLanguage('vi')}>
          {t('vi')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
