import { NotFound } from '@/components/not-found';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

export function NotFoundPage() {
  const { t } = useTranslation('auth');

  return (
    <div className='flex items-center justify-center flex-col gap-4 h-[100vh] w-full'>
      <NotFound />
      <Button variant='outline' asChild>
        <Link to='/'>
          <ArrowLeft /> {t('back_to_home')}
        </Link>
      </Button>
    </div>
  );
}
