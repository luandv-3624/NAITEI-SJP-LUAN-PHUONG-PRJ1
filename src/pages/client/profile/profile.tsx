import {
  ProfileManagement,
  ProfileManagementSkeleton,
} from '@/features/profile';
import { AlertCircle } from 'lucide-react';
import { useGetProfile } from '@/features/auth';
import { useTranslation } from 'react-i18next';
import { User } from '@/features/profile';

export function ProfilePage() {
  const { t } = useTranslation('profile');
  const { data: profile, isPending, isError } = useGetProfile();

  if (isPending) {
    return <ProfileManagementSkeleton />;
  }

  if (isError) {
    <div className='flex flex-col items-center justify-center py-16 text-red-600'>
      <AlertCircle className='w-10 h-10 mb-4' />
      <p className='text-lg font-medium'>{t('error.fetch_failed')}</p>
    </div>;
  }

  return <ProfileManagement profile={profile as User} />;
}
