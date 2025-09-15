import { VenueDetail, VenueDetailSkeleton } from '@/features/venue';
import { useGetVenueDetail } from '@/features/venue';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AlertCircle, MapPinOff } from 'lucide-react';

export function VenueDetailPage() {
  const { venueId } = useParams<{ venueId: string }>();
  const { data: venue, isLoading, error } = useGetVenueDetail(venueId!);
  const { t } = useTranslation('venue');

  if (isLoading) {
    return <VenueDetailSkeleton />;
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center py-16 text-red-600'>
        <AlertCircle className='w-10 h-10 mb-4' />
        <p className='text-lg font-medium'>{t('error')}</p>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className='flex flex-col items-center justify-center py-16 text-gray-500'>
        <MapPinOff className='w-10 h-10 mb-4' />
        <p className='text-lg font-medium'>{t('notFound')}</p>
      </div>
    );
  }

  return <VenueDetail venue={venue} />;
}
