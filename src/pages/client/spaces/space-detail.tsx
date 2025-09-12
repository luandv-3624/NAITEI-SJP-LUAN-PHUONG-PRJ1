import { useParams } from 'react-router';
import { SpaceDetail, SpaceDetailSkeleton } from '@/features/space';
import { useGetSpaceDetail } from '@/features/space';
import { AlertCircle, MapPinOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AxiosError } from '@/types';
import { HTTP_STATUS_CODE } from '@/constants';

export function SpaceDetailPage() {
  const { t } = useTranslation('space');
  const { spaceId } = useParams<{ spaceId: string }>();
  const {
    data: space,
    isPending,
    isError,
    error,
  } = useGetSpaceDetail(spaceId!);

  if (isPending) return <SpaceDetailSkeleton />;

  if (isError) {
    if (
      (error as AxiosError)?.response?.data.statusCode ===
      HTTP_STATUS_CODE.NOT_FOUND
    ) {
      return (
        <div className='flex flex-col items-center justify-center py-16 text-gray-500'>
          <MapPinOff className='w-10 h-10 mb-4' />
          <p className='text-lg font-medium'>{t('not_found')}</p>
        </div>
      );
    }

    return (
      <div className='flex flex-col items-center justify-center py-16 text-red-600'>
        <AlertCircle className='w-10 h-10 mb-4' />
        <p className='text-lg font-medium'>{t('error.fetch_failed')}</p>
      </div>
    );
  }

  return <SpaceDetail space={space} />;
}
